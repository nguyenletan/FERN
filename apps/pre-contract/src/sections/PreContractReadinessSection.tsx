export default function PreContractReadinessSection() {
  return (
    <>
      {/* ── ANALYSIS BLOCKED ─────────────────────────────────────────────── */}
      <div
        className="rounded-xl border px-6 py-5"
        style={{
          borderColor: "#fecaca",
          background: "#fff5f5",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              letterSpacing: "0.08em",
            }}
          >
            ANALYSIS BLOCKED
          </span>
        </div>
        <p className="text-sm font-medium mb-2" style={{ color: "#374151" }}>
          Material baseline information and at least one credible alternative scenario must be
          sufficiently established before FERN can complete comparative analysis.
        </p>
        <p className="text-xs font-semibold mb-1" style={{ color: "#9ca3af" }}>
          Key blockers:
        </p>
        <ul className="text-xs space-y-0.5 list-none" style={{ color: "#6b7280" }}>
          <li>· Authorised baseline information incomplete.</li>
          <li>· Alternative scenarios not yet configured.</li>
          <li>
            · Required lifecycle, commercial, risk or compliance evidence may still be unavailable.
          </li>
        </ul>
        <p className="text-xs mt-2 italic" style={{ color: "#9ca3af" }}>
          These describe the current prototype assessment state only. They are not permanent
          business findings.
        </p>
      </div>

      {/* ── RECOMMENDATION READINESS ─────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-4"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold" style={{ color: "#0d2464" }}>
            Recommendation Readiness
          </p>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            NOT READY
          </span>
        </div>
        <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
          Material baseline information and credible alternative scenarios have not yet been
          sufficiently established.
        </p>
        <div
          className="flex flex-wrap items-center gap-1.5 mt-2 text-xs"
          style={{ color: "#9ca3af" }}
        >
          <span className="font-semibold">Gate:</span>
          <span
            className="px-2 py-0.5 rounded border"
            style={{
              borderColor: "#fecaca",
              background: "#fff5f5",
              color: "#dc2626",
            }}
          >
            Analysis Blocked
          </span>
          <span>→</span>
          <span
            className="px-2 py-0.5 rounded border"
            style={{
              borderColor: "#fecaca",
              background: "#fff5f5",
              color: "#dc2626",
            }}
          >
            Recommendation Readiness: Not Ready
          </span>
          <span>→</span>
          <span
            className="px-2 py-0.5 rounded border"
            style={{
              borderColor: "#e5e7eb",
              background: "#f9fafb",
              color: "#9ca3af",
            }}
          >
            FERN Recommendation: Not Yet Available
          </span>
        </div>
      </div>

      {/* ── SCENARIO COMPARISON MATRIX ───────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-1" style={{ color: "#0d2464" }}>
          Scenario Comparison
        </h2>
        <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
          No approved weighting methodology connected. No arbitrary scores, RAG ratings or weighted
          totals. Evidence presented side-by-side only. Alternative scenario columns appear only
          after a scenario has been configured and retained for assessment.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 380 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th
                  className="text-left px-3 py-2 border font-semibold"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#374151",
                    width: 240,
                  }}
                >
                  Assessment Factor
                </th>
                <th
                  className="text-left px-3 py-2 border font-semibold"
                  style={{ borderColor: "#e5e7eb", color: "#374151" }}
                >
                  Scenario A — Current Arrangement
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                "Delivery Composition",
                "FM Service Model",
                "Service Tier",
                "FM Scope",
                "Annual FM Cost",
                "Transition Cost",
                "Lifecycle Exposure",
                "Deferred Maintenance Exposure",
                "Facility / Asset Impact",
                "Operational Resilience",
                "Amazon Internal Resource Requirement",
                "Supplier Dependency",
                "Compliance Consideration",
                "Risk",
                "Transition Complexity",
                "Evidence Confidence",
                "Information Gaps",
              ].map((factor) => (
                <tr key={factor}>
                  <td
                    className="px-3 py-2 border font-semibold"
                    style={{ borderColor: "#e5e7eb", color: "#374151" }}
                  >
                    {factor}
                  </td>
                  <td
                    className="px-3 py-2 border"
                    style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                  >
                    —
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="mt-3 rounded-lg border px-4 py-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs font-semibold mb-0.5" style={{ color: "#9ca3af" }}>
            No alternative assessment scenarios are currently configured.
          </p>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Alternative scenario columns will appear only after a scenario has been configured and
            retained for assessment.
          </p>
        </div>
      </div>

      {/* ── ASSUMPTIONS & CONSTRAINTS ────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Assumptions & Constraints
        </h2>
        <div
          className="rounded-lg border px-4 py-4"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs italic text-center" style={{ color: "#9ca3af" }}>
            No authorised assumptions recorded.
          </p>
        </div>
        <div
          className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs"
          style={{ color: "#9ca3af" }}
        >
          {[
            "Assumption",
            "Source / Basis",
            "Affected Assessment Area",
            "Materiality",
            "Validation Status",
          ].map((h) => (
            <p key={h} className="font-semibold">
              {h}
            </p>
          ))}
        </div>
      </div>

      {/* ── DEPENDENCIES ─────────────────────────────────────────────────── */}
      <div
        className="rounded-xl border bg-white px-6 py-5"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: "#0d2464" }}>
          Dependencies
        </h2>
        <div
          className="rounded-lg border px-4 py-4 mb-3"
          style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
        >
          <p className="text-xs italic text-center" style={{ color: "#9ca3af" }}>
            No dependencies established — component empty until evidence supports one.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs" style={{ color: "#9ca3af" }}>
          {[
            "Amazon internal capability",
            "Supplier availability",
            "Procurement",
            "Commercial information",
            "Asset data",
            "Lifecycle analysis",
            "Compliance validation",
            "Risk validation",
            "Transition / mobilisation",
            "System / data integration",
          ].map((dep) => (
            <span
              key={dep}
              className="px-2 py-0.5 rounded border"
              style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
            >
              {dep}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
