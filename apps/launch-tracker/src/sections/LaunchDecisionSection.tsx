export default function LaunchDecisionSection() {
  return (
    <>
      {/* ── Launch Decision Record ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Decision Record
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#6b7280", color: "#fff" }}
          >
            PENDING AUTHORISED HUMAN REVIEW
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
            "Decision Status",
            "Launch / Transition Context",
            "Decision Type",
            "Decision Outcome",
            "Decision Rationale",
            "Applicable Readiness Assessment",
            "Applicable Go-Live Review",
            "Conditions",
            "Exceptions",
            "Outstanding Requirements",
            "Outstanding Evidence",
            "Outstanding Dependencies",
            "Material Risks Accepted / Retained",
            "Decision Owner",
            "Decision Date",
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
              <span
                className="text-xs"
                style={{
                  color: f === "Decision Status" ? "#92400e" : "#64748b",
                }}
              >
                {f === "Decision Status" ? "PENDING AUTHORISED HUMAN REVIEW" : "—"}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs mb-2" style={{ color: "#64748b" }}>
          Decision Outcome: — &nbsp;|&nbsp; No launch decision has been recorded.
        </p>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
            FERN SUPPORTS THE DECISION — FERN DOES NOT APPROVE THE LAUNCH
          </p>
          <p className="text-xs" style={{ color: "#991b1b" }}>
            FERN may organise evidence, identify gaps and conflicts, support assurance review and
            record an authorised decision. Material launch, go-live, contractual, procurement,
            financial, compliance and operational-risk decisions remain with the applicable
            authorised decision-makers.
          </p>
        </div>
      </div>
    </>
  );
}
