import test from 'node:test';
import assert from 'node:assert/strict';
import {issuePricing,readIssues,selectIssue,selectedIssue,importPricingRecord,costSummary} from '../packages/pricing-core/src/pricingHandover.ts';
import {emptyBaseline} from '../packages/pricing-core/src/staffCosts.ts';
const memory=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}};
const baseline=()=>({...emptyBaseline('TEST'),currency:'GBP',baseDate:'2026-09-06',roles:[{id:'r',role:'Synthetic',grade:'',rate:'40',hours:'1200',included:true,sourceRate:'',sourceCell:'Manual',formula:'',issues:[],evidence:'Synthetic only'}]});
test('Issued snapshots stay fixed, repeated issue is idempotent, and recipients select independently',()=>{
 const store=memory(),b=baseline();const first=issuePricing(store,b,'one','2026-09-06T12:00:00Z');
 assert.equal(issuePricing(store,b,'other','2026-09-06T13:00:00Z').id,'one');
 selectIssue(store,'TEST','lifecycle',first.id);selectIssue(store,'TEST','pre-contract',first.id);
 b.roles[0].rate='50';const next=issuePricing(store,b,'two','2026-09-06T14:00:00Z');
 assert.equal(next.revision,2);assert.equal(readIssues(store,'TEST')[0].baseline.roles[0].rate,'40');
 selectIssue(store,'TEST','pre-contract','two');assert.equal(selectedIssue(store,'TEST','lifecycle'),'one');assert.equal(selectedIssue(store,'TEST','pre-contract'),'two');assert.equal(readIssues(store,'OTHER').length,0);
});
test('Incomplete pricing cannot be issued and unknown/site-mismatched versions cannot be selected',()=>{
 const store=memory(),b=baseline();b.roles[0].rate='';assert.throws(()=>issuePricing(store,b,'bad','2026-09-06T12:00:00Z'));assert.equal(readIssues(store,'TEST').length,0);assert.throws(()=>selectIssue(store,'OTHER','lifecycle','one'));
});
test('Downloaded pricing records restore inputs and recalculate instead of trusting exported totals',()=>{
 const b=baseline();const restored=importPricingRecord(JSON.stringify({method:'FERN-pricing-staff-and-additional-costs-v2',baseline:b,annualTotal:1,status:'approved'}),'TEST');assert.equal(costSummary(restored).total,48000);assert.throws(()=>importPricingRecord(JSON.stringify({method:'FERN-pricing-staff-and-additional-costs-v2',baseline:b}),'OTHER'));
});
