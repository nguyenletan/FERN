import React from "react";

export default function LifecycleSensitivitySection() {
  return (
    <>
      {/* ── Sensitivity Analysis ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Sensitivity Analysis
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              borderColor: "#fecaca",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Assess how material uncertainty in validated lifecycle inputs and assumptions could affect
          lifecycle analysis once the applicable calculation method is available.
        </p>

        {/* Sensitivity Status */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Sensitivity Status
          </p>
          <p className="text-sm font-bold mb-1" style={{ color: "#dc2626" }}>
            NOT READY
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Sensitivity analysis cannot be completed until the relevant baseline calculation,
            material variables and controlled calculation method have been sufficiently established.
          </p>
          <p className="text-xs mt-1 italic" style={{ color: "#9ca3af" }}>
            This is an analysis-readiness state. It is not a finding about the selected Site, asset
            or scenario.
          </p>
        </div>

        {/* Sensitivity Readiness Gate */}
        <div
          className="rounded-lg border px-4 py-4 mb-4"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Sensitivity Readiness
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
                "Applicable Asset / Scope",
                "Configured Scenario where applicable",
                "Analysis Horizon",
                "Validated Lifecycle Events",
                "Validated Source Costs",
                "Relevant Financial Assumptions",
                "Controlled Calculation Method",
                "Baseline Calculated Output",
                "Material Sensitivity Variables Identified",
                "Material Conflicts Resolved",
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
                Ready for Sensitivity Analysis
              </span>
            </div>
          </div>
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            SENSITIVITY ANALYSIS NOT READY
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Sensitivity analysis cannot proceed until the applicable readiness conditions have been
            sufficiently established.
          </p>
        </div>

        {/* Sensitivity Method Status */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Sensitivity Method Status
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fef3c7",
                color: "#92400e",
                borderColor: "#fde68a",
              }}
            >
              REQUIRES VALIDATION
            </span>
          </div>
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            No approved sensitivity method is currently connected to this prototype.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Method Name",
              "Method Version",
              "Source Document",
              "Source Version",
              "Approval Status",
              "Applicable Variables",
              "Variation Method",
              "Calculation Relationship",
              "Output Interpretation Rule",
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

        {/* Sensitivity Variable Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Sensitivity Variable Register
          </p>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Identify only those inputs or assumptions whose uncertainty is material to the lifecycle
            decision being assessed.
          </p>
          <div
            className="rounded-lg border px-3 py-3 text-center mb-3"
            style={{ borderColor: "#e5e7eb", background: "#fff" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#9ca3af" }}>
              No sensitivity variables have been established.
            </p>
          </div>
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future variable types the architecture may support
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[
              "Event Cost",
              "Event Timing",
              "Reference Service Life",
              "Renewal Timing",
              "Repair Cost",
              "Replacement Cost",
              "Maintenance Requirement",
              "Inflation Assumption",
              "Discount Assumption",
              "Risk Allowance",
              "Other controlled material assumption",
            ].map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded border"
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
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            These are potential variable types only. Materiality is determined only when supported
            by the applicable evidence, methodology and decision context.
          </p>
          <div className="mt-3">
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Future sensitivity variable record — field architecture
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                "Variable",
                "Variable Type",
                "Affected Asset / Scope",
                "Affected Scenario",
                "Affected Lifecycle Event",
                "Affected Analysis Horizon",
                "Baseline Value",
                "Unit",
                "Source",
                "Source Date",
                "Evidence Status",
                "Validation Status",
                "Reason for Sensitivity Test",
                "Materiality",
                "Lower Case",
                "Upper Case",
                "Variation Method",
                "Applicable Calculation Output",
                "Owner where available",
                "Human Review Requirement",
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
        </div>

        {/* Sensitivity Range Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Sensitivity Range Control
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fffbeb",
                color: "#d97706",
                borderColor: "#fde68a",
              }}
            >
              TO BE DETERMINED
            </span>
          </div>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Any sensitivity range must be supported by the applicable methodology, evidence,
            decision context or authorised human judgement.
          </p>
        </div>

        {/* Baseline / Lower / Upper Case */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Case Architecture
          </p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {["Baseline Case", "Lower Case", "Upper Case"].map((c) => (
              <div
                key={c}
                className="rounded border px-3 py-2 text-center"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: "#374151" }}>
                  {c}
                </p>
                <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                  Not populated
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Case interpretation depends on the variable, methodology and decision context. Lower
            Case does not automatically mean best case; Upper Case does not automatically mean worst
            case.
          </p>
        </div>

        {/* Capability headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            {
              title: "One-Way Sensitivity",
              purpose:
                "Assess the effect of changing one material variable while retaining the other applicable validated inputs and assumptions.",
            },
            {
              title: "Combined Sensitivity",
              purpose:
                "Assess defined combinations of material variables only where a controlled methodology supports their combined use.",
            },
            {
              title: "Cost Sensitivity",
              purpose:
                "Support future assessment of material uncertainty in validated lifecycle-event cost information.",
            },
          ].map(({ title, purpose }) => (
            <div
              key={title}
              className="rounded-lg border px-4 py-3"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold" style={{ color: "#374151" }}>
                  {title}
                </p>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "#f3f4f6", color: "#9ca3af" }}
                >
                  NOT AVAILABLE
                </span>
              </div>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                {purpose}
              </p>
              <p className="text-xs mt-1 italic" style={{ color: "#d1d5db" }}>
                No validated baseline calculation or sensitivity variable has been established.
              </p>
            </div>
          ))}
        </div>

        {/* Event Timing Sensitivity */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Event Timing Sensitivity
            </p>
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded"
              style={{ background: "#f3f4f6", color: "#9ca3af" }}
            >
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Support future assessment of the lifecycle effect of an earlier or later event where the
            event timing itself is materially uncertain and sufficiently supported for sensitivity
            testing.
          </p>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Timing Range:
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fffbeb",
                color: "#d97706",
                borderColor: "#fde68a",
              }}
            >
              TO BE DETERMINED
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No event-timing variation has been established for this analysis.
          </p>
        </div>

        {/* Financial Assumption Sensitivity */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Financial Assumption Sensitivity
            </p>
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded"
              style={{ background: "#f3f4f6", color: "#9ca3af" }}
            >
              NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            Future variable types may include where applicable: Inflation Assumption, Discount
            Assumption, Risk Allowance.
          </p>
          <div className="space-y-1.5 mb-2">
            {["Inflation Assumption", "Discount Assumption", "Risk Allowance"].map((f) => (
              <div
                key={f}
                className="flex items-center justify-between rounded border px-3 py-1.5"
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
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No financial-assumption sensitivity values have been established.
          </p>
        </div>

        {/* Sensitivity Outputs */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Sensitivity Outputs
          </p>
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            No sensitivity outputs are currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Variable Tested",
              "Baseline Input",
              "Sensitivity Input",
              "Baseline Calculated Output",
              "Sensitivity Calculated Output",
              "Absolute Change",
              "Percentage Change where methodologically appropriate",
              "Affected Horizon",
              "Affected Scenario",
              "Affected Lifecycle Event",
              "Evidence Confidence",
              "Materiality",
              "Interpretation",
              "Human Review Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#d1d5db" }}>
            No sensitivity visualisation is available until validated sensitivity outputs exist.
          </p>
        </div>

        {/* Sensitivity Decision Impact */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Sensitivity Decision Impact
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#fffbeb",
                color: "#d97706",
                borderColor: "#fde68a",
              }}
            >
              NOT YET ASSESSED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Future architecture will identify whether a validated sensitivity test changes material
            financial exposure, event timing significance, risk considerations, scenario comparison,
            or requires additional information or human review.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            No sensitivity decision impact has yet been established. A sensitivity result does not
            independently select a preferred treatment.
          </p>
        </div>

        {/* Traceability */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Sensitivity Traceability Requirement
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Source Evidence",
              "Baseline Input",
              "Sensitivity Variable",
              "Variation Basis",
              "Calculation Method",
              "Sensitivity Method",
              "Calculated Output",
              "Scenario Comparison",
              "Human Review",
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
        </div>

        {/* GAP / CONFLICT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
              GAP — Sensitivity
            </p>
            <p className="text-xs leading-relaxed mb-1" style={{ color: "#6b7280" }}>
              Future fields: Variable · Missing Information · Affected Asset/Scope · Affected
              Scenario · Affected Horizon · Affected Output · Why It Matters · Required Action.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No sensitivity GAP has currently been established.
            </p>
          </div>
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#fecaca", background: "#fef2f2" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
              CONFLICT — Sensitivity
            </p>
            <p className="text-xs leading-relaxed mb-1" style={{ color: "#6b7280" }}>
              Future fields: Variable · Source A · Source B · Conflicting Information · Affected
              Scenario · Affected Horizon · Potential Impact · Required Resolution.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No sensitivity CONFLICT has currently been established.
            </p>
          </div>
        </div>

        {/* Human Review */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            Authorised Human Review Required
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            Material sensitivity assumptions, interpretations and resulting lifecycle decision
            impacts require authorised human review. FERN provides decision support. It does not
            imply autonomous approval.
          </p>
        </div>
      </div>
    </>
  );
}
