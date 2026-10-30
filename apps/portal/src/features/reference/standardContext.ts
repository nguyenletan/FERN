import {normaliseCountry} from './countrySearch.ts';
import type {StandardEntry} from './standardsSearch';
export type SourceBlock={type:string;text?:string;rows?:{text:string}[][]};
export function standardOverview(blocks:SourceBlock[],kind:string){
 const metadata=blocks.find(b=>b.type==='table')?.rows??[];
 const cells=metadata.flat().map(c=>c.text);
 const revision=cells.find(t=>/Last Update:\s*(?:\(Version\))?/.test(t));
 const fields:{label:string;text:string}[]=[];
 if(revision)fields.push({label:'Standard revision (source)',text:revision.replace(/Last Update:|\(Version\)/g,'').trim()});
 const heading=kind==='Compliance'?'Scope':'Description of System';
 const at=blocks.findIndex(b=>b.type==='heading'&&b.text?.startsWith(heading));
 if(at>=0){const b=blocks[at+1];const text=b?.text??b?.rows?.flat().map(c=>c.text).join('\n');if(text)fields.push({label:kind==='Compliance'?'Scope (source)':'System description (source)',text});}
 for(const [label,pattern] of [['Competence and certification field',/Special Certifica/i],['Delivery field',/Delivered By:/]] as const){const text=cells.find(t=>pattern.test(t));if(text&&text.replace(/Special Certification|Special Certificaion|Required:|Delivered By:|\s/g,'').length)fields.push({label,text});}
 return fields;
}
export function relatedStandards(blocks:SourceBlock[],entry:StandardEntry,entries:StandardEntry[]){
 const cells=(blocks.find(b=>b.type==='table')?.rows??[]).flat();
 const related:{code:string;kind:string;label:string;target?:StandardEntry}[]=[];
 for(const c of cells){
  const kind=/Related BBM PM:/i.test(c.text)?'PM':/Related CT Areas:/i.test(c.text)?'Compliance':null;if(!kind)continue;
  const text=c.text.split(/Related BBM PM:|Related CT Areas:/i)[1]??'';
  for(const code of text.match(/[A-Z][A-Z0-9]*(?:\.[A-Z0-9]+)+/g)??[]){
   if(related.some(r=>r.code===code&&r.kind===kind))continue;
   const target=entries.find(e=>e.kind===kind&&e.code===code);
   if(target?.id!==entry.id)related.push({code,kind,label:kind==='PM'?'Source-referenced maintenance':'Source-referenced compliance',target});
  }
 }
 return related;
}
export function standardVersionKey(entry:StandardEntry){return entry.id+'@'+entry.edition;}
export function readStandardLocation(search:string,entries:StandardEntry[]){
 const params=new URLSearchParams(search);const key=params.get('bbm');const kind=params.get('bbmKind');const entry=key?entries.find(e=>standardVersionKey(e)===key):undefined;
 return {country:normaliseCountry(params.get('bbmCountry')??''),includeUnspecified:params.get('bbmUnspecified')!=='0',selected:entry?.id??'',query:params.get('bbmQuery')??'',kind:kind==='PM'||kind==='Compliance'?kind:'all',error:key&&!entry?'This standard or edition is not available in this copy of FERN. Search the supplied editions below.':''};
}
export function standardLocation(search:string,entry:StandardEntry|undefined,query:string,kind:string,filters?:{country:string;includeUnspecified:boolean}){
 const p=new URLSearchParams(search);const country=normaliseCountry(filters?.country??p.get('bbmCountry')??'');const includeUnspecified=filters?.includeUnspecified??(p.get('bbmUnspecified')!=='0');if(country)p.set('bbmCountry',country);else p.delete('bbmCountry');if(country&&!includeUnspecified)p.set('bbmUnspecified','0');else p.delete('bbmUnspecified');if(entry)p.set('bbm',standardVersionKey(entry));else p.delete('bbm');p.set('bbmKind',kind);if(query)p.set('bbmQuery',query);else p.delete('bbmQuery');return '?'+p.toString();
}
export function clearStandardLocation(){const p=new URLSearchParams(window.location.search);['bbm','bbmKind','bbmQuery','bbmCountry','bbmUnspecified'].forEach(k=>p.delete(k));const q=p.toString();window.history.replaceState(null,'',window.location.pathname+(q?'?'+q:'')+window.location.hash);}
export function openStandardCollection(kind='all'){const q=standardLocation(window.location.search,undefined,'',kind);window.history.pushState(null,'',window.location.pathname+q);window.dispatchEvent(new PopStateEvent('popstate'));}
