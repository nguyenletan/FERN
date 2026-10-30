import { taskReading, type ReadingPage, type ReadingRow } from './taskReading.ts';
import type { StandardEntry } from './standardsSearch.ts';
export const countryCodes = ['CZ', 'DE', 'ES', 'FR', 'IT', 'PL', 'ROI', 'SK', 'UK'] as const;
export function normaliseCountry(value: string) {
  const key = value.toUpperCase();
  return countryCodes.includes(key as (typeof countryCodes)[number]) ? key : '';
}
export function rowCountryMatch(row: ReadingRow, country: string): 'country' | 'shared' | 'unspecified' | 'other' {
  const region =
    row.fields
      .find((field) => field.label === 'Region')
      ?.value.trim()
      .toUpperCase() ?? '';
  if (region === 'ALL') return 'shared';
  if (country && region === country) return 'country';
  return normaliseCountry(region) ? 'other' : 'unspecified';
}
export function visibleCountryRow(row: ReadingRow, country: string) {
  return !country || rowCountryMatch(row, country) !== 'other';
}
type SearchBlock = ReadingPage['blocks'][number] & { text?: string };
type SearchPage = { number: number; blocks: SearchBlock[] };
export function countryContent(pages: SearchPage[], country: string) {
  const reading = taskReading(pages);
  const rows = [...reading.tasks, ...reading.regions];
  const types = rows.map((row) => rowCountryMatch(row, country));
  const coverage = {
    country: types.includes('country'),
    shared: types.includes('shared'),
    unspecified: !rows.length || types.includes('unspecified'),
  };
  // Build a search-only view from intact eligible source cells; source objects are never changed.
  const sourcePages: SearchPage[] = pages.map((page) => ({
    ...page,
    blocks: page.blocks.flatMap((block, index): SearchBlock[] => {
      const tableRows = rows.filter((row) => row.page === page.number && row.block === index);
      if (!tableRows.length) return [block];
      return [
        {
          type: 'table',
          rows: tableRows
            .filter((row) => visibleCountryRow(row, country))
            .map((row) => row.fields.map((field, col) => ({ text: field.value, col, colSpan: 1, rowSpan: 1 }))),
        },
      ];
    }),
  }));
  return {
    coverage,
    sourcePages,
    searchText: sourcePages
      .flatMap((page) =>
        page.blocks.flatMap((block) =>
          block.rows ? block.rows.flatMap((row) => row.map((cell) => cell.text)) : block.text ? [block.text] : [],
        ),
      )
      .join('\n'),
  };
}
export function countryCatalogue(
  entries: StandardEntry[],
  pages: Record<string, SearchPage[]>,
  country: string,
  includeUnspecified = true,
) {
  return entries.flatMap((entry) => {
    const source = pages[entry.kind].slice(entry.page - 1, entry.endPage);
    const content = countryContent(source, country);
    if (
      country &&
      !content.coverage.country &&
      !content.coverage.shared &&
      !(includeUnspecified && content.coverage.unspecified)
    )
      return [];
    return [{ entry: country ? { ...entry, searchText: content.searchText } : entry, ...content }];
  });
}
