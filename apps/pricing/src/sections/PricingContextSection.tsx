import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";
import { PRICING_WORKFLOW } from "../configuration.tsx";
import React from "react";

export default function PricingContextSection({
  site,
  facilityType,
  serviceModel,
  tier,
  region,
}: {
  site: string;
  facilityType: string;
  serviceModel: string;
  tier: string;
  region: string;
}) {
  return (
    <>
      {/* Header */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-lg font-bold" style={{ color: "#0d2464" }}>
            Pricing Template Generator
          </h1>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#eff6ff",
              color: "#1a56db",
              borderColor: "#bfdbfe",
            }}
          >
            DATA PREPARATION
          </span>
        </div>
        <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
          Prepare and validate the site-specific information required for the BBM FM pricing
          process, bringing together facility context, asset scope, maintenance requirements,
          labour, delivery-team, overhead, subcontractor and commercial information in a controlled
          and traceable workflow.
        </p>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          FERN supports pricing preparation and validation. Final commercial, procurement and
          contractual decisions remain subject to authorised human review.
        </p>
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#fde68a", background: "#fffbeb" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold" style={{ color: "#92400e" }}>
              Prototype Context — Demonstration Only
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#78350f" }}>
              Application Readiness: <strong>DATA PREPARATION</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#78350f" }}>
              Pricing Calculation Status: <strong>NOT READY</strong>
            </span>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ color: "#78350f" }}>
              Pricing Output Status: <strong>NOT AVAILABLE</strong>
            </span>
          </div>
          <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
            A reference BBM pricing workbook containing formula logic is available for mapping. Its
            version, applicability and approval status have not yet been sufficiently established
            for FERN to treat it as the controlled pricing calculation method.
          </p>
        </div>
      </div>

      {/* Working Context */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Working Context
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            {
              label: "Site",
              value: site || "—",
              tooltip: "Prototype site identifier. Not validated Amazon production configuration.",
            },
            {
              label: "Country / Region",
              value: region || "—",
              tooltip: "Derived from prototype context.",
            },
            {
              label: "Facility Type",
              value: facilityType || "—",
              tooltip: "Prototype context only.",
            },
            {
              label: "Facility Sub-Type",
              value: "—",
              tooltip: "To be established from authorised Site classification.",
            },
            {
              label: "Facility Complexity",
              value: "—",
              tooltip: "To be established from authorised Site classification.",
            },
            {
              label: "Typical Operating Pattern",
              value: "—",
              tooltip:
                "To be established from authorised Site classification. Not inferred from Site code.",
            },
            {
              label: "Current Service Model",
              value: serviceModel || "—",
              tooltip: "Prototype context only.",
            },
            {
              label: "Service Tier",
              value: tier || "—",
              tooltip: "Prototype context only.",
            },
            {
              label: "Pricing Status",
              value: "Data Preparation",
              tooltip: "Current application-level pricing readiness state.",
            },
          ].map(({ label, value, tooltip }) => (
            <div
              key={label}
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                <InfoIcon label={label} text={tooltip} />
              </div>
              <p
                className="text-xs italic"
                style={{ color: value === "—" ? "#d1d5db" : "#374151" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
          Prototype Context — Demonstration Only. Site classification has not been validated.
          Facility Sub-Type, Complexity and Typical Operating Pattern are not inferred from the Site
          code.
        </p>
      </div>

      {/* Pricing Principle */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-2" style={{ color: "#0d2464" }}>
          SITE-SPECIFIC PRICING
        </h2>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
          The BBM pricing template is prepared separately for each individual site. Reference cost
          or time information must not be treated as the site-specific price.
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            "Source Input",
            "Validate Site / Scope",
            "Prepare Pricing Input",
            "Controlled Workbook Calculation",
            "Review",
            "Pricing Output",
          ].map((node, i, arr) => (
            <React.Fragment key={node}>
              <span
                className="px-2 py-0.5 rounded border"
                style={{
                  borderColor: i === 3 ? "#fecaca" : "#e5e7eb",
                  background: i === 3 ? "#fff5f5" : "#fff",
                  color: i === 3 ? "#dc2626" : "#374151",
                }}
              >
                {node}
                {i === 3 ? " — NOT YET AVAILABLE" : ""}
              </span>
              {i < arr.length - 1 && <span style={{ color: "#d1d5db" }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Pricing Workflow */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Pricing Workflow
        </h2>
        <div className="flex flex-wrap gap-2">
          {PRICING_WORKFLOW.map(({ label, state }, i, arr) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border"
                  style={{
                    borderColor: "#e5e7eb",
                    background: "#fafafa",
                    color: "#374151",
                  }}
                >
                  {label}
                </span>
                <span className="text-xs italic mt-0.5" style={{ color: "#9ca3af" }}>
                  {state}
                </span>
              </div>
              {i < arr.length - 1 && (
                <span className="text-xs self-center" style={{ color: "#d1d5db" }}>
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
