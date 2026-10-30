import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";

export default function LifecycleEventsSection() {
  return (
    <>
      {/* ── Renewal Event Register ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Renewal Event Register
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Each future lifecycle event must be established from authorised asset information and a
          validated methodology before it influences scenario analysis or cost calculation. No fake
          events are created.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 1100 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Event ID",
                  "Asset / System",
                  "Event Type",
                  "Expected Period",
                  "Event Date",
                  "Trigger / Reason",
                  "Cost",
                  "Currency",
                  "Cost Basis",
                  "Dependency",
                  "Operational Impact",
                  "Business Impact",
                  "Risk / Compliance",
                  "Source",
                  "Evidence Confidence",
                  "Validation Status",
                  "Human Review",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 border text-xs font-semibold"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "#9ca3af",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array(17)
                  .fill(null)
                  .map((_, i) => (
                    <td
                      key={i}
                      className="px-3 py-2 border italic"
                      style={{ borderColor: "#e5e7eb", color: "#d1d5db" }}
                    >
                      —
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="rounded-lg border px-4 py-4 text-center mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#9ca3af" }}>
            No authorised renewal events have been established.
          </p>
          <p className="text-xs mt-1 italic" style={{ color: "#d1d5db" }}>
            Do not create events without authorised asset information and validated methodology.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
              Supported Event Types
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Planned Maintenance",
                "Repair",
                "Renewal",
                "Replacement",
                "Condition Review",
                "Monitor / Reassessment",
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
            <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
              Not all types apply to every asset. Do not create mandatory categories without
              evidence.
            </p>
          </div>
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
              Event Status Values
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "PROPOSED",
                "DERIVED — REQUIRES VALIDATION",
                "USER CONFIRMED",
                "VALIDATED",
                "EXCLUDED",
                "SUPERSEDED",
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
            </div>
            <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
              No event may be marked VALIDATED without evidence.
            </p>
          </div>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#1e3a8a" }}>
            DERIVED Event Control
          </p>
          <p className="text-xs mb-2" style={{ color: "#3730a3" }}>
            Where FERN eventually derives a possible future renewal period from validated asset
            information and an authorised methodology, it must label it{" "}
            <strong>DERIVED — REQUIRES VALIDATION</strong> and show: Derivation Basis · Source
            Information · Material Assumptions · Confidence. A derived date is not a confirmed
            renewal date.
          </p>
        </div>
      </div>

      {/* ── Lifecycle Event Timeline ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Event Timeline
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          Map sufficiently established lifecycle events across the selected analysis horizon without
          inventing renewal dates or interventions.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
            Timeline Horizon:
          </span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded border"
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderColor: "#fde68a",
            }}
          >
            Information Required
          </span>
          <span className="text-xs italic" style={{ color: "#d1d5db" }}>
            — select from: 5 / 10 / 15 / 20 / 25 Years in Lifecycle Analysis Configuration
          </span>
        </div>

        {/* Timeline bands */}
        <div className="overflow-x-auto mb-3">
          <div className="flex gap-2" style={{ minWidth: 580 }}>
            {["0–5 Years", "6–10 Years", "11–15 Years", "16–20 Years", "21–25 Years"].map(
              (band) => (
                <div
                  key={band}
                  className="flex-1 rounded-lg border px-3 py-3 text-center"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fafafa",
                    minWidth: 100,
                  }}
                >
                  <p className="text-xs font-bold mb-2" style={{ color: "#9ca3af" }}>
                    {band}
                  </p>
                  <div
                    className="rounded border px-2 py-3"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#f3f4f6",
                      minHeight: 52,
                    }}
                  >
                    <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                      No events
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div
          className="rounded-lg border px-4 py-3 text-center mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
            No validated lifecycle events are currently available for timeline mapping.
          </p>
          <p className="text-xs italic" style={{ color: "#d1d5db" }}>
            Event markers originate only from controlled Renewal Event Register records. Do not
            create decorative sample events.
          </p>
        </div>

        {/* Event-to-timeline architecture */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Mapped Event — fields each timeline event will support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs mb-2">
            {[
              "Event ID",
              "Asset / System",
              "Event Type",
              "Expected Period",
              "Event Date (where established)",
              "Scenario (where applicable)",
              "Event Status",
              "Validation Status",
              "Evidence Confidence",
              "Source",
              "Material Assumptions",
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
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "PROPOSED",
              "DERIVED — REQUIRES VALIDATION",
              "USER CONFIRMED",
              "VALIDATED",
              "EXCLUDED",
              "SUPERSEDED",
            ].map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color:
                    s === "DERIVED — REQUIRES VALIDATION"
                      ? "#d97706"
                      : s === "VALIDATED"
                        ? "#15803d"
                        : "#6b7280",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            DERIVED — REQUIRES VALIDATION must remain visibly distinguishable from VALIDATED. A
            derived event is not a confirmed event. If an event date is not sufficiently
            established, an Expected Period is shown without manufacturing a precise date. EXCLUDED
            and SUPERSEDED events do not silently influence active capital exposure.
          </p>
        </div>

        {/* GAP / CONFLICT architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
              GAP — Event Timeline
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              Event · Asset / Scope · Information Missing · Affected Horizon · Potential Impact ·
              Required Action.
            </p>
          </div>
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#fecaca", background: "#fef2f2" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
              CONFLICT — Event Timeline
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
              Source A · Source B · Conflicting Information · Affected Event · Affected Asset ·
              Affected Horizon · Potential Impact · Required Resolution. Conflict not silently
              resolved.
            </p>
          </div>
        </div>
      </div>

      {/* ── Capital Exposure Timeline ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Capital Exposure Timeline
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Provide the future architecture for viewing validated lifecycle expenditure by analysis
          period once controlled event costs and financial methodology are available.
        </p>

        {/* Empty state */}
        <div
          className="rounded-lg border px-4 py-5 text-center mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
            No calculated capital exposure is currently available.
          </p>
          <p className="text-xs italic" style={{ color: "#d1d5db" }}>
            Do not create fictional bars, peaks or totals. No sample values are displayed.
          </p>
        </div>

        {/* Period bands — empty framework */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {["0–5 Yrs", "6–10 Yrs", "11–15 Yrs", "16–20 Yrs", "21–25 Yrs"].map((band) => (
            <div
              key={band}
              className="rounded-lg border px-3 py-3 text-center"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
                {band}
              </p>
              <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                —
              </p>
            </div>
          ))}
        </div>

        {/* Architecture fields */}
        <div
          className="rounded-lg border px-4 py-3 mb-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Architecture — fields this section will support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Analysis Period",
              "Lifecycle Event",
              "Asset / System",
              "Scenario",
              "Source Cost",
              "Currency",
              "Cost Basis",
              "Validation Status",
              "Calculated Financial Output (where applicable)",
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

        {/* Capital Exposure Method Status */}
        <div
          className="rounded-lg border px-4 py-4 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-bold" style={{ color: "#92400e" }}>
              Capital Exposure Method Status
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fef3c7", color: "#92400e" }}
            >
              METHOD REQUIRES VALIDATION
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#78350f" }}>
            FERN must use controlled lifecycle-event information, validated cost inputs and an
            approved calculation method before capital exposure is treated as decision-grade
            information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            <div
              className="rounded border px-3 py-2"
              style={{ borderColor: "#fde68a", background: "#fff" }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
                SOURCE / EVENT COST
              </p>
              <p className="text-xs" style={{ color: "#78350f" }}>
                The raw repair, renewal or replacement cost from an authorised source record.
              </p>
            </div>
            <div
              className="rounded border px-3 py-2"
              style={{ borderColor: "#fde68a", background: "#fff" }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
                CALCULATED FINANCIAL OUTPUT
              </p>
              <p className="text-xs" style={{ color: "#78350f" }}>
                Present Cost, NPC, NPV, EAC or total exposure derived from a controlled and
                validated calculation method.
              </p>
            </div>
          </div>
          <p className="text-xs italic mb-3" style={{ color: "#92400e" }}>
            A source repair, renewal or replacement cost is not automatically equivalent to Present
            Cost, NPC, NPV, EAC or total lifecycle exposure.
          </p>
          <div className="space-y-1">
            {[
              {
                label: "Present Cost",
                value: "Pending controlled methodology",
              },
              { label: "NPC", value: "Pending controlled methodology" },
              { label: "NPV", value: "Pending controlled methodology" },
              { label: "EAC", value: "Pending controlled methodology" },
              {
                label: "Capital Peak",
                value: "Pending controlled methodology",
              },
              {
                label: "Lifecycle Total",
                value: "Pending controlled methodology",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded border px-3 py-1.5"
                style={{ borderColor: "#fde68a", background: "#fff" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#374151" }}>
                  {label}
                </p>
                <p className="text-xs italic" style={{ color: "#9ca3af" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
