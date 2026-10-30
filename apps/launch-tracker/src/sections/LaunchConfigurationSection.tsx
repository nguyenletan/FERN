export default function LaunchConfigurationSection() {
  return (
    <>
      {/* ── Launch Tracking Configuration Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Configuration Readiness
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Validated launch requirements may be configured for tracking only when their
          applicability, source traceability, intended tracking use and applicable configuration
          rules have been sufficiently established.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Validated Launch Requirement Available",
            "Applicable Site / Context Established",
            "Requirement Applicability Confirmed",
            "Source and Source Version Traceable",
            "Requirement Classification Established",
            "Target Tracking Component Identified",
            "Configuration Rule Established",
            "Relevant Dependency Information Established where applicable",
            "Relevant Responsibility Information Established where applicable",
            "Required Evidence Established where applicable",
            "Acceptance Criterion Established where applicable",
            "Date Basis Established where applicable",
            "Material Gaps Addressed",
            "Material Conflicts Resolved",
            "Duplicate / Supersession Check Completed",
            "Authorised Human Review where required",
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
              → READY FOR LAUNCH TRACKING CONFIGURATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            LAUNCH TRACKING CONFIGURATION NOT READY
          </p>
        </div>
      </div>

      {/* ── Requirement-to-Tracking Mapping ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Requirement-to-Tracking Mapping
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Define how each validated launch requirement may be represented within the appropriate
          tracking component without changing the meaning or ownership of the source requirement.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Register Fields
          </p>
          {[
            "Mapping ID",
            "Validated Requirement ID",
            "Requirement Statement",
            "Requirement Classification",
            "Source",
            "Source Version",
            "Source Reference",
            "Source Location",
            "Applicable Site / Context",
            "Applicable Service / Scope",
            "Requirement Owner where available",
            "Target Tracking Component",
            "Target Record Type",
            "Configuration Rule",
            "Transformation / Derivation where applicable",
            "Dependency Reference where applicable",
            "Responsibility Reference where applicable",
            "Evidence Requirement where applicable",
            "Acceptance Criterion where applicable",
            "Date Basis where applicable",
            "Gap Status",
            "Conflict Status",
            "Validation Status",
            "Human Review Requirement",
            "Test Reference",
            "Configuration Acceptance Criterion",
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
          Current records: NONE &nbsp;|&nbsp; No validated requirement-to-tracking mappings are
          currently available.
        </p>
      </div>

      {/* ── Target Tracking Component Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Target Tracking Component Control
        </h2>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Future possible target components may include only existing Launch Tracker structures:
        </p>
        <div className="space-y-1 mb-3">
          {[
            "Launch Definition",
            "Launch Requirement Register",
            "Launch Workflow Definition",
            "Launch Milestone Register",
            "Launch Dependency Register",
            "Evidence & Traceability",
            "Acceptance / readiness control where supported by validated requirements",
          ].map((c) => (
            <div
              key={c}
              className="rounded px-3 py-1.5"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <span className="text-xs" style={{ color: "#64748b" }}>
                {c}
              </span>
            </div>
          ))}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-bold text-center mb-2" style={{ color: "#92400e" }}>
            REQUIREMENT ≠ TRACKING RECORD
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            A validated requirement does not automatically determine how it should be represented
            within launch tracking. The applicable tracking component and configuration rule must be
            established and validated.
          </p>
        </div>
      </div>

      {/* ── Launch Tracking Configuration Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Configuration Register
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NONE
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
            "Configuration ID",
            "Validated Requirement ID",
            "Mapping ID",
            "Tracking Component",
            "Tracking Record Type",
            "Site / Context",
            "Service / Scope",
            "Configured Requirement",
            "Configuration Status",
            "Source",
            "Source Version",
            "Configuration Rule Reference",
            "Applicable Dependency",
            "Applicable Responsibility",
            "Applicable Evidence Requirement",
            "Applicable Acceptance Criterion",
            "Applicable Date / Period where established",
            "Gap Status",
            "Conflict Status",
            "Exception Status",
            "Validation Status",
            "Human Review Requirement",
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

      {/* ── Requirement-to-Workflow Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Requirement-to-Workflow Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A workflow stage may be configured only where sufficiently validated requirements
          establish that a stage, sequence, entry condition, exit condition or related workflow
          structure is required.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Requirement ID",
            "Workflow Reference",
            "Stage Reference",
            "Stage Purpose",
            "Entry Criterion where established",
            "Exit Criterion where established",
            "Required Input where established",
            "Required Output where established",
            "Dependency",
            "Evidence Requirement",
            "Review / Approval Requirement where established",
            "Source",
            "Validation Status",
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

      {/* ── Requirement-to-Milestone Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Requirement-to-Milestone Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A requirement must not become a milestone merely because it is important. Milestone status
          must be supported by the applicable validated requirement or controlled launch
          methodology.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Requirement ID",
            "Milestone Reference",
            "Milestone Definition",
            "Milestone Basis",
            "Applicable Stage where established",
            "Owner where available",
            "Dependency",
            "Planned Date where established",
            "Required Evidence",
            "Acceptance Criterion",
            "Source",
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
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Requirement-to-Dependency Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Requirement-to-Dependency Control
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
            "Requirement ID",
            "Dependency Reference",
            "Dependency",
            "Dependency Type",
            "Related Requirement",
            "Related Workflow / Milestone where applicable",
            "Source",
            "Required By where established",
            "Owner where available",
            "Blocking Status where established",
            "Impact",
            "Required Action where established",
            "Validation Status",
            "Supporting Evidence",
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
    </>
  );
}
