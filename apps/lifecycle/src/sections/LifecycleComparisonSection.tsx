import React from "react";

export default function LifecycleComparisonSection() {
  return (
    <>
      {/* ── Lifecycle Scenario Comparison ── */}
      {(() => {
        const configuredLifecycleScenarios: { name: string }[] = [];
        const comparisonFactors: { factor: string; baselineValue: string }[] = [
          { factor: "Treatment", baselineValue: "—" },
          { factor: "Intervention Timing", baselineValue: "—" },
          { factor: "Maintenance Requirement", baselineValue: "—" },
          { factor: "Repair Cost Information", baselineValue: "—" },
          {
            factor: "Renewal / Replacement Cost Information",
            baselineValue: "—",
          },
          { factor: "Lifecycle Event Timing", baselineValue: "—" },
          { factor: "5-Year Exposure", baselineValue: "Pending Analysis" },
          { factor: "10-Year Exposure", baselineValue: "Pending Analysis" },
          { factor: "15-Year Exposure", baselineValue: "Pending Analysis" },
          { factor: "20-Year Exposure", baselineValue: "Pending Analysis" },
          { factor: "25-Year Exposure", baselineValue: "Pending Analysis" },
          {
            factor: "Deferred Maintenance Impact",
            baselineValue: "Not Yet Assessed",
          },
          {
            factor: "Asset Condition Impact",
            baselineValue: "Not Yet Assessed",
          },
          { factor: "Operational Impact", baselineValue: "—" },
          { factor: "Business Impact", baselineValue: "—" },
          { factor: "Risk Consideration", baselineValue: "Not Yet Assessed" },
          {
            factor: "Compliance Consideration",
            baselineValue: "Not Yet Assessed",
          },
          { factor: "Dependencies", baselineValue: "—" },
          { factor: "Evidence Confidence", baselineValue: "Not Yet Assessed" },
          { factor: "Material Assumptions", baselineValue: "—" },
          { factor: "Information Gaps", baselineValue: "Requires Validation" },
          { factor: "Conflicts", baselineValue: "—" },
          { factor: "Human Review Requirement", baselineValue: "Required" },
        ];
        return (
          <div
            className="rounded-xl border bg-white px-6 py-5"
            style={{
              borderColor: "#e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
              Lifecycle Scenario Comparison
            </h2>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
              Compare the evidence-supported baseline with only those lifecycle scenarios that have
              been configured and retained for assessment.
            </p>

            {/* Comparison Readiness */}
            <div
              className="rounded-lg border px-4 py-4 mb-4"
              style={{ borderColor: "#fecaca", background: "#fff5f5" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  Comparison Readiness
                </p>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#fee2e2", color: "#dc2626" }}
                >
                  NOT READY
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
                Material baseline information and at least one credible configured lifecycle
                scenario are required before comparative lifecycle analysis can be completed.
              </p>
              <div
                className="rounded-lg border px-3 py-2 mb-2"
                style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
              >
                <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
                  Readiness Gate — Future Logic
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    "Baseline sufficiently established",
                    "At least one configured scenario",
                    "Material information sufficiently established",
                    "Material conflicts resolved",
                    "Required calculation methodology available where applicable",
                  ].map((cond, i, arr) => (
                    <React.Fragment key={cond}>
                      <span
                        className="px-2 py-0.5 rounded border"
                        style={{
                          borderColor: "#e5e7eb",
                          background: "#fff",
                          color: "#6b7280",
                        }}
                      >
                        {cond}
                      </span>
                      {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>+</span>}
                    </React.Fragment>
                  ))}
                  <span style={{ color: "#d1d5db" }}>→</span>
                  <span
                    className="px-2 py-0.5 rounded border font-semibold"
                    style={{
                      borderColor: "#bbf7d0",
                      background: "#f0fdf4",
                      color: "#15803d",
                    }}
                  >
                    Ready for Comparison
                  </span>
                </div>
              </div>
              <p className="text-xs italic" style={{ color: "#9ca3af" }}>
                This is an application readiness state — not a finding about the actual Site or
                asset. Comparison cannot proceed until the applicable readiness conditions have been
                sufficiently established.
              </p>
            </div>

            {/* No-scoring statement */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs" style={{ color: "#6b7280" }}>
                No approved weighting or scoring methodology is currently applied. Lifecycle
                scenarios are presented as evidence-based comparisons rather than arbitrary
                numerical rankings.
              </p>
            </div>

            {/* Lifecycle Decision Interpretation */}
            <div
              className="rounded-lg border px-4 py-3 mb-4"
              style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: "#1e3a8a" }}>
                Lifecycle Decision Interpretation
              </p>
              <p className="text-xs font-semibold mb-1" style={{ color: "#1e3a8a" }}>
                Lowest immediate cost must not automatically be interpreted as the preferred
                lifecycle option.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#3730a3" }}>
                Where sufficiently supported evidence becomes available, lifecycle comparison may
                consider cost, asset condition, maintenance implications, lifecycle exposure,
                operational impact, business impact, risk, compliance, dependencies and evidence
                confidence. No approved weighting between these factors is currently applied.
              </p>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs border-collapse" style={{ minWidth: 480 }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th
                      className="text-left px-3 py-2 border font-semibold"
                      style={{
                        borderColor: "#e5e7eb",
                        color: "#9ca3af",
                        minWidth: 200,
                      }}
                    >
                      Assessment Factor
                    </th>
                    <th
                      className="text-left px-3 py-2 border font-semibold"
                      style={{
                        borderColor: "#e5e7eb",
                        color: "#9ca3af",
                        minWidth: 160,
                      }}
                    >
                      Baseline Lifecycle Position
                    </th>
                    {configuredLifecycleScenarios.map((s) => (
                      <th
                        key={s.name}
                        className="text-left px-3 py-2 border font-semibold"
                        style={{
                          borderColor: "#e5e7eb",
                          color: "#6d28d9",
                          minWidth: 160,
                        }}
                      >
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFactors.map(({ factor, baselineValue }) => (
                    <tr key={factor}>
                      <td
                        className="px-3 py-2 border font-semibold"
                        style={{ borderColor: "#e5e7eb", color: "#374151" }}
                      >
                        {factor}
                      </td>
                      <td
                        className="px-3 py-2 border italic"
                        style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                      >
                        {baselineValue}
                      </td>
                      {configuredLifecycleScenarios.map((s) => (
                        <td
                          key={s.name}
                          className="px-3 py-2 border italic"
                          style={{ borderColor: "#e5e7eb", color: "#d1d5db" }}
                        >
                          —
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {configuredLifecycleScenarios.length === 0 && (
              <div
                className="rounded-lg border px-4 py-4 text-center mb-4"
                style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
                  No alternative lifecycle scenarios are currently configured.
                </p>
                <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                  Scenario columns will appear only after a lifecycle scenario has been configured
                  and retained for assessment.
                </p>
              </div>
            )}

            {/* GAP / CONFLICT architecture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <div
                className="rounded border px-3 py-2"
                style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
                  GAP — Comparison
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  Affected Scenario · Affected Asset / Scope · Affected Horizon · Affected
                  Comparison Factor · Why It Matters · Required Action. Not resolved by substituting
                  fabricated values.
                </p>
              </div>
              <div
                className="rounded border px-3 py-2"
                style={{ borderColor: "#fecaca", background: "#fef2f2" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
                  CONFLICT — Comparison
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  Source A · Source B · Conflicting Information · Affected Scenario · Affected
                  Horizon · Potential Lifecycle Impact · Required Resolution. Conflict is not
                  silently resolved.
                </p>
              </div>
            </div>

            {/* Financial control reminder */}
            <div
              className="rounded-lg border px-4 py-3"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
                Financial Outputs — Controlled Methodology Required
              </p>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                Present Cost, NPC, NPV, EAC, Escalated Cost, Discounted Cost, Lifecycle Total,
                Savings and Capital Peak are not calculated. Where such outputs are eventually
                required:{" "}
                <span className="font-semibold" style={{ color: "#92400e" }}>
                  Pending controlled methodology
                </span>
                .
              </p>
            </div>
          </div>
        );
      })()}
    </>
  );
}
