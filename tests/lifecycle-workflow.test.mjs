import test from "node:test";
import assert from "node:assert/strict";
import {
  blankAsset,
  emptyProject,
  calculate,
  parseProject,
  reportCsv,
} from "../packages/lifecycle-core/src/assetModel.ts";
const fixture = () => ({
  ...emptyProject("TEST"), currency:"GBP",
  basis: "Test only; 2026 GBP; direct rates include all scoped costs",
  assets: [
    {
      ...blankAsset("test-1"),
      code: "test",
      description: "Synthetic asset",
      unit: "each",
      quantity: "2",
      rsl: "5",
      factors: "1",
      firstYear: "2030",
      extent: "1",
      rate: "100",
      maintenanceQuantity: "2",
      maintenanceUnit: "each",
      maintenanceRate: "10",
      frequency: "2",
      evidence: "Synthetic reference case, not operational data",
    },
  ],
});
test("Complete assessment repeats replacement five times and sums 25 full maintenance years", () => {
  const p = fixture(),
    r = calculate(p);
  assert.deepEqual(r.issues, []);
  assert.equal(r.renewal, 1000);
  assert.equal(r.maintenance, 1000);
  assert.deepEqual(
    r.events.map((x) => x.time),
    [2030, 2035, 2040, 2045, 2050],
  );
  assert.equal(r.years.length, 25);
  assert.match(reportCsv(p, r), /2050/);
});
test("TBC, empty and invalid values block all totals and exports; zero is retained", () => {
  for (const invalid of ["", "TBC", "-1", "Infinity"]) {
    const p = fixture();
    p.assets[0].rate = invalid;
    const r = calculate(p);
    assert.equal(r.renewal, null);
    assert.equal(r.years.length, 0);
    assert.throws(() => reportCsv(p, r));
  }
  const p = fixture();
  p.assets[0].rate = "0";
  assert.equal(calculate(p).renewal, 0);
});
test("Fractional event in final calendar year is retained without including following year", () => {
  const p = fixture();
  p.start = "2030";
  p.end = "2030";
  p.assets[0].firstYear = "2030.5";
  assert.equal(calculate(p).renewal, 200);
  p.assets[0].firstYear = "2031";
  assert.equal(calculate(p).renewal, 0);
});
test("Overdue first renewal, reverse horizon and missing factors require explicit resolution", () => {
  const p = fixture();
  p.assets[0].firstYear = "2025";
  assert.match(calculate(p).issues[0].message, /predates/);
  p.assets[0].firstYear = "2030";
  p.assets[0].factors = "";
  assert.equal(calculate(p).renewal, null);
  p.start = "2051";
  assert.equal(calculate(p).renewal, null);
});
test("Backups round trip and reject corrupt shape or duplicate references", () => {
  const p = fixture();
  assert.deepEqual(parseProject(JSON.stringify(p)), p);
  assert.throws(() => parseProject("{}"));
  assert.throws(() => parseProject(JSON.stringify({ ...p, assets: [p.assets[0], p.assets[0]] })));
});
test("An invalid second asset cannot leave plausible partial totals", () => {
  const p = fixture();
  p.assets.push(blankAsset("missing"));
  const r = calculate(p);
  assert.equal(r.renewal, null);
  assert.deepEqual(r.events, []);
  assert.deepEqual(r.years, []);
});

test('Currency is required for new projects and saved legacy projects retain GBP',()=>{
 const p=fixture();assert.equal(emptyProject('NEW').currency,'');assert.ok(calculate({...p,currency:''}).issues.length);
 const legacy={...p};delete legacy.currency;assert.equal(parseProject(JSON.stringify(legacy)).currency,'GBP');
 const euro={...p,currency:'EUR'};assert.equal(parseProject(JSON.stringify(euro)).currency,'EUR');assert.equal(calculate(euro).renewal,calculate(p).renewal);assert.match(reportCsv(euro,calculate(euro)),/Renewal EUR/);assert.doesNotMatch(reportCsv(euro,calculate(euro)),/Renewal GBP/);
 assert.throws(()=>parseProject(JSON.stringify({...p,currency:'invalid'})));
});
