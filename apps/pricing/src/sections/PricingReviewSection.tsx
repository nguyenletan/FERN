import React from "react";

export default function PricingReviewSection() {
  return (
    <>
      {/* Pricing Output Review Readiness */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Output Review Readiness
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
          Pricing outputs may proceed to formal review only when the applicable controlled
          calculation, output validation, reconciliation and evidence requirements have been
          sufficiently established.
        </p>
        <div
          className="rounded-lg border px-3 py-2 mb-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1">
            {[
              "Controlled Pricing Calculation Completed",
              "Required Pricing Outputs Available",
              "Output Validation Completed",
              "Required Reconciliation Completed",
              "Material Calculation Exceptions Resolved",
              "Material Output Gaps Addressed",
              "Material Output Conflicts Resolved",
              "Required Evidence Available",
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
              Ready for Pricing Output Review
            </span>
          </div>
        </div>
        <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
          PRICING OUTPUT REVIEW NOT READY
        </p>
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          This is a review-readiness state. It is not a finding about an actual supplier price,
          commercial position or procurement outcome. No bypass available.
        </p>
      </div>

      {/* Evidence & Traceability */}
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
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Pricing Traceability Architecture
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Source Evidence",
              "Site / Facility Context",
              "Asset & Scope",
              "Pricing Input",
              "Validation",
              "Controlled Calculation",
              "Cost Summary",
              "Human Review",
              "Commercial / Procurement Decision",
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
        </div>
        <div
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future field-level traceability support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Source",
              "Source Version",
              "Source Date",
              "Owner",
              "Validation Status",
              "Applicable Site",
              "Applicable Asset / Scope",
              "Pricing Area",
              "Transformation / Derivation where applicable",
              "Test",
              "Acceptance Criterion",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            No evidence records have been fabricated.
          </p>
        </div>
      </div>

      {/* Pricing Human Review */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Human Review
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
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            FERN supports pricing preparation and analysis. Supplier pricing, commercial evaluation,
            procurement and contractual decisions remain subject to authorised human review and
            applicable approval.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {[
            { label: "Review Status", value: "PENDING" },
            { label: "Reviewer", value: "—" },
            { label: "Review Date", value: "—" },
            { label: "Pricing Output Reviewed", value: "—" },
            { label: "Calculation Run Reference", value: "—" },
            { label: "Calculation Method Reference", value: "—" },
            { label: "Formula Implementation Reference", value: "—" },
            { label: "Output Validation Status", value: "—" },
            { label: "Reconciliation Status", value: "—" },
            { label: "Material Exceptions", value: "—" },
            { label: "Material Information Gaps", value: "—" },
            { label: "Material Conflicts", value: "—" },
            { label: "Commercial Issues", value: "—" },
            { label: "Procurement Considerations", value: "—" },
            { label: "Conditions / Constraints", value: "—" },
            { label: "Additional Evidence Required", value: "—" },
            { label: "Supporting Evidence", value: "—" },
            { label: "Review Outcome", value: "NOT YET AVAILABLE" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-3 py-1.5"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p
                className="text-xs italic"
                style={{
                  color:
                    value === "PENDING" || value === "NOT YET AVAILABLE" ? "#d97706" : "#d1d5db",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
