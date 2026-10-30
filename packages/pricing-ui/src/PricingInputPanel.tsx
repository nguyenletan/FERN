import PricingIssueImport from "./PricingIssueImport";
import { comparePricing } from "../../pricing-core/src/comparisons.ts";
import { useState } from "react";
import {
  costSummary,
  readIssues,
  selectIssue,
  selectedIssue,
  type PricingIssue,
  type Recipient,
} from "../../pricing-core/src/pricingHandover.ts";
import { dateForDisplay } from "../../pricing-core/src/staffCosts.ts";
export default function PricingInputPanel({
  site,
  recipient,
  onSelect,
  selectionId,
}: {
  site: string;
  recipient: Recipient;
  onSelect?: (issue: PricingIssue | null) => void;
  selectionId?: string;
}) {
  const [issues, setIssues] = useState<PricingIssue[]>([]),
    [selected, setSelected] = useState<string | null>(null),
    [message, setMessage] = useState(""),
    [loaded, setLoaded] = useState(false);
  const button = "border border-slate-300 rounded px-3 py-2 bg-blue-50 text-blue-950";
  function refresh() {
    try {
      const list = readIssues(localStorage, site);
      setIssues(list);
      const id =
        selectionId !== undefined ? selectionId : selectedIssue(localStorage, site, recipient);
      setSelected(id);
      onSelect?.(list.find((i) => i.id === id) ?? null);
      setLoaded(true);
      setMessage(
        id && !list.some((i) => i.id === id)
          ? "The saved pricing reference is unavailable. It has not been replaced; select an available issue deliberately."
          : list.length
            ? "Pricing issues loaded."
            : "No pricing baseline has been issued for this site.",
      );
    } catch (e) {
      setIssues([]);
      setSelected(null);
      setLoaded(false);
      onSelect?.(null);
      setMessage(e instanceof Error ? e.message : "Cannot read pricing.");
    }
  }
  const current = issues.find((x) => x.id === selected);
  return (
    <section className="rounded-xl border bg-white p-4 space-y-3" aria-label="Pricing input">
      <h2 className="font-bold text-lg text-blue-950">Pricing baseline input</h2>
      <p className="text-sm">
        Use a fixed pricing issue for {site}. Load issues saved at this browser address, or import a
        pricing issue file in Pre-Contract when it was created elsewhere. Selecting a reference does
        not approve it or add its costs to another total.
      </p>
      {recipient === "pre-contract" && (
        <PricingIssueImport key={site} site={site} onImported={refresh} />
      )}
      <button className={button} onClick={refresh}>
        Load issued pricing baselines
      </button>
      {loaded && issues.length > 0 && (
        <label className="block">
          Pricing version
          <select
            aria-label="Pricing version"
            className="block border rounded p-2 w-full"
            value={selected ?? ""}
            onChange={(e) => {
              try {
                if (selectionId === undefined)
                  selectIssue(localStorage, site, recipient, e.target.value);
                setSelected(e.target.value);
                onSelect?.(issues.find((i) => i.id === e.target.value) ?? null);
                setMessage(
                  selectionId === undefined
                    ? "Pricing reference saved for this application."
                    : "Pricing reference selected in this draft. Save the assessment to retain it.",
                );
              } catch (e) {
                setMessage(e instanceof Error ? e.message : "Selection failed.");
              }
            }}
          >
            <option value="" disabled>
              Select an issued baseline
            </option>
            {selected && !issues.some((i) => i.id === selected) && (
              <option value={selected} disabled>
                Saved reference unavailable — {selected}
              </option>
            )}
            {issues.map((i) => (
              <option key={i.id} value={i.id}>
                Version {i.revision} — {i.baseline.currency}{" "}
                {costSummary(i.baseline).total?.toLocaleString()} — {i.issuedAt} — {i.id}
              </option>
            ))}
          </select>
        </label>
      )}
      {current && (
        <>
          <p className="font-semibold">
            Selected version {current.revision} · Provisional · {current.baseline.currency}{" "}
            {costSummary(current.baseline).total?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            in year 1
          </p>
          <p className="text-sm">
            Price date: {dateForDisplay(current.baseline.baseDate)}. Issue ID: {current.id}. Source:{" "}
            {current.baseline.source}.
          </p>
          {issues.some((i) => i.id !== current.id) && (
            <p className="text-amber-900 bg-amber-50 p-2">
              Other pricing issues are available. Your selected issue is unchanged. Revisions from
              separate sources are not a shared sequence; check issue IDs, dates and evidence before
              changing your selection.
            </p>
          )}
          <details>
            <summary className="cursor-pointer">View cost scope and evidence</summary>
            <ul className="text-sm list-disc pl-5">
              {current.baseline.roles.map((r) => (
                <li key={r.id}>
                  {r.role}: {r.included ? "included" : "excluded"} · Rate {r.rate || "missing"} ·{" "}
                  {r.sourceCell} · {r.evidence || "No evidence"}
                </li>
              ))}
              {(current.baseline.additionalCosts ?? []).map((i) => (
                <li key={i.id}>
                  {i.description}: {i.category}, {i.treatment} · {i.annualCost} × {i.allocation}% ·{" "}
                  {i.evidence}
                </li>
              ))}
            </ul>
          </details>
          {costSummary(current.baseline).horizons && (
            <details>
              <summary>View constant-price horizon totals</summary>
              <p className="text-sm">
                Undiscounted, without inflation. Staff and additional annual costs repeat;
                maintenance follows its entered schedule.
              </p>
              <ul>
                {costSummary(current.baseline).horizons!.map((h) => (
                  <li key={h.years}>
                    {h.years} years: {current.baseline.currency} {h.total.toLocaleString()}
                  </li>
                ))}
              </ul>
            </details>
          )}
          <ul className="text-sm">
            {(current.baseline.maintenanceCosts ?? []).map((i) => (
              <li key={i.id}>
                {i.description}: {i.included ? "included" : "excluded"}; labour {i.labourTreatment};
                quantity {i.quantity} / {i.unitsPerRate}; events {i.eventsPerActiveYear}, first year{" "}
                {i.firstYear}, interval {i.intervalYears} years. Evidence: {i.evidence}
              </li>
            ))}
          </ul>
          {(current.baseline.comparisons ?? []).length > 0 && (
            <details>
              <summary>View pricing comparisons</summary>
              <p className="text-sm">
                Provisional source comparisons against baseline year 1; these are not
                recommendations or approvals.
              </p>
              <ul>
                {comparePricing(current.baseline, costSummary(current.baseline).total).map((r) => (
                  <li key={r.id}>
                    {r.name}:{" "}
                    {r.gaps.length
                      ? `Pending — ${r.gaps.join(" ")}`
                      : `Difference ${current.baseline.currency} ${r.difference?.toLocaleString()} (${r.percent === null ? "percentage unavailable for zero baseline" : r.percent.toFixed(2) + "%"})`}
                    . Source: {current.baseline.comparisons!.find((c) => c.id === r.id)?.evidence}
                  </li>
                ))}
              </ul>
            </details>
          )}
          <p className="text-sm text-slate-600">
            {recipient === "lifecycle"
              ? "Reconcile scope against existing maintenance costs before including this baseline in lifecycle cash flows. Use the combined calculation panel after resolving overlap and basis checks."
              : "Use this baseline as a pricing reference. Tender comparisons and lifecycle results must identify overlapping costs before aggregation; the pre-contract panel below recalculates eligible cost comparisons."}
          </p>
        </>
      )}
      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}
    </section>
  );
}
