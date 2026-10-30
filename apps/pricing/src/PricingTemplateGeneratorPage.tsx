import StaffCostWorkbench from "./StaffCostWorkbench.tsx";
import PricingCalculationOutputSection from "./sections/PricingCalculationOutputSection.tsx";
import PricingContextSection from "./sections/PricingContextSection.tsx";
import PricingFormulaVerificationSection from "./sections/PricingFormulaVerificationSection.tsx";
import PricingHandoverSection from "./sections/PricingHandoverSection.tsx";
import PricingInputsSection from "./sections/PricingInputsSection.tsx";
import PricingMappingAcceptanceSection from "./sections/PricingMappingAcceptanceSection.tsx";
import PricingMappingSection from "./sections/PricingMappingSection.tsx";
import PricingMethodValidationSection from "./sections/PricingMethodValidationSection.tsx";
import PricingReportSection from "./sections/PricingReportSection.tsx";
import PricingReviewSection from "./sections/PricingReviewSection.tsx";
import PricingWorkbookSection from "./sections/PricingWorkbookSection.tsx";
import type { PricingTemplateGeneratorPageProps } from "./types.ts";
import { useState } from "react";

export default function PricingTemplateGeneratorPage({
  site,
  facilityType,
  serviceModel,
  tier,
  region,
}: PricingTemplateGeneratorPageProps) {
  const [pricingReportOpen, setPricingReportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto w-full">
      <header className="rounded-xl bg-blue-950 text-white p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-blue-200">FERN · COST PLANNING</p>
        <h1 className="text-2xl font-bold mt-2">Pricing Template Generator</h1>
        <p className="mt-3 text-sm text-blue-100 leading-relaxed">Build a traceable annual FM cost baseline for your facility. Use it for standalone cost planning and prepare pricing inputs for Lifecycle Analysis and Pre-Contract / Tender Assessment.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded bg-white/10 px-3 py-2">Site: {site}</span><span className="rounded bg-white/10 px-3 py-2">{region} · {facilityType}</span><span className="rounded bg-white/10 px-3 py-2">Provisional assessment</span></div>
      </header>
      <nav aria-label="Pricing sections" className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {[['pricing-basis','1. Basis & sources'],['pricing-staff','2. Staff & teams'],['pricing-extras','3. Costs & maintenance'],['pricing-output','4. Review & save']].map(([id,label])=><a key={id} href={'#'+id} className="rounded-lg border border-slate-200 bg-white p-3 font-medium text-blue-950 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">{label}</a>)}
      </nav>
      <details className="rounded-xl border border-slate-200 bg-white p-4">
        <summary className="font-semibold cursor-pointer text-blue-950">How to use Pricing · User guide</summary>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm text-slate-700">
          <li>Choose the currency and price date (DD-MM-YYYY). Enter all costs on the same currency, price-date and tax basis.</li>
          <li>Import Staff Rate Card or add roles manually. Review source warnings, select included roles, and enter applicable hourly rates with evidence.</li>
          <li>Enter allocated paid hours directly or calculate them from headcount, paid hours per person and FM allocation. These are alternative methods.</li>
          <li>Add overheads and subcontractors. Mark any cost already included elsewhere so it is not added twice.</li>
          <li>Add maintenance tasks with quantity, units covered by the rate, events, first year and repeat interval. Enter labour and materials separately; identify labour already included elsewhere. Tasks can form a standalone baseline without staff rows.</li>
          <li>Review year 1 and the 5/10/15/20/25-year constant-price schedule. Inflation and discounting are not applied here.</li>
          <li>Add actual, tender or benchmark comparisons in Review and save. Match the 12-month period, currency, price date, scope, service level and tax basis; record source and any manual adjustments. Confirm the review again after changing baseline inputs.</li>
          <li>Review subtotals and resolve missing inputs. Save explicitly in this browser; download the calculation record for your records. Restore replaces the current draft.</li>
        </ol>
        <p className="mt-3 text-sm text-slate-600">Worked example: 2 people × 2,000 hours × 50% FM allocation × £40/hour = £80,000. Add £10,000 overhead at 50% allocation to give £85,000. These are illustrative values.</p>
        <p className="mt-3 text-sm text-slate-600">Valid dates allow calculation; missing or impossible dates block it. Currency selection does not convert amounts. Saved data is local to this browser and site. Downloaded records can be restored through a preview. Issue a provisional pricing version for Lifecycle and Pre-Contract to select as a reference in this browser. Automatic aggregation into their calculations remains outstanding. This tool does not approve costs, determine staffing adequacy or provide a complete tender price.</p>
      </details>
      <StaffCostWorkbench key={site} site={site} />
      <details>
        <summary className="cursor-pointer text-sm text-slate-600">
          Planned pricing workflow and governance reference
        </summary>
        <PricingContextSection site={site} facilityType={facilityType} serviceModel={serviceModel} tier={tier} region={region}/>
        <PricingInputsSection site={site} />
        <PricingWorkbookSection />
        <PricingMappingSection />
        <PricingMappingAcceptanceSection />
        <PricingMethodValidationSection />
        <PricingFormulaVerificationSection />
        <PricingCalculationOutputSection />
        <PricingReviewSection />
        <PricingReportSection
          pricingReportOpen={pricingReportOpen}
          setPricingReportOpen={setPricingReportOpen}
        />
        <PricingHandoverSection />
      </details>
    </div>
  );
}
