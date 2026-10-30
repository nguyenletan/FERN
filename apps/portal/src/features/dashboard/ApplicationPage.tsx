import {ArrowLeft,ClipboardText} from '@phosphor-icons/react';
import {applicationByName,homeApplications,type FernApplication} from './homeApplications.ts';
import {applicationIcons} from './HomeApplications.tsx';
import './application-page.css';

// Introduction page for a planned FERN application. It describes the tool and never launches it (WEB-SCOPE-01).
export default function ApplicationPage({app,onNavigate,onHome}:{app:FernApplication;onNavigate:(destination:string)=>void;onHome:()=>void}){
 const Icon=applicationIcons[homeApplications.indexOf(app)]??ClipboardText;
 return <article className="fern-app-page" aria-labelledby="fern-app-title">
  <header className="fern-app-page-header">
   <Icon size={40} aria-hidden="true"/>
   <div><p className="fern-app-page-eyebrow">FERN Application</p><h1 id="fern-app-title">{app.title}</h1><p className="fern-app-page-summary">{app.summary}</p><span className="fern-coming-soon">Coming soon</span></div>
  </header>
  <div className="fern-app-page-grid">
   <section aria-labelledby="fern-app-capabilities"><h2 id="fern-app-capabilities">What you will be able to do</h2><ul>{app.capabilities.map(item=><li key={item}>{item}</li>)}</ul></section>
   <section aria-labelledby="fern-app-steps"><h2 id="fern-app-steps">How it will work</h2><ol>{app.steps.map(step=><li key={step}>{step}</li>)}</ol></section>
   <section aria-labelledby="fern-app-audience"><h2 id="fern-app-audience">Who it is for</h2><ul>{app.audience.map(item=><li key={item}>{item}</li>)}</ul></section>
   <section aria-labelledby="fern-app-related"><h2 id="fern-app-related">Works with</h2><div className="fern-app-page-related">{app.related.map(name=>{const target=applicationByName(name);return target?<button key={name} type="button" onClick={()=>onNavigate(name)}>{target.title}</button>:null;})}</div></section>
  </div>
  <aside className="fern-app-page-status" role="note">
   <h2>Availability</h2>
   <p>This application is not yet available on the FERN website. When it is released, it will open from this page.</p>
   <p className="fern-app-page-draft">This description is a draft for review. Features and steps may change before release.</p>
   <button type="button" className="fern-outline" onClick={onHome}><ArrowLeft size={16} aria-hidden="true"/> Return to Home</button>
  </aside>
 </article>;
}
