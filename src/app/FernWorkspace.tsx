import { useEffect, useMemo, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Badge from '@cloudscape-design/components/badge';
import Button from '@cloudscape-design/components/button';
import Flashbar, { type FlashbarProps } from '@cloudscape-design/components/flashbar';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SideNavigation, { type SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { readPortalRoute, portalLocation, routeFor, type PortalRoute } from './portalRoutes';
import { NavLink, PageNotifications, PortalNavigation, Page, revealSection } from './ui';
import { pageHelp } from './pageHelp';
import { PortalPreferences, readPreferredCountry, writePreferredCountry } from './preferences';
import { countryCodes } from '../features/reference/countrySearch';
import { regionLabel } from '../features/reference/regionLabels';
import UserAdministration from '../features/admin/UserAdministration';
import { homeApplications, applicationByName } from '../features/dashboard/homeApplications.ts';
import { resourceDestinations } from '../features/dashboard/resourceDestinations.ts';
import FernSearch from '../features/search/FernAISearch';
import SearchResults from '../features/search/SearchResults';
import DashboardPage from '../features/dashboard/DashboardPage.tsx';
import AboutFern from '../features/dashboard/AboutFern.tsx';
import GetStarted from '../features/dashboard/GetStarted.tsx';
import Learn from '../features/dashboard/Learn.tsx';
import ReferenceLibrary from '../features/dashboard/ReferenceLibrary.tsx';
import HelpGuidance from '../features/dashboard/HelpGuidance.tsx';
import FernUpdates from '../features/dashboard/FernUpdates.tsx';
import ApplicationPage from '../features/dashboard/ApplicationPage.tsx';
import { ApplicationsIndex } from '../features/dashboard/HomeApplications.tsx';
import WorkspaceIndex, { workspacePages } from '../features/overview/WorkspaceIndex.tsx';
import MissionPillars from '../features/framework/MissionPillars';
import IntegratedWorkspace from '../features/framework/IntegratedWorkspace';
import FmOverviewPage from '../features/overview/FmOverviewPage.tsx';
import LeadershipPolicyPage from '../features/leadership/LeadershipPolicyPage.tsx';
import PlanningObjectivesPage from '../features/planning/PlanningObjectivesPage.tsx';
import PerformanceKpiPage from '../features/performance/PerformanceKpiPage.tsx';
import RiskCompliancePage from '../features/risk/RiskCompliancePage.tsx';
import AuditAssurancePage from '../features/audit/AuditAssurancePage.tsx';
import ContinualImprovementPage from '../features/improvement/ContinualImprovementPage.tsx';
// Lighter fern for the dark Cloudscape top navigation (7.1:1 on its #161d26 background); the sign-in page keeps home-fern.png.
import fernLogo from '../assets/fern-logo-on-dark.png';

// Detailed practice guidance shown inside each Workspace topic.
const practiceGuides: Record<string, () => React.ReactNode> = {
  'FM Overview': () => <FmOverviewPage />,
  'Leadership & Policy': () => <LeadershipPolicyPage />,
  'Planning & Objectives': () => <PlanningObjectivesPage />,
  'Performance & KPIs': () => <PerformanceKpiPage />,
  'Risk & Compliance': () => <RiskCompliancePage />,
  'Audit & Assurance': () => <AuditAssurancePage />,
  'Continual Improvement': () => <ContinualImprovementPage />,
};
const resourceTitles: Record<string, string> = {
  about: 'About FERN',
  guide: 'Get started',
  learn: 'Learn',
  reference: 'Standards & Reference Library',
  help: 'Help & Guidance',
  updates: 'What’s new in FERN',
  facility: 'Facility information',
  search: 'Search results',
};

export default function FernWorkspace({ onSignOut, onAdmin }: { onSignOut: () => void; onAdmin?: () => void }) {
  const [route, setRoute] = useState(() => readPortalRoute(window.location.search));
  const [lesson, setLesson] = useState<{ title: string; request: number } | null>(() =>
    route.lesson ? { title: route.lesson, request: 0 } : null,
  );
  const [navigationOpen, setNavigationOpen] = useState(() => window.innerWidth >= 900);
  // Help panel (tools region): closed until asked for; it follows the page.
  const [toolsOpen, setToolsOpen] = useState(false);
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([]);
  const [country, setCountryState] = useState(readPreferredCountry);
  const preferences = useMemo(
    () => ({
      country,
      setCountry: (next: string) => {
        writePreferredCountry(next);
        setCountryState(next);
      },
    }),
    [country],
  );
  const countryText = (code: string) =>
    code ? `${regionLabel(code).flag} ${regionLabel(code).label}` : 'All countries';
  const applyRoute = (next: PortalRoute) => {
    setRoute(next);
    setLesson((previous) => (next.lesson ? { title: next.lesson, request: (previous?.request ?? 0) + 1 } : null));
    if (window.innerWidth < 900) {
      setNavigationOpen(false);
      setToolsOpen(false);
    }
  };
  const urlFor = (next: PortalRoute) => window.location.pathname + portalLocation(window.location.search, next);
  const navigate = (next: PortalRoute) => {
    const url = urlFor(next);
    if (url !== window.location.pathname + window.location.search + window.location.hash)
      window.history.pushState(null, '', url);
    applyRoute(next);
  };
  const nav = useMemo(
    () => ({
      go: (page: string, pillar?: number) => navigate(routeFor(page, pillar)),
      href: (page: string, pillar?: number) => urlFor(routeFor(page, pillar)),
      search: (query: string) => navigate({ page: 'Home', panel: 'search', query }),
    }),
    [],
  );
  useEffect(() => {
    const restore = () => applyRoute(readPortalRoute(window.location.search));
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  // After each page change: start at the top and move focus to the page heading.
  const key = route.page + '|' + route.panel + '|' + (route.query ?? '');
  useEffect(() => {
    if (route.lesson || (route.page === 'Mission & Pillars' && route.pillar)) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const frame = requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('#fern-main h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [key]);
  // In-page links (#section) open the collapsed section they point to.
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const a = (event.target as Element).closest?.('#fern-main a[href^="#"]');
      if (!a) return;
      event.preventDefault();
      try {
        revealSection(decodeURIComponent(a.getAttribute('href')!.slice(1)));
      } catch {
        /* malformed anchor: ignore */
      }
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);

  const app = applicationByName(route.page);
  const inWorkspace = route.page === 'Workspace' || workspacePages.some(([title]) => title === route.page);
  const pageTitle = route.panel ? resourceTitles[route.panel] : app ? app.title : route.page;
  const crumbs = [
    { text: 'FERN', href: nav.href('Home') },
    ...(route.panel === 'search'
      ? [{ text: pageTitle, href: urlFor(route) }]
      : route.panel
      ? [
          { text: 'Resources', href: nav.href('Get started') },
          { text: pageTitle, href: urlFor(route) },
        ]
      : []),
    ...(inWorkspace
      ? [
          { text: 'Workspace', href: nav.href('Workspace') },
          ...(route.page !== 'Workspace' ? [{ text: pageTitle, href: urlFor(route) }] : []),
        ]
      : []),
    ...(route.page === 'Users & roles'
      ? [
          { text: 'Administration', href: urlFor(route) },
          { text: 'Users & roles', href: urlFor(route) },
        ]
      : []),
    ...(app || route.page === 'Applications'
      ? [
          { text: 'Applications', href: nav.href('Applications') },
          ...(app ? [{ text: app.title, href: urlFor(route) }] : []),
        ]
      : []),
  ];
  const link = (text: string, page: string, info?: React.ReactNode): SideNavigationProps.Link => ({
    type: 'link',
    text,
    href: nav.href(page),
    info,
  });
  const items: SideNavigationProps.Item[] = [
    link('Home', 'Home'),
    {
      type: 'section',
      text: 'Workspace',
      defaultExpanded: true,
      items: [link('All Workspace topics', 'Workspace'), ...workspacePages.map(([title]) => link(title, title))],
    },
    {
      type: 'section',
      text: 'Applications',
      defaultExpanded: true,
      items: [
        link('All applications', 'Applications'),
        ...homeApplications.map((item) => link(item.title, item.name, <Badge>Soon</Badge>)),
      ],
    },
    {
      type: 'section',
      text: 'Resources',
      defaultExpanded: true,
      items: resourceDestinations.map((item) => link(item.panel ? resourceTitles[item.panel] : item.label, item.label)),
    },
    {
      type: 'section',
      text: 'Administration',
      defaultExpanded: true,
      items: [link('Users & roles', 'Users & roles', <Badge color="grey">Demo</Badge>)],
    },
  ];
  const follow = (event: CustomEvent<{ href?: string; external?: boolean }>) => {
    const href = event.detail.href;
    if (!href || event.detail.external) return;
    event.preventDefault();
    navigate(readPortalRoute(href.slice(href.indexOf('?') >= 0 ? href.indexOf('?') : href.length)));
  };
  const practice = practiceGuides[route.page];
  const help = pageHelp(route, { practice: Boolean(practice), application: Boolean(app) });

  return (
    <PortalPreferences.Provider value={preferences}>
      <PortalNavigation.Provider value={nav}>
        <PageNotifications.Provider value={setNotifications}>
        <div id="fern-top-navigation" className="fern-top-navigation">
          <TopNavigation
            identity={{
              href: nav.href('Home'),
              title: 'FERN',
              logo: { src: fernLogo, alt: 'FERN' },
              onFollow: (event) => {
                event.preventDefault();
                nav.go('Home');
              },
            }}
            search={<FernSearch />}
            utilities={[
              // Language and country are chosen independently (Amazon review, 30 Oct 2026). Only English content exists today.
              {
                type: 'menu-dropdown',
                text: 'English (US)',
                title: 'Language',
                ariaLabel: 'Language: English (US)',
                description: 'Language',
                items: [
                  { id: 'en-US', text: 'English (US)', iconName: 'check' },
                  {
                    id: 'more',
                    text: 'Other languages',
                    disabled: true,
                    disabledReason: 'Translations are not available yet.',
                  },
                ],
              },
              {
                type: 'menu-dropdown',
                text: countryText(country),
                title: 'Country',
                ariaLabel: `Country: ${countryText(country)}`,
                description: 'Your country filters the Standards & Reference Library.',
                items: ['', ...countryCodes].map((code) => ({
                  id: code || 'all',
                  text: countryText(code),
                  iconName: code === country ? ('check' as const) : undefined,
                })),
                onItemClick: ({ detail }) => preferences.setCountry(detail.id === 'all' ? '' : detail.id),
              },
              {
                type: 'menu-dropdown',
                text: 'Prototype User',
                description: 'Demonstration only – not an Amazon account',
                iconName: 'user-profile',
                items: [
                  ...(onAdmin ? [{ id: 'admin', text: 'Proposed administration walkthrough' }] : []),
                  { id: 'signout', text: 'Sign out' },
                ],
                onItemClick: ({ detail }) => {
                  if (detail.id === 'signout') onSignOut();
                  if (detail.id === 'admin') onAdmin?.();
                },
              },
            ]}
            i18nStrings={{
              overflowMenuTriggerText: 'More',
              overflowMenuTitleText: 'All',
              searchIconAriaLabel: 'Search',
              searchDismissIconAriaLabel: 'Close search',
            }}
          />
        </div>
        <AppLayout
          headerSelector="#fern-top-navigation"
          ariaLabels={{
            navigation: 'FERN navigation',
            navigationClose: 'Close navigation',
            navigationToggle: 'Show navigation',
            tools: 'Help panel',
            toolsClose: 'Close help panel',
            toolsToggle: 'Open help panel',
          }}
          navigationOpen={navigationOpen}
          onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
          toolsOpen={toolsOpen}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          tools={
            <HelpPanel
              header={<h2>{help.title}</h2>}
              footer={
                <p>
                  Draft help for review; approved “How to use” guides will replace it. More help:{' '}
                  <NavLink to="Help & Guidance">Help &amp; Guidance</NavLink>
                </p>
              }
            >
              <p>{help.summary}</p>
              <h3>How to use this page</h3>
              <ul>
                {help.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </HelpPanel>
          }
          notifications={notifications.length ? <Flashbar items={notifications} /> : undefined}
          breadcrumbs={<BreadcrumbGroup items={crumbs} onFollow={follow} ariaLabel="Breadcrumbs" />}
          navigation={
            <SideNavigation
              header={{ text: 'Facility Expert Reference Network', href: nav.href('Home') }}
              activeHref={urlFor({ ...route, lesson: undefined, pillar: undefined })}
              onFollow={follow}
              items={items}
            />
          }
          content={
            <div id="fern-main">
              {route.panel === 'search' ? (
                <SearchResults query={route.query ?? ''} />
              ) : route.panel === 'about' ? (
                <AboutFern />
              ) : route.panel === 'guide' ? (
                <GetStarted />
              ) : route.panel === 'learn' ? (
                <Learn requestedLesson={lesson} />
              ) : route.panel === 'reference' ? (
                <ReferenceLibrary />
              ) : route.panel === 'help' ? (
                <HelpGuidance />
              ) : route.panel === 'updates' ? (
                <FernUpdates />
              ) : route.panel === 'facility' ? (
                <Page title={pageTitle}>
                  <p>
                    Facility selection and site history will be available with the applications. You can explore this
                    website without selecting a facility.
                  </p>
                </Page>
              ) : route.page === 'Home' ? (
                <DashboardPage />
              ) : route.page === 'Workspace' ? (
                <WorkspaceIndex />
              ) : route.page === 'Applications' ? (
                <ApplicationsIndex />
              ) : route.page === 'Users & roles' ? (
                <UserAdministration onContentWalkthrough={onAdmin} />
              ) : route.page === 'Mission & Pillars' ? (
                <MissionPillars pillar={route.pillar} />
              ) : practice ? (
                <IntegratedWorkspace key={route.page} title={route.page}>
                  {practice()}
                </IntegratedWorkspace>
              ) : app ? (
                <ApplicationPage key={app.slug} app={app} />
              ) : (
                <Page title={route.page} description="This page is not available in this version of FERN.">
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="primary" onClick={() => nav.go('Home')}>
                      Return to Home
                    </Button>
                    <Button onClick={() => nav.go('Help & Guidance')}>Help &amp; Guidance</Button>
                  </SpaceBetween>
                </Page>
              )}
            </div>
          }
        />
        </PageNotifications.Provider>
      </PortalNavigation.Provider>
    </PortalPreferences.Provider>
  );
}
