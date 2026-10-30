import { wfBg } from "../configuration.tsx";
import { wfBorder } from "../configuration.tsx";
import { wfColor } from "../configuration.tsx";
import { wfStages } from "../configuration.tsx";
import React from "react";

export default function LifecycleContextSection({
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
      {/* ── Application header ── */}
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
        <h2 className="text-xl font-bold mb-1" style={{ color: "#0d2464" }}>
          Lifecycle design context reference
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "#6b7280", maxWidth: 720 }}>
          Lifecycle and asset analysis that combines available asset, condition,
          maintenance, cost, criticality, risk and facility information to assess long-term FM
          exposure and support evidence-based maintenance, renewal, repair, replacement, defer or
          monitor decisions.
        </p>
        <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
          FERN provides decision support. Material lifecycle, financial, compliance and
          operational-risk decisions require authorised human review.
        </p>
      </div>

      {/* ── Working context ── */}
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
            { label: "Site", value: site, note: "Prototype" },
            { label: "Country / Region", value: region, note: "Prototype" },
            { label: "Facility Type", value: facilityType, note: "Prototype" },
            {
              label: "Current Service Model",
              value: serviceModel,
              note: "Prototype",
            },
            { label: "Service Tier", value: tier, note: "Prototype" },
            {
              label: "Lifecycle Analysis Status",
              value: "Data Preparation",
              highlight: true,
            },
          ].map(({ label, value, note, highlight }) => (
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
              {note && !highlight && (
                <p className="text-xs" style={{ color: "#d97706" }}>
                  {note}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* Workflow */}
        <div className="border-t pt-4" style={{ borderColor: "#f3f4f6" }}>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "#9ca3af" }}
          >
            Application Workflow
          </p>
          <div className="flex flex-wrap items-center gap-1">
            {wfStages.map((s, i) => (
              <React.Fragment key={s.id}>
                <div
                  title={s.note}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: wfBg[s.state],
                    color: wfColor[s.state],
                    border: `1px solid ${wfBorder[s.state]}`,
                  }}
                >
                  {s.state === "done" && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path
                        d="M1.5 4.5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {s.label}
                </div>
                {i < wfStages.length - 1 && (
                  <span style={{ color: "#d1d5db", fontSize: 10 }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── FERN Intelligent Data Principle ── */}
      <div
        className="rounded-xl border px-6 py-5"
        style={{
          borderColor: "#bfdbfe",
          background: "#eff6ff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-start gap-3">
          <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="#1a56db" strokeWidth="1.4" />
            <path d="M9 8v5M9 6v.5" stroke="#1a56db" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: "#1e3a8a" }}>
              FERN prepares available information before asking the user.
            </p>
            <p className="text-xs leading-relaxed mb-2" style={{ color: "#3730a3" }}>
              FERN should retrieve, derive and validate authorised existing information before
              requesting manual input. Users should normally be asked only to confirm uncertain
              information, resolve conflicts or provide information that FERN cannot obtain from an
              authorised source.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "#3730a3" }}>
              {[
                "Select Site",
                "Retrieve Available Information",
                "Derive Safe Context",
                "Verify",
                "Identify Gaps",
                "Ask User Only for Missing Material Information",
                "Analyse",
              ].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "#93c5fd" }}>→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
