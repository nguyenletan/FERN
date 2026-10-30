import React from 'react';
import Link from '@cloudscape-design/components/link';
import Table from '@cloudscape-design/components/table';
import {NavLink,Prose} from '../../app/ui';
export type {Navigate} from '../../app/ui';
const destinations:Record<string,string>={
 '#5-leadership-policy':'Leadership & Policy','#6-fm-overview':'FM Overview','#7-planning-objectives':'Planning & Objectives','#8-performance-kpis':'Performance & KPIs','#9-risk-compliance':'Risk & Compliance','#10-audit-assurance':'Audit & Assurance','#11-continual-improvement':'Continual Improvement',
};
function Inline({text}:{text:string}){
 const pieces=text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
 return <>{pieces.map((part,i)=>{
  if(part.startsWith('**'))return <strong key={i}>{part.slice(2,-2)}</strong>;
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link){const [,label,url]=link;const target=destinations[url]??(url.startsWith('#12-')?(/source|material/i.test(label)?'Standards & Reference Library':'Learn'):undefined);
   return target?<NavLink key={i} to={target}>{label}</NavLink>:<Link key={i} href={url} external>{label}</Link>;
  }
  return <React.Fragment key={i}>{part}</React.Fragment>;
 })}</>;
}
/** Renders the framework's light markdown (paragraphs, lists, tables, bold and links) with Cloudscape text styles. */
export default function FrameworkContent({text}:{text:string}){
 return <Prose>{text.split(/\n\n+/).filter(Boolean).map((block,i)=>{
  const rows=block.split('\n');
  if(block.startsWith('|')){
   const cells=rows.filter(r=>!/^\|[\s:|\-]+$/.test(r)).map(r=>r.replace(/^\||\|$/g,'').split('|').map(c=>c.trim()));
   return <Table key={i} variant="embedded" wrapLines ariaLabels={{tableLabel:'Planning and evidence reference table'}}
    columnDefinitions={cells[0].map((heading,j)=>({id:String(j),header:heading,cell:(row:string[])=><Inline text={row[j]??''}/>}))}
    items={cells.slice(1)}/>;
  }
  if(/^\d+\. /.test(block))return <ol key={i}>{rows.map((r,j)=><li key={j}><Inline text={r.replace(/^\d+\. /,'')}/></li>)}</ol>;
  if(block.startsWith('- '))return <ul key={i}>{rows.map((r,j)=><li key={j}><Inline text={r.replace(/^- /,'')}/></li>)}</ul>;
  return <p key={i}><Inline text={block.replace(/\n/g,' ')}/></p>;
 })}</Prose>;
}
