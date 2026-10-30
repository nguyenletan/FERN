import React from "react";

export default function PricingCalculationOutputSection() {
  return (
    <>
      {/* Controlled Pricing Calculation & Output */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Controlled Pricing Calculation & Output
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
          CONTROLLED PRICING CALCULATION NOT READY
        </p>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          Pricing calculations may be executed only when the applicable calculation method, formula
          implementation, validated pricing inputs, permissions, testing, acceptance and release
          controls have been sufficiently established.
        </p>
        <p className="text-xs mb-4 italic" style={{ color: "#9ca3af" }}>
          This is a calculation-readiness state. It is not a finding about an actual Site price,
          supplier quotation or commercial outcome.
        </p>

        {/* Calculation Run Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Calculation Run Readiness
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
              "Controlled Calculation Method Accepted",
              "Required Formula Implementations Accepted",
              "Pricing Calculation Release Ready",
              "Applicable Site / Context Established",
              "Applicable Pricing Scope Established",
              "Required Source Inputs Available",
              "Required Source Inputs Validated",
              "Applicable Reference Data Established",
              "Required Mapping Acceptance Completed",
              "Required Calculation Assumptions Established where applicable",
              "Applicable Currency Established",
              "Applicable Cost Basis Established",
              "Applicable Workbook / Method Version Established",
              "Material Input Gaps Addressed",
              "Material Input Conflicts Resolved",
              "Required Permissions Established",
              "Calculation Evidence Location Established",
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
              Ready for Controlled Calculation Run
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No bypass available.
          </p>
        </div>

        {/* Calculation Input Snapshot */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Calculation Input Snapshot
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Preserve the exact controlled information used by a future pricing calculation so that
            the resulting output can be reproduced, reconciled and audited. No controlled
            calculation input snapshot is currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Calculation Run ID",
              "Site / Context",
              "Pricing Scope",
              "Calculation Method",
              "Calculation Method Version",
              "Formula Implementation Version",
              "Reference Workbook",
              "Reference Workbook Version",
              "Input Snapshot Version",
              "Source Business Field",
              "Source System / Record",
              "Source Field",
              "Source Version",
              "Source Date",
              "Input Value",
              "Unit",
              "Currency where applicable",
              "Cost Basis where applicable",
              "Data Classification",
              "Validation Status",
              "Mapping Reference",
              "Transformation / Derivation Reference",
              "Assumption Reference where applicable",
              "Evidence Reference",
              "Human Review Requirement",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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

        {/* Pricing Calculation Run Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Pricing Calculation Run Register
          </p>
          <p className="text-xs mb-1 italic" style={{ color: "#9ca3af" }}>
            No controlled pricing calculation run has been executed.
          </p>
          <p className="text-xs mb-2 font-bold" style={{ color: "#9ca3af" }}>
            Calculation Status: NOT EXECUTED
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Calculation Run ID",
              "Calculation Status",
              "Site / Context",
              "Pricing Scope",
              "Calculation Method",
              "Calculation Method Version",
              "Formula Implementation Version",
              "Input Snapshot Version",
              "Calculation Start",
              "Calculation Completion",
              "Execution Environment where established",
              "Executed By / System where established",
              "Output Version",
              "Reconciliation Status",
              "Validation Status",
              "Exception Status",
              "Evidence Location",
              "Human Review Requirement",
              "Release Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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

        {/* Pricing Calculated Output Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Calculated Output Register
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Retain calculated pricing outputs separately from source inputs, reference data and
            assumptions. No calculated pricing outputs are currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Output ID",
              "Calculation Run ID",
              "Pricing Area",
              "Output Name",
              "Output Description",
              "Calculated Value",
              "Unit",
              "Currency where applicable",
              "Cost Basis",
              "Applicable Period",
              "Formula / Calculation Reference",
              "Calculation Method Version",
              "Input Snapshot Version",
              "Validation Status",
              "Reconciliation Status",
              "Evidence",
              "Human Review Requirement",
              "Output Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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

        {/* Data Classification */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Pricing Data Classification — Calculation Context
          </p>
          <div className="flex items-center gap-2 flex-wrap text-xs mb-2">
            {["SOURCE INPUT", "REFERENCE DATA", "ASSUMPTION", "CALCULATED OUTPUT"].map(
              (label, i, arr) => (
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
              ),
            )}
          </div>
          <p className="text-xs mb-1" style={{ color: "#3730a3" }}>
            FERN must preserve the classification and lineage of information used in pricing. A
            calculated output must remain traceable to its source inputs, reference information,
            assumptions, method and formula implementation.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              ["GAP", "zero"],
              ["ASSUMPTION", "FACT"],
              ["REFERENCE VALUE", "SITE INPUT"],
              ["CALCULATED OUTPUT", "APPROVED PRICE"],
            ].map(([from, to]) => (
              <span
                key={from}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bfdbfe",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {from} → must not become → {to}
              </span>
            ))}
          </div>
        </div>

        {/* Calculation Output Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Calculation Output Validation
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
              "Calculation Run Available",
              "Input Snapshot Available",
              "Applicable Calculation Method Confirmed",
              "Applicable Formula Implementation Confirmed",
              "Calculation Completed Without Unresolved Material Exception",
              "Required Output Fields Available",
              "Required Output Classification Established",
              "Required Reconciliation Completed",
              "Material Variances Assessed",
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
              Ready for Output Validation
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            OUTPUT VALIDATION NOT READY
          </p>
          <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
            No validation result created.
          </p>
        </div>

        {/* Pricing Output Reconciliation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Output Reconciliation
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Compare calculated FERN pricing outputs with the applicable controlled reference result
            or other authorised comparison basis where one exists. No pricing-output reconciliation
            is currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Reconciliation ID",
              "Calculation Run ID",
              "Output",
              "FERN Calculated Value",
              "Reference / Comparison Basis",
              "Reference Value",
              "Currency",
              "Unit",
              "Difference",
              "Difference Percentage where applicable and established",
              "Tolerance",
              "Tolerance Basis",
              "Reconciliation Result",
              "Exception Reference",
              "Required Resolution",
              "Evidence",
              "Reviewer where available",
              "Human Review Requirement",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "NOT ASSESSED",
              "RECONCILIATION REQUIRED",
              "MATCHED",
              "WITHIN CONTROLLED TOLERANCE",
              "OUTSIDE CONTROLLED TOLERANCE",
              "DIFFERENCE REQUIRES REVIEW",
              "RETURNED FOR CORRECTION",
              "NOT APPLICABLE",
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
            No value, difference, variance or tolerance invented. No PASS or FAIL assigned.
          </p>
        </div>

        {/* Pricing Calculation Exception Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Pricing Calculation Exception Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No calculation exceptions are currently recorded.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Exception ID",
              "Calculation Run ID",
              "Exception Type",
              "Affected Input",
              "Affected Formula / Calculation",
              "Affected Output",
              "Issue",
              "Potential Impact",
              "Required Action",
              "Owner where available",
              "Status",
              "Retest / Recalculation Required",
              "Evidence",
              "Human Review Requirement",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "MISSING REQUIRED INPUT",
              "INVALID INPUT",
              "UNRESOLVED GAP",
              "UNRESOLVED CONFLICT",
              "METHOD VERSION MISMATCH",
              "FORMULA VERSION MISMATCH",
              "MAPPING FAILURE",
              "CALCULATION FAILURE",
              "RECONCILIATION DIFFERENCE",
              "PERMISSION FAILURE",
              "OTHER CONTROLLED EXCEPTION",
            ].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Output Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-3 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Pricing Output Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1.5">
            {[
              "Controlled Calculation Run Completed",
              "Required Outputs Available",
              "Output Validation Completed",
              "Required Reconciliation Completed",
              "Material Calculation Exceptions Resolved",
              "Material Output Gaps Addressed",
              "Material Output Conflicts Resolved",
              "Required Evidence Retained",
              "Authorised Human Review where applicable",
            ].map((cond, i, arr) => (
              <React.Fragment key={cond}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#fecaca",
                    background: "#fff",
                    color: "#6b7280",
                  }}
                >
                  {cond}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#fca5a5" }}>+</span>}
              </React.Fragment>
            ))}
            <span style={{ color: "#fca5a5" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border font-semibold"
              style={{
                borderColor: "#bbf7d0",
                background: "#f0fdf4",
                color: "#15803d",
              }}
            >
              Ready for Pricing Output
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            PRICING OUTPUT NOT READY
          </p>
          <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
            No bypass available.
          </p>
        </div>

        {/* Output ≠ Quotation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            CALCULATED OUTPUT IS NOT AN APPROVED SUPPLIER QUOTATION
          </p>
          <p className="text-xs mb-1" style={{ color: "#78350f" }}>
            FERN pricing calculation outputs support controlled pricing analysis. They do not
            independently constitute a supplier quotation, procurement approval, contractual
            commitment or approved commercial decision.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Future outputs must not be labelled Approved Price, Final Supplier Price or Contract
            Award Price unless an authorised downstream process explicitly establishes that status.
          </p>
        </div>

        {/* Calculation Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Calculation Traceability
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
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
              "Authorised Human Review",
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
          <p className="text-xs italic" style={{ color: "#93c5fd" }}>
            Each future pricing output must remain reproducible and traceable to the exact inputs,
            source versions, method version, implementation version and calculation run that
            produced it. No traceability record fabricated.
          </p>
        </div>

        {/* Human Review */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs mb-1" style={{ color: "#78350f" }}>
            Material pricing outputs, reconciliation differences, calculation exceptions and
            commercial interpretation remain subject to the applicable authorised human review and
            approval process.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            FERN must not automatically approve an output, a supplier price, a procurement decision
            or a contractual commitment.
          </p>
        </div>
      </div>
    </>
  );
}
