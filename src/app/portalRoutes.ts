import { homeApplications } from '../features/dashboard/homeApplications.ts';
import { resourceDestinations, legacyResourcePanels } from '../features/dashboard/resourceDestinations.ts';

export type HomePanel = 'about' | 'facility' | 'guide' | 'learn' | 'reference' | 'help' | 'updates' | null;
const pages: Record<string, string> = {
  home: 'Home',
  workspace: 'Workspace',
  mission: 'Mission & Pillars',
  leadership: 'Leadership & Policy',
  overview: 'FM Overview',
  planning: 'Planning & Objectives',
  performance: 'Performance & KPIs',
  risk: 'Risk & Compliance',
  assurance: 'Audit & Assurance',
  improvement: 'Continual Improvement',
  applications: 'Applications',
  admin: 'Users & roles',
  // Application introduction pages, e.g. ?page=pricing
  ...Object.fromEntries(homeApplications.map((app) => [app.slug, app.name])),
};
const panels: Record<string, HomePanel> = {
  about: 'about',
  'getting-started': 'guide',
  learn: 'learn',
  reference: 'reference',
  help: 'help',
  updates: 'updates',
  facility: 'facility',
};
export const lessonTitles = [
  'Understanding FERN',
  'Service models explained',
  'From tender to transition',
  'Assets, condition and lifecycle',
  'Risk, criticality and maintenance',
  'Performance, KPIs and SLAs',
  'Sources and evidence',
  'Policies, BBM standards and requirements',
  'Assurance and Continual Improvement',
];
const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export type PortalRoute = { page: string; panel: HomePanel; lesson?: string; pillar?: number };
export function readPortalRoute(search: string): PortalRoute {
  const params = new URLSearchParams(search);
  if (params.has('bbm') || params.has('bbmKind')) return { page: 'Home', panel: 'reference' };
  const key = params.get('page') ?? 'home';
  const pillar =
    key === 'mission' && /^[1-8]$/.test(params.get('pillar') ?? '') ? Number(params.get('pillar')) : undefined;
  const panel = Object.prototype.hasOwnProperty.call(panels, key) ? panels[key] : null;
  return {
    page: Object.prototype.hasOwnProperty.call(pages, key) ? pages[key] : 'Home',
    panel,
    pillar,
    lesson: panel === 'learn' ? lessonTitles.find((title) => slug(title) === params.get('lesson')) : undefined,
  };
}
export function portalLocation(search: string, route: PortalRoute) {
  const params = new URLSearchParams(search);
  if (route.panel !== 'reference')
    for (const key of ['bbm', 'bbmKind', 'bbmQuery', 'bbmCountry', 'bbmUnspecified']) params.delete(key);
  const key = route.panel
    ? Object.keys(panels).find((key) => panels[key] === route.panel)
    : Object.keys(pages).find((key) => pages[key] === route.page);
  if (key && key !== 'home') params.set('page', key);
  else params.delete('page');
  const lesson = lessonTitles.find((title) => title.toLowerCase() === route.lesson?.toLowerCase());
  if (route.panel === 'learn' && lesson) params.set('lesson', slug(lesson));
  else params.delete('lesson');
  if (
    route.page === 'Mission & Pillars' &&
    !route.panel &&
    route.pillar !== undefined &&
    Number.isInteger(route.pillar) &&
    route.pillar >= 1 &&
    route.pillar <= 8
  )
    params.set('pillar', String(route.pillar));
  else params.delete('pillar');
  return params.size ? '?' + params.toString() : '';
}
/** The route for a destination label used across the portal: a page, a resource, a lesson or an application name. */
export function routeFor(requested: string, pillar?: number): PortalRoute {
  const lesson = lessonTitles.find((title) => title.toLowerCase() === requested.toLowerCase());
  if (lesson) return { page: 'Home', panel: 'learn', lesson };
  const panel =
    resourceDestinations.find((item) => item.label === requested)?.panel ?? legacyResourcePanels[requested] ?? null;
  const page = panel || requested === 'Home' || requested === 'Programme Overview / Dashboard' ? 'Home' : requested;
  return { page, panel, pillar: page === 'Mission & Pillars' ? pillar : undefined };
}
