import assert from "node:assert/strict";
import test from "node:test";
import {
  overallLifeFactor,
  predictedLife,
  renewalQuantity,
  derivedRenewalRate,
  renewalEventCost,
  renewalEvents,
} from "../packages/lifecycle-core/src/nrm3Calculations.ts";

test("NRM3 Table 5.2 retains the unrounded 17.6-year prediction", () => {
  const factors = [1.1, 1, 1, 1, 0.8, 1, 0.8];
  assert.ok(Math.abs(overallLifeFactor(factors) - 0.704) < 1e-12);
  assert.ok(Math.abs(predictedLife(25, factors) - 17.6) < 1e-12);
});
test("Renewal quantity, adjusted rate and event cost remain separate", () => {
  assert.equal(renewalQuantity(100, 0.25), 25);
  assert.equal(derivedRenewalRate(100, 0.8, 0.2), 96);
  assert.equal(renewalEventCost(25, 96), 2400);
});
test("Five-year replacement repeats through the inclusive 2026–2050 horizon", () => {
  assert.deepEqual(renewalEvents(2030, 5, 2026, 2050), [2030, 2035, 2040, 2045, 2050]);
  assert.deepEqual(renewalEvents(2030, 5, 2035, 2040), [2035, 2040]);
  assert.deepEqual(renewalEvents(2055, 5, 2026, 2050), []);
  assert.deepEqual(renewalEvents(2.5, 2.5, 0, 10), [2.5, 5, 7.5, 10]);
  assert.equal(renewalEvents(0.1, 0.1, 0, 0.3).length, 3);
});
test("Missing inputs cannot become a plausible zero or neutral factor", () => {
  for (const value of [null, undefined, "TBC", NaN, Infinity, -1]) {
    assert.throws(() => renewalEventCost(1, value), RangeError);
  }
  assert.throws(() => overallLifeFactor([]), RangeError);
  assert.throws(() => predictedLife(25, [0]), RangeError);
  assert.throws(() => renewalQuantity(100, 25), RangeError);
  assert.throws(() => renewalEvents(2030, 0, 2026, 2050), RangeError);
  assert.throws(() => renewalEvents(2030, 5, 2050, 2026), RangeError);
  assert.equal(predictedLife(25, [1]), 25);
  assert.equal(renewalEventCost(0, 100), 0);
});
