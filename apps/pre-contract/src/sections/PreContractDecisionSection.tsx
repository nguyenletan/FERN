import React from "react";

export default function PreContractDecisionSection() {
  return (
    <>
      {/* ── HUMAN REVIEW ─────────────────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Human Review
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "#fffbeb",
              color: "#d97706",
              border: "1px solid #fde68a",
            }}
          >
            PENDING
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
          {[
            { label: "Review Status", value: "Pending" },
            { label: "Reviewer", value: null },
            { label: "Review Date", value: null },
            { label: "Comments", value: null },
            { label: "Material Issues Raised", value: null },
            { label: "Additional Evidence Required", value: null },
            { label: "FERN Recommendation", value: "Not Yet Available" },
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
        <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
          Human Review is separate from Business Decision. Review must be completed before a
          decision can be recorded.
        </p>
      </div>

      {/* ── BUSINESS DECISION RECORD ─────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Business Decision Record
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "#fffbeb",
              color: "#d97706",
              border: "1px solid #fde68a",
            }}
          >
            PENDING AUTHORISED HUMAN REVIEW
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
          No business decision has been recorded.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mb-4">
          {[
            {
              label: "Decision Status",
              value: "PENDING AUTHORISED HUMAN REVIEW",
            },
            { label: "Selected Scenario", value: null },
            { label: "Decision Outcome", value: null },
            { label: "Decision Rationale", value: null },
            { label: "Decision Conditions", value: null },
            { label: "Exceptions", value: null },
            { label: "Required Constraints", value: null },
            { label: "Material Risks Accepted / Retained", value: null },
            { label: "Outstanding Information Gaps", value: null },
            { label: "Decision Owner", value: null },
            { label: "Decision Date", value: null },
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
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          FERN provides decision support. The final FM delivery decision requires authorised human
          review and approval.
        </p>
      </div>

      {/* ── EVIDENCE & TRACEABILITY ───────────────────────────────────────── */}
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
          No authorised evidence records are currently connected. Evidence items will appear here as
          sources are connected and validated.
        </p>
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
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
              "Assessment Area Supported",
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
              "Assessment Input",
              "Baseline / Scenario",
              "Comparison",
              "FERN Recommendation",
              "Human Review",
              "Business Decision Record",
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
