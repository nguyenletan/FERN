export default function LaunchExecutionSection() {
  return (
    <>
      {/* ── Tracking Record Activation Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Tracking Record Activation Readiness
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A configured launch-tracking record may become active only after the applicable tracking
          configuration has been validated, accepted and linked to the required source, context and
          evidence controls.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Accepted Tracking Configuration Available",
            "Validated Requirement Traceability Available",
            "Applicable Site / Context Established",
            "Applicable Tracking Record Type Established",
            "Required Responsibility Established where applicable",
            "Required Date / Period Established where applicable",
            "Required Dependency Information Established where applicable",
            "Required Evidence Requirement Established where applicable",
            "Applicable Acceptance Criterion Established where applicable",
            "Required Permissions Established where applicable",
            "Material Gaps Addressed",
            "Material Conflicts Resolved",
          ].map((c) => (
            <div key={c} className="flex items-start gap-2 py-0.5">
              <span className="text-xs" style={{ color: "#64748b" }}>
                +
              </span>
              <span className="text-xs" style={{ color: "#475569" }}>
                {c}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2" style={{ borderTop: "1px solid #374151" }}>
            <p className="text-xs font-bold" style={{ color: "#475569" }}>
              → READY FOR TRACKING RECORD ACTIVATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            TRACKING RECORD ACTIVATION NOT READY
          </p>
        </div>
      </div>

      {/* ── Active Launch Tracking Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Active Launch Tracking Register
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Provide the future controlled record of launch requirements, milestones, dependencies or
          other accepted tracking items that are actively being monitored.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Tracking Record ID",
            "Configuration ID",
            "Validated Requirement ID",
            "Tracking Record Type",
            "Tracking Record Title",
            "Site / Context",
            "Service / Scope",
            "Source",
            "Source Version",
            "Requirement Classification",
            "Responsible Party where established",
            "Accountable Party where established",
            "Applicable Workflow / Stage where established",
            "Applicable Milestone where established",
            "Applicable Dependency where established",
            "Planned Date where established",
            "Forecast Date where established",
            "Actual Date where established",
            "Required Evidence where established",
            "Acceptance Criterion where established",
            "Tracking Status",
            "Validation Status",
            "Exception Status",
            "Evidence Status",
            "Human Review Requirement",
            "Last Controlled Update",
            "Supporting Evidence",
            "Supersession Status",
          ].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-64 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Tracking Status Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Tracking Status Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT ESTABLISHED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          The applicable tracking-status model must be established from the controlled launch
          requirements and configuration. FERN must not impose a generic status model where the
          applicable source does not support one.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Status Architecture Fields
          </p>
          {[
            "Status",
            "Status Definition",
            "Status Source",
            "Status Version",
            "Status Effective Date",
            "Validation Status",
          ].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-48 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current Tracking Status: —
        </p>
      </div>

      {/* ── Launch Progress Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Progress Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT ASSESSED
          </span>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            NO APPROVED PROGRESS CALCULATION IS CURRENTLY CONFIGURED
          </p>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Progress must be derived only where the applicable requirements, tracking configuration
          and controlled progress methodology establish how progress should be measured.
        </p>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Tracking Record",
            "Progress Basis",
            "Progress Measure",
            "Progress Unit",
            "Progress Calculation Method",
            "Source",
            "Expected Position",
            "Actual Position",
            "Variance where applicable",
            "Validation Status",
            "Evidence",
            "Human Review Requirement",
          ].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-56 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Launch Tracking Update Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Update Register
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NONE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Retain controlled updates to a future active launch-tracking record without overwriting
          its prior position.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Update ID",
            "Tracking Record ID",
            "Update Date",
            "Previous Status",
            "Updated Status",
            "Previous Forecast where applicable",
            "Updated Forecast where applicable",
            "Previous Value where applicable",
            "Updated Value where applicable",
            "Change Reason",
            "Source",
            "Source Version",
            "Updated By where established",
            "Evidence",
            "Gap",
            "Conflict",
            "Exception",
            "Validation Status",
            "Human Review Requirement",
          ].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-64 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
            DO NOT SILENTLY OVERWRITE TRACKING HISTORY
          </p>
          <p className="text-xs" style={{ color: "#991b1b" }}>
            Each material update must preserve the previous controlled position and the evidence
            supporting the change.
          </p>
        </div>
      </div>

      {/* ── Launch Evidence Update Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Evidence Update Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Evidence ID",
            "Tracking Record ID",
            "Requirement / Milestone Reference",
            "Evidence Item",
            "Evidence Type",
            "Source",
            "Source Reference",
            "Source Version",
            "Source Date",
            "Evidence Owner where available",
            "Received Date where established",
            "Validation Status",
            "Evidence Confidence",
            "Permission / Access Status",
            "Supersession Status",
            "Superseded By",
            "Acceptance Relevance",
            "Human Review Requirement",
          ].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-64 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Launch Evidence Validation ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Evidence Validation
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Validation Gate
          </p>
          {[
            "Evidence Available",
            "Applicable Tracking Record Identified",
            "Source Identified",
            "Source Version Established",
            "Applicable Requirement / Milestone Match",
            "Evidence Requirement Match where applicable",
            "Permission / Access Established where applicable",
            "Supersession Status Established",
            "Material Evidence Conflict Identified",
            "Required Human Review Completed where applicable",
          ].map((c) => (
            <div key={c} className="flex items-start gap-2 py-0.5">
              <span className="text-xs" style={{ color: "#64748b" }}>
                +
              </span>
              <span className="text-xs" style={{ color: "#475569" }}>
                {c}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2" style={{ borderTop: "1px solid #374151" }}>
            <p className="text-xs font-bold" style={{ color: "#475569" }}>
              → READY FOR EVIDENCE VALIDATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            EVIDENCE VALIDATION NOT READY
          </p>
        </div>
      </div>
    </>
  );
}
