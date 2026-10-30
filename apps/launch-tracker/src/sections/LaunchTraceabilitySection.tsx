export default function LaunchTraceabilitySection() {
  return (
    <>
      {/* ── Requirement-to-Tracking Traceability ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Requirement-to-Tracking Traceability
        </h2>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          {[
            "Authorised Source",
            "Validated Source",
            "Source Statement",
            "Candidate Requirement",
            "Validated Launch Requirement",
            "Launch Requirement Register",
            "Requirement-to-Tracking Mapping",
            "Tracking Configuration",
            "Configuration Validation",
            "Configured Tracking Record",
            "Evidence",
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
          Configuration must preserve the source requirement, source version, applicability, mapping
          decision and resulting tracking record so that the relationship can be reconstructed and
          audited.
        </p>
      </div>

      {/* ── Human Review Control (Configuration) ── */}
      <div
        className="rounded-lg p-3"
        style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
      >
        <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
          AUTHORISED HUMAN REVIEW REQUIRED
        </p>
        <p className="text-xs" style={{ color: "#991b1b" }}>
          FERN may support translation of validated requirements into tracking configuration, but it
          must not independently create contractual obligations, supplier obligations, Amazon
          responsibilities, acceptance criteria or material launch decisions.
        </p>
      </div>

      {/* ── Requirement Extraction GAP & CONFLICT ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Requirement Extraction GAP & CONFLICT
        </h2>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          No extraction GAP or CONFLICT is currently recorded.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#92400e" }}>
            Future GAP Examples — Architecture Only
          </p>
          {[
            "Missing Source Section",
            "Missing Version",
            "Missing Applicability",
            "Missing Requirement Owner",
            "Missing Evidence Requirement",
            "Missing Acceptance Criterion",
            "Unclear Requirement Meaning",
          ].map((g) => (
            <p key={g} className="text-xs py-0.5" style={{ color: "#64748b" }}>
              • {g}
            </p>
          ))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#b91c1c" }}>
            Future CONFLICT Architecture
          </p>
          {[
            "Source A",
            "Source B",
            "Conflicting Statements",
            "Affected Requirement",
            "Potential Impact",
            "Required Decision",
            "Owner where available",
            "Resolution Status",
            "Human Review Requirement",
            "Evidence",
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

      {/* ── Source-to-Requirement Traceability ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Source-to-Requirement Traceability
        </h2>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          {[
            "Authorised Source",
            "Source Identity",
            "Source Version",
            "Source Validation",
            "Source Applicability",
            "Source Statement",
            "Candidate Requirement",
            "Requirement Validation",
            "Validated Launch Requirement",
            "Launch Tracking Configuration",
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
          Every future launch requirement must remain traceable to the applicable source, source
          version, source location, validation status and any material interpretation applied.
        </p>
      </div>

      {/* ── AI-Assisted Requirement Extraction ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            AI-Assisted Requirement Extraction
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          FERN may assist with identifying candidate requirements from authorised source material
          when that capability and source access are available. AI-derived content remains subject
          to source traceability, confidence assessment and human review.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            AI EXTRACTION NOT CURRENTLY ACTIVE
          </p>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future AI Output Must Distinguish
          </p>
          {["FACT", "DERIVED INTERPRETATION", "ASSUMPTION", "GAP", "CONFLICT"].map((s) => (
            <p key={s} className="text-xs py-0.5" style={{ color: "#64748b" }}>
              • {s}
            </p>
          ))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#64748b" }}>
            Future AI Output Fields
          </p>
          {["Source", "Source Reference", "Confidence", "Validation Status"].map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 py-1"
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <span className="text-xs w-40 shrink-0" style={{ color: "#64748b" }}>
                {f}
              </span>
              <span className="text-xs" style={{ color: "#64748b" }}>
                —
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Human Review (Source Intake) ── */}
      <div
        className="rounded-lg p-3"
        style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
      >
        <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
          AUTHORISED HUMAN REVIEW REQUIRED
        </p>
        <p className="text-xs mb-2" style={{ color: "#991b1b" }}>
          Material interpretations affecting contractual, procurement, financial, compliance,
          operational-risk or launch acceptance requirements remain subject to authorised human
          review.
        </p>
        <p className="text-xs" style={{ color: "#991b1b" }}>
          FERN must not self-approve: a source, a requirement, an interpretation, a launch
          criterion, a commercial obligation or a contractual obligation.
        </p>
      </div>
    </>
  );
}
