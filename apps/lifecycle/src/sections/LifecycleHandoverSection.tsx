import React from "react";

export default function LifecycleHandoverSection() {
  return (
    <>
      {/* ── Link to FM Pre-Contract Assessment ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          FM Pre-Contract / Pre-Tender Assessment
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          The Pre-Contract / Pre-Tender Assessment consumes validated lifecycle outputs from this
          application rather than duplicating the lifecycle calculation engine.
        </p>

        {/* Handover Readiness */}
        <div
          className="rounded-lg border px-4 py-4 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Handover Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Lifecycle information can be made available to the FM assessment only when the
            applicable lifecycle analysis output has been sufficiently established, reviewed and
            retained for the relevant assessment context.
          </p>
          <div
            className="rounded-lg border px-3 py-2 mb-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Readiness Gate — Future Logic
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                "Applicable Site / Context",
                "Applicable Asset / Scope",
                "Lifecycle Analysis Configuration",
                "Required Lifecycle Evidence",
                "Applicable Lifecycle Events",
                "Applicable Scenario Analysis",
                "Required Calculation Outputs where applicable",
                "Required Sensitivity Analysis where applicable",
                "Lifecycle Recommendation where applicable",
                "Authorised Human Review",
                "Lifecycle Decision Record where required",
                "Material Gaps Addressed",
                "Material Conflicts Resolved",
                "Evidence Traceability Available",
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
                Ready for FM Assessment Handover
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            LIFECYCLE HANDOVER NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Applicability depends on the assessment and controlled methodology. Not every lifecycle
            output is required for every FM assessment.
          </p>
        </div>

        {/* Handover Package */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Lifecycle Assessment Handover Package
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#f3f4f6",
                color: "#9ca3af",
                borderColor: "#e5e7eb",
              }}
            >
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Define the controlled lifecycle information that may be reused by the FM assessment
            without recreating or independently recalculating the lifecycle analysis.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Handover ID",
              "Source Lifecycle Analysis",
              "Site / Context",
              "Asset / Scope",
              "Analysis Base Date",
              "Analysis Horizon",
              "Lifecycle Analysis Status",
              "Lifecycle Position",
              "Relevant Lifecycle Events",
              "Relevant Event Timing",
              "Relevant Maintenance Implications",
              "Relevant Repair Information",
              "Relevant Renewal Information",
              "Relevant Replacement Information",
              "Relevant Deferred Maintenance Information",
              "Asset Condition Implication",
              "Operational Impact",
              "Business Impact",
              "Risk Implication",
              "Compliance Implication",
              "Applicable Financial Outputs",
              "Applicable Sensitivity Findings",
              "Lifecycle Recommendation where available",
              "Human Review Status",
              "Lifecycle Decision Status",
              "Material Assumptions",
              "Material Information Gaps",
              "Material Conflicts",
              "Evidence Confidence",
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

        {/* Handover Validation */}
        <div
          className="rounded-lg border px-4 py-4 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Handover Validation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            A lifecycle handover must be validated against the receiving assessment context before
            its information can be treated as an accepted FM assessment input.
          </p>
          <div
            className="rounded-lg border px-3 py-2 mb-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Validation Gate — Future Logic
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                "Handover Package Available",
                "Source Lifecycle Analysis Identified",
                "Applicable Site / Context Match",
                "Applicable Asset / Scope Match",
                "Source Version Available",
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
                Ready for Handover Validation
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            HANDOVER VALIDATION NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is an interface-readiness state. It is not a finding about the underlying Site,
            asset or lifecycle analysis.
          </p>
        </div>

        {/* Handover Field Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Handover Field Validation
          </p>
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            No lifecycle handover fields are currently available for validation.
          </p>
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future field-level validation support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
            {[
              "Field Name",
              "Source Value",
              "Source Classification",
              "Source",
              "Source Version",
              "Source Date",
              "Affected Asset / Scope",
              "Affected Analysis Horizon",
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
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future validation status model
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "NOT ASSESSED",
              "VALIDATION REQUIRED",
              "ACCEPTABLE FOR HANDOVER",
              "ACCEPTABLE WITH CONDITION",
              "REJECTED — REQUIRES CORRECTION",
              "SUPERSEDED",
              "NOT APPLICABLE",
            ].map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Context Match */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Context Match
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fffbeb",
                color: "#d97706",
                borderColor: "#fde68a",
              }}
            >
              NOT ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Lifecycle information must not be reused across an incompatible Site, asset, scope or
            assessment context without explicit validation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Site / Context",
              "Receiving Site / Context",
              "Source Asset / Scope",
              "Receiving Assessment Scope",
              "Analysis Horizon",
              "Decision Context",
              "Relevant Service Scope where applicable",
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

        {/* Source Version & Currency + Duplicate Check */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                Source Version & Currency
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded border"
                style={{
                  background: "#fffbeb",
                  color: "#d97706",
                  borderColor: "#fde68a",
                }}
              >
                NOT ASSESSED
              </span>
            </div>
            <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
              No lifecycle source version is currently available for assessment.
            </p>
            <div className="space-y-1">
              {[
                "Source Lifecycle Analysis",
                "Source Version",
                "Source Validation Status",
                "Source Date",
                "Last Validated",
                "Superseded By",
                "Current / Stale Status",
                "Applicable Refresh Requirement",
                "Reason for Refresh where required",
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
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                Duplicate & Supersession Check
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded border"
                style={{
                  background: "#fffbeb",
                  color: "#d97706",
                  borderColor: "#fde68a",
                }}
              >
                NOT ASSESSED
              </span>
            </div>
            <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
              FERN must avoid creating multiple active versions of the same lifecycle result within
              the receiving assessment.
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                "Duplicate Handover",
                "Duplicate Source Analysis",
                "Superseded Source",
                "Superseded Handover",
                "Conflicting Version",
                "Multiple Active Candidates",
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
        </div>

        {/* Reconciliation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Lifecycle / FM Assessment Reconciliation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#f3f4f6",
                color: "#9ca3af",
                borderColor: "#e5e7eb",
              }}
            >
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Compare material lifecycle handover information with relevant existing FM assessment
            information before the handover is accepted.
          </p>
          <p className="text-xs italic mb-3" style={{ color: "#9ca3af" }}>
            No reconciliation comparison is currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Lifecycle Handover Field",
              "Lifecycle Value",
              "FM Assessment Field",
              "Existing FM Assessment Value",
              "Match Status",
              "Difference / Conflict",
              "Source Priority",
              "Resolution Required",
              "Resolution Owner where available",
              "Resolution Status",
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
        </div>
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            DO NOT SILENTLY OVERWRITE
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            When lifecycle handover information differs from existing FM assessment information,
            FERN must identify the difference and require the applicable resolution rather than
            silently replacing one source with another. No value is automatically selected,
            overwritten or resolved.
          </p>
        </div>

        {/* Handover Exception Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Handover Exception Register
          </p>
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            No handover exceptions have currently been established.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
            {[
              "Exception ID",
              "Exception Type",
              "Affected Field",
              "Affected Asset / Scope",
              "Source",
              "Receiving Assessment Area",
              "Issue",
              "Potential Impact",
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
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Possible exception types
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "MISSING INFORMATION",
              "CONTEXT MISMATCH",
              "VERSION CONFLICT",
              "STALE INFORMATION",
              "DUPLICATE RECORD",
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
                  color: "#6b7280",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Handover Acceptance */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Handover Acceptance
            </p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                Handover Acceptance Readiness
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: "#fee2e2", color: "#dc2626" }}
              >
                NOT READY
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                Acceptance State
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded border"
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  borderColor: "#fde68a",
                }}
              >
                PENDING VALIDATION
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
            {[
              "Handover Package",
              "Receiving Assessment",
              "Validation Result",
              "Reconciliation Result",
              "Outstanding Conditions",
              "Outstanding Gaps",
              "Outstanding Conflicts",
              "Exceptions",
              "Evidence Confidence",
              "Accepted By",
              "Acceptance Date",
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
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future acceptance states
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {[
              "PENDING VALIDATION",
              "ACCEPTED FOR ASSESSMENT USE",
              "ACCEPTED WITH CONDITIONS",
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
                  color: "#6b7280",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No approver or acceptance date has been invented.
          </p>
        </div>

        {/* Handover Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Handover Validation Traceability Architecture
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Lifecycle Source Evidence",
              "Lifecycle Analysis",
              "Lifecycle Handover Package",
              "Field Validation",
              "Context / Version Checks",
              "Reconciliation",
              "Exceptions",
              "Handover Acceptance",
              "FM Assessment Input",
              "Scenario Comparison",
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
        </div>

        {/* Human Review */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            Material conflicts, exceptions, conditional acceptance and reuse of material lifecycle
            conclusions remain subject to the applicable authorised human review. FERN does not
            imply automated approval.
          </p>
        </div>

        {/* Relevant Information Only */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#1e3a8a" }}>
            Relevant Information Only
          </p>
          <p className="text-xs" style={{ color: "#3730a3" }}>
            The FM assessment should reuse only lifecycle information that is relevant to the
            assessment scope and sufficiently supported for that use. The complete lifecycle dataset
            must not be duplicated merely because it exists.
          </p>
        </div>

        {/* Source Ownership Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Source Ownership Control
          </p>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Lifecycle information remains owned and traceable to its source lifecycle analysis.
            Reuse within the FM assessment must not create a second independent version of the
            lifecycle result.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Lifecycle Source Evidence",
              "Lifecycle Analysis",
              "Validated Lifecycle Output",
              "Handover Package",
              "FM Assessment Input",
              "FM Scenario Comparison",
              "FERN Recommendation",
              "Authorised Human Review",
              "Business Decision Record",
            ].map((node, i, arr) => (
              <React.Fragment key={node}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fff",
                    color: "#374151",
                  }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Output Classification */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Output Classification — each handover item must distinguish
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "Source Fact",
              "Derived Output",
              "Assumption",
              "GAP",
              "Conflict",
              "Recommendation",
              "Decision Record",
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Assumption must not become Fact. GAP must not become Zero. Conflict must not be silently
            resolved. Recommendation must not become Decision.
          </p>
        </div>

        {/* Financial Output Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Financial Output Control
          </p>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Where lifecycle financial information is included, the distinction between Source /
            Event Cost and Calculated Financial Output must be preserved. Possible calculated output
            types only where applicable and supported by controlled methodology:
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {[
              "Present Cost",
              "NPC",
              "NPV",
              "EAC",
              "Capital Exposure",
              "Capital Peak",
              "Lifecycle Total",
            ].map((o) => (
              <span
                key={o}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {o} — <em>NOT AVAILABLE</em>
              </span>
            ))}
          </div>
        </div>

        {/* No Automatic FM Decision */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            Lifecycle Input Does Not Determine the FM Service Model
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            Lifecycle information is one input to the FM assessment. It must be considered with the
            applicable service, commercial, operational, risk, compliance and other material
            assessment information. No FM scenario is ranked or selected by this interface.
          </p>
        </div>

        {/* Handover GAP / CONFLICT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
              Handover GAP
            </p>
            <p className="text-xs mb-1 leading-relaxed" style={{ color: "#6b7280" }}>
              Future fields: Missing Information · Affected Lifecycle Output · Affected FM
              Assessment Area · Impact · Required Action.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No lifecycle handover GAP has currently been established.
            </p>
          </div>
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#fecaca", background: "#fef2f2" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
              Handover Conflict
            </p>
            <p className="text-xs mb-1 leading-relaxed" style={{ color: "#6b7280" }}>
              Future fields: Lifecycle Source · FM Assessment Source · Conflicting Information ·
              Affected Assessment Area · Potential Impact · Required Resolution.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No lifecycle handover CONFLICT has currently been established.
            </p>
          </div>
        </div>

        {/* Human Review */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            Authorised Human Review Required
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            Reuse of material lifecycle recommendations, financial outputs, compliance implications,
            operational-risk conclusions or recorded lifecycle decisions within an FM assessment
            remains subject to the applicable authorised human review. FERN does not imply
            autonomous acceptance.
          </p>
        </div>

        {/* Use Validated Output link */}
        <div
          className="rounded-lg border px-4 py-3 flex items-center justify-between"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div>
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Use Validated Lifecycle Output in FM Assessment
            </p>
            <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
              Not operational until a validated lifecycle result exists. No fake data transfer.
            </p>
          </div>
          <button
            disabled
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-40 cursor-not-allowed"
            style={{
              background: "#eff6ff",
              color: "#1a56db",
              border: "1px solid #bfdbfe",
            }}
          >
            Open FM Assessment →
          </button>
        </div>
      </div>

      {/* ── Human Review Notice ── */}
      <div
        className="rounded-xl border px-6 py-4"
        style={{
          borderColor: "#fde68a",
          background: "#fffbeb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
          AUTHORISED HUMAN REVIEW REQUIRED
        </p>
        <p className="text-xs mb-2" style={{ color: "#78350f" }}>
          Material lifecycle decisions involving significant capital expenditure, asset replacement,
          major maintenance deferral, compliance implications, material operational risk, financial
          commitment or business-impact acceptance require authorised human review. FERN supports
          the decision — FERN does not independently approve these decisions.
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            "Significant capital expenditure",
            "Asset replacement",
            "Major maintenance deferral",
            "Compliance implications",
            "Material operational risk",
            "Financial commitment",
            "Business-impact acceptance",
          ].map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#fde68a",
                background: "#fff",
                color: "#92400e",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
