import {createContext, useContext, useId, useState} from 'react';
import {ArrowRight, MagnifyingGlass} from '@phosphor-icons/react';
import helper from '../../../../../packages/platform/src/assets/fern-guide-transparent.png';
import {suggestedApplications} from '../dashboard/homeApplications';
import './fern-ai-search.css';

export const SearchNavigation = createContext<(page:string)=>void>(()=>{});
const topics = [
 ['Mission & Pillars', 'mission purpose pillars amazon'],
 ['Leadership & Policy', 'leadership policy policies governance responsibilities'],
 ['FM Overview', 'overview facilities management service models'],
 ['Planning & Objectives', 'planning objectives priorities needs'],
 ['Performance & KPIs', 'performance kpi measures metrics data'],
 ['Risk & Compliance', 'risk compliance requirements statutory'],
 ['Audit & Assurance', 'audit assurance evidence assessment'],
 ['Continual Improvement', 'improvement lessons learning actions'],
 ['Reference Library', 'reference library standards bbm maintenance source documents compliance'],
 ['Learn', 'learn learning training courses service models'],
 ['Get Started', 'start introduction beginning'],
 ['Help & Guidance', 'help support guidance']
];
export function findGuidance(query:string) {
 const words=query.toLowerCase().match(/[a-z0-9]+/g)?.filter(w=>w.length>2)??[];
 return topics.filter(([title,keywords])=>words.some(w=>(title+' '+keywords).toLowerCase().includes(w))).map(([title])=>title);
}
/** SEARCH-10: one shared discovery entry point; live Quick Suite integration remains required. */
export default function FernAISearch({page}:{page:string}) {
 const navigate=useContext(SearchNavigation), id=useId();
 const [query,setQuery]=useState(''),[submitted,setSubmitted]=useState('');
 const results=findGuidance(submitted), apps:ReturnType<typeof suggestedApplications>=[];
 return <section className="fern-ai-search" aria-label="FERN Search">
  <div className="fern-ai-search-row">
   <div className="fern-ai-search-brand"><img src={helper} alt=""/><div><h2>FERN Search</h2><p>Find your next step</p></div></div>
   <div className="fern-ai-search-field"><form role="search" aria-label={'Search FERN from '+page} onSubmit={e=>{e.preventDefault();setSubmitted(query.trim());}}>
    <MagnifyingGlass size={21} aria-hidden="true"/><label className="sr-only" htmlFor={id}>Find a FERN topic or guide</label>
    <input id={id} type="search" placeholder="Find a topic or guide" value={query} maxLength={1000} onChange={e=>setQuery(e.target.value)} aria-describedby={id+'-status'}/>
    <button type="submit" disabled={!query.trim()} aria-label="Search FERN"><ArrowRight size={22}/></button>
   </form><p id={id+'-status'}>Search the available FERN guidance</p></div>
  </div>
  {submitted&&<div className="fern-ai-search-results" aria-live="polite"><h3>Search results</h3><p>{results.length||apps.length?'Keyword matches across FERN. These are not AI-generated answers.':'No matching topic found. Try a different phrase or browse Help & Guidance.'}</p>
   <div className="fern-ai-search-links">{results.map(title=><button key={title} onClick={()=>navigate(title)}>{title}<ArrowRight size={16}/></button>)}{apps.map(app=><span key={app.name}>{app.title} — Coming soon</span>)}</div>
   <button className="fern-ai-search-help" onClick={()=>navigate('Help & Guidance')}>Browse Help & Guidance</button>
  </div>}
 </section>;
}
