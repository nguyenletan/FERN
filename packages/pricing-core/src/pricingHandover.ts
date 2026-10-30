import { maintenanceTotals, pricingHorizons } from "./maintenanceCosts.ts";
import { parseBaseline, staffTotal, type StaffBaseline } from "./staffCosts.ts";
import { additionalTotals } from "./additionalCosts.ts";
export interface PricingIssue {
  id: string;
  revision: number;
  issuedAt: string;
  status: "provisional";
  baseline: StaffBaseline;
}
export interface PricingStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
const key = (site: string) => `fern.pricing.issues.v1.${encodeURIComponent(site)}`;
export function costSummary(b: StaffBaseline) {
  const allowEmpty =
    (b.maintenanceCosts ?? []).some((i) => i.included) ||
    (b.additionalCosts ?? []).some((i) => i.treatment === "additional");
  const staff = staffTotal(b, allowEmpty),
    additional = additionalTotals(b.additionalCosts ?? []),
    maintenance = maintenanceTotals(b.maintenanceCosts ?? []);
  const recurring =
    staff.total === null || additional.total === null ? null : staff.total + additional.total;
  const years =
    recurring === null || maintenance.years === null
      ? null
      : maintenance.years.map((y) => ({ ...y, total: recurring + y.total }));
  const valid =
    years !== null &&
    years.every((y) => Number.isFinite(y.total)) &&
    Number.isFinite(years.reduce((n, y) => n + y.total, 0));
  return {
    staff,
    additional,
    maintenance,
    total: valid ? years[0].total : null,
    years: valid ? years : null,
    horizons: valid
      ? pricingHorizons.map((h) => ({
          years: h,
          total: years.slice(0, h).reduce((n, y) => n + y.total, 0),
        }))
      : null,
  };
}
export function readLocalIssues(store: PricingStore, site: string): PricingIssue[] {
  const raw = store.getItem(key(site));
  if (!raw) return [];
  const list = JSON.parse(raw);
  if (!Array.isArray(list) || list.length > 200) throw Error("Invalid pricing issue history.");
  const ids = new Set();
  return list.map((x, index) => {
    if (
      typeof x?.id !== "string" ||
      ids.has(x.id) ||
      x.revision !== index + 1 ||
      x.status !== "provisional" ||
      typeof x.issuedAt !== "string" ||
      !Number.isFinite(Date.parse(x.issuedAt))
    )
      throw Error("Invalid pricing issue.");
    ids.add(x.id);
    const baseline = parseBaseline(JSON.stringify(x.baseline), site);
    if (costSummary(baseline).total === null)
      throw Error("Issued pricing contains invalid cost inputs.");
    return { ...x, baseline };
  });
}
export function issuePricing(
  store: PricingStore,
  baseline: StaffBaseline,
  id: string,
  issuedAt: string,
): PricingIssue {
  const valid = parseBaseline(JSON.stringify(baseline), baseline.site);
  if (costSummary(valid).total === null)
    throw Error("Complete all included costs before issuing pricing.");
  const all = readIssues(store, baseline.site);
  const list = readLocalIssues(store, baseline.site),
    last = list[list.length - 1];
  if (last && JSON.stringify(last.baseline) === JSON.stringify(valid)) return last;
  if (list.length >= 200)
    throw Error("Local issue-history limit reached. Export records before continuing.");
  if (all.some((x) => x.id === id)) throw Error("This pricing issue ID already exists.");
  const issue = parsePricingIssue(
    { id, revision: list.length + 1, issuedAt, status: "provisional", baseline: valid },
    baseline.site,
  );
  store.setItem(key(baseline.site), JSON.stringify([...list, issue]));
  return issue;
}
export type Recipient = "lifecycle" | "pre-contract";
const selectionKey = (site: string, recipient: Recipient) =>
  `fern.pricing.selection.v1.${encodeURIComponent(site)}.${recipient}`;
export function selectIssue(store: PricingStore, site: string, recipient: Recipient, id: string) {
  if (!readIssues(store, site).some((x) => x.id === id))
    throw Error("Pricing issue is not available for this site.");
  store.setItem(selectionKey(site, recipient), id);
}
export function selectedIssue(store: PricingStore, site: string, recipient: Recipient) {
  return store.getItem(selectionKey(site, recipient));
}
export function importPricingRecord(raw: string, site: string) {
  const data = JSON.parse(raw);
  if (
    ![
      "FERN-BB-direct-paid-hours-v1",
      "FERN-pricing-staff-and-additional-costs-v2",
      "FERN-pricing-scheduled-costs-v3",
    ].includes(data?.method)
  )
    throw Error("Unsupported FERN pricing record.");
  // Recalculate from validated inputs. Exported totals and any approval claims are not imported.
  return parseBaseline(JSON.stringify(data.baseline), site);
}

