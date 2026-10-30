import React from "react";

export default function PricingReportSection({
  pricingReportOpen,
  setPricingReportOpen,
}: {
  pricingReportOpen: boolean;
  setPricingReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* Pricing Assessment Report */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Assessment Report
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              borderColor: "#fecaca",
            }}
          >
            NOT READY FOR FINAL REPORT
          </span>
        </div>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          The pricing assessment report can be completed only when the applicable pricing inputs,
          controlled calculation, outputs, validation, reconciliation, evidence and required human
          review have been sufficiently established.
        </p>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No final pricing assessment report is currently available. Absence of a report must not
          imply that pricing is acceptable, unacceptable or that no commercial issue exists.
        </p>

        {/* Preview / Export controls */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setPricingReportOpen(!pricingReportOpen)}
            className="text-xs px-3 py-1.5 rounded border font-semibold"
            style={{
              borderColor: "#bfdbfe",
              background: "#eff6ff",
              color: "#1a56db",
              cursor: "pointer",
            }}
          >
            {pricingReportOpen ? "Collapse Report Preview" : "Preview Pricing Assessment Report"}
          </button>
          <span
            className="text-xs px-3 py-1.5 rounded border"
            style={{
              borderColor: "#e5e7eb",
              background: "#f3f4f6",
              color: "#9ca3af",
            }}
          >
            Export Report
          </span>
          <span className="text-xs italic" style={{ color: "#9ca3af" }}>
            Not yet connected
          </span>
        </div>

        {/* Report Readiness (always visible) */}
        <div
          className="rounded-lg border px-3 py-2 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Report Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1">
            {[
              "Applicable Site / Context",
              "Applicable Pricing Scope",
              "Validated Pricing Inputs",
              "Controlled Calculation Method",
              "Accepted Formula Implementation",
              "Controlled Calculation Run",
              "Required Calculated Outputs",
              "Output Validation",
              "Required Reconciliation",
              "Material Exceptions Addressed",
              "Material Gaps Addressed",
              "Material Conflicts Resolved",
              "Required Evidence Traceability",
              "Authorised Human Review where required",
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
              Ready for Final Report
            </span>
          </div>
          <p className="text-xs font-bold mb-0.5" style={{ color: "#dc2626" }}>
            PRICING REPORT NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is a report-readiness state. It is not a commercial finding, supplier quotation,
            approval or procurement decision. No bypass.
          </p>
        </div>

        {/* Expanded architecture */}
        {pricingReportOpen && (
          <>
            {/* Report Metadata */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
                Report Metadata
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  "Report ID",
                  "Report Title",
                  "Site / Context",
                  "Pricing Scope",
                  "Calculation Run Reference",
                  "Calculation Method Version",
                  "Formula Implementation Version",
                  "Input Snapshot Version",
                  "Report Version",
                  "Report Date",
                  "Prepared By",
                  "Review Status",
                  "Reviewer",
                  "Review Date",
                  "Evidence Status",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center justify-between rounded border px-2 py-1"
                    style={{ borderColor: "#e5e7eb", background: "#fff" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                      {f}
                    </p>
                    <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                      —
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Structure */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
                Report Structure (future architecture)
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  "Assessment Summary",
                  "Site / Context",
                  "Pricing Scope",
                  "Site Classification",
                  "Pricing Input Summary",
                  "Pricing Data Validation",
                  "Reference Workbook / Method Status",
                  "Calculation Method",
                  "Formula Implementation Status",
                  "Calculation Run",
                  "Calculated Pricing Outputs",
                  "Output Validation",
                  "Output Reconciliation",
                  "Calculation Exceptions",
                  "Material Assumptions",
                  "Material Information Gaps",
                  "Material Conflicts",
                  "Conditions / Constraints",
                  "Pricing Human Review",
                  "Evidence & Traceability",
                ].map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded border"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#fff",
                      color: "#9ca3af",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
                No report narrative populated. No conclusions manufactured.
              </p>
            </div>

            {/* Current Application State */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
                Pricing Assessment Report — Current Application State
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {[
                  { label: "Application Readiness", value: "DATA PREPARATION" },
                  { label: "Pricing Calculation Status", value: "NOT READY" },
                  { label: "Pricing Output Status", value: "NOT AVAILABLE" },
                  { label: "Formula Implementation", value: "NOT IMPLEMENTED" },
                  {
                    label: "Controlled Pricing Calculation",
                    value: "DISABLED",
                  },
                  { label: "Calculation Run", value: "NOT EXECUTED" },
                  {
                    label: "Calculated Pricing Outputs",
                    value: "NOT AVAILABLE",
                  },
                  { label: "Output Validation", value: "NOT READY" },
                  {
                    label: "Pricing Output Reconciliation",
                    value: "NOT AVAILABLE",
                  },
                  { label: "Pricing Output Review", value: "NOT READY" },
                  { label: "Pricing Human Review", value: "PENDING" },
                  {
                    label: "Pricing Report",
                    value: "NOT READY FOR FINAL REPORT",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded border px-2 py-1"
                    style={{ borderColor: "#e5e7eb", background: "#fff" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                      {label}
                    </p>
                    <p className="text-xs italic font-bold" style={{ color: "#374151" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinctions */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
            >
              <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
                Report must preserve distinctions between
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
                {[
                  "SOURCE INPUT",
                  "REFERENCE DATA",
                  "ASSUMPTION",
                  "CALCULATED OUTPUT",
                  "REVIEWED PRICING OUTPUT",
                  "APPROVED SUPPLIER QUOTATION",
                ].map((label, i, arr) => (
                  <React.Fragment key={label}>
                    <span
                      className="px-2 py-0.5 rounded border font-bold"
                      style={{
                        borderColor: "#bfdbfe",
                        background: "#fff",
                        color: "#1e3a8a",
                      }}
                    >
                      {label}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="font-bold" style={{ color: "#93c5fd" }}>
                        ≠
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs italic" style={{ color: "#3730a3" }}>
                A FERN pricing report records controlled pricing analysis and its evidence. It does
                not independently create a supplier quotation, procurement approval, contractual
                commitment or commercial decision.
              </p>
            </div>

            {/* Report Traceability */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
            >
              <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
                Report Traceability
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  "Authorised Source Information",
                  "Validated Pricing Input",
                  "Source-to-Target Mapping",
                  "Controlled Calculation Method",
                  "Accepted Formula Implementation",
                  "Calculation Input Snapshot",
                  "Controlled Calculation Run",
                  "Calculated Output",
                  "Output Validation",
                  "Output Reconciliation",
                  "Pricing Human Review",
                  "Pricing Assessment Report",
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
                No traceability records fabricated.
              </p>
            </div>

            {/* Commercial boundary */}
            <div
              className="rounded-lg border px-4 py-3"
              style={{ borderColor: "#fde68a", background: "#fffbeb" }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
                CALCULATED OUTPUT IS NOT AN APPROVED SUPPLIER QUOTATION
              </p>
              <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
                PRICING ASSESSMENT REPORT IS NOT A PROCUREMENT APPROVAL
              </p>
              <p className="text-xs" style={{ color: "#78350f" }}>
                The report supports authorised commercial and procurement review. It does not itself
                approve a supplier price, select a supplier, award a contract or create a
                contractual commitment.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
