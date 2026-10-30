import { useState } from "react";
import { mapWorkbook, readWorkbook, mergeIntake, type Intake } from "../../../packages/lifecycle-core/src/excelImport.ts";
import type { Project } from "../../../packages/lifecycle-core/src/assetModel.ts";
export default function ExcelIntakePanel({
  project,
  onApply,
}: {
  project: Project;
  onApply: (p: Project, message: string) => void;
}) {
  const [pending, setPending] = useState<Intake | null>(null),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  async function read(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setPending(null);
    setMessage("Reading Excel workbook…");
    try {
      const wb = await readWorkbook(await file.arrayBuffer());
      const intake = mapWorkbook(wb.sheets, file.name, project.site, wb.macros);
      setPending(intake);
      setMessage("Review the detected data below. Nothing has been changed.");
    } catch (e) {
      setMessage(`Import unavailable: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }
  const conflicts =
    pending?.project.assets.filter((a) => project.assets.some((old) => old.id === a.id)) ?? [];
  return (
    <section className="rounded border p-4 bg-blue-50 space-y-3">
      <h3 className="font-bold">Import Excel asset register or classification reference</h3>
      <p className="text-sm">
        Choose a supported asset register template (.xlsx/.xlsm) or the 2026 classification logic and
        levels table. Workbook macros are not run. Confirm that asset files belong to assessment
        site {project.site || "(set the site first)"} before applying.
      </p>
      <input
        aria-label="Choose Excel workbook"
        type="file"
        accept=".xlsx,.xlsm"
        disabled={busy}
        onChange={(e) => {
          void read(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <p role="status" aria-label="Excel import status" className="text-sm">
        {message}
      </p>
      {pending && (
        <>
          <p className="font-semibold">
            {pending.fileName}: {pending.project.assets.length} assets,{" "}
            {pending.project.catalog?.length ?? 0} classification entries
          </p>
          <p className="text-sm">Sheets: {pending.sheets.join(", ")}</p>
          <ul className="list-disc pl-5 text-sm">
            {pending.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
          <p className="text-sm">
            {conflicts.length} existing asset references will retain their edited fields. Missing
            source details can be attached only when reference, code and description match. Existing
            classification data will be replaced if this import contains a classification table.
          </p>
          <div className="overflow-auto max-h-48">
            <table className="text-sm w-full text-left">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {pending.project.assets.slice(0, 20).map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.code}</td>
                    <td>{a.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              className="border rounded bg-white px-3 py-2"
              onClick={() => {
                try {
                  const merged = mergeIntake(project, pending);
                  onApply(
                    merged.project,
                    `Imported ${merged.added} new assets. Retained ${merged.skipped} existing asset records. Save to keep changes.`,
                  );
                  setPending(null);
                } catch (e) {
                  setMessage((e as Error).message);
                }
              }}
            >
              Apply to this assessment
            </button>
            <button
              className="border rounded bg-white px-3 py-2"
              onClick={() => {
                setPending(null);
                setMessage("Import cancelled; assessment unchanged.");
              }}
            >
              Cancel import
            </button>
          </div>
        </>
      )}
    </section>
  );
}
