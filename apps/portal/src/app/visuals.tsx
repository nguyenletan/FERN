// FERN imagery inside the Cloudscape layout: page photographs, the home hero, the FERN guide mascot and the
// Phosphor icons used for applications, pillars, Workspace topics, lessons and help topics.
import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowsClockwise,
  ArrowsLeftRight,
  BookOpen,
  Buildings,
  Calculator,
  ChartLineUp,
  ChatCircleText,
  CheckSquare,
  ClipboardText,
  Compass,
  FileMagnifyingGlass,
  FileText,
  Flag,
  GraduationCap,
  House,
  Lightbulb,
  LockKey,
  Megaphone,
  Scales,
  SealCheck,
  ShieldCheck,
  ShieldWarning,
  TreeStructure,
  UsersThree,
  Wrench,
  type Icon,
} from '@phosphor-icons/react';
import mission from '../features/visual/human-images/mission.jpg';
import leadership from '../features/visual/human-images/leadership.jpg';
import overview from '../features/visual/human-images/overview.jpg';
import planning from '../features/visual/human-images/planning.jpg';
import performance from '../features/visual/human-images/performance.jpg';
import risk from '../features/visual/human-images/risk.jpg';
import audit from '../features/visual/human-images/audit.jpg';
import improvement from '../features/visual/human-images/improvement.jpg';
import learn from '../features/visual/human-images/learn.jpg';
import heroImage from '../../../../packages/platform/src/assets/home-hero-black-colleague-blended.png';
import guideImage from '../../../../packages/platform/src/assets/fern-guide-transparent.png';

export const hero = { src: heroImage, alt: 'Facilities colleagues reviewing a tablet in a warehouse' };
/** Side-by-side image and text on wide screens; the image moves above the text on phones (side media cannot wrap). */
export function useMediaPosition(): 'side' | 'top' {
  const query = '(max-width: 688px)';
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setNarrow(list.matches);
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, []);
  return narrow ? 'top' : 'side';
}
export const fernGuide = { src: guideImage, alt: 'The FERN guide, a friendly facilities character' };

const scenes: Record<string, { src: string; alt: string }> = {
  'Mission & Pillars': { src: mission, alt: 'A facilities team exchanging ideas as they walk through a building.' },
  'Leadership & Policy': {
    src: leadership,
    alt: 'A facilities leader listening to colleagues as they discuss priorities.',
  },
  'FM Overview': { src: overview, alt: 'A facilities manager and technician reviewing building information together.' },
  'Planning & Objectives': {
    src: planning,
    alt: 'Colleagues reviewing a building plan and agreeing their next steps.',
  },
  'Performance & KPIs': { src: performance, alt: 'Two colleagues discussing trends in performance information.' },
  'Risk & Compliance': {
    src: risk,
    alt: 'A specialist and technician reviewing a checklist during a visual inspection.',
  },
  'Audit & Assurance': { src: audit, alt: 'An assessor and site representative reviewing evidence together.' },
  'Continual Improvement': { src: improvement, alt: 'A facilities team sharing observations and lessons learned.' },
  Learn: { src: learn, alt: 'An experienced technician coaching a colleague using training equipment.' },
};
/** Photograph banner at the top of a Workspace topic, Mission & Pillars or Learn. */
export function PageBanner({ scene }: { scene: string }) {
  const image = scenes[scene];
  if (!image) return null;
  return (
    <figure className="fern-banner">
      <img
        src={image.src}
        alt={image.alt + ' Amazon branding and automated logistics equipment appear in the background.'}
        width={1536}
        height={1024}
        decoding="async"
      />
    </figure>
  );
}

// Icons, in the same order as their lists elsewhere (homeApplications, frameworkContent pillars, lessons, help topics).
export const applicationIcons: Icon[] = [FileText, ChartLineUp, UsersThree, Calculator, ClipboardText];
export const pillarIcons: Icon[] = [
  Compass,
  UsersThree,
  Flag,
  Lightbulb,
  GraduationCap,
  CheckSquare,
  ChartLineUp,
  ArrowsClockwise,
];
export const topicIcons: Record<string, Icon> = {
  'Mission & Pillars': Compass,
  'Leadership & Policy': UsersThree,
  'FM Overview': House,
  'Planning & Objectives': ClipboardText,
  'Performance & KPIs': ChartLineUp,
  'Risk & Compliance': ShieldCheck,
  'Audit & Assurance': FileText,
  'Continual Improvement': ArrowsLeftRight,
  Workspace: UsersThree,
  'Standards & Reference Library': BookOpen,
  Learn: Buildings,
};
export const lessonIcons: Record<string, Icon> = {
  'Understanding FERN': BookOpen,
  'Service Models Explained': TreeStructure,
  'From Tender to Transition': ClipboardText,
  'Assets, Condition and Lifecycle': ArrowsClockwise,
  'Risk, Criticality and Maintenance': ShieldWarning,
  'Performance, KPIs and SLAs': ChartLineUp,
  'Sources and Evidence': FileMagnifyingGlass,
  'Policies, BBM Standards and Requirements': Scales,
  'Assurance and Continual Improvement': SealCheck,
};
export const helpIcons: Record<string, Icon> = {
  'Using FERN': Compass,
  'FM Guidance': BookOpen,
  'Data & Evidence Problem': FileMagnifyingGlass,
  'Access Problem': LockKey,
  'Technical Problem': Wrench,
  'Content Question': ChatCircleText,
  'Improvement Suggestion': Lightbulb,
  'What’s New in FERN': Megaphone,
};

/** A decorative FERN-blue icon (hidden from screen readers; the text beside it carries the meaning). */
export function FernIcon({ icon: Glyph, size = 24 }: { icon?: Icon; size?: number }) {
  return Glyph ? (
    <Glyph className="fern-icon" size={size} weight="duotone" aria-hidden="true" focusable="false" />
  ) : null;
}
/** Text with its icon in front, for card headers, section headers and page titles. */
export function IconTitle({ icon, size, children }: { icon?: Icon; size?: number; children: ReactNode }) {
  return (
    <span className="fern-icon-title">
      <FernIcon icon={icon} size={size} />
      <span>{children}</span>
    </span>
  );
}
