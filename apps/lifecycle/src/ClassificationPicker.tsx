import { useState } from "react";
import { blankAsset, type Project } from "../../../packages/lifecycle-core/src/assetModel.ts";
import { emptyDetail, type Classification } from "../../../packages/lifecycle-core/src/nrmStructure.ts";
export default function ClassificationPicker({
  project,
  onAdd,
}: {
  project: Project;
  onAdd: (p: Project, id: string) => void;
}) {
  const [query, setQuery] = useState("");
  if (!project.catalog?.length) return null;
  const matches = project.catalog
    .filter((c) =>
      `${c.code} ${c.group} ${c.element} ${c.subElement} ${c.assetType} ${c.product}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 25);
  function add(c: Classification) {
    if (project.assets.length >= 5000) return;
    const id = crypto.randomUUID();
    const a = {
      ...blankAsset(id),
      code: c.code,
      description: c.product || c.assetType || c.subElement || c.element || c.group,
      unit: c.renewalUnit,
      maintenanceUnit: c.maintenanceUnit,
      evidence: `Classification: ${project.catalogSource}. Physical asset details and applicability require review.`,
    };
    onAdd(
      {
        ...project,
        assets: [...project.assets, a],
        details: {
          ...project.details,
          [id]: {
            ...emptyDetail(),
            level: c.level,
            group: c.group,
            element: c.element,
            subElement: c.subElement,
            product: c.product,
            source: project.catalogSource ?? "",
          },
        },
      },
      id,
    );
  }
  return (
    <details className="border rounded p-3">
      <summary className="font-semibold cursor-pointer">
        Add an asset from the asset classification hierarchy ({project.catalog.length} entries)
      </summary>
      <p className="text-sm mt-2">
        Select the most specific applicable classification. Each selection creates one editable
        asset record. Review parent/component scope before counting costs.
      </p>
      <label className="text-sm">
        Search asset classifications
        <input
          className="block border rounded p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="max-h-60 overflow-auto">
        {matches.map((c) => (
          <button
            key={c.code}
            className="block text-left w-full border-b p-2 text-sm"
            disabled={project.assets.length >= 5000}
            onClick={() => add(c)}
          >
            {c.code} — {c.product || c.assetType || c.subElement || c.element || c.group}
          </button>
        ))}
      </div>
      <p className="text-xs">Showing up to 25 matching entries. Source: {project.catalogSource}</p>
    </details>
  );
}
