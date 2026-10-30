import { stageBg } from "../configuration.tsx";
import { stageBorder } from "../configuration.tsx";
import { stageColor } from "../configuration.tsx";
import { workflowStages } from "../configuration.tsx";
import React from "react";

export default function PreContractContextSection({
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
      {/* Application header */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: "#9ca3af", letterSpacing: "0.1em" }}
        >
          FERN Apps
        </p>
        <h1 className="text-xl font-bold mb-1" style={{ color: "#0d2464" }}>
          FM Pre-Contract / Pre-Tender Assessment
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "#6b7280", maxWidth: 720 }}>
          AI-assisted assessment of the current FM service arrangement and credible future delivery
          scenarios, combining available cost, service, asset, lifecycle, risk, compliance and
          operational evidence to support an informed business decision.
        </p>
        <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
          FERN supports the decision. FERN does not make the final procurement, contractual or
          financial approval.
        </p>
      </div>

      {/* Working context + assessment status */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-sm font-bold" style={{ color: "#0d2464" }}>
            Working Context
          </h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "#fffbeb",
              color: "#d97706",
              border: "1px solid #fde68a",
            }}
          >
            Prototype Context — Demonstration Only
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
          {[
            { label: "Site", value: site },
            { label: "Region", value: region },
            { label: "Facility Type", value: facilityType },
            { label: "Current Service Model", value: serviceModel },
            { label: "Service Tier", value: tier },
            {
              label: "Assessment Status",
              value: "Data Preparation",
              highlight: true,
            },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: highlight ? "#1a56db" : "#1f2937" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow progress */}
        <div className="border-t pt-4" style={{ borderColor: "#f3f4f6" }}>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "#9ca3af" }}
          >
            Workflow Progress
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            {workflowStages.map((stage, i) => (
              <React.Fragment key={stage.id}>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  title={stage.note}
                  style={{
                    background: stageBg[stage.state],
                    color: stageColor[stage.state],
                    border: `1px solid ${stageBorder[stage.state]}`,
                  }}
                >
                  {stage.state === "done" && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {stage.state === "requires" && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.3" />
                      <path
                        d="M5 3v2.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                      <circle cx="5" cy="7.2" r="0.6" fill="currentColor" />
                    </svg>
                  )}
                  {stage.state === "framework" && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect
                        x="1.5"
                        y="1.5"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="currentColor"
                        opacity="0.7"
                      />
                      <rect
                        x="5.5"
                        y="1.5"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="currentColor"
                        opacity="0.4"
                      />
                      <rect
                        x="1.5"
                        y="5.5"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="currentColor"
                        opacity="0.4"
                      />
                      <rect
                        x="5.5"
                        y="5.5"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="currentColor"
                        opacity="0.7"
                      />
                    </svg>
                  )}
                  {stage.label}
                </div>
                {i < workflowStages.length - 1 && (
                  <span style={{ color: "#d1d5db", fontSize: 11 }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Purpose */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-4" style={{ color: "#0d2464" }}>
          Assessment Purpose
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {[
            { label: "Site", value: site, note: "Prototype context" },
            { label: "Assessment Reason", value: null },
            { label: "Existing Contract / Arrangement", value: null },
            { label: "Contract Renewal / Review Context", value: null },
            { label: "Business Owner", value: null },
            { label: "Required Decision Date", value: null },
            { label: "Assessment Scope", value: null },
          ].map(({ label, value, note }) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 py-2 border-b last:border-0"
              style={{ borderColor: "#f3f4f6" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                {label}
              </p>
              {value ? (
                <div className="flex items-center gap-2">
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
                </div>
              ) : (
                <p className="text-sm italic" style={{ color: "#9ca3af" }}>
                  Information required
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FERN Intelligent Data Principle */}
      <div
        className="rounded-xl border px-6 py-5"
        style={{
          borderColor: "#bfdbfe",
          background: "#eff6ff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="#1a56db" strokeWidth="1.4" />
              <path d="M9 8v5M9 6v.5" stroke="#1a56db" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: "#1e3a8a" }}>
              FERN prepares available information before asking the user.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#3730a3" }}>
              FERN should retrieve, derive and validate information from authorised available
              sources where possible. The user should normally be asked only to confirm uncertain
              information, resolve conflicts or provide information that FERN cannot obtain from an
              authorised source.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
