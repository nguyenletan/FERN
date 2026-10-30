import {economicProfile,type Economics} from './economics.ts';
export interface SensitivityCase {id:string;name:string;inflation:string;discount:string;evidence:string;}
export function validateSensitivities(value:unknown):asserts value is SensitivityCase[]{
 if(!Array.isArray(value)||value.length>30)throw Error('Expected at most 30 economic sensitivity cases.');
 const ids=new Set();
 for(const c of value){if(['id','name','inflation','discount','evidence'].some(k=>typeof c?.[k]!=='string')||!c.id||ids.has(c.id))throw Error('Invalid saved sensitivity case.');ids.add(c.id);}
}
export function sensitivityResults(years:{year:number;total:number}[]|null,baseline:Economics|undefined,cases:SensitivityCase[]){
 const base=economicProfile(years,baseline);
 return cases.map(c=>{
  const assumptions=baseline?{...baseline,inflation:c.inflation,discount:c.discount,evidence:c.evidence}:undefined;
  const result=economicProfile(years,assumptions);
  const gaps=[...(!c.name.trim()?['Name the sensitivity case.']:[]),...(base.gaps.length?['Complete baseline economic inputs before comparing cases.']:[]),...result.gaps];
  const delta=base.npc===null||result.npc===null?null:result.npc-base.npc;
  const percentage=delta===null||base.npc===0?null:delta/base.npc!*100;
  if((delta!==null&&!Number.isFinite(delta))||(percentage!==null&&!Number.isFinite(percentage)))gaps.push('Sensitivity difference exceeds calculation limits.');
  return {id:c.id,name:c.name,assumptions,result,gaps,delta:gaps.length?null:delta,percentage:gaps.length?null:percentage};
 });
}
