import type { DataStatus } from "../../../packages/platform/src/domain/dataStatus.ts";
import type { SourceStatus } from "../../../packages/platform/src/domain/dataStatus.ts";

export const DATA_CATEGORIES: {
  id: string;
  label: string;
  description: string;
  sourceStatus: SourceStatus;
  dataStatus: DataStatus;
}[] = [
  {
    id: "site",
    label: "Site & Facility",
    description: "Site identity, facility type, location and configuration.",
    sourceStatus: "REQUIRES_VALIDATION",
    dataStatus: "REQUIRES_VALIDATION",
  },
  {
    id: "contract",
    label: "Existing Contract",
    description: "Current FM contract terms, scope, parties and renewal context.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "cost",
    label: "Current FM Cost",
    description: "Authorised current FM expenditure, budget and cost breakdown.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "scope",
    label: "FM Service Scope",
    description:
      "Current service delivery scope, inclusions, exclusions and performance requirements.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "asset",
    label: "Asset Information",
    description: "Asset register, asset types, condition and maintenance history.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "condition",
    label: "Facility Condition",
    description: "Facility condition index, survey results and structural state.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "maintenance",
    label: "Maintenance Information",
    description: "Planned and reactive maintenance records and compliance.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "risk",
    label: "Risk Information",
    description: "Identified FM risks, risk register and active risk controls.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "compliance",
    label: "Compliance Information",
    description: "Statutory compliance obligations, certificates and outstanding actions.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "procurement",
    label: "Procurement / Commercial",
    description: "Procurement route, commercial strategy and authorised approvals.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "financial",
    label: "Financial Information",
    description: "Financial approvals, budget authorities and financial constraints.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "lifecycle",
    label: "Lifecycle Information",
    description: "Lifecycle plans, capital forecasts and planned replacement schedules.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
  {
    id: "evidence",
    label: "Evidence",
    description: "Supporting evidence, reports and authorised documentation.",
    sourceStatus: "NOT_CONNECTED",
    dataStatus: "GAP",
  },
];

export type WorkflowState = "done" | "requires" | "framework" | "pending";

export const workflowStages: {
  id: string;
  label: string;
  state: WorkflowState;
  note: string;
}[] = [
  {
    id: "context",
    label: "Context",
    state: "done",
    note: "Established prototype context",
  },
  {
    id: "data",
    label: "Data",
    state: "requires",
    note: "Requires authorised information",
  },
  {
    id: "baseline",
    label: "Baseline",
    state: "framework",
    note: "Available as structured framework",
  },
  {
    id: "scenarios",
    label: "Scenarios",
    state: "framework",
    note: "Available as structured framework",
  },
  {
    id: "comparison",
    label: "Comparison",
    state: "framework",
    note: "Available as structured framework",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    state: "pending",
    note: "Pending evidence-supported analysis",
  },
  {
    id: "decision",
    label: "Decision",
    state: "pending",
    note: "Pending authorised human review",
  },
];

export const stageColor: Record<WorkflowState, string> = {
  done: "#15803d",
  requires: "#d97706",
  framework: "#6d28d9",
  pending: "#9ca3af",
};

export const stageBg: Record<WorkflowState, string> = {
  done: "#f0fdf4",
  requires: "#fffbeb",
  framework: "#f5f3ff",
  pending: "#f9fafb",
};

export const stageBorder: Record<WorkflowState, string> = {
  done: "#bbf7d0",
  requires: "#fde68a",
  framework: "#ddd6fe",
  pending: "#e5e7eb",
};
