import { useState } from "react";
import type { Project, Result } from "../../../packages/lifecycle-core/src/assetModel.ts";
import { emptyMetadata, metadataLabels, type Metadata } from "../../../packages/lifecycle-core/src/nrmStructure.ts";
import { elementalCsv, elementalRows } from "../../../packages/lifecycle-core/src/elementalReports.ts";
export default function ElementalReportPanel({
  project,
  result,
  onMetadata,
}: {
  project: Project;
  result: Result;
  onMetadata: (m: Metadata) => void;
}) {
  const [level, setLevel] = useState<1 | 2>(1),
    [message, setMessage] = useState("");
  const metadata = project.metadata ?? emptyMetadata();
  let rows: ReturnType<typeof elementalRows> = [],
    gap = "";
  try {
    rows = elementalRows(project, result, level);
  } catch (e) {
    gap = (e as Error).message;
  }
  function exportReport() {
    try {
      const csv = elementalCsv(project, result, level);
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `FERN-Appendix-${level === 1 ? "E" : "F"}-elemental-plan.csv`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("Report generated. Check the browser downloads.");
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  return (
    <section className="border-t pt-4 space-y-3">
      <h3 className="font-bold">Elemental renewal and maintenance reports</h3>
      <p className="text-sm">
        Draft Appendix E/F data structure. Reports include scoped groups only, with R and M shown
        separately. No report is labelled professionally approved.
      </p>
      <details>
        <summary className="cursor-pointer">Report project information</summary>
        <div className="grid gap-3 sm:grid-cols-2 mt-3">
          {Object.entries(metadataLabels).map(([key, label]) => (
            <label key={key} className="text-sm">
              {label}
              <input
                className="block w-full border rounded p-2"
                value={metadata[key as keyof Metadata]}
                onChange={(e) => onMetadata({ ...metadata, [key]: e.target.value })}
              />
            </label>
          ))}
        </div>
      </details>
      <label className="text-sm">
        Report level{" "}
        <select
          className="border rounded p-2"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as 1 | 2)}
        >
          <option value="1">Appendix E — Level 1 group elements</option>
          <option value="2">Appendix F — Level 2 elements</option>
        </select>
      </label>
      {gap ? (
        <p className="text-sm text-amber-800">{gap}</p>
      ) : (
        <div className="overflow-auto max-h-64">
          <table className="text-sm w-full text-left">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Year</th>
                <th>Renewal {project.currency??"GBP"}</th>
                <th>Maintain {project.currency??"GBP"}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code + ":" + r.year}>
                  <td>{r.code}</td>
                  <td>{r.name}</td>
                  <td>{r.year}</td>
                  <td>{r.renewal.toFixed(2)}</td>
                  <td>{r.maintenance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="border rounded px-3 py-2 disabled:opacity-50"
        disabled={!!gap}
        onClick={exportReport}
      >
        Download elemental report CSV
      </button>
      <p role="status" aria-label="Elemental report status" className="text-sm">
        {message}
      </p>
    </section>
  );
}
