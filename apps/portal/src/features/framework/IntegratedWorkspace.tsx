import ReadingControls from '../reading/ReadingControls';
import FernAISearch from '../search/FernAISearch';
import {type ReactNode,useState,useRef,useEffect} from 'react';
import data from './frameworkContent.json';
import FrameworkContent,{type Navigate} from './FrameworkContent';
import {sectionSummary} from './sectionSummary';
import HumanImage from '../visual/HumanImage';
import './framework.css';
export default function IntegratedWorkspace({title,onNavigate,children}:{title:string;onNavigate:Navigate;children:ReactNode}){
 const page=data.pages.find(p=>p.title===title)!;
 const [practice,setPractice]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const heading=root.current?.querySelector<HTMLElement>('h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}root.current?.closest('main')?.scrollTo({top:0});},[practice,title]);
 const intro=page.intro.split('\n\n');
 const openSection=(index:number)=>{const el=root.current?.querySelector<HTMLDetailsElement>(`#fw-section-${index}`);if(el){el.open=true;el.scrollIntoView({block:'start'});el.querySelector<HTMLElement>('summary')?.focus({preventScroll:true});}};
 return <div ref={root} className="fw-workspace-view" data-reading-scope>{practice?<><div className="fw-practice-back"><button className="fw-secondary" onClick={()=>setPractice(false)}>← Back to {title}</button><span>Detailed practice guidance</span></div><ReadingControls label={title+" detailed guidance"}/>{children}</>:<article className="fw-page">
 <header className="fw-hero"><HumanImage discipline={title}/><div><p className="fw-eyebrow">The FERN mission in practice</p><h1 tabIndex={-1}>{title}</h1><p className="fw-lead">{intro[0].replace(/\*\*/g,'')}</p><details className="fern-reading-detail fern-reading-intro"><summary>About this topic</summary><FrameworkContent text={intro[1]} onNavigate={onNavigate}/></details></div></header><FernAISearch page={title}/><ReadingControls label={title}/>
 <section className="fw-pillars-context" aria-label="Relevant FERN pillars"><span>Guided by</span>{page.pillars.map(n=><button key={n} onClick={()=>onNavigate('Mission & Pillars')}>{data.pillars[n-1].name}</button>)}<details><summary>How these pillars support your work</summary><FrameworkContent text={intro.slice(2).join('\n\n')} onNavigate={onNavigate}/></details></section>
 <section className="fw-card"><div className="fw-section-heading"><div><h2>Your route through this topic</h2><p>Choose a step, or open the guidance below at your own pace.</p></div></div><details className="fern-reading-detail"><summary>Jump to a topic</summary><nav className="fw-topic-route" aria-label="On this page">{page.sections.map((s,i)=><button key={s.title} onClick={()=>openSection(i)}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</button>)}</nav></details><div className="fw-topic-sections">{page.sections.map((s,i)=><details id={`fw-section-${i}`} className="fw-topic" key={s.title}><summary><div><h2>{s.title}</h2><span className="fern-reading-summary">{sectionSummary(s)}</span></div><span className="fw-expand" aria-hidden="true">+</span></summary><FrameworkContent text={s.body} onNavigate={onNavigate}/></details>)}</div></section>
 <details className="fw-evidence fern-reading-detail"><summary><h2>Evidence to connect</h2></summary><p>{page.evidence}</p><details><summary>How ISO informs this guidance</summary><p>{page.iso}</p><p>Read the relevant source and edition before applying it to a decision. External references do not establish a site-specific obligation or certification.</p><button className="fw-text-link" onClick={()=>onNavigate('Reference Library')}>Explore the Reference Library →</button></details></details>
 <section className="fw-next"><div><h2>Continue your work</h2><FrameworkContent text={page.next} onNavigate={onNavigate}/></div></section>
 <section className="fw-practice"><div><h2>Looking for more detail?</h2><p>Explore the existing practical explanations, examples and topic-specific checks.</p></div><button className="fw-secondary" onClick={()=>setPractice(true)}>Open detailed practice guide →</button></section>
 </article>}</div>;
}
