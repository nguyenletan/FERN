/** One-sentence plain-text summary shown on a closed Workspace section. */
export type SummarisedSection = {body: string; summary?: string};
const plain = (text: string) => text
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/\*\*/g, '')
  .replace(/^\s*(?:[-*]|\d+\.)\s+/, '')
  .trim();
export function sectionSummary(section: SummarisedSection): string {
  if (section.summary) return section.summary;
  const paragraph = section.body.trim().split(/\n\n+/).find(p => !p.trim().startsWith('|')) ?? '';
  return plain(paragraph.split('\n')[0]).split(/(?<=[.!?])\s/)[0];
}
