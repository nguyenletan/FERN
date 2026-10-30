import { useEffect, useRef, useState } from "react";
import FacilityPicker from "../../../packages/platform/src/facilities/FacilityPicker";
import type { Facility } from "../../../packages/platform/src/facilities/facilities";
import FMPreContractAssessmentPage from "./FMPreContractAssessmentPage";

type Context = Pick<Facility, "site" | "country" | "region" | "facilityType" | "serviceModel" | "tier">;
const emptyContext: Context = { site: "", country: "", region: "", facilityType: "", serviceModel: "", tier: "" };

export default function PreContractApp({ onSignOut }: { onSignOut: () => void }) {
  const [facility, setFacility] = useState<Context | null>(null);
  const [choosing, setChoosing] = useState(true);
  const [dirty, setDirty] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [choosing, facility]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white p-4 sm:p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 ref={heading} tabIndex={-1} className="text-xl font-bold text-blue-950">FERN · Pre-Contract Assessment</h1>
          <button className="rounded-lg border border-slate-300 px-4 py-2" onClick={() => {
            if (!dirty || window.confirm("This assessment has unsaved changes. Sign out without saving?")) onSignOut();
          }}>Sign out</button>
        </div>
        <p className="text-sm">Local provisional assessments. Amazon accounts, shared storage and formal approvals are not connected.</p>
        <p className="text-sm">Saved records belong to this browser address. Pricing issued at another application address is not automatically available here.</p>
        {facility ? (
          <div className="space-y-2">
            <p className="break-words"><strong>Selected facility: {facility.site}</strong> · {facility.country || "Country not recorded"} · {facility.facilityType || "Facility type not recorded"}</p>
            {!choosing && <button className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50" disabled={dirty} aria-describedby={dirty ? "facility-change-help" : undefined} onClick={() => setChoosing(true)}>Change facility</button>}
            {dirty && <p id="facility-change-help" className="text-sm">Save your draft or return to the assessment list before changing facility. Your unsaved work stays with this facility.</p>}
          </div>
        ) : <p className="font-medium">Select and confirm a facility before starting or reopening an assessment.</p>}
      </header>
      <div className="mx-auto max-w-7xl p-3 sm:p-6 space-y-5">
        {choosing && <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4" aria-label="Assessment facility selection">
          <FacilityPicker context={facility ?? emptyContext} onSelect={(next) => {
            setFacility(next);
            setChoosing(false);
            setDirty(false);
          }} />
          {facility && <button className="rounded-lg border border-slate-300 px-4 py-2" onClick={() => setChoosing(false)}>Cancel facility change</button>}
        </section>}
        {facility && <div hidden={choosing}>
          <FMPreContractAssessmentPage key={facility.site} site={facility.site} region={facility.region} facilityType={facility.facilityType} onDirtyChange={setDirty} />
        </div>}
      </div>
    </main>
  );
}
