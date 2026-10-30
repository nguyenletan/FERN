import LifecycleWorkbench from "./LifecycleWorkbench.tsx";
import LifecycleCalculationsSection from "./sections/LifecycleCalculationsSection.tsx";
import LifecycleComparisonSection from "./sections/LifecycleComparisonSection.tsx";
import LifecycleConfigurationSection from "./sections/LifecycleConfigurationSection.tsx";
import LifecycleContextSection from "./sections/LifecycleContextSection.tsx";
import LifecycleDataPreparationSection from "./sections/LifecycleDataPreparationSection.tsx";
import LifecycleDecisionSection from "./sections/LifecycleDecisionSection.tsx";
import LifecycleEventsSection from "./sections/LifecycleEventsSection.tsx";
import LifecycleHandoverSection from "./sections/LifecycleHandoverSection.tsx";
import LifecycleReportSection from "./sections/LifecycleReportSection.tsx";
import LifecycleScenariosSection from "./sections/LifecycleScenariosSection.tsx";
import LifecycleSensitivitySection from "./sections/LifecycleSensitivitySection.tsx";
import type { LifecycleAssetAnalysisPageProps } from "./types.ts";
import { useState } from "react";

export default function LifecycleAssetAnalysisPage({
  site,
  facilityType,
  serviceModel,
  tier,
  region,
  onNavigate,
}: LifecycleAssetAnalysisPageProps) {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="space-y-5">
      <header className="rounded-xl border bg-white p-5">
        <h1 className="text-xl font-bold" style={{ color: "#0d2464" }}>
          Lifecycle &amp; Asset Analysis
        </h1>
        <p className="text-sm mt-2">
          Asset renewal and maintenance assessment. Review asset evidence, complete the inputs and
          save your project.
        </p>
      </header>
      <LifecycleWorkbench site={site} />
      <details>
        <summary className="cursor-pointer font-semibold">
          Planned workflow and governance reference (not connected to this working assessment)
        </summary>
        <LifecycleContextSection
          site={site}
          facilityType={facilityType}
          serviceModel={serviceModel}
          tier={tier}
          region={region}
        />
        <LifecycleDataPreparationSection />
        <LifecycleConfigurationSection site={site} />
        <LifecycleEventsSection />
        <LifecycleCalculationsSection />
        <LifecycleSensitivitySection />
        <LifecycleScenariosSection />
        <LifecycleComparisonSection />
        <LifecycleDecisionSection />
        <LifecycleReportSection reportOpen={reportOpen} setReportOpen={setReportOpen} />
        <LifecycleHandoverSection />
      </details>
    </div>
  );
}
