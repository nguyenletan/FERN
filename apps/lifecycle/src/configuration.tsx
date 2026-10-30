import type { DataStatus } from "../../../packages/platform/src/domain/dataStatus.ts";
import type { SourceStatus } from "../../../packages/platform/src/domain/dataStatus.ts";

export const LIFECYCLE_DATA_CATEGORIES: {
  id: string;
  label: string;
  description: string;
  sourceStatus: SourceStatus;
  dataStatus: DataStatus;
}[] = [
  {
    id: "site",
    label: "Site & Facility",
    description:
      "Site identity, address, country, region, facility type and operating configuration.",
    sourceStatus: "REQUIRES_VALIDATION",
    dataStatus: "REQUIRES_VALIDATION",
  },
  {
    id: "asset-reg",
    label: "Asset Register",
    description:
      "Asset identifier, description, category, system, sub-system, component, location, manufacturer, model, installation date.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "asset-cond",
    label: "Asset Condition",
    description:
      "Current condition, condition assessment date, condition evidence, known defects, deterioration.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "facility-cond",
    label: "Facility Condition",
    description:
      "Facility Condition Assessment, Facility Condition Index where applicable, deferred maintenance.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "criticality",
    label: "Asset Criticality",
    description:
      "Asset criticality, business impact, operational dependency, service impact, safety/compliance consequence.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "maintenance",
    label: "Maintenance Information",
    description:
      "Planned maintenance strategy, preventive and reactive history, failure history, cost, backlog, deferred maintenance.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "service-life",
    label: "Service Life",
    description:
      "Reference service life, source, installation age, remaining-life assumption, expected renewal timing.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "cost",
    label: "Cost Information",
    description:
      "Maintenance, repair, replacement, renewal, labour, materials, external supplier and capital costs.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "risk",
    label: "Risk Information",
    description:
      "Asset risk, failure consequence, operational risk, business impact, compliance risk, known FMEA information.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "compliance",
    label: "Compliance Information",
    description:
      "Applicable FM requirements, mandatory inspection context, evidence status, known compliance constraints.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "financial",
    label: "Financial Assumptions",
    description:
      "Price base date, inflation assumption, discount assumption, analysis period, cost basis.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "evidence",
    label: "Evidence",
    description:
      "Source record, source date, version, status, owner, last validated, evidence confidence.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
];

export type WFState = "done" | "active" | "framework" | "pending";

export const wfStages: {
  id: string;
  label: string;
  state: WFState;
  note: string;
}[] = [
  {
    id: "context",
    label: "Context",
    state: "done",
    note: "Prototype context established",
  },
  {
    id: "data",
    label: "Data",
    state: "active",
    note: "Requires authorised information",
  },
  {
    id: "baseline",
    label: "Asset Baseline",
    state: "framework",
    note: "Available as structured framework",
  },
  {
    id: "assumptions",
    label: "Lifecycle Assumptions",
    state: "pending",
    note: "Pending",
  },
  {
    id: "analysis",
    label: "Lifecycle Analysis",
    state: "pending",
    note: "Pending",
  },
  { id: "scenarios", label: "Scenarios", state: "pending", note: "Pending" },
  { id: "comparison", label: "Comparison", state: "pending", note: "Pending" },
  {
    id: "rec",
    label: "Recommendation",
    state: "pending",
    note: "Not Yet Available",
  },
  {
    id: "decision",
    label: "Human Review / Decision",
    state: "pending",
    note: "Pending",
  },
];

export const wfColor: Record<WFState, string> = {
  done: "#15803d",
  active: "#1a56db",
  framework: "#6d28d9",
  pending: "#9ca3af",
};

export const wfBg: Record<WFState, string> = {
  done: "#f0fdf4",
  active: "#eff6ff",
  framework: "#f5f3ff",
  pending: "#f9fafb",
};

export const wfBorder: Record<WFState, string> = {
  done: "#bbf7d0",
  active: "#bfdbfe",
  framework: "#ddd6fe",
  pending: "#e5e7eb",
};
