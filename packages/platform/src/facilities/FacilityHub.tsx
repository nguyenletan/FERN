import FacilityPicker from "./FacilityPicker.tsx";
import { useState } from "react";
import {
  addFacility,
  readFacilities,
  discoverSites,
  facilityHistory,
  type Facility,
} from "./facilities.ts";
type Context = {
  site: string;
  country: string;
  region: string;
  facilityType: string;
  serviceModel: string;
  tier: string;
};
const field = "border border-slate-300 rounded-lg p-2 bg-white w-full";
export default function FacilityHub({
  context,
  onSelect,
  onNavigate,
}: {
  context: Context;
  onSelect: (f: Context) => void;
  onNavigate: (name: string) => void;
}) {
  const [tick, setTick] = useState(0);
  let history: ReturnType<typeof facilityHistory> = [];
  let historyError = "";
  try {
    history = facilityHistory(localStorage, context.site);
  } catch (e) {
    historyError = (e as Error).message;
  }
  return (
    <section
      className="mb-5 rounded-xl border border-slate-200 bg-white p-5 space-y-3"
      aria-label="Shared facility workspace"
    >
      <FacilityPicker context={context} onSelect={onSelect} />
      {historyError && <p role="alert">{historyError}</p>}
      <details>
        <summary className="font-semibold cursor-pointer">
          Facility history — inputs and saved records (
          {history.reduce((n, g) => n + g.records.length, 0)})
        </summary>
        <p className="my-3">
          Read-only records from this browser address. Open the owning tool to continue or choose a
          pricing version. Nothing is copied into a new assessment automatically. Missing timestamps
          mean the age is unknown; saved data is not domain approval.
        </p>
        <button className={field} onClick={() => setTick(tick + 1)}>
          Refresh facility history
        </button>
        {history.map((g) => (
          <section key={g.title} className="border rounded-lg p-3 my-3">
            <h3 className="font-semibold">
              {g.title} · {g.records.length}
            </h3>
            {g.error ? (
              <p role="alert">Unavailable: {g.error}. Stored data retained.</p>
            ) : g.records.length === 0 ? (
              <p>No saved records available for this facility.</p>
            ) : (
              g.records.map((r, i) => (
                <details key={String(r.id ?? i)} className="my-2">
                  <summary>
                    {String(r.name ?? "Record " + (i + 1))} ·{" "}
                    {String(r.savedAt ?? r.issuedAt ?? "Save date not recorded")} · Provisional
                  </summary>
                  <p>
                    Source: {g.title} in this browser. Review applicability and current evidence
                    before reuse.
                  </p>
                  <pre className="overflow-auto max-h-80 whitespace-pre-wrap break-words bg-slate-50 p-3 text-sm">
                    {JSON.stringify(r, null, 2)}
                  </pre>
                </details>
              ))
            )}
            <button className="text-blue-800 underline" onClick={() => onNavigate(g.destination)}>
              Open {g.destination}
            </button>
          </section>
        ))}
        <p>
          Contract history, APM maintenance/failure records, formal decisions and approved reports
          have no connected historical store yet. This panel does not calculate or approve results.
        </p>
      </details>
    </section>
  );
}
