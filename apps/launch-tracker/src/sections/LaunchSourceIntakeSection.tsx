export default function LaunchSourceIntakeSection() {
  return (
    <>
      {/* ── Source Intake Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Intake Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#475569" }}
          >
            NOT CONNECTED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Controlled launch-source information must be identified, validated and retained before
          FERN can derive configuration requirements from it.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            NO CONTROLLED LAUNCH SOURCE CURRENTLY CONNECTED
          </p>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <button
            disabled
            className="text-xs font-semibold px-3 py-1.5 rounded mb-1"
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              cursor: "not-allowed",
              opacity: 0.5,
            }}
          >
            Add / Connect Launch Source
          </button>
          <p className="text-xs" style={{ color: "#64748b" }}>
            Not yet connected
          </p>
        </div>
      </div>

      {/* ── Launch Source Identity Record ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Source Identity Record
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
            "Source ID",
            "Source Title",
            "Source Type",
            "Document / Record Reference",
            "Source Location",
            "Source Organisation where established",
            "Document Owner where available",
            "Version",
            "Revision",
            "Issue Date",
            "Effective Date where applicable",
            "Approval Status",
            "Approval Reference where available",
            "Applicable Region",
            "Applicable Site / Facility Type",
            "Applicable Service Model",
            "Applicable Launch / Transition Context",
            "Applicable Service Scope",
            "Confidentiality / Data Classification where available",
            "Access / Permission Status",
            "Supersession Status",
            "Superseded By",
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
          Current values: — &nbsp;|&nbsp; Current records: NONE
        </p>
      </div>

      {/* ── Launch Source Status Model ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Source Status Model
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            Future States Only
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "IDENTIFIED",
            "REQUIRES VALIDATION",
            "VALIDATED FOR REFERENCE",
            "VALIDATED FOR REQUIREMENT EXTRACTION",
            "REJECTED — SOURCE ISSUE",
            "SUPERSEDED",
            "ARCHIVED",
            "NOT APPLICABLE",
          ].map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#64748b",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-xs mb-1" style={{ color: "#64748b" }}>
          Current Source Status: —
        </p>
        <p className="text-xs italic" style={{ color: "#64748b" }}>
          These are possible future controlled states only. No source exists to assign one to.
        </p>
      </div>

      {/* ── Launch Source Validation ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Source Validation
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
            "Source Available",
            "Source Identity Established",
            "Version Established",
            "Document / Record Reference Established",
            "Applicable Context Established",
            "Approval Status Established where required",
            "Owner Established where available",
            "Access / Permission Established where applicable",
            "Supersession Status Established",
            "Source Completeness Sufficient for Intended Use",
            "Material Source Conflicts Identified",
            "Required Evidence Retained",
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
              → READY FOR SOURCE VALIDATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            SOURCE VALIDATION NOT READY
          </p>
        </div>
      </div>

      {/* ── Source Validation Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Validation Register
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
            "Validation ID",
            "Source ID",
            "Validation Check",
            "Expected Condition",
            "Observed Condition",
            "Validation Status",
            "Gap",
            "Conflict",
            "Exception",
            "Required Action",
            "Owner where available",
            "Supporting Evidence",
            "Reviewer where available",
            "Review Date where available",
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

      {/* ── Source Applicability ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Applicability
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT ASSESSED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A valid document is not automatically applicable to every Site, service scope or launch
          context.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Applicability Dimensions
          </p>
          {[
            "Region",
            "Country",
            "Site / Facility Type",
            "Service Model",
            "Service Scope",
            "Launch / Transition Type",
            "Commercial Context where applicable",
            "Operational Context where applicable",
            "Requirement Category",
            "Effective Period",
          ].map((d) => (
            <div
              key={d}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-64 shrink-0" style={{ color: "#64748b" }}>
                {d}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "APPLICABLE",
            "CONDITIONALLY APPLICABLE",
            "NOT APPLICABLE",
            "UNKNOWN",
            "REQUIRES REVIEW",
          ].map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#64748b",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Source Version & Supersession ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Version & Supersession
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
            Future Fields
          </p>
          {[
            "Source",
            "Current Version",
            "Previous Version",
            "Version Date",
            "Change Reference",
            "Supersedes",
            "Superseded By",
            "Current / Superseded Status",
            "Material Change Identified",
            "Affected Requirement",
            "Revalidation Required",
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
          No source-version or supersession assessment is currently available.
        </p>
      </div>
    </>
  );
}
