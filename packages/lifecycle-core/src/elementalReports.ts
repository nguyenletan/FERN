import type { Project, Result } from "./assetModel.ts";
export interface ElementRow {
  code: string;
  name: string;
  year: number;
  renewal: number;
  maintenance: number;
}
export function elementalRows(p: Project, r: Result, level: 1 | 2): ElementRow[] {
  if (r.issues.length || r.renewal === null || !r.assetCosts)
    throw new Error("Complete calculation inputs before elemental reporting.");
  if (!p.catalog?.length)
    throw new Error("Load the asset classification reference before elemental reporting.");
  const map = new Map<string, ElementRow>();
  for (const a of p.assets) {
    const d = p.details?.[a.id];
    if (d && !d.renewalScope && !d.maintenanceScope) continue;
    if (!p.catalog.some((c) => c.code === a.code))
      throw new Error(
        `Asset ${a.id}: code ${a.code} is not in the loaded classification reference.`,
      );
    const code = a.code.split(".").slice(0, level).join(".");
    const group = p.catalog.find((c) => c.code === code);
    if (!group) throw new Error(`Asset ${a.id}: Level ${level} grouping is missing.`);
    const cost = r.assetCosts.find((c) => c.id === a.id)!;
    for (const y of r.years) {
      const key = code + ":" + y.year;
      const row = map.get(key) ?? {
        code,
        name: level === 1 ? group.group : group.element,
        year: y.year,
        renewal: 0,
        maintenance: 0,
      };
      row.renewal += r.events
        .filter((e) => e.id === a.id && Math.floor(e.time) === y.year)
        .reduce((n, e) => n + e.cost, 0);
      row.maintenance += cost.annualMaintenance;
      map.set(key, row);
    }
  }
  return [...map.values()].sort(
    (a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }) || a.year - b.year,
  );
}
export function elementalCsv(p: Project, r: Result, level: 1 | 2): string {
  const rows = elementalRows(p, r, level),
    m = p.metadata;
  if (!m?.title.trim() || !m.priceBaseDate.trim() || !m.planNumber.trim())
    throw new Error("Complete project title, cost plan number and price base date for the report.");
  const gifa = m.gifa.trim() ? Number(m.gifa) : null;
  if (gifa !== null && (!Number.isFinite(gifa) || gifa <= 0))
    throw new Error("GIFA must be positive or blank.");
  const csv = (v: unknown) =>
    '"' +
    String(v ?? "")
      .replace(/^[=+@\-\t\r]/, "'$&")
      .replace(/"/g, '""') +
    '"';
  return [
    [
      "Report",
      `NRM3 Appendix ${level === 1 ? "E" : "F"} structure — Level ${level}; draft elemental cost plan`,
    ],
    ["Site", p.site],
    ["Project", m.title],
    ["Cost plan", m.planNumber],
    ["Price base date", m.priceBaseDate],
    ["Horizon", p.start, p.end],
    ["Basis", p.basis],
    ["Classification reference", p.catalogSource ?? ""],
    ["Functional unit", m.functionalUnit],
    ["Asset classification", m.classification],
    ["Operating hours", m.hours],
    ["Storeys", m.storeys],
    ["GIFA m2", m.gifa],
    ["Maintainable area m2", m.maintainableArea],
    ["Location/index", m.locationIndex],
    [
      "Scope",
      `Constant ${p.currency??"GBP"}, undiscounted. Included asset groups only; omitted groups are not zero. Professional review required.`,
    ],
    ["Cost category", "Code", "Description", "Year", `Cost ${p.currency??"GBP"}`, "Cost per m2 GIFA for year"],
    ...(["renewal", "maintenance"] as const).flatMap((category) =>
      rows.map((row) => [
        category === "renewal" ? "Renewal (R)" : "Maintain (M)",
        row.code,
        row.name,
        row.year,
        row[category].toFixed(2),
        gifa === null ? "Not available" : (row[category] / gifa).toFixed(2),
      ]),
    ),
    ["Renewal total", r.renewal],
    ["Maintenance total", r.maintenance],
    ["Combined total", r.renewal! + r.maintenance!],
    [
      "Combined per m2 per annum",
      gifa === null
        ? "Not available"
        : ((r.renewal! + r.maintenance!) / (gifa * r.years.length)).toFixed(2),
    ],
  ]
    .map((row) => row.map(csv).join(","))
    .join("\r\n");
}
