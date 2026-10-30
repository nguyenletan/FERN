import { fieldRow } from "../configuration.tsx";
import { statusBadge } from "../configuration.tsx";

export default function LaunchHumanReviewSection() {
  return (
    <>
      {/* ── Launch Human Review ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Human Review
          </h2>
          {statusBadge("PENDING SOURCE DEFINITION", "#6b7280")}
        </div>
        <div className="space-y-0 mb-3">
          {fieldRow("Reviewer", "—")}
          {fieldRow("Review Date", "—")}
          {fieldRow("Review Outcome", "—")}
          {fieldRow("Supporting Evidence", "—")}
          {fieldRow("Launch Assurance Review", "—")}
          {fieldRow("Launch Readiness Assessment", "—")}
          {fieldRow("Go-Live Review", "—")}
          {fieldRow("Material Exceptions", "—")}
          {fieldRow("Material Information Gaps", "—")}
          {fieldRow("Material Conflicts", "—")}
          {fieldRow("Outstanding Dependencies", "—")}
          {fieldRow("Conditions / Constraints", "—")}
          {fieldRow("Additional Evidence Required", "—")}
          {fieldRow("Decision Escalation Required where applicable", "—")}
        </div>
        <div className="rounded p-3" style={{ background: "#fef2f2", border: "1px solid #ef4444" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#991b1b" }}>
            AUTHORISED HUMAN REVIEW REQUIRED
          </p>
          <p className="text-xs" style={{ color: "#991b1b" }}>
            Material launch, contractual, procurement, financial, compliance and operational-risk
            decisions remain subject to authorised human review and applicable approval.
          </p>
        </div>
      </div>
    </>
  );
}
