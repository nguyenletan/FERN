export default function PreContractRecommendationSection() {
  return (
    <>
      {/* ── FERN RECOMMENDATION ──────────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            FERN Recommendation
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "#f9fafb",
              color: "#9ca3af",
              border: "1px solid #e5e7eb",
            }}
          >
            NOT YET AVAILABLE
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
          FERN can prepare a recommendation only after sufficient evidence-supported comparison has
          been completed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mb-4">
          {[
            { label: "Recommendation Status", value: "NOT YET AVAILABLE" },
            { label: "Recommended Scenario", value: null },
            { label: "Recommendation Summary", value: null },
            { label: "Decision Rationale", value: null },
            { label: "Cost & Commercial Implication", value: null },
            { label: "Service & Operational Implication", value: null },
            { label: "Lifecycle & Asset Implication", value: null },
            { label: "Risk & Compliance Implication", value: null },
            { label: "Evidence Confidence", value: "Not Yet Assessed" },
            { label: "Material Assumptions", value: null },
            { label: "Material Information Gaps", value: null },
            { label: "Material Conflicts", value: null },
            { label: "Conditions / Constraints", value: null },
            { label: "Dependencies", value: null },
            { label: "Alternative Scenarios Considered", value: null },
            { label: "Supporting Evidence", value: null },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 py-1.5 border-b"
              style={{ borderColor: "#f3f4f6" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              {value ? (
                <p className="text-sm font-medium" style={{ color: "#374151" }}>
                  {value}
                </p>
              ) : (
                <p className="text-sm" style={{ color: "#d1d5db" }}>
                  —
                </p>
              )}
            </div>
          ))}
        </div>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            FERN provides decision support. Final contractual, procurement, financial and material
            risk decisions remain subject to authorised human review and approval.
          </p>
        </div>
      </div>
    </>
  );
}
