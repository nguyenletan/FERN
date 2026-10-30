import React from "react";

export default function PreContractReportSection({
  reportOpen,
  setReportOpen,
}: {
  reportOpen: boolean;
  setReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* ── ASSESSMENT REPORT ────────────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-base font-bold" style={{ color: "#0d2464" }}>
            Assessment Report
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "#f9fafb",
              color: "#9ca3af",
              border: "1px solid #e5e7eb",
            }}
          >
            NOT READY FOR FINAL REPORT
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
          The assessment report can be completed when sufficient authorised baseline information,
          configured scenarios and supporting comparison evidence are available.
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => setReportOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: "#eff6ff",
              color: "#1a56db",
              border: "1px solid #bfdbfe",
            }}
          >
            {reportOpen ? "Hide" : "Preview"} Assessment Report
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              style={{ transform: reportOpen ? "rotate(180deg)" : undefined }}
            >
              <path
                d="M2 4l4.5 4.5L11 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-50 cursor-not-allowed"
            style={{
              background: "#f9fafb",
              color: "#9ca3af",
              border: "1px solid #e5e7eb",
            }}
          >
            Export Report — Not yet connected
          </span>
        </div>
        {reportOpen && (
          <div className="rounded-lg border text-xs" style={{ borderColor: "#e5e7eb" }}>
            {[
              {
                section: "Assessment Summary",
                state: "Incomplete — baseline information not yet established.",
              },
              {
                section: "Current Position",
                state: "Incomplete — authorised baseline not yet available.",
              },
              {
                section: "Scenarios Assessed",
                state: "Incomplete — no alternative scenarios configured.",
              },
              {
                section: "Comparative Analysis",
                state: "Blocked — requires baseline and configured scenarios.",
              },
              {
                section: "Assumptions & Constraints",
                state: "No authorised assumptions recorded.",
              },
              {
                section: "Dependencies",
                state: "No dependencies established.",
              },
              { section: "FERN Recommendation", state: "Not Yet Available." },
              { section: "Human Review", state: "Pending." },
              {
                section: "Business Decision Record",
                state: "No decision recorded.",
              },
              {
                section: "Supporting Evidence",
                state: "No authorised evidence connected.",
              },
            ].map(({ section, state }, idx, arr) => (
              <div
                key={section}
                className="flex items-start gap-4 px-4 py-2.5"
                style={{
                  borderBottom: idx < arr.length - 1 ? "1px solid #f3f4f6" : undefined,
                }}
              >
                <p className="font-semibold shrink-0" style={{ color: "#374151", width: 200 }}>
                  {section}
                </p>
                <p className="italic" style={{ color: "#9ca3af" }}>
                  {state}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
