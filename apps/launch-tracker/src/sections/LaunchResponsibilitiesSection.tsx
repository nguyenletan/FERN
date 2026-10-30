export default function LaunchResponsibilitiesSection() {
  return (
    <>
      {/* ── Launch Responsibility Configuration ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Responsibility Configuration
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Responsibilities may be represented only when established by applicable validated source
          information. FERN must not infer that a responsibility belongs to Amazon, a supplier or
          another party.
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
            "Responsibility",
            "Responsibility Type",
            "Responsible Party where established",
            "Accountable Party where established",
            "Supporting / Consulted Party where established",
            "Applicable Stage / Milestone",
            "Source",
            "Source Reference",
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
          Current values: — &nbsp;|&nbsp; No RACI or obligations assigned.
        </p>
      </div>

      {/* ── Evidence & Acceptance Configuration ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Evidence & Acceptance Configuration
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
            "Required Evidence",
            "Evidence Type",
            "Evidence Source where established",
            "Evidence Owner where available",
            "Acceptance Criterion",
            "Acceptance Basis",
            "Applicable Stage / Milestone",
            "Required Review",
            "Validation Status",
            "Supporting Source",
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
        <p className="text-xs mb-1" style={{ color: "#475569" }}>
          Missing evidence requirements or acceptance criteria must remain visible as information
          gaps. FERN must not manufacture them simply to make a requirement trackable.
        </p>
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current records: NONE
        </p>
      </div>

      {/* ── Launch Date & Schedule Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Date & Schedule Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT ESTABLISHED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Launch dates and periods must originate from authorised source information, an accepted
          launch configuration or appropriately confirmed user information.
        </p>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Planned Start Date",
            "Target Date",
            "Forecast Date",
            "Actual Date",
            "Target Go-Live Date",
            "Required-By Date",
            "Applicable Period",
            "Date Source",
            "Date Status",
            "Validation Status",
            "Material Assumption",
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

      {/* ── Tracking Configuration Duplicate & Supersession Check ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Tracking Configuration Duplicate & Supersession Check
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
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Checks
          </p>
          {[
            "Validated Requirement ID",
            "Existing Tracking Record",
            "Duplicate Status",
            "Existing Source Version",
            "Incoming Source Version",
            "Supersession Status",
            "Superseded By",
            "Material Change",
            "Reconfiguration Required",
            "Supporting Evidence",
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
          No duplicate or supersession assessment has been completed.
        </p>
      </div>

      {/* ── Launch Tracking Configuration Exceptions ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Configuration Exceptions
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
            "Exception ID",
            "Requirement ID",
            "Mapping ID",
            "Affected Tracking Component",
            "Exception Type",
            "Description",
            "Gap / Conflict Reference",
            "Potential Impact",
            "Required Action",
            "Owner where available",
            "Resolution Status",
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
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Possible Future Exception Types — Architecture Only
          </p>
          {[
            "Target Tracking Component Not Established",
            "Configuration Rule Missing",
            "Duplicate Mapping",
            "Superseded Requirement",
            "Missing Responsibility",
            "Missing Evidence Requirement",
            "Missing Acceptance Criterion",
            "Missing Date Basis",
            "Conflicting Configuration",
          ].map((t) => (
            <p key={t} className="text-xs py-0.5" style={{ color: "#64748b" }}>
              • {t}
            </p>
          ))}
        </div>
      </div>

      {/* ── Launch Tracking Configuration Validation ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Configuration Validation
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
            "Requirement Mapping Available",
            "Validated Requirement Traceability Available",
            "Applicable Context Match",
            "Target Tracking Component Established",
            "Configuration Rule Established",
            "No Unresolved Duplicate / Supersession Issue",
            "Required Responsibility Established where applicable",
            "Required Evidence Established where applicable",
            "Acceptance Criterion Established where applicable",
            "Date Basis Established where applicable",
            "Material Gaps Identified",
            "Material Conflicts Identified",
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
              → READY FOR CONFIGURATION VALIDATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            CONFIGURATION VALIDATION NOT READY
          </p>
        </div>
      </div>

      {/* ── Launch Tracking Configuration Acceptance ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Configuration Acceptance
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#6b7280", color: "#fff" }}
          >
            PENDING VALIDATION
          </span>
        </div>
        <div className="space-y-0 mb-3">
          {[
            ["Acceptance Status", "PENDING VALIDATION"],
            ["Accepted Configuration", "—"],
            ["Reviewer", "—"],
            ["Review Date", "—"],
            ["Conditions", "—"],
            ["Exceptions", "—"],
            ["Supporting Evidence", "—"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-48 shrink-0" style={{ color: "#475569" }}>
                {label}
              </span>
              <span
                className="text-xs"
                style={{
                  color: value === "PENDING VALIDATION" ? "#92400e" : "#64748b",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#64748b" }}>
          No launch tracking configuration has been accepted.
        </p>
      </div>
    </>
  );
}