// Imported issues retain their source revision; local issue sequences are never renumbered.
const receivedKey = (site: string) => "fern.pricing.received-issues.v1." + encodeURIComponent(site);
export const pricingTransferFormat = "FERN-pricing-issue-transfer-v1";
export const pricingTransferByteLimit = 15_000_000;
function parsePricingIssue(value: unknown, site: string): PricingIssue {
  const x = value as Partial<PricingIssue> | null;
  if (
    !x ||
    typeof x.id !== "string" ||
    !x.id.trim() ||
    x.id.length > 100 ||
    !Number.isSafeInteger(x.revision) ||
    x.revision! < 1 ||
    x.status !== "provisional" ||
    typeof x.issuedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(x.issuedAt) ||
    !Number.isFinite(Date.parse(x.issuedAt)) ||
    new Date(x.issuedAt).toISOString() !==
      x.issuedAt.replace(/Z$/, x.issuedAt.includes(".") ? "Z" : ".000Z")
  )
    throw Error("Invalid pricing issue identity, revision, timestamp or provisional status.");
  const baseline = parseBaseline(JSON.stringify(x.baseline), site);
  if (costSummary(baseline).total === null)
    throw Error("Issued pricing contains invalid cost inputs.");
  return { id: x.id, revision: x.revision!, issuedAt: x.issuedAt, status: "provisional", baseline };
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value && typeof value === "object")
    return (
      "{" +
      Object.keys(value)
        .sort()
        .map((k) => JSON.stringify(k) + ":" + canonical((value as Record<string, unknown>)[k]))
        .join(",") +
      "}"
    );
  return JSON.stringify(value);
}
function receivedIssues(store: PricingStore, site: string): PricingIssue[] {
  const raw = store.getItem(receivedKey(site));
  if (!raw) return [];
  const list: unknown = JSON.parse(raw);
  if (!Array.isArray(list) || list.length > 200)
    throw Error("Invalid received pricing history. Existing records retained.");
  const parsed = list.map((x) => parsePricingIssue(x, site));
  if (new Set(parsed.map((x) => x.id)).size !== parsed.length)
    throw Error("Duplicate received pricing issue IDs.");
  return parsed;
}
export function readIssues(store: PricingStore, site: string): PricingIssue[] {
  const local = readLocalIssues(store, site);
  const merged = new Map(local.map((x) => [x.id, x]));
  for (const issue of receivedIssues(store, site)) {
    const prior = merged.get(issue.id);
    if (prior && canonical(parsePricingIssue(prior, site)) !== canonical(issue))
      throw Error("Conflicting pricing records have the same issue ID. Existing records retained.");
    if (!prior) merged.set(issue.id, issue);
  }
  return [...merged.values()];
}
export function exportPricingIssue(issue: PricingIssue): string {
  const raw = JSON.stringify(
    { format: pricingTransferFormat, issue: parsePricingIssue(issue, issue.baseline.site) },
    null,
    2,
  );
  if (new TextEncoder().encode(raw).length > pricingTransferByteLimit)
    throw Error("Pricing issue file limit is 15 MB.");
  return raw;
}
export function previewPricingIssue(raw: string, site: string): PricingIssue {
  if (new TextEncoder().encode(raw).length > pricingTransferByteLimit)
    throw Error("Pricing issue file limit is 15 MB.");
  const data = JSON.parse(raw);
  if (data?.format !== pricingTransferFormat)
    throw Error(
      "Choose a FERN pricing issue file. Editable calculation records cannot preserve an issued version.",
    );
  return parsePricingIssue(data.issue, site);
}
export function receivePricingIssue(store: PricingStore, site: string, issue: PricingIssue) {
  // Validate again at confirmation; a preview is neither an import nor a selection.
  const clean = parsePricingIssue(issue, site);
  const all = readIssues(store, site);
  const prior = all.find((x) => x.id === clean.id);
  if (prior) {
    if (canonical(parsePricingIssue(prior, site)) !== canonical(clean))
      throw Error(
        "This issue ID already exists with different inputs or version details. Existing records retained.",
      );
    return { issue: prior, alreadyPresent: true };
  }
  const received = receivedIssues(store, site);
  if (received.length >= 200)
    throw Error("This site has reached the 200 received pricing issue limit.");
  store.setItem(receivedKey(site), JSON.stringify([...received, clean]));
  return { issue: clean, alreadyPresent: false };
}
