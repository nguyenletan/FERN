import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import React from "react";

export default function LifecycleCalculationsSection() {
  return (
    <>
      {/* ── Calculation Method Control ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Calculation Method Control
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderColor: "#fde68a",
            }}
          >
            REQUIRES VALIDATION
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Define and validate the controlled financial calculation method before lifecycle financial
          outputs are used for decision support.
        </p>

        {/* Method status */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Calculation Method Status
          </p>
          <p className="text-sm font-bold mb-1" style={{ color: "#dc2626" }}>
            REQUIRES VALIDATION
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            The calculation methodology is documented in the user guide; a complete calculation engine is not yet
            connected to this prototype. Do not describe a methodology as approved unless supported
            by controlled evidence.
          </p>
        </div>

        {/* Method metadata fields */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Method Metadata — fields to be established
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "Method Name", value: "—" },
              { label: "Method Description", value: "—" },
              { label: "Method Version", value: "—" },
              { label: "Source Document", value: "—" },
              { label: "Source Version", value: "—" },
              { label: "Effective Date", value: "—" },
              { label: "Approval Status", value: "NOT ESTABLISHED" },
              { label: "Method Owner", value: "—" },
              { label: "Applicable Analysis Horizon", value: "—" },
              { label: "Applicable Cost Basis", value: "—" },
              { label: "Required Inputs", value: "—" },
              { label: "Required Assumptions", value: "—" },
              { label: "Output Types", value: "—" },
              { label: "Validation Status", value: "REQUIRES VALIDATION" },
              { label: "Last Validated", value: "—" },
              { label: "Superseded Method", value: "—" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-2 rounded border px-3 py-1.5"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                <p className="text-xs italic shrink-0" style={{ color: "#d1d5db" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculation Readiness gate */}
        <div
          className="rounded-lg border px-4 py-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Calculation Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Required lifecycle events, cost information, financial assumptions and a controlled
            calculation method are not yet sufficiently established.
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
                "Selected Asset / Scope",
                "Analysis Horizon",
                "Relevant Lifecycle Events",
                "Validated Source Costs",
                "Required Financial Assumptions",
                "Controlled Calculation Method",
                "Material Conflicts Resolved",
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
                Ready for Calculation
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            CALCULATION NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is an application readiness state — not an actual Site financial finding.
            Calculation cannot proceed until the applicable readiness conditions have been
            sufficiently established.
          </p>
        </div>
      </div>

      {/* ── Lifecycle Cash-Flow Schedule ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Cash-Flow Schedule
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Provide the structured schedule from which controlled lifecycle financial calculations may
          eventually be performed.
        </p>

        <div
          className="rounded-lg border px-4 py-5 text-center mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
            No lifecycle cash-flow schedule is currently available.
          </p>
          <p className="text-xs italic" style={{ color: "#d1d5db" }}>
            Cash-flow information will appear when sufficiently established lifecycle events, source
            costs, required financial assumptions and the applicable controlled calculation method
            are available.
          </p>
        </div>

        {/* Schedule table architecture */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 900 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Period",
                  "Year",
                  "Event ID",
                  "Asset / System",
                  "Scenario",
                  "Event Type",
                  "Event Timing",
                  "Source Cost",
                  "Currency",
                  "Cost Basis",
                  "Price Base Date",
                  "Inflation Ref.",
                  "Discount Ref.",
                  "Risk Allow. Ref.",
                  "Nominal/Real Basis",
                  "Validation Status",
                  "Evidence Confidence",
                  "Calculated Output",
                  "Calc. Method",
                  "Method Version",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 border text-xs font-semibold"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "#9ca3af",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array(20)
                  .fill(null)
                  .map((_, i) => (
                    <td
                      key={i}
                      className="px-3 py-2 border italic"
                      style={{ borderColor: "#e5e7eb", color: "#d1d5db" }}
                    >
                      —
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Input vs Output distinction */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Source Financial Input ≠ Calculated Financial Output
          </p>
          <p className="text-xs mb-3" style={{ color: "#3730a3" }}>
            FERN must preserve the original source cost and its evidence separately from any
            calculated financial result.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Source Cost",
              "Financial Assumptions",
              "Calculation Method",
              "Calculated Output",
              "Scenario Comparison",
              "Human Review",
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

        {/* Financial Assumption Status */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Financial Assumption Status
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fef3c7",
                color: "#92400e",
                borderColor: "#fde68a",
              }}
            >
              INFORMATION REQUIRED
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Price Base Date",
              "Currency",
              "Inflation Assumption",
              "Discount Assumption",
              "Risk Allowance",
              "Nominal / Real Basis",
              "Tax / VAT Treatment (where applicable and controlled)",
              "Analysis Base Date",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded border px-3 py-1.5"
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Financial assumptions have not yet been established for this analysis. Applicable
            assumptions will be shown only when supported by authorised information and the
            controlled calculation method.
          </p>
        </div>

        {/* GAP / CONFLICT architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
              GAP — Financial
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              Example types: Missing Source Cost · Missing Currency · Missing Base Date · Missing
              Required Assumption · Missing Calculation Method. Architecture examples only — these
              do not currently exist.
            </p>
          </div>
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#fecaca", background: "#fef2f2" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
              CONFLICT — Financial
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              Example types: Conflicting Source Costs · Conflicting Event Timing · Conflicting
              Currency · Conflicting Cost Basis · Conflicting Financial Assumptions. Architecture
              examples only — these do not currently exist.
            </p>
          </div>
        </div>
      </div>

      {/* ── Lifecycle Financial Outputs ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Financial Outputs
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Future financial outputs derived from a controlled and validated calculation method.
          Output applicability depends on the selected asset, scenario, horizon and methodology. Not
          every output necessarily applies to every analysis.
        </p>

        <div className="space-y-2 mb-4">
          {[
            "Cash Flow",
            "Present Cost",
            "Net Present Cost (NPC)",
            "Net Present Value (NPV)",
            "Equivalent Annual Cost (EAC)",
            "Renewal Expenditure",
            "Replacement Expenditure",
            "Capital Exposure",
            "Capital Peak",
            "Lifecycle Total",
          ].map((output) => (
            <div
              key={output}
              className="flex items-center justify-between rounded-lg border px-4 py-2.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-sm font-semibold" style={{ color: "#374151" }}>
                {output}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs italic" style={{ color: "#d1d5db" }}>
                  —
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#fef3c7", color: "#92400e" }}
                >
                  PENDING CONTROLLED METHODOLOGY
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
            Output Applicability:
          </p>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fffbeb",
              color: "#d97706",
              borderColor: "#fde68a",
            }}
          >
            TO BE DETERMINED
          </span>
        </div>

        {/* Formula control */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Formula Implementation Status
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT IMPLEMENTED
            </span>
          </div>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Financial formulas must not be implemented until the applicable controlled methodology,
            assumptions, definitions and acceptance criteria have been validated. No lifecycle
            financial calculation is currently active.
          </p>
        </div>

        {/* Traceability requirement */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Traceability Requirement — each future calculated output must trace to
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Source Event",
              "Source Cost",
              "Source Date",
              "Cost Basis",
              "Financial Assumptions",
              "Calculation Method",
              "Method Version",
              "Calculation Date",
              "Validation Status",
              "Scenario",
              "Analysis Horizon",
              "Human Review Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Calculation Exception */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Calculation Exception
          </p>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            No calculation exceptions have been established because financial calculation is not yet
            active.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Affected Asset / Scope",
              "Affected Scenario",
              "Affected Event",
              "Affected Horizon",
              "Missing Input",
              "Invalid Input",
              "Conflicting Input",
              "Affected Output",
              "Calculation Impact",
              "Required Resolution",
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
        </div>
      </div>
    </>
  );
}
