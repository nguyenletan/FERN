import React from "react";

export default function PricingMappingAcceptanceSection() {
  return (
    <>
      {/* Pricing Mapping Test & Acceptance */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Test Readiness */}
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Mapping Test Readiness
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          Field-mapping tests can be executed only when the applicable source, target, workbook
          version, mapping rule and required validation conditions have been sufficiently
          established.
        </p>
        <p className="text-xs mb-3 font-bold" style={{ color: "#dc2626" }}>
          MAPPING TESTING NOT READY
        </p>
        <p className="text-xs mb-4 italic" style={{ color: "#9ca3af" }}>
          This is an integration-test readiness state. It is not a test failure and is not a finding
          about an actual Site price or supplier quotation.
        </p>

        <div
          className="rounded-lg border px-3 py-2 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future test readiness gate
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Applicable Source Information Available",
              "Source Authorisation / Permission Established",
              "Applicable Site / Context Established",
              "Applicable Service / Asset Scope Established",
              "Source Version Identified",
              "Target Workbook Identified",
              "Target Workbook Version Identified",
              "Applicable Source-to-Target Mapping Established",
              "Transformation Rule Established where applicable",
              "Expected Behaviour Defined",
              "Acceptance Criterion Defined",
              "Required Test Evidence Location Established",
              "Material Mapping Gaps Identified",
              "Material Mapping Conflicts Identified",
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
              Ready for Mapping Test Execution
            </span>
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            Applicability of each condition remains dependent on the mapping and test type. No
            bypass available.
          </p>
        </div>

        {/* Test Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Pricing Mapping Test Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No pricing mapping tests are currently available for execution.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Test ID",
              "Requirement / Mapping Reference",
              "Test Type",
              "Source Business Field",
              "Source System / Record",
              "Source Field",
              "Source Version",
              "Site / Context",
              "Service / Asset Scope where applicable",
              "Target Workbook",
              "Target Workbook Version",
              "Target Sheet",
              "Target Field",
              "Target Cell / Range where verified",
              "Transformation Rule Reference where applicable",
              "Preconditions",
              "Test Input Reference",
              "Expected Behaviour",
              "Expected Result",
              "Tolerance where applicable",
              "Actual Result",
              "Test Status",
              "Evidence Reference",
              "Defect Reference",
              "Retest Reference",
              "Test Owner where available",
              "Reviewer where available",
              "Human Review Requirement",
              "Acceptance Criterion",
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
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Test Type Architecture (future)
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "SOURCE AVAILABILITY",
              "SOURCE AUTHORISATION / PERMISSION",
              "SOURCE VERSION",
              "SITE / CONTEXT MATCH",
              "SERVICE / ASSET SCOPE MATCH",
              "UNIT VALIDATION",
              "CURRENCY VALIDATION where applicable",
              "FIELD MAPPING",
              "TRANSFORMATION / DERIVATION",
              "TARGET WORKBOOK VERSION",
              "TARGET FIELD",
              "DUPLICATE / SUPERSESSION",
              "GAP HANDLING",
              "CONFLICT HANDLING",
              "RECONCILIATION",
              "FORMULA DEPENDENCY where applicable",
              "CALCULATION LINEAGE where applicable",
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

        {/* Test Status Model */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Test Status Model
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {["NOT RUN", "BLOCKED", "PASS", "FAIL", "CONDITIONAL", "NOT APPLICABLE"].map((s) => (
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
            Current Test Result: — (no test has been executed; no PASS or FAIL has been assigned;
            unavailable results are not represented as zero)
          </p>
        </div>

        {/* Permission / Access Test */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Source Permission & Access Test
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No source-access or permission test has currently been completed. FERN does not claim
            access to APM, BMS, EMS, Vendor Systems, Finance Systems, Procurement Systems,
            Compliance Repositories, Evidence Stores or any other system unless separately
            established.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source",
              "Source Owner where available",
              "Required Access",
              "Current Access Status",
              "Permission Basis",
              "Applicable User / Role",
              "Site / Context Scope",
              "Data Classification where available",
              "Read Permission",
              "Write Permission where applicable",
              "Evidence Permission",
              "Restricted Fields where applicable",
              "Test Status",
              "Exception",
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
                <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                  —
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reconciliation Test */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Reconciliation Test
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Confirm that sufficiently established source records have been mapped, accepted,
            rejected or retained as controlled exceptions without silent loss, duplication or
            substitution.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Population Reference",
              "Applicable Mapping Set",
              "Source Record Count",
              "Mapped Record Count",
              "Accepted Record Count",
              "Rejected Record Count",
              "Exception Count",
              "Duplicate Count",
              "Superseded Count",
              "Unmapped Material Field Count",
              "Reconciliation Difference",
              "Expected Reconciliation Condition",
              "Actual Reconciliation Result",
              "Evidence",
              "Test Status",
              "Acceptance Status",
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            No reconciliation counts set to zero. No result invented.
          </p>
        </div>

        {/* GAP & CONFLICT Handling Tests */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              GAP & CONFLICT Handling Tests
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT RUN
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            {[
              ["GAP", "ZERO"],
              ["ASSUMPTION", "FACT"],
              ["CONFLICT", "SILENTLY RESOLVED"],
              ["REFERENCE DATA", "SITE INPUT"],
              ["SUPERSEDED DATA", "ACTIVE DATA"],
              ["UNAUTHORISED DATA", "ACCEPTED INPUT"],
            ].map(([from, to]) => (
              <div key={from} className="flex items-center gap-1.5">
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#fecaca",
                    background: "#fff",
                    color: "#dc2626",
                  }}
                >
                  {from}
                </span>
                <span style={{ color: "#9ca3af" }}>must not become</span>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fff",
                    color: "#6b7280",
                  }}
                >
                  {to}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            DO NOT SILENTLY NORMALISE EXCEPTIONS
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Mapping tests must demonstrate that material gaps, conflicts, assumptions, reference
            values and superseded information retain their correct classification through the
            pricing workflow. No exception has been manufactured to demonstrate this.
          </p>
        </div>

        {/* Defect & Exception Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Pricing Test Defect & Exception Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No pricing test defects or exceptions are currently recorded.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Defect / Exception ID",
              "Test Reference",
              "Mapping Reference",
              "Affected Source Field",
              "Affected Target Field",
              "Issue",
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
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Current records: NONE. Severity Classification: TO BE DETERMINED. No severity scheme
            invented.
          </p>
        </div>

        {/* Mapping Acceptance */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Mapping Acceptance
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
              "Applicable Mapping Established",
              "Applicable Workbook Version Established",
              "Required Field Validation Completed",
              "Required Mapping Tests Completed",
              "Required Permission / Access Tests Completed",
              "Required Reconciliation Completed",
              "Material Test Failures Resolved",
              "Material Exceptions Addressed",
              "Material Gaps Addressed",
              "Material Conflicts Resolved",
              "Required Evidence Retained",
              "Human Review Completed where applicable",
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
              Ready for Mapping Acceptance
            </span>
          </div>
          <p className="text-xs font-bold mb-3" style={{ color: "#dc2626" }}>
            MAPPING ACCEPTANCE NOT READY
          </p>

          {/* Acceptance Record */}
          <p className="text-xs font-bold mb-1.5" style={{ color: "#9ca3af" }}>
            Pricing Mapping Acceptance Record
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Mapping / Mapping Set",
              "Target Workbook",
              "Target Workbook Version",
              "Test Summary",
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
                  className="text-xs italic"
                  style={{
                    color: f === "Acceptance Status" ? "#d97706" : "#d1d5db",
                  }}
                >
                  {f === "Acceptance Status" ? "PENDING VALIDATION AND TESTING" : "—"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "PENDING VALIDATION AND TESTING",
              "ACCEPTED FOR CONTROLLED USE",
              "ACCEPTED WITH CONDITIONS",
              "RETURNED FOR CORRECTION",
              "REJECTED",
              "SUPERSEDED",
            ].map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: s === "PENDING VALIDATION AND TESTING" ? "#fde68a" : "#e5e7eb",
                  background: s === "PENDING VALIDATION AND TESTING" ? "#fffbeb" : "#fff",
                  color: s === "PENDING VALIDATION AND TESTING" ? "#92400e" : "#9ca3af",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Test & Acceptance Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Test & Acceptance Traceability
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Authorised Source Information",
              "Source-to-Target Mapping",
              "Mapping Validation",
              "Test Case",
              "Test Evidence",
              "Reconciliation",
              "Defect / Exception where applicable",
              "Retest where applicable",
              "Mapping Acceptance",
              "Controlled Pricing Implementation",
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
            A pricing mapping must remain traceable from its source information through validation,
            testing and acceptance before it is treated as a controlled implementation. No
            traceability records fabricated.
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
          <p className="text-xs" style={{ color: "#78350f" }}>
            Material mapping exceptions, unresolved conflicts, conditional acceptance and decisions
            affecting commercial or procurement use remain subject to the applicable authorised
            human review.
          </p>
        </div>
      </div>
    </>
  );
}
