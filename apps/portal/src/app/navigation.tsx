import { homeApplications } from "../features/dashboard/homeApplications.ts";
import { resourceDestinations } from "../features/dashboard/resourceDestinations.ts";
import { appsEnabled } from "./integratedApps.tsx";
const allNavGroups = [
  {
    label: "Workspace",
    subtitle: "FM knowledge & governance",
    subtitleTip:
      "FM governance and management information. External professional references inform the developing content; no Amazon certification or formal adoption is implied.",
    tooltip:
      "The main FERN area for FM governance, planning, performance, risk, compliance and continual improvement.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M4 8h8M4 5h5M4 11h6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    items: [
      { label: "Mission & Pillars", tag: "", tooltip: "Our FM mission and the eight pillars that guide everyday work." },
      { label: "Leadership & Policy", tag: "", tooltip: "" },
      {
        label: "FM Overview",
        tag: "",
        tooltip:
          "Review available FM information and find the relevant guidance or analysis tool.",
      },
      { label: "Planning & Objectives", tag: "", tooltip: "" },
      {
        label: "Performance & KPIs",
        tag: "",
        tooltip:
          "View applicable performance requirements, indicators, current performance information and items requiring attention.",
      },
      {
        label: "Risk & Compliance",
        tag: "",
        tooltip:
          "View relevant FM risks, compliance requirements, evidence, findings and items requiring review or action.",
      },
      {
        label: "Audit & Assurance",
        tag: "",
        tooltip:
          "View FM audit findings, assurance activities, evidence of compliance and outstanding audit actions.",
      },
      {
        label: "Continual Improvement",
        tag: "",
        tooltip:
          "Supports review of findings, recurring issues, corrective actions, outcomes and opportunities to improve FM performance.",
      },
    ],
  },
  {
    label: "FERN Apps",
    subtitle: "Working Tools",
    tooltip:
      "Access specialised FERN tools and applications supporting defined FM activities and workflows.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.8" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.8" />
      </svg>
    ),
    items: homeApplications.map(app=>({label:app.name,tag:"",tooltip:app.description})),

  },
  {
    label: "Resources & Help",
    subtitle: "Guidance & Support",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M6 6.5C6 5.4 6.9 4.5 8 4.5C9.1 4.5 10 5.4 10 6.5C10 7.6 8 8.5 8 9.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.5" r="0.8" fill="currentColor" />
      </svg>
    ),
    items: resourceDestinations.map(item=>({label:item.label,tag:"",tooltip:""})),

  },
];

export const navGroups = appsEnabled ? allNavGroups : allNavGroups.filter(group=>group.label!=="FERN Apps");
