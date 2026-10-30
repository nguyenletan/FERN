import React from "react";

export default function PricingHandoverSection() {
  return (
    <>
      {/* Pricing Assessment Handover */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Pricing Assessment Handover
        </h2>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          Pricing information may be made available to the FM assessment only when the applicable
          pricing output has been sufficiently established, validated, reconciled, reviewed and
          retained for the relevant assessment context.
        </p>

        {/* Handover Readiness */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              HANDOVER READINESS
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
              "Applicable Site / Context",
              "Applicable Pricing Scope",
              "Validated Pricing Inputs",
              "Controlled Calculation Method",
              "Accepted Formula Implementation",
              "Controlled Calculation Run",
              "Required Pricing Outputs",
              "Output Validation",
              "Required Reconciliation",
              "Material Calculation Exceptions Addressed",
              "Material Information Gaps Addressed",
              "Material Conflicts Resolved",
              "Evidence Traceability Available",
              "Authorised Human Review where required",
              "Pricing Assessment Report where required",
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
              Ready for FM Assessment Handover
            </span>
          </div>
          <p className="text-xs font-bold mb-0.5" style={{ color: "#dc2626" }}>
            PRICING HANDOVER NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No bypass. Applicability of each condition depends on the pricing scope, assessment
            context and controlled methodology.
          </p>
        </div>

        {/* Handover Package */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Assessment Handover Package
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Define the controlled pricing information that may be reused by the FM assessment
            without recreating or independently recalculating the pricing analysis. No handover
            package is currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Handover ID",
              "Source Pricing Assessment",
              "Site / Context",
              "Pricing Scope",
              "Applicable Service Scope",
              "Pricing Method",
              "Pricing Method Version",
              "Formula Implementation Version",
              "Calculation Run Reference",
              "Input Snapshot Version",
              "Relevant Pricing Outputs",
              "Currency where applicable",
              "Cost Basis where applicable",
              "Applicable Period",
              "Output Validation Status",
              "Reconciliation Status",
              "Material Exceptions",
              "Material Assumptions",
              "Material Information Gaps",
              "Material Conflicts",
              "Evidence Confidence",
              "Human Review Status",
              "Supporting Evidence",
              "Source Version",
              "Validation Status",
              "Handover Status",
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

        {/* Relevant Information Only + Source Ownership */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
              RELEVANT INFORMATION ONLY
            </p>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              The FM assessment should reuse only pricing information relevant to the assessment
              scope and sufficiently supported for that use. The entire Pricing Template Generator
              dataset must not be passed merely because it exists.
            </p>
          </div>
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
              SOURCE OWNERSHIP CONTROL
            </p>
            <p className="text-xs mb-1.5" style={{ color: "#6b7280" }}>
              Pricing information remains owned and traceable to its source pricing assessment.
              Reuse within the FM assessment must not create a second independent version of the
              pricing result.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs">
              {[
                "Authorised Source Information",
                "Validated Pricing Input",
                "Controlled Pricing Calculation",
                "Validated Pricing Output",
                "Pricing Handover Package",
                "FM Assessment Input",
                "Cost & Commercial Comparison",
                "FERN Recommendation",
                "Authorised Human Review",
                "Business Decision Record",
              ].map((node, i, arr) => (
                <React.Fragment key={node}>
                  <span
                    className="px-1.5 py-0.5 rounded border"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#fff",
                      color: "#6b7280",
                    }}
                  >
                    {node}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Handover Field Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Handover Field Validation
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No pricing handover fields are currently available for validation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Field Name",
              "Source Value",
              "Source Classification",
              "Source",
              "Source Version",
              "Source Date",
              "Site / Context",
              "Pricing Scope",
              "Currency where applicable",
              "Unit where applicable",
              "Cost Basis where applicable",
              "Evidence Confidence",
              "Validation Status",
              "Receiving Assessment Field",
              "Applicability",
              "Transformation / Derivation where applicable",
              "Conflict Status",
              "Gap Status",
              "Acceptance Status",
              "Exception Reason",
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

        {/* Context Match + Version & Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-bold" style={{ color: "#374151" }}>
                Context Match
              </p>
              <span className="text-xs italic" style={{ color: "#9ca3af" }}>
                NOT ASSESSED
              </span>
            </div>
            <p className="text-xs mb-1.5" style={{ color: "#6b7280" }}>
              Pricing information must not be reused across an incompatible Site, scope, currency,
              cost basis or assessment context without explicit validation.
            </p>
            <div className="flex flex-wrap gap-1 text-xs">
              {[
                "Source Site / Context",
                "Receiving Site / Context",
                "Source Pricing Scope",
                "Receiving Assessment Scope",
                "Applicable Service Scope",
                "Currency where applicable",
                "Cost Basis where applicable",
                "Decision Context",
              ].map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 rounded border"
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
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-bold" style={{ color: "#374151" }}>
                Source Version & Currency
              </p>
              <span className="text-xs italic" style={{ color: "#9ca3af" }}>
                NOT ASSESSED
              </span>
            </div>
            <div className="flex flex-wrap gap-1 text-xs">
              {[
                "Source Pricing Assessment",
                "Source Version",
                "Calculation Method Version",
                "Formula Implementation Version",
                "Calculation Run Reference",
                "Source Date",
                "Last Validated",
                "Superseded By",
                "Current / Stale Status",
                "Applicable Refresh Requirement",
                "Reason for Refresh where required",
              ].map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 rounded border"
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

        {/* Handover Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Handover Validation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
            A pricing handover must be validated against the receiving assessment context before its
            information can be treated as an accepted FM assessment input.
          </p>
          <p className="text-xs font-bold mb-2" style={{ color: "#dc2626" }}>
            HANDOVER VALIDATION NOT READY
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1">
            {[
              "Handover Package Available",
              "Source Pricing Assessment Identified",
              "Applicable Site / Context Match",
              "Applicable Pricing Scope Match",
              "Applicable Service Scope Match where required",
              "Source Version Available",
              "Calculation Method Version Available where applicable",
              "Formula Implementation Version Available where applicable",
              "Calculation Run Reference Available where applicable",
              "Validation Status Available",
              "Required Evidence Traceability Available",
              "Material Fields Sufficiently Established",
              "Material Gaps Identified",
              "Material Conflicts Identified",
              "Duplicate / Superseded Record Check",
              "Freshness / Currency Check where applicable",
              "Receiving Assessment Context Confirmed",
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
              Ready for Handover Validation
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is an interface-readiness state. It is not a finding about an actual Site price,
            supplier quotation, commercial position or FM assessment. No bypass available.
          </p>
        </div>

        {/* Duplicate & Supersession Check */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Duplicate & Supersession Check
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No duplicate or supersession assessment has been completed.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Pricing Assessment",
              "Source Version",
              "Calculation Run Reference",
              "Existing Receiving Record",
              "Duplicate Status",
              "Superseded Status",
              "Superseded By",
              "Current Record Status",
              "Required Action",
              "Supporting Evidence",
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

        {/* Pricing / FM Assessment Reconciliation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing / FM Assessment Reconciliation
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Pricing information must be reconciled with relevant existing FM assessment information
            before material commercial information is accepted for comparative decision support. No
            pricing-to-FM assessment reconciliation is currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Reconciliation ID",
              "Handover ID",
              "Source Pricing Field",
              "Source Pricing Value",
              "Source Classification",
              "Receiving Assessment Field",
              "Existing Receiving Value",
              "Site / Context Match",
              "Pricing Scope Match",
              "Service Scope Match where applicable",
              "Currency Match where applicable",
              "Cost Basis Match where applicable",
              "Period Match where applicable",
              "Difference Identified",
              "Difference Classification",
              "Materiality",
              "Gap Status",
              "Conflict Status",
              "Required Resolution",
              "Resolution Owner where available",
              "Resolution Status",
              "Human Review Requirement",
              "Supporting Evidence",
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
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "NOT ASSESSED",
              "MATCH",
              "ACCEPTABLE DIFFERENCE",
              "CONFLICT — RESOLUTION REQUIRED",
              "GAP — INFORMATION REQUIRED",
              "REJECTED — CORRECTION REQUIRED",
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
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            Future possible states only. No reconciliation result assigned to the current prototype.
          </p>
        </div>

        {/* Handover Exception Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Handover Exception Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No pricing handover exceptions are currently recorded. Current records: NONE.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Exception ID",
              "Handover ID",
              "Exception Type",
              "Affected Field",
              "Site / Context",
              "Pricing Scope",
              "Source",
              "Source Version",
              "Receiving Assessment Area",
              "Issue",
              "Potential Commercial Impact",
              "Potential FM Assessment Impact",
              "Gap / Conflict Classification",
              "Required Action",
              "Owner where available",
              "Status",
              "Supporting Evidence",
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
              "MISSING INFORMATION",
              "CONTEXT MISMATCH",
              "PRICING SCOPE MISMATCH",
              "SERVICE SCOPE MISMATCH",
              "CURRENCY MISMATCH",
              "COST BASIS MISMATCH",
              "PERIOD MISMATCH",
              "VERSION CONFLICT",
              "STALE INFORMATION",
              "DUPLICATE RECORD",
              "SUPERSEDED RECORD",
              "VALIDATION FAILURE",
              "UNRESOLVED GAP",
              "UNRESOLVED CONFLICT",
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
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            Classifications only. No exception applied to the current prototype.
          </p>
        </div>

        {/* Validation → Acceptance control sequence */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Validation → Reconciliation → Acceptance Control Sequence
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Pricing Handover Package",
              "Field Validation",
              "Context / Scope / Version Checks",
              "Duplicate / Supersession Check",
              "Pricing / FM Assessment Reconciliation",
              "Exception Resolution where required",
              "Handover Acceptance",
              "FM Assessment Input",
              "Cost & Commercial Comparison",
              "FERN Recommendation",
              "Authorised Human Review",
              "Business Decision Record",
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
            The current handover has not progressed through any of these stages.
          </p>
        </div>

        {/* No silent overwrite + Pricing ≠ FM model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
              DO NOT SILENTLY OVERWRITE
            </p>
            <p className="text-xs mb-1" style={{ color: "#78350f" }}>
              If transferred pricing information conflicts with existing FM assessment information,
              FERN must retain both source positions, identify the conflict and require controlled
              resolution. FERN must not automatically choose one value.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              A difference between pricing information and existing FM assessment information must
              be identified, classified and resolved through the controlled reconciliation process.
              FERN must not silently replace either source position.
            </p>
          </div>
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#fde68a", background: "#fffbeb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
              PRICING INPUT DOES NOT DETERMINE THE FM SERVICE MODEL
            </p>
            <p className="text-xs" style={{ color: "#78350f" }}>
              Pricing information is one input to the FM assessment. Lowest initial price or any
              individual pricing result must not automatically determine the preferred FM Service
              Model, supplier or business decision.
            </p>
          </div>
        </div>

        {/* Handover Acceptance */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Handover Acceptance
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fffbeb",
                color: "#d97706",
                borderColor: "#fde68a",
              }}
            >
              PENDING VALIDATION
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Handover ID",
              "Validation Status",
              "Context Match Status",
              "Version / Currency Status",
              "Reconciliation Status",
              "Material Exceptions",
              "Acceptance Status",
              "Accepted By where applicable",
              "Acceptance Date where applicable",
              "Conditions / Constraints",
              "Supporting Evidence",
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

        {/* Human Review */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs mb-1" style={{ color: "#78350f" }}>
            Material pricing reconciliation differences, conflicts, exceptions, conditional
            acceptance and commercial interpretation remain subject to authorised human review.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            FERN must not automatically approve a supplier price, select a supplier, select an FM
            Service Model, resolve a material pricing conflict, approve procurement or create a
            contractual commitment.
          </p>
        </div>
      </div>
    </>
  );
}
