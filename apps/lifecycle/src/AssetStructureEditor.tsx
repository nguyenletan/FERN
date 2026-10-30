import { emptyDetail, type AssetDetail, type Task } from "../../../packages/lifecycle-core/src/nrmStructure.ts";
import type { Asset, Project } from "../../../packages/lifecycle-core/src/assetModel.ts";
const style = {
  border: "1px solid #cbd5e1",
  borderRadius: 5,
  padding: 7,
  width: "100%",
  background: "white",
};
const labels = {
  level: "Classification level",
  group: "Group element (L1)",
  element: "Element (L2)",
  subElement: "Sub-element (L3)",
  product: "Product/material (L5)",
  location: "Asset location",
  installed: "Installation year",
  condition: "Condition rating",
  oemLife: "Original OEM life",
  cibseLife: "Original CIBSE life",
  parentId: "Parent asset reference",
};
export default function AssetStructureEditor({
  asset,
  project,
  onChange,
}: {
  asset: Asset;
  project: Project;
  onChange: (d: AssetDetail) => void;
}) {
  const detail = project.details?.[asset.id] ?? emptyDetail();
  const catalog = project.catalog?.find((c) => c.code === asset.code);
  function taskChange(id: string, key: keyof Task, value: string) {
    onChange({
      ...detail,
      tasks: detail.tasks.map((t) => (t.id === id ? { ...t, [key]: value } : t)),
    });
  }
  return (
    <div className="border-t mt-4 pt-4 space-y-3">
      <h3 className="font-bold">Asset structure and source evidence</h3>
      <p className="text-sm">
        {project.catalog?.length
          ? catalog
            ? `Code found in loaded reference: ${catalog.assetType || catalog.subElement || catalog.element || catalog.group}. Verify that it describes this asset.`
            : "Code is absent from the loaded reference. Review mapping before reporting."
          : "Load the 2026 logic and levels workbook to check classifications."}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.entries(labels).map(([key, label]) => (
          <label className="text-sm" key={key}>
            {label}
            <input
              style={style}
              value={detail[key as keyof typeof labels]}
              onChange={(e) => onChange({ ...detail, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        {(["renewalScope", "maintenanceScope"] as const).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={detail[key]}
              onChange={(e) => onChange({ ...detail, [key]: e.target.checked })}
            />{" "}
            {key === "renewalScope" ? "Include renewal costs" : "Include maintenance costs"}
          </label>
        ))}
      </div>
      <h3 className="font-bold">Maintenance tasks</h3>
      <p className="text-sm">
        When tasks are present, their costs replace the single maintenance rate fields above. Each
        task needs its own quantity, rate, frequency and source. Only direct task-rate costing is
        enabled.
      </p>
      {detail.tasks.map((t) => (
        <fieldset key={t.id} className="border rounded p-3">
          <legend>{t.description || "Maintenance task"}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries({
              description: "Task description",
              standard: "Standard",
              reference: "Task reference",
              quantity: "Task quantity",
              unit: "Task unit",
              rate: "Task rate (selected currency/unit/visit)",
              frequency: "Task annual frequency",
              source: "Task source",
            }).map(([key, label]) => (
              <label key={key} className="text-sm">
                {label}
                <input
                  style={style}
                  value={t[key as keyof Task]}
                  onChange={(e) => taskChange(t.id, key as keyof Task, e.target.value)}
                />
              </label>
            ))}
          </div>
          <button
            className="border rounded p-2 mt-2"
            onClick={() => {
              if (window.confirm("Remove this maintenance task?"))
                onChange({ ...detail, tasks: detail.tasks.filter((x) => x.id !== t.id) });
            }}
          >
            Remove task
          </button>
        </fieldset>
      ))}
      <button
        className="border rounded p-2"
        onClick={() =>
          onChange({
            ...detail,
            tasks: [
              ...detail.tasks,
              {
                id: crypto.randomUUID(),
                description: "",
                standard: "",
                reference: "",
                quantity: "",
                unit: "",
                rate: "",
                frequency: "",
                source: "",
              },
            ],
          })
        }
      >
        Add maintenance task
      </button>
      <details>
        <summary className="cursor-pointer">Original Excel values and formulas</summary>
        <p className="text-sm">
          {detail.source ||
            "No Excel source attached. Original life assertions require selection and evidence before use."}
        </p>
        <div className="overflow-auto max-h-64">
          <table className="text-xs">
            <thead>
              <tr>
                <th>Cell</th>
                <th>Original / cached value</th>
                <th>Formula (not executed)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detail.sourceCells).map(([ref, c]) => (
                <tr key={ref}>
                  <td>{ref}</td>
                  <td>{c.value}</td>
                  <td>{c.formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
