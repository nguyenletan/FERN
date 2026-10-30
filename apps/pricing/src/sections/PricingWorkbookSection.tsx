import React from "react";

export default function PricingWorkbookSection() {
  return (
    <>
      {/* Cost Summary */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Cost Summary
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT AVAILABLE
          </span>
        </div>
        <div
          className="rounded-lg border px-4 py-3 mb-3"
          style={{ borderColor: "#fecaca", background: "#fff5f5" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            COST SUMMARY CALCULATION NOT READY
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            The pricing guidelines identify the Cost Summary as a consolidated output, but the
            controlled workbook formulas required to calculate that output have not yet been
            implemented in FERN.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
          {[
            { label: "Site", value: "—" },
            { label: "Vendor", value: "—" },
            { label: "Profit Margin", value: "—" },
            { label: "Profit Margin %", value: "—" },
            { label: "Mobilisation Cost", value: "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-2 py-1"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p className="text-xs italic" style={{ color: "#d1d5db" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <div
          className="rounded-lg border px-3 py-2 mt-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs mb-1">
            <span style={{ color: "#92400e" }}>
              Summary Calculation Source: <strong>REFERENCE WORKBOOK AVAILABLE</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#92400e" }}>
              Method Status: <strong>REQUIRES VALIDATION</strong>
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "#9ca3af" }}>
            The reference workbook demonstrates how underlying pricing areas feed the consolidated
            Summary. FERN has not yet validated this workbook as the applicable controlled
            calculation method.
          </p>
        </div>
        <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
          No total price, annual FM price, labour price, maintenance total, overhead total, profit
          or mobilisation total has been calculated.
        </p>
      </div>

      {/* Pricing Calculation Method */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Calculation Method
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderColor: "#fde68a",
            }}
          >
            REFERENCE METHOD AVAILABLE — REQUIRES VALIDATION
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          A reference BBM pricing workbook containing formula logic is available for mapping. Its
          version, applicability and approval status must be validated before its calculation method
          is treated as controlled for FERN pricing.
        </p>
        <div
          className="rounded-lg border px-3 py-2 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span style={{ color: "#92400e" }}>
              Reference Workbook: <strong>AVAILABLE</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#92400e" }}>
              Version: <strong>TO BE CONFIRMED</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#92400e" }}>
              Applicability: <strong>REQUIRES VALIDATION</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#92400e" }}>
              Approval Status: <strong>NOT ESTABLISHED</strong>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
          {[
            "Workbook / Method Name",
            "Version",
            "Source Document",
            "Source Version",
            "Formula Set",
            "Effective Date",
            "Approval Status",
            "Method Owner",
            "Required Inputs",
            "Calculated Outputs",
            "Validation Status",
            "Last Validated",
            "Superseded By",
          ].map((f) => (
            <div
              key={f}
              className="flex items-center justify-between rounded border px-2 py-1"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
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

        {/* Controlled Formulas */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#1e3a8a" }}>
            CONTROLLED FORMULAS
          </p>
          <p className="text-xs mb-3" style={{ color: "#3730a3" }}>
            The supplied guidance requires existing formula cells in the pricing template to remain
            unchanged. FERN must preserve the controlled calculation logic and must not silently
            replace, modify or recreate it.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs mb-2">
            {[
              "Formula Source",
              "Formula Version",
              "Protected Formula Status",
              "Validation Test",
              "Reconciliation Result",
              "Change Approval",
              "Supersession Status",
            ].map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bfdbfe",
                  background: "#fff",
                  color: "#1e3a8a",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#93c5fd" }}>
            No formula is currently implemented.
          </p>
        </div>
      </div>

      {/* Reference Workbook Structure */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Reference Workbook Structure
        </h2>
        <div className="space-y-2">
          {[
            { sheet: "File Control", desc: "Version / change history" },
            {
              sheet: "Maintenance",
              desc: "Asset maintenance time, delivery arrangement, consumables and maintenance cost inputs",
            },
            {
              sheet: "Multi-Year PMs",
              desc: "Maintenance occurring at intervals greater than one year",
            },
            { sheet: "Staff Rate Card", desc: "Labour-rate cost structure" },
            {
              sheet: "Delivery Teams",
              desc: "Headcount, hours, wage references and utilisation information",
            },
            {
              sheet: "Overheads",
              desc: "Applicable management / support / administration cost inputs",
            },
            {
              sheet: "Subcontractors",
              desc: "Subcontractor information by applicable asset scope",
            },
            {
              sheet: "Drop Down",
              desc: "Supporting controlled selectable values",
            },
            {
              sheet: "Summary",
              desc: "Consolidated pricing outputs and rate information",
            },
          ].map(({ sheet, desc }) => (
            <div
              key={sheet}
              className="flex items-start gap-3 rounded-lg border px-3 py-2"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <span
                className="text-xs font-bold shrink-0 mt-0.5"
                style={{ color: "#374151", minWidth: "120px" }}
              >
                {sheet}
              </span>
              <span style={{ color: "#d1d5db" }} className="shrink-0">
                →
              </span>
              <span className="text-xs" style={{ color: "#6b7280" }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3 italic" style={{ color: "#9ca3af" }}>
          Structure reflects observed reference workbook architecture only. Applicability requires
          validation.
        </p>
      </div>

      {/* Pricing Calculation Lineage */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-2" style={{ color: "#0d2464" }}>
          Pricing Calculation Lineage
        </h2>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          This represents observed workbook dependency architecture. It does not establish that the
          reference workbook is the current approved pricing method.
        </p>
        <div className="space-y-2">
          {[
            { from: "Maintenance", to: "Summary" },
            { from: "Multi-Year PMs", to: "Summary" },
            { from: "Staff Rate Card", to: "Delivery Teams" },
            { from: "Delivery Teams", to: "Summary" },
            { from: "Staff Rate Card", to: "Summary Rate Information" },
            { from: "Overheads", to: "Summary" },
          ].map(({ from, to }, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bfdbfe",
                  background: "#eff6ff",
                  color: "#1e3a8a",
                }}
              >
                {from}
              </span>
              <span style={{ color: "#93c5fd" }}>→</span>
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bbf7d0",
                  background: "#f0fdf4",
                  color: "#15803d",
                }}
              >
                {to}
              </span>
            </div>
          ))}
        </div>

        {/* Maintenance Lineage */}
        <div
          className="mt-4 rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#9ca3af" }}>
            Maintenance — future input relationship
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Asset / Scope",
              "UOM",
              "Quantity",
              "Maintenance Frequency",
              "Maintenance Time",
              "Delivery Arrangement",
              "Applicable Cost Inputs",
              "Consumables",
            ].map((n, i, arr) => (
              <React.Fragment key={n}>
                <span
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fff",
                    color: "#6b7280",
                  }}
                >
                  {n}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>+</span>}
              </React.Fragment>
            ))}
            <span style={{ color: "#d1d5db" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#bbf7d0",
                background: "#f0fdf4",
                color: "#15803d",
              }}
            >
              Maintenance Cost / Time Output
            </span>
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            FERN must map the actual reference-workbook logic before calculation implementation. No
            generic substitute formula applies.
          </p>
        </div>

        {/* Staff Rate Card Lineage */}
        <div
          className="mt-2 rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#9ca3af" }}>
            Staff Rate Card — future input relationship
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#e5e7eb",
                background: "#fff",
                color: "#6b7280",
              }}
            >
              Base Labour Cost Inputs
            </span>
            <span style={{ color: "#d1d5db" }}>+</span>
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#e5e7eb",
                background: "#fff",
                color: "#6b7280",
              }}
            >
              Applicable Salary Cost Components
            </span>
            <span style={{ color: "#d1d5db" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#e5e7eb",
                background: "#fff",
                color: "#374151",
              }}
            >
              Reference Hourly Rate
            </span>
            <span style={{ color: "#d1d5db" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#e5e7eb",
                background: "#fff",
                color: "#374151",
              }}
            >
              Delivery Team Rate Reference
            </span>
            <span style={{ color: "#d1d5db" }}>→</span>
            <span
              className="px-2 py-0.5 rounded border"
              style={{
                borderColor: "#bbf7d0",
                background: "#f0fdf4",
                color: "#15803d",
              }}
            >
              Summary Rate Information
            </span>
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            Profit-margin treatment remains separately traceable. Formula not yet implemented.
          </p>
        </div>

        {/* Delivery Team Lineage */}
        <div
          className="mt-2 rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#9ca3af" }}>
            Delivery Teams — future input relationship
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {["Job / Headcount Type", "Hours", "Headcount", "Validated Staff Rate"].map(
                (n, i, arr) => (
                  <React.Fragment key={n}>
                    <span
                      className="px-2 py-0.5 rounded border"
                      style={{
                        borderColor: "#e5e7eb",
                        background: "#fff",
                        color: "#6b7280",
                      }}
                    >
                      {n}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>+</span>}
                  </React.Fragment>
                ),
              )}
              <span style={{ color: "#d1d5db" }}>→</span>
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bbf7d0",
                  background: "#f0fdf4",
                  color: "#15803d",
                }}
              >
                Annual Labour Cost
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                "Maintenance Scope Hours",
                "Reactive Maintenance Allocation",
                "Other Applicable Time",
              ].map((n, i, arr) => (
                <React.Fragment key={n}>
                  <span
                    className="px-2 py-0.5 rounded border"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#fff",
                      color: "#6b7280",
                    }}
                  >
                    {n}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>+</span>}
                </React.Fragment>
              ))}
              <span style={{ color: "#d1d5db" }}>→</span>
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#bbf7d0",
                  background: "#f0fdf4",
                  color: "#15803d",
                }}
              >
                Delivery Team Utilisation
              </span>
            </div>
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            Structural relationships observed in reference workbook. Calculations not activated.
            Example percentages not hard-coded.
          </p>
        </div>
      </div>

      {/* Formula Inventory */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Formula Inventory
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#eff6ff",
              color: "#1a56db",
              borderColor: "#bfdbfe",
            }}
          >
            REFERENCE FORMULAS IDENTIFIED
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          Architecture for future controlled formula mapping. Individual formula records are not
          displayed in the UI until version and applicability validation are complete.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            "Formula ID",
            "Workbook",
            "Workbook Version",
            "Sheet",
            "Cell / Range",
            "Formula",
            "Input Fields",
            "Referenced Sheet / Range",
            "Output Field",
            "Business Meaning",
            "Formula Classification",
            "Protected Formula Status",
            "Validation Status",
            "Test",
            "Expected Result",
            "Tolerance where applicable",
            "Acceptance Criterion",
            "Source Version",
            "Superseded By",
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
        <p className="text-xs mt-3 italic" style={{ color: "#9ca3af" }}>
          Formulas must not be rewritten, simplified or inferred from narrative guidance. Workbook
          formula logic must be mapped before FERN implementation.
        </p>
      </div>

      {/* Pricing Data Classification */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-2" style={{ color: "#0d2464" }}>
          Pricing Data Classification
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
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
        <div
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "#fecaca", background: "#fef2f2" }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: "#dc2626" }}>
            EXAMPLE VALUES MUST NOT BE REUSED AS SITE DATA
          </p>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            The reference workbook contains populated example pricing, labour, headcount,
            maintenance and overhead information. These values support understanding of workbook
            behaviour only and must not be presented as pricing for the current FERN Site context.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "Labour rates",
              "Headcount",
              "Shift patterns",
              "Maintenance costs",
              "Overheads",
              "Profit percentages",
              "Supplier information",
              "Asset quantities",
              "Subcontractors",
              "Currency",
              "Calculated totals",
            ].map((v) => (
              <span
                key={v}
                className="px-2 py-0.5 rounded border line-through"
                style={{
                  borderColor: "#fecaca",
                  background: "#fff",
                  color: "#9ca3af",
                }}
              >
                {v}
              </span>
            ))}
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            None of these example values have been copied to the current prototype context.
          </p>
        </div>
        <div
          className="mt-2 rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs" style={{ color: "#6b7280" }}>
            <strong className="text-gray-700">Example workbook values</strong> are reference data
            and must not automatically become Site pricing inputs.
          </p>
          <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
            <strong className="text-gray-700">Observed workbook formulas</strong> are reference
            calculation logic until version and applicability validation are complete.
          </p>
        </div>
      </div>

      {/* Reference Formula Validation */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Reference Formula Validation
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            NOT READY
          </span>
        </div>
        <div
          className="rounded-lg border px-3 py-2 mb-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future validation gate
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              "Applicable Workbook Identified",
              "Workbook Version Confirmed",
              "Approval / Applicability Established",
              "Formula Inventory Completed",
              "Input Fields Mapped",
              "Output Fields Mapped",
              "Cross-Sheet Dependencies Mapped",
              "Protected Formula Behaviour Confirmed",
              "Reference Calculations Tested",
              "Material Differences Against Current Requirement Resolved",
              "Acceptance Criteria Approved",
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
              Formula Set Ready for Controlled Implementation
            </span>
          </div>
        </div>
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          No bypass available. Formula implementation requires completion of all validation
          conditions.
        </p>
      </div>

      {/* Pricing Workbook Version Control */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-2" style={{ color: "#0d2464" }}>
          Pricing Workbook Version Control
        </h2>
        <div
          className="rounded-lg border px-3 py-2 mb-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span style={{ color: "#92400e" }}>
              Reference workbook version: <strong>TO BE CONFIRMED</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#92400e" }}>
              Approval Status: <strong>NOT ESTABLISHED</strong>
            </span>
          </div>
          <p className="text-xs mt-1.5 italic" style={{ color: "#9ca3af" }}>
            The reference workbook file-control contains historical version references. No specific
            version has been selected as the applicable controlled version for this pricing
            exercise.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            "Workbook",
            "Version",
            "Change Description",
            "Effective Date",
            "Approval Status",
            "Owner",
            "Previous Version",
            "Superseded By",
            "Affected Sheets",
            "Affected Inputs",
            "Affected Formulas",
            "Affected Outputs",
            "Regression Test Requirement",
            "Validation Status",
          ].map((f) => (
            <div
              key={f}
              className="flex items-center justify-between rounded border px-2 py-1"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
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
    </>
  );
}
