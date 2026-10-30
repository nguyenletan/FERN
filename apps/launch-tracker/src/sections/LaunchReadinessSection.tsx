import { futureField } from "../configuration.tsx";
import { gateCondition } from "../configuration.tsx";
import { statusBadge } from "../configuration.tsx";

export default function LaunchReadinessSection() {
  return (
    <>
      {/* ── Evidence & Traceability ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Evidence & Traceability
          </h2>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Evidence Record Fields
          </p>
          {[
            "Evidence ID",
            "Evidence Item",
            "Evidence Type",
            "Source",
            "Source Reference",
            "Source Version",
            "Source Date",
            "Owner where available",
            "Requirement Supported",
            "Milestone Supported where applicable",
            "Validation Status",
            "Evidence Confidence",
            "Permission / Access Status where applicable",
            "Supersession Status",
            "Supporting Reference",
          ].map((f) => futureField(f))}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#64748b" }}>
            Current Records: NONE
          </p>
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#475569" }}>
            Conceptual Traceability Chain
          </p>
          {[
            "Authorised Source Information",
            "Validated Launch Requirement",
            "Configured Tracking Record",
            "Evidence",
            "Validation",
            "Human Review",
            "Accepted Outcome where authorised",
          ].map((node, i, arr) => (
            <div key={node}>
              <p
                className="text-xs font-medium"
                style={{ color: i === arr.length - 1 ? "#64748b" : "#334155" }}
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
          <p className="text-xs mt-2 italic" style={{ color: "#64748b" }}>
            No accepted outcome is currently available.
          </p>
        </div>
      </div>

      {/* ── Gap & Conflict Control ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>
          Gap & Conflict Control
        </h2>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#92400e" }}>
            Launch Information Gaps
          </p>
          <p className="text-xs mb-2" style={{ color: "#475569" }}>
            No launch information GAP has currently been formally recorded.
          </p>
          <p className="text-xs font-semibold mb-1" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Gap ID",
            "Affected Requirement / Area",
            "Missing Information",
            "Impact",
            "Source Needed",
            "Owner where available",
            "Required Decision",
            "Status",
            "Supporting Evidence",
          ].map((f) => futureField(f))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#b91c1c" }}>
            Launch Information Conflicts
          </p>
          <p className="text-xs mb-2" style={{ color: "#475569" }}>
            No launch information CONFLICT has currently been formally recorded.
          </p>
          <p className="text-xs font-semibold mb-1" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Conflict ID",
            "Affected Requirement / Area",
            "Source A",
            "Source B",
            "Conflict",
            "Impact",
            "Owner where available",
            "Required Decision",
            "Resolution Status",
            "Supporting Evidence",
          ].map((f) => futureField(f))}
        </div>
      </div>

      {/* ── Launch Tracking Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Tracking Readiness
          </h2>
          {statusBadge("NOT READY", "#ef4444")}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Readiness Gate
          </p>
          {[
            "Applicable Launch / Transition Context Established",
            "Controlled Source Information Available",
            "Applicable Requirements Established",
            "Requirement Applicability Established",
            "Applicable Workflow Established",
            "Required Responsibilities Established",
            "Required Milestones Established",
            "Required Dependencies Established",
            "Required Evidence Defined",
            "Applicable Acceptance Criteria Established",
            "Material Gaps Identified",
            "Material Conflicts Identified",
            "Required Access / Permissions Established where applicable",
          ].map((c) => gateCondition(c))}
          <div className="mt-2 pt-2" style={{ borderTop: "1px solid #374151" }}>
            <p className="text-xs font-bold" style={{ color: "#475569" }}>
              → READY FOR LAUNCH TRACKING CONFIGURATION
            </p>
          </div>
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
            LAUNCH TRACKING NOT READY
          </p>
        </div>
      </div>
    </>
  );
}
