export const classificationHelp: Record<string, string> = {
  FACT: "Information directly supported by available authorised evidence.",
  RECOMMENDATION:
    "A suggested course of action based on the available evidence. It does not represent an automatic approval or decision.",
  ASSUMPTION: "Information used to support the analysis that has not yet been confirmed.",
  GAP: "Information required for the analysis that FERN cannot currently establish from available authorised evidence.",
  CONFLICT:
    "Two or more available sources provide incompatible or inconsistent information that requires review.",
};

export const classificationStyle: Record<string, { bg: string; color: string }> = {
  FACT: { bg: "#eff6ff", color: "#1a56db" },
  RECOMMENDATION: { bg: "#f0fdf4", color: "#16a34a" },
  ASSUMPTION: { bg: "#fffbeb", color: "#d97706" },
  GAP: { bg: "#fef2f2", color: "#dc2626" },
  CONFLICT: { bg: "#fff7ed", color: "#92400e" },
};

export const confidenceColor: Record<string, string> = {
  High: "#16a34a",
  Medium: "#d97706",
  Low: "#dc2626",
};
