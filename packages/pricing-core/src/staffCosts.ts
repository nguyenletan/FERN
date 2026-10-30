import {validateComparisons,type PricingComparison,type ComparisonBasis} from "./comparisons.ts";
import {validateMaintenance, type MaintenanceCost} from "./maintenanceCosts.ts";
import { validateAdditional, type AdditionalCost } from "./additionalCosts.ts";
import type { Sheet, Cell } from "../../core/src/excelReader.ts";
export interface StaffRole {
  hoursMode?: "direct" | "team";
  headcount?: string;
  paidHoursPerPerson?: string;
  fmAllocation?: string;
  id: string;
  role: string;
  grade: string;
  rate: string;
  hours: string;
  included: boolean;
  sourceRate: string;
  sourceCell: string;
  formula: string;
  issues: string[];
  evidence: string;
}
export interface StaffBaseline {
  comparisons?: PricingComparison[];
  comparisonBasis?: ComparisonBasis;
  additionalCosts?: AdditionalCost[];
  maintenanceCosts?: MaintenanceCost[];
  version: 1;
  site: string;
  currency: string;
  baseDate: string;
  source: string;
  roles: StaffRole[];
}
export const emptyBaseline = (site: string): StaffBaseline => ({
  version: 1,
  site,
  currency: "",
  baseDate: "",
  source: "Manual entry",
  roles: [],
});
export function column(n: number): string {
  let s = "";
  for (; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}
export function mapStaffCard(sheets: Sheet[]): StaffRole[] {
  const sheet = sheets.find((s) => s.name.trim().toLowerCase() === "staff rate card");
  if (!sheet) throw new Error("This workbook has no Staff Rate Card worksheet.");
  const cell = (r: number, c: number): Cell =>
    sheet.rows[r]?.[column(c)] ?? { value: "", formula: "" };
  if (!/hourly rate/i.test(cell(4, 1).value) || !/base pay/i.test(cell(6, 1).value))
    throw new Error(
      "Unsupported Staff Rate Card layout: expected hourly rate in row 4 and base pay in row 6.",
    );
  const roles: StaffRole[] = [];
  for (let c = 2; c <= 200; c += 3) {
    const role = cell(3, c).value.trim();
    if (!role) continue;
    const rate = cell(4, c + 1);
    const issues: string[] = [];
    if (rate.formula)
      issues.push(
        "Source hourly rate is a formula; its cached value is a reference, not a verified rate.",
      );
    for (let r = 9; r <= 39; r++) {
      const percent = cell(r, c),
        amount = cell(r, c + 1);
      if (
        percent.value.trim() &&
        Number(percent.value) !== 0 &&
        Number.isFinite(Number(percent.value)) &&
        !amount.value.trim() &&
        !amount.formula
      )
        issues.push(
          `${cell(r, 1).value || "Cost component"}: ${column(c)}${r} has a non-zero input but ${column(c + 1)}${r} is blank.`,
        );
    }
    if (!rate.value.trim() || !Number.isFinite(Number(rate.value)) || Number(rate.value) <= 0)
      issues.push("Source hourly rate is missing, zero or invalid.");
    roles.push({
      id: `staff-${column(c)}`,
      role,
      grade: "",
      rate: "",
      hours: "",
      included: false,
      sourceRate: rate.value,
      sourceCell: `Staff Rate Card!${column(c + 1)}4`,
      formula: rate.formula,
      issues,
      evidence: "",
    });
  }
  if (!roles.length) throw new Error("No staff roles found in the supported layout.");
  return roles;
}
export function allocatedHours(r: StaffRole): {hours: number | null; errors: string[]} {
 const errors: string[]=[];
 if(r.hoursMode === 'team') {
  for(const [value,label,max] of [[r.headcount,'headcount',Infinity],[r.paidHoursPerPerson,'annual paid hours per person',8784],[r.fmAllocation,'FM allocation percentage',100]] as const){
   if(typeof value!=='string'||!value.trim()||!Number.isFinite(Number(value))||Number(value)<0||Number(value)>max)errors.push(`${r.role}: enter valid ${label}${Number.isFinite(max)?` (0–${max})`:''}.`);
  }
  if(!errors.length && !Number.isInteger(Number(r.headcount)))errors.push(`${r.role}: headcount must be a whole number; use allocation for shared resources.`);
  const hours=Number(r.headcount)*Number(r.paidHoursPerPerson)*Number(r.fmAllocation)/100;
  if(!Number.isFinite(hours)&&!errors.length)errors.push(`${r.role}: allocated hours exceed calculation limits.`);
  return {hours:errors.length?null:hours,errors};
 }
 if(!r.hours.trim()||!Number.isFinite(Number(r.hours))||Number(r.hours)<0)errors.push(`${r.role}: enter non-negative annual allocated paid hours.`);
 return {hours:errors.length?null:Number(r.hours),errors};
}
export function staffTotal(b: StaffBaseline, allowEmpty = false) {
  const errors: string[] = [];
  const selected = b.roles.filter((r) => r.included);
  if (!b.site.trim()) errors.push("Enter a site.");
  if (!/^[A-Z]{3}$/.test(b.currency)) errors.push("Select a currency.");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(b.baseDate) ||
    !Number.isFinite(Date.parse(b.baseDate)) ||
    new Date(b.baseDate).toISOString().slice(0, 10) !== b.baseDate
  )
    errors.push("Enter a valid price base date (DD-MM-YYYY).");
  if (!selected.length && !allowEmpty) errors.push("Select at least one role for this baseline.");
  const rows = selected.map((r) => {
    if (!r.role.trim()) errors.push("An included role needs a name.");
    if (!r.rate.trim() || !Number.isFinite(Number(r.rate)) || Number(r.rate) <= 0)
      errors.push(`${r.role}: enter a positive hourly rate.`);
    const allocated = allocatedHours(r);
    errors.push(...allocated.errors);
    if (!r.evidence.trim())
      errors.push(`${r.role}: record the rate source/reconciliation rationale.`);
    const cost = Number(r.rate) * (allocated.hours ?? NaN);
    if (!Number.isFinite(cost)) errors.push(`${r.role}: cost exceeds calculation limits.`);
    return { id: r.id, role: r.role, allocatedHours: allocated.hours, cost };
  });
  const total = rows.reduce((n, r) => n + r.cost, 0);
  if (!Number.isFinite(total)) errors.push("Total exceeds calculation limits.");
  return { errors, rows, total: errors.length ? null : total };
}
export function parseBaseline(raw: string, site: string): StaffBaseline {
  const b = JSON.parse(raw);
  if (b?.version !== 1 || b.site !== site || !Array.isArray(b.roles) || b.roles.length > 1000)
    throw new Error("Saved baseline has an unsupported format or site.");
  for (const k of ["currency", "baseDate", "source"])
    if (typeof b[k] !== "string") throw new Error("Invalid saved baseline.");
  const ids = new Set();
  for (const r of b.roles) {
    for (const k of [
      "id",
      "role",
      "grade",
      "rate",
      "hours",
      "sourceRate",
      "sourceCell",
      "formula",
      "evidence",
    ])
      if (typeof r?.[k] !== "string") throw new Error("Invalid saved role.");
    if (
      ids.has(r.id) ||
      typeof r.included !== "boolean" ||
      !Array.isArray(r.issues) ||
      r.issues.some((s: unknown) => typeof s !== "string")
    )
      throw new Error("Invalid saved role.");
    if(r.hoursMode !== undefined && !["direct","team"].includes(r.hoursMode)) throw new Error("Invalid saved hours mode.");
    for(const key of ["headcount","paidHoursPerPerson","fmAllocation"]) if(r[key] !== undefined && typeof r[key] !== "string") throw new Error("Invalid saved team input.");
    ids.add(r.id);
  }
  if (b.additionalCosts !== undefined) validateAdditional(b.additionalCosts);
  if (b.maintenanceCosts !== undefined) validateMaintenance(b.maintenanceCosts);
  if(b.comparisons!==undefined)validateComparisons(b.comparisons);
  if(b.comparisonBasis!==undefined)for(const key of ["scope","serviceLevel","taxBasis"])if(typeof b.comparisonBasis?.[key]!=="string")throw Error("Invalid comparison basis.");
  return b;
}

// UI dates use day-month-year; saved records retain their existing ISO representation.
export function dateForDisplay(iso: string): string {
 const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
 return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}
export function dateFromDisplay(value: string): string {
 const m=/^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
 return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}
export {currencies} from "../../core/src/currencies.ts";
