import React from "react";

export default function PricingMappingSection() {
  return (
    <>
      {/* Pricing Data Validation */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Data Validation
          </h2>
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
              "Applicable Site",
              "Validated Site Classification where material",
              "Applicable Asset Scope",
              "Applicable Maintenance Scope",
              "Required Maintenance Inputs",
              "Required Multi-Year Inputs where applicable",
              "Required Staff Rates",
              "Required Delivery-Team Inputs",
              "Required Overheads where applicable",
              "Required Subcontractor Information where applicable",
              "Commercial Inputs",
              "Controlled Pricing Method",
              "Material Gaps Addressed",
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
              Ready for Pricing Calculation
            </span>
          </div>
        </div>

        {/* GAP / CONFLICT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#9ca3af" }}>
              GAP — Pricing
            </p>
            <p className="text-xs mb-1 leading-relaxed" style={{ color: "#6b7280" }}>
              Architecture examples: Missing Asset Quantity · Missing UOM · Missing Maintenance
              Scope · Missing Maintenance Frequency · Missing Staff Rate · Missing Currency ·
              Missing Mobilisation Cost · Missing Pricing Method.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No pricing GAP has currently been established.
            </p>
          </div>
          <div
            className="rounded border px-3 py-2"
            style={{ borderColor: "#fecaca", background: "#fef2f2" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
              CONFLICT — Pricing
            </p>
            <p className="text-xs mb-1 leading-relaxed" style={{ color: "#6b7280" }}>
              Future fields: Field · Source A · Source B · Difference · Impact · Owner · Required
              Decision · Resolution Status.
            </p>
            <p className="text-xs italic" style={{ color: "#9ca3af" }}>
              No pricing CONFLICT has currently been established.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Source-to-Target Mapping */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Source-to-Target Mapping
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            MAPPING NOT READY
          </span>
        </div>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          Define how authorised FERN pricing information may eventually map to the applicable
          controlled pricing workbook while preserving source, meaning, validation status and
          calculation lineage.
        </p>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No controlled field-level mapping has yet been sufficiently validated for production
          pricing use. This is an integration-readiness state — not a statement about an actual Site
          price or supplier quotation.
        </p>

        {/* Source-to-Target Mapping Register */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Source-to-Target Mapping Register
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No validated source-to-target field mappings are currently available.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Mapping ID",
              "Source Business Field",
              "Source Information Category",
              "Source System / Record",
              "Source Field",
              "Source Version",
              "Source Date",
              "Source Owner where available",
              "Site / Context",
              "Service / Asset Scope where applicable",
              "Source Value",
              "Unit",
              "Currency where applicable",
              "Data Classification",
              "Requirement Status",
              "Target Workbook",
              "Target Workbook Version",
              "Target Sheet",
              "Target Field",
              "Target Cell / Range where verified",
              "Transformation / Derivation",
              "Transformation Rule Source",
              "Validation Status",
              "Conflict Status",
              "Gap Status",
              "Human Review Requirement",
              "Test Reference",
              "Acceptance Criterion",
              "Mapping Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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
        </div>

        {/* Target Workbook Areas */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Target Workbook Areas
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[
              "Maintenance",
              "Multi-Year PMs",
              "Staff Rate Card",
              "Delivery Teams",
              "Overheads",
              "Subcontractors",
              "Drop Down",
              "Summary",
            ].map((a) => (
              <span
                key={a}
                className="px-2 py-0.5 rounded border text-xs"
                style={{
                  borderColor: "#bfdbfe",
                  background: "#eff6ff",
                  color: "#1e3a8a",
                }}
              >
                {a}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            Target areas only. Not every FERN input maps to every area. Specific field or cell
            mappings require verified evidence before recording.
          </p>
        </div>

        {/* Data Classification Control */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Data Classification Control
          </p>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            Source information must retain its original classification when mapped. A GAP must not
            become zero, an ASSUMPTION must not become a FACT, and reference workbook example values
            must not become Site inputs.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              {
                label: "SOURCE INPUT",
                bg: "#eff6ff",
                color: "#1a56db",
                border: "#bfdbfe",
              },
              {
                label: "REFERENCE DATA",
                bg: "#f3f4f6",
                color: "#374151",
                border: "#e5e7eb",
              },
              {
                label: "CONTROLLED FORMULA",
                bg: "#fef3c7",
                color: "#92400e",
                border: "#fde68a",
              },
              {
                label: "CALCULATED OUTPUT",
                bg: "#f0fdf4",
                color: "#15803d",
                border: "#bbf7d0",
              },
              {
                label: "ASSUMPTION",
                bg: "#fff7ed",
                color: "#c2410c",
                border: "#fed7aa",
              },
              {
                label: "GAP",
                bg: "#fef2f2",
                color: "#dc2626",
                border: "#fecaca",
              },
              {
                label: "CONFLICT",
                bg: "#fdf4ff",
                color: "#9333ea",
                border: "#e9d5ff",
              },
              {
                label: "HUMAN REVIEW",
                bg: "#fffbeb",
                color: "#d97706",
                border: "#fde68a",
              },
            ].map(({ label, bg, color, border }) => (
              <span
                key={label}
                className="px-2 py-0.5 rounded border text-xs font-bold"
                style={{ background: bg, color, borderColor: border }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Mapping Applicability */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Mapping Applicability
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              TO BE DETERMINED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            The information required depends on the applicable pricing scope, workbook structure,
            service requirements and commercial context.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {["REQUIRED", "RELEVANT", "OPTIONAL", "NOT APPLICABLE", "UNKNOWN"].map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Transformation & Derivation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Transformation & Derivation
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT ESTABLISHED
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            FERN must preserve the original source value separately from any transformation,
            derivation or calculated pricing output.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Value",
              "Transformation Required",
              "Transformation Description",
              "Transformation Rule",
              "Rule Source",
              "Rule Version",
              "Derived Value",
              "Validation Status",
              "Evidence",
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

        {/* Pricing Field Validation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
              Pricing Field Validation
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#fee2e2", color: "#dc2626" }}
            >
              NOT READY
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Source available",
              "Source authorised",
              "Source version identified",
              "Site / context match",
              "Service / asset scope match",
              "Required unit available",
              "Required currency available where applicable",
              "Target field established",
              "Target workbook version established",
              "Transformation rule established where applicable",
              "Required evidence available",
              "Conflict identified",
              "Gap identified",
              "Duplicate / superseded record checked",
              "Human review requirement established",
            ].map((cond, i, arr) => (
              <React.Fragment key={cond}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#fecaca",
                    background: "#fff",
                    color: "#6b7280",
                  }}
                >
                  {cond}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#fca5a5" }}>+</span>}
              </React.Fragment>
            ))}
            <span style={{ color: "#fca5a5" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border font-semibold"
              style={{
                borderColor: "#bbf7d0",
                background: "#f0fdf4",
                color: "#15803d",
              }}
            >
              Ready for Field Mapping Validation
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            FIELD MAPPING VALIDATION NOT READY
          </p>
          <p className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
            No bypass available.
          </p>
        </div>

        {/* Mapping Exceptions */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: "#374151" }}>
            Mapping Exceptions
          </p>
          <p className="text-xs mb-2 italic" style={{ color: "#9ca3af" }}>
            No mapping exceptions are currently recorded.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Exception ID",
              "Source Field",
              "Target Field",
              "Exception Type",
              "Reason",
              "Impact",
              "Affected Pricing Area",
              "Gap / Conflict Classification",
              "Resolution Required",
              "Owner where available",
              "Human Review Requirement",
              "Status",
              "Supporting Evidence",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border text-xs"
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
        </div>

        {/* Pricing Mapping Reconciliation */}
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold" style={{ color: "#374151" }}>
              Pricing Mapping Reconciliation
            </p>
            <span className="text-xs italic" style={{ color: "#9ca3af" }}>
              NOT AVAILABLE
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Record Count",
              "Mapped Record Count",
              "Accepted Record Count",
              "Rejected Record Count",
              "Gap Count",
              "Conflict Count",
              "Duplicate Count",
              "Superseded Count",
              "Unmapped Material Fields",
              "Reconciliation Status",
              "Exception Reference",
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
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Counts are not shown as zero when information is unavailable.
          </p>
        </div>

        {/* Traceability */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#1e3a8a" }}>
            Mapping Traceability
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs mb-2">
            {[
              "Authorised Source Information",
              "Source Business Field",
              "Source-to-Target Mapping",
              "Target Workbook Field",
              "Controlled Formula where applicable",
              "Calculated Output",
              "Pricing Summary",
              "Authorised Human Review",
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
          <p className="text-xs italic" style={{ color: "#93c5fd" }}>
            A calculated pricing output must remain traceable back through the applicable formula
            and field mapping to its authorised source information.
          </p>
        </div>
      </div>
    </>
  );
}
