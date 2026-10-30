import {findStandards,standardMatch,type StandardEntry} from './standardsSearch.ts';
export type DiscoveryResult = {entry:StandardEntry;reason:string;linkedFrom?:string};
export function discoverStandards(entries:StandardEntry[],query:string,kind:string,links:Record<string,string[]>):DiscoveryResult[]{
 const matches=findStandards(entries,query,kind);
 if(!query.trim())return matches.map(entry=>({entry,reason:''}));
 const direct=findStandards(entries,query).filter(entry=>standardMatch(entry,query).score>=3);
 const linked=new Map<string,string>();
 for(const entry of direct)for(const id of links[entry.id]??[])if(!linked.has(id))linked.set(id,entry.code);
 const ids=new Set(matches.map(e=>e.id));
 for(const entry of entries)if(linked.has(entry.id)&&!ids.has(entry.id)&&(kind==='all'||entry.kind===kind)){matches.push(entry);ids.add(entry.id);}
 const score=(entry:StandardEntry)=>Math.max(standardMatch(entry,query).score,linked.has(entry.id)?2.5:0);
 return matches.sort((a,b)=>score(b)-score(a)).map(entry=>({entry,reason:standardMatch(entry,query).score>=3?standardMatch(entry,query).label:linked.has(entry.id)?'Referenced by '+linked.get(entry.id):standardMatch(entry,query).label,linkedFrom:linked.get(entry.id)}));
}
export function sourceExcerpt(text:string,query:string,size=180){
 const clean=text.replace(/\s+/g,' ').trim();
 const terms=query.toLowerCase().split(/\s+/).filter(t=>t.length>2);
 let at=terms.length?clean.toLowerCase().indexOf(query.toLowerCase().trim()):-1;
 if(at<0){const offsets=terms.map(t=>clean.toLowerCase().indexOf(t)).filter(n=>n>=0);at=offsets.length?Math.min(...offsets):0;}
 let start=Math.max(0,at-45);if(start)start=clean.lastIndexOf(' ',start)+1;
 let end=Math.min(clean.length,start+size);if(end<clean.length){const space=clean.lastIndexOf(' ',end);if(space>start)end=space;}
 return (start?'…':'')+clean.slice(start,end)+(end<clean.length?'…':'');
}
function distance(a:string,b:string){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];}
export function suggestSearch(entries:StandardEntry[],query:string){
 const q=query.toLowerCase().trim();if(!q||q.includes('.'))return null;
 const aliases:Record<string,string>={'emergency lights':'emergency lighting','safety lights':'safety lighting','pat testing':'portable appliance testing'};
 if(aliases[q]&&findStandards(entries,aliases[q]).length)return aliases[q];
 const words=[...new Set(entries.flatMap(e=>e.title.toLowerCase().match(/[a-z]{4,}/g)??[]))];
 const tokens=q.split(/\s+/);let candidates=[q];
 tokens.forEach((token,index)=>{
  if(token.length<4||words.includes(token))return;
  const choices=words.map(word=>({word,d:distance(token,word)})).filter(x=>x.d<=(token.length>=7?2:1)).sort((a,b)=>a.d-b.d).slice(0,12);
  for(const choice of choices){const next=[...tokens];next[index]=choice.word;candidates.push(next.join(' '));}
 });
 const ranked=candidates.filter(candidate=>candidate!==q).map(candidate=>{
  const matches=findStandards(entries,candidate);return {candidate,score:Math.max(0,...matches.map(entry=>standardMatch(entry,candidate).score)),distance:distance(q,candidate)};
 }).filter(item=>item.score>=3).sort((a,b)=>b.score-a.score||a.distance-b.distance||a.candidate.localeCompare(b.candidate));
 return ranked[0]?.candidate??null;
}

/** Pick one intact source paragraph or cell, never concatenate unrelated table columns. */
export function matchingSourceText(pages:{blocks:{type:string;text?:string;rows?:{text:string}[][]}[]}[],query:string){
 const candidates=pages.flatMap(page=>page.blocks.flatMap(block=>block.rows?block.rows.flatMap(row=>row.map(cell=>cell.text)):block.text?[block.text]:[])).filter(text=>text.trim().length>35);
 const q=query.toLowerCase().trim(),terms=q.split(/\s+/).filter(t=>t.length>2);
 const score=(text:string)=>{const lower=text.toLowerCase();return (q&&lower.includes(q)?10:0)+terms.filter(term=>lower.includes(term)).length;};
 return candidates.map((text,index)=>({text,index,score:score(text)})).sort((a,b)=>b.score-a.score||a.index-b.index)[0]?.text??'';
}
