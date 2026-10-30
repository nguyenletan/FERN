import LaunchPlanWorkbench from "./LaunchPlanWorkbench";
import LaunchAssessmentSection from "./sections/LaunchAssessmentSection.tsx";
import LaunchAssuranceSection from "./sections/LaunchAssuranceSection.tsx";
import LaunchConfigurationSection from "./sections/LaunchConfigurationSection.tsx";
import LaunchContextSection from "./sections/LaunchContextSection.tsx";
import LaunchDecisionSection from "./sections/LaunchDecisionSection.tsx";
import LaunchDefinitionSection from "./sections/LaunchDefinitionSection.tsx";
import LaunchExecutionAssuranceSection from "./sections/LaunchExecutionAssuranceSection.tsx";
import LaunchExecutionSection from "./sections/LaunchExecutionSection.tsx";
import LaunchHumanReviewSection from "./sections/LaunchHumanReviewSection.tsx";
import LaunchReadinessSection from "./sections/LaunchReadinessSection.tsx";
import LaunchReportSection from "./sections/LaunchReportSection.tsx";
import LaunchRequirementExtractionSection from "./sections/LaunchRequirementExtractionSection.tsx";
import LaunchResponsibilitiesSection from "./sections/LaunchResponsibilitiesSection.tsx";
import LaunchSourceIntakeSection from "./sections/LaunchSourceIntakeSection.tsx";
import LaunchTraceabilitySection from "./sections/LaunchTraceabilitySection.tsx";
import type { IFMLaunchTrackerPageProps } from "./types.ts";
import { useState } from "react";

export default function IFMLaunchTrackerPage({
  onDirtyChange,
  site,
  facilityType,
  serviceModel,
  tier,
  region,
}: IFMLaunchTrackerPageProps) {
  const [launchReportOpen, setLaunchReportOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ background: "#ffffff" }}>
      <header className="space-y-2"><h1 className="text-2xl font-bold text-blue-950">FM Mobilisation &amp; Transition Tracker</h1><p className="text-slate-700">Plan the change. Coordinate actions. Keep handover work visible.</p><p className="text-sm text-slate-600">Demonstration context · Provisional records · Completion is not approval.</p></header>
      <LaunchPlanWorkbench onDirtyChange={onDirtyChange} key={site} site={site} region={region} facilityType={facilityType}/>
      <details className="rounded-xl border p-4"><summary className="text-slate-900 cursor-pointer font-semibold">About readiness and approvals — planned governance</summary>
      <LaunchContextSection site={site} facilityType={facilityType} serviceModel={serviceModel} tier={tier} region={region}/>
      <LaunchSourceIntakeSection />
      <LaunchRequirementExtractionSection />
      <LaunchConfigurationSection />
      <LaunchResponsibilitiesSection />
      <LaunchExecutionSection />
      <LaunchExecutionAssuranceSection />
      <LaunchAssuranceSection />
      <LaunchTraceabilitySection />
      <LaunchDefinitionSection />
      <LaunchReadinessSection />
      <LaunchAssessmentSection />
      <LaunchHumanReviewSection />
      <LaunchDecisionSection />
      <LaunchReportSection
        launchReportOpen={launchReportOpen}
        setLaunchReportOpen={setLaunchReportOpen}
      />
      </details>
    </div>
  );
}
