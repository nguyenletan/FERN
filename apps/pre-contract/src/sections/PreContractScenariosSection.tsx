import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";

export default function PreContractScenariosSection() {
  return (
    <>
      {/* ── DELIVERY SCENARIO ASSESSMENT ──────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Delivery Scenario Assessment
        </h2>
        <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
          FERN should compare only credible scenarios supported by the Site context, FM
          requirements, available evidence and applicable constraints. FERN must not manufacture a
          scenario simply to complete a comparison.
        </p>

        {/* Scenario A — Current Arrangement */}
        <div className="rounded-lg border mb-4" style={{ borderColor: "#e5e7eb" }}>
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "#f3f4f6" }}
          >
            <div>
              <p className="text-sm font-bold" style={{ color: "#0d2464" }}>
                Scenario A — Current Arrangement
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                Current arrangement baseline — pending evidence validation
              </p>
            </div>
            <DataStatusBadge status="REQUIRES_VALIDATION" />
          </div>
          <div className="px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
            {[
              { label: "Scenario Status", value: "Requires Validation" },
              { label: "Delivery Composition", value: null },
              { label: "FM Service Model", value: null },
              { label: "Service Tier", value: null },
              { label: "Current Cost", value: null },
              {
                label: "Evidence Status",
                value: "Insufficient authorised information",
              },
              { label: "Known Assumptions", value: null },
              { label: "Known Constraints", value: null },
              { label: "Data Gaps", value: null },
              { label: "Confidence", value: "Not Yet Assessed" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                  {label}
                </p>
                {value ? (
                  <p className="text-xs font-medium" style={{ color: "#374151" }}>
                    {value}
                  </p>
                ) : (
                  <p className="text-xs" style={{ color: "#d1d5db" }}>
                    —
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alternative scenario templates */}
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "#9ca3af" }}
        >
          Alternative Scenario Templates
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            {
              name: "Alternative Internal Delivery Scenario",
              model: "Blue Badge",
              desc: "Amazon employees; fully in-house delivery.",
            },
            {
              name: "Alternative Mixed Delivery Scenario",
              model: "IFM Hybrid",
              desc: "Blue Badge + Yellow Badge; mixed internal / external.",
            },
            {
              name: "Alternative External Input-Based Scenario",
              model: "IFM",
              desc: "Yellow Badge; input-based external provision.",
            },
            {
              name: "Alternative External Output-Based Scenario",
              model: "Fully Contained",
              desc: "Yellow Badge; output-based external provision.",
            },
          ].map(({ name, model, desc }) => (
            <div
              key={name}
              className="rounded-lg border px-4 py-3"
              style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-bold" style={{ color: "#374151" }}>
                  {name}
                </p>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
                  style={{
                    background: "#f5f3ff",
                    color: "#6d28d9",
                    border: "1px solid #ddd6fe",
                  }}
                >
                  Framework
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
                May map to: <strong>{model}</strong>
              </p>
              <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
                {desc}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded border"
                  style={{
                    background: "#f9fafb",
                    color: "#9ca3af",
                    borderColor: "#e5e7eb",
                  }}
                >
                  Eligibility: To Be Determined
                </span>
                <InfoIcon
                  label="Eligibility States"
                  text={
                    "One of the following will apply once evidence and an approved rule support it:\n• Eligible for Assessment\n• Requires Validation\n• Insufficient Information\n• Not Applicable\n• Excluded — With Reason"
                  }
                />
              </div>
              <p className="text-xs italic" style={{ color: "#9ca3af" }}>
                No approved eligibility rule is currently connected.
              </p>
            </div>
          ))}
        </div>

        {/* Scenario exclusion principle */}
        <div
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
            Scenario Exclusion
          </p>
          <p className="text-xs mb-2" style={{ color: "#6b7280" }}>
            A scenario may be excluded where it is outside assessment scope, required capability is
            unavailable, it conflicts with an applicable requirement, essential data is unavailable,
            or it is commercially or operationally infeasible. Exclusions must record Reason,
            Evidence, Owner / decision source, and Impact on comparison.
          </p>
          <button
            disabled
            className="text-xs font-semibold px-3 py-1.5 rounded-lg opacity-50 cursor-not-allowed"
            style={{
              background: "#f5f3ff",
              color: "#6d28d9",
              border: "1px solid #ddd6fe",
            }}
          >
            Add Assessment Scenario — not yet active
          </button>
        </div>
      </div>

      {/* ── PRICING ASSESSMENT INPUT ─────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Pricing Assessment Input
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              borderColor: "#e5e7eb",
            }}
          >
            NOT CONNECTED
          </span>
        </div>
        <p className="text-xs mb-3 italic" style={{ color: "#9ca3af" }}>
          No validated Pricing Template Generator output is currently connected to this assessment.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
          {[
            { label: "Handover Package", value: "NOT AVAILABLE" },
            { label: "Handover Acceptance", value: "NOT AVAILABLE" },
            { label: "Source Pricing Assessment", value: "—" },
            { label: "Site / Context", value: "—" },
            { label: "Pricing Scope", value: "—" },
            { label: "Relevant Pricing Outputs", value: "—" },
            { label: "Currency", value: "—" },
            { label: "Cost Basis", value: "—" },
            { label: "Validation Status", value: "—" },
            { label: "Reconciliation Status", value: "—" },
            { label: "Human Review Status", value: "—" },
            { label: "Evidence Confidence", value: "—" },
            { label: "Supporting Evidence", value: "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded border px-2 py-1"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p
                className="text-xs italic font-bold"
                style={{
                  color: value === "NOT AVAILABLE" ? "#dc2626" : "#d1d5db",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs italic" style={{ color: "#9ca3af" }}>
          Pricing input does not determine the FM Service Model. The FM comparison must not be
          populated from prototype pricing information.
        </p>
      </div>
    </>
  );
}
