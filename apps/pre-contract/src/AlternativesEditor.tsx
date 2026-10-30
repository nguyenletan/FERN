import AlternativePricingPanel from "./AlternativePricingPanel";
import { useState } from "react";
import { models, tiers, type Assessment } from "../../../packages/pre-contract-core/src/assessment";
import {
  newAlternative,
  type Alternative,
} from "../../../packages/pre-contract-core/src/alternatives";
const field = "block w-full border border-slate-300 rounded-lg p-3 bg-white mt-1";
const button = "rounded-lg border px-4 py-2 bg-white text-blue-950";
export function AlternativesComparison({ assessment }: { assessment: Assessment }) {
  return (
    <section className="space-y-3">
      <h3 className="font-bold text-lg">Current arrangement and alternatives</h3>
      <p className="text-sm">
        Descriptive comparison of your inputs. Shortlisting and exclusions are analyst entries, not
        an approved recommendation. No cost savings, service scores or compliance outcomes are
        inferred.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <caption className="text-left mb-2">
            Service model and tier comparison — provisional
          </caption>
          <thead>
            <tr>
              {[
                "Option",
                "Model / tier",
                "Scope / differences",
                "Maintenance and mandatory floor",
                "Benefits / risks",
                "Time impacts",
                "Evidence / open issues",
              ].map((h) => (
                <th className="border p-3" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border p-3">Current arrangement</th>
              <td className="border p-3">
                {assessment.model || "Not recorded"} / {assessment.tier || "Not recorded"}
              </td>
              <td className="border p-3 whitespace-pre-wrap">
                {assessment.scope || "Not recorded"}
                <br />
                {assessment.responsibilities}
              </td>
              <td className="border p-3">
                See current-arrangement evidence; structured baseline strategy review pending.
              </td>
              <td className="border p-3">Not assessed</td>
              <td className="border p-3">Not assessed</td>
              <td className="border p-3 whitespace-pre-wrap">
                {assessment.evidence || "No evidence recorded"}
                <br />
                {assessment.gaps}
              </td>
            </tr>
            {assessment.alternatives.map((a, i) => (
              <tr key={a.id}>
                <th className="border p-3">
                  {a.name || `Unnamed option ${i + 1}`}
                  <p>{a.disposition}</p>
                  <p>{a.reason}</p>
                </th>
                <td className="border p-3">
                  {a.model || "Not recorded"} / {a.tier || "Not recorded"}
                </td>
                <td className="border p-3 whitespace-pre-wrap">
                  {a.scope || "Not recorded"}
                  <br />
                  {a.exceptions}
                </td>
                <td className="border p-3 whitespace-pre-wrap">
                  {a.strategies || "Strategy not recorded"}
                  <br />
                  {a.mandatoryFloor || "Mandatory-floor evidence not recorded"}
                </td>
                <td className="border p-3 whitespace-pre-wrap">
                  Benefits: {a.benefits || "Not assessed"}
                  <br />
                  Risks: {a.risks || "Not assessed"}
                </td>
                <td className="border p-3 whitespace-pre-wrap">
                  Short: {a.shortTerm || "Not assessed"}
                  <br />
                  Medium: {a.mediumTerm || "Not assessed"}
                  <br />
                  Long: {a.longTerm || "Not assessed"}
                </td>
                <td className="border p-3 whitespace-pre-wrap">
                  {a.evidence || "No evidence recorded"}
                  <br />
                  {a.gaps || "Open issues not recorded"}
                  {a.disposition !== "Under review" && !a.reason.trim() && (
                    <p>Review rationale missing.</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default function AlternativesEditor({
  assessment,
  onChange,
}: {
  assessment: Assessment;
  onChange: (a: Alternative[]) => void;
}) {
  const [removed, setRemoved] = useState<{ value: Alternative; index: number } | null>(null);
  function patch(id: string, k: keyof Alternative, value: string) {
    onChange(assessment.alternatives.map((a) => (a.id === id ? { ...a, [k]: value } : a)));
  }
  const inputs = [
    ["scope", "Scope differences from current arrangement"],
    ["exceptions", "Plant / equipment and responsibility exceptions"],
    ["strategies", "Concurrent maintenance strategies"],
    ["mandatoryFloor", "Mandatory-floor requirements, evidence and unresolved approvals"],
    ["benefits", "Potential benefits"],
    ["risks", "Risks and consequences"],
    ["shortTerm", "Short-term impact and period considered"],
    ["mediumTerm", "Medium-term impact and period considered"],
    ["longTerm", "Long-term impact and period considered"],
    ["evidence", "Source evidence and assumptions"],
    ["gaps", "Open questions and validation needed"],
    ["reason", "Shortlist / exclusion rationale"],
  ] as const;
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Explore service alternatives</h3>
      <p>
        Define each model and tier combination for this facility. Record asset-level exceptions and
        concurrent maintenance strategies. Every option remains subject to the mandatory floor and
        source validation; Core does not waive these requirements.
      </p>
      <button
        className={button + " disabled:opacity-50"}
        disabled={assessment.alternatives.length >= 20}
        onClick={() => onChange([...assessment.alternatives, newAlternative(crypto.randomUUID())])}
      >
        Add service alternative
      </button>
      <p className="text-sm">
        {assessment.alternatives.length} of 20 alternatives. Save the assessment to retain edits.
      </p>
      {removed && (
        <div role="status">
          Alternative removed from this draft.{" "}
          <button
            className={button}
            disabled={assessment.alternatives.length >= 20}
            onClick={() => {
              const a = [...assessment.alternatives];
              a.splice(Math.min(removed.index, a.length), 0, removed.value);
              onChange(a);
              setRemoved(null);
            }}
          >
            Undo removal
          </button>
        </div>
      )}
      {assessment.alternatives.length === 0 && (
        <p>
          No alternatives recorded yet. Add an option such as IFM with Core, or IFM Hybrid with
          Plus.
        </p>
      )}
      {assessment.alternatives.map((a, index) => (
        <details key={a.id} open className="rounded-lg border border-slate-200 p-4">
          <summary className="font-semibold cursor-pointer">
            {a.name || `Alternative ${index + 1}`} · {a.disposition}
          </summary>
          <div className="space-y-3 mt-3">
            <label>
              Alternative name
              <input
                className={field}
                value={a.name}
                maxLength={20000}
                onChange={(e) => patch(a.id, "name", e.target.value)}
              />
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              <label>
                Alternative service model
                <select
                  className={field}
                  value={a.model}
                  onChange={(e) => patch(a.id, "model", e.target.value)}
                >
                  <option value="">Not confirmed</option>
                  {models.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <label>
                Alternative service tier
                <select
                  className={field}
                  value={a.tier}
                  onChange={(e) => patch(a.id, "tier", e.target.value)}
                >
                  <option value="">Not confirmed</option>
                  {tiers.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                Analyst review status
                <select
                  className={field}
                  value={a.disposition}
                  onChange={(e) => patch(a.id, "disposition", e.target.value)}
                >
                  {["Under review", "Shortlisted", "Excluded"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {inputs.map(([k, label]) => (
                <label key={k}>
                  {label}
                  <textarea
                    className={field}
                    value={a[k]}
                    maxLength={20000}
                    onChange={(e) => patch(a.id, k, e.target.value)}
                  />
                </label>
              ))}
            </div>
            <button
              className={button}
              onClick={() => {
                setRemoved({ value: a, index });
                onChange(assessment.alternatives.filter((x) => x.id !== a.id));
              }}
            >
              Remove {a.name || `alternative ${index + 1}`}
            </button>
          </div>
        </details>
      ))}
      <AlternativePricingPanel assessment={assessment} onChange={onChange} />
      <AlternativesComparison assessment={assessment} />
      <p className="text-sm">
        Quantified risk, Lifecycle impacts and formal decision approval are not connected to this
        descriptive comparison yet.
      </p>
    </div>
  );
}
