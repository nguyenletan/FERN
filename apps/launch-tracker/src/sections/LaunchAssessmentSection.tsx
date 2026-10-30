import { statusBadge } from "../configuration.tsx";

export default function LaunchAssessmentSection() {
  return (
    <>
      {/* ── Launch Readiness Assessment ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Readiness Assessment
          </h2>
          {statusBadge("NOT ASSESSED", "#6b7280")}
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          No approved launch-readiness scoring or weighting methodology is currently configured.
          Future readiness assessment must only be implemented when its controlled methodology and
          acceptance criteria are available.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Assessment Context",
            "Assessment Date where established",
            "Applicable Criteria",
            "Applicable Tracking Records",
            "Applicable Milestones",
            "Applicable Dependencies",
            "Evidence Position",
            "Outstanding Exceptions",
            "Outstanding Gaps",
            "Outstanding Conflicts",
            "Conditions / Constraints",
            "Readiness Finding",
            "Evidence Confidence",
            "Human Review Requirement",
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
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            NO LAUNCH READINESS FINDING IS CURRENTLY AVAILABLE
          </p>
        </div>
      </div>

      {/* ── Go-Live Review Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Go-Live Review Readiness
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          A go-live review may be prepared only where the applicable authorised criteria, evidence
          and launch-assurance information have been sufficiently established.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Launch Assurance Review Completed",
            "Applicable Readiness Criteria Assessed",
            "Required Evidence Validated",
            "Material Exceptions Addressed",
            "Material Gaps Addressed",
            "Material Conflicts Resolved",
            "Applicable Dependencies Addressed",
            "Required Conditions Established",
            "Authorised Human Review",
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
              → READY FOR GO-LIVE REVIEW
            </p>
          </div>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
        >
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            GO-LIVE REVIEW NOT READY
          </p>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold text-center" style={{ color: "#92400e" }}>
            GO-LIVE REVIEW ≠ GO-LIVE APPROVAL
          </p>
        </div>
      </div>

      {/* ── Go-Live Review Record ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Go-Live Review Record
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#64748b" }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Review ID",
            "Launch / Transition Context",
            "Site / Context",
            "Review Scope",
            "Applicable Criteria",
            "Readiness Assessment Reference",
            "Outstanding Requirements",
            "Outstanding Milestones",
            "Outstanding Dependencies",
            "Outstanding Evidence",
            "Outstanding Exceptions",
            "Outstanding Gaps",
            "Outstanding Conflicts",
            "Conditions / Constraints",
            "Review Finding",
            "Evidence Confidence",
            "Reviewer where established",
            "Review Date where established",
            "Supporting Evidence",
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
        <p className="text-xs mt-2" style={{ color: "#64748b" }}>
          Current Review Finding: NOT AVAILABLE
        </p>
      </div>

      {/* ── Information Required ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Information Required
        </h2>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs mb-2" style={{ color: "#475569" }}>
            FERN has not yet established the controlled source information required to configure
            this FM Mobilisation & Transition Tracker.
          </p>
          <p className="text-xs" style={{ color: "#64748b" }}>
            Where authorised information becomes available, FERN should retrieve, reuse and validate
            it before requesting manual input. Users should normally be asked only to confirm
            uncertain information, resolve conflicts or provide information that cannot be obtained
            from an authorised source.
          </p>
        </div>
      </div>
    </>
  );
}
