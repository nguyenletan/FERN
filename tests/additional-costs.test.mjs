import test from 'node:test';
import assert from 'node:assert/strict';
import {additionalTotals} from '../packages/pricing-core/src/additionalCosts.ts';
import {emptyBaseline,parseBaseline} from '../packages/pricing-core/src/staffCosts.ts';
const line={id:'1',category:'overhead',description:'Synthetic shared support',annualCost:'10000',allocation:'50',treatment:'additional',evidence:'Synthetic scope'};
test('Additional costs allocate by scope and do not count included or excluded lines',()=>{
 const a=additionalTotals([line,{...line,id:'2',category:'subcontractor',annualCost:'12000',allocation:'100'},{...line,id:'3',treatment:'included'},{...line,id:'4',treatment:'excluded'}]);
 assert.equal(a.overhead,5000);assert.equal(a.subcontractor,12000);assert.equal(a.total,17000);
});
test('Invalid included extra cost blocks totals; unknown costs are not zero',()=>{
 for(const patch of [{annualCost:''},{allocation:'101'},{allocation:'-1'},{evidence:''},{annualCost:'Infinity'}])assert.equal(additionalTotals([{...line,...patch}]).total,null);
 assert.equal(additionalTotals([{...line,annualCost:'0'}]).total,0);
 assert.equal(additionalTotals([{...line,annualCost:'',treatment:'included'}]).total,0);
});
test('Additional costs round-trip while legacy baselines remain valid',()=>{
 const b=emptyBaseline('TEST');assert.deepEqual(parseBaseline(JSON.stringify(b),'TEST'),b);
 b.additionalCosts=[line];assert.deepEqual(parseBaseline(JSON.stringify(b),'TEST'),b);
 b.additionalCosts=[line,{...line}];assert.throws(()=>parseBaseline(JSON.stringify(b),'TEST'));
 b.additionalCosts=[{...line,category:'other'}];assert.throws(()=>parseBaseline(JSON.stringify(b),'TEST'));
});
