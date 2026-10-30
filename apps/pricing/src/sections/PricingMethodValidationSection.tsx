import React from "react";

export default function PricingMethodValidationSection() {
  return (
    <>
      {/* Pricing Calculation Method Validation */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Calculation Method Validation
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
          CONTROLLED CALCULATION METHOD NOT YET ESTABLISHED
        </p>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          A reference BBM pricing workbook containing formula logic is available, but its identity,
          version, applicability, approval status and required validation evidence have not yet been
          sufficiently established for the method to be treated as controlled FERN pricing logic.
        </p>
        <p className="text-xs mb-4 italic" style={{ color: "#9ca3af" }}>
          This is a method-readiness state. It is not a finding about an actual Site price, supplier
          quotation or commercial outcome.
        </p>

        {/* Current state summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { label: "Reference Workbook", value: "AVAILABLE" },
            { label: "Workbook Version", value: "TO BE CONFIRMED" },
            { label: "Applicability", value: "REQUIRES VALIDATION" },
            { label: "Approval Status", value: "NOT ESTABLISHED" },
            {
              label: "Formula Inventory",
              value: "REFERENCE FORMULAS IDENTIFIED",
            },
            { label: "Formula Implementation", value: "NOT IMPLEMENTED" },
            { label: "Pricing Calculation", value: "NOT READY" },
            { label: "Pricing Output", value: "NOT AVAILABLE" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded border px-2 py-1.5"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p className="text-xs font-bold" style={{ color: "#374151" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Validation Gate */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Calculation Method Validation Gate
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Reference Workbook Available",
              "Workbook Identity Confirmed",
              "Workbook Version Confirmed",
              "Applicable Guidance Identified",
              "Applicable Guidance Version Established",
              "Workbook Applicability Established",
              "Approval Status Established",
              "Method Owner Established where available",
              "Formula Inventory Sufficiently Established",
              "Formula Dependency / Lineage Sufficiently Established",
              "Applicable Source-to-Target Mapping Accepted where required",
              "Applicable Mapping Tests Accepted where required",
              "Required Formula Tests Defined",
              "Required Acceptance Criteria Defined",
              "Material Method Gaps Identified",
              "Material Method Conflicts Identified",
              "Supersession Status Established",
              "Required Evidence Available",
              "Authorised Human Review where applicable",
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
              Ready for Calculation Method Validation
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Applicability of each condition remains controlled. No bypass available.
          </p>
        </div>

        {/* Calculation Method Control Record */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Calculation Method Control Record
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              { f: "Method Name", v: "—" },
              { f: "Method Description", v: "—" },
              { f: "Reference Workbook", v: "AVAILABLE" },
              { f: "Workbook Version", v: "TO BE CONFIRMED" },
              { f: "Workbook Source", v: "—" },
              { f: "Workbook Source Date where established", v: "—" },
              { f: "Guidance Source", v: "—" },
              { f: "Guidance Version", v: "—" },
              { f: "Guidance Date where established", v: "—" },
              { f: "Applicability", v: "REQUIRES VALIDATION" },
              { f: "Applicable Site / Region where established", v: "—" },
              { f: "Applicable Pricing Scope", v: "—" },
              { f: "Applicable Service Scope", v: "—" },
              { f: "Method Owner where available", v: "—" },
              { f: "Approval Status", v: "NOT ESTABLISHED" },
              { f: "Effective Date", v: "—" },
              {
                f: "Formula Inventory Status",
                v: "REFERENCE FORMULAS IDENTIFIED",
              },
              { f: "Formula Lineage Status", v: "—" },
              { f: "Mapping Status", v: "—" },
              { f: "Mapping Test Status", v: "—" },
              { f: "Formula Test Status", v: "—" },
              { f: "Known Dependencies", v: "—" },
              { f: "Material Assumptions", v: "—" },
              { f: "Material Information Gaps", v: "—" },
              { f: "Material Conflicts", v: "—" },
              { f: "Superseded Method", v: "—" },
              { f: "Supersession Status", v: "—" },
              { f: "Validation Status", v: "—" },
              { f: "Conditions / Constraints", v: "—" },
              { f: "Supporting Evidence", v: "—" },
              { f: "Human Review Requirement", v: "—" },
            ].map(({ f, v }) => (
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
                  style={{ color: v === "—" ? "#d1d5db" : "#374151" }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Workbook Identity & Version */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#92400e" }}>
              Reference Workbook Identity & Version
            </p>
            <span className="text-xs italic" style={{ color: "#d97706" }}>
              REQUIRES VALIDATION
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#78350f" }}>
            Historical version references within the supplied reference workbook do not by
            themselves establish the version or approval status of the workbook currently applicable
            to FERN pricing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Workbook Name",
              "Workbook File Reference",
              "Workbook Version",
              "Version Source",
              "Change History Available",
              "Applicable Release",
              "Effective Date",
              "Superseded By",
              "Current / Superseded Status",
              "Approval Status",
              "Owner where available",
              "Validation Status",
              "Supporting Evidence",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded border px-2 py-1"
                style={{ borderColor: "#fde68a", background: "#fff" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#92400e" }}>
                  {f}
                </p>
                <p
                  className="text-xs italic"
                  style={{
                    color: f === "Workbook Version" ? "#d97706" : "#d1d5db",
                  }}
                >
                  {f === "Workbook Version" ? "TO BE CONFIRMED" : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidance & Workbook Alignment */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Guidance & Workbook Alignment
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Determine whether the supplied pricing guidance and the reference workbook describe a
            compatible and applicable pricing process before either is treated as a controlled
            calculation method. No controlled guidance-to-workbook alignment assessment has been
            completed.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Guidance Source",
              "Guidance Version",
              "Workbook",
              "Workbook Version",
              "Process Area",
              "Guidance Requirement",
              "Workbook Implementation",
              "Alignment Status",
              "Difference",
              "Potential Impact",
              "Resolution Required",
              "Owner where available",
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

        {/* Formula Coverage Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Coverage Validation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Establish whether the formula inventory and dependency lineage sufficiently cover the
            pricing outputs required for the applicable pricing scope.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Formula ID",
              "Workbook Version",
              "Sheet",
              "Formula Location",
              "Business Purpose",
              "Required Input",
              "Dependency",
              "Output",
              "Applicable Pricing Area",
              "Formula Inventory Status",
              "Lineage Status",
              "Protected / Controlled Status where established",
              "Validation Status",
              "Test Reference",
              "Acceptance Criterion",
              "Exception Reference",
              "Evidence",
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
            Current formula records: NOT DISPLAYED / NOT VALIDATED FOR CONTROLLED USE. No formula
            records populated.
          </p>
        </div>

        {/* Formula Integrity Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Formula Integrity Control
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ASSESSED
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "Formula Present",
              "Formula Version",
              "Referenced Cells / Ranges",
              "Cross-Sheet Dependencies",
              "Protected Formula Status",
              "Unexpected Formula Change",
              "Broken Reference",
              "Circular Reference",
              "Manual Override",
              "Hard-Coded Value where formula expected",
              "Superseded Formula",
              "Formula Test Status",
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Future control types only. No formula issue currently claimed. No defect created.
          </p>
        </div>

        {/* Method GAP & CONFLICT Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Calculation Method GAP & CONFLICT Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No calculation-method GAP or CONFLICT has currently been established.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {[
              "GAP",
              "CONFLICT",
              "VERSION UNCERTAINTY",
              "APPLICABILITY UNCERTAINTY",
              "APPROVAL STATUS UNCERTAINTY",
              "GUIDANCE / WORKBOOK DIFFERENCE",
              "FORMULA COVERAGE GAP",
              "LINEAGE GAP",
              "TEST GAP",
              "OTHER CONTROLLED ISSUE",
            ].map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Issue ID",
              "Classification",
              "Affected Method Area",
              "Affected Workbook Area",
              "Affected Formula / Dependency where applicable",
              "Source",
              "Issue",
              "Potential Impact",
              "Required Resolution",
              "Owner where available",
              "Status",
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

        {/* Validation Outcome */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Calculation Method Validation Outcome
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {[
              "VALIDATED AS REFERENCE ONLY",
              "ACCEPTABLE FOR CONTROLLED IMPLEMENTATION",
              "ACCEPTABLE WITH CONDITIONS",
              "RETURNED FOR CORRECTION",
              "REJECTED",
              "SUPERSEDED",
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
            Current outcome: — (no outcome selected; reference availability is not treated as
            acceptance for controlled implementation)
          </p>
        </div>

        {/* Controlled Method Acceptance */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Controlled Calculation Method Acceptance
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
              "Method Validation Completed",
              "Applicable Workbook Version Established",
              "Applicability Established",
              "Approval Status Established",
              "Required Mapping Acceptance Completed",
              "Required Formula Coverage Validation Completed",
              "Required Formula Tests Completed",
              "Material Method Gaps Addressed",
              "Material Method Conflicts Resolved",
              "Required Evidence Retained",
              "Required Human Review Completed",
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
              Ready for Controlled Method Acceptance
            </span>
          </div>
          <p className="text-xs font-bold mb-3" style={{ color: "#dc2626" }}>
            METHOD ACCEPTANCE NOT READY
          </p>

          {/* Acceptance Record */}
          <p className="text-xs font-bold mb-1.5" style={{ color: "#9ca3af" }}>
            Calculation Method Acceptance Record
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Method",
              "Workbook",
              "Workbook Version",
              "Applicability",
              "Approval Status",
              "Validation Outcome",
              "Formula Coverage Status",
              "Formula Test Status",
              "Mapping Acceptance Status",
              "Outstanding Gaps",
              "Outstanding Conflicts",
              "Outstanding Exceptions",
              "Conditions",
              "Supporting Evidence",
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
                  {f === "Acceptance Status" ? "PENDING METHOD VALIDATION" : "—"}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            No bypass. No approver invented. No acceptance date invented.
          </p>
        </div>

        {/* Formula Execution Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            FORMULA EXECUTION REMAINS DISABLED
          </p>
          <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
            Reference formula logic must not be executed as controlled FERN pricing logic until the
            applicable calculation method has completed the required validation and acceptance
            controls.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span style={{ color: "#9ca3af" }}>
              Formula Implementation: <strong>NOT IMPLEMENTED</strong>
            </span>
            <span style={{ color: "#9ca3af" }}>
              Pricing Calculation Status: <strong>NOT READY</strong>
            </span>
            <span style={{ color: "#9ca3af" }}>
              Pricing Output Status: <strong>NOT AVAILABLE</strong>
            </span>
          </div>
        </div>

        {/* Method Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Calculation Method Traceability
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Pricing Guidance",
              "Reference Workbook",
              "Workbook Identity / Version",
              "Formula Inventory",
              "Formula Dependency / Lineage",
              "Source-to-Target Mapping",
              "Mapping Validation & Testing",
              "Calculation Method Validation",
              "Controlled Method Acceptance",
              "Formula Implementation",
              "Formula Testing",
              "Controlled Pricing Calculation",
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
            Controlled pricing implementation must remain traceable to the applicable guidance,
            workbook version, mapping, formula lineage, validation, testing and acceptance evidence.
            No traceability records created.
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
            Acceptance of a calculation method for commercial or procurement use remains subject to
            the applicable authorised human review and approval process. FERN must not self-approve
            the calculation method.
          </p>
        </div>
      </div>
    </>
  );
}
