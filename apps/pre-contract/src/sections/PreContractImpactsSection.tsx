import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import React from "react";

export default function PreContractImpactsSection({
  onNavigate,
}: {
  onNavigate: (dest: string) => void;
}) {
  return (
    <>
      {/* ── COST & COMMERCIAL COMPARISON ──────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Cost & Commercial Comparison
        </h2>
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
          FERN evaluates service-model alternatives using both short-term cost and longer-term FM
          exposure. Lowest initial price does not automatically represent the preferred FM outcome.
        </p>
        <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
          Wider exposure may include: lifecycle expenditure, deferred maintenance, asset
          deterioration, reactive maintenance, operational resilience, compliance, risk, transition
          complexity and Amazon internal capability requirement. No score applied without an
          approved methodology.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Current Annual FM Cost",
            "Proposed Annual FM Cost",
            "Cost Difference",
            "Transition Cost",
            "Mobilisation Cost",
            "Internal Amazon Resource Cost",
            "External Supplier Cost",
            "Planned Maintenance Cost",
            "Reactive Maintenance Cost",
            "Lifecycle / Renewal Impact",
            "Capital Impact (where relevant)",
            "Cost Uncertainty",
            "Commercial Assumptions",
          ].map((field) => (
            <div
              key={field}
              className="flex items-center gap-4 rounded-lg border px-4 py-2.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-sm flex-1" style={{ color: "#374151" }}>
                {field}
              </p>
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                Financial data required
              </span>
              <DataStatusBadge status="GAP" />
            </div>
          ))}
        </div>
        {/* Cost basis */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#9ca3af" }}>
            Cost Basis — Required Fields
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              "Currency",
              "Price Base Date",
              "Assessment Period",
              "Inflation Assumption",
              "Discount Assumption",
              "Included Cost Categories",
              "Excluded Cost Categories",
              "Source",
            ].map((f) => (
              <div key={f}>
                <p className="font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                  {f}
                </p>
                <p style={{ color: "#d1d5db" }}>—</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICE & OPERATIONAL IMPACT ──────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-4" style={{ color: "#0d2464" }}>
          Service & Operational Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Service Coverage",
            "Delivery Responsibility",
            "Amazon Internal Resource Requirement",
            "Supplier Dependency",
            "Mobilisation Complexity",
            "Operational Resilience",
            "Maintenance Delivery Approach",
            "Management / Governance Effort",
            "Flexibility",
            "Site Disruption",
            "Capability Requirement",
            "Transition Requirement",
          ].map((field) => (
            <div
              key={field}
              className="flex items-center gap-3 rounded-lg border px-4 py-2.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-sm flex-1" style={{ color: "#374151" }}>
                {field}
              </p>
              <span className="text-xs italic" style={{ color: "#9ca3af" }}>
                Requires Assessment
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
          Evidence-supported qualitative states only. No arbitrary scores.
        </p>
      </div>

      {/* ── LIFECYCLE & ASSET IMPACT ───────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
              Lifecycle & Asset Impact
            </h2>
            <DataStatusBadge status="GAP" />
          </div>
          <button
            onClick={() => onNavigate("Lifecycle & Asset Analysis")}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: "#eff6ff",
              color: "#1a56db",
              border: "1px solid #bfdbfe",
            }}
          >
            Open Lifecycle & Asset Analysis →
          </button>
        </div>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          Lifecycle outputs will be consumed from the Lifecycle & Asset Analysis application rather
          than calculated here. Integration / Analysis Required.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            "5-Year Exposure",
            "10-Year Exposure",
            "15-Year Exposure",
            "20-Year Exposure",
            "25-Year Exposure",
            "Deferred Maintenance Exposure",
            "Material Renewal Events",
            "Facility Condition",
            "Asset Risk",
          ].map((field) => (
            <div
              key={field}
              className="rounded-lg border px-3 py-2.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                {field}
              </p>
              <p className="text-xs italic" style={{ color: "#9ca3af" }}>
                Integration / Analysis Required
              </p>
            </div>
          ))}
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Facility Condition
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            Facility Condition Assessment and Facility Condition Index are separate concepts. FCI
            requires the controlled methodology and required input values before it can be
            calculated.
          </p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {[
              "Facility Condition Assessment",
              "Facility Condition Index (FCI)",
              "Asset Condition",
              "Criticality",
              "Deferred Maintenance",
              "Known Renewal Requirement",
              "Operational Business Impact",
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
                {f}: —
              </span>
            ))}
          </div>
        </div>
        {/* FM Assessment Receiving State */}
        <div
          className="rounded-lg border px-4 py-3 mt-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Lifecycle Assessment Input
            </p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded border"
              style={{
                background: "#f3f4f6",
                color: "#9ca3af",
                borderColor: "#e5e7eb",
              }}
            >
              NOT CONNECTED / NOT AVAILABLE
            </span>
          </div>
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            No validated lifecycle handover package is currently available for this assessment.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
              Handover Acceptance Status
            </p>
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
          <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
            Lifecycle information will remain unavailable to the assessment until the applicable
            handover validation and acceptance controls have been satisfied.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {[
              "Source Lifecycle Analysis",
              "Asset / Scope",
              "Analysis Horizon",
              "Lifecycle Position",
              "Relevant Lifecycle Events",
              "Relevant Cost / Financial Information",
              "Operational Impact",
              "Business Impact",
              "Risk / Compliance Implication",
              "Lifecycle Recommendation where available",
              "Human Review Status",
              "Decision Status where applicable",
              "Evidence Confidence",
              "Supporting Evidence",
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
      </div>

      {/* ── RISK & COMPLIANCE COMPARISON ─────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Risk & Compliance Comparison
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          No numeric risk ratings or new risk methodology. Approved Risk Management and FMEA methods
          may feed this comparison when supplied. Compliance context is derived from Site → Address
          → Country → Region → Applicable FM requirement context.
        </p>
        <div className="space-y-2">
          {[
            "Operational Risk",
            "Asset Risk",
            "Maintenance Risk",
            "Compliance Risk",
            "Contractual Risk",
            "Supplier Risk",
            "Transition Risk",
            "Data / Evidence Risk",
          ].map((risk) => (
            <div
              key={risk}
              className="flex items-center gap-4 rounded-lg border px-4 py-2.5"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <p className="text-sm flex-1" style={{ color: "#374151" }}>
                {risk}
              </p>
              <span className="text-xs italic" style={{ color: "#9ca3af" }}>
                No approved assessment result available
              </span>
            </div>
          ))}
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Compliance Context — Derivation Architecture
          </p>
          <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
            {["Site", "Address", "Country", "Region", "Applicable FM requirement context"].map(
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
          <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
            Mandatory FM requirements to be retrieved from authorised sources only. Public internet
            data is not a substitute for approved Amazon compliance information.
          </p>
        </div>
      </div>
    </>
  );
}
