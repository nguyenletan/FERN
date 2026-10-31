import { useState } from 'react';
import Autosuggest from '@cloudscape-design/components/autosuggest';
import { homeApplications } from '../dashboard/homeApplications';
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
export function findGuidance(query: string) {
  const words =
    query
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.filter((w) => w.length > 2) ?? [];
  return topics
    .filter(([title, keywords]) => words.some((w) => (title + ' ' + keywords).toLowerCase().includes(w)))
    .map(([title]) => title);
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
/** SEARCH-10: one shared discovery entry point (keyword matches, not AI answers); live Quick Suite integration remains required. */
export default function FernSearch() {
  const { go } = usePortalNavigation();
  const [value, setValue] = useState('');
  const open = (text: string) => {
    const known = options.flatMap((group) => group.options).find((option) => option.value === text);
    go(known ? known.value : (findGuidance(text)[0] ?? 'Help & Guidance'));
    setValue('');
  };
  return (
    <Autosuggest
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      onSelect={({ detail }) => open(detail.value)}
      options={options}
      filteringType="auto"
      enteredTextLabel={(text) => `Search FERN for “${text}”`}
      placeholder="Find a topic or guide"
      ariaLabel="Search FERN"
      empty="No matching topic. Try another word or open Help & Guidance."
      virtualScroll={false}
    />
  );
}
