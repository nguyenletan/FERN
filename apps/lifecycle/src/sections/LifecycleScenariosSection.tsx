import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";

export default function LifecycleScenariosSection() {
  return (
    <>
      {/* ── Baseline Lifecycle Position ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Baseline Lifecycle Position
          </h2>
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
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Establish the evidence-supported current lifecycle position against which configured
          alternatives may eventually be compared.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {[
            { label: "Status", value: "REQUIRES VALIDATION", highlight: true },
            { label: "Asset / Scope", value: "—" },
            { label: "Current Condition", value: "—" },
            { label: "Current Maintenance Position", value: "—" },
            { label: "Known Failure Position", value: "—" },
            { label: "Current Lifecycle Strategy", value: "—" },
            { label: "Reference Service Life", value: "—" },
            {
              label: "Remaining-Life Assessment Status",
              value: "NOT ASSESSED",
            },
            { label: "Known Deferred Maintenance", value: "—" },
            { label: "Known Renewal Requirement", value: "—" },
            { label: "Current Cost Information", value: "—" },
            { label: "Operational Impact", value: "—" },
            { label: "Risk / Compliance Consideration", value: "—" },
            { label: "Evidence Confidence", value: "NOT YET ASSESSED" },
            { label: "Supporting Evidence", value: "—" },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-2 rounded border px-3 py-2"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p
                className="text-xs italic shrink-0"
                style={{ color: highlight ? "#92400e" : "#d1d5db" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          Absence of information does not imply Maintain, Run to Failure, Repair, Renew, Replace,
          Defer or Monitor. No strategy is inferred from missing data.
        </p>
      </div>

      {/* ── Lifecycle Scenario Assessment ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Scenario Assessment
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          FERN should assess only lifecycle treatments that are credible for the selected asset or
          scope and sufficiently supported by available evidence, assumptions and applicable
          constraints.
        </p>

        {/* Empty state */}
        <div
          className="rounded-lg border px-4 py-5 text-center mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
            No lifecycle scenario is currently configured.
          </p>
          <p className="text-xs italic" style={{ color: "#d1d5db" }}>
            Scenarios are not generated automatically. No treatment has been recommended.
          </p>
        </div>

        {/* Configure control */}
        <div
          className="rounded-lg border px-4 py-3 flex items-center justify-between mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div>
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Configure Lifecycle Scenario
            </p>
            <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
              Asset / Scope required before scenario configuration.
            </p>
          </div>
          <button
            disabled
            className="text-xs font-semibold px-3 py-1.5 rounded-lg opacity-40 cursor-not-allowed"
            style={{
              background: "#f5f3ff",
              color: "#6d28d9",
              border: "1px solid #ddd6fe",
            }}
          >
            Configure Lifecycle Scenario
          </button>
        </div>

        {/* Future scenario structure */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Scenario Structure — fields each configured scenario will support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Scenario Name",
              "Asset / Scope",
              "Scenario Status",
              "Treatment",
              "Treatment Applicability",
              "Timing",
              "Included Work",
              "Excluded Work",
              "Maintenance Implication",
              "Lifecycle Implication",
              "Cost Information",
              "Renewal / Replacement Event",
              "Operational Impact",
              "Asset Condition Impact",
              "Business Impact",
              "Risk Implication",
              "Compliance Implication",
              "Dependencies",
              "Material Assumptions",
              "Information Gaps",
              "Conflicts",
              "Evidence Confidence",
              "Supporting Evidence",
              "Human Review Requirement",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Treatment Applicability */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Treatment Applicability
          </p>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            No controlled applicability assessment has been completed. Each treatment type may
            eventually have one current applicability state.
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[
              "Eligible for Assessment",
              "Requires Validation",
              "Insufficient Information",
              "Not Applicable",
              "Excluded — With Reason",
            ].map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {s}
              </span>
            ))}
            <span className="text-xs italic self-center" style={{ color: "#d1d5db" }}>
              possible future states — one applies per treatment when assessed
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Maintain", "Repair", "Renew", "Replace", "Defer", "Monitor"].map((t) => (
              <div
                key={t}
                className="rounded border px-3 py-2"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-bold mb-0.5" style={{ color: "#374151" }}>
                  {t}
                </p>
                <p className="text-xs font-semibold" style={{ color: "#d97706" }}>
                  Eligibility: TO BE DETERMINED
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment definitions */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Treatment Definitions — contextual reference only, no inference of applicability
          </p>
          <div className="space-y-2">
            {[
              {
                name: "MAINTAIN",
                def: "Continue the established maintenance treatment where evidence supports that approach. Does not mean run-to-failure.",
              },
              {
                name: "REPAIR",
                def: "Restore or correct the existing asset or component without necessarily resetting its complete lifecycle position.",
              },
              {
                name: "RENEW",
                def: "Replace or materially renew an asset, component or defined element within the controlled lifecycle scope.",
              },
              {
                name: "REPLACE",
                def: "Substitute the existing asset or system with a replacement solution.",
              },
              {
                name: "DEFER",
                def: "Delay an identified intervention for a defined period while assessing the resulting cost, condition, operational, risk and compliance consequences.",
              },
              {
                name: "MONITOR",
                def: "Continue structured observation or assessment against defined evidence, condition or performance triggers before selecting a further intervention.",
              },
            ].map(({ name, def }) => (
              <div
                key={name}
                className="flex items-start gap-3 rounded border px-3 py-2"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-bold shrink-0 w-16" style={{ color: "#374151" }}>
                  {name}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  {def}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Repair, Renew and Replace are materially distinct treatments. Do not merge or use
            interchangeably.
          </p>
        </div>

        {/* Defer Treatment Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#92400e" }}>
            Defer Treatment Control
          </p>
          <p className="text-xs mb-2" style={{ color: "#78350f" }}>
            Defer does not mean "do nothing". A deferral assessment must consider the consequences
            of delaying the intervention.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Deferral Period",
              "Reason for Deferral",
              "Asset Condition Consequence",
              "Maintenance Consequence",
              "Operational Consequence",
              "Business Consequence",
              "Compliance Consequence",
              "Risk Consequence",
              "Cost Consequence",
              "Future Renewal Impact",
              "Required Monitoring",
              "Evidence",
              "Assumptions",
              "Human Review Requirement",
            ].map((f) => (
              <span
                key={f}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#fde68a",
                  background: "#fff",
                  color: "#92400e",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Current values: — Do not populate without authorised evidence.
          </p>
        </div>

        {/* Monitor Treatment Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#374151" }}>
            Monitor Treatment Control
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
            {[
              "Monitoring Requirement",
              "Monitoring Method",
              "Condition / Performance Indicator",
              "Evidence Required",
              "Review Trigger",
              "Next Assessment Point",
              "Escalation Trigger",
              "Responsible Owner",
            ].map((f) => (
              <span
                key={f}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Current state: No monitoring parameters configured. Do not invent thresholds, dates or
            frequencies.
          </p>
        </div>

        {/* Preserve Scenario */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
            PRESERVE SCENARIO — DO NOT MANUFACTURE RESULT
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            FERN must not create an investment-grade lifecycle result merely to complete the
            analysis. Where material inputs, evidence or assumptions cannot be established, FERN
            must identify the gap, reduce confidence or block the affected analysis.
          </p>
        </div>
      </div>
    </>
  );
}
