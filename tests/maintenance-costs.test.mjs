import test from 'node:test';
import assert from 'node:assert/strict';
import {maintenanceTotals} from '../packages/pricing-core/src/maintenanceCosts.ts';
import {emptyBaseline,parseBaseline} from '../packages/pricing-core/src/staffCosts.ts';
import {costSummary,importPricingRecord,issuePricing,readIssues} from '../packages/pricing-core/src/pricingHandover.ts';
const task=()=>({id:'t',description:'Synthetic quarterly service',quantity:'10',unitsPerRate:'1',eventsPerActiveYear:'4',firstYear:'1',intervalYears:'1',minutesPerUnit:'30',hourlyRate:'40',materialCostPerUnit:'2',labourTreatment:'additional',included:true,evidence:'Synthetic case: rates per asset, four events per year; no overlap'});
const baseline=()=>({...emptyBaseline('TEST'),currency:'GBP',baseDate:'2026-09-06',maintenanceCosts:[task()]});
test('Quarterly task counts quantity once and adds materials for each event',()=>{
 const r=maintenanceTotals([task()]);assert.deepEqual(r.errors,[]);assert.equal(r.firstYear,880);assert.equal(r.years[0].labour,800);assert.equal(r.years[0].materials,80);
});
test('Units per rate scales both cost components; included labour cannot be counted again',()=>{
 const t={...task(),quantity:'1000',unitsPerRate:'100'};assert.equal(maintenanceTotals([t]).firstYear,880);
 t.labourTreatment='included';t.hourlyRate='';t.minutesPerUnit='';assert.equal(maintenanceTotals([t]).firstYear,80);
});
test('Multi-year events include horizon boundaries without annualising one-off years',()=>{
 const b=baseline();b.maintenanceCosts[0]={...task(),firstYear:'5',intervalYears:'5',eventsPerActiveYear:'1'};
 const r=costSummary(b);assert.equal(r.total,0);assert.deepEqual(r.horizons.map(h=>h.total),[220,440,660,880,1100]);assert.deepEqual(r.maintenance.rows[0].activeYears,[5,10,15,20,25]);
});
test('Annual additional costs recur alongside scheduled tasks and task-only baseline is valid',()=>{
 const b=baseline();assert.equal(costSummary(b).total,880);b.additionalCosts=[{id:'o',category:'overhead',description:'Synthetic overhead',annualCost:'100',allocation:'50',treatment:'additional',evidence:'Separate scope'}];assert.equal(costSummary(b).horizons[0].total,4650);
 assert.equal(costSummary({...emptyBaseline('TEST'),currency:'GBP',baseDate:'2026-09-06'}).total,null);
});
test('Missing inputs, fractional recurrence, zero divisor and overflow block costs; excluded lines do not',()=>{
 for(const patch of [{quantity:''},{unitsPerRate:'0'},{eventsPerActiveYear:'1.5'},{firstYear:'26'},{intervalYears:'0'},{evidence:''},{quantity:'1e308'}]) assert.equal(costSummary({...baseline(),maintenanceCosts:[{...task(),...patch}]}).total,null,JSON.stringify(patch));
 assert.equal(maintenanceTotals([{...task(),quantity:'',included:false}]).firstYear,0);
});
test('Save/restore, issue and v3 export preserve schedules; imported totals are ignored',()=>{
 const b=baseline();assert.deepEqual(parseBaseline(JSON.stringify(b),'TEST'),b);
 const restored=importPricingRecord(JSON.stringify({method:'FERN-pricing-scheduled-costs-v3',baseline:b,costSchedule:{total:1},status:'approved'}),'TEST');assert.equal(costSummary(restored).total,880);
 const m=new Map(),store={getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)};
 issuePricing(store,b,'issue','2026-09-06T12:00:00Z');b.maintenanceCosts[0].quantity='99';assert.equal(costSummary(readIssues(store,'TEST')[0].baseline).horizons[0].total,4400);
 assert.throws(()=>parseBaseline(JSON.stringify({...b,maintenanceCosts:[{...task(),labourTreatment:'invented'}]}),'TEST'));
 assert.throws(()=>parseBaseline(JSON.stringify({...b,maintenanceCosts:[task(),task()]}),'TEST'));
});
