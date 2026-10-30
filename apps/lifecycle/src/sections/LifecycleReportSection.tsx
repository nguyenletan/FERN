import React from "react";

export default function LifecycleReportSection({
  reportOpen,
  setReportOpen,
}: {
  reportOpen: boolean;
  setReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* ── Lifecycle Assessment Report ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
              Lifecycle Assessment Report
            </h2>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                borderColor: "#fecaca",
              }}
            >
              NOT READY FOR FINAL REPORT
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{
                background: "#eff6ff",
                color: "#1a56db",
                border: "1px solid #bfdbfe",
              }}
            >
              {reportOpen ? "Collapse" : "Preview"} Lifecycle Assessment Report
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                style={{ transform: reportOpen ? "rotate(180deg)" : undefined }}
              >
                <path
                  d="M2 4l4.5 4.5L11 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              disabled
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-40 cursor-not-allowed"
              style={{
                background: "#f3f4f6",
                color: "#9ca3af",
                border: "1px solid #e5e7eb",
              }}
            >
              Export Report
            </button>
          </div>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          The lifecycle assessment report can be completed only when the information, analysis,
          applicable calculations, review and traceability required for the assessment have been
          sufficiently established.
        </p>
        <p className="text-xs italic mb-4" style={{ color: "#9ca3af" }}>
          No final lifecycle assessment report is currently available. Absence of a report does not
          imply that no lifecycle issue exists.
        </p>

        {/* Export control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Export Report
            </p>
            <span
              className="text-xs px-2 py-0.5 rounded border"
              style={{
                background: "#f3f4f6",
                color: "#9ca3af",
                borderColor: "#e5e7eb",
              }}
            >
              Not yet connected
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Report export will become available only when an authorised report generation and
            storage process has been established.
          </p>
        </div>

        {/* Report Readiness */}
        <div
          className="rounded-lg border px-4 py-4 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Report Readiness
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <div
            className="rounded-lg border px-3 py-2 mb-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Readiness Gate — Future Logic
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                "Applicable Site / Context",
                "Applicable Asset / Scope",
                "Lifecycle Analysis Configuration",
                "Material Asset Baseline",
                "Required Lifecycle Assumptions",
                "Applicable Lifecycle Events",
                "Applicable Scenario Analysis where required",
                "Controlled Calculation Method where applicable",
                "Required Financial Analysis where applicable",
                "Required Sensitivity Analysis where applicable",
                "Scenario Comparison where required",
                "Lifecycle Recommendation where available",
                "Authorised Human Review where required",
                "Lifecycle Decision Record where required",
                "Material Information Gaps Addressed",
                "Material Conflicts Resolved",
                "Evidence Traceability Available",
              ].map((cond, i, arr) => (
                <React.Fragment key={cond}>
                  <span
                    className="px-2 py-0.5 rounded border"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#fff",
                      color: "#6b7280",
                    }}
                  >
                    {cond}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>+</span>}
                </React.Fragment>
              ))}
              <span style={{ color: "#d1d5db" }}>→</span>
              <span
                className="px-2 py-0.5 rounded border font-semibold"
                style={{
                  borderColor: "#bbf7d0",
                  background: "#f0fdf4",
                  color: "#15803d",
                }}
              >
                Ready for Final Report
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            LIFECYCLE REPORT NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is a report-readiness state. It is not a lifecycle finding, recommendation,
            approval or decision. Requirements depend on the assessment scope, asset context,
            applicable methodology, materiality and decision context.
          </p>
        </div>

        {/* Preview pane */}
        {reportOpen && (
          <>
            {/* Report Metadata */}
            <div
              className="rounded-lg border px-4 py-3 mb-4"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
                Report Metadata — future fields
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  "Report ID",
                  "Report Title",
                  "Source Lifecycle Analysis",
                  "Site / Context",
                  "Asset / Scope",
                  "Analysis Base Date",
                  "Analysis Horizon",
                  "Report Status",
                  "Report Version",
                  "Prepared By where available",
                  "Prepared Date",
                  "Review Status",
                  "Decision Status where applicable",
                  "Supporting Evidence",
                  "Source Version",
                  "Validation Status",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center justify-between rounded border px-2 py-1"
                    style={{ borderColor: "#e5e7eb", background: "#fff" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                      {f}
                    </p>
                    <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                      —
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Traceability */}
            <div
              className="rounded-lg border px-4 py-3 mb-4"
              style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
            >
              <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
                Report Traceability Architecture
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  "Source Evidence",
                  "Analysis Input",
                  "Asset Baseline",
                  "Lifecycle Event / Assumption",
                  "Lifecycle Analysis",
                  "Scenario where applicable",
                  "Calculation where applicable",
                  "Sensitivity where applicable",
                  "Comparison where applicable",
                  "FERN Lifecycle Recommendation where available",
                  "Authorised Human Review where required",
                  "Lifecycle Decision Record where required",
                  "Lifecycle Assessment Report",
                ].map((node, i, arr) => (
                  <React.Fragment key={node}>
                    <span
                      className="px-2 py-0.5 rounded border"
                      style={{
                        borderColor: "#bfdbfe",
                        background: "#fff",
                        color: "#1e3a8a",
                      }}
                    >
                      {node}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: "#93c5fd" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs mt-2 italic" style={{ color: "#93c5fd" }}>
                The report references existing controlled lifecycle information. It does not create
                a second independent version of the lifecycle analysis.
              </p>
            </div>

            {/* Fact / Output Distinctions */}
            <div
              className="rounded-lg border px-4 py-3 mb-4"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
                Report must preserve distinctions between
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  "Source Fact",
                  "Derived Output",
                  "Assumption",
                  "GAP",
                  "Conflict",
                  "Recommendation",
                  "Human Review",
                  "Decision Record",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#fff",
                      color: "#6b7280",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
                Assumption must not become Fact. GAP must not become Zero. Conflict must not be
                silently resolved. Recommendation must not become Decision. Derived Output must not
                become Validated Output.
              </p>
            </div>

            <div
              className="rounded-lg border px-4 py-4"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-bold mb-3" style={{ color: "#374151" }}>
                Lifecycle Assessment Report — Current Application State
              </p>
              <div className="space-y-2">
                {[
                  {
                    section: "Lifecycle Assessment Summary",
                    state: "NOT AVAILABLE",
                  },
                  {
                    section: "Site / Context and Assessment Scope",
                    state: "Prototype Context — Demonstration Only",
                  },
                  { section: "Asset Baseline", state: "NOT ASSESSED" },
                  { section: "Lifecycle Assumptions", state: "NOT ASSESSED" },
                  {
                    section: "Lifecycle Events and Event Timeline",
                    state: "No validated lifecycle events available",
                  },
                  {
                    section: "Deferred Maintenance Information",
                    state: "NOT ASSESSED",
                  },
                  {
                    section: "Asset / Facility Condition Information",
                    state: "NOT ASSESSED",
                  },
                  { section: "Lifecycle Analysis", state: "NOT READY" },
                  {
                    section: "Capital Exposure / Financial Analysis",
                    state: "PENDING CONTROLLED METHODOLOGY",
                  },
                  { section: "Sensitivity Analysis", state: "NOT READY" },
                  {
                    section: "Lifecycle Scenario Assessment",
                    state: "No scenario configured",
                  },
                  {
                    section: "Lifecycle Scenario Comparison",
                    state: "NOT READY",
                  },
                  {
                    section: "FERN Lifecycle Recommendation",
                    state: "NOT YET AVAILABLE",
                  },
                  { section: "Authorised Human Review", state: "PENDING" },
                  {
                    section: "Lifecycle Decision Record",
                    state: "PENDING AUTHORISED HUMAN REVIEW",
                  },
                  { section: "Material Assumptions", state: "—" },
                  { section: "Material Information Gaps", state: "—" },
                  { section: "Material Conflicts", state: "—" },
                  { section: "Conditions / Constraints", state: "—" },
                  { section: "Dependencies", state: "—" },
                  {
                    section: "Evidence & Traceability",
                    state: "No authorised evidence connected",
                  },
                ].map(({ section, state }) => (
                  <div
                    key={section}
                    className="flex items-center justify-between rounded border px-3 py-1.5"
                    style={{ borderColor: "#e5e7eb", background: "#fff" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#374151" }}>
                      {section}
                    </p>
                    <p className="text-xs italic" style={{ color: "#9ca3af" }}>
                      {state}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3 italic" style={{ color: "#9ca3af" }}>
                Preview shows current truthful application states only. Missing information is not
                converted to narrative. No report conclusions have been manufactured.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
