import ConflictPattern from "../../../../packages/platform/src/components/data/ConflictPattern.tsx";
import DataSourceBadge from "../../../../packages/platform/src/components/data/DataSourceBadge.tsx";
import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import { DATA_CATEGORIES } from "../configuration.tsx";
import React from "react";

export default function PreContractDataPreparationSection() {
  return (
    <>
      {/* FERN Data Preparation */}
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
        <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
          Where authorised Site information is available, FERN may derive associated contextual
          information rather than requesting it repeatedly.
        </p>

        {/* Derivation chain illustration */}
        <div
          className="mb-5 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Safe Derivation Concept — not currently connected
          </p>
          <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
            {[
              "Site Record",
              "Address",
              "Country",
              "Region",
              "Applicable FM geographic context",
            ].map((node, i, arr) => (
              <React.Fragment key={node}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{ borderColor: "#e5e7eb", background: "#fff" }}
                >
                  {node}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <div
            className="flex flex-wrap items-center gap-1 text-xs mt-2"
            style={{ color: "#6b7280" }}
          >
            {["Site", "Facility Type", "Approved Service Model", "Approved Service Tier"].map(
              (node, i, arr) => (
                <React.Fragment key={node}>
                  <span
                    className="px-2 py-0.5 rounded border"
                    style={{ borderColor: "#e5e7eb", background: "#fff" }}
                  >
                    {node}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
                </React.Fragment>
              ),
            )}
          </div>
        </div>

        {/* Data category cards */}
        <div className="space-y-2">
          {DATA_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 rounded-lg border px-4 py-3"
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
              <div className="flex items-center gap-3 shrink-0">
                <DataSourceBadge status={cat.sourceStatus} />
                <DataStatusBadge status={cat.dataStatus} />
              </div>
              <div className="text-xs shrink-0" style={{ color: "#9ca3af", minWidth: 60 }}>
                <span className="font-medium">Source:</span> —
              </div>
            </div>
          ))}
        </div>

        {/* Material Data Requirements */}
        <div
          className="mt-5 rounded-lg border px-4 py-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: "#374151" }}>
            Material Data Requirements
          </p>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
            FERN determines which information is required for the specific assessment, Site, service
            scope and scenarios being evaluated. Missing material information may prevent or limit
            particular parts of the analysis.
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

        {/* CONFLICT pattern */}
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

      {/* Information Required From You */}
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
            FERN has not yet established the authorised source information required to complete this
            assessment.
          </p>
          <p
            className="text-xs leading-relaxed mt-2"
            style={{ color: "#6b7280", maxWidth: 520, margin: "8px auto 0" }}
          >
            As source connections and evidence become available, this area should request only
            information that FERN cannot retrieve, derive or validate automatically.
          </p>
        </div>
        <div
          className="mt-4 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Future Input Pattern — not yet active
          </p>
          <p className="text-xs mb-2" style={{ color: "#374151" }}>
            FERN could not establish the current authorised FM contract cost.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Select authorised record",
              "Reference approved evidence",
              "Enter value",
              "Mark unavailable",
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
    </>
  );
}
