import { useState } from "react";
import type { Assessment } from "../../../packages/pre-contract-core/src/assessment.ts";
import type { Alternative } from "../../../packages/pre-contract-core/src/alternatives.ts";
import {
  compareOptionPricing,
  optionPricingBinding,
} from "../../../packages/pre-contract-core/src/optionPricing.ts";
import {
  readIssues,
  type PricingIssue,
} from "../../../packages/pricing-core/src/pricingHandover.ts";
const field = "block border border-slate-300 rounded-lg p-3 w-full bg-white mt-1";
export default function AlternativePricingPanel({
  assessment,
  onChange,
}: {
  assessment: Assessment;
  onChange: (a: Alternative[]) => void;
}) {
  const [list, setList] = useState<PricingIssue[]>([]),
    [loaded, setLoaded] = useState(false),
    [error, setError] = useState("");
  const update = (id: string, patch: Partial<Alternative>) =>
    onChange(assessment.alternatives.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const money = (n: number | null, currency: string) =>
    n === null
      ? "Unavailable"
      : `${currency} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return (
    <section
      className="border border-blue-200 rounded-lg p-4 space-y-4"
      aria-label="Alternative pricing comparison"
    >
      <h3 className="font-bold text-lg">Compare first-year option costs</h3>
      <p>
        Select a fixed issued price for each option. The current-arrangement version comes from step
        3, Pricing evidence. Differences reflect the service packages you describe; lower cost alone
        does not establish better value or compliance.
      </p>
      <button
        className="border rounded-lg px-4 py-2"
        onClick={() => {
          try {
            setList(readIssues(localStorage, assessment.site));
            setLoaded(true);
            setError("");
          } catch (e) {
            setList([]);
            setLoaded(false);
            setError((e as Error).message);
          }
        }}
      >
        Load option pricing versions
      </button>
      {error && <p role="alert">{error}</p>}
      {loaded && (
        <>
          <p>
            Current-arrangement pricing reference: {assessment.pricingId || "Not selected"} ·{" "}
            {list.length} issued versions available. Refresh explicitly to discover new issues;
            saved selections do not change.
          </p>
          {assessment.alternatives.map((a, i) => {
            const result = compareOptionPricing(assessment, a, list);
            return (
              <section key={a.id} className="border rounded-lg p-3 space-y-3">
                <h4 className="font-semibold">
                  {a.name || `Option ${i + 1}`} · {a.model || "Model not recorded"} /{" "}
                  {a.tier || "Tier not recorded"} · {a.disposition}
                </h4>
                <label>
                  Pricing version for {a.name || `option ${i + 1}`}
                  <select
                    className={field}
                    value={a.pricingId}
                    onChange={(e) => update(a.id, { pricingId: e.target.value, pricingReview: "" })}
                  >
                    <option value="">No price selected</option>
                    {a.pricingId && !list.some((p) => p.id === a.pricingId) && (
                      <option value={a.pricingId}>
                        Saved reference unavailable — {a.pricingId}
                      </option>
                    )}
                    {list.map((p) => (
                      <option key={p.id} value={p.id}>
                        Version {p.revision} · {p.baseline.currency} · {p.baseline.baseDate} ·{" "}
                        {p.issuedAt}
                      </option>
                    ))}
                  </select>
                </label>
                {result.price && (
                  <p>
                    Option source: {result.price.baseline.source} · {result.price.id}. Scope:{" "}
                    {result.price.baseline.comparisonBasis?.scope || "Not recorded"}. Service level:{" "}
                    {result.price.baseline.comparisonBasis?.serviceLevel || "Not recorded"}. Tax:{" "}
                    {result.price.baseline.comparisonBasis?.taxBasis || "Not recorded"}.
                  </p>
                )}
                {result.base && (
                  <p>
                    Current price scope:{" "}
                    {result.base.baseline.comparisonBasis?.scope || "Not recorded"}. Service level:{" "}
                    {result.base.baseline.comparisonBasis?.serviceLevel || "Not recorded"}. Tax:{" "}
                    {result.base.baseline.comparisonBasis?.taxBasis || "Not recorded"}.
                  </p>
                )}
                <label>
                  Price applicability and scope differences for {a.name || `option ${i + 1}`}
                  <textarea
                    className={field}
                    maxLength={20000}
                    value={a.pricingEvidence}
                    onChange={(e) =>
                      update(a.id, { pricingEvidence: e.target.value, pricingReview: "" })
                    }
                  />
                </label>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    disabled={!result.base || !result.price || !a.pricingEvidence.trim()}
                    checked={
                      !!result.base &&
                      !!result.price &&
                      a.pricingReview ===
                        optionPricingBinding(assessment, a, result.base, result.price)
                    }
                    onChange={(e) =>
                      update(a.id, {
                        pricingReview:
                          e.target.checked && result.base && result.price
                            ? optionPricingBinding(assessment, a, result.base, result.price)
                            : "",
                      })
                    }
                  />
                  I have reviewed the price-to-option mapping, differences in scope and service
                  level, tax basis and comparable first-year period for{" "}
                  {a.name || `option ${i + 1}`}.
                </label>
                {result.gaps.length > 0 ? (
                  <div>
                    <p className="font-medium">Comparison withheld:</p>
                    <ul className="list-disc ml-5">
                      {result.gaps.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <dl className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <dt>Current arrangement — year 1</dt>
                      <dd>{money(result.baseline, result.currency)}</dd>
                    </div>
                    <div>
                      <dt>Option — year 1</dt>
                      <dd>{money(result.amount, result.currency)}</dd>
                    </div>
                    <div>
                      <dt>Option minus current arrangement</dt>
                      <dd>
                        {money(result.difference, result.currency)} ·{" "}
                        {result.percent === null
                          ? "Percentage unavailable: zero baseline"
                          : `${result.percent.toFixed(2)}%`}
                      </dd>
                    </div>
                  </dl>
                )}
                <p className="text-sm">
                  {a.disposition === "Excluded"
                    ? "Excluded by analyst; retained for traceability. "
                    : ""}
                  Provisional. Negative difference means lower entered first-year cost; it is not a
                  confirmed saving.
                </p>
              </section>
            );
          })}
          <p>
            No totals are added across alternatives. No currency conversion, automatic date
            rebasing, risk scoring or Lifecycle aggregation is performed. Save the assessment to
            retain references and the review.
          </p>
        </>
      )}
    </section>
  );
}
