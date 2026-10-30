import { parseAlternatives, type Alternative } from "./alternatives.ts";
export const models = [
  "Full Blue Badge",
  "IFM",
  "IFM Hybrid",
  "Fully Contained — definition to confirm",
  "AFM — definition pending",
  "Other / mixed",
] as const;
export const tiers = ["Prime", "Plus", "Core"] as const;
export type Assessment = {
  version: 1;
  id: string;
  site: string;
  revision: number;
  savedAt: string;
  name: string;
  purpose: string;
  owner: string;
  decisionDate: string;
  scope: string;
  arrangement: string;
  model: string;
  tier: string;
  responsibilities: string;
  evidence: string;
  gaps: string;
  pricingId: string;
  alternatives: Alternative[];
};
export function newAssessment(site: string, id: string): Assessment {
  return {
    version: 1,
    id,
    site,
    revision: 0,
    savedAt: "",
    name: "",
    purpose: "",
    owner: "",
    decisionDate: "",
    scope: "",
    arrangement: "",
    model: "",
    tier: "",
    responsibilities: "",
    evidence: "",
    gaps: "",
    pricingId: "",
    alternatives: [],
  };
}
export function dateValid(s: string) {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s);
  if (!m) return false;
  const d = new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00Z`);
  return (
    Number(m[3]) >= 1900 &&
    Number.isFinite(+d) &&
    d.getUTCDate() === +m[1] &&
    d.getUTCMonth() + 1 === +m[2] &&
    d.getUTCFullYear() === +m[3]
  );
}
export function issues(a: Assessment) {
  const out: { field: keyof Assessment; message: string }[] = [];
  if (!a.name.trim())
    out.push({ field: "name", message: "Give this assessment a name before saving." });
  if (a.decisionDate && !dateValid(a.decisionDate))
    out.push({
      field: "decisionDate",
      message: "Use a real date in DD-MM-YYYY format, or leave it blank if unknown.",
    });
  return out;
}
export function parseAssessment(raw: string, site: string): Assessment {
  const a = JSON.parse(raw);
  if (
    !a ||
    a.version !== 1 ||
    a.site !== site ||
    typeof a.id !== "string" ||
    !a.id ||
    a.id.length > 100 ||
    !Number.isSafeInteger(a.revision) ||
    a.revision < 0
  )
    throw Error("Invalid assessment identity or site.");
  const template = newAssessment(site, a.id);
  for (const k of Object.keys(template)) {
    if (
      typeof template[k as keyof Assessment] === "string" &&
      (typeof a[k] !== "string" || a[k].length > 20000)
    )
      throw Error("Invalid assessment field: " + k);
  }
  if (a.model && !models.includes(a.model)) throw Error("Unknown service model.");
  if (a.tier && !tiers.includes(a.tier)) throw Error("Unknown service tier.");
  if (
    a.savedAt &&
    (!Number.isFinite(Date.parse(a.savedAt)) || new Date(a.savedAt).toISOString() !== a.savedAt)
  )
    throw Error("Invalid save timestamp.");
  return {
    ...Object.fromEntries(Object.keys(template).map((k) => [k, a[k]])),
    alternatives: parseAlternatives(a.alternatives, models, tiers),
  } as Assessment;
}
const key = (site: string) => "fern.precontract.assessments.v1." + encodeURIComponent(site);
type Storage = { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void };
export function readAssessments(s: Storage, site: string): Assessment[] {
  const raw = s.getItem(key(site));
  if (!raw) return [];
  const data = JSON.parse(raw);
  if (!Array.isArray(data) || data.length > 200)
    throw Error("Invalid assessment library; existing data retained.");
  const list = data.map((a) => parseAssessment(JSON.stringify(a), site));
  if (new Set(list.map((a) => a.id)).size !== list.length) throw Error("Duplicate assessment IDs.");
  return list;
}
export function saveAssessment(s: Storage, a: Assessment, now: string): Assessment {
  const clean = parseAssessment(JSON.stringify(a), a.site);
  const problems = issues(clean);
  if (problems.length) throw Error(problems[0].message);
  const list = readAssessments(s, a.site),
    prior = list.find((x) => x.id === a.id);
  if ((prior?.revision ?? 0) !== a.revision)
    throw Error(
      "This assessment changed in another tab. Download your draft and reopen the latest saved assessment.",
    );
  if (!prior && list.length >= 200) throw Error("This site has reached the 200 assessment limit.");
  const next = parseAssessment(
    JSON.stringify({ ...clean, revision: a.revision + 1, savedAt: now }),
    a.site,
  );
  s.setItem(key(a.site), JSON.stringify([...list.filter((x) => x.id !== a.id), next]));
  return next;
}
