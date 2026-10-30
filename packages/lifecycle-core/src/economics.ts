export interface Economics {country:string;inflation:string;discount:string;evidence:string;timing:''|'year-end';}
export const emptyEconomics=():Economics=>({country:'',inflation:'',discount:'',evidence:'',timing:''});
export function validateEconomics(value:unknown):asserts value is Economics {
 const e=value as Economics;
 if(!e||['country','inflation','discount','evidence','timing'].some(k=>typeof (e as unknown as Record<string,unknown>)[k]!=='string')||!['','year-end'].includes(e.timing))throw Error('Invalid saved economic inputs.');
}
export function economicProfile(years:{year:number;total:number}[]|null,e:Economics|undefined){
 const gaps:string[]=[];
 if(!years?.length)gaps.push('Complete the underlying cost calculation.');
 if(years&&(years.length>25||years.some((y,i)=>!Number.isInteger(y.year)||!Number.isFinite(y.total)||y.total<0||(i>0&&y.year!==years[i-1].year+1))))gaps.push('Economic analysis requires consecutive annual non-negative costs over 1–25 years.');
 if(!e?.country.trim())gaps.push('Enter the country or location applicable to the economic assumptions.');
 for(const [value,name] of [[e?.inflation,'inflation'],[e?.discount,'nominal discount']] as const)if(typeof value!=='string'||!value.trim()||!Number.isFinite(Number(value))||Number(value)<=-100)gaps.push(`Enter an explicit annual ${name} rate greater than −100%. Zero is allowed.`);
 if(!e?.evidence.trim())gaps.push('Record rate sources, effective date, currency and applicability.');
 if(e?.timing!=='year-end')gaps.push('Select the cash-flow timing convention.');
 if(gaps.length||!years||!e)return {gaps,years:null,horizons:null,total:null,npc:null};
 const rows=years.map((y,index)=>{const nominal=y.total*Math.pow(1+Number(e.inflation)/100,index);const presentCost=nominal/Math.pow(1+Number(e.discount)/100,index+1);return {...y,nominal,presentCost};});
 const total=rows.reduce((n,y)=>n+y.nominal,0),npc=rows.reduce((n,y)=>n+y.presentCost,0);
 if(!Number.isFinite(total)||!Number.isFinite(npc)||rows.some(y=>!Number.isFinite(y.nominal)||!Number.isFinite(y.presentCost)))return {gaps:['Economic result exceeds calculation limits.'],years:null,horizons:null,total:null,npc:null};
 return {gaps,years:rows,total,npc,horizons:[5,10,15,20,25].map(h=>({horizon:h,nominal:h<=rows.length?rows.slice(0,h).reduce((n,y)=>n+y.nominal,0):null,npc:h<=rows.length?rows.slice(0,h).reduce((n,y)=>n+y.presentCost,0):null}))};
}
