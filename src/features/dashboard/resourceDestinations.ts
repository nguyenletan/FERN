import type { HomePanel } from '../../app/portalRoutes.ts';
export const resourceDestinations: { label: string; panel: HomePanel }[] = [
  { label: 'Get started', panel: 'guide' },
  { label: 'Learn', panel: 'learn' },
  { label: 'Standards & Reference Library', panel: 'reference' },
  { label: 'Help & Guidance', panel: 'help' },
  { label: 'What’s new in FERN', panel: 'updates' },
  { label: 'About FERN', panel: 'about' },
];
export const legacyResourcePanels: Record<string, HomePanel> = {
  'Reference Library': 'reference',
  'Getting Started': 'guide',
  'Framework Documentation': 'reference',
  Glossary: 'learn',
  FAQs: 'help',
  'Contact / Support': 'help',
  'Facility Information': 'facility',
};
