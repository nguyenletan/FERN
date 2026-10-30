import type { DataStatus } from "../../../packages/platform/src/domain/dataStatus.ts";
import type { SourceStatus } from "../../../packages/platform/src/domain/dataStatus.ts";

export const PRICING_WORKFLOW = [
  { label: "Context", state: "Prototype Context" },
  { label: "Site Classification", state: "Requires Validation" },
  { label: "Asset & Scope", state: "Data Preparation" },
  { label: "Maintenance", state: "Not Ready" },
  { label: "Multi-Year PMs", state: "Not Ready" },
  { label: "Staff Rate Card", state: "Not Ready" },
  { label: "Delivery Teams", state: "Not Ready" },
  { label: "Overheads", state: "Not Ready" },
  { label: "Subcontractors", state: "Not Ready" },
  { label: "Validation", state: "Not Ready" },
  { label: "Cost Summary", state: "Not Available" },
  { label: "Human Review", state: "Pending" },
];

export const PRICING_DATA_CATEGORIES = [
  {
    id: "site-facility",
    label: "Site & Facility",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "site-class",
    label: "Site Classification",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "REQUIRES_VALIDATION" as DataStatus,
  },
  {
    id: "asset-register",
    label: "Asset Register / Asset Scope",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "apm-desc",
    label: "APM Asset Description",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "apm-ocb",
    label: "APM OCB Object Code",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "manufacturer",
    label: "Manufacturer",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "model",
    label: "Model",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "uom",
    label: "Unit of Measurement",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "quantity",
    label: "Asset Quantity",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "maint-scope",
    label: "Maintenance Scope",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "maint-standards",
    label: "Maintenance Standards",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "maint-frequency",
    label: "Maintenance Frequency",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "maint-team",
    label: "Maintenance Delivery Team",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "maint-time",
    label: "Maintenance Time",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "consumables",
    label: "Maintenance Consumables",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "multi-year",
    label: "Multi-Year Maintenance",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "staff-rates",
    label: "Staff / Labour Rates",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "delivery-team",
    label: "Delivery Team",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "overheads",
    label: "Overheads",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "subcontractors",
    label: "Subcontractors",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "mobilisation",
    label: "Mobilisation Cost",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "profit-margin",
    label: "Profit Margin",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "commercial",
    label: "Commercial Comments",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
  {
    id: "evidence",
    label: "Supporting Evidence",
    sourceStatus: "NOT_CONNECTED" as SourceStatus,
    dataStatus: "GAP" as DataStatus,
  },
];
