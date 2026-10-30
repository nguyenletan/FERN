import {validateSensitivities,type SensitivityCase} from "./sensitivity.ts";
import {validateEconomics,type Economics} from "./economics.ts";
import {currencies} from "../../core/src/currencies.ts";
import {
  validateExtensions,
  type Metadata,
  type Classification,
  type AssetDetail,
} from "./nrmStructure.ts";
import {
  predictedLife,
  renewalEvents,
  renewalQuantity,
  renewalEventCost,
} from "./nrm3Calculations.ts";

export const fields = {
  id: "Asset reference",
  code: "Asset classification code",
  description: "Description",
  unit: "Renewal unit",
  quantity: "Renewal quantity",
  rsl: "Reference service life (years)",
  factors: "Life factors (comma separated)",
  firstYear: "First renewal year",
  extent: "Renewal extent (0–1)",
  rate: "Direct renewal rate (selected currency/unit)",
  maintenanceQuantity: "Maintenance quantity",
  maintenanceUnit: "Maintenance unit",
  maintenanceRate: "Maintenance task rate (selected currency/unit/visit)",
  frequency: "Maintenance visits per year",
  evidence: "Source and assumptions",
} as const;
export type Asset = Record<keyof typeof fields, string>;
export interface Project {
  sensitivities?: SensitivityCase[];
  economics?: Economics;
  currency?: string; // Missing legacy field denotes the previous GBP-only format.
  version: 1;
  site: string;
  start: string;
  end: string;
  basis: string;
  assets: Asset[];
  metadata?: Metadata;
  details?: Record<string, AssetDetail>;
  catalog?: Classification[];
  catalogSource?: string;
}
export function blankAsset(id: string): Asset {
  return Object.fromEntries(Object.keys(fields).map((k) => [k, k === "id" ? id : ""])) as Asset;
}
export function emptyProject(site: string): Project {
  return { version: 1, site, currency: "", start: "2026", end: "2050", basis: "", assets: [] };
}
export function parseProject(raw: string): Project {
  const p = JSON.parse(raw);
  if (
    !p ||
    p.version !== 1 ||
    !["site", "start", "end", "basis"].every((k) => typeof p[k] === "string") ||
    !Array.isArray(p.assets) ||
    p.assets.length > 5000
  )
    throw new Error("Expected a FERN version 1 project with at most 5,000 assets.");
  const ids = new Set<string>();
  for (const a of p.assets) {
    if (
      !a ||
      !Object.keys(fields).every((k) => typeof a[k] === "string") ||
      !a.id.trim() ||
      ids.has(a.id)
    )
      throw new Error(
        "Every asset must have the expected text fields and a unique, non-empty reference.",
      );
    ids.add(a.id);
  }
  if(p.currency!==undefined && (typeof p.currency!=="string" || (p.currency!=="" && !currencies.some(([code])=>code===p.currency))))throw new Error("Unsupported Lifecycle currency.");
  if(p.economics!==undefined)validateEconomics(p.economics);
  if(p.sensitivities!==undefined)validateSensitivities(p.sensitivities);
  validateExtensions(p);
  return {
    ...(p.metadata ? { metadata: p.metadata } : {}),
    ...(p.details ? { details: p.details } : {}),
    ...(p.catalog ? { catalog: p.catalog } : {}),
    ...(p.catalogSource !== undefined ? { catalogSource: p.catalogSource } : {}),
    version: 1,
    site: p.site,
    start: p.start,
    end: p.end,
    basis: p.basis,
    ...(p.sensitivities!==undefined?{sensitivities:p.sensitivities}:{}),
    ...(p.economics!==undefined?{economics:p.economics}:{}),
    currency: p.currency ?? "GBP",
    assets: p.assets.map(
      (a: Asset) =>
        Object.fromEntries(Object.keys(fields).map((k) => [k, a[k as keyof Asset]])) as Asset,
    ),
  };
}
function number(value: string, label: string, positive = false) {
  if (
    !value.trim() ||
    !Number.isFinite(Number(value)) ||
    Number(value) < 0 ||
    (positive && Number(value) === 0)
  )
    throw new Error(`${label}: enter ${positive ? "a positive" : "a non-negative"} number`);
  return Number(value);
}
export interface Result {
  years: { year: number; renewal: number; maintenance: number }[];
  issues: { id: string; message: string }[];
  renewal: number | null;
  maintenance: number | null;
  events: { id: string; time: number; cost: number }[];
  assetCosts?: { id: string; annualMaintenance: number; renewal: number }[];
}
export function calculate(p: Project): Result {
  const result: Result = { years: [], issues: [], renewal: null, maintenance: null, events: [] };
  let start: number, end: number;
  try {
    if(!currencies.some(([code])=>code===(p.currency??"GBP")))throw new Error("Select a Lifecycle currency.");
    start = number(p.start, "Start year", true);
    end = number(p.end, "End year", true);
    if (!Number.isInteger(start) || !Number.isInteger(end) || end < start || end - start > 100)
      throw new Error("Use whole calendar years and a horizon of 1–101 years.");
    if (!p.site.trim() || !p.basis.trim())
      throw new Error("Enter site and cost basis / scope assumptions.");
    if (!p.assets.length) throw new Error("Add at least one asset.");
  } catch (e) {
    result.issues.push({ id: "Project", message: (e as Error).message });
    return result;
  }
  const years = Array.from({ length: end - start + 1 }, (_, i) => ({
    year: start + i,
    renewal: 0,
    maintenance: 0,
  }));
  const events: Result["events"] = [];
  const assetCosts: NonNullable<Result["assetCosts"]> = [];
  for (const a of p.assets) {
    try {
      const detail = p.details?.[a.id];
      const renew = detail?.renewalScope ?? true,
        maintain = detail?.maintenanceScope ?? true;
      if (!renew && !maintain) {
        assetCosts.push({ id: a.id, annualMaintenance: 0, renewal: 0 });
        continue;
      }
      if (!a.description.trim() || !a.code.trim() || !a.evidence.trim())
        throw new Error("Complete description, asset classification code and source/assumptions.");
      if (detail?.parentId) {
        const parent = p.assets.find((x) => x.id === detail.parentId);
        if (!parent || parent.id === a.id)
          throw new Error("Parent reference is missing or refers to this asset.");
        const pd = p.details?.[parent.id];
        if ((renew && (pd?.renewalScope ?? true)) || (maintain && (pd?.maintenanceScope ?? true)))
          throw new Error(
            "Parent and component share cost scope. Exclude the parent or component from that scope before totals.",
          );
      }
      let ownRenewal = 0,
        maintenance = 0;
      if (renew) {
        if (!a.unit.trim()) throw new Error("Renewal unit is required.");
        const interval = predictedLife(
          number(a.rsl, "Reference life", true),
          a.factors.split(",").map((x) => number(x, "Life factor", true)),
        );
        const first = number(a.firstYear, "First renewal year", true);
        if (first < start)
          throw new Error("First renewal predates horizon: resolve overdue work explicitly.");
        const cost = renewalEventCost(
          renewalQuantity(number(a.quantity, "Quantity"), number(a.extent, "Renewal extent")),
          number(a.rate, "Renewal rate"),
        );
        const times = renewalEvents(first, interval, start, end + 1).filter((t) => t < end + 1);
        for (const time of times) {
          years[Math.floor(time) - start].renewal += cost;
          events.push({ id: a.id, time, cost });
          ownRenewal += cost;
        }
      }
      if (maintain) {
        if (detail?.tasks.length) {
          for (const task of detail.tasks) {
            if (!task.description.trim() || !task.unit.trim() || !task.source.trim())
              throw new Error("Maintenance task requires description, unit and source.");
            maintenance +=
              number(task.quantity, "Task quantity") *
              number(task.rate, "Task rate") *
              number(task.frequency, "Task annual frequency");
          }
        } else {
          if (!a.maintenanceUnit.trim()) throw new Error("Maintenance unit is required.");
          maintenance =
            number(a.maintenanceQuantity, "Maintenance quantity") *
            number(a.maintenanceRate, "Maintenance rate") *
            number(a.frequency, "Maintenance frequency");
        }
        if (!Number.isFinite(maintenance))
          throw new Error("Maintenance calculation exceeds numeric range.");
      }
      for (const row of years) row.maintenance += maintenance;
      assetCosts.push({ id: a.id, annualMaintenance: maintenance, renewal: ownRenewal });
    } catch (e) {
      result.issues.push({ id: a.id, message: (e as Error).message });
    }
  }
  if (result.issues.length) return result; // Never expose partial sums as complete project totals.
  const renewal = years.reduce((n, y) => n + y.renewal, 0),
    maintenance = years.reduce((n, y) => n + y.maintenance, 0);
  if (!Number.isFinite(renewal + maintenance)) {
    result.issues.push({ id: "Project", message: "Totals exceed numeric range." });
    return result;
  }
  return { ...result, years, events, renewal, maintenance, assetCosts };
}
export function reportCsv(p: Project, r: Result): string {
  if (r.issues.length || r.renewal === null)
    throw new Error("Resolve validation gaps before exporting costs.");
  const cell = (s: string | number) =>
    '"' +
    String(s)
      .replace(/^[=+@\-\t\r]/, "'$&")
      .replace(/"/g, '""') +
    '"';
  return [
    ["Site", p.site],
    ["Cost basis", p.basis],
    ["Currency", p.currency ?? "GBP"],
    ["Method", "NRM3 R/M initial estimate; constant prices, undiscounted; review required"],
    ["Year", `Renewal ${p.currency??"GBP"}`, `Maintenance ${p.currency??"GBP"}`, `Combined ${p.currency??"GBP"}`],
    ...r.years.map((y) => [
      y.year,
      y.renewal.toFixed(2),
      y.maintenance.toFixed(2),
      (y.renewal + y.maintenance).toFixed(2),
    ]),
  ]
    .map((row) => row.map(cell).join(","))
    .join("\r\n");
}
