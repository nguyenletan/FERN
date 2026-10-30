import {countryCatalogue,countryCodes} from './countrySearch';
import {regionLabel} from './regionLabels';
import RegionLabel from './RegionLabel';
import TaskReader from './TaskReader';
import {discoverStandards,sourceExcerpt,suggestSearch,matchingSourceText} from './libraryDiscovery';
import ReadingControls from '../reading/ReadingControls';
import '../visual/coordinated-design.css';
import {ReadingRoute} from '../visual/VisualGuide';
import {useEffect,useRef,useState,useMemo} from 'react';
import sourceData from './generated/standards.json';
import pdfFiles from './generated/pdf-files.json';
import {type StandardEntry} from './standardsSearch';
import './standards-reader.css';
import './library-usability.css';
import {standardOverview,relatedStandards,readStandardLocation,standardLocation} from './standardContext';
type Cell={text:string;col:number;colSpan:number;rowSpan:number};
type Block={type:string;text?:string;widths?:number[];header?:boolean;rows?:Cell[][]};
type Page={number:number;text:string;blocks:Block[];figures?:string[]};
const data=sourceData as {entries:StandardEntry[];pages:Record<string,Page[]>};
// PDFs are static files in public/bbm, served beside the site. The single-file export (scripts/export-portal.mjs)
// embeds them as base64 in window.__FERN_PDFS__ so the offline review copy still downloads (BBM-HTML-07).
declare global{interface Window{__FERN_PDFS__?:Record<string,string>}}
const files=pdfFiles as Record<string,string>;
const pdfPath=(key:string)=>import.meta.env.BASE_URL+'bbm/'+encodeURIComponent(files[key]);
const links=Object.fromEntries(data.entries.map(entry=>[entry.id,relatedStandards(data.pages[entry.kind][entry.page-1].blocks,entry,data.entries).flatMap(r=>r.target?[r.target.id]:[])]));
const browseTopics=['Emergency lighting','Fire doors','Legionella','Air conditioning','Lifts','Generators'];
function Highlight({text,query}:{text:string;query:string}){const terms=query.toLowerCase().split(/\s+/).filter(t=>t.length>2);return <>{text.split(/(\s+)/).map((part,i)=>terms.some(t=>part.toLowerCase().includes(t))?<mark key={i}>{part}</mark>:part)}</>;}

