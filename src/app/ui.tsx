// Shared Cloudscape building blocks for the FERN portal: theme, in-portal links, expandable reading sections and pages.
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { applyTheme } from '@cloudscape-design/components/theming';
import Button, { type ButtonProps } from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import ExpandableSection, { type ExpandableSectionProps } from '@cloudscape-design/components/expandable-section';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link, { type LinkProps } from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextContent from '@cloudscape-design/components/text-content';
import './cloudscape.scss';

// FERN blue for primary actions and links. Text uses the Cloudscape default font (Open Sans, bundled in styles/index.css).
applyTheme({
  theme: {
    tokens: {
      colorBackgroundButtonPrimaryDefault: '#1a3fb5',
      colorBorderButtonPrimaryDefault: '#1a3fb5',
      colorBackgroundButtonPrimaryHover: '#0d2464',
      colorBorderButtonPrimaryHover: '#0d2464',
      colorBackgroundButtonPrimaryActive: '#0d2464',
      colorBorderButtonPrimaryActive: '#0d2464',
      colorTextLinkDefault: '#1a3fb5',
      colorTextLinkHover: '#0d2464',
      colorTextAccent: '#1a3fb5',
    },
  },
});

/** Navigation by page label (e.g. "Performance & KPIs", "Learn"); href gives the shareable URL for the same target. */
export type Navigate = (page: string, pillar?: number) => void;
export const PortalNavigation = createContext<{ go: Navigate; href: (page: string, pillar?: number) => string }>({
  go: () => {},
  href: () => '#',
});
export const usePortalNavigation = () => useContext(PortalNavigation);
// Cloudscape fires onFollow only for clicks without modifier keys, so ctrl/cmd-click still opens a new tab.
export function NavLink({
  to,
  pillar,
  children,
  ...props
}: { to: string; pillar?: number; children: ReactNode } & Omit<LinkProps, 'href' | 'onFollow' | 'children'>) {
  const { go, href } = usePortalNavigation();
  return (
    <Link
      {...props}
      href={href(to, pillar)}
      onFollow={(event) => {
        event.preventDefault();
        go(to, pillar);
      }}
    >
      {children}
    </Link>
  );
}
export function NavButton({
  to,
  pillar,
  children,
  ...props
}: { to: string; pillar?: number; children: ReactNode } & Omit<
  ButtonProps,
  'href' | 'onFollow' | 'onClick' | 'children'
>) {
  const { go, href } = usePortalNavigation();
  return (
    <Button
      {...props}
      href={href(to, pillar)}
      onFollow={(event) => {
        event.preventDefault();
        go(to, pillar);
      }}
    >
      {children}
    </Button>
  );
}

// Reading sections: "Expand all"/"Collapse all" and #anchor links open the sections they target.
const EXPAND_ALL = 'fern:expand-all',
  REVEAL = 'fern:reveal';
export function revealSection(id: string) {
  document.dispatchEvent(new CustomEvent(REVEAL, { detail: id }));
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ block: 'start' });
      const focus = target.querySelector<HTMLElement>('[aria-expanded],h1,h2,h3,h4,h5') ?? target;
      if (focus === target && !target.hasAttribute('tabindex')) target.tabIndex = -1;
      focus.focus({ preventScroll: true });
    }),
  );
}
export function Section({
  id,
  header,
  description,
  defaultExpanded = false,
  variant = 'container',
  children,
}: {
  id?: string;
  header: ReactNode;
  description?: ReactNode;
  defaultExpanded?: boolean;
  variant?: ExpandableSectionProps.Variant;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const all = (event: Event) => {
      const { open, scope } = (event as CustomEvent<{ open: boolean; scope: Element }>).detail;
      if (root.current && scope.contains(root.current)) setExpanded(open);
    };
    const reveal = (event: Event) => {
      const target = document.getElementById((event as CustomEvent<string>).detail);
      if (target && root.current?.contains(target)) setExpanded(true);
    };
    document.addEventListener(EXPAND_ALL, all);
    document.addEventListener(REVEAL, reveal);
    return () => {
      document.removeEventListener(EXPAND_ALL, all);
      document.removeEventListener(REVEAL, reveal);
    };
  }, []);
  return (
    <div ref={root} id={id} className="fern-section">
      <ExpandableSection
        variant={variant}
        expanded={expanded}
        onChange={({ detail }) => setExpanded(detail.expanded)}
        headerText={
          typeof description === 'string' || !description ? (
            header
          ) : (
            <>
              {header}
              <span className="fern-section-description">{description}</span>
            </>
          )
        }
        headerDescription={typeof description === 'string' ? description : undefined}
      >
        {children}
      </ExpandableSection>
    </div>
  );
}
export function ExpandAllControls({ label = 'this page' }: { label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const change = (open: boolean) => {
    const scope = root.current?.closest('[data-reading-scope]');
    if (scope) document.dispatchEvent(new CustomEvent(EXPAND_ALL, { detail: { open, scope } }));
  };
  return (
    <div ref={root} role="group" aria-label={'Reading options for ' + label}>
      <SpaceBetween direction="horizontal" size="xs">
        <Button variant="normal" iconName="expand" onClick={() => change(true)}>
          Expand all
        </Button>
        <Button variant="normal" iconName="shrink" onClick={() => change(false)}>
          Collapse all
        </Button>
      </SpaceBetween>
    </div>
  );
}

/** A page: Cloudscape header (h1) with optional description and actions, then the page sections. */
export function Page({
  title,
  description,
  actions,
  info,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  info?: ReactNode;
  children: ReactNode;
}) {
  return (
    <ContentLayout
      header={
        <Header variant="h1" description={description} actions={actions} info={info}>
          {title}
        </Header>
      }
    >
      <div data-reading-scope>
        <SpaceBetween size="l">{children}</SpaceBetween>
      </div>
    </ContentLayout>
  );
}
/** A titled container whose body uses Cloudscape text styles. */
export function Card({
  id,
  title,
  description,
  actions,
  children,
}: {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div id={id}>
      <Container
        header={
          title ? (
            <Header variant="h2" description={description} actions={actions}>
              {title}
            </Header>
          ) : undefined
        }
      >
        {children ? <Prose>{children}</Prose> : null}
      </Container>
    </div>
  );
}
export function Prose({ children }: { children: ReactNode }) {
  return <TextContent>{children}</TextContent>;
}
export function Terms({ items, columns = 2 }: { items: string[][]; columns?: number }) {
  return <KeyValuePairs columns={columns as 1 | 2 | 3 | 4} items={items.map(([label, value]) => ({ label, value }))} />;
}
