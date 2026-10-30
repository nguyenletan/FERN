// FERN application registry (website PRD APP-01): what the portal shows about each planned application.
// Introduction-page content is a DRAFT drawn from the application PRDs and user guides; it awaits product-owner review.
// Every application is "coming-soon": the website describes it and never launches a workflow (WEB-SCOPE-01).
export type ApplicationStatus = 'coming-soon';
export interface FernApplication {
  name: string;
  title: string;
  slug: string;
  status: ApplicationStatus;
  description: string;
  action: string;
  keywords: string[];
  note?: string;
  summary: string;
  audience: string[];
  capabilities: string[];
  steps: string[];
  related: string[];
}
export const homeApplications: FernApplication[] = [
  {
    name: 'FM Pre-Contract / Pre-Tender Assessment',
    title: 'Pre-Contract & Tender Assessment',
    slug: 'pre-contract',
    status: 'coming-soon',
    description: 'Compare the current FM arrangement with service alternatives and pricing.',
    action: 'Review service options',
    keywords: ['tender', 'precontract', 'pre-contract', 'procurement', 'compare', 'comparison', 'renewal'],
    summary:
      'Prepare for a contract renewal, re-tender or change of service by comparing the current FM arrangement with credible alternatives on a like-for-like basis, using consistent pricing, lifecycle, risk and compliance evidence.',
    audience: [
      'FM and procurement leads preparing a renewal or tender',
      'Commercial and pricing specialists',
      'Reviewers and business decision-makers',
    ],
    capabilities: [
      'Record the current service arrangement, its scope, inclusions and exclusions, with source evidence',
      'Create service alternatives and explain why each is included or excluded',
      'Use issued pricing versions and lifecycle results without entering them again',
      'Compare alternatives on an equivalent scope and period, and see gaps, conflicts and trade-offs',
      'Keep the analyst recommendation, reviewer findings and authorised business decision separate',
      'Produce an assessment report with conditions, evidence and outstanding actions',
    ],
    steps: [
      'Define the decision and record the current arrangement',
      'Gather pricing, service, asset, lifecycle, risk and compliance evidence',
      'Add the credible alternatives',
      'Compare equivalent scopes and review gaps and trade-offs',
      'Prepare a recommendation for authorised review',
      'Record the business decision and share the report',
    ],
    related: ['Pricing Template Generator', 'Lifecycle & Asset Analysis', 'FM Contract & Service Model'],
  },
  {
    name: 'Lifecycle & Asset Analysis',
    title: 'Lifecycle & Asset Analysis',
    slug: 'lifecycle',
    status: 'coming-soon',
    description: 'Review asset condition, maintenance costs and future replacement needs.',
    action: 'Explore asset costs',
    keywords: ['asset', 'lifecycle', 'life cycle', 'replacement', 'condition', 'equipment', 'maintenance'],
    summary:
      'Understand the condition, maintenance needs and future replacement costs of a facility’s assets over 5 to 25 years, following the RICS NRM3 lifecycle costing method.',
    audience: [
      'Asset and lifecycle specialists',
      'FM managers planning maintenance and capital replacement',
      'Commercial teams that need lifecycle costs for an assessment',
    ],
    capabilities: [
      'Import an asset register from Excel or add assets from the NRM3 classification',
      'Record condition, expected service life, maintenance tasks and cost evidence for each asset',
      'Calculate renewal and maintenance costs over 5, 10, 15, 20 and 25-year horizons',
      'Apply inflation and discount assumptions to see present-value costs, and test alternative cases',
      'Combine results with an issued pricing version without counting the same costs twice',
      'Produce annual and elemental cost reports for review',
    ],
    steps: [
      'Choose the facility, currency and analysis horizon',
      'Import or enter the assets and their evidence',
      'Check the asset baseline and resolve validation issues',
      'Set maintenance tasks, renewal assumptions and economic rates',
      'Calculate and compare scenarios',
      'Review the results and hand them to a pre-contract assessment',
    ],
    related: ['Pricing Template Generator', 'FM Pre-Contract / Pre-Tender Assessment'],
  },
  {
    name: 'FM Contract & Service Model',
    title: 'Contract & Service Model',
    slug: 'contract-service-model',
    status: 'coming-soon',
    description: 'Explore how FM services, responsibilities and delivery models fit together.',
    action: 'Explore service models',
    keywords: [
      'contract',
      'delivery model',
      'service model',
      'responsibility',
      'responsibilities',
      'blue badge',
      'yellow badge',
    ],
    note: 'Being developed',
    summary:
      'See how FM services, responsibilities and delivery models fit together for a facility: what is delivered, by whom, and under which in-house, outsourced or mixed model.',
    audience: [
      'FM leads defining or changing a facility’s service model',
      'Commercial and procurement teams',
      'Teams preparing pricing or a tender',
    ],
    capabilities: [
      'Record the current contract and service scope for a facility, with its source documents',
      'Review permitted service-model options using agreed definitions',
      'Make responsibilities clear before pricing or tendering starts',
      'Hand an agreed service baseline to pricing and pre-contract assessment so it is entered once',
    ],
    steps: [
      'Set the facility context and record the current scope',
      'Review the service-model options that apply',
      'Confirm who is responsible for each service',
      'Review the baseline and hand it over to pricing and assessment',
    ],
    related: [
      'FM Pre-Contract / Pre-Tender Assessment',
      'Pricing Template Generator',
      'FM Mobilisation & Transition Tracker',
    ],
  },
  {
    name: 'Pricing Template Generator',
    title: 'Pricing Template Generator',
    slug: 'pricing',
    status: 'coming-soon',
    description: 'Build staff and service costs, then issue pricing for use in assessments.',
    action: 'Build a pricing template',
    keywords: ['pricing', 'price', 'staff', 'rate', 'budget', 'cost template'],
    summary:
      'Build a provisional annual FM cost baseline for a facility — staff, maintenance, subcontractor and overhead costs — and issue it as a fixed version that assessments can reference.',
    audience: [
      'Commercial and pricing specialists',
      'FM managers preparing budgets',
      'Assessment authors who need a pricing baseline',
    ],
    capabilities: [
      'Import a staff rate card or enter roles, rates and hours',
      'Add maintenance tasks, materials and multi-year work',
      'Add overheads and subcontractor costs with scope notes',
      'See annual costs and totals over 5 to 25 years',
      'Compare the baseline with actual costs, tenders or benchmarks',
      'Issue a fixed pricing version for Lifecycle and Pre-Contract assessments',
    ],
    steps: [
      'Set the facility, currency and price date',
      'Import or enter staff roles and rates',
      'Add maintenance and additional costs',
      'Review totals and comparisons',
      'Issue the pricing version for use in assessments',
    ],
    related: ['Lifecycle & Asset Analysis', 'FM Pre-Contract / Pre-Tender Assessment'],
  },
  {
    name: 'FM Mobilisation & Transition Tracker',
    title: 'Mobilisation & Transition Tracker',
    slug: 'mobilisation',
    status: 'coming-soon',
    description: 'Plan a service transition and track tasks, owners and evidence.',
    action: 'Plan a transition',
    keywords: ['mobilisation', 'mobilization', 'transition', 'launch', 'handover', 'task', 'tracker'],
    summary:
      'Plan and track a change in how FM services are delivered, from preparation through handover and early operation: what must change, who is responsible, what must be evidenced and what remains unresolved.',
    audience: [
      'Mobilisation and transition coordinators',
      'FM managers and service providers',
      'Reviewers of handover readiness',
    ],
    capabilities: [
      'Record the delivery context, including the current and target service model',
      'Plan tasks with owners, deadlines, status and evidence',
      'Track handover information, responsibility confirmations and open issues',
      'Keep attention on unresolved actions after the service starts',
      'Save and export the plan',
    ],
    steps: [
      'Define the change and its scope',
      'Agree responsibilities',
      'Prepare resources and information',
      'Coordinate mobilisation and review the handover',
      'Stabilise the service and capture lessons learned',
    ],
    related: ['FM Contract & Service Model', 'FM Pre-Contract / Pre-Tender Assessment'],
  },
];
export const applicationByName = (name: string) => homeApplications.find((app) => app.name === name);
export function suggestedApplications(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return homeApplications.filter((app) => app.keywords.some((word) => q.includes(word)));
}
