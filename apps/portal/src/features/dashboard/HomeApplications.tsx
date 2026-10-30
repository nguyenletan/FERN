import {Calculator,ChartLineUp,ClipboardText,FileText,UsersThree} from '@phosphor-icons/react';
import {homeApplications} from './homeApplications.ts';

// FERN applications are developed separately. The website describes them but never launches a workflow (WEB-SCOPE-01).
export const applicationIcons=[FileText,ChartLineUp,UsersThree,Calculator,ClipboardText];

export default function HomeApplications(){
 return <section className="fern-applications" aria-labelledby="fern-applications">
  <div className="fern-section-heading"><h2 id="fern-applications">FERN Applications</h2></div>
  <p className="fern-applications-intro">Specialist FERN tools are in development. They will open from here once they are released.</p>
  <div className="fern-app-grid">{homeApplications.map((app,i)=>{const Icon=applicationIcons[i]??ClipboardText;return <article key={app.name} aria-label={app.title+' — coming soon'}>
   <Icon size={28} aria-hidden="true"/><h3>{app.title}</h3><p>{app.description}</p><span className="fern-coming-soon">Coming soon</span>
  </article>;})}</div>
 </section>;
}