export default function StandardsLibrary(){
 const initial=readStandardLocation(typeof window==='undefined'?'':window.location.search,data.entries);
 const [showAll,setShowAll]=useState(false);
 const [country,setCountry]=useState(initial.country);const [includeUnspecified,setIncludeUnspecified]=useState(initial.includeUnspecified);
 const [query,setQuery]=useState(initial.query);const [kind,setKind]=useState(initial.kind);const [limit,setLimit]=useState(20);
 const [selected,setSelected]=useState(initial.selected);const [status,setStatus]=useState(initial.error);const [original,setOriginal]=useState('');
 const searchFormRef=useRef<HTMLFormElement>(null);const resultsRef=useRef<HTMLDivElement>(null);
 const returnTo=useRef<{id:string;scroll:number}|null>(null);
 const [readingView,setReadingView]=useState<'tasks'|'tables'>('tasks');
 const titleRef=useRef<HTMLHeadingElement>(null);const searchRef=useRef<HTMLInputElement>(null);const urls=useRef(new Map<string,string>());
 useEffect(()=>{const restore=()=>{const state=readStandardLocation(window.location.search,data.entries);setSelected(state.selected);setQuery(state.query);setKind(state.kind);setCountry(state.country);setIncludeUnspecified(state.includeUnspecified);setLimit(20);setStatus(state.error);setOriginal('');if(!state.selected){setShowAll(true);restoreResults();}};window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore);},[]);
 const catalogue=useMemo(()=>countryCatalogue(data.entries,data.pages,country,includeUnspecified),[country,includeUnspecified]);
 const searchable=catalogue.map(item=>item.entry);const byId=new Map(catalogue.map(item=>[item.entry.id,item]));
 const entry=data.entries.find(e=>e.id===selected);const results=discoverStandards(searchable,query,kind,links);
 if(country&&!query.trim())results.sort((a,b)=>{const rank=(id:string)=>byId.get(id)?.coverage.country?0:byId.get(id)?.coverage.shared?1:2;return rank(a.entry.id)-rank(b.entry.id);});
 const suggestion=!results.length?suggestSearch(searchable,query):null;
 const counts=Object.fromEntries(['all','Compliance','PM'].map(k=>[k,discoverStandards(searchable,query,k,links).length]));
 useEffect(()=>()=>{urls.current.forEach(u=>URL.revokeObjectURL(u));urls.current.clear();},[]);
 useEffect(()=>{if(selected){titleRef.current?.focus();titleRef.current?.scrollIntoView({block:'start'});}},[selected]);
 function changeSearch(nextQuery:string,nextKind=kind,nextCountry=country,nextInclude=includeUnspecified){
  setQuery(nextQuery);setKind(nextKind);setCountry(nextCountry);setIncludeUnspecified(nextInclude);setLimit(20);setShowAll(true);
  window.history.replaceState(null,'',window.location.pathname+standardLocation(window.location.search,undefined,nextQuery,nextKind,{country:nextCountry,includeUnspecified:nextInclude}));
 }
 function showResults(){setShowAll(true);resultsRef.current?.focus({preventScroll:true});}
 function url(key:string){const embedded=window.__FERN_PDFS__?.[key];if(!embedded)return pdfPath(key);if(!urls.current.has(key)){const bytes=Uint8Array.from(atob(embedded),c=>c.charCodeAt(0));urls.current.set(key,URL.createObjectURL(new Blob([bytes],{type:'application/pdf'})));}return urls.current.get(key)!;}
 function download(key:string){try{const a=document.createElement('a');a.href=url(key);a.download=files[key];document.body.append(a);a.click();a.remove();setStatus('Download requested: '+files[key]);}catch{setStatus('This PDF could not be prepared. Please reopen the file in a browser that supports downloads.');}}
 function choose(id:string){if(!entry)returnTo.current={id,scroll:searchFormRef.current?.closest('main')?.scrollTop??0};setReadingView('tasks');const next=data.entries.find(e=>e.id===id);if(!next)return;window.history.pushState(null,'',window.location.pathname+standardLocation(window.location.search,next,query,kind,{country,includeUnspecified}));setOriginal('');setStatus('');setSelected(id);}
 function restoreResults(){requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const saved=returnTo.current;const main=searchFormRef.current?.closest('main');
  if(saved&&main){main.scrollTo({top:saved.scroll,behavior:'instant' as ScrollBehavior});document.getElementById('result-'+saved.id)?.focus({preventScroll:true});}
  else {searchRef.current?.focus({preventScroll:true});searchFormRef.current?.scrollIntoView({block:'start'});}
 }));}
 function back(){window.history.pushState(null,'',window.location.pathname+standardLocation(window.location.search,undefined,query,kind,{country,includeUnspecified}));setSelected('');setOriginal('');restoreResults();}

 function showOriginal(){if(!entry)return;try{setOriginal(url(entry.kind));}catch{setStatus('The original PDF could not be opened.');}}
 return <section className="fern-standards" aria-label="BBM Standards Reader">
  {!entry&&<header className="fs-library-intro"><p>Find a standard by country, equipment, topic or object code.</p><small>Supplied editions: Compliance · April 2024 / Preventive Maintenance · March 2025. Check the authorised source and applicability before use.</small></header>}
  <div hidden={!!entry}>
   <form ref={searchFormRef} className="fs-discovery-search" role="search" aria-label="Search BBM standards" onSubmit={e=>{e.preventDefault();showResults();}}>
    <div className="fs-query-row"><label>Search standards<input ref={searchRef} type="search" value={query} onChange={e=>changeSearch(e.target.value)} placeholder="Try emergency lighting, fire doors or an object code"/></label><button type="submit" className="fs-show-results">Search</button>{query&&<button onClick={()=>{changeSearch('');searchRef.current?.focus();}} type="button">Clear search</button>}</div>
    <div className="fs-country-filter"><div className="fs-country-field"><label htmlFor="fs-country">Country</label><select id="fs-country" value={country} onChange={event=>changeSearch(query,kind,event.target.value)}><option value="">All countries</option>{countryCodes.map(code=><option key={code} value={code}>{regionLabel(code).flag} {regionLabel(code).label}</option>)}</select></div>{country&&<label className="fs-include-unspecified"><input type="checkbox" checked={includeUnspecified} onChange={event=>changeSearch(query,kind,country,event.target.checked)}/>Include standards with no country specified</label>}{(country||query||kind!=='all')&&<button type="button" onClick={()=>changeSearch('','all','',true)}>Clear all filters</button>}</div>
    {country&&<p className="fs-country-explanation">Country filtering uses the source Region fields. Shared “All” rows are included; {includeUnspecified?'standards without country information are labelled separately.':'standards without country information are hidden.'} Check source conditions before use.</p>}
    <div className="fs-filter-row" role="group" aria-label="Standard collection">{[['all','All standards'],['Compliance','Compliance'],['PM','Preventive Maintenance']].map(([value,label])=><button key={value} type="button" aria-pressed={kind===value} onClick={()=>changeSearch(query,value)}>{label} <span>({counts[value]})</span></button>)}</div>
   </form>
   {!query&&<nav className="fs-topic-browse" aria-label="Browse standards by topic"><span>Explore a topic</span>{browseTopics.map(topic=><button key={topic} type="button" onClick={()=>changeSearch(topic)}>{topic}</button>)}</nav>}
   <section id="bbm-search-results" className="fs-result-section" ref={resultsRef} tabIndex={-1} aria-label="Matching BBM standards">
    <p role="status" className="fs-result-count">{results.length} standards{query?` for “${query}”`:''} · {query||kind!=='all'||country||showAll?`Showing ${Math.min(limit,results.length)}`:'Choose a topic or search'}{kind!=='all'?` · ${kind==='PM'?'Preventive Maintenance':'Compliance'}`:''}{country?` · ${regionLabel(country).label}`:''}</p>
    {!results.length&&<div className="fs-empty"><h4>No matching standards</h4><p>Try a shorter equipment name or an object code. No result does not mean that no requirement applies.</p>{suggestion&&<button type="button" onClick={()=>changeSearch(suggestion)}>Try “{suggestion}”</button>}{country&&<button type="button" onClick={()=>changeSearch(query,kind,'',true)}>Search all countries</button>}{kind!=='all'&&<button type="button" onClick={()=>changeSearch(query,'all')}>Search both collections</button>}<button type="button" onClick={()=>changeSearch('','all','',true)}>Browse all standards</button></div>}
    {!query&&kind==='all'&&!country&&!showAll?<button type="button" onClick={()=>setShowAll(true)}>Browse all {results.length} standards</button>:<div className="fs-result-list">{results.slice(0,limit).map(({entry:e,reason})=><button className="fs-result-row" id={'result-'+e.id} key={e.id} type="button" onClick={()=>choose(e.id)}>
     <span className="fs-result-title"><strong>{e.title}</strong><span className="fs-read">Read standard →</span></span>
     <span className="fs-result-meta"><span className="fs-kind">{e.kind==='PM'?'Preventive Maintenance':'Compliance'}</span><span>{e.code}</span><span>{e.edition} · pp. {e.page}{e.endPage!==e.page?'–'+e.endPage:''}</span></span>
     {country&&<span className="fs-country-match">{byId.get(e.id)?.coverage.country?`Country-specific rows · ${regionLabel(country).label}`:byId.get(e.id)?.coverage.shared?'Shared regional content · source says All':'Country not specified · check applicability'}</span>}
     {query.trim()&&<><span className="fs-match">{reason}</span><span className="fs-excerpt"><span>Source excerpt: </span><Highlight text={sourceExcerpt(matchingSourceText(country?byId.get(e.id)!.sourcePages:data.pages[e.kind].slice(e.page-1,e.endPage),query)||e.searchText,query)} query={query}/></span></>}
    </button>)}</div>}
    {(query||kind!=='all'||country||showAll)&&results.length>limit&&<button type="button" onClick={()=>setLimit(limit+20)}>Show 20 more standards</button>}
   </section>
   <details className="fs-reading-help"><summary>How to Read and Check a Standard</summary><ReadingRoute/></details><details className="fs-guide"><summary>Document Introductions and Full Downloads</summary><p>Read the document guidance, contents and abbreviations alongside the selected standard.</p><div className="fs-actions">{['Compliance','PM'].map(k=><div key={k}><button type="button" onClick={()=>choose(k+'-introduction')}>Read {k==='PM'?'Maintenance':'Compliance'} Introduction</button><button type="button" onClick={()=>download(k)}>Download Full {k==='PM'?'Maintenance':'Compliance'} PDF</button></div>)}</div></details>
