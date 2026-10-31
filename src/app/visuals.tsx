// FERN imagery inside the Cloudscape layout: page photographs, the home hero, the FERN guide mascot and the
// symbol icons for applications, pillars and Workspace topics (Lucide stroke icons inside the Cloudscape Icon component).
import { useEffect, useState, type ReactNode } from 'react';
import Icon from '@cloudscape-design/components/icon';
import {
  ArrowLeftRight,
  BookOpen,
  Building2,
  Calculator,
  ClipboardList,
  Compass,
  FileText,
  Flag,
  GraduationCap,
  House,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  SquareCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import mission from '../features/visual/human-images/mission.jpg';
import leadership from '../features/visual/human-images/leadership.jpg';
import overview from '../features/visual/human-images/overview.jpg';
import planning from '../features/visual/human-images/planning.jpg';
import performance from '../features/visual/human-images/performance.jpg';
import risk from '../features/visual/human-images/risk.jpg';
import audit from '../features/visual/human-images/audit.jpg';
import improvement from '../features/visual/human-images/improvement.jpg';
import learn from '../features/visual/human-images/learn.jpg';
import heroImage from '../assets/home-hero-black-colleague-blended.png';
import guideImage from '../assets/fern-guide-transparent.png';

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

// Icons, in the same order as their lists elsewhere (homeApplications, frameworkContent pillars).
// Cloudscape iconography: symbol icons sit to the left of a labelled resource, never beside page or section headings.
export const applicationIcons: LucideIcon[] = [FileText, TrendingUp, Users, Calculator, ClipboardList];
export const pillarIcons: LucideIcon[] = [
  Compass,
  Users,
  Flag,
  Lightbulb,
  GraduationCap,
  SquareCheck,
  TrendingUp,
  RefreshCw,
];
export const topicIcons: Record<string, LucideIcon> = {
  'Mission & Pillars': Compass,
  'Leadership & Policy': Users,
  'FM Overview': House,
  'Planning & Objectives': ClipboardList,
  'Performance & KPIs': TrendingUp,
  'Risk & Compliance': ShieldCheck,
  'Audit & Assurance': FileText,
  'Continual Improvement': ArrowLeftRight,
  Workspace: Users,
  'Standards & Reference Library': BookOpen,
  Learn: Building2,
};

export type FernIconSize = 'normal' | 'medium' | 'big';
/** A decorative FERN-blue icon (hidden from screen readers; the text beside it carries the meaning).
 *  Cloudscape sizes it (normal 16, medium 20, big 32 px) and sets the stroke width; match the size to the text beside it. */
export function FernIcon({ icon: Glyph, size = 'medium' }: { icon?: LucideIcon; size?: FernIconSize }) {
  return Glyph ? (
    <span className="fern-icon">
      <Icon svg={<Glyph focusable="false" />} size={size} />
    </span>
  ) : null;
}
/** A labelled resource with its symbol icon in front: navigation cards and resource lists, not page or section headings. */
export function IconTitle({ icon, size, children }: { icon?: LucideIcon; size?: FernIconSize; children: ReactNode }) {
  return (
    <span className="fern-icon-title">
      <FernIcon icon={icon} size={size} />
      <span>{children}</span>
    </span>
  );
}
