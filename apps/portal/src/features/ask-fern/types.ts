export type InvestigationStep = {
  app: string;
  result: "checked" | "gap" | "unavailable" | "conflict";
  finding: string;
};

export type AskFernResponse = {
  query: string;
  classification: "FACT" | "RECOMMENDATION" | "ASSUMPTION" | "GAP" | "CONFLICT";
  confidence: "High" | "Medium" | "Low";
  answer: string;
  keyFinding: string;
  evidence: { label: string; dest: string }[];
  related: { label: string; dest: string }[];
  humanReview: boolean;
  sources: number;
  sourcesDetail: string[];
  investigation: InvestigationStep[];
};
