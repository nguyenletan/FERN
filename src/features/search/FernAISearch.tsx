import { useRef, useState } from 'react';
import Autosuggest from '@cloudscape-design/components/autosuggest';
import { homeApplications } from '../dashboard/homeApplications';
import { workspacePages } from '../overview/WorkspaceIndex';
import { lessonTitles } from '../../app/portalRoutes';
import { usePortalNavigation } from '../../app/ui';
const topics = [
  ['Mission & Pillars', 'mission purpose pillars amazon'],
  ['Leadership & Policy', 'leadership policy policies governance responsibilities'],
  ['FM Overview', 'overview facilities management service models'],
  ['Planning & Objectives', 'planning objectives priorities needs'],
  ['Performance & KPIs', 'performance kpi measures metrics data'],
  ['Risk & Compliance', 'risk compliance requirements statutory'],
  ['Audit & Assurance', 'audit assurance evidence assessment'],
  ['Continual Improvement', 'improvement lessons learning actions'],
  ['Standards & Reference Library', 'reference library standards bbm maintenance source documents compliance'],
  ['Learn', 'learn learning training courses service models'],
  ['Get started', 'start introduction beginning'],
  ['Help & Guidance', 'help support guidance'],
];
const topicDescriptions = Object.fromEntries(workspacePages);

export type SearchHit = { title: string; to: string; description?: string };
export type SearchGroup = { label: string; hits: SearchHit[] };
/** Keyword search across FERN guidance, learning topics and applications (not AI answers).
 *  Words of three or more letters are matched; results are ranked by how many words they match. */
export function searchFern(query: string): SearchGroup[] {
  const words =
    query
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.filter((w) => w.length > 2) ?? [];
  const rank = (items: { text: string; hit: SearchHit }[]) =>
    items
      .map(({ text, hit }) => ({ hit, score: words.filter((w) => text.toLowerCase().includes(w)).length }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ hit }) => hit);
  return [
    {
      label: 'Guidance',
      hits: rank(
        topics.map(([title, keywords]) => ({
          text: title + ' ' + keywords,
          hit: { title, to: title, description: topicDescriptions[title] },
        })),
      ),
    },
    {
      label: 'Learning topics',
      hits: rank(lessonTitles.map((title) => ({ text: title, hit: { title, to: title } }))),
    },
    {
      label: 'Applications (coming soon)',
      hits: rank(
        homeApplications.map((app) => ({
          text: [app.title, app.description, ...app.keywords].join(' '),
          hit: { title: app.title, to: app.name, description: app.description },
        })),
      ),
    },
  ];
}
const options = [
  {
    label: 'Guidance',
    options: topics.map(([title, keywords]) => ({ value: title, label: title, tags: keywords.split(' ') })),
  },
  { label: 'Learning topics', options: lessonTitles.map((title) => ({ value: title, label: title })) },
  {
    label: 'Applications (coming soon)',
    options: homeApplications.map((app) => ({
      value: app.name,
      label: app.title,
      description: app.description,
      tags: app.keywords,
    })),
  },
];
/** SEARCH-10: one shared discovery entry point (keyword matches, not AI answers); live Quick Suite integration remains required.
 *  Choosing a suggestion opens that page; Enter or “Search FERN for …” opens the search results page. */
export default function FernSearch() {
  const { go, search } = usePortalNavigation();
  const [value, setValue] = useState('');
  // When a suggestion was last chosen, so the Enter key that chose it does not also open the results page.
  const chosenAt = useRef(0);
  const open = (page: string) => {
    go(page);
    setValue('');
  };
  const showResults = (text: string) => {
    if (!text.trim()) return;
    search(text.trim());
    setValue('');
  };
  return (
    <Autosuggest
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      onSelect={({ detail }) => {
        chosenAt.current = Date.now();
        if (detail.selectedOption?.value) open(detail.selectedOption.value);
        else showResults(detail.value);
      }}
      onKeyDown={({ detail }) => {
        if (detail.key !== 'Enter') return;
        const text = value;
        setTimeout(() => {
          if (Date.now() - chosenAt.current > 200) showResults(text);
        });
      }}
      options={options}
      filteringType="auto"
      enteredTextLabel={(text) => `Search FERN for “${text}”`}
      placeholder="Find a topic or guide"
      ariaLabel="Search FERN"
      empty="No matching topic. Press Enter to see all results, or open Help & Guidance."
      virtualScroll={false}
    />
  );
}
