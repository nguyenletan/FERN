import { countryCatalogue, countryCodes } from './countrySearch';
import { regionLabel } from './regionLabels';
import RegionLabel from './RegionLabel';
import TaskReader from './TaskReader';
import { discoverStandards, sourceExcerpt, suggestSearch, matchingSourceText } from './libraryDiscovery';
import { useEffect, useRef, useState, useMemo } from 'react';
import Alert from '@cloudscape-design/components/alert';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import sourceData from './generated/standards.json';
import pdfFiles from './generated/pdf-files.json';
import { type StandardEntry } from './standardsSearch';
import { ExpandAllControls, Prose, Section } from '../../app/ui';
import { usePortalPreferences } from '../../app/preferences';
import { standardOverview, relatedStandards, readStandardLocation, standardLocation } from './standardContext';
import './standards-reader.css';
type Cell = { text: string; col: number; colSpan: number; rowSpan: number };
type Block = { type: string; text?: string; widths?: number[]; header?: boolean; rows?: Cell[][] };
type Page = { number: number; text: string; blocks: Block[]; figures?: string[] };
const data = sourceData as { entries: StandardEntry[]; pages: Record<string, Page[]> };
// PDFs are static files in public/bbm, served beside the site. The single-file export (scripts/export-portal.mjs)
// embeds them as base64 in window.__FERN_PDFS__ so the offline review copy still downloads (BBM-HTML-07).
declare global {
  interface Window {
    __FERN_PDFS__?: Record<string, string>;
  }
}
const files = pdfFiles as Record<string, string>;
const pdfPath = (key: string) => import.meta.env.BASE_URL + 'bbm/' + encodeURIComponent(files[key]);
const links = Object.fromEntries(
  data.entries.map((entry) => [
    entry.id,
    relatedStandards(data.pages[entry.kind][entry.page - 1].blocks, entry, data.entries).flatMap((r) =>
      r.target ? [r.target.id] : [],
    ),
  ]),
);
const browseTopics = ['Emergency lighting', 'Fire doors', 'Legionella', 'Air conditioning', 'Lifts', 'Generators'];
const kindLabel = (kind: string) => (kind === 'PM' ? 'Preventive Maintenance' : 'Compliance');
// Cloudscape typography: ID strings such as BBM object codes use the monospace code style.
const ObjectCode = ({ code, bold }: { code: string; bold?: boolean }) =>
  code === 'INTRODUCTION' ? (
    <>{code}</>
  ) : (
    <Box variant="code" fontWeight={bold ? 'bold' : undefined}>
      {code}
    </Box>
  );
const countryOptions = [
  { value: '', label: 'All countries' },
  ...countryCodes.map((code) => ({ value: code, label: `${regionLabel(code).flag} ${regionLabel(code).label}` })),
];
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  return (
    <>
      {text
        .split(/(\s+)/)
        .map((part, i) => (terms.some((t) => part.toLowerCase().includes(t)) ? <mark key={i}>{part}</mark> : part))}
    </>
  );
}
const readingSteps = [
  ['Find', 'Topic, code or wording'],
  ['Read', 'Scope, tasks and conditions'],
  ['Verify', 'Edition and applicability'],
  ['Review', 'Evidence and limitations'],
];

