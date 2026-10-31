// Search results page for the header search (?page=search&q=…): keyword matches grouped by kind of destination.
import { useEffect, useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { NavLink, Page, usePortalNavigation } from '../../app/ui';
import { searchFern } from './FernAISearch';

/** Opens the Standards & Reference Library with its own search set to the query (the library reads bbmQuery). */
function libraryHref(query: string) {
  const params = new URLSearchParams({ page: 'reference', bbmQuery: query });
  return window.location.pathname + '?' + params.toString();
}

export default function SearchResults({ query }: { query: string }) {
  const { search } = usePortalNavigation();
  const [text, setText] = useState(query);
  useEffect(() => setText(query), [query]);
  const groups = searchFern(query).filter((group) => group.hits.length);
  const total = groups.reduce((sum, group) => sum + group.hits.length, 0);
  return (
    <Page
      title="Search results"
      description={
        query
          ? `${total} ${total === 1 ? 'result' : 'results'} for “${query}”. Keyword matches across FERN, not AI-generated answers.`
          : 'Enter a word or phrase to search FERN guidance, learning topics and applications.'
      }
    >
      <Container>
        <form
          role="search"
          aria-label="Search FERN"
          onSubmit={(event) => {
            event.preventDefault();
            if (text.trim()) search(text.trim());
          }}
        >
          <Grid gridDefinition={[{ colspan: { default: 12, xs: 9 } }, { colspan: { default: 12, xs: 3 } }]}>
            <Input
              type="search"
              clearAriaLabel="Clear search"
              value={text}
              onChange={({ detail }) => setText(detail.value)}
              ariaLabel="Search terms"
              placeholder="Find a topic or guide"
            />
            <Button variant="primary" disabled={!text.trim()}>
              Search
            </Button>
          </Grid>
        </form>
      </Container>
      {query && !total && (
        <Box variant="p">No matching topic. Try a shorter word, or use the options below.</Box>
      )}
      {groups.map((group) => (
        <Container
          key={group.label}
          header={
            <Header variant="h2" counter={`(${group.hits.length})`}>
              {group.label}
            </Header>
          }
        >
          <SpaceBetween size="m">
            {group.hits.map((hit) => (
              <div key={hit.to}>
                <NavLink to={hit.to} fontSize="heading-s">
                  {hit.title}
                </NavLink>
                {hit.description && <Box color="text-body-secondary">{hit.description}</Box>}
              </div>
            ))}
          </SpaceBetween>
        </Container>
      ))}
      {query && (
        <Container header={<Header variant="h2">Not finding what you need?</Header>}>
          <SpaceBetween size="xs">
            <Link
              href={libraryHref(query)}
              onFollow={(event) => {
                // In-app: update the URL, then let the portal read it (the library takes its query from bbmQuery).
                event.preventDefault();
                window.history.pushState(null, '', libraryHref(query));
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              Search the Standards & Reference Library for “{query}”
            </Link>
            <NavLink to="Help & Guidance">Browse Help & Guidance</NavLink>
          </SpaceBetween>
        </Container>
      )}
    </Page>
  );
}
