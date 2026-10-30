import type { AskFernResponse } from "./types.ts";
import type { InvestigationStep } from "./types.ts";

export const SUGGESTED_QUESTIONS = [
  "What requires my attention today?",
  "Show overdue corrective actions.",
  "Which KPIs are below target?",
  "What compliance evidence is missing?",
  "Show the highest operational risks.",
];

export const PROTOTYPE_QUERY = "Which KPIs are below target at this site?";

export default function buildResponse(query: string): AskFernResponse {
  const lower = query.toLowerCase();
  const isKpi = lower.includes("kpi") || lower.includes("target") || lower.includes("below");
  const isRisk = lower.includes("risk");
  const isCompliance = lower.includes("compliance") || lower.includes("evidence");
  const isCorrectiveAction = lower.includes("corrective") || lower.includes("overdue");
  const isAttention = lower.includes("attention") || lower.includes("today");

  const baseInvestigation: InvestigationStep[] = [
    {
      app: "Global FM Management",
      result: "checked",
      finding: "Governance, performance and compliance records reviewed",
    },
    {
      app: "FM Contract & Service Model Assessment",
      result: "gap",
      finding: "Assessment not yet initiated for this site",
    },
    {
      app: "Lifecycle & Asset Analysis",
      result: "unavailable",
      finding: "Asset data not yet connected — lifecycle analysis unavailable",
    },
    {
      app: "Risk & Compliance",
      result: "checked",
      finding: "Risk register reviewed — authorised connection pending",
    },
    {
      app: "Audit & Assurance",
      result: "unavailable",
      finding: "Audit data not connected",
    },
    {
      app: "Corrective Actions",
      result: "checked",
      finding: "Corrective action register reviewed",
    },
  ];

  if (isKpi) {
    return {
      query,
      classification: "GAP",
      confidence: "Low",
      answer:
        "FERN cannot currently display KPI results because authorised performance data for this site has not yet been connected. Where a live performance data connection exists, FERN would display KPIs currently performing below their defined target thresholds alongside the supporting evidence.",
      keyFinding:
        "Performance data for this site is not yet connected to FERN. No KPI results can be established without an authorised data source.",
      evidence: [
        { label: "Performance Requirement", dest: "Performance & KPIs" },
        { label: "Framework Documentation", dest: "Framework Documentation" },
      ],
      related: [
        { label: "Open Performance & KPIs", dest: "Performance & KPIs" },
        { label: "Operating Configurations", dest: "Operating Configurations" },
      ],
      humanReview: false,
      sources: 1,
      sourcesDetail: ["Performance Requirement — FM Contractual Standardisation"],
      investigation: [
        {
          app: "Performance & Service Delivery",
          result: "gap",
          finding: "Performance data source not connected",
        },
        {
          app: "FM Contract & Service Model",
          result: "gap",
          finding: "KPI requirements not yet validated for this site",
        },
        {
          app: "Risk & Compliance",
          result: "unavailable",
          finding: "Compliance KPIs — data connection pending",
        },
        {
          app: "Audit & Assurance",
          result: "unavailable",
          finding: "Assurance evidence — data not connected",
        },
      ],
    };
  }
  if (isRisk) {
    return {
      query,
      classification: "GAP",
      confidence: "Low",
      answer:
        "FERN cannot currently establish the highest operational risks for this site because the authorised risk data source has not yet been connected. Where a live risk data connection exists, FERN would display risk items ranked by severity and likelihood as established by the approved risk framework.",
      keyFinding:
        "Risk data for this site is not yet connected to FERN. No risk ranking can be established without an authorised data source.",
      evidence: [{ label: "Risk & Compliance Record", dest: "Risk & Compliance" }],
      related: [
        { label: "Open Risk & Compliance", dest: "Risk & Compliance" },
        { label: "Framework Documentation", dest: "Framework Documentation" },
      ],
      humanReview: false,
      sources: 0,
      sourcesDetail: [],
      investigation: [
        {
          app: "Risk & Compliance",
          result: "gap",
          finding: "Risk register — authorised data source not connected",
        },
        {
          app: "Audit & Assurance",
          result: "unavailable",
          finding: "Audit findings — data not connected",
        },
        {
          app: "Performance & Service Delivery",
          result: "unavailable",
          finding: "Performance risk indicators — data not connected",
        },
        {
          app: "Lifecycle & Asset Analysis",
          result: "unavailable",
          finding: "Asset risk — lifecycle data not connected",
        },
      ],
    };
  }
  if (isCompliance) {
    return {
      query,
      classification: "GAP",
      confidence: "Low",
      answer:
        "FERN cannot currently establish which compliance evidence is missing without an active connection to the approved compliance repository for the selected site. The information required to answer this question fully is not yet available in the current authorised data scope.",
      keyFinding:
        "Compliance evidence availability depends on an authorised data connection to the approved compliance repository. This connection has not yet been confirmed.",
      evidence: [{ label: "Compliance Requirement", dest: "Risk & Compliance" }],
      related: [
        { label: "Open Risk & Compliance", dest: "Risk & Compliance" },
        { label: "Framework Documentation", dest: "Framework Documentation" },
      ],
      humanReview: false,
      sources: 1,
      sourcesDetail: ["Compliance Requirement — Standards & Compliance Framework"],
      investigation: [
        {
          app: "Risk & Compliance",
          result: "gap",
          finding: "Compliance evidence repository — not connected",
        },
        {
          app: "Audit & Assurance",
          result: "unavailable",
          finding: "Audit compliance evidence — data not connected",
        },
        {
          app: "FM Contract & Service Model",
          result: "gap",
          finding: "Contractual compliance requirements — assessment not initiated",
        },
        {
          app: "Framework Data / Reference",
          result: "checked",
          finding: "Applicable standards framework reviewed",
        },
      ],
    };
  }
  if (isCorrectiveAction) {
    return {
      query,
      classification: "GAP",
      confidence: "Low",
      answer:
        "FERN cannot currently display overdue corrective actions because authorised corrective action data for this site has not yet been connected. Where a live data connection exists, FERN would list overdue items with their source, age, owner and recommended next action.",
      keyFinding:
        "Corrective action data for this site is not yet connected to FERN. No overdue items can be confirmed without an authorised data source.",
      evidence: [{ label: "Corrective Action Record", dest: "Continual Improvement" }],
      related: [
        { label: "Open Continual Improvement", dest: "Continual Improvement" },
        { label: "Framework Documentation", dest: "Framework Documentation" },
      ],
      humanReview: false,
      sources: 0,
      sourcesDetail: [],
      investigation: [
        {
          app: "Corrective Actions & Improvement",
          result: "gap",
          finding: "Corrective action data source not connected",
        },
        {
          app: "Audit & Assurance",
          result: "unavailable",
          finding: "Audit-generated actions — data not connected",
        },
        {
          app: "Risk & Compliance",
          result: "unavailable",
          finding: "Compliance-generated actions — data not connected",
        },
        {
          app: "Performance & Service Delivery",
          result: "unavailable",
          finding: "Performance-generated actions — data not connected",
        },
      ],
    };
  }
  if (isAttention) {
    return {
      query,
      classification: "GAP",
      confidence: "Low",
      answer:
        "FERN cannot currently produce a complete attention summary for this site because live data connections have not yet been established. Once authorised data sources are connected, FERN will display a consolidated view of items requiring your attention across all relevant FERN applications.",
      keyFinding:
        "No live data is currently connected for this site. FERN requires authorised data source connections before it can identify and prioritise items requiring attention.",
      evidence: [],
      related: [
        {
          label: "Open Programme Overview",
          dest: "Programme Overview / Dashboard",
        },
        { label: "Operating Configurations", dest: "Operating Configurations" },
        { label: "Framework Documentation", dest: "Framework Documentation" },
      ],
      humanReview: false,
      sources: 0,
      sourcesDetail: [],
      investigation: baseInvestigation,
    };
  }
  // Fallback GAP response
  return {
    query,
    classification: "GAP",
    confidence: "Low",
    answer:
      "FERN cannot currently establish an answer to this query from authorised FERN sources. The information required may not yet be connected to the platform or may require validation before it can be presented.",
    keyFinding: "",
    evidence: [],
    related: [
      { label: "Framework Documentation", dest: "Framework Documentation" },
      { label: "Contact / Support", dest: "Contact / Support" },
    ],
    humanReview: false,
    sources: 0,
    sourcesDetail: [],
    investigation: baseInvestigation,
  };
}
