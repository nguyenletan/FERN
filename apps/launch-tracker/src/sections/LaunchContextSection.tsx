import InfoIcon from "../../../../packages/platform/src/components/ui/InfoIcon.tsx";
import { futureField } from "../configuration.tsx";
import { statusBadge } from "../configuration.tsx";

export default function LaunchContextSection({
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
      {/* ── Header ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-lg font-bold" style={{ color: "#0f172a" }}>
            FM Mobilisation & Transition Tracker
          </h1>
          {statusBadge("Prototype Context — Demonstration Only", "#6b7280")}
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          Provide a controlled FERN workspace for preparing, tracking and assuring an FM mobilisation or
          transition once the applicable launch requirements, responsibilities, milestones,
          dependencies, evidence and acceptance criteria have been established from authorised
          sources.
        </p>
        <p className="text-xs mb-4" style={{ color: "#475569" }}>
          FERN supports launch governance, assurance and decision support. Operational mobilisation
          activities remain executed by the responsible operational teams and suppliers.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            className="rounded p-2"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
          >
            <p className="text-xs mb-1" style={{ color: "#64748b" }}>
              Application Readiness
            </p>
            <p className="text-xs font-bold" style={{ color: "#92400e" }}>
              SOURCE DEFINITION
            </p>
          </div>
          <div
            className="rounded p-2"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
          >
            <p className="text-xs mb-1" style={{ color: "#64748b" }}>
              Manual Task Tracking
            </p>
            <p className="text-xs font-bold" style={{ color: "#1e40af" }}>
              AVAILABLE — PROVISIONAL
            </p>
          </div>
          <div
            className="rounded p-2"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
          >
            <p className="text-xs mb-1" style={{ color: "#64748b" }}>
              Launch Plan Register
            </p>
            <p className="text-xs font-bold" style={{ color: "#1e40af" }}>
              MANUAL ENTRY AVAILABLE
            </p>
          </div>
          <div
            className="rounded p-2"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
          >
            <p className="text-xs mb-1" style={{ color: "#64748b" }}>
              Launch Readiness
            </p>
            <p className="text-xs font-bold" style={{ color: "#64748b" }}>
              NOT ASSESSED
            </p>
          </div>
        </div>
        <div
          className="mt-3 rounded p-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs" style={{ color: "#475569" }}>
            The manual launch-plan register below is available. Controlled source requirements,
            readiness assessment and formal launch approvals are not yet configured.
          </p>
          <p className="text-xs mt-1" style={{ color: "#64748b" }}>
            This is an application-readiness state. It is not a finding about an actual Site launch,
            mobilisation, supplier or transition.
          </p>
        </div>
      </div>

      {/* ── Working Context ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Working Context
          </h2>
          {statusBadge("Prototype Context — Demonstration Only", "#6b7280")}
        </div>
        <div className="space-y-0">
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Site{" "}
              <InfoIcon
                label="Site"
                text="The facility currently in scope. The current prototype value is demonstration context only and is not validated production configuration."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              {site || "—"}
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Country / Region{" "}
              <InfoIcon
                label="Country / Region"
                text="The geographic context associated with the selected facility. Regional context may affect applicable launch or transition requirements once validated sources are available."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              {region || "—"}
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Facility Type{" "}
              <InfoIcon
                label="Facility Type"
                text="The facility classification associated with the current context. Facility type may affect applicable launch requirements where a controlled source establishes that relationship."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              {facilityType || "—"}
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Current Service Model{" "}
              <InfoIcon
                label="Current Service Model"
                text="The FM delivery approach associated with the current prototype context. Its presence does not establish that an FM mobilisation or transition is currently occurring."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              {serviceModel || "—"}
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Service Tier{" "}
              <InfoIcon
                label="Service Tier"
                text="The service-provisioning level associated with the current prototype context. It must not be used to infer launch requirements without controlled evidence."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              {tier || "—"}
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Launch / Transition Context{" "}
              <InfoIcon
                label="Launch / Transition Context"
                text="Defines the specific launch, mobilisation or transition being tracked. No applicable launch or transition context has yet been established."
              />
            </span>
            <span className="text-xs mr-2" style={{ color: "#64748b" }}>
              —
            </span>
            <span
              className="inline-block text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "#1d4ed8", color: "#fff" }}
            >
              INFORMATION REQUIRED
            </span>
          </div>
          <div
            className="flex items-start gap-2 py-1"
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <span
              className="flex items-center gap-1 text-xs w-56 shrink-0"
              style={{ color: "#475569" }}
            >
              Application Status{" "}
              <InfoIcon
                label="Application Status"
                text="Shows whether sufficient controlled source information exists to configure the Launch Tracker. The current state is Source Definition."
              />
            </span>
            <span className="text-xs" style={{ color: "#334155" }}>
              SOURCE DEFINITION
            </span>
          </div>
        </div>
        <p className="text-xs mt-2" style={{ color: "#64748b" }}>
          Service Model displayed is a prototype context value. It does not indicate that an FM
          mobilisation or transition is occurring.
        </p>
      </div>

      {/* ── Source Readiness ── */}
      <div
        className="rounded-lg p-4"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Source Readiness
          </h2>
          {statusBadge("NOT READY", "#ef4444")}
        </div>
        <p className="text-xs mb-3" style={{ color: "#475569" }}>
          FERN requires controlled source information defining the applicable FM mobilisation or
          transition before launch-tracking requirements can be configured.
        </p>

        <div
          className="rounded p-3 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
            Future Source Register — Field Architecture
          </p>
          <div className="grid grid-cols-1 gap-0">
            {[
              "Source ID",
              "Source Title",
              "Source Type",
              "Document / Record Reference",
              "Version",
              "Date",
              "Status",
              "Owner where available",
              "Applicable Region",
              "Applicable Site / Facility Type",
              "Applicable Service Model",
              "Applicable Launch / Transition Type",
              "Requirement Area",
              "Source Location",
              "Supersession Status",
              "Validation Status",
              "Supporting Evidence",
            ].map((f) => futureField(f))}
          </div>
        </div>

        <div className="rounded p-3" style={{ background: "#f8fafc", border: "1px solid #7f1d1d" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#b91c1c" }}>
            Current Records: NONE
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            No controlled FM mobilisation or transition source has currently been established for
            configuration of this application.
          </p>
        </div>
      </div>
    </>
  );
}
