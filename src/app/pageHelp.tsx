// Contextual help shown in the app layout's help panel (Cloudscape tools region), one entry per kind of page.
// It explains how to use the page's own controls. It is draft text: approved "How to use" guides replace it.
import type { ReactNode } from 'react';
import type { PortalRoute } from './portalRoutes';

export type PageHelpKind =
  | 'home'
  | 'workspace'
  | 'mission'
  | 'topic'
  | 'applications'
  | 'application'
  | 'learn'
  | 'reference'
  | 'help'
  | 'admin'
  | 'search'
  | 'reading';

export type PageHelp = { title: string; summary: ReactNode; steps: ReactNode[] };

const help: Record<PageHelpKind, PageHelp> = {
  home: {
    title: 'Using FERN',
    summary: 'Home is the front door to FERN guidance, the standards library, learning and the FERN applications.',
    steps: [
      'Choose a starting point: Workspace for FM direction, the Standards & Reference Library, or Learn.',
      'Use “Explore our mission & pillars” to see the principles behind the guidance.',
      'Application cards describe tools that are coming soon; open one to read what it will do.',
      'Search in the header finds topics and guides. The country menu filters the standards library.',
    ],
  },
  workspace: {
    title: 'Workspace',
    summary: 'Workspace groups the FM guidance topics, from mission and leadership to continual improvement.',
    steps: ['Open a topic card to read its guidance.', 'The same topics are listed under Workspace in the navigation.'],
  },
  mission: {
    title: 'Mission & Pillars',
    summary: 'The FERN mission and the eight pillars that shape every guidance topic.',
    steps: [
      'Read the mission, then open a pillar section to see what it means in practice.',
      'Workspace topics show the pillars that guide them under “Guided by”.',
    ],
  },
  topic: {
    title: 'Workspace topic',
    summary: 'Each Workspace topic explains one area of FM practice and the evidence it relies on.',
    steps: [
      'Start with “About this topic”; “Guided by” shows the pillars behind it.',
      'Choose “Open detailed practice guide” for step-by-step guidance.',
      'In the guide, use “Expand all” or “Collapse all”, and “Back to” the topic when you are done.',
    ],
  },
  applications: {
    title: 'FERN applications',
    summary: 'Specialist FERN tools that are in development. They are not yet available on this website.',
    steps: [
      'Type in “Find an application” to filter the list, for example pricing or transition.',
      'Open an application to read who it is for and what it will do.',
    ],
  },
  application: {
    title: 'Application introduction',
    summary: 'A draft description of a FERN application that is coming soon. Features may change before release.',
    steps: [
      '“Who it is for” lists the intended users.',
      '“Works with” links to related FERN applications.',
      'When the application is released, it will open from this page.',
    ],
  },
  learn: {
    title: 'Learn',
    summary: 'Introductory learning about FERN and FM concepts. Learning explains concepts; it does not create requirements.',
    steps: [
      'Choose a learning topic to expand it, or use “Expand all”.',
      'You can read the topics without choosing a facility.',
    ],
  },
  reference: {
    title: 'Standards & Reference Library',
    summary: 'Search and read the BBM compliance and preventive maintenance standards and their source pages.',
    steps: [
      'Search with an equipment name or an object code, or choose a topic under “Explore a topic”.',
      'Narrow the results by collection and by country.',
      'Open a standard to read it in the task reading view or as original tables, compare it with the original PDF, or download it.',
      'No result does not mean that no requirement applies; check the source.',
    ],
  },
  help: {
    title: 'Help & Guidance',
    summary: 'Where to go for help with FERN, FM guidance, data, access and technical problems.',
    steps: [
      'Open the topic that matches your question.',
      'For an immediate operational issue, follow “For an immediate operational issue” on this page.',
    ],
  },
  admin: {
    title: 'Users & roles',
    summary: 'A demonstration of how people and their roles could be managed. Nothing is saved to an Amazon system.',
    steps: [
      'Add a user, change roles or remove a user from the Users tab.',
      '“Roles & access” shows what each role can do, and “Preview as role” shows the portal as that role.',
      '“Reset sample data” restores the starting list.',
    ],
  },
  search: {
    title: 'Search results',
    summary: 'Keyword matches across FERN guidance, learning topics and applications. These are not AI-generated answers.',
    steps: [
      'Open a result to go to that page. Results that match more of your words come first.',
      'Change the words and choose Search to try again.',
      'To search inside the standards themselves, use “Search the Standards & Reference Library”.',
    ],
  },
  reading: {
    title: 'Reading this page',
    summary: 'Guidance and information about FERN.',
    steps: [
      'Use the navigation on the left to move between pages, and the breadcrumbs to go back up a level.',
      'Help & Guidance lists where to go for further help.',
    ],
  },
};

/** The help entry for a route. `practice` and `application` say whether the page is a Workspace topic or an application page. */
export function pageHelp(route: PortalRoute, kind: { practice: boolean; application: boolean }): PageHelp {
  if (route.panel === 'learn' || route.panel === 'reference' || route.panel === 'help' || route.panel === 'search')
    return help[route.panel];
  if (route.panel) return help.reading;
  if (route.page === 'Home') return help.home;
  if (route.page === 'Workspace') return help.workspace;
  if (route.page === 'Applications') return help.applications;
  if (route.page === 'Users & roles') return help.admin;
  if (route.page === 'Mission & Pillars') return help.mission;
  if (kind.practice) return help.topic;
  if (kind.application) return help.application;
  return help.reading;
}
