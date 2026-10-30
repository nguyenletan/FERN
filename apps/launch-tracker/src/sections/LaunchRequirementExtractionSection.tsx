export default function LaunchRequirementExtractionSection() {
  return (
    <>
      {/* ── Launch Requirement Extraction Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Requirement Extraction Readiness
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          FERN may derive candidate launch requirements only from sufficiently validated and
          applicable source information.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Validated Source Available",
            "Source Version Established",
            "Source Applicability Established",
            "Relevant Source Content Available",
            "Requirement Extraction Scope Established",
            "Required Permissions Established",
            "Material Source Conflicts Identified",
            "Traceability Method Available",
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
              → READY FOR REQUIREMENT EXTRACTION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            REQUIREMENT EXTRACTION NOT READY
          </p>
        </div>
      </div>

      {/* ── Candidate Launch Requirement Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Candidate Launch Requirement Register
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NONE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Controlled staging area for requirements identified from future source material before
          validation. This is not the validated Launch Requirement Register.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Candidate Requirement ID",
            "Requirement Statement",
            "Requirement Category",
            "Requirement Type",
            "Source",
            "Source Version",
            "Source Reference",
            "Source Location / Section",
            "Applicable Context",
            "Mandatory / Conditional Status",
            "Applicability",
            "Requirement Owner where available",
            "Dependency where established",
            "Required Evidence where established",
            "Acceptance Criterion where established",
            "Material Assumption",
            "Gap Status",
            "Conflict Status",
            "Extraction Confidence",
            "Validation Status",
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
          No candidate launch requirements have currently been extracted.
        </p>
      </div>

      {/* ── Fact / Derivation Distinction ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Source / Derivation Distinction
        </h2>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <div className="space-y-1 text-center">
            {["SOURCE STATEMENT", "DERIVED REQUIREMENT", "VALIDATED REQUIREMENT"].map(
              (item, i, arr) => (
                <div key={item}>
                  <p className="text-xs font-bold" style={{ color: "#334155" }}>
                    {item}
                  </p>
                  {i < arr.length - 1 && (
                    <p className="text-xs font-bold" style={{ color: "#64748b" }}>
                      ≠
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
        <p className="text-xs" style={{ color: "#475569" }}>
          FERN must preserve the original source statement separately from any derived
          interpretation. A derived requirement must not be treated as a validated requirement until
          the applicable validation and review controls have been completed.
        </p>
      </div>

      {/* ── Requirement Classification ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Requirement Classification
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "MANDATORY",
            "CONDITIONAL",
            "RELEVANT",
            "OPTIONAL",
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
        <p className="text-xs italic" style={{ color: "#64748b" }}>
          These are possible classifications only. Classification rules require controlled evidence.
          Not every extracted item is automatically mandatory.
        </p>
      </div>

      {/* ── Candidate Requirement Validation ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Candidate Requirement Validation
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
            "Candidate Requirement Available",
            "Source Traceability Available",
            "Source Version Established",
            "Applicability Established",
            "Requirement Meaning Confirmed",
            "Mandatory / Conditional Basis Established where applicable",
            "Dependency Established where applicable",
            "Required Evidence Established where applicable",
            "Acceptance Criterion Established where applicable",
            "Material Assumptions Identified",
            "Material Gaps Identified",
            "Material Conflicts Identified",
            "Human Review Completed where required",
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
              → READY FOR REQUIREMENT VALIDATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            REQUIREMENT VALIDATION NOT READY
          </p>
        </div>
      </div>

      {/* ── Validated Requirement Promotion ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Validated Requirement Promotion
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Candidate requirements must not enter active launch tracking until their source,
          applicability and validation status are sufficiently established.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Promotion Flow
          </p>
          {[
            "Validated Source",
            "Candidate Requirement",
            "Source Traceability Check",
            "Applicability Review",
            "Requirement Validation",
            "Authorised Human Review where required",
            "Validated Launch Requirement",
            "Existing Launch Requirement Register",
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
        <p className="text-xs" style={{ color: "#64748b" }}>
          No candidate requirement currently progresses to the existing Launch Requirement Register.
        </p>
      </div>
    </>
  );
}
