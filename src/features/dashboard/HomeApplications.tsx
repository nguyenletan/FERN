import { useMemo, useState, type ReactNode } from 'react';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import { homeApplications, type FernApplication } from './homeApplications.ts';
import { NavButton, NavLink, Page } from '../../app/ui';
import { IconTitle, applicationIcons } from '../../app/visuals';

// FERN applications are developed separately. The website describes them on an introduction page and never launches a workflow (WEB-SCOPE-01).
export function ApplicationCards({
  items = homeApplications,
  header,
  filter,
  empty,
}: {
  items?: FernApplication[];
  header: ReactNode;
  filter?: ReactNode;
  empty?: ReactNode;
}) {
  return (
    <Cards
      items={items}
      header={header}
      filter={filter}
      empty={empty}
      trackBy="slug"
      cardsPerRow={[{ cards: 1 }, { minWidth: 640, cards: 2 }, { minWidth: 1100, cards: 3 }]}
      cardDefinition={{
        header: (item) => (
          <IconTitle icon={applicationIcons[homeApplications.indexOf(item)]} size={28}>
            {/* The title is the card's only link (one way in per destination, per Amazon review 30 Oct 2026). */}
            <NavLink to={item.name} fontSize="heading-m" ariaLabel={'About ' + item.title}>
              {item.title}
            </NavLink>
          </IconTitle>
        ),
        sections: [
          { id: 'description', content: (item) => item.description },
          {
            id: 'status',
            header: 'Status',
            content: (item) => (
              <SpaceBetween direction="horizontal" size="xs">
                <Badge color="blue">Coming soon</Badge>
                {item.note && <Badge>{item.note}</Badge>}
              </SpaceBetween>
            ),
          },
        ],
      }}
    />
  );
}
export default function HomeApplications() {
  return (
    <ApplicationCards
      header={
        <Header
          variant="h2"
          counter={`(${homeApplications.length})`}
          description="Specialist FERN tools are in development. Read what each one will do; they will open from here once they are released."
          actions={<NavButton to="Applications">View all applications</NavButton>}
        >
          FERN applications
        </Header>
      }
    />
  );
}
export function ApplicationsIndex() {
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    return q
      ? homeApplications.filter((app) =>
          [app.title, app.name, app.description, ...app.keywords].some((text) => text.toLowerCase().includes(q)),
        )
      : homeApplications;
  }, [query]);
  return (
    <Page
      title="Applications"
      description="The tools being developed for FERN. Each one will open from the portal once it is released."
    >
      <ApplicationCards
        items={items}
        header={
          <Header
            variant="h2"
            counter={query ? `(${items.length}/${homeApplications.length})` : `(${homeApplications.length})`}
          >
            All applications
          </Header>
        }
        filter={
          <TextFilter
            filteringText={query}
            filteringPlaceholder="Find an application, e.g. pricing or transition"
            filteringAriaLabel="Find an application"
            countText={`${items.length} matches`}
            onChange={({ detail }) => setQuery(detail.filteringText)}
          />
        }
        empty={
          <Box textAlign="center" color="inherit">
            <b>No matching applications</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              Try a different word.
            </Box>
            <Button onClick={() => setQuery('')}>Clear filter</Button>
          </Box>
        }
      />
    </Page>
  );
}
