import {BookOpen,TreeStructure,ClipboardText,ArrowsClockwise,ShieldWarning,ChartLineUp,FileMagnifyingGlass,Scales,SealCheck,CaretRight} from '@phosphor-icons/react';
import {VisualGuide} from '../visual/VisualGuide';
import HumanImage from '../visual/HumanImage';
import {homeApplications} from './homeApplications.ts';
import {useEffect, useRef} from 'react';
import IntroductoryLearning from './IntroductoryLearning.tsx';
import type { HomePanel } from './HomeNavigation.tsx';
import './get-started.css';
import './learning-topic-icons.css';

const topics = [
  {title:'Understanding FERN', icon:BookOpen, what:'FERN brings facilities guidance and decision-support tools into one workspace.', why:'Start from your question and find the information or tool that helps you answer it.', use:'Use Get Started to find Workspace guidance, introductory learning and reference information. No facility selection is needed.', limit:'A tool output is not formal approval. Check the supporting evidence and required review.', page:'FM Overview'},
  {title:'Service Models Explained', icon:TreeStructure, what:'A delivery model describes how services are delivered; a service tier describes the required level of service.', why:'Keeping them separate makes comparisons clearer.', use:'Compare internal Blue Badge, external IFM, mixed IFM Hybrid and output-based Fully Contained arrangements alongside Prime, Plus and Core tiers.', limit:'Actual responsibilities follow the applicable arrangement and contract. Mandatory requirements apply at every tier.', page:'Leadership & Policy'},
  {title:'From Tender to Transition', icon:ClipboardText, what:'A connected journey from defining an FM requirement to preparing a change in service delivery.', why:'Decisions made before a contract affect resources, pricing, assets and mobilisation.', use:'Start with pre-contract assessment, review service options and pricing, consider lifecycle implications, then plan the transition.', limit:'Moving between tools does not automatically approve a contract or confirm operational readiness.', page:'FM Pre-Contract / Pre-Tender Assessment'},
  {title:'Assets, Condition and Lifecycle', icon:ArrowsClockwise, what:'Lifecycle assessment considers an asset’s condition, service needs and future options over time.', why:'Age alone does not establish when replacement is needed.', use:'Review quantities, condition, maintenance history and supported service-life assumptions in Lifecycle & Asset Analysis.', limit:'Do not infer missing service life, failure history or costs. Engineering review is needed for material adjustments.', page:'Lifecycle & Asset Analysis'},
  {title:'Risk, Criticality and Maintenance', icon:ShieldWarning, what:'Criticality describes the importance of an asset or service; risk considers what could happen and its consequences.', why:'Operating conditions, redundancy and recovery capability influence maintenance decisions.', use:'Explore risk and compliance guidance alongside the relevant asset and maintenance evidence.', limit:'A lower cost or service tier cannot remove applicable mandatory requirements. Scores need a validated method.', page:'Risk & Compliance'},
  {title:'Performance, KPIs and SLAs', icon:ChartLineUp, what:'Measures and service commitments help explain whether expected outcomes are being achieved.', why:'A result is meaningful only when its definition, period and evidence are understood.', use:'Read measure definitions, exclusions and evidence requirements before comparing results.', limit:'Do not assume universal targets. Critical Performance Indicators are a developing classification, not established thresholds.', page:'Performance & KPIs'},
  {title:'Sources and Evidence', icon:FileMagnifyingGlass, what:'Sources explain where information came from; evidence supports the interpretation or result.', why:'Version, date, status and applicability affect whether information can support your decision.', use:'Review source records and distinguish confirmed information, assumptions and gaps.', limit:'Missing evidence is not proof that a requirement was met. A secondary explanation does not replace an authoritative source.', page:'Audit & Assurance'},
  {title:'Policies, BBM Standards and Requirements', icon:Scales, what:'Policies provide direction; BBM Standards and applicable requirements inform the expected FM outcomes.', why:'Guidance and supporting references have different authority from applicable requirements.', use:'Start with Leadership & Policy and check the original source, version and applicability.', limit:'External references do not automatically establish Amazon adoption or certification. FERN explanations do not create mandatory requirements.', page:'Leadership & Policy'},
  {title:'Assurance and Continual Improvement', icon:SealCheck, what:'Assurance reviews evidence against requirements; improvement uses experience to review how outcomes can be improved.', why:'A finding, corrective action and verified improvement are different stages.', use:'Follow the evidence through findings, actions and verification, then consider lessons for wider review.', limit:'A successful local change does not automatically become a global standard. Claimed benefits need evidence.', page:'Continual Improvement'},
];

export default function Learn({onPanel,onNavigate,requestedLesson,onLesson}:{onLesson?:(title:string)=>void;requestedLesson?:{title:string;request:number}|null;onPanel:(panel:HomePanel)=>void;onNavigate:(page:string)=>void}) {
 const lessonsRef = useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!requestedLesson)return;
  const target=Array.from(lessonsRef.current?.querySelectorAll<HTMLDetailsElement>('details')??[]).find(item=>item.querySelector('summary')?.textContent?.toLowerCase()===requestedLesson.title.toLowerCase());
  if(!target)return;
  target.open=true;
  const frame=requestAnimationFrame(()=>{
   target.querySelector('summary')?.focus({preventScroll:true});
   target.scrollIntoView({block:'start'});
  });
  return()=>cancelAnimationFrame(frame);
 },[requestedLesson]);
 return <div ref={lessonsRef} className="fern-get-started fern-learning-topics"><div className="human-learn-intro"><HumanImage discipline="Learn"/><VisualGuide art="learning" steps={["Choose a topic", "Explore the guidance", "Apply the learning"]}/></div>
  <p>Understand FERN, explore FM concepts and find guidance for your next decision. You can read these introductory topics without choosing a facility.</p>
  <p>Choose a topic to expand it. Learning explains concepts; it does not create requirements or certify competence.</p>
  {topics.map(topic=><details key={topic.title}>
   <summary onClick={event=>{if(onLesson&&!event.currentTarget.parentElement?.hasAttribute("open")){event.preventDefault();onLesson?.(topic.title);}}}><topic.icon className="fern-learning-topic-icon" size={22} weight="regular" aria-hidden="true" focusable="false"/><span>{topic.title}</span><CaretRight className="fern-learning-topic-chevron" size={16} aria-hidden="true" focusable="false"/></summary>
   <h3>What Is It?</h3><p>{topic.what}</p>
   <h3>Why Does It Matter?</h3><p>{topic.why}</p>
   <h3>How Does FERN Use It?</h3><p>{topic.use}</p>
   <h3>What Should I Check?</h3><p>{topic.limit}</p>
   <IntroductoryLearning topic={topic.title}/>
   <h3>Related Guidance and Sources</h3>
   <p>This is an introductory FERN explanation. Check the applicable source and its status before using it for a facility decision.</p>
   <div className="fern-start-choices">{!homeApplications.some(app=>app.name===topic.page)&&<button disabled={false} onClick={()=>onNavigate(topic.page)}>{homeApplications.some(app=>app.name===topic.page) ? topic.page + " — Coming soon" : "Read " + topic.page + " →"}</button>}<button onClick={()=>onPanel('reference')}>Reference Library →</button></div>
  </details>)}
  <section><h3>Need Help Finding a Starting Point?</h3><button className="fern-outline" onClick={()=>onPanel('guide')}>Get Started</button></section>
 </div>;
}
