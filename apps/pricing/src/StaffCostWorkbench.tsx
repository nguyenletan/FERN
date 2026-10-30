import PricingIssueExport from "./PricingIssueExport";
import PricingComparisonEditor from "./PricingComparisonEditor.tsx";
import {comparePricing} from "../../../packages/pricing-core/src/comparisons.ts";
import MaintenanceCostEditor from "./MaintenanceCostEditor.tsx";
import { importPricingRecord, costSummary } from "../../../packages/pricing-core/src/pricingHandover.ts";
import AdditionalCostEditor from "./AdditionalCostEditor.tsx";
import { useState } from "react";
import { readWorkbook } from "../../../packages/core/src/excelReader.ts";
import {
  allocatedHours,
  currencies,
  dateForDisplay,
  dateFromDisplay,
  emptyBaseline,
  mapStaffCard,
  parseBaseline,
  type StaffRole,
} from "../../../packages/pricing-core/src/staffCosts.ts";
const field = "border border-slate-300 rounded p-2 bg-white text-slate-900 w-full";
const button =
  "border border-slate-300 rounded px-3 py-2 bg-blue-50 text-blue-950 disabled:opacity-50";
export default function StaffCostWorkbench({ site }: { site: string }) {
  const [baseline, setBaseline] = useState(() => emptyBaseline(site));
  const [recordPreview, setRecordPreview] = useState<ReturnType<typeof importPricingRecord> | null>(null);
  const [dateText, setDateText] = useState("");
  const [preview, setPreview] = useState<{ name: string; roles: StaffRole[] } | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const summary = costSummary(baseline);
  const result = summary.staff;
  const extras = summary.additional;
  const annualTotal = summary.total;
  const key = `fern.pricing.staff.v1.${encodeURIComponent(site)}`;
  const update = (id: string, patch: Partial<StaffRole>) =>
    setBaseline((b) => ({
      ...b,
      roles: b.roles.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  const money = (n: number) =>
    `${baseline.currency} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  async function upload(file: File) {
    setBusy(true);
    setPreview(null);
    setMessage("");
    try {
      if (!/\.xlsx$/i.test(file.name)) throw new Error("Choose an .xlsx pricing workbook.");
      if (file.size > 15_000_000) throw new Error("Workbook limit is 15 MB.");
      const wb = await readWorkbook(await file.arrayBuffer());
      setPreview({ name: file.name, roles: mapStaffCard(wb.sheets) });
      setMessage("Preview ready. Current entries have not changed.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Import failed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-4"
      aria-label="BB staff cost baseline"
    >
      <div>
        <h2 id="pricing-basis" className="font-bold text-xl text-blue-950 scroll-mt-4">1. Basis and source data</h2>
        <p className="text-sm text-slate-600">
          Pricing assessment for {site}. Import Staff Rate Card or enter roles manually.
          Calculate annual costs and issue a provisional reference to Lifecycle and Pre-contract.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label>
          Currency
          <select className={field} value={baseline.currency}
            onChange={(e) => setBaseline({ ...baseline, currency: e.target.value })}>
            <option value="">Select currency</option>
            {baseline.currency && !currencies.some(([code]) => code === baseline.currency) && <option value={baseline.currency}>{baseline.currency} — saved currency</option>}
            {currencies.map(([code, label]) => <option key={code} value={code}>{label} — {code}</option>)}
          </select>
        </label>
        <label>
          Price base date
          <input
            type="text"
            placeholder="DD-MM-YYYY"
            maxLength={10}
            aria-describedby="bb-price-date-help"
            className={field}
            value={dateText}
            onChange={(e) => { setDateText(e.target.value); setBaseline({ ...baseline, baseDate: dateFromDisplay(e.target.value) }); }}
          />
        </label>
      </div>
      <p id="bb-price-date-help" className="text-sm text-slate-600">Enter day-month-year, for example 06-09-2026. A missing or invalid date blocks the total; a valid date allows calculation.</p>
      <p className="text-sm text-slate-600">Enter all rates in the selected currency. Changing currency does not convert amounts.</p>
      <label>
        Import BB pricing workbook — Staff Rate Card
        <input
          className={field}
          type="file"
          accept=".xlsx"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void upload(f);
            e.target.value = "";
          }}
        />
      </label>
      {busy && <p role="status">Reading workbook…</p>}
      {preview && (
        <div className="border rounded p-3 bg-blue-50">
          <h3 className="font-semibold">Import preview: {preview.name}</h3>
          <p>
            {preview.roles.length} roles found.{" "}
            {preview.roles.filter((r) => r.issues.length).length} roles have source warnings.
            Imported roles start excluded, with blank calculation rates and hours.
          </p>
          <ul className="text-sm list-disc pl-5">
            {preview.roles.map((r) => (
              <li key={r.id}>
                {r.role} — {r.sourceCell}; source hourly value: {r.sourceRate || "missing"}
                {r.issues.length ? ` (${r.issues.length} warnings)` : ""}
              </li>
            ))}
          </ul>
          <button
            className={button}
            onClick={() => {
              setBaseline((b) => ({ ...b, source: preview.name, roles: preview.roles }));
              setPreview(null);
              setMessage(
                "Imported roles replaced this draft’s role list. Enter applicable rates, hours and reconciliation evidence.",
              );
            }}
          >
            Replace draft roles with this import
          </button>{" "}
          <button className={button} onClick={() => setPreview(null)}>
            Cancel import
          </button>
        </div>
      )}
      <p className="text-sm">
        Source: {baseline.source}. Workbook formulas are retained as evidence and are not executed.
        Source rates are not automatically accepted.
      </p>
      <h2 id="pricing-staff" className="font-bold text-xl text-blue-950 scroll-mt-4">2. Staff and delivery teams</h2>
      <button
        className={button}
        onClick={() =>
          setBaseline((b) => ({
            ...b,
            roles: [
              ...b.roles,
              {
                id: crypto.randomUUID(),
                role: "",
                grade: "",
                rate: "",
                hours: "",
                included: true,
                sourceRate: "",
                sourceCell: "Manual entry",
                formula: "",
                issues: [],
                evidence: "",
              },
            ],
          }))
        }
      >
        Add staff role
      </button>
      {baseline.roles.map((r, i) => (
        <fieldset key={r.id} className="border border-slate-200 rounded p-3 flex flex-col gap-3">
          <legend className="font-semibold px-1">{r.role || `Staff role ${i + 1}`}</legend>
          <label>
            <input
              type="checkbox"
              checked={r.included}
              onChange={(e) => update(r.id, { included: e.target.checked })}
            />{" "}
            Include in this BB cost baseline
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <label>
              Role name
              <input
                className={field}
                value={r.role}
                onChange={(e) => update(r.id, { role: e.target.value })}
              />
            </label>
            <label>
              Amazon grade (if mapped)
              <input
                className={field}
                value={r.grade}
                onChange={(e) => update(r.id, { grade: e.target.value })}
              />
            </label>
            <label>
              Hourly cost rate
              <input
                className={field}
                type="number"
                min="0"
                step="any"
                value={r.rate}
                onChange={(e) => update(r.id, { rate: e.target.value })}
              />
            </label>
            <label>Hours calculation
              <select className={field} aria-label="Hours calculation" value={r.hoursMode || 'direct'} onChange={e=>update(r.id,{hoursMode:e.target.value as 'direct'|'team'})}>
                <option value="direct">Enter total allocated hours</option>
                <option value="team">Calculate from delivery team</option>
              </select>
            </label>
          </div>
          {r.hoursMode === 'team' ? <div className="grid sm:grid-cols-3 gap-3">
            <label>Headcount<input className={field} type="number" min="0" step="1" value={r.headcount ?? ''} onChange={e=>update(r.id,{headcount:e.target.value})}/></label>
            <label>Annual paid hours per person<input className={field} type="number" min="0" max="8784" step="any" value={r.paidHoursPerPerson ?? ''} onChange={e=>update(r.id,{paidHoursPerPerson:e.target.value})}/></label>
            <label>FM allocation (%)<input className={field} type="number" min="0" max="100" step="any" value={r.fmAllocation ?? ''} onChange={e=>update(r.id,{fmAllocation:e.target.value})}/></label>
            <p className="sm:col-span-3 text-sm">Allocated paid hours: {allocatedHours(r).hours?.toLocaleString() ?? 'Awaiting valid team inputs'}. Headcount × annual paid hours per person × FM allocation ÷ 100.</p>
          </div> : <label>Annual allocated paid hours<input className={field} type="number" min="0" step="any" value={r.hours} onChange={e=>update(r.id,{hours:e.target.value})}/></label>}
          <p className="text-sm text-slate-600">Choose one hours method per role. Team inputs replace direct hours in the calculation; they are never added together. FM allocation is the share of paid time charged to this scope, not a productivity or competence score. Use separate role rows for different working patterns. Productive capacity and shift coverage remain separate assessments.</p>
          <details>
            <summary className="cursor-pointer">Source evidence and warnings</summary>
            <p className="text-sm break-all">
              {r.sourceCell} · Source hourly value: {r.sourceRate || "not supplied"} · Formula:{" "}
              {r.formula || "none"}
            </p>
            <ul className="list-disc pl-5 text-sm">
              {r.issues.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </details>
          <label>
            Rate source / reconciliation rationale
            <textarea
              className={field}
              value={r.evidence}
              placeholder="Record applicable rate evidence and explain any source discrepancy. This is not formal approval."
              onChange={(e) => update(r.id, { evidence: e.target.value })}
            />
          </label>
          <button
            className={button}
            onClick={() =>
              setBaseline((b) => ({ ...b, roles: b.roles.filter((x) => x.id !== r.id) }))
            }
          >
            Remove {r.role || "role"}
          </button>
        </fieldset>
      ))}
      <div className="bg-slate-50 rounded p-3" aria-live="polite">
        <h3 className="font-semibold">Provisional annual BB staff cost</h3>
        {result.total === null ? (
          <>
            <p>Calculation needs the following inputs:</p>
            <ul className="list-disc pl-5">
              {result.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-xl font-bold">{money(result.total)}</p>
            <ul>
              {result.rows.map((r) => (
                <li key={r.id}>
                  {r.role}: {money(r.cost)} ({r.allocatedHours?.toLocaleString()} allocated hours)
                </li>
              ))}
            </ul>
            <p className="text-sm">
              Hourly rate × allocated annual paid hours.{" "}
              {baseline.roles.filter((r) => !r.included).length} roles excluded. This is a scoped
              staff-cost total, not the full FM cost or an approved price.
            </p>
          </>
        )}
      </div>
      <h2 id="pricing-extras" className="font-bold text-xl text-blue-950 scroll-mt-4">3. Additional costs and maintenance</h2>
      <AdditionalCostEditor items={baseline.additionalCosts ?? []} onChange={additionalCosts=>setBaseline(b=>({...b,additionalCosts}))}/>
      <MaintenanceCostEditor items={baseline.maintenanceCosts ?? []} currency={baseline.currency} onChange={maintenanceCosts=>setBaseline(b=>({...b,maintenanceCosts}))}/>
      <h2 id="pricing-output" className="font-bold text-xl text-blue-950 scroll-mt-4">4. Review and save</h2>
      <section aria-live="polite" className="bg-blue-50 rounded p-3">
        <h3 className="font-semibold">Provisional year 1 pricing baseline</h3>
        {annualTotal === null ? <><p>Combined total unavailable until all included costs and the pricing basis are valid.</p><ul className="list-disc pl-5">{extras.errors.map((e,i)=><li key={i}>{e}</li>)}</ul>{summary.maintenance.errors.map((e,i)=><p key={i}>{e}</p>)}</> : <>
          <p>Staff: {money(result.total!)}</p><p>Additional overheads: {money(extras.overhead!)}</p><p>Additional subcontractors: {money(extras.subcontractor!)}</p>
          <p>Scheduled task labour and materials in year 1: {money(summary.maintenance.firstYear!)}</p>
          <p className="font-bold text-xl">Total: {money(annualTotal)}</p>
          <p className="text-sm">Includes only the entered scope. {(baseline.additionalCosts ?? []).filter(i=>i.treatment!=='additional').length} additional-cost lines marked included elsewhere or outside scope. This is not a complete tender price or an approved cost baseline.</p>
        </>}
      </section>
      {summary.horizons&&<section aria-label="Multi-year pricing schedule" className="border rounded p-3 space-y-3">
        <h3 className="font-semibold">Provisional multi-year costs at constant prices</h3>
        <p className="text-sm">Staff and additional annual costs repeat each year. Task costs follow their entered schedules. These are undiscounted costs at the price base date: no inflation, discounting, replacement lifecycle or tax adjustment is applied. Amazon schedule and scope decisions remain open.</p>
        <div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">Cost totals by horizon</caption><thead><tr><th>Horizon</th><th>Total ({baseline.currency})</th></tr></thead><tbody>{summary.horizons.map(h=><tr key={h.years}><td>{h.years} years</td><td>{money(h.total)}</td></tr>)}</tbody></table></div>
        <details><summary>View annual cost schedule</summary><table className="w-full text-left"><thead><tr><th>Year</th><th>Task labour</th><th>Materials</th><th>Total incl. recurring costs</th></tr></thead><tbody>{summary.years!.map(y=><tr key={y.year}><td>{y.year}</td><td>{money(y.labour)}</td><td>{money(y.materials)}</td><td>{money(y.total)}</td></tr>)}</tbody></table></details>
      </section>}
      <PricingComparisonEditor baseline={baseline} total={annualTotal} onChange={setBaseline}/>
      <PricingIssueExport key={site} baseline={baseline} />
      <label>Restore from downloaded pricing record<input type="file" accept=".json" className={field} onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>15000000)throw Error('Pricing record limit is 15 MB.');setRecordPreview(importPricingRecord(await file.text(),site));setMessage('Record preview ready. Current draft unchanged.');}catch(e){setRecordPreview(null);setMessage(e instanceof Error?e.message:'Invalid pricing record.');}}}/></label>
      {recordPreview&&<div className="border rounded p-3"><p>Restore {recordPreview.roles.length} staff roles and {recordPreview.additionalCosts?.length??0} additional costs and {recordPreview.maintenanceCosts?.length??0} maintenance tasks for {recordPreview.site}? Totals will be recalculated from the saved inputs.</p><button className={button} onClick={()=>{setBaseline(recordPreview);setDateText(dateForDisplay(recordPreview.baseDate));setRecordPreview(null);setPreview(null);setMessage('Pricing record restored into draft. Save explicitly to retain it in this browser.');}}>Replace draft with pricing record</button><button className={button} onClick={()=>setRecordPreview(null)}>Cancel record restore</button></div>}
      <div className="flex flex-wrap gap-2">
        <button
          className={button}
          onClick={() => {
            try {
              localStorage.setItem(key, JSON.stringify(baseline));
              setMessage("BB baseline saved in this browser for " + site + ".");
            } catch {
              setMessage("Save failed. Your current entries are still available.");
            }
          }}
        >
          Save BB baseline
        </button>
        <button
          className={button}
          onClick={() => {
            try {
              const raw = localStorage.getItem(key);
              if (!raw) throw new Error("No saved BB baseline for this site.");
              const restored = parseBaseline(raw, site);
              setBaseline(restored);
              setDateText(dateForDisplay(restored.baseDate));
              setPreview(null);
              setMessage("Saved BB baseline restored.");
            } catch (e) {
              setMessage(e instanceof Error ? e.message : "Restore failed.");
            }
          }}
        >
          Restore saved BB baseline (replace draft)
        </button>
        <button
          className={button}
          disabled={annualTotal === null}
          onClick={() => {
            const blob = new Blob(
              [
                JSON.stringify(
                  {
                    method: "FERN-pricing-scheduled-costs-v3",
                    status: "provisional",
                    baseline,
                    result,
                    additionalCosts: extras,
                    annualTotal,
                    costSchedule: summary,
                    comparisons: comparePricing(baseline,annualTotal),
                  },
                  null,
                  2,
                ),
              ],
              { type: "application/json" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "FERN-BB-cost-record.json";
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          Download BB calculation record
        </button>
      </div>
      {message && <p role="status">{message}</p>}
    </section>
  );
}
