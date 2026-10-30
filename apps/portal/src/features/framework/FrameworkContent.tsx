import React from 'react';
export type Navigate = (page:string,pillar?:number)=>void;
const destinations:Record<string,string>={
 '#5-leadership-policy':'Leadership & Policy','#6-fm-overview':'FM Overview','#7-planning-objectives':'Planning & Objectives','#8-performance-kpis':'Performance & KPIs','#9-risk-compliance':'Risk & Compliance','#10-audit-assurance':'Audit & Assurance','#11-continual-improvement':'Continual Improvement',
};
function Inline({text,onNavigate}:{text:string;onNavigate:Navigate}){
 const pieces=text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
 return <>{pieces.map((part,i)=>{
  if(part.startsWith('**'))return <strong key={i}>{part.slice(2,-2)}</strong>;
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link){const [,label,url]=link;const target=destinations[url]??(url.startsWith('#12-')?(/source|material/i.test(label)?'Reference Library':'Learn'):undefined);
   return target?<button className="fw-text-link" key={i} onClick={()=>onNavigate(target)}>{label}<span aria-hidden="true"> →</span></button>:<a key={i} href={url} target="_blank" rel="noreferrer">{label}</a>;
  }
  return <React.Fragment key={i}>{part}</React.Fragment>;
 })}</>;
}
export default function FrameworkContent({text,onNavigate}:{text:string;onNavigate:Navigate}){
 return <div className="fw-content">{text.split(/\n\n+/).filter(Boolean).map((block,i)=>{
  const rows=block.split('\n');
  if(block.startsWith('|')){const cells=rows.filter(r=>!/^\|[\s:|\-]+$/.test(r)).map(r=>r.replace(/^\||\|$/g,'').split('|').map(c=>c.trim()));
   return <div key={i} className="fw-table" tabIndex={0} role="region" aria-label="Planning and evidence reference table"><table><thead><tr>{cells[0].map((c,j)=><th scope="col" key={j}>{c}</th>)}</tr></thead><tbody>{cells.slice(1).map((row,j)=><tr key={j}>{row.map((cell,k)=><td key={k}><Inline text={cell} onNavigate={onNavigate}/></td>)}</tr>)}</tbody></table></div>;
  }
  if(/^\d+\. /.test(block))return <ol key={i}>{rows.map((r,j)=><li key={j}><Inline text={r.replace(/^\d+\. /,'')} onNavigate={onNavigate}/></li>)}</ol>;
  if(block.startsWith('- '))return <ul key={i}>{rows.map((r,j)=><li key={j}><Inline text={r.replace(/^- /,'')} onNavigate={onNavigate}/></li>)}</ul>;
  return <p key={i}><Inline text={block.replace(/\n/g,' ')} onNavigate={onNavigate}/></p>;
 })}</div>;
}