export default function StandardsLibrary() {
  const initial = readStandardLocation(typeof window === 'undefined' ? '' : window.location.search, data.entries);
  // A country in the link wins; otherwise start from the country chosen in the portal header.
  const preferences = usePortalPreferences();
  if (!initial.country && !new URLSearchParams(window.location.search).has('bbmCountry'))
    initial.country = preferences.country;
  const [showAll, setShowAll] = useState(false);
  const [country, setCountry] = useState(initial.country);
  const [includeUnspecified, setIncludeUnspecified] = useState(initial.includeUnspecified);
  const [query, setQuery] = useState(initial.query);
  const [kind, setKind] = useState(initial.kind);
  const [limit, setLimit] = useState(20);
  const [selected, setSelected] = useState(initial.selected);
  const [status, setStatus] = useState(initial.error);
  const [original, setOriginal] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<{ id: string; scroll: number } | null>(null);
  const [readingView, setReadingView] = useState<'tasks' | 'tables'>('tasks');
  const urls = useRef(new Map<string, string>());
  useEffect(() => {
    const restore = () => {
      const state = readStandardLocation(window.location.search, data.entries);
      setSelected(state.selected);
      setQuery(state.query);
      setKind(state.kind);
      setCountry(state.country);
      setIncludeUnspecified(state.includeUnspecified);
      setLimit(20);
      setStatus(state.error);
      setOriginal('');
      if (!state.selected) {
        setShowAll(true);
        restoreResults();
      }
    };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  const catalogue = useMemo(
    () => countryCatalogue(data.entries, data.pages, country, includeUnspecified),
    [country, includeUnspecified],
  );
  const searchable = catalogue.map((item) => item.entry);
  const byId = new Map(catalogue.map((item) => [item.entry.id, item]));
  const entry = data.entries.find((e) => e.id === selected);
  const results = discoverStandards(searchable, query, kind, links);
  if (country && !query.trim())
    results.sort((a, b) => {
      const rank = (id: string) => (byId.get(id)?.coverage.country ? 0 : byId.get(id)?.coverage.shared ? 1 : 2);
      return rank(a.entry.id) - rank(b.entry.id);
    });
  const suggestion = !results.length ? suggestSearch(searchable, query) : null;
  const counts = Object.fromEntries(
    ['all', 'Compliance', 'PM'].map((k) => [k, discoverStandards(searchable, query, k, links).length]),
  );
  useEffect(
    () => () => {
      urls.current.forEach((u) => URL.revokeObjectURL(u));
      urls.current.clear();
    },
    [],
  );
  useEffect(() => {
    if (selected) {
      const title = document.getElementById('bbm-standard-title');
      title?.focus();
      title?.scrollIntoView({ block: 'start' });
    }
  }, [selected]);
  // Keep the library filter and the header country in step.
  const firstPreference = useRef(true);
  useEffect(() => {
    if (firstPreference.current) {
      firstPreference.current = false;
      return;
    }
    if (preferences.country !== country) changeSearch(query, kind, preferences.country);
  }, [preferences.country]);
  function changeSearch(nextQuery: string, nextKind = kind, nextCountry = country, nextInclude = includeUnspecified) {
    if (nextCountry !== preferences.country) preferences.setCountry(nextCountry);
    setQuery(nextQuery);
    setKind(nextKind);
    setCountry(nextCountry);
    setIncludeUnspecified(nextInclude);
    setLimit(20);
    setShowAll(true);
    window.history.replaceState(
      null,
      '',
      window.location.pathname +
        standardLocation(window.location.search, undefined, nextQuery, nextKind, {
          country: nextCountry,
          includeUnspecified: nextInclude,
        }),
    );
  }
  function showResults() {
    setShowAll(true);
    resultsRef.current?.focus({ preventScroll: true });
  }
  function url(key: string) {
    const embedded = window.__FERN_PDFS__?.[key];
    if (!embedded) return pdfPath(key);
    if (!urls.current.has(key)) {
      const bytes = Uint8Array.from(atob(embedded), (c) => c.charCodeAt(0));
      urls.current.set(key, URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    }
    return urls.current.get(key)!;
  }
  function download(key: string) {
    try {
      const a = document.createElement('a');
      a.href = url(key);
      a.download = files[key];
      document.body.append(a);
      a.click();
      a.remove();
      setStatus('Download requested: ' + files[key]);
    } catch {
      setStatus('This PDF could not be prepared. Please reopen the file in a browser that supports downloads.');
    }
  }
  function choose(id: string) {
    if (!entry) returnTo.current = { id, scroll: window.scrollY };
    setReadingView('tasks');
    const next = data.entries.find((e) => e.id === id);
    if (!next) return;
    window.history.pushState(
      null,
      '',
      window.location.pathname +
        standardLocation(window.location.search, next, query, kind, { country, includeUnspecified }),
    );
    setOriginal('');
    setStatus('');
    setSelected(id);
  }
  function restoreResults() {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const saved = returnTo.current;
        if (saved) {
          window.scrollTo({ top: saved.scroll, behavior: 'instant' as ScrollBehavior });
          document.getElementById('result-' + saved.id)?.focus({ preventScroll: true });
        } else {
          document.querySelector<HTMLInputElement>('#bbm-search input')?.focus({ preventScroll: true });
          document.getElementById('bbm-search')?.scrollIntoView({ block: 'start' });
        }
      }),
    );
  }
  function back() {
    window.history.pushState(
      null,
      '',
      window.location.pathname +
        standardLocation(window.location.search, undefined, query, kind, { country, includeUnspecified }),
    );
    setSelected('');
    setOriginal('');
    restoreResults();
  }
  function showOriginal() {
    if (!entry) return;
    try {
      setOriginal(url(entry.kind));
    } catch {
      setStatus('The original PDF could not be opened.');
    }
  }
  const pages = entry ? data.pages[entry.kind].slice(entry.page - 1, entry.endPage) : [];
  const related = entry ? relatedStandards(data.pages[entry.kind][entry.page - 1].blocks, entry, data.entries) : [];
  const filtered = !!(query || kind !== 'all' || country || showAll);

  return (
    <section className="fern-standards" aria-label="BBM standards reader">
      <div hidden={!!entry}>
        <SpaceBetween size="l">
          <form
            id="bbm-search"
            role="search"
            aria-label="Search BBM standards"
            onSubmit={(e) => {
              e.preventDefault();
              showResults();
            }}
          >
            <Container
              header={
                <Header
                  variant="h2"
                  description="Find a standard by country, equipment, topic or object code. Supplied editions: Compliance · April 2024 / Preventive Maintenance · March 2025. Check the authorised source and applicability before use."
                >
                  Search BBM standards
                </Header>
              }
            >
              <SpaceBetween size="m">
                <FormField
                  label="Search standards"
                  stretch
                  secondaryControl={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button formAction="submit" variant="primary">
                        Search
                      </Button>
                      {query && (
                        <Button formAction="none" onClick={() => changeSearch('')}>
                          Clear search
                        </Button>
                      )}
                    </SpaceBetween>
                  }
                >
                  <Input
                    type="search"
                    value={query}
                    onChange={({ detail }) => changeSearch(detail.value)}
                    placeholder="Try emergency lighting, fire doors or an object code"
                    ariaLabel="Search standards"
                  />
                </FormField>
                <SpaceBetween direction="horizontal" size="l" alignItems="end">
                  <FormField label="Country">
                    <Select
                      selectedOption={countryOptions.find((o) => o.value === country) ?? countryOptions[0]}
                      options={countryOptions}
                      onChange={({ detail }) => changeSearch(query, kind, detail.selectedOption.value ?? '')}
                      filteringType="auto"
                      ariaLabel="Country"
                    />
                  </FormField>
                  {country && (
                    <Checkbox
                      checked={includeUnspecified}
                      onChange={({ detail }) => changeSearch(query, kind, country, detail.checked)}
                    >
                      Include standards with no country specified
                    </Checkbox>
                  )}
                  {(country || query || kind !== 'all') && (
                    <Button formAction="none" onClick={() => changeSearch('', 'all', '', true)}>
                      Clear all filters
                    </Button>
                  )}
                </SpaceBetween>
                {country && (
                  <Box variant="small">
                    Country filtering uses the source Region fields. Shared “All” rows are included;{' '}
                    {includeUnspecified
                      ? 'standards without country information are labelled separately.'
                      : 'standards without country information are hidden.'}{' '}
                    Check source conditions before use.
                  </Box>
                )}
                <SegmentedControl
                  label="Standard collection"
                  selectedId={kind}
                  onChange={({ detail }) => changeSearch(query, detail.selectedId)}
                  options={[
                    ['all', 'All standards'],
                    ['Compliance', 'Compliance'],
                    ['PM', 'Preventive Maintenance'],
                  ].map(([id, text]) => ({ id, text: `${text} (${counts[id]})` }))}
                />
                {!query && (
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Box variant="awsui-key-label">Explore a topic</Box>
                    {browseTopics.map((topic) => (
                      <Button key={topic} formAction="none" onClick={() => changeSearch(topic)}>
                        {topic}
                      </Button>
                    ))}
                  </SpaceBetween>
                )}
              </SpaceBetween>
            </Container>
          </form>
          <div id="bbm-search-results" ref={resultsRef} tabIndex={-1} aria-label="Matching BBM standards">
            <Container
              header={
                <Header variant="h2" counter={`(${results.length})`}>
                  Matching standards
                </Header>
              }
            >
              <SpaceBetween size="m">
                <p role="status">
                  {results.length} standards{query ? ` for “${query}”` : ''} ·{' '}
                  {filtered ? `Showing ${Math.min(limit, results.length)}` : 'Choose a topic or search'}
                  {kind !== 'all' ? ` · ${kindLabel(kind)}` : ''}
                  {country ? ` · ${regionLabel(country).label}` : ''}
                </p>
                {!results.length && (
                  <Alert
                    type="info"
                    header="No matching standards"
                    action={
                      <SpaceBetween direction="horizontal" size="xs">
                        {suggestion && <Button onClick={() => changeSearch(suggestion)}>Try “{suggestion}”</Button>}
                        {country && (
                          <Button onClick={() => changeSearch(query, kind, '', true)}>Search all countries</Button>
                        )}
                        {kind !== 'all' && (
                          <Button onClick={() => changeSearch(query, 'all')}>Search both collections</Button>
                        )}
                        <Button onClick={() => changeSearch('', 'all', '', true)}>Browse all standards</Button>
                      </SpaceBetween>
                    }
                  >
                    Try a shorter equipment name or an object code. No result does not mean that no requirement applies.
                  </Alert>
                )}
                {!filtered ? (
                  <Button onClick={() => setShowAll(true)}>Browse all {results.length} standards</Button>
                ) : (
                  <ul className="fs-results">
                    {results.slice(0, limit).map(({ entry: e, reason }) => (
                      <li key={e.id} id={'result-' + e.id} tabIndex={-1}>
                        <SpaceBetween size="xxs">
                          <Link
                            fontSize="heading-s"
                            href={
                              window.location.pathname +
                              standardLocation(window.location.search, e, query, kind, { country, includeUnspecified })
                            }
                            onFollow={(event) => {
                              event.preventDefault();
                              choose(e.id);
                            }}
                            ariaLabel={`${e.title}: read standard`}
                          >
                            {e.title}
                          </Link>
                          <SpaceBetween direction="horizontal" size="xs">
                            <Badge color={e.kind === 'PM' ? 'grey' : 'blue'}>{kindLabel(e.kind)}</Badge>
                            <ObjectCode code={e.code} />
                            <Box variant="small">
                              {e.edition} · pp. {e.page}
                              {e.endPage !== e.page ? '–' + e.endPage : ''}
                            </Box>
                          </SpaceBetween>
                          {country && (
                            <Box variant="small" color="text-body-secondary">
                              {byId.get(e.id)?.coverage.country
                                ? `Country-specific rows · ${regionLabel(country).label}`
                                : byId.get(e.id)?.coverage.shared
                                  ? 'Shared regional content · source says All'
                                  : 'Country not specified · check applicability'}
                            </Box>
                          )}
                          {query.trim() && (
                            <>
                              <Box variant="small" color="text-status-info">
                                {reason}
                              </Box>
                              <Box variant="small">
                                Source excerpt:{' '}
                                <Highlight
                                  text={sourceExcerpt(
                                    matchingSourceText(
                                      country
                                        ? byId.get(e.id)!.sourcePages
                                        : data.pages[e.kind].slice(e.page - 1, e.endPage),
                                      query,
                                    ) || e.searchText,
                                    query,
                                  )}
                                  query={query}
                                />
                              </Box>
                            </>
                          )}
                        </SpaceBetween>
                      </li>
                    ))}
                  </ul>
                )}
                {filtered && results.length > limit && (
                  <Button onClick={() => setLimit(limit + 20)}>Show 20 more standards</Button>
                )}
              </SpaceBetween>
            </Container>
          </div>
          <Container>
            <SpaceBetween size="s">
              <Section variant="default" header="How to read and check a standard">
                <Prose>
                  <ol>
                    {readingSteps.map(([step, text]) => (
                      <li key={step}>
                        <strong>{step}</strong> — {text}
                      </li>
                    ))}
                  </ol>
                </Prose>
              </Section>
              <Section variant="default" header="Document introductions and full downloads">
                <SpaceBetween size="s">
                  <Prose>
                    <p>Read the document guidance, contents and abbreviations alongside the selected standard.</p>
                  </Prose>
                  {['Compliance', 'PM'].map((k) => (
                    <SpaceBetween key={k} direction="horizontal" size="xs">
                      <Button onClick={() => choose(k + '-introduction')}>
                        Read {k === 'PM' ? 'Maintenance' : 'Compliance'} Introduction
                      </Button>
                      <Button iconName="download" onClick={() => download(k)}>
                        Download Full {k === 'PM' ? 'Maintenance' : 'Compliance'} PDF
                      </Button>
                    </SpaceBetween>
                  ))}
                </SpaceBetween>
              </Section>
              <Section variant="default" header="Not sure where to start? Try an emergency-lighting example">
                <Prose>
                  <p>
                    <small>Illustrative reading example · FERN guidance</small>
                  </p>
                  <p>
                    You want to understand which emergency-lighting requirements and maintenance tasks to review. Start
                    with the compliance standard, then follow its source reference to the maintenance standard.
                  </p>
                  <ol>
                    <li>
                      <strong>Read the compliance requirement.</strong> Open CT.ELEC.EMERGENCYAC and check its scope,
                      tasks and regional conditions.{' '}
                      <Link onFollow={() => choose('Compliance-CT.ELEC.EMERGENCYAC')}>
                        Read emergency lighting systems
                      </Link>
                    </li>
                    <li>
                      <strong>Follow the maintenance reference.</strong> The supplied compliance standard references
                      LIGHT.SAFETY. Read that standard’s tasks, intervals and conditions.{' '}
                      <Link onFollow={() => choose('PM-LIGHT.SAFETY')}>Read safety lighting and signage</Link>
                    </li>
                    <li>
                      <strong>Check the evidence needed.</strong> Keep the physical task frequency separate from the
                      evidence-upload interval. Reading these standards does not establish that a site is compliant.
                    </li>
                  </ol>
                  <p>
                    Source references: Compliance, April 2024, pages 15–17; Preventive Maintenance, March 2025, pages
                    125–126. Check the current authorised editions and applicability before using either.
                  </p>
                </Prose>
              </Section>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </div>
      {entry && (
        <article data-reading-scope key={entry.id}>
          <SpaceBetween size="l">
            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    <>
                      <ObjectCode code={entry.code} /> · {kindLabel(entry.kind)} · {entry.edition} · PDF pages {entry.page}–
                      {entry.endPage}
                    </>
                  }
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button iconName="arrow-left" onClick={back}>
                        Back to results
                      </Button>
                      <Button iconName="download" onClick={() => download(entry.id)}>
                        Download selected standard
                      </Button>
                      <Button iconName="download" onClick={() => download(entry.kind)}>
                        Download full document
                      </Button>
                    </SpaceBetween>
                  }
                >
                  <span id="bbm-standard-title" tabIndex={-1}>
                    {entry.title}
                  </span>
                </Header>
              }
            >
              <SpaceBetween size="m">
                {entry.code !== 'INTRODUCTION' && (
                  <nav aria-label="Read this standard">
                    <SpaceBetween direction="horizontal" size="l">
                      <a href="#bbm-standard-overview">Scope and source links</a>
                      <a href="#bbm-readable-tasks" onClick={() => setReadingView('tasks')}>
                        Tasks and conditions
                      </a>
                      <a href={`#bbm-${entry.kind}-${entry.page}`}>Original source pages</a>
                    </SpaceBetween>
                  </nav>
                )}
                {country && (
                  <Box variant="small">
                    Country selection: <RegionLabel code={country} />. The task reading view includes shared rows;
                    original tables and PDF downloads retain all countries.
                  </Box>
                )}
                <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                  <ExpandAllControls label="this standard" />
                </SpaceBetween>
                <Section variant="footer" header="Contents of this standard">
                  <nav aria-label="Standard contents">
                    <Prose>
                      {pages.map((page) => (
                        <div key={page.number}>
                          <a href={`#bbm-${entry.kind}-${page.number}`}>Original PDF page {page.number}</a>
                          <ul>
                            {page.blocks.map((block, index) =>
                              block.type === 'heading' ? (
                                <li key={index}>
                                  <a href={`#bbm-${entry.kind}-${page.number}-heading-${index}`}>{block.text}</a>
                                </li>
                              ) : null,
                            )}
                          </ul>
                        </div>
                      ))}
                    </Prose>
                  </nav>
                </Section>
              </SpaceBetween>
            </Container>
            {entry.code !== 'INTRODUCTION' && (
              <div id="bbm-standard-overview">
                <Container
                  header={
                    <Header
                      variant="h2"
                      description="These fields repeat the source. The document edition and the standard's own revision may differ; neither confirms current publication approval."
                    >
                      Standard overview
                    </Header>
                  }
                >
                  <SpaceBetween size="m">
                    <KeyValuePairs
                      columns={2}
                      items={standardOverview(data.pages[entry.kind][entry.page - 1].blocks, entry.kind).map(
                        (field) => ({ label: field.label, value: field.text }),
                      )}
                    />
                    <a href={`#bbm-${entry.kind}-${entry.page}`}>
                      Read the original fields and full conditions on page {entry.page}
                    </a>
                    <Section variant="default" header="Related standards" defaultExpanded>
                      <Prose>
                        {related.length ? (
                          <ul>
                            {related.map((r) => (
                              <li key={r.kind + r.code}>
                                {r.target ? (
                                  <Link onFollow={() => choose(r.target!.id)}>
                                    {r.label}: {r.target.title} · <ObjectCode code={r.code} />
                                  </Link>
                                ) : (
                                  <>
                                    {r.label}: <ObjectCode code={r.code} bold /> — No exact code match in the supplied edition.
                                    Check the source or an authorised code mapping.
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No related standard is explicitly identified in these source fields.</p>
                        )}
                        <p>
                          <small>
                            A related-standard reference does not establish complete compliance coverage. Read both
                            standards' conditions.
                          </small>
                        </p>
                      </Prose>
                    </Section>
                  </SpaceBetween>
                </Container>
              </div>
            )}
            <Container
              header={
                <Header
                  variant="h2"
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button onClick={showOriginal}>Compare with original PDF</Button>
                      <Button iconName="download" onClick={() => download(entry.kind)}>
                        Download full source PDF
                      </Button>
                    </SpaceBetween>
                  }
                >
                  Reading format
                </Header>
              }
            >
              <SpaceBetween size="m">
                <SegmentedControl
                  label="Reading format"
                  selectedId={readingView}
                  onChange={({ detail }) => setReadingView(detail.selectedId as 'tasks' | 'tables')}
                  options={[
                    { id: 'tasks', text: 'Task reading view' },
                    { id: 'tables', text: 'Original tables' },
                  ]}
                />
                {readingView === 'tables' && <span id="bbm-readable-tasks" />}
                {readingView === 'tasks' && entry.code !== 'INTRODUCTION' && (
                  <TaskReader pages={pages} kind={entry.kind} country={country} />
                )}
                <Box variant="small">
                  Read the scope, notes, task requirements and regional conditions together. Evidence-upload intervals
                  and physical task frequencies are separate. Blank source cells remain blank.
                </Box>
                {original && (
                  <div className="fs-original">
                    <SpaceBetween size="s">
                      <Link href={`${original}#page=${entry.page}`} external>
                        Open Original at Page {entry.page} (new tab)
                      </Link>
                      <Box variant="small">If your PDF viewer opens at the cover, enter page {entry.page}.</Box>
                      <object
                        aria-label="Original source PDF"
                        data={`${original}#page=${entry.page}`}
                        type="application/pdf"
                      >
                        <p>Use the original PDF link above if an embedded reader is unavailable.</p>
                      </object>
                      <Button onClick={() => setOriginal('')}>Close original PDF</Button>
                    </SpaceBetween>
                  </div>
                )}
              </SpaceBetween>
            </Container>
            <Container
              header={
                <Header
                  variant="h2"
                  description="The wording and tables below come from the supplied PDF. FERN reading guidance appears above."
                >
                  Original standard content
                </Header>
              }
            >
              <SpaceBetween size="s">
                <nav aria-label="Pages in this standard">
                  <SpaceBetween direction="horizontal" size="s">
                    {Array.from({ length: entry.endPage - entry.page + 1 }, (_, i) => entry.page + i).map((n) => (
                      <a key={n} href={`#bbm-${entry.kind}-${n}`}>
                        Page {n}
                      </a>
                    ))}
                  </SpaceBetween>
                </nav>
                {pages.map((page) => (
                  <Section
                    id={`bbm-${entry.kind}-${page.number}`}
                    key={page.number + '-' + readingView}
                    variant="default"
                    defaultExpanded={readingView === 'tables'}
                    header={`Original PDF Page ${page.number}`}
                    description="Read the complete source wording, tasks, tables and conditions"
                  >
                    <SpaceBetween size="s">
                      {page.figures?.map((src, i) => (
                        <figure key={i}>
                          <img
                            src={src}
                            alt={`Original source illustration ${i + 1}, PDF page ${page.number}`}
                            loading="lazy"
                            style={{ maxWidth: '100%' }}
                          />
                          <figcaption>
                            <Box variant="small">Original Source Illustration · Page {page.number}</Box>
                          </figcaption>
                        </figure>
                      ))}
                      {page.blocks.map((block, i) =>
                        block.type === 'table' ? (
                          <div
                            key={i}
                            className="fern-table-scroll"
                            tabIndex={0}
                            role="region"
                            aria-label={`Source table ${i + 1}, page ${page.number}. Scroll horizontally for all columns.`}
                          >
                            <table>
                              <caption>
                                <Box variant="small">
                                  Source Table · Page {page.number} — Scroll Sideways for All Columns
                                </Box>
                              </caption>
                              <colgroup>
                                {block.widths?.map((w, j) => (
                                  <col key={j} style={{ width: `${w}%` }} />
                                ))}
                              </colgroup>
                              <tbody>
                                {block.rows?.map((row, j) => (
                                  <tr key={j}>
                                    {row.map((cell, k) =>
                                      j === 0 && block.header ? (
                                        <th scope="col" key={k} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                                          {cell.text}
                                        </th>
                                      ) : (
                                        <td key={k} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                                          {cell.text}
                                        </td>
                                      ),
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : block.type === 'heading' ? (
                          <Box key={i} variant="h4">
                            <span id={`bbm-${entry.kind}-${page.number}-heading-${i}`}>{block.text}</span>
                          </Box>
                        ) : (
                          <Box key={i} variant="p">
                            <span className="fs-source-text">{block.text}</span>
                          </Box>
                        ),
                      )}
                      <Section variant="footer" header="View source page text">
                        <Box variant="p">
                          <span className="fs-source-text">{page.text}</span>
                        </Box>
                      </Section>
                    </SpaceBetween>
                  </Section>
                ))}
              </SpaceBetween>
            </Container>
            <Button iconName="arrow-left" onClick={back}>
              Back to standards
            </Button>
          </SpaceBetween>
        </article>
      )}
      <p role="status">{status}</p>
    </section>
  );
}
