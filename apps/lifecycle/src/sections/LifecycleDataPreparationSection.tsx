import ConflictPattern from "../../../../packages/platform/src/components/data/ConflictPattern.tsx";
import DataSourceBadge from "../../../../packages/platform/src/components/data/DataSourceBadge.tsx";
import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import GapPattern from "../../../../packages/platform/src/components/data/GapPattern.tsx";
import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";
import { LIFECYCLE_DATA_CATEGORIES } from "../configuration.tsx";
import React from "react";

export default function LifecycleDataPreparationSection() {
  return (
    <>
      {/* ── FERN Data Preparation ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            FERN Data Preparation
          </h2>
          <DataSourceBadge status="NOT_CONNECTED" />
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          FERN determines which information is material to the particular asset, analysis horizon,
          decision and lifecycle scenario being assessed. Missing material information may limit or
          block specific lifecycle conclusions.
        </p>

        {/* Safe context derivation */}
        <div
          className="mb-5 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Safe Context Derivation — not currently connected
          </p>
          <div className="space-y-2">
            {[
              ["Site Record", "Address", "Country", "Region", "Applicable FM Geographic Context"],
              ["Site", "Facility Type", "Operating Context"],
              ["Asset Record", "Asset Type", "Installation Date", "Asset Age"],
              [
                "Asset + Authorised Reference",
                "Reference Service Life",
                "Potential Remaining-Life Context",
              ],
            ].map((chain, ci) => (
              <div
                key={ci}
                className="flex flex-wrap items-center gap-1 text-xs"
                style={{ color: "#6b7280" }}
              >
                {chain.map((node, ni) => (
                  <React.Fragment key={node}>
                    <span
                      className="px-2 py-0.5 rounded border"
                      style={{ borderColor: "#e5e7eb", background: "#fff" }}
                    >
                      {node}
                    </span>
                    {ni < chain.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 italic" style={{ color: "#9ca3af" }}>
            Remaining lifecycle is also affected by condition, maintenance history, operating duty,
            failure history, environment, criticality, obsolescence, compliance and validated
            engineering judgement. Do not assume Reference Service Life − Asset Age = Remaining
            Useful Life automatically.
          </p>
        </div>

        {/* Material Data Requirements */}
        <div
          className="mb-5 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: "#374151" }}>
            Material Data Requirements
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
            Requirement status for each category: <strong>To Be Determined</strong> — no approved
            rule currently exists.
          </p>
        </div>

        {/* Data category rows */}
        <div className="space-y-2">
          {LIFECYCLE_DATA_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 rounded-lg border px-4 py-3"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#1f2937" }}>
                  {cat.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <DataSourceBadge status={cat.sourceStatus} />
                <DataStatusBadge status={cat.dataStatus} />
              </div>
              <div className="text-xs shrink-0" style={{ color: "#9ca3af", minWidth: 55 }}>
                <span className="font-medium">Source:</span> —
              </div>
            </div>
          ))}
        </div>

        {/* FCA vs FCI note */}
        <div
          className="mt-4 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Facility Condition Assessment vs Facility Condition Index
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div
              className="rounded border px-3 py-2"
              style={{ borderColor: "#e5e7eb", background: "#fff" }}
            >
              <div
                className="font-bold mb-0.5 flex items-center gap-1"
                style={{ color: "#374151" }}
              >
                Facility Condition Assessment{" "}
                <InfoIcon
                  label="FCA"
                  text="A condition assessment describing the observed or validated condition of the facility, building systems or assets. It is a qualitative or structured description, not a calculated index."
                />
              </div>
              <p style={{ color: "#6b7280" }}>
                A condition assessment describing the observed or validated condition of the
                facility, building systems or assets.
              </p>
            </div>
            <div
              className="rounded border px-3 py-2"
              style={{ borderColor: "#e5e7eb", background: "#fff" }}
            >
              <div
                className="font-bold mb-0.5 flex items-center gap-1"
                style={{ color: "#374151" }}
              >
                Facility Condition Index (FCI){" "}
                <InfoIcon
                  label="FCI"
                  text="A calculated facility-condition indicator requiring a controlled methodology and the necessary validated cost and condition inputs. FCI is not calculated until the controlled methodology and required validated inputs are available."
                />
              </div>
              <p style={{ color: "#6b7280" }}>
                A calculated indicator requiring a controlled methodology and validated cost and
                condition inputs. Not currently calculated.
              </p>
            </div>
          </div>
        </div>

        {/* Conflict / GAP patterns */}
        <div className="mt-4">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "#9ca3af" }}
          >
            GAP Pattern
          </p>
          <GapPattern
            title="Material lifecycle information required for the requested analysis has not yet been established."
            whyMatters="The missing information may limit or prevent the affected lifecycle analysis."
            area="To Be Determined from the requested asset, scenario and analysis horizon."
            action="Connect an authorised source, provide authorised evidence or confirm the information where permitted."
          />
        </div>
        <div className="mt-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "#9ca3af" }}
          >
            Conflict Pattern
          </p>
          <ConflictPattern />
        </div>
      </div>

      {/* ── Information Required From You ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Information Required From You
        </h2>
        <div
          className="rounded-lg border px-4 py-4 text-center"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>
            FERN has not yet established all authorised source information required to perform
            lifecycle analysis.
          </p>
          <p
            className="text-xs leading-relaxed mt-2 mx-auto"
            style={{ color: "#6b7280", maxWidth: 520 }}
          >
            As authorised information becomes available, this area should request only the material
            information that FERN cannot retrieve, derive or validate automatically.
          </p>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Future Input Interactions — not yet active
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Select authorised evidence",
              "Confirm retrieved information",
              "Correct an identified conflict",
              "Enter missing information",
              "Mark information unavailable",
            ].map((opt) => (
              <span
                key={opt}
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {opt}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
            User-entered information will be marked <strong>USER CONFIRMED</strong> or{" "}
            <strong>REQUIRES VALIDATION</strong> as appropriate.
          </p>
        </div>
      </div>

      {/* ── Analysis Readiness ── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Analysis Readiness
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Application readiness describes whether FERN has the information and controlled
          methodology needed to perform an analysis. It does not represent an actual finding about
          the selected Site.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
              Application Readiness
            </p>
            <p className="text-sm font-bold" style={{ color: "#1a56db" }}>
              Data Preparation
            </p>
          </div>
          <div
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
              Actual Site Analysis Status
            </p>
            <p className="text-sm font-bold" style={{ color: "#9ca3af" }}>
              Not Yet Established
            </p>
          </div>
        </div>

        {/* Readiness gate concept */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Readiness Gate — Future Logic
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Material Information Sufficient",
              "Controlled Methodology Available",
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
              Ready for Analysis
            </span>
          </div>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            If conditions are not satisfied:{" "}
            <strong style={{ color: "#dc2626" }}>ANALYSIS BLOCKED</strong> — FERN cannot complete
            the affected lifecycle analysis until the material information and methodology required
            for that analysis have been sufficiently established.
          </p>
        </div>

        {/* Current prototype state */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              Analysis Capability: NOT READY
            </span>
          </div>
          <p className="text-xs mb-0.5" style={{ color: "#374151" }}>
            <strong>Reason:</strong> Required authorised information and controlled calculation
            methodology are not yet sufficiently established.
          </p>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            This is an application readiness state, not a finding about the selected Site.
          </p>
        </div>
      </div>
    </>
  );
}
