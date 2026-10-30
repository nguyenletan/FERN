export default function LaunchAssuranceSection() {
  return (
    <>
      {/* ── Launch Assurance Review Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Assurance Review Readiness
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A launch-level assurance review may be performed only when the applicable launch context,
          accepted tracking configuration, active tracking information, required evidence and
          relevant review criteria have been sufficiently established.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Applicable Launch / Transition Context Established",
            "Accepted Tracking Configuration Available",
            "Required Active Tracking Records Available",
            "Applicable Requirements Traceable",
            "Applicable Responsibilities Established",
            "Required Milestones Established where applicable",
            "Required Dependencies Established where applicable",
            "Required Evidence Available where applicable",
            "Evidence Validation Completed where required",
            "Applicable Acceptance Criteria Established",
            "Material Tracking Exceptions Assessed",
            "Material Information Gaps Addressed",
            "Material Conflicts Resolved",
            "Required Human Review Available",
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
              → READY FOR LAUNCH ASSURANCE REVIEW
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            LAUNCH ASSURANCE REVIEW NOT READY
          </p>
        </div>
      </div>

      {/* ── Launch Assurance Summary ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Assurance Summary
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Provide a future evidence-based summary of the established launch position without
          converting unavailable information into an assumed positive or negative result.
        </p>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Launch / Transition Context",
            "Site / Context",
            "Service / Scope",
            "Source Configuration",
            "Configuration Version",
            "Applicable Requirements",
            "Active Tracking Records",
            "Applicable Milestones",
            "Applicable Dependencies",
            "Evidence Position",
            "Material Exceptions",
            "Material Information Gaps",
            "Material Conflicts",
            "Outstanding Decisions",
            "Human Review Status",
            "Assurance Status",
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
      </div>

      {/* ── No Automatic Aggregated Score ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
            NO APPROVED AGGREGATED LAUNCH SCORING METHODOLOGY IS CONFIGURED
          </p>
          <p className="text-xs" style={{ color: "#991b1b" }}>
            Individual tracking records, milestones or evidence items must not be combined into an
            overall percentage, score, RAG state or readiness rating unless a controlled methodology
            explicitly establishes how that aggregation is performed.
          </p>
        </div>
      </div>

      {/* ── Launch Readiness Evidence Matrix ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Readiness Evidence Matrix
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
            "Assessment Area",
            "Applicable Requirement",
            "Tracking Record",
            "Milestone where applicable",
            "Dependency where applicable",
            "Required Evidence",
            "Evidence Available",
            "Evidence Validation Status",
            "Applicable Acceptance Criterion",
            "Criterion Assessment",
            "Exception Reference",
            "Gap Reference",
            "Conflict Reference",
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
          Current records: NONE &nbsp;|&nbsp; No assessment areas created without validated
          requirements.
        </p>
      </div>

      {/* ── Launch Readiness Criteria Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Readiness Criteria Control
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT ESTABLISHED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Launch-readiness criteria must originate from applicable validated requirements,
          authorised launch methodology or appropriately approved decision criteria.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Criterion ID",
            "Criterion",
            "Criterion Type",
            "Source",
            "Source Version",
            "Applicable Context",
            "Applicable Requirement",
            "Evidence Required",
            "Assessment Method",
            "Decision Threshold where established",
            "Human Review Requirement",
            "Validation Status",
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

      {/* ── Human Review (Execution) ── */}
      <div
        className="rounded-lg p-3"
        style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
      >
        <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
          AUTHORISED HUMAN REVIEW REQUIRED
        </p>
        <p className="text-xs mb-2" style={{ color: "#991b1b" }}>
          FERN supports tracking, assurance and decision support. Material launch acceptance,
          go-live, contractual, procurement, financial, compliance and operational-risk decisions
          remain subject to the applicable authorised human review and approval process.
        </p>
        <p className="text-xs" style={{ color: "#991b1b" }}>
          FERN must not automatically approve go-live, launch completion, supplier performance,
          procurement, contractual obligations or resolve material conflicts.
        </p>
      </div>
    </>
  );
}
