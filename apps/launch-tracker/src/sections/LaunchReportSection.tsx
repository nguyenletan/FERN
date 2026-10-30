import React from "react";

export default function LaunchReportSection({
  launchReportOpen,
  setLaunchReportOpen,
}: {
  launchReportOpen: boolean;
  setLaunchReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* ── Launch Assurance Report ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Assurance Report
          </h2>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY FOR FINAL REPORT
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          No final launch assurance report is currently available.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <button
            onClick={() => setLaunchReportOpen((o) => !o)}
            className="text-xs px-3 py-1.5 rounded font-medium"
            style={{
              background: "#f1f5f9",
              color: "#475569",
              border: "1px solid #e2e8f0",
            }}
          >
            {launchReportOpen ? "Collapse" : "Preview Launch Assurance Report"}
          </button>
          <button
            disabled
            className="text-xs px-3 py-1.5 rounded font-medium"
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              cursor: "not-allowed",
              opacity: 0.5,
            }}
          >
            Export Report
          </button>
          <span className="text-xs" style={{ color: "#64748b" }}>
            Not yet connected
          </span>
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#64748b" }}>
            Report Readiness
          </p>
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2"
            style={{ background: "#b91c1c", color: "#fff" }}
          >
            NOT READY
          </span>
          {[
            "Applicable Launch / Transition Context",
            "Validated Source & Requirements",
            "Accepted Tracking Configuration",
            "Required Active Tracking Records",
            "Applicable Evidence",
            "Evidence Validation",
            "Applicable Readiness Assessment",
            "Launch Assurance Review",
            "Go-Live Review where required",
            "Material Exceptions Addressed",
            "Material Gaps Addressed",
            "Material Conflicts Resolved",
            "Required Human Review",
            "Launch Decision Record where required",
            "Evidence Traceability",
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
              → READY FOR FINAL REPORT
            </p>
          </div>
          <div
            className="mt-2 rounded p-2"
            style={{ background: "#fef2f2", border: "1px solid #ef4444" }}
          >
            <p className="text-xs font-bold" style={{ color: "#991b1b" }}>
              LAUNCH ASSURANCE REPORT NOT READY
            </p>
          </div>
        </div>
        {launchReportOpen && (
          <>
            <div
              className="rounded p-3 mb-3"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
                Report Metadata — Future Fields
              </p>
              {[
                "Report ID",
                "Report Title",
                "Launch / Transition Context",
                "Site / Context",
                "Report Version",
                "Report Date",
                "Prepared By",
                "Review Status",
                "Reviewer",
                "Review Date",
                "Decision Reference",
                "Evidence Status",
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
            <div
              className="rounded p-3 mb-3"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
                Future Report Structure
              </p>
              {[
                "Launch / Transition Context",
                "Source & Requirement Position",
                "Tracking Configuration",
                "Active Tracking Position",
                "Milestones where applicable",
                "Dependencies where applicable",
                "Evidence Position",
                "Exceptions",
                "Information Gaps",
                "Conflicts",
                "Launch Readiness Assessment",
                "Launch Assurance Review",
                "Go-Live Review where applicable",
                "Human Review",
                "Launch Decision Record",
                "Evidence & Traceability",
              ].map((s, i) => (
                <p key={s} className="text-xs py-0.5" style={{ color: "#64748b" }}>
                  {i + 1}. {s}
                </p>
              ))}
            </div>
            <div
              className="rounded p-3 mb-3"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#475569" }}>
                Assurance Traceability
              </p>
              {[
                "Authorised Source",
                "Validated Requirement",
                "Accepted Tracking Configuration",
                "Active Tracking Record",
                "Evidence",
                "Evidence Validation",
                "Launch Assurance Review",
                "Launch Readiness Assessment",
                "Go-Live Review where applicable",
                "Authorised Human Review",
                "Launch Decision Record",
                "Launch Assurance Report",
              ].map((node, i, arr) => (
                <div key={node}>
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: i === arr.length - 1 ? "#047857" : "#334155",
                    }}
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
              <p className="text-xs mt-2" style={{ color: "#64748b" }}>
                Every future launch assurance finding, review and decision record must remain
                traceable to the applicable requirements, tracking records, source versions and
                supporting evidence.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
