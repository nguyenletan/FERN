export default function LaunchExecutionAssuranceSection() {
  return (
    <>
      {/* ── Launch Dependency Impact ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Dependency Impact
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Provide the future controlled mechanism for identifying whether a validated change to one
          tracking record affects another accepted dependency.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Dependency Reference",
            "Affected Tracking Record",
            "Triggering Record",
            "Change",
            "Impact",
            "Blocking Status where established",
            "Required Action",
            "Owner where available",
            "Required By where established",
            "Evidence",
            "Validation Status",
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
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Active Tracking GAP & CONFLICT ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Active Tracking GAP & CONFLICT
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
          <p className="text-xs font-semibold mb-2" style={{ color: "#92400e" }}>
            Future GAP Architecture
          </p>
          {[
            "Tracking Record",
            "Missing Information",
            "Impact",
            "Required Source",
            "Required Action",
            "Owner where available",
            "Status",
            "Evidence",
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
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#b91c1c" }}>
            Future CONFLICT Architecture
          </p>
          {[
            "Tracking Record",
            "Source A",
            "Source B",
            "Conflicting Position",
            "Impact",
            "Required Decision",
            "Owner where available",
            "Resolution Status",
            "Evidence",
            "Human Review Requirement",
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
        <p className="text-xs mt-2" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Launch Tracking Exception Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Exception Register
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NONE
          </span>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Exception ID",
            "Tracking Record ID",
            "Exception Type",
            "Issue",
            "Affected Requirement",
            "Affected Milestone where applicable",
            "Affected Dependency where applicable",
            "Potential Launch Impact",
            "Potential Commercial Impact",
            "Potential Operational Impact",
            "Required Action",
            "Owner where available",
            "Resolution Status",
            "Evidence",
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
      </div>

      {/* ── Launch Tracking Change Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Change Control
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
            "Change ID",
            "Affected Tracking Record",
            "Current Configuration Version",
            "Proposed Configuration Version",
            "Source Change",
            "Source Version",
            "Reason",
            "Affected Requirement",
            "Affected Workflow",
            "Affected Milestone",
            "Affected Dependency",
            "Affected Responsibility",
            "Affected Evidence Requirement",
            "Affected Acceptance Criterion",
            "Required Retest / Revalidation",
            "Supersedes",
            "Effective Date",
            "Change Status",
            "Human Review Requirement",
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

      {/* ── Tracking Record Completion Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Tracking Record Completion Readiness
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
            Future Readiness Gate
          </p>
          {[
            "Active Tracking Record Available",
            "Applicable Requirement Satisfied where established",
            "Required Evidence Available where established",
            "Evidence Validation Completed where required",
            "Applicable Acceptance Criterion Assessed",
            "Material Exceptions Resolved",
            "Material Gaps Addressed",
            "Material Conflicts Resolved",
            "Applicable Dependencies Addressed",
            "Required Human Review Completed",
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
              → READY FOR TRACKING RECORD COMPLETION
            </p>
          </div>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            TRACKING RECORD COMPLETION NOT READY
          </p>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold text-center mb-2" style={{ color: "#92400e" }}>
            TRACKING RECORD COMPLETION ≠ LAUNCH APPROVAL
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            Completion of an individual tracking record does not independently approve an IFM
            launch, go-live, supplier position, contractual commitment or business decision.
          </p>
        </div>
      </div>

      {/* ── Tracking History & Audit Trail ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Tracking History & Audit Trail
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
            Future Architecture
          </p>
          {[
            "Tracking Record ID",
            "Configuration Version",
            "Source Version",
            "Previous Position",
            "Updated Position",
            "Change Reason",
            "Update Date",
            "Updated By where established",
            "Evidence",
            "Validation Status",
            "Human Review Reference",
            "Supersession Reference",
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
        <p className="text-xs mb-1" style={{ color: "#475569" }}>
          Current records: NONE
        </p>
        <p className="text-xs" style={{ color: "#64748b" }}>
          FERN must preserve material tracking-history changes rather than replacing the previous
          controlled position.
        </p>
      </div>

      {/* ── Execution Traceability ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Execution Traceability
        </h2>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          {[
            "Authorised Source",
            "Validated Requirement",
            "Accepted Tracking Configuration",
            "Activated Tracking Record",
            "Controlled Update",
            "Evidence",
            "Evidence Validation",
            "Exception / GAP / CONFLICT where applicable",
            "Completion Assessment",
            "Authorised Human Review",
          ].map((node, i, arr) => (
            <div key={node}>
              <p
                className="text-xs font-medium"
                style={{ color: i === arr.length - 1 ? "#047857" : "#334155" }}
              >
                {node}
              </p>
              {i < arr.length - 1 && (
                <p className="text-xs" style={{ color: "#64748b" }}>
                  ↓
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#475569" }}>
          Every future active tracking record and material update must remain traceable to its
          validated requirement, accepted configuration, source version and supporting evidence.
        </p>
      </div>
    </>
  );
}
