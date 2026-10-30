export const attentionItems: {
  category: string;
  text: string;
  source: string;
  time: string;
  color: string;
  navDest: string;
}[] = [];

export type WhatChangedItem = {
  category: "Platform" | "Application" | "Data" | "Context";
  title: string;
  detail: string;
  time: string;
  dataState: "current" | "no-data";
  navDest?: string;
};

export const whatChanged: WhatChangedItem[] = [];

export type NextAction = {
  priority: "High" | "Medium";
  title: string;
  rationale: string;
  navDest: string;
  tag: string;
};

export const recommendedNextActions: NextAction[] = [
  {
    priority: "High",
    title: "Connect authorised asset and condition information",
    rationale:
      "Lifecycle & Asset Analysis requires an authorised asset register and condition data before any lifecycle outputs can be generated.",
    navDest: "Lifecycle & Asset Analysis",
    tag: "Integration",
  },
  {
    priority: "High",
    title: "Connect authorised risk and compliance information",
    rationale:
      "Risk & Compliance cannot surface open risks, regulatory gaps or corrective actions without an authorised connected data source.",
    navDest: "Risk & Compliance",
    tag: "Integration",
  },
  {
    priority: "Medium",
    title: "Connect authorised performance information",
    rationale:
      "Performance & KPIs requires an authorised connected data source before KPI and SLA data can be reviewed.",
    navDest: "Performance & KPIs",
    tag: "Integration",
  },
];

export const iconContract = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="1" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 6h8M5 9h6M5 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path
      d="M12 12l2 2 3-3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const iconLifecycle = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M3 15V9M6 15V6M9 15V3M12 15V7M15 15V10"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const iconPerformance = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M2 14L6 9L9 11L13 5L16 8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="9" r="1.3" fill="currentColor" />
    <circle cx="9" cy="11" r="1.3" fill="currentColor" />
    <circle cx="13" cy="5" r="1.3" fill="currentColor" />
  </svg>
);

export const iconRisk = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L16 15H2L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 8v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="9" cy="13" r="0.8" fill="currentColor" />
  </svg>
);

export const iconAudit = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M5.5 9.5l2.5 2.5 5-5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const iconImprovement = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M3 12C3 8.134 6.134 5 10 5H13M13 5L10.5 2.5M13 5L10.5 7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 6C15 9.866 11.866 13 8 13H5M5 13L7.5 15.5M5 13L7.5 10.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
