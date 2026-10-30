import {ArrowRight,Calculator,ChartLineUp,ClipboardText,FileText,UsersThree} from '@phosphor-icons/react';
import {homeApplications} from './homeApplications.ts';

// FERN applications are developed separately. The website describes them on an introduction page and never launches a workflow (WEB-SCOPE-01).
export const applicationIcons=[FileText,ChartLineUp,UsersThree,Calculator,ClipboardText];

export default function HomeApplications({onOpen}:{onOpen:(name:string)=>void}){
 return <section className="fern-applications" aria-labelledby="fern-applications">
  <div className="fern-section-heading"><h2 id="fern-applications">FERN Applications</h2></div>
  <p className="fern-applications-intro">Specialist FERN tools are in development. Read what each one will do; they will open from here once they are released.</p>
  <div className="fern-app-grid">{homeApplications.map((app,i)=>{const Icon=applicationIcons[i]??ClipboardText;return <article key={app.name}>
   <Icon size={28} aria-hidden="true"/><h3>{app.title}</h3><p>{app.description}</p><span className="fern-coming-soon">Coming soon</span>
   <button type="button" className="fern-app-open" onClick={()=>onOpen(app.name)} aria-label={'About '+app.title}>About this app <ArrowRight size={14} aria-hidden="true"/></button>
  </article>;})}</div>
 </section>;
}
