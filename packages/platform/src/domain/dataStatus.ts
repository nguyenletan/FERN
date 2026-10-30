export const DATA_STATUS_CONFIG = {
  VERIFIED: { label: "Verified", color: "#16a34a", bg: "#f0fdf4" },
  DERIVED: { label: "Derived", color: "#1a56db", bg: "#eff6ff" },
  USER_CONFIRMED: { label: "User Confirmed", color: "#7c3aed", bg: "#f5f3ff" },
  ASSUMPTION: { label: "Assumption", color: "#d97706", bg: "#fffbeb" },
  GAP: { label: "Gap", color: "#9ca3af", bg: "#f9fafb" },
  CONFLICT: { label: "Conflict", color: "#dc2626", bg: "#fef2f2" },
  STALE: { label: "Stale", color: "#92400e", bg: "#fff7ed" },
  REQUIRES_VALIDATION: {
    label: "Requires Validation",
    color: "#d97706",
    bg: "#fffbeb",
  },
} as const;

export type DataStatus = keyof typeof DATA_STATUS_CONFIG;

export const SOURCE_STATUS_CONFIG = {
  CONNECTED: {
    label: "Connected",
    color: "#16a34a",
    bg: "#f0fdf4",
    dot: "#16a34a",
  },
  AVAILABLE: {
    label: "Available",
    color: "#1a56db",
    bg: "#eff6ff",
    dot: "#3b82f6",
  },
  NOT_CONNECTED: {
    label: "Not Connected",
    color: "#9ca3af",
    bg: "#f9fafb",
    dot: "#d1d5db",
  },
  DATA_UNAVAILABLE: {
    label: "Data Unavailable",
    color: "#dc2626",
    bg: "#fef2f2",
    dot: "#dc2626",
  },
  REQUIRES_VALIDATION: {
    label: "Requires Validation",
    color: "#d97706",
    bg: "#fffbeb",
    dot: "#f59e0b",
  },
} as const;

export type SourceStatus = keyof typeof SOURCE_STATUS_CONFIG;
