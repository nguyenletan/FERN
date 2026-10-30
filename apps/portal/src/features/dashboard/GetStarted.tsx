import {BookOpen,Compass,Files,ArrowRight} from '@phosphor-icons/react';
import {openGuidanceSection} from '../visual/GuidanceRoute';
import type { HomePanel } from './HomeNavigation.tsx';
import './get-started.css';

const workspaceTasks = [
  ['Understand the FM picture', 'FM Overview'],
  ['Explore planning and objectives', 'Planning & Objectives'],
  ['Understand performance measures', 'Performance & KPIs'],
  ['Review risk and applicable requirements', 'Risk & Compliance'],
  ['Understand assessment findings and evidence', 'Audit & Assurance'],
  ['Explore improvement opportunities', 'Continual Improvement'],
  ['Find policy and governance guidance', 'Leadership & Policy'],
];

export default function GetStarted({ onPanel, onNavigate }: {
  onPanel: (panel: HomePanel) => void;
  onNavigate: (page: string) => void;
}) {
  return <div className="fern-get-started fern-start-friendly"><p className="fern-friendly-intro">You don’t need to know where everything lives. Start with the question you want to answer.</p><nav className="fern-start-paths" aria-label="Choose your starting point"><button onClick={()=>openGuidanceSection('start-task-section')}><Compass size={30} weight="duotone" aria-hidden="true"/><strong>Find guidance for my task</strong><span>Choose the FM topic you are working on.</span><small>Choose a topic <ArrowRight size={16} aria-hidden="true"/></small></button><button onClick={()=>onPanel('learn')}><BookOpen size={30} weight="duotone" aria-hidden="true"/><strong>Learn about FERN and FM</strong><span>Start with an introductory learning topic.</span><small>Open Learn <ArrowRight size={16} aria-hidden="true"/></small></button><button onClick={()=>onPanel('reference')}><Files size={30} weight="duotone" aria-hidden="true"/><strong>Find a standard or source</strong><span>Search the supplied BBM standards and read the source.</span><small>Open Reference Library <ArrowRight size={16} aria-hidden="true"/></small></button></nav>
    <p>Find the right place to begin. Explore the Workspace guidance, learning topics and reference material.</p>
    <section id="start-task-section" aria-labelledby="start-task">
      <h3 id="start-task" tabIndex={-1}>1. What Are You Trying to Do?</h3>
      <p>Choose a topic to read the relevant Workspace guidance.</p>
      <div className="fern-start-choices">{workspaceTasks.map(([task, page]) => <button key={page} onClick={() => onNavigate(page)}><strong>{task}</strong><span>{page} →</span></button>)}</div>
    </section>
    <section aria-labelledby="start-learning">
      <h3 id="start-learning">2. Explore Guidance and Learning</h3>
      <p>Browse the Workspace sections to understand FM governance and practices. Visit Learn for introductory topics, or the Reference Library for guidance on sources and document status. You do not need to select a facility.</p>
      <div className="fern-start-choices">
        <button onClick={() => onPanel('learn')}><strong>Explore Learning Topics</strong><span>Read introductions to FERN and FM concepts →</span></button>
        <button onClick={() => onPanel('reference')}><strong>Visit the Reference Library</strong><span>Understand sources, versions and applicability →</span></button>
      </div>
    </section>
    <section aria-labelledby="start-evidence">
      <h3 id="start-evidence">3. Check the Information and Its Sources</h3>
      <p>When reading guidance, check its source, date and applicability. These terms help you understand what is available and what still needs confirmation.</p>
      <dl>{[
        ['Available', 'Information can be reviewed. Check its source and whether it applies to your task.'],
        ['Not Available', 'The information is not currently available.'],
        ['Not Confirmed', 'Information exists but needs confirmation before the intended use.'],
        ['Evidence Required', 'Additional supporting information is needed.'],
      ].map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{text}</dd></div>)}</dl>
      <p>A FERN explanation does not replace the authoritative source or establish approval.</p>
    </section>
    <section aria-labelledby="start-models">
      <h3 id="start-models">Compare Service Options</h3>
      <p>The delivery model describes <strong>how the service is delivered</strong>. The service tier describes <strong>the level of service required</strong>. Compare them separately before reviewing combinations.</p>
      <details><summary>Understand Delivery Models and Service Tiers</summary>
        <dl>{[
          ['Blue Badge', 'Amazon employees delivering activities internally.'],
          ['IFM', 'External Yellow Badge provision against specified inputs, resources, activities and requirements.'],
          ['IFM Hybrid', 'Mixed Blue Badge and Yellow Badge delivery under the applicable service arrangement.'],
          ['Fully Contained', 'External Yellow Badge provision against defined output-based service requirements.'],
        ].map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{text}</dd></div>)}</dl>
        <p>Prime is the highest service tier, Plus is intermediate, and Core is the basic tier. Mandatory requirements apply at every tier. Actual responsibilities come from the applicable service arrangement and contract.</p>
        <p>Compare operating conditions, asset needs, resource capability, criticality, risk, maintenance, lifecycle, cost and evidence quality. Opening a tool does not select a model or commit a decision.</p>
      </details>
      <button className="fern-outline" onClick={() => onPanel('learn')}>Read About Service Models</button>
    </section>
    <section aria-labelledby="start-help">
      <h3 id="start-help">Need Help Finding Your Way?</h3>
      <button className="fern-outline" onClick={() => onPanel('help')}>Explore Help &amp; Guidance</button>
    </section>
  </div>;
}
