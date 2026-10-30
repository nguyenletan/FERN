import FernAISearch from '../search/FernAISearch';
import {PageArtwork} from '../visual/VisualGuide';
import './overview.css';

const areas = [
  ['Performance Requiring Attention','Performance exceptions and trends are not available.','Read Performance Guidance','Performance & KPIs'],
  ['Mandatory Requirement Exceptions','Requirement exceptions and applicability assessments are not available.','Read Requirements Guidance','Risk & Compliance'],
  ['Material FM Risks','Risk assessments and material risk summaries are not available.','Read Risk Guidance','Risk & Compliance'],
  ['Audit Findings & Corrective Actions','Findings, action status and verification records are not available.','Read Assurance Guidance','Audit & Assurance'],
  ['Asset & Lifecycle Exposure','An overview of lifecycle exposure is not available. Lifecycle analysis will be available through the application.','Read Asset Guidance','Learn'],
  ['Evidence & Data Gaps','An aggregated evidence-gap assessment is not available.','Read Evidence Guidance','Audit & Assurance'],
  ['Improvement Signals','Recurring-issue summaries and verified improvements are not available.','Read Improvement Guidance','Continual Improvement'],
];
export default function FmOverviewPage({onNavigate}:{onNavigate:(destination:string)=>void}){
 return <article className="fern-overview" aria-labelledby="overview-title">
  <header className="overview-card"><PageArtwork art="people"/><p className="overview-eyebrow">Your FM Workspace</p><h1 id="overview-title">FM Overview</h1><p className="overview-intro">See the FM information that needs attention and find the right place to investigate.</p><p>Review performance, requirements, risk, assurance and lifecycle information together. Detailed guidance and analysis remain in the relevant Workspace areas and applications.</p></header><FernAISearch page="FM Overview"/>

  <section className="overview-card" aria-labelledby="overview-attention"><h2 id="overview-attention">What Needs Attention?</h2><p className="overview-empty">Operational summaries are not available on this website. This does not mean that no issues exist or that an assessment has been completed.</p><p>Use the areas below to review guidance for the topic.</p><div className="overview-grid">{areas.map(([title,text,action,destination])=><section className="overview-area" key={title}><h3>{title}</h3><p>{text}</p><button onClick={()=>onNavigate(destination)}>{action}<span aria-hidden="true"> →</span></button></section>)}</div></section>
  <section className="overview-card"><h2>Read the Overview With Its Evidence</h2><details><summary>Keep Mandatory Issues Separate</summary><p>Applicable mandatory requirements remain visible separately from general performance. An overall positive result does not cancel an individual mandatory exception.</p></details><details><summary>Compare Trends Only When Supported</summary><p>Check reporting periods, definitions, populations and evidence quality before comparing results. Without comparable history, a trend cannot be established.</p></details><details><summary>Trace Each Conclusion</summary><p>Review the source, period, applicability and limitations behind a result. An overview summarises information; the originating records and relevant assessment methods provide the basis for a decision.</p></details></section>
 </article>;
}
