import type { HomePanel } from './HomeNavigation.tsx';
export const resourceDestinations: {label:string;panel:HomePanel}[] = [
 {label:'Get Started',panel:'guide'},
 {label:'Learn',panel:'learn'},
 {label:'Reference Library',panel:'reference'},
 {label:'Help & Guidance',panel:'help'},
 {label:'What’s New in FERN',panel:'updates'},
];
export const legacyResourcePanels: Record<string,HomePanel> = {
 'About FERN':'about','Getting Started':'guide','Framework Documentation':'reference','Glossary':'learn',
 'FAQs':'help','Contact / Support':'help',
};
