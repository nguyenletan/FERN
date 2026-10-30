import React from "react";

export default function PricingFormulaVerificationSection() {
  return (
    <>
      {/* Pricing Formula Implementation & Verification */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Pricing Formula Implementation & Verification
        </h2>

        {/* Formula Implementation Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Implementation Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            FORMULA IMPLEMENTATION NOT READY
          </p>
          <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
            Reference pricing formula logic must not be implemented as controlled FERN calculation
            logic until the applicable calculation method, workbook version, formula references,
            mappings, validation, testing and acceptance requirements have been sufficiently
            established.
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            This is an implementation-readiness state. It is not a calculation failure and is not a
            finding about an actual Site price or supplier quotation.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1">
            {[
              "Controlled Calculation Method Accepted",
              "Applicable Workbook Version Established",
              "Applicable Formula Inventory Established",
              "Required Formula Source References Verified",
              "Applicable Calculation Lineage Established",
              "Applicable Source-to-Target Mapping Accepted",
              "Applicable Mapping Tests Accepted",
              "Required Formula Dependencies Established",
              "Target FERN Calculation Component Identified",
              "Required Formula Test Cases Defined",
              "Expected Behaviour Defined",
              "Acceptance Criteria Defined",
              "Required Test Evidence Location Established",
              "Material Formula Gaps Identified",
              "Material Formula Conflicts Identified",
              "Change-Control Requirement Established",
              "Required Access / Permission Established where applicable",
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
              Ready for Formula Implementation
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Applicability of individual conditions depends on the controlled method and formula. No
            bypass available.
          </p>
        </div>

        {/* Formula Implementation Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Formula Implementation Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No controlled pricing formula implementations are currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Implementation ID",
              "Formula ID",
              "Business Purpose",
              "Source Workbook",
              "Source Workbook Version",
              "Source Sheet",
              "Source Cell / Range where verified",
              "Source Formula Reference",
              "Formula Classification",
              "Applicable Pricing Area",
              "Required Source Inputs",
              "Required Reference Data",
              "Dependencies",
              "Target FERN Calculation Component",
              "Target Input Reference",
              "Target Output Reference",
              "Implementation Version",
              "Implementation Status",
              "Source Equivalence Status",
              "Verification Status",
              "Test Reference",
              "Defect / Exception Reference",
              "Change-Control Reference",
              "Evidence",
              "Human Review Requirement",
              "Acceptance Status",
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

        {/* Source Formula Preservation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#1e3a8a" }}>
            Source Formula Preservation
          </p>
          <p className="text-xs font-bold mb-1" style={{ color: "#1a56db" }}>
            PRESERVE SOURCE LOGIC
          </p>
          <p className="text-xs mb-2" style={{ color: "#3730a3" }}>
            FERN must preserve the verified source formula and its source reference separately from
            any implemented calculation logic so that the implementation can be verified against the
            controlled source.
          </p>
          <div className="flex items-center gap-2 text-xs mb-2">
            <span
              className="px-2 py-0.5 rounded border font-bold"
              style={{
                borderColor: "#bfdbfe",
                background: "#fff",
                color: "#1e3a8a",
              }}
            >
              SOURCE FORMULA
            </span>
            <span className="font-bold" style={{ color: "#9ca3af" }}>
              ≠
            </span>
            <span
              className="px-2 py-0.5 rounded border font-bold"
              style={{
                borderColor: "#bfdbfe",
                background: "#fff",
                color: "#1e3a8a",
              }}
            >
              IMPLEMENTED FORMULA
            </span>
            <span className="font-bold" style={{ color: "#9ca3af" }}>
              ≠
            </span>
            <span
              className="px-2 py-0.5 rounded border font-bold"
              style={{
                borderColor: "#bfdbfe",
                background: "#fff",
                color: "#1e3a8a",
              }}
            >
              CALCULATED OUTPUT
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#93c5fd" }}>
            These items are related through traceability but must remain distinguishable. No
            workbook formula has been rewritten or simplified.
          </p>
        </div>

        {/* Formula Source Equivalence Verification */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Source Equivalence Verification
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Verify that implemented calculation logic preserves the applicable controlled source
            logic, dependencies and intended business meaning. No formula source-equivalence
            assessment has been completed.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Formula ID",
              "Source Workbook",
              "Source Workbook Version",
              "Source Formula Reference",
              "Implementation Reference",
              "Source Inputs",
              "Implementation Inputs",
              "Source Dependencies",
              "Implementation Dependencies",
              "Source Output",
              "Implementation Output",
              "Logic Comparison",
              "Dependency Comparison",
              "Data-Type / Unit Consideration",
              "Currency Consideration where applicable",
              "Rounding / Precision Requirement where established",
              "Difference Identified",
              "Difference Classification",
              "Resolution Required",
              "Verification Status",
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
          <div className="flex flex-wrap gap-1.5 text-xs mb-1">
            {[
              "NOT ASSESSED",
              "VERIFICATION REQUIRED",
              "VERIFIED",
              "VERIFIED WITH CONDITION",
              "FAILED VERIFICATION",
              "RETURNED FOR CORRECTION",
              "SUPERSEDED",
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
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No PASS, FAIL or CONDITIONAL result assigned. Current state: NOT ASSESSED.
          </p>
        </div>

        {/* Formula Test Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Test Readiness
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
              "Controlled Formula Implementation Available",
              "Source Equivalence Verification Completed",
              "Required Inputs Identified",
              "Required Dependencies Identified",
              "Expected Behaviour Established",
              "Expected Result Basis Established",
              "Tolerance Established where applicable",
              "Test Data Basis Established",
              "Exception Behaviour Established where applicable",
              "Evidence Location Established",
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
              Ready for Formula Testing
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            FORMULA TESTING NOT READY
          </p>
          <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
            No bypass available.
          </p>
        </div>

        {/* Pricing Formula Test Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Pricing Formula Test Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No pricing formula tests are currently available for execution.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Test ID",
              "Formula ID",
              "Implementation Reference",
              "Implementation Version",
              "Test Type",
              "Source Workbook Version",
              "Applicable Pricing Area",
              "Preconditions",
              "Input Reference",
              "Reference Data",
              "Dependency Reference",
              "Expected Behaviour",
              "Expected Result",
              "Tolerance where applicable",
              "Actual Result",
              "Difference",
              "Test Status",
              "Evidence",
              "Defect Reference",
              "Retest Reference",
              "Test Owner where available",
              "Reviewer where available",
              "Acceptance Criterion",
              "Acceptance Status",
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
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Formula Test Types (future)
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "SOURCE EQUIVALENCE",
              "INPUT MAPPING",
              "OUTPUT MAPPING",
              "DEPENDENCY / REFERENCE",
              "CROSS-SHEET DEPENDENCY",
              "REFERENCE DATA",
              "UNIT HANDLING",
              "CURRENCY HANDLING",
              "ROUNDING / PRECISION where established by the controlled method",
              "EXCEPTION HANDLING",
              "REGRESSION",
              "RECONCILIATION",
              "SUPERSESSION",
            ].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Expected Result & Tolerance Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Expected Result & Tolerance Control
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ESTABLISHED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Expected results and tolerances must originate from the applicable controlled method,
            verified reference calculation, acceptance criterion or other authorised evidence.
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Expected Result Basis", value: "—" },
              { label: "Tolerance", value: "—" },
              { label: "Tolerance Basis", value: "—" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded border px-2 py-1"
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            No arbitrary percentage tolerance invented. Exact equality not assumed where the
            controlled method has not established that requirement.
          </p>
        </div>

        {/* Formula Defect & Exception Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Formula Defect & Exception Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No formula implementation defects or exceptions are currently recorded.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Defect / Exception ID",
              "Formula ID",
              "Implementation Reference",
              "Test Reference",
              "Issue Type",
              "Issue",
              "Affected Input",
              "Affected Dependency",
              "Affected Output",
              "Potential Impact",
              "Severity Classification",
              "Required Action",
              "Owner where available",
              "Status",
              "Retest Required",
              "Retest Reference",
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Severity Classification: TO BE DETERMINED. No severity model invented. No defects
            populated.
          </p>
        </div>

        {/* Formula Change Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Change Control
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No controlled formula implementation change has been recorded.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Change ID",
              "Formula ID",
              "Current Implementation Version",
              "Proposed Implementation Version",
              "Source Workbook Version",
              "Change Reason",
              "Source Change Reference",
              "Affected Inputs",
              "Affected Dependencies",
              "Affected Outputs",
              "Required Mapping Change",
              "Required Retest",
              "Required Reconciliation",
              "Required Documentation Update",
              "Supersedes",
              "Effective Date",
              "Change Status",
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
        </div>

        {/* Formula Implementation Acceptance */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Implementation Acceptance
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Controlled Method Acceptance Completed",
              "Formula Implementation Completed",
              "Source Equivalence Verification Completed",
              "Required Formula Tests Completed",
              "Required Reconciliation Completed",
              "Material Test Failures Resolved",
              "Material Defects Addressed",
              "Material Exceptions Addressed",
              "Material Formula Gaps Addressed",
              "Material Formula Conflicts Resolved",
              "Required Evidence Retained",
              "Required Human Review Completed",
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
              Ready for Formula Implementation Acceptance
            </span>
          </div>
          <p className="text-xs font-bold mb-3" style={{ color: "#dc2626" }}>
            FORMULA IMPLEMENTATION ACCEPTANCE NOT READY
          </p>
          <p className="text-xs font-bold mb-1.5" style={{ color: "#9ca3af" }}>
            Formula Implementation Acceptance Record
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Formula / Formula Set",
              "Implementation Version",
              "Source Workbook",
              "Source Workbook Version",
              "Controlled Method Reference",
              "Source Equivalence Status",
              "Formula Test Summary",
              "Reconciliation Status",
              "Outstanding Defects",
              "Outstanding Exceptions",
              "Outstanding Gaps",
              "Outstanding Conflicts",
              "Conditions",
              "Evidence",
              "Acceptance Status",
              "Accepted By",
              "Acceptance Date",
              "Human Review Requirement",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded border px-2 py-1"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  {f}
                </p>
                <p
                  className="text-xs italic font-bold"
                  style={{
                    color: f === "Acceptance Status" ? "#d97706" : "#d1d5db",
                  }}
                >
                  {f === "Acceptance Status" ? "PENDING IMPLEMENTATION AND TESTING" : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Release Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Pricing Calculation Release Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Controlled formula implementation does not by itself authorise release or production
            calculation. Applicable implementation acceptance, permissions, release controls and
            authorised approval must be satisfied before calculation execution is enabled.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Controlled Calculation Method Accepted",
              "Required Formula Implementations Accepted",
              "Required Formula Tests Accepted",
              "Required Reconciliation Accepted",
              "Applicable Permissions Established",
              "Applicable Security Requirements Satisfied",
              "Required Evidence Retained",
              "Outstanding Material Defects Resolved",
              "Outstanding Material Exceptions Addressed",
              "Applicable Release Approval Completed",
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
              Ready for Controlled Pricing Release
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            PRICING CALCULATION RELEASE NOT READY
          </p>
        </div>

        {/* Execution Disabled */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#dc2626" }}>
            FORMULA EXECUTION REMAINS DISABLED
          </p>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            CONTROLLED PRICING CALCULATION: DISABLED
          </p>
          <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
            No pricing calculation may be executed from this architecture until the applicable
            method, formula implementation, testing, acceptance, permissions and release controls
            have been satisfied.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span style={{ color: "#9ca3af" }}>
              Pricing Calculation Status: <strong>NOT READY</strong>
            </span>
            <span style={{ color: "#9ca3af" }}>
              Pricing Output Status: <strong>NOT AVAILABLE</strong>
            </span>
          </div>
        </div>

        {/* Implementation Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Implementation Traceability
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Pricing Guidance",
              "Reference Workbook",
              "Workbook Identity / Version",
              "Formula Inventory",
              "Calculation Method Validation",
              "Controlled Method Acceptance",
              "Source Formula Reference",
              "Formula Implementation",
              "Source Equivalence Verification",
              "Formula Testing",
              "Defect / Exception Resolution where applicable",
              "Formula Implementation Acceptance",
              "Release Readiness",
              "Controlled Pricing Calculation",
              "Pricing Output",
              "Authorised Human Review",
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
            Every implemented pricing formula must remain traceable to its controlled source,
            method, implementation version, test evidence and acceptance status. No traceability
            records fabricated.
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
            Formula implementation acceptance, release for commercial use and material pricing
            decisions remain subject to the applicable authorised human review and approval process.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            FERN must not self-approve a formula, a calculation method, a production release, a
            supplier price or a procurement decision.
          </p>
        </div>
      </div>
    </>
  );
}
