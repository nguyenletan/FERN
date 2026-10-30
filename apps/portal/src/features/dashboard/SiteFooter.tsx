import fern from '../../../../../packages/platform/src/assets/home-fern.png';
import {homeApplications} from './homeApplications';

export default function SiteFooter({onNavigate,onHome,onSignOut}:{onNavigate:(page:string)=>void;onHome:()=>void;onSignOut:()=>void}) {
 const groups = [
  {title:'Learn',links:[['Mission & Pillars','Mission & Pillars'],['Getting started','Get Started'],['Learning topics','Learn'],['Reference guidance','Reference Library'],['Service models','Service Models Explained']]},
  {title:'Reference library',links:[['Standards and frameworks','Reference Library'],['Policies and guidance','Leadership & Policy'],['What’s new','What’s New in FERN']]},
  {title:'Help',links:[['Help & guidance','Help & Guidance']]},
 ];
 return <footer className="fern-site-footer">
  <div className="fern-footer-grid">
   <div className="fern-footer-brand"><button className="fern-wordmark" onClick={onHome} aria-label="FERN — return Home"><strong>FERN</strong><img src={fern} alt=""/></button><p>Facility Expert<br/>Reference Network</p><p>Connecting people, processes and insights to help you plan, procure and manage facilities services effectively—every step of the way.</p></div>
   {groups.map(group=><section key={group.title}><h2>{group.title}</h2>{group.links.map(([label,page])=><button key={label} onClick={()=>onNavigate(page)}>{label}</button>)}{group.title==='Help'&&<button onClick={onSignOut}>Sign out</button>}</section>)}
  </div>
  <div className="fern-footer-bottom"><span>FERN · Facility Expert Reference Network</span><button onClick={onHome}>Back to Home</button></div>
 </footer>;
}
