import DataSourceBadge from "../../../../packages/platform/src/components/data/DataSourceBadge.tsx";
import DataStatusBadge from "../../../../packages/platform/src/components/data/DataStatusBadge.tsx";
import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";

export default function PreContractBaselineSection({
  site,
  facilityType,
  region,
}: {
  site: string;
  facilityType: string;
  region: string;
}) {
  return (
    <>
      {/* ── CURRENT FM SERVICE BASELINE ─────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Current FM Service Baseline
          </h2>
          <DataStatusBadge status="GAP" />
        </div>
        <p className="text-xs mb-5" style={{ color: "#6b7280" }}>
          Establish the evidence-supported current position before comparing alternative FM delivery
          arrangements.
        </p>

        {(
          [
            {
              heading: "Site & Facility Context",
              fields: [
                { label: "Site", value: site, note: "Prototype context" },
                {
                  label: "Country / Region",
                  value: region,
                  note: "Prototype context",
                },
                {
                  label: "Facility Type",
                  value: facilityType,
                  note: "Prototype context",
                },
                { label: "Relevant Operating Configuration", value: null },
              ],
            },
            {
              heading: "Current Delivery Arrangement",
              tip: "Delivery Composition and FM Service Model are separate concepts. Delivery Composition describes who performs the FM delivery. FM Service Model describes the contractual and operational structure under which FM is delivered.",
              fields: [
                {
                  label: "Delivery Composition",
                  value: null,
                  tip: "Blue Badge (Amazon internal), Blue Badge + Yellow Badge (mixed), or Yellow Badge (external).",
                },
                {
                  label: "FM Service Model",
                  value: null,
                  tip: "Blue Badge · IFM · IFM Hybrid · Fully Contained — see definitions.",
                },
                {
                  label: "Service Tier",
                  value: null,
                  tip: "Prime (Tier 1 — Highest) · Plus (Tier 2 — Intermediate) · Core (Tier 3 — Basic).",
                },
                { label: "Internal / External Delivery Boundary", value: null },
                { label: "Supplier (where applicable)", value: null },
                { label: "Amazon Internal Delivery Responsibility", value: null },
              ],
            },
            {
              heading: "Current FM Service Scope",
              fields: [
                { label: "Included Services", value: null },
                { label: "Excluded Services", value: null },
                { label: "Service Requirements", value: null },
                { label: "Maintenance Strategy", value: null },
                {
                  label: "Resource Requirements (where applicable)",
                  value: null,
                },
                {
                  label: "Performance Requirements (where available)",
                  value: null,
                },
              ],
            },
            {
              heading: "Current Commercial Position",
              fields: [
                { label: "Current FM Cost", value: null },
                { label: "Cost Basis", value: null },
                { label: "Contract Term", value: null },
                { label: "Renewal / Review Date", value: null },
                { label: "Known Commercial Constraints", value: null },
                {
                  label: "Known Mobilisation / Transition Obligations",
                  value: null,
                },
              ],
            },
            {
              heading: "Current Performance & Assurance",
              fields: [
                { label: "KPI Information (where available)", value: null },
                { label: "SLA Information (where available)", value: null },
                {
                  label: "Audit / Assurance Information (where available)",
                  value: null,
                },
                { label: "Corrective Actions (where available)", value: null },
              ],
            },
            {
              heading: "Current Asset / Facility Position",
              fields: [
                { label: "Facility Condition", value: null },
                { label: "Asset Condition", value: null },
                { label: "Critical Assets", value: null },
                { label: "Deferred Maintenance", value: null },
                { label: "Known Lifecycle Exposure", value: null },
              ],
            },
            {
              heading: "Current Risk & Compliance",
              fields: [
                { label: "Operational Risk", value: null },
                { label: "FM Compliance Requirements", value: null },
                { label: "Contractual Risk", value: null },
                { label: "Supplier Risk", value: null },
                { label: "Evidence Gaps", value: null },
              ],
            },
          ] as {
            heading: string;
            tip?: string;
            fields: {
              label: string;
              value: string | null;
              note?: string;
              tip?: string;
            }[];
          }[]
        ).map((section) => (
          <div key={section.heading} className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-bold" style={{ color: "#374151" }}>
                {section.heading}
              </p>
              {section.tip && <InfoIcon label={section.heading} text={section.tip} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {section.fields.map(({ label, value, note, tip }) => (
                <div
                  key={label}
                  className="flex items-start gap-2 py-1.5 border-b"
                  style={{ borderColor: "#f3f4f6" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                        {label}
                      </p>
                      {tip && <InfoIcon label={label} text={tip} />}
                    </div>
                    {value ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-sm font-medium" style={{ color: "#1f2937" }}>
                          {value}
                        </p>
                        {note && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: "#fffbeb", color: "#d97706" }}
                          >
                            {note}
                          </span>
                        )}
                        <DataStatusBadge status="REQUIRES_VALIDATION" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm" style={{ color: "#d1d5db" }}>
                          —
                        </span>
                        <DataSourceBadge status="NOT_CONNECTED" />
                        <DataStatusBadge status="GAP" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* FM Service Model Definitions */}
        <div
          className="mt-4 rounded-lg border px-4 py-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "#9ca3af" }}
          >
            FM Service Model Definitions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                model: "Blue Badge",
                def: "Amazon employees; Amazon internal operating model / SSM; fully in-house Amazon RME/FM delivery.",
              },
              {
                model: "IFM",
                def: "Yellow Badge; input-based external FM provision against specified resources, activities and requirements.",
              },
              {
                model: "IFM Hybrid",
                def: "Blue Badge + Yellow Badge; mixed internal / external delivery according to the approved operating arrangement.",
              },
              {
                model: "Fully Contained",
                def: "Yellow Badge; output-based external provider contracted against defined FM service outputs. Not an in-house model.",
              },
            ].map(({ model, def }) => (
              <div
                key={model}
                className="rounded border px-3 py-2.5"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                <p className="text-xs font-bold mb-0.5" style={{ color: "#0d2464" }}>
                  {model}
                </p>
                <p className="text-xs leading-snug" style={{ color: "#6b7280" }}>
                  {def}
                </p>
              </div>
            ))}
          </div>
          <div
            className="mt-3 rounded border px-3 py-2.5"
            style={{ borderColor: "#e5e7eb", background: "#fff" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
              Service Tier
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span>
                <strong style={{ color: "#0d2464" }}>Prime</strong> — Tier 1 — Highest
              </span>
              <span>
                <strong style={{ color: "#0d2464" }}>Plus</strong> — Tier 2 — Intermediate
              </span>
              <span>
                <strong style={{ color: "#0d2464" }}>Core</strong> — Tier 3 — Basic
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
