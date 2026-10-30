import test from "node:test";
import assert from "node:assert/strict";
import {
  dateForDisplay,
  dateFromDisplay,
  currencies,
  mapStaffCard,
  emptyBaseline,
  staffTotal,
  parseBaseline,
} from "../packages/pricing-core/src/staffCosts.ts";
const c = (value, formula = "") => ({ value, formula });
const source = {
  name: "Staff Rate Card",
  rows: {
    3: { B: c("Example role") },
    4: { A: c("Hourly rate"), C: c("50", "C6+C13+C27+C40") },
    6: { A: c("1. Base pay") },
    26: { A: c("PPK"), B: c("0.015") },
  },
};
test("Staff card keeps cached formula rate as evidence and flags missing component amount", () => {
  const [role] = mapStaffCard([source]);
  assert.equal(role.rate, "");
  assert.equal(role.sourceRate, "50");
  assert.equal(role.included, false);
  assert.match(role.issues.join(" "), /PPK/);
  assert.equal(role.sourceCell, "Staff Rate Card!C4");
});
test("BB total uses allocated paid hours once and excludes unselected roles", () => {
  const b = emptyBaseline("TEST");
  Object.assign(b, { currency: "GBP", baseDate: "2026-09-06" });
  const r = mapStaffCard([source])[0];
  b.roles = [
    { ...r, included: true, rate: "40", hours: "1200", evidence: "Synthetic reconciled input" },
    { ...r, id: "excluded" },
  ];
  assert.equal(staffTotal(b).total, 48000);
  b.roles[0].hours = "";
  assert.equal(staffTotal(b).total, null);
  b.roles[0].hours = "0";
  assert.equal(staffTotal(b).total, 0);
  b.roles[0].evidence = "";
  assert.equal(staffTotal(b).total, null);
});
test("BB validation rejects invalid dates, negative rates and nonfinite costs", () => {
  const b = {
    ...emptyBaseline("TEST"),
    currency: "GBP",
    baseDate: "2026-02-30",
    roles: [
      { ...mapStaffCard([source])[0], included: true, rate: "-1", hours: "10", evidence: "Test" },
    ],
  };
  assert.equal(staffTotal(b).total, null);
  b.baseDate = "2026-02-28";
  b.roles[0].rate = "1e308";
  b.roles[0].hours = "1e308";
  assert.equal(staffTotal(b).total, null);
});
test("Saved BB baseline preserves inputs and rejects another site or duplicate rows", () => {
  const b = emptyBaseline("TEST");
  b.roles = mapStaffCard([source]);
  assert.deepEqual(parseBaseline(JSON.stringify(b), "TEST"), b);
  assert.throws(() => parseBaseline(JSON.stringify(b), "OTHER"));
  b.roles.push({ ...b.roles[0] });
  assert.throws(() => parseBaseline(JSON.stringify(b), "TEST"));
});
test("Unrelated pricing sheets are rejected", () =>
  assert.throws(() => mapStaffCard([{ ...source, name: "Summary" }])));

test("BB date validation accepts leap days only in leap years and rejects ambiguous formats", () => {
 const b={...emptyBaseline("TEST"),currency:"GBP",baseDate:"2028-02-29",roles:[{...mapStaffCard([source])[0],included:true,rate:"40",hours:"1200",evidence:"Synthetic date test"}]};
 assert.equal(staffTotal(b).total,48000);
 for(const date of ["2026-02-29","2026-04-31","06/09/2026","2026-13-01",""]){b.baseDate=date;assert.equal(staffTotal(b).total,null,date);}
});

test("Display date round-trips existing saved ISO dates without reversing day and month",()=>{
 assert.equal(dateForDisplay("2026-09-06"),"06-09-2026");
 assert.equal(dateFromDisplay("06-09-2026"),"2026-09-06");
 assert.equal(dateFromDisplay("2026-09-06"),"");
 const b={...emptyBaseline("TEST"),currency:"EUR",baseDate:dateFromDisplay("29-02-2028"),roles:[{...mapStaffCard([source])[0],included:true,rate:"40",hours:"1200",evidence:"Synthetic"}]};
 assert.equal(staffTotal(b).total,48000);
 b.baseDate=dateFromDisplay("30-02-2026");assert.equal(staffTotal(b).total,null);
 assert.ok(["EUR","USD","GBP"].every(c=>currencies.some(([code])=>code===c)));
});

test('Delivery team hours replace direct hours and avoid double counting',()=>{
 const b={...emptyBaseline('TEST'),currency:'GBP',baseDate:'2026-09-06',roles:[{...mapStaffCard([source])[0],included:true,rate:'40',hours:'9999',hoursMode:'team',headcount:'2',paidHoursPerPerson:'2000',fmAllocation:'50',evidence:'Synthetic team'}]};
 assert.equal(staffTotal(b).total,80000);
 assert.equal(staffTotal(b).rows[0].allocatedHours,2000);
 assert.deepEqual(parseBaseline(JSON.stringify(b),'TEST'),b);
 for(const value of ['', '101','-1']){b.roles[0].fmAllocation=value;assert.equal(staffTotal(b).total,null);}
 b.roles[0].fmAllocation='0';assert.equal(staffTotal(b).total,0);
 b.roles[0].headcount='1.5';assert.equal(staffTotal(b).total,null);
 b.roles[0].hoursMode='direct';assert.equal(staffTotal(b).total,399960);
});
