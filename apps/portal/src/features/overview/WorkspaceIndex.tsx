import FernAISearch from '../search/FernAISearch';
import {VisualGuide} from '../visual/VisualGuide';
import '../dashboard/get-started.css';
const pages = [
 ["Mission & Pillars","Explore our FM mission and the eight pillars that guide how we work."],
 ['Leadership & Policy','Understand FM direction, policies and guidance.'],
 ['FM Overview','Review available FM information and areas needing attention.'],
 ['Planning & Objectives','Explore how needs connect to plans and measurable outcomes.'],
 ['Performance & KPIs','Understand performance measures and supporting evidence.'],
 ['Risk & Compliance','Review risks and the requirements that apply.'],
 ['Audit & Assurance','Understand assessments, findings and verification.'],
 ['Continual Improvement','Use evidence and experience to identify improvements.'],
];
export default function WorkspaceIndex({onNavigate}:{onNavigate:(page:string)=>void}) {
 return <article className="fern-get-started" style={{padding:'clamp(16px, 3vw, 36px)',background:'white',borderRadius:12}}><VisualGuide art="people" steps={["Explore the Workspace","Read the guidance","Follow the source"]}/>
  <h1 style={{fontSize:'clamp(24px,3vw,34px)',fontWeight:700,color:'#102957'}}>Workspace</h1><FernAISearch page="Workspace"/>
  <p>Choose an area to explore FM information and guidance.</p>
  <div className="fern-start-choices">{pages.map(([title,description])=><button key={title} onClick={()=>onNavigate(title)}><strong>{title}</strong><span>{description}</span><span>Open section →</span></button>)}</div>
 </article>;
}
