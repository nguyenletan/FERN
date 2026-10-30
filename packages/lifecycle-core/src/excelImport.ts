import { readWorkbook, type Sheet, type Cell } from "../../core/src/excelReader.ts";
export { readWorkbook } from "../../core/src/excelReader.ts";
export type { Cell, Sheet } from "../../core/src/excelReader.ts";
import { blankAsset, emptyProject, type Project, type Asset } from "./assetModel.ts";
import { emptyDetail, type Classification, type Task } from "./nrmStructure.ts";
export interface Intake {
  fileName: string;
  sheets: string[];
  kind: string;
  project: Project;
  warnings: string[];
  formulaCount: number;
  macros: boolean;
}
const clean = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
function headers(s: Sheet) {
  const head = s.rows[1] ?? {};
  return Object.fromEntries(Object.entries(head).map(([k, v]) => [clean(v.value), k]));
}
export function mapWorkbook(
  sheets: Sheet[],
  fileName: string,
  site: string,
  macros = false,
): Intake {
  const project = emptyProject(site);
  project.details = {};
  const warnings: string[] = [];
  let formulaCount = 0;
  const register = sheets.find((s) => s.name === "3. Asset Register");
  const official = sheets.find((s) => s.name === "4. NRM3 Logic&Levels Table 2026");
  const hierarchy = sheets.find((s) => s.name === "2. NRM3 Hierarchy");
  const maintenance = sheets.find((s) => s.name === "5. Maintenance Schedule");
  if (!register && !official && !hierarchy)
    throw new Error("No supported asset register or 2026 classification sheet found.");
  const value = (row: Record<string, Cell>, col: string) => {
    const c = row[col];
    if (c?.formula) {
      formulaCount++;
      return "";
    }
    if (c?.value?.startsWith("#")) return "";
    return c?.value ?? "";
  };
  if (official) {
    let group = "",
      element = "",
      sub = "";
    project.catalog = [];
    for (const [n, row] of Object.entries(official.rows)) {
      if (Number(n) < 6 || !row.C?.value) continue;
      group = row.E?.value || group;
      if (row.F?.value) {
        element = row.G?.value || "";
        sub = "";
      }
      if (row.D?.value) {
        element = "";
        sub = "";
      }
      if (row.H?.value) sub = row.I?.value || "";
      project.catalog.push({
        code: row.C.value,
        level: row.A?.value || "",
        group,
        element,
        subElement: sub,
        assetType: row.K?.value || "",
        product: row.O?.value || "",
        renewalUnit: row.L?.value || "",
        maintenanceUnit: row.M?.value || "",
        workPackage: row.P?.value || "",
      });
    }
    project.catalogSource = `${fileName} / ${official.name} / January 2026`;
  } else if (hierarchy) {
    const h = headers(hierarchy);
    if (h["nrm3 code"] && h["level"] && h["group element (l1)"] && h["element (l2)"]) {
      project.catalog = [];
      for (const [n, row] of Object.entries(hierarchy.rows)) {
        if (Number(n) === 1) continue;
        const v = (label: string) => value(row, h[clean(label)]);
        if (!v("NRM3 Code")) continue;
        project.catalog.push({
          code: v("NRM3 Code"),
          level: v("Level"),
          group: v("Group Element (L1)"),
          element: v("Element (L2)"),
          subElement: v("Sub Element (L3)"),
          assetType: v("Maintainable Asset (L4)"),
          product: v("Product/Material (L5)"),
          renewalUnit: v("UoM Renewal"),
          maintenanceUnit: v("UoM Maint"),
          workPackage: "",
        });
      }
      project.catalogSource = `${fileName} / ${hierarchy.name} / supplied template (version to verify)`;
    }
  }
  if (register) {
    const h = headers(register);
    for (const name of ["#", "nrm3 code", "description", "qty", "rsl (oem)", "rate ren (£)"])
      if (!h[name]) throw new Error(`Register column missing: ${name}`);
    for (const [n, row] of Object.entries(register.rows)) {
      if (Number(n) === 1) continue;
      const v = (label: string) => value(row, h[clean(label)]);
      if (!v("NRM3 Code").trim() && !v("Description").trim()) continue;
      const id = v("#").trim();
      if (!id || project.assets.some((a) => a.id === id))
        throw new Error(`Missing or duplicate asset reference at row ${n}.`);
      const a: Asset = {
        ...blankAsset(id),
        code: v("NRM3 Code"),
        description: v("Description"),
        quantity: v("Qty"),
        unit: v("UoM Ren"),
        rate: v("Rate Ren (£)"),
        maintenanceUnit: v("UoM Mnt"),
        firstYear: v("Adj Ren Yr"),
        evidence: `${fileName} / ${register.name} / row ${n}. ${v("Notes")}`,
      };
      const d = emptyDetail();
      Object.assign(d, {
        level: v("Lvl"),
        group: v("Group Element"),
        element: v("Element"),
        subElement: v("Sub Element"),
        product: v("Product/Material"),
        location: v("Location"),
        installed: v("Yr Installed"),
        condition: v("Cond (1-4)"),
        oemLife: v("RSL (OEM)"),
        cibseLife: v("RSL (CIBSE)"),
        source: `${fileName} / ${register.name} / row ${n}`,
        sourceCells: Object.fromEntries(
          Object.entries(row).map(([col, c]) => [`${register.name}!${col}${n}`, c]),
        ),
      });
      project.assets.push(a);
      project.details![id] = d;
    }
    if (project.assets.length > 5000) throw new Error("Limit is 5,000 assets.");
    if (maintenance) {
      const h = headers(maintenance);
      const refcol = h["ref no"] ?? h["#"];
      for (const [n, row] of Object.entries(maintenance.rows)) {
        if (Number(n) === 1) continue;
        const v = (label: string) => value(row, h[clean(label)]);
        const id = value(row, refcol);
        const a = project.assets.find((x) => x.id === id);
        if (!a) continue;
        const d = project.details![id];
        const source = `${fileName} / ${maintenance.name} / row ${n}`;
        const frequency = h["annual freq (nr/yr)"]
          ? v("Annual Freq (Nr/yr)")
          : ["D", "W", "M", "Q", "HY", "Y"].every((k) => !row[h[k.toLowerCase()]]?.formula) &&
              ["D", "W", "M", "Q", "HY", "Y"].some((k) => v(k).trim())
            ? String(
                ["D", "W", "M", "Q", "HY", "Y"].reduce(
                  (sum, k, i) => sum + (v(k).trim() ? Number(v(k)) : 0) * [365, 52, 12, 4, 2, 1][i],
                  0,
                ),
              )
            : "";
        const task: Task = {
          id: `excel-${n}`,
          description: v("Task Description") || v("Asset Description") || v("Description"),
          standard: v("Standard") || v("Standard Applied (BBM->SFG20->Bespoke)"),
          reference: v("SFG20 Code"),
          quantity: v("Qty"),
          unit: a.maintenanceUnit,
          rate: v("Unit Rate (£/visit)") || v("Rate Mnt (£)"),
          frequency,
          source,
        };
        if (h["annual freq (nr/yr)"] || task.description || task.rate || task.frequency)
          d.tasks.push(task);
        for (const [col, c] of Object.entries(row))
          d.sourceCells[`${maintenance.name}!${col}${n}`] = c;
      }
    }
    warnings.push(
      "RSL selection, life factors, renewal extent and price basis require review. Original OEM/CIBSE values and formulas are retained in source details.",
    );
  }
  if (formulaCount)
    warnings.push(
      `${formulaCount} mapped formula cells were left unset. Cached results are retained as source evidence only; macros and formulas are not executed.`,
    );
  if (macros) warnings.push("Macro-enabled workbook: VBA is not executed.");
  const supplemental = sheets.find((s) => /supplementary/i.test(s.name));
  if (supplemental)
    warnings.push(
      `${supplemental.name} is present. Supplementary components are not automatically promoted to physical assets; add them with parent references after scope review.`,
    );
  return {
    fileName,
    sheets: sheets.map((s) => s.name),
    kind: official
      ? "Asset classification reference"
      : register
        ? "Asset register"
        : "Asset register template",
    project,
    warnings,
    formulaCount,
    macros,
  };
}
export function mergeIntake(
  current: Project,
  intake: Intake,
): { project: Project; added: number; skipped: number } {
  const ids = new Set(current.assets.map((a) => a.id));
  const added = intake.project.assets.filter((a) => !ids.has(a.id));
  const details = { ...current.details };
  for (const a of added) details[a.id] = intake.project.details![a.id];
  for (const a of current.assets) {
    const incoming = intake.project.assets.find(
      (x) => x.id === a.id && x.code === a.code && x.description === a.description,
    );
    if (incoming && !details[a.id]) {
      const d = { ...intake.project.details![a.id] };
      if (
        [
          [a.maintenanceQuantity, d.tasks[0]?.quantity],
          [a.maintenanceRate, d.tasks[0]?.rate],
          [a.frequency, d.tasks[0]?.frequency],
          [a.maintenanceUnit, d.tasks[0]?.unit],
        ].some(([v, incoming]) => v?.trim() && v !== "TBC" && v !== incoming)
      )
        d.tasks = [];
      details[a.id] = d;
    }
  }
  if (current.assets.length + added.length > 5000)
    throw new Error("Merged assessment exceeds 5,000 assets.");
  return {
    project: {
      ...current,
      assets: [...current.assets, ...added],
      details,
      ...(intake.project.catalog
        ? { catalog: intake.project.catalog, catalogSource: intake.project.catalogSource }
        : {}),
    },
    added: added.length,
    skipped: intake.project.assets.length - added.length,
  };
}
