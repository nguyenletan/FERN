import type { Project } from "./assetModel.ts";
export interface Classification {
  code: string;
  level: string;
  group: string;
  element: string;
  subElement: string;
  assetType: string;
  product: string;
  renewalUnit: string;
  maintenanceUnit: string;
  workPackage: string;
}
export interface Task {
  id: string;
  description: string;
  standard: string;
  reference: string;
  quantity: string;
  unit: string;
  rate: string;
  frequency: string;
  source: string;
}
export interface AssetDetail {
  level: string;
  group: string;
  element: string;
  subElement: string;
  product: string;
  location: string;
  installed: string;
  condition: string;
  oemLife: string;
  cibseLife: string;
  parentId: string;
  renewalScope: boolean;
  maintenanceScope: boolean;
  tasks: Task[];
  source: string;
  sourceCells: Record<string, { value: string; formula: string }>;
}
export interface Metadata {
  title: string;
  planNumber: string;
  priceBaseDate: string;
  gifa: string;
  maintainableArea: string;
  functionalUnit: string;
  classification: string;
  hours: string;
  storeys: string;
  locationIndex: string;
}
export const metadataLabels: Record<keyof Metadata, string> = {
  title: "Project title",
  planNumber: "Cost plan number",
  priceBaseDate: "Price base date",
  gifa: "GIFA (m²)",
  maintainableArea: "Maintainable area (m²)",
  functionalUnit: "Functional unit",
  classification: "Asset classification",
  hours: "Operating hours",
  storeys: "Number of storeys",
  locationIndex: "Location / BCIS index reference",
};
export function emptyMetadata(): Metadata {
  return Object.fromEntries(Object.keys(metadataLabels).map((k) => [k, ""])) as unknown as Metadata;
}
export function emptyDetail(): AssetDetail {
  return {
    level: "",
    group: "",
    element: "",
    subElement: "",
    product: "",
    location: "",
    installed: "",
    condition: "",
    oemLife: "",
    cibseLife: "",
    parentId: "",
    renewalScope: true,
    maintenanceScope: true,
    tasks: [],
    source: "",
    sourceCells: {},
  };
}
export function validateExtensions(p: Project) {
  const text = (x: unknown) => typeof x === "string";
  if (
    p.metadata &&
    !Object.keys(metadataLabels).every((k) => text(p.metadata![k as keyof Metadata]))
  )
    throw new Error("Invalid report metadata.");
  if (
    p.catalog &&
    (!Array.isArray(p.catalog) ||
      p.catalog.length > 10000 ||
      p.catalog.some(
        (c) =>
          !c ||
          ![
            "code",
            "level",
            "group",
            "element",
            "subElement",
            "assetType",
            "product",
            "renewalUnit",
            "maintenanceUnit",
            "workPackage",
          ].every((k) => text(c[k as keyof Classification])),
      ))
  )
    throw new Error("Invalid classification catalog.");
  if (p.details) {
    if (typeof p.details !== "object" || Array.isArray(p.details))
      throw new Error("Invalid asset details.");
    for (const [id, d] of Object.entries(p.details)) {
      if (
        !p.assets.some((a) => a.id === id) ||
        !d ||
        ![
          "level",
          "group",
          "element",
          "subElement",
          "product",
          "location",
          "installed",
          "condition",
          "oemLife",
          "cibseLife",
          "parentId",
          "source",
        ].every((k) => text(d[k as keyof AssetDetail])) ||
        typeof d.renewalScope !== "boolean" ||
        typeof d.maintenanceScope !== "boolean" ||
        !Array.isArray(d.tasks) ||
        d.tasks.length > 1000 ||
        d.tasks.some(
          (t) =>
            !t ||
            ![
              "id",
              "description",
              "standard",
              "reference",
              "quantity",
              "unit",
              "rate",
              "frequency",
              "source",
            ].every((k) => text(t[k as keyof Task])),
        ) ||
        !d.sourceCells ||
        typeof d.sourceCells !== "object" ||
        Object.values(d.sourceCells).some((c) => !c || !text(c.value) || !text(c.formula))
      )
        throw new Error("Invalid structured asset details.");
    }
  }
  if (p.catalogSource !== undefined && !text(p.catalogSource))
    throw new Error("Invalid catalog source.");
}
