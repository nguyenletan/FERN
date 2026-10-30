import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import type { DataStatus } from "../../../../packages/platform/src/domain/dataStatus.ts";

export default function LifecycleConfigurationSection({ site }: { site: string }) {
  return (
    <>
      {/* ── Lifecycle Analysis Configuration ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Analysis Configuration
          </h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded border"
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderColor: "#fde68a",
            }}
          >
            Configuration Status: Information Required
          </span>
        </div>
        <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
          Define the scope and parameters required for the requested lifecycle analysis. FERN should
          determine which configuration information is material to the selected asset, analysis
          horizon and decision context before analysis proceeds. Not every configuration field is
          necessarily required for every analysis.
        </p>
        <p className="text-xs font-semibold mb-3" style={{ color: "#92400e" }}>
          Requirement Status: TO BE DETERMINED
        </p>
        <div
          className="mb-4 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Material Data Requirements — Configuration Fields
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { label: "Required", color: "#dc2626", bg: "#fef2f2" },
              { label: "Relevant", color: "#d97706", bg: "#fffbeb" },
              { label: "Optional", color: "#6b7280", bg: "#f9fafb" },
              { label: "Not Applicable", color: "#9ca3af", bg: "#f3f4f6" },
              { label: "Unknown", color: "#6b7280", bg: "#f9fafb" },
            ].map(({ label, color, bg }) => (
              <span
                key={label}
                className="text-xs font-semibold px-2 py-0.5 rounded border"
                style={{ color, background: bg, borderColor: "#e5e7eb" }}
              >
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Requirement status for each configuration field: <strong>To Be Determined</strong> — no
            approved rule currently assigns these states.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: "Analysis Name",
              value: "—",
              note: "Information Required",
            },
            {
              label: "Site",
              value: site,
              note: "Prototype Context — Demonstration Only",
              isPrototype: true,
            },
            {
              label: "Asset / Asset Group",
              value: "—",
              note: "Information Required",
            },
            {
              label: "Base Date",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Analysis Horizon",
              value: "—",
              note: "Information Required — select from: 5 / 10 / 15 / 20 / 25 Years",
            },
            { label: "Cost Basis", value: "—", note: "Information Required" },
            {
              label: "Currency",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Price Base Date",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Inflation Assumption",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Discount Assumption",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Risk Allowance",
              value: "—",
              note: "Information Required — do not invent",
            },
            {
              label: "Analysis Purpose",
              value: "—",
              note: "Information Required",
            },
            {
              label: "Decision Context",
              value: "—",
              note: "Information Required",
            },
          ].map(({ label, value, note, isPrototype }) => (
            <div
              key={label}
              className="rounded-lg border px-4 py-3 flex items-start justify-between gap-3"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: isPrototype ? "#1f2937" : "#d1d5db" }}
                >
                  {value}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: isPrototype ? "#d97706" : "#9ca3af" }}
                >
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Analysis Horizon Architecture
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["5 Years", "10 Years", "15 Years", "20 Years", "25 Years"].map((yr) => (
              <span
                key={yr}
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {yr}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            The selected horizon determines which lifecycle events and scenarios are included. Do
            not assume 25 years automatically.
          </p>
        </div>
      </div>

      {/* ── Asset Selection ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Asset Selection
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Analysis may eventually be performed at individual asset, asset group, system / subsystem,
          or facility level where methodology permits. No authorised asset records are currently
          available.
        </p>
        <div
          className="rounded-lg border px-4 py-5"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-semibold mb-1 text-center" style={{ color: "#9ca3af" }}>
            No authorised asset records available.
          </p>
          <p
            className="text-xs leading-relaxed text-center mx-auto mb-4"
            style={{ color: "#9ca3af", maxWidth: 500 }}
          >
            Asset Selection: Unavailable until authorised asset information is established.
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg opacity-40 cursor-not-allowed"
              style={{
                background: "#f3f4f6",
                color: "#6b7280",
                border: "1px solid #e5e7eb",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 2v8M2 6h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Select Asset / Scope
            </button>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              Authorised asset information required
            </span>
          </div>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Selection Scope
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Individual Asset",
              "Asset Group",
              "System / Subsystem",
              "Facility Level (where methodology permits)",
            ].map((opt) => (
              <span
                key={opt}
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lifecycle Assumption Register ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Lifecycle Assumptions
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Each material assumption must be registered, classified and validated before use in
          calculation. No assumptions have been established.
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 900 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Assumption",
                  "Value",
                  "Unit",
                  "Source",
                  "Source Date",
                  "Evidence Status",
                  "Validation Status",
                  "Affected Asset / Scope",
                  "Affected Horizon",
                  "Materiality",
                  "Owner",
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
                {Array(11)
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
        <p className="text-xs italic mb-3" style={{ color: "#9ca3af" }}>
          No authorised assumptions have been established. Do not populate default values.
        </p>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Assumption Type Examples — architecture only, not populated
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Reference Service Life",
              "Maintenance Requirement",
              "Repair Cost",
              "Replacement Cost",
              "Renewal Timing",
              "Inflation",
              "Discount Rate",
              "Risk Allowance",
            ].map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
            Remaining-Life Assessment Status
          </p>
          <p className="text-xs mb-2" style={{ color: "#78350f" }}>
            Reference Service Life − Asset Age must NOT automatically become Remaining Useful Life.
            A numerical remaining-life value requires a controlled methodology and supporting
            evidence.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Not Assessed", "Requires Validation", "Evidence Supported"].map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#fde68a",
                  background: "#fff",
                  color: "#92400e",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs mt-1 font-semibold" style={{ color: "#dc2626" }}>
            Current Status: Not Assessed
          </p>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Assumption Classification
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "VERIFIED",
                "DERIVED",
                "USER_CONFIRMED",
                "ASSUMPTION",
                "GAP",
                "CONFLICT",
                "REQUIRES_VALIDATION",
              ] as DataStatus[]
            ).map((s) => (
              <DataStatusBadge key={s} status={s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Asset Baseline ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Asset Baseline
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Establish the evidence-supported current asset and facility position before performing
          lifecycle analysis.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Asset",
                  "System / Subsystem",
                  "Age",
                  "Condition",
                  "Criticality",
                  "Maintenance Status",
                  "Ref. Service Life",
                  "Remaining-Life Status",
                  "Deferred Maint.",
                  "Replacement Cost",
                  "Evidence",
                  "Confidence",
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
                {Array(12)
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
        <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
          No authorised asset information is currently connected. Do not fabricate an asset
          register.
        </p>
      </div>

      {/* ── Analysis Horizons ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Analysis Horizons
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Future analytical horizons. No financial or asset values are calculated until the required
          methodology and validated inputs are available.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[5, 10, 15, 20, 25].map((yr) => (
            <div
              key={yr}
              className="rounded-lg border px-4 py-4"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: "#0d2464" }}>
                {yr}-Year
              </p>
              <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
                Analysis Status: Pending authorised information
              </p>
              <div className="space-y-0.5 text-xs" style={{ color: "#d1d5db" }}>
                {[
                  "Planned maintenance",
                  "Reactive exposure",
                  "Renewal events",
                  "Replacement cost",
                  "Capital peaks",
                  "Deferred maint.",
                  "Lifecycle cost",
                  "Risk exposure",
                ].map((f) => (
                  <div key={f} className="flex items-center justify-between">
                    <span>{f}</span>
                    <span>—</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lifecycle Calculation Framework ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Lifecycle Calculation Framework
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          The calculation method supports asset renewal and maintenance cost planning.
          Calculation remains unavailable until the controlled methodology and required validated
          inputs are established.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 text-xs">
          {[
            "Base date",
            "Analysis period",
            "Asset information",
            "Validated reference life",
            "Maintenance requirements",
            "Renewal requirements",
            "Cost information",
            "Risk allowances (where approved)",
            "Inflation (where approved)",
            "Discount assumptions (where applicable)",
            "Renewal events",
            "Cash-flow timing",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-3 py-2 rounded border"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" stroke="#d1d5db" strokeWidth="1" />
              </svg>
              <span style={{ color: "#6b7280" }}>{item}</span>
            </div>
          ))}
        </div>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Financial Output Architecture
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              "Cash Flow",
              "Present Cost",
              "Net Present Cost (NPC)",
              "Net Present Value (NPV)",
              "Equivalent Annual Cost",
              "Renewal Expenditure",
              "Capital Peaks",
              "Lifecycle Exposure",
              "Sensitivity",
            ].map((out) => (
              <div
                key={out}
                className="flex items-center justify-between px-3 py-2 rounded border"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <span style={{ color: "#374151" }}>{out}</span>
                <span className="italic" style={{ color: "#d1d5db" }}>
                  —
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Calculation Status — Pending controlled methodology and validated inputs
          </p>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <p className="text-xs font-bold mb-0.5" style={{ color: "#92400e" }}>
            Preserve Scenario — Do Not Manufacture Result
          </p>
          <p className="text-xs" style={{ color: "#78350f" }}>
            FERN must not create an investment-grade lifecycle result merely to complete the
            analysis. Where material inputs, evidence or assumptions cannot be established, FERN
            must identify the gap, reduce confidence or block the affected analysis.
          </p>
        </div>
      </div>

      {/* ── Deferred Maintenance ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Deferred Maintenance
        </h2>
        <div
          className="rounded-lg border px-4 py-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs italic text-center" style={{ color: "#9ca3af" }}>
            No authorised deferred-maintenance information is currently connected.
          </p>
          <p className="text-xs text-center mt-1" style={{ color: "#9ca3af" }}>
            This does not mean that deferred maintenance does not exist.
          </p>
        </div>
        <div
          className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs"
          style={{ color: "#9ca3af" }}
        >
          {[
            "Item",
            "Asset / System",
            "Original Requirement",
            "Deferral Date",
            "Current Condition",
            "Cost Exposure",
            "Asset Consequence",
            "Operational Consequence",
            "Compliance Consequence",
            "Business Impact",
            "Risk",
            "Recommended Treatment",
            "Evidence",
          ].map((h) => (
            <p key={h} className="font-semibold">
              {h}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
