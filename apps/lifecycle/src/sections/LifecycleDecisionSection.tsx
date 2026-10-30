import React from "react";

export default function LifecycleDecisionSection() {
  return (
    <>
      {/* ── Lifecycle Recommendation Readiness ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="rounded-lg border px-4 py-4 mb-3"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Lifecycle Recommendation Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            FERN cannot prepare an evidence-supported lifecycle recommendation until the material
            analysis, comparison, calculation and validation requirements applicable to the
            assessment have been sufficiently established.
          </p>
          <div
            className="rounded-lg border px-3 py-2 mb-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Readiness Gate — Future Logic
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                "Selected Asset / Scope",
                "Material Asset Baseline",
                "Required Lifecycle Assumptions",
                "Applicable Lifecycle Events",
                "Applicable Scenario Analysis",
                "Scenario Comparison where required",
                "Controlled Calculation Method where applicable",
                "Required Financial Analysis where applicable",
                "Required Sensitivity Analysis where applicable",
                "Material Information Gaps Addressed",
                "Material Conflicts Resolved",
                "Evidence Confidence Assessed",
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
                Ready for Recommendation
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            LIFECYCLE RECOMMENDATION NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is an analysis-readiness state. It is not a finding or recommendation about the
            selected Site, asset or treatment.
          </p>
        </div>

        {/* FERN Lifecycle Recommendation */}
        <div
          className="rounded-lg border px-4 py-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-bold" style={{ color: "#0d2464" }}>
              FERN Lifecycle Recommendation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT YET AVAILABLE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
            {[
              { label: "Recommendation Status", value: "NOT YET AVAILABLE" },
              { label: "Recommended Treatment", value: "—" },
              { label: "Asset / Scope", value: "—" },
              { label: "Recommendation Summary", value: "—" },
              { label: "Decision Rationale", value: "—" },
              { label: "Intervention Timing", value: "—" },
              { label: "Maintenance Implication", value: "—" },
              { label: "Lifecycle Implication", value: "—" },
              { label: "Cost / Financial Implication", value: "—" },
              { label: "Asset Condition Implication", value: "—" },
              { label: "Operational Impact", value: "—" },
              { label: "Business Impact", value: "—" },
              { label: "Risk Implication", value: "—" },
              { label: "Compliance Implication", value: "—" },
              { label: "Dependencies", value: "—" },
              { label: "Material Assumptions", value: "—" },
              { label: "Material Information Gaps", value: "—" },
              { label: "Material Conflicts", value: "—" },
              { label: "Evidence Confidence", value: "NOT YET ASSESSED" },
              { label: "Conditions / Constraints", value: "—" },
              { label: "Alternative Treatments Considered", value: "—" },
              { label: "Supporting Evidence", value: "—" },
              { label: "Human Review Requirement", value: "Required" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded border px-3 py-1.5"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
            FERN can prepare a lifecycle recommendation only after sufficiently supported lifecycle
            analysis and applicable comparison have been completed.
          </p>
          <p className="text-xs italic mb-3" style={{ color: "#9ca3af" }}>
            No treatment has been selected or recommended.
          </p>
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <p className="text-xs font-bold" style={{ color: "#92400e" }}>
              PRESERVE SCENARIO — DO NOT MANUFACTURE RESULT
            </p>
          </div>
        </div>
      </div>

      {/* ── Lifecycle Human Review ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Human Review
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fffbeb",
              color: "#d97706",
              borderColor: "#fde68a",
            }}
          >
            PENDING
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          FERN provides lifecycle decision support. Material lifecycle, financial, compliance,
          operational-risk and investment decisions remain subject to authorised human review and
          approval.
        </p>

        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            FERN provides lifecycle decision support. Material lifecycle, financial, compliance,
            operational-risk and investment decisions remain subject to authorised human review and
            approval.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {[
            { label: "Review Status", value: "PENDING" },
            { label: "Reviewer", value: "—" },
            { label: "Review Date", value: "—" },
            { label: "Recommendation Reviewed", value: "NOT YET AVAILABLE" },
            { label: "Material Issues Raised", value: "—" },
            { label: "Additional Evidence Required", value: "—" },
            { label: "Conditions / Constraints", value: "—" },
            { label: "Comments", value: "—" },
            { label: "Supporting Evidence", value: "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-3 py-1.5"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
          Human Review must remain separate from the Decision Record. No reviewer has been invented.
        </p>
      </div>

      {/* ── Lifecycle Decision Record ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Decision Record
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderColor: "#fde68a",
            }}
          >
            PENDING AUTHORISED HUMAN REVIEW
          </span>
        </div>
        <p className="text-xs mb-4 italic" style={{ color: "#9ca3af" }}>
          No lifecycle decision has been recorded.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
          {[
            {
              label: "Decision Status",
              value: "PENDING AUTHORISED HUMAN REVIEW",
            },
            { label: "Selected Treatment", value: "—" },
            { label: "Asset / Scope", value: "—" },
            { label: "Decision Outcome", value: "—" },
            { label: "Decision Rationale", value: "—" },
            { label: "Decision Timing", value: "—" },
            { label: "Decision Conditions", value: "—" },
            { label: "Exceptions", value: "—" },
            { label: "Required Constraints", value: "—" },
            { label: "Material Risks Accepted / Retained", value: "—" },
            { label: "Outstanding Information Gaps", value: "—" },
            { label: "Decision Owner", value: "—" },
            { label: "Decision Date", value: "—" },
            { label: "Supporting Evidence", value: "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-3 py-1.5"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Decision Traceability */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Lifecycle Decision Traceability Architecture
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Source Evidence",
              "Analysis Input",
              "Asset Baseline",
              "Lifecycle Event / Assumption",
              "Scenario",
              "Calculation where applicable",
              "Sensitivity where applicable",
              "Comparison",
              "FERN Lifecycle Recommendation",
              "Authorised Human Review",
              "Lifecycle Decision Record",
            ].map((node, i, arr) => (
              <React.Fragment key={node}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#bfdbfe",
                    background: "#fff",
                    color: "#1e3a8a",
                  }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#93c5fd" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#93c5fd" }}>
            No fabricated evidence records. Reuses existing Evidence & Traceability architecture.
          </p>
        </div>
      </div>

      {/* ── Evidence & Traceability ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-2" style={{ color: "#0d2464" }}>
          Evidence & Traceability
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          No authorised evidence records are currently connected.
        </p>
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Evidence Item Architecture
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              "Evidence Item",
              "Source",
              "Source Date",
              "Version",
              "Status",
              "Owner",
              "Validation Status",
              "Asset / Facility",
              "Analysis Input Supported",
              "Analysis Horizon Supported",
            ].map((f) => (
              <div key={f}>
                <p className="font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                  {f}
                </p>
                <p style={{ color: "#d1d5db" }}>—</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Intended Traceability Chain
          </p>
          <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
            {[
              "Source Evidence",
              "Asset / Facility Input",
              "Lifecycle Assumption",
              "Analysis",
              "Scenario",
              "Comparison",
              "FERN Recommendation",
              "Human Review",
              "Decision Record",
            ].map((node, i, arr) => (
              <React.Fragment key={node}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{ borderColor: "#e5e7eb", background: "#fff" }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
