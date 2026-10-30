import SensitivityPanel from "./SensitivityPanel.tsx";
import {sensitivityResults} from "../../../packages/lifecycle-core/src/sensitivity.ts";
import EconomicAnalysisPanel from "./EconomicAnalysisPanel.tsx";
import {economicProfile} from "../../../packages/lifecycle-core/src/economics.ts";
import {currencies} from "../../../packages/core/src/currencies.ts";
import LifecyclePricingPanel from "./LifecyclePricingPanel.tsx";
import ClassificationPicker from "./ClassificationPicker.tsx";
import ExcelIntakePanel from "./ExcelIntakePanel.tsx";
import AssetStructureEditor from "./AssetStructureEditor.tsx";
import ElementalReportPanel from "./ElementalReportPanel.tsx";
import { useEffect, useMemo, useState } from "react";
import {
  blankAsset,
  calculate,
  emptyProject,
  fields,
  parseProject,
  reportCsv,
  type Asset,
  type Project,
} from "../../../packages/lifecycle-core/src/assetModel.ts";

const legacyStorageKey = "fern.lifecycle.project.v1";
const inputStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: 6,
  padding: "8px 10px",
  width: "100%",
  background: "white",
  color: "#172554",
};
const buttonStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: 6,
  padding: "8px 12px",
  background: "#eff6ff",
  color: "#172554",
  cursor: "pointer",
};
function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function LifecycleWorkbench({ site }: { site: string }) {
  const storageKey = `fern.lifecycle.project.v2.${encodeURIComponent(site)}`;
  const [project, setProject] = useState<Project>(() => emptyProject(site));
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) ?? localStorage.getItem(legacyStorageKey);
      if (saved) {
        const p = parseProject(saved);
        if(p.site!==site)return;
        setProject(p);
        setSelected(p.assets[0]?.id ?? "");
        setMessage("Restored the last saved local project.");
      }
    } catch {
      setMessage(
        "Saved data could not be restored. Import a backup; existing storage has not been overwritten.",
      );
    }
  }, []);
  const result = useMemo(() => calculate(project), [project]);
  const asset = project.assets.find((a) => a.id === selected);
  const visible = project.assets.filter((a) =>
    `${a.id} ${a.code} ${a.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  function update(p: Project) {
    setProject(p);
    setDirty(true);
    setMessage("Changes are not saved.");
  }
  function patchAsset(k: keyof Asset, value: string) {
    update({
      ...project,
      assets: project.assets.map((a) => (a.id === selected ? { ...a, [k]: value } : a)),
    });
  }
  function save() {
    try {
      if(project.site!==site)throw Error("Select the matching facility before saving this project.");
      localStorage.setItem(storageKey, JSON.stringify(project));
      setDirty(false);
      setMessage("Saved on this browser. Download a backup before changing browser or computer.");
    } catch {
      setMessage("Save failed: browser storage is unavailable or full. Download a project backup.");
    }
  }
  async function importFile(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 5_000_000) throw new Error("Import limit is 5 MB.");
      const p = parseProject(await file.text());
      if(p.site!==site)throw Error("Select the matching facility before importing this project.");
      if (
        (dirty || project.assets.length > 0) &&
        !window.confirm(
          "Replace the current project? Download a backup first if you need to retain it.",
        )
      )
        return;
      update(p);
      setSelected(p.assets[0]?.id ?? "");
      setMessage(`Imported ${p.assets.length} assets for ${p.site}. Review and save this project.`);
    } catch (e) {
      setMessage(`Import failed: ${(e as Error).message}`);
    }
  }
  const money = (n: number) =>
    `${project.currency??"GBP"} ${n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  return (
    <section
      className="rounded-xl border bg-white p-5 space-y-4"
      style={{ borderColor: "#cbd5e1" }}
    >
      <div>
        <h2 className="text-lg font-bold" style={{ color: "#0d2464" }}>
          Lifecycle working assessment
        </h2>
        <p className="text-sm text-slate-600">
          Editable local project · {project.assets.length} assets ·{" "}
          {dirty ? "Unsaved changes" : "No unsaved changes"}
        </p>
      </div>
      <p className="text-sm">
        Save changes before leaving this application. Records are saved on this browser only. This
        assessment has its own site ({project.site || "not set"}); the demonstration site selector
        above does not change it. Calculations update when inputs change.
      </p>
      <p className="text-sm rounded bg-blue-50 p-3">
        The asset classification reference is not a complete asset checklist. Source registers may
        cover only selected building systems. Results cover the included assessment records;
        an asset missing from a source is not evidence that it does not exist.
      </p>
      <label className="block text-sm">Lifecycle currency
        <select style={inputStyle} value={project.currency??"GBP"} onChange={e=>update({...project,currency:e.target.value})}>
          <option value="">Select currency</option>{currencies.map(([code,label])=><option key={code} value={code}>{label} — {code}</option>)}
        </select>
      </label>
      <p className="text-sm">Use this currency for all asset and maintenance rates. Changing it does not convert amounts; review existing rates and evidence. Legacy projects retain their original GBP basis. Pricing must use the same currency before costs can be combined.</p>
      <ExcelIntakePanel
        project={project}
        onApply={(p, message) => {
          update(p);
          setSelected(p.assets[0]?.id ?? "");
          setMessage(message);
        }}
      />
      <div className="flex flex-wrap gap-2">
        <button style={buttonStyle} onClick={save}>
          Save project
        </button>
        <button
          style={buttonStyle}
          onClick={() =>
            download(
              "FERN-lifecycle-project.json",
              JSON.stringify(project, null, 2),
              "application/json",
            )
          }
        >
          Download project backup
        </button>
        <details>
          <summary className="cursor-pointer p-2">Restore a saved backup</summary>
          <label style={buttonStyle}>
            Choose FERN backup (.json)
            <input
              aria-label="Choose FERN backup"
              type="file"
              accept=".json,application/json"
              className="block text-xs mt-1"
              onChange={(e) => {
                void importFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </details>
        <button
          style={buttonStyle}
          onClick={() => {
            const id = crypto.randomUUID();
            update({ ...project, assets: [...project.assets, blankAsset(id)] });
            setSelected(id);
          }}
        >
          Add asset
        </button>
      </div>
      <ClassificationPicker
        project={project}
        onAdd={(p, id) => {
          update(p);
          setSelected(id);
        }}
      />
      <p role="status" aria-label="Project save status" className="text-sm font-medium">
        {message}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {(["site", "start", "end"] as const).map((k) => (
          <label key={k} className="text-sm">
            {{ site: "Assessment site", start: "Start year", end: "End year" }[k]}
            <input
              style={inputStyle}
              value={project[k]}
              onChange={(e) => update({ ...project, [k]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <label className="block text-sm">
        Cost basis and scope assumptions
        <textarea
          style={inputStyle}
          value={project.basis}
          onChange={(e) => update({ ...project, basis: e.target.value })}
          placeholder="State price base date, inclusions/exclusions, rate evidence and parent/component scope."
        />
      </label>
      <p className="text-sm p-3 rounded bg-blue-50">
        Initial estimate: {project.currency || "select currency"}, constant prices, undiscounted. Renewal uses direct rates and an
        explicit first event, then RSL × life factors. Events retain fractional timing and are
        grouped into calendar years. Maintenance uses an evidenced task rate × maintenance quantity
        × annual frequency for each full year. No inflation, discounting, on-cost additions or
        condition-to-life assumptions are applied automatically.
      </p>
      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <label className="block text-sm">
            Search assets
            <input style={inputStyle} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <div className="mt-2 space-y-1 overflow-auto" style={{ maxHeight: 420 }}>
            {visible.map((a) => (
              <button
                key={a.id}
                className="block w-full text-left p-2 rounded border text-sm"
                style={{ background: selected === a.id ? "#dbeafe" : "#fff" }}
                onClick={() => setSelected(a.id)}
              >
                {a.description || "New asset"}
                <span className="block text-xs text-slate-600">
                  {a.code || "Code missing"} · {a.id}
                </span>
              </button>
            ))}
            {!visible.length && (
              <p className="text-sm p-2">
                No matching assets. Add an asset or import a FERN project.
              </p>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          {asset ? (
            <>
              <h3 className="font-bold mb-3">Edit asset</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(fields).map(([key, label]) => (
                  <label key={key} className="text-sm">
                    {label}
                    {key === "evidence" ? (
                      <textarea
                        style={inputStyle}
                        value={asset.evidence}
                        onChange={(e) => patchAsset("evidence", e.target.value)}
                      />
                    ) : (
                      <input
                        style={inputStyle}
                        readOnly={key === "id"}
                        value={asset[key as keyof Asset]}
                        onChange={(e) => patchAsset(key as keyof Asset, e.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
              <AssetStructureEditor
                asset={asset}
                project={project}
                onChange={(d) =>
                  update({ ...project, details: { ...project.details, [asset.id]: d } })
                }
              />
              <button
                className="mt-3"
                style={buttonStyle}
                onClick={() => {
                  if (window.confirm("Remove this asset from the working assessment?")) {
                    update({
                      ...project,
                      assets: project.assets.filter((a) => a.id !== selected),
                      details: Object.fromEntries(
                        Object.entries(project.details ?? {}).filter(([id]) => id !== selected),
                      ),
                    });
                    setSelected("");
                  }
                }}
              >
                Remove asset
              </button>
            </>
          ) : (
            <p className="text-sm">
              Select an asset to review its inputs. Blank and TBC values remain missing; enter zero
              only when evidenced.
            </p>
          )}
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="font-bold">Validation and cost profile — included assessment scope</h3>
        {result.issues.length ? (
          <>
            <p className="text-sm text-amber-800">
              Cost totals unavailable — {result.issues.length} records or project settings need
              attention. Each asset shows its first blocking issue; further checks run as you
              correct inputs.
            </p>
            <ul className="text-sm list-disc pl-5 mt-2 overflow-auto" style={{ maxHeight: 220 }}>
              {result.issues.map((i, index) => (
                <li key={index}>
                  {i.id}: {i.message}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="my-2">
              Renewal: <strong>{money(result.renewal!)}</strong> · Maintenance over horizon:{" "}
              <strong>{money(result.maintenance!)}</strong> · Combined:{" "}
              <strong>{money(result.renewal! + result.maintenance!)}</strong>
            </p>
            <p className="text-sm mb-2">
              Calculated estimate — source validity, classification and scope require professional
              review. {result.events.length} renewal events.
            </p>
            <div className="overflow-auto" style={{ maxHeight: 320 }}>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Renewal</th>
                    <th>Maintenance</th>
                    <th>Combined</th>
                  </tr>
                </thead>
                <tbody>
                  {result.years.map((y) => (
                    <tr key={y.year}>
                      <td>{y.year}</td>
                      <td>{money(y.renewal)}</td>
                      <td>{money(y.maintenance)}</td>
                      <td>{money(y.renewal + y.maintenance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            style={buttonStyle}
            disabled={result.issues.length > 0}
            onClick={() =>
              download("FERN-lifecycle-cost-profile.csv", reportCsv(project, result), "text/csv")
            }
          >
            Download cost profile CSV
          </button>
          <button
            style={buttonStyle}
            disabled={result.issues.length > 0}
            onClick={() =>
              download(
                "FERN-lifecycle-calculation-record.json",
                JSON.stringify(
                  {
                    generatedAt: new Date().toISOString(),
                    method: "NRM3 initial R/M estimate v2; selected currency, constant prices, undiscounted",
                    currency: project.currency??"GBP",
                    project,
                    result,
                    sensitivityCases: sensitivityResults(result.issues.length?null:result.years.map(y=>({year:y.year,total:y.renewal+y.maintenance})),project.economics,project.sensitivities??[]),
                    economics: economicProfile(result.issues.length?null:result.years.map(y=>({year:y.year,total:y.renewal+y.maintenance})),project.economics),
                  },
                  null,
                  2,
                ),
                "application/json",
              )
            }
          >
            Download calculation record
          </button>
        </div>
      </div>
      <EconomicAnalysisPanel context={{site:project.site,source:"Asset costs",basis:project.basis}} source="Asset costs" currency={project.currency??"GBP"} years={result.issues.length?null:result.years.map(y=>({year:y.year,total:y.renewal+y.maintenance}))} economics={project.economics} onChange={economics=>update({...project,economics})}/>
      <SensitivityPanel years={result.issues.length?null:result.years.map(y=>({year:y.year,total:y.renewal+y.maintenance}))} baseline={project.economics} cases={project.sensitivities??[]} onChange={sensitivities=>update({...project,sensitivities})} currency={project.currency??"GBP"} context={{site:project.site,source:"Asset costs",basis:project.basis}}/>
      <LifecyclePricingPanel key={project.site} site={project.site} project={project}/>
      <ElementalReportPanel
        project={project}
        result={result}
        onMetadata={(metadata) => update({ ...project, metadata })}
      />
    </section>
  );
}
