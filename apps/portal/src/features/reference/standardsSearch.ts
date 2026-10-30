export type StandardEntry = {
  id: string;
  kind: string;
  title: string;
  code: string;
  page: number;
  endPage: number;
  edition: string;
  searchText: string;
};
const normal = (text: string) => text.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
export function standardMatch(entry: StandardEntry, query: string) {
  const q = normal(query),
    terms = q.split(' ').filter(Boolean),
    title = normal(entry.title),
    code = normal(entry.code);
  if (!q) return { score: 0, label: '' };
  if (code === q) return { score: 5, label: 'Exact object code' };
  if (title === q) return { score: 4, label: 'Exact title' };
  if (terms.every((t) => title.includes(t))) return { score: 3, label: 'Title match' };
  if (terms.every((t) => `${title} ${code}`.includes(t))) return { score: 2, label: 'Title / code match' };
  return { score: 1, label: 'Source wording match' };
}
export function findStandards(entries: StandardEntry[], query: string, kind = 'all') {
  const terms = normal(query).split(' ').filter(Boolean);
  return entries
    .filter(
      (e) =>
        e.code !== 'INTRODUCTION' &&
        (kind === 'all' || e.kind === kind) &&
        terms.every((t) => normal(`${e.title} ${e.code} ${e.searchText}`).includes(t)),
    )
    .sort((a, b) => standardMatch(b, query).score - standardMatch(a, query).score);
}
