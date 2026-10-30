import { DATA_STATUS_CONFIG } from "../../../../packages/platform/src/domain/dataStatus.ts";
import { PRICING_DATA_CATEGORIES } from "../configuration.tsx";

export default function PricingInputsSection({ site }: { site: string }) {
  return (
    <>
      {/* Site Classification */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Site Classification
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
          Establish the applicable facility classification required to provide context for FM
          pricing preparation. Reference taxonomy available. Site-specific classification has not
          been validated.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {[
            { label: "Facility Category", value: "—" },
            { label: "Facility Sub-Type", value: "—" },
            { label: "Complexity", value: "—" },
            { label: "Typical Operational Hours", value: "—" },
            { label: "Classification Status", value: "REQUIRES VALIDATION" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-3 py-1.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
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
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Reference taxonomy — facility categories supported
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              "Fulfillment Centers",
              "Sort Centers",
              "Delivery Stations",
              "Grocery / Fresh / Prime Now",
              "Air Operations",
              "Returns & Reverse Logistics",
              "Specialty & Support Facilities",
              "Transportation & Logistics Support",
            ].map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: "#e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            Do not infer classification from Site code, facility size, Service Model, Service Tier
            or pricing data. Typical operational hours are reference ranges — not actual Site hours.
          </p>
        </div>
      </div>

      {/* FERN Data Preparation */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          FERN Data Preparation
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          FERN prepares available information before asking the user. No system is currently
          connected. All fields require authorised information before populating.
        </p>
        <div className="space-y-2">
          {PRICING_DATA_CATEGORIES.map((cat) => {
            const ds = DATA_STATUS_CONFIG[cat.dataStatus];
            return (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-lg border px-4 py-2.5"
                style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
              >
                <p className="text-sm font-semibold" style={{ color: "#374151" }}>
                  {cat.label}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded border font-semibold"
                    style={{
                      borderColor: "#e5e7eb",
                      background: "#f3f4f6",
                      color: "#9ca3af",
                    }}
                  >
                    Not Connected
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: ds.bg, color: ds.color }}
                  >
                    {ds.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Asset & Maintenance Scope */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Asset & Maintenance Scope
        </h2>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised pricing asset scope is currently available.
        </p>
        <div
          className="rounded-lg border px-3 py-2 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future record fields
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Asset Reference",
              "Asset Category",
              "Asset Sub-Category",
              "Asset Range / Specification",
              "APM Description",
              "APM OCB Object Code",
              "Manufacturer",
              "Model",
              "UOM",
              "Site Quantity",
              "Scope Status",
              "Amazon Comment",
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
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          Source document examples illustrate how the template is used. They are not Site data and
          must not be imported as asset quantities.
        </p>
      </div>

      {/* Maintenance Pricing Input */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Maintenance Pricing Input
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          No authorised maintenance pricing information is currently available. Formulas are
          controlled by the underlying pricing workbook and have not been implemented.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Delivery Arrangement
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                "On-site Team",
                "Mobile Team",
                "Subcontractor",
                "Mixed arrangement where applicable",
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
          </div>
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Maintenance Frequency Types
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {["Daily", "Weekly", "Monthly", "Quarterly", "Half-Yearly", "Yearly"].map((f) => (
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
        </div>
        <div
          className="rounded-lg border px-3 py-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future input fields
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Maintenance Time per UOM",
              "Annual Maintenance Time",
              "Consumable Cost per UOM",
              "Mobile-Team Cost",
              "Subcontractor Cost",
              "Consumables Included",
              "Vendor Comment",
              "Asset Change Reason",
              "Asset Change Cost Impact",
              "PM Standard Change Reason",
              "PM Standard Change Cost Impact",
              "Additional Site-Specific Maintenance Requirement",
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
        </div>
      </div>

      {/* Multi-Year PM */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Multi-Year PM
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          Capture applicable maintenance requirements occurring at intervals greater than one year.
        </p>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised multi-year maintenance pricing information is currently available.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            "Maintenance Description",
            "Asset / Scope",
            "Maintenance Interval",
            "Scheduled Frequency",
            "Expected Period",
            "Applicable Site",
            "Source",
            "Validation Status",
            "Cost Input where supported",
            "Human Review Requirement",
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

      {/* Staff Rate Card */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Staff Rate Card
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised staff-rate information available. No currency, salary or percentage values
          have been created.
        </p>
        <div
          className="rounded-lg border px-3 py-2 mb-2"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
            Future structure
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            {[
              "Job / Headcount Type",
              "Country / Region",
              "Base Hourly Rate",
              "Salary Cost Categories",
              "Applicable Percentage",
              "Calculated Hourly Rate",
              "Profit Margin Treatment",
              "Currency",
              "Source",
              "Validation Status",
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
        </div>
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          Guidance notes that Staff Rate Card values exclude profit margin and that profit-margin
          percentage contributes to the final hourly-rate calculation. The formula has not been
          implemented.
        </p>
      </div>

      {/* Delivery Teams */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Delivery Teams
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised delivery-team pricing information available.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            "Headcount / Job Title",
            "Hours per Week",
            "Annual Hours",
            "Shift Times",
            "Headcount Number",
            "Hourly Rate Reference",
            "Maintenance Hours",
            "Reactive-Maintenance Allocation",
            "Other Time Allocation",
            "Utilisation Output",
            "Source",
            "Validation Status",
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

      {/* Overheads */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Overheads
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised overhead pricing information available.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Future categories
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                "Central Management",
                "IT Systems",
                "Help Desk",
                "Support Centre",
                "Other Administration",
                "Other Applicable Controlled Overhead",
              ].map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded border"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fff",
                    color: "#6b7280",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "#9ca3af" }}>
              Future fields
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                "Description",
                "Cost Basis",
                "Total Cost",
                "Amount Charged",
                "Currency",
                "Allocation / Percentage where calculated",
                "Source",
                "Validation Status",
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
          </div>
        </div>
      </div>

      {/* Subcontractors */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Subcontractors
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No authorised subcontractor pricing information is currently available.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            "Asset Category",
            "Asset Sub-Category",
            "Service Description",
            "Subcontractor",
            "Additional Subcontractor where applicable",
            "Source",
            "Validation Status",
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
    </>
  );
}