<details className="fern-standard-example"><summary>Not sure where to start? Try an emergency-lighting example</summary><div className="fern-example-body"><p className="fern-example-label">Illustrative reading example · FERN guidance</p><p>You want to understand which emergency-lighting requirements and maintenance tasks to review. Start with the compliance standard, then follow its source reference to the maintenance standard.</p><ol><li><strong>Read the compliance requirement.</strong> Open CT.ELEC.EMERGENCYAC and check its scope, tasks and regional conditions.<button type="button" onClick={()=>choose('Compliance-CT.ELEC.EMERGENCYAC')}>Read Emergency Lighting systems →</button></li><li><strong>Follow the maintenance reference.</strong> The supplied compliance standard references LIGHT.SAFETY. Read that standard’s tasks, intervals and conditions.<button type="button" onClick={()=>choose('PM-LIGHT.SAFETY')}>Read Safety Lighting and Signage →</button></li><li><strong>Check the evidence needed.</strong> Keep the physical task frequency separate from the evidence-upload interval. Reading these standards does not establish that a site is compliant.</li></ol><p>Source references: Compliance, April 2024, pages 15–17; Preventive Maintenance, March 2025, pages 125–126. Check the current authorised editions and applicability before using either.</p></div></details>

  </div>
  {entry&&<article className="fs-reading" data-reading-scope key={entry.id}>
   <nav className="fs-reader-toolbar" aria-label="Standard actions"><button type="button" onClick={back}>← Back to Results</button><button type="button" onClick={()=>download(entry.id)}>Download Selected Standard</button><button type="button" onClick={()=>download(entry.kind)}>Download Full Document</button></nav>
   <h3 ref={titleRef} tabIndex={-1}>{entry.title}</h3>
   <p>{entry.code} · {entry.kind==='PM'?'Preventive Maintenance':'Compliance'} · {entry.edition} · PDF pages {entry.page}–{entry.endPage}</p>
   {entry.code!=='INTRODUCTION'&&<nav className="fs-reader-sections" aria-label="Read this standard"><a href="#bbm-standard-overview">Scope and source links</a><a href="#bbm-readable-tasks" onClick={()=>setReadingView('tasks')}>Tasks and conditions</a><a href={`#bbm-${entry.kind}-${entry.page}`}>Original source pages</a></nav>}
   {country&&<p className="fs-note">Country selection: <RegionLabel code={country}/>. The task reading view includes shared rows; original tables and PDF downloads retain all countries.</p>}
   <ReadingControls label="this standard"/><details className="fern-standard-contents"><summary>Contents of this standard</summary><nav aria-label="Standard contents">{data.pages[entry.kind].slice(entry.page-1,entry.endPage).map(page=><div key={page.number}><a href={`#bbm-${entry.kind}-${page.number}`}>Original PDF page {page.number}</a><ul>{page.blocks.map((block,index)=>block.type==='heading'?<li key={index}><a href={`#bbm-${entry.kind}-${page.number}-heading-${index}`}>{block.text}</a></li>:null)}</ul></div>)}</nav></details>
   {entry.code!=='INTRODUCTION'&&<section className="fs-overview" id="bbm-standard-overview" aria-label="Standard overview"><h4>Standard Overview</h4><p className="fs-note">These fields repeat the source. The document edition and the standard's own revision may differ; neither confirms current publication approval.</p><dl>{standardOverview(data.pages[entry.kind][entry.page-1].blocks,entry.kind).map(field=><div key={field.label}><dt>{field.label}</dt><dd>{field.text}</dd></div>)}</dl><p><a href={`#bbm-${entry.kind}-${entry.page}`}>Read the original fields and full conditions on page {entry.page} ↓</a></p><details className="fern-reading-detail" open><summary>Related Standards</summary>{relatedStandards(data.pages[entry.kind][entry.page-1].blocks,entry,data.entries).length?<ul>{relatedStandards(data.pages[entry.kind][entry.page-1].blocks,entry,data.entries).map(r=><li key={r.kind+r.code}>{r.target?<button type="button" onClick={()=>choose(r.target!.id)}>{r.label}: {r.target.title} · {r.code} →</button>:<p>{r.label}: <strong>{r.code}</strong> — No exact code match in the supplied edition. Check the source or an authorised code mapping.</p>}</li>)}</ul>:<p>No related standard is explicitly identified in these source fields.</p>}<p className="fs-note">A related-standard reference does not establish complete compliance coverage. Read both standards' conditions.</p></details></section>}
   <div className="fs-view-switch" role="group" aria-label="Reading format"><button type="button" aria-pressed={readingView==='tasks'} onClick={()=>setReadingView('tasks')}>Task reading view</button><button type="button" aria-pressed={readingView==='tables'} onClick={()=>setReadingView('tables')}>Original tables</button><button type="button" onClick={showOriginal}>Compare With Original PDF</button><button type="button" onClick={()=>download(entry.kind)}>Download full source PDF</button></div>
   {readingView==='tables'&&<span id="bbm-readable-tasks"/>}
   {readingView==='tasks'&&entry.code!=='INTRODUCTION'&&<TaskReader pages={data.pages[entry.kind].slice(entry.page-1,entry.endPage)} kind={entry.kind} country={country}/>}

   <p className="fs-note">Read the scope, notes, task requirements and regional conditions together. Evidence-upload intervals and physical task frequencies are separate. Blank source cells remain blank.</p>
   {original&&<div className="fs-original"><a href={`${original}#page=${entry.page}`} target="_blank" rel="noopener noreferrer">Open Original at Page {entry.page} (new tab)</a><p>If your PDF viewer opens at the cover, enter page {entry.page}.</p><object aria-label="Original source PDF" data={`${original}#page=${entry.page}`} type="application/pdf"><p>Use the original PDF link above if an embedded reader is unavailable.</p></object><button type="button" onClick={()=>setOriginal('')}>Close Original PDF</button></div>}
   <div className="fern-source-boundary"><strong>Original standard content</strong><span>The wording and tables below come from the supplied PDF. FERN reading guidance appears above.</span></div><nav className="fs-page-nav" aria-label="Pages in this standard">{Array.from({length:entry.endPage-entry.page+1},(_,i)=>entry.page+i).map(n=><a key={n} href={`#bbm-${entry.kind}-${n}`}>Page {n}</a>)}</nav>
   {data.pages[entry.kind].slice(entry.page-1,entry.endPage).map(page=><details className="fs-page fern-source-page" id={`bbm-${entry.kind}-${page.number}`} key={page.number+'-'+readingView} open={readingView==='tables'}>
    <summary>Original PDF Page {page.number}<span>Read the complete source wording, tasks, tables and conditions</span></summary>{page.figures?.map((src,i)=><figure key={i}><img src={src} alt={`Original source illustration ${i+1}, PDF page ${page.number}`} loading="lazy"/><figcaption>Original Source Illustration · Page {page.number}</figcaption></figure>)}
    {page.blocks.map((block,i)=>block.type==='table'?<div key={i} className="fs-table" tabIndex={0} role="region" aria-label={`Source table ${i+1}, page ${page.number}. Scroll horizontally for all columns.`}>
     <table className={block.header&&(block.widths?.length??0)>9?'fs-wide-tasks':undefined}><caption>Source Table · Page {page.number} — Scroll Sideways for All Columns</caption><colgroup>{block.widths?.map((w,j)=><col key={j} style={{width:`${w}%`}}/>)}</colgroup><tbody>{block.rows?.map((row,j)=><tr key={j}>{row.map((cell,k)=>j===0&&block.header?<th scope="col" key={k} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>{cell.text}</th>:<td key={k} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>{cell.text}</td>)}</tr>)}</tbody></table>
    </div>:block.type==='heading'?<h5 id={`bbm-${entry.kind}-${page.number}-heading-${i}`} key={i}>{block.text}</h5>:<p className="fs-source-text" key={i}>{block.text}</p>)}
    <details className="fs-transcript"><summary>View Source Page Text</summary><p className="fs-source-text">{page.text}</p></details>
   </details>)}
   <button type="button" onClick={back}>← Back to Standards</button>
  </article>}
  <p role="status">{status}</p>
 </section>;
}
