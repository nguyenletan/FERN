// SAMPLE DATA for the user-administration demonstration. Names are fictitious; roles and access are proposals
// for Amazon (Benito/Richard) to confirm. In production, people sign in with Midway and roles come from FERN
// administration or APM (to be decided) — nothing here is connected to an Amazon system.
import { homeApplications } from '../dashboard/homeApplications.ts';

export type Role = {
  id: string;
  name: string;
  description: string;
  writeGuides: boolean;
  approveGuides: boolean;
  manageUsers: boolean;
  apps: string[];
};
export type AdminUser = { alias: string; name: string; roles: string[]; status: 'Active' | 'Invited'; added: string };
export type AdminState = { roles: Role[]; users: AdminUser[] };

const app = (slug: string) => homeApplications.find((item) => item.slug === slug)!.slug;
const allApps = homeApplications.map((item) => item.slug);
export const sampleState: AdminState = {
  roles: [
    {
      id: 'site-manager',
      name: 'Site manager',
      description: 'Reads FERN guidance and the applications used on site.',
      writeGuides: false,
      approveGuides: false,
      manageUsers: false,
      apps: [app('lifecycle'), app('mobilisation'), app('contract-service-model')],
    },
    {
      id: 'rme-planner',
      name: 'RME planner',
      description: 'Plans maintenance and asset work for sites.',
      writeGuides: false,
      approveGuides: false,
      manageUsers: false,
      apps: [app('lifecycle'), app('mobilisation')],
    },
    {
      id: 'commercial',
      name: 'Commercial & pricing specialist',
      description: 'Prepares pricing, tenders and service comparisons.',
      writeGuides: false,
      approveGuides: false,
      manageUsers: false,
      apps: [app('pre-contract'), app('pricing'), app('contract-service-model'), app('lifecycle')],
    },
    {
      id: 'author',
      name: 'Guide author',
      description: 'Writes and updates how-to guides, then submits them for approval.',
      writeGuides: true,
      approveGuides: false,
      manageUsers: false,
      apps: allApps,
    },
    {
      id: 'approver',
      name: 'Approver',
      description: 'Reviews guides and approves them before they go live.',
      writeGuides: false,
      approveGuides: true,
      manageUsers: false,
      apps: allApps,
    },
    {
      id: 'administrator',
      name: 'Administrator',
      description: 'Adds people to FERN and assigns their roles.',
      writeGuides: false,
      approveGuides: false,
      manageUsers: true,
      apps: allApps,
    },
  ],
  users: [
    {
      alias: 'demo-alex',
      name: 'Alex Morgan (sample)',
      roles: ['site-manager'],
      status: 'Active',
      added: '2026-10-01',
    },
    { alias: 'demo-priya', name: 'Priya Shah (sample)', roles: ['rme-planner'], status: 'Active', added: '2026-10-03' },
    { alias: 'demo-tom', name: 'Tom Becker (sample)', roles: ['commercial'], status: 'Active', added: '2026-10-08' },
    { alias: 'demo-author', name: 'Guide author (sample)', roles: ['author'], status: 'Active', added: '2026-10-12' },
    {
      alias: 'demo-approver',
      name: 'Business owner (sample)',
      roles: ['approver', 'administrator'],
      status: 'Active',
      added: '2026-10-12',
    },
    {
      alias: 'demo-sam',
      name: 'Sam Ortiz (sample)',
      roles: ['site-manager', 'rme-planner'],
      status: 'Invited',
      added: '2026-10-28',
    },
  ],
};

// The demonstration keeps changes for this browser tab only.
const KEY = 'fern-admin-demo';
export function loadAdminState(): AdminState {
  try {
    const saved = sessionStorage.getItem(KEY);
    return saved ? (JSON.parse(saved) as AdminState) : sampleState;
  } catch {
    return sampleState;
  }
}
export function saveAdminState(state: AdminState) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* Storage blocked: changes last until the page reloads. */
  }
}
export function resetAdminState() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nothing stored */
  }
  return sampleState;
}
export const validAlias = (alias: string) => /^[a-z][a-z0-9-]{1,30}$/.test(alias);
