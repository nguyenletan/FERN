import { futureField } from "../configuration.tsx";
import { statusBadge } from "../configuration.tsx";

export default function LaunchDefinitionSection() {
  return (
    <>
      {/* ── Source Information Required ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Information Required
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: "#f1f5f9", color: "#475569" }}
          >
            Information Categories Only
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "#64748b" }}>
          These are information categories only. They do not establish that such documents exist. No
          Amazon document names are displayed unless an authorised source has actually been
          supplied.
        </p>
        <div className="space-y-1">
          {[
            "Launch / Mobilisation Plan",
            "Transition Plan",
            "Implementation Plan",
            "Launch Checklist",
            "Mobilisation Checklist",
            "Readiness Criteria",
            "Governance / Approval Requirements",
            "Responsibility Matrix",
            "Milestone Definition",
            "Dependency Register",
            "Evidence Requirements",
            "Acceptance / Go-Live Criteria",
            "Hypercare / Stabilisation Requirements",
            "Operational Handover Requirements",
          ].map((cat) => (
            <div
              key={cat}
              className="flex items-center justify-between rounded px-3 py-2"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <span className="text-xs" style={{ color: "#475569" }}>
                {cat}
              </span>
              <span className="text-xs font-bold" style={{ color: "#64748b" }}>
                NOT ESTABLISHED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Launch Definition ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Definition
          </h2>
          {statusBadge("INFORMATION REQUIRED", "#1d4ed8")}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Launch / Transition ID",
            "Launch / Transition Name",
            "Site / Context",
            "Facility Type",
            "Service Model",
            "Service Tier",
            "Current Delivery Arrangement",
            "Target Delivery Arrangement",
            "Launch / Transition Type",
            "Business Reason",
            "Scope",
            "Included Services",
            "Excluded Services",
            "Supplier where applicable",
            "Internal Responsibilities where applicable",
            "Planned Start Date",
            "Target Go-Live Date",
            "Transition / Mobilisation Period",
            "Post-Go-Live Period where applicable",
            "Business Owner where available",
            "Operational Owner where available",
            "Commercial / Procurement Context where applicable",
            "Applicable Source",
            "Source Version",
            "Validation Status",
          ].map((f) => futureField(f))}
        </div>
        <p className="text-xs" style={{ color: "#64748b" }}>
          Current values: —
        </p>
      </div>

      {/* ── Launch Requirement Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Requirement Register
          </h2>
          {statusBadge("NONE", "#374151")}
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Provide the future controlled record of requirements that must be tracked for the
          applicable FM mobilisation or transition.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Requirement ID",
            "Requirement",
            "Requirement Category",
            "Source",
            "Source Reference",
            "Source Version",
            "Source Date",
            "Requirement Owner where available",
            "Applicable Site / Context",
            "Applicable Service / Scope",
            "Requirement Type",
            "Mandatory / Conditional Status",
            "Applicability",
            "Dependency",
            "Required Evidence",
            "Acceptance Criterion",
            "Planned Date where established",
            "Actual Date where established",
            "Status",
            "Gap Status",
            "Conflict Status",
            "Human Review Requirement",
            "Validation Status",
            "Supporting Evidence",
          ].map((f) => futureField(f))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#64748b" }}>
            Current Records: NONE
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            No validated FM mobilisation requirements are currently available.
          </p>
        </div>
      </div>

      {/* ── Launch Workflow Definition ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Workflow Definition
          </h2>
          {statusBadge("NOT ESTABLISHED", "#374151")}
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          The applicable launch workflow will be configured only from validated source requirements.
        </p>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Stage Architecture
          </p>
          {[
            "Stage ID",
            "Stage Name",
            "Stage Purpose",
            "Entry Criteria",
            "Applicable Requirements",
            "Activities",
            "Required Inputs",
            "Required Outputs",
            "Dependencies",
            "Required Evidence",
            "Exit Criteria",
            "Approval / Review Requirement",
            "Next Stage",
          ].map((f) => futureField(f))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold" style={{ color: "#64748b" }}>
            Current Records: NONE
          </p>
        </div>
      </div>

      {/* ── Launch Milestone Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Milestone Register
          </h2>
          {statusBadge("NOT AVAILABLE", "#6b7280")}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Milestone ID",
            "Milestone",
            "Stage where applicable",
            "Description",
            "Source Requirement",
            "Owner where available",
            "Dependency",
            "Planned Date",
            "Forecast Date",
            "Actual Date",
            "Required Evidence",
            "Acceptance Criterion",
            "Status",
            "Exception Status",
            "Human Review Requirement",
            "Supporting Evidence",
          ].map((f) => futureField(f))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold" style={{ color: "#64748b" }}>
            Current Records: NONE
          </p>
        </div>
      </div>

      {/* ── Launch Dependency Register ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Launch Dependency Register
          </h2>
          {statusBadge("NOT AVAILABLE", "#6b7280")}
        </div>
        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Fields
          </p>
          {[
            "Dependency ID",
            "Dependency",
            "Dependency Type",
            "Related Requirement",
            "Related Milestone",
            "Source",
            "Owner where available",
            "Required By",
            "Dependency Status",
            "Blocking Status",
            "Impact",
            "Required Action",
            "Resolution Owner where available",
            "Resolution Status",
            "Evidence",
            "Human Review Requirement",
          ].map((f) => futureField(f))}
        </div>
        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold" style={{ color: "#64748b" }}>
            Current Records: NONE
          </p>
        </div>
      </div>
    </>
  );
}
