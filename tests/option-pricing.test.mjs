import test from "node:test";
import assert from "node:assert/strict";
import { newAssessment, models, tiers } from "../packages/pre-contract-core/src/assessment.ts";
import {
  newAlternative,
  parseAlternatives,
} from "../packages/pre-contract-core/src/alternatives.ts";
import {
  compareOptionPricing,
  optionPricingBinding,
} from "../packages/pre-contract-core/src/optionPricing.ts";
import { emptyBaseline } from "../packages/pricing-core/src/staffCosts.ts";
const issue = (id, cost) => ({
  id,
  revision: 1,
  status: "provisional",
  issuedAt: "2026-09-07T12:00:00Z",
  baseline: {
    ...emptyBaseline("TEST"),
    currency: "GBP",
    baseDate: "2026-01-01",
    comparisonBasis: {
      scope: "Test FM scope",
      serviceLevel: "Example strategy",
      taxBasis: "Excluding tax",
    },
    additionalCosts: [
      {
        id: "c",
        category: "overhead",
        description: "Synthetic",
        annualCost: String(cost),
        allocation: "100",
        treatment: "additional",
        evidence: "Synthetic additional scope",
      },
    ],
  },
});
const setup = (cost = 100) => {
  const a = {
      ...newAssessment("TEST", "a"),
      model: "Full Blue Badge",
      tier: "Plus",
      pricingId: "base",
    },
    o = {
      ...newAlternative("o"),
      name: "Example IFM",
      model: "IFM",
      tier: "Core",
      pricingId: "option",
      pricingEvidence: "Synthetic reviewed scope and service differences",
    },
    list = [issue("base", cost), issue("option", 80)];
  o.pricingReview = optionPricingBinding(a, o, ...list);
  return { a, o, list };
};
test("First-year option comparison calculates signed difference without aggregating options", () => {
  const { a, o, list } = setup();
  const r = compareOptionPricing(a, o, list);
  assert.equal(r.eligible, true);
  assert.equal(r.baseline, 100);
  assert.equal(r.amount, 80);
  assert.equal(r.difference, -20);
  assert.equal(r.percent, -20);
});
test("Currency, site, tax and price-date mismatches withhold even after manual confirmation", () => {
  for (const patch of [
    { currency: "EUR" },
    { site: "OTHER" },
    { baseDate: "2025-01-01" },
    { comparisonBasis: { scope: "scope", serviceLevel: "level", taxBasis: "Including tax" } },
  ]) {
    const { a, o, list } = setup();
    Object.assign(list[1].baseline, patch);
    o.pricingReview = optionPricingBinding(a, o, ...list);
    const r = compareOptionPricing(a, o, list);
    assert.equal(r.eligible, false);
    assert.equal(r.difference, null);
  }
});
test("Changed model, baseline scope, cost input or evidence invalidates saved review", () => {
  for (const change of ["model", "scope", "cost", "evidence"]) {
    const { a, o, list } = setup();
    if (change === "model") o.model = "IFM Hybrid";
    if (change === "scope") a.scope = "Changed";
    if (change === "cost") list[1].baseline.additionalCosts[0].annualCost = "70";
    if (change === "evidence") o.pricingEvidence = "Changed evidence";
    assert.equal(compareOptionPricing(a, o, list).difference, null);
  }
});
test("Missing source and zero baseline are represented without invented percentages", () => {
  const { a, o, list } = setup(0);
  assert.equal(compareOptionPricing(a, o, list).percent, null);
  assert.equal(compareOptionPricing(a, o, list).difference, 80);
  assert.equal(compareOptionPricing(a, o, []).eligible, false);
  o.pricingEvidence = "";
  o.pricingReview = optionPricingBinding(a, o, ...list);
  assert.equal(compareOptionPricing(a, o, list).eligible, false);
});
test("Old alternatives migrate pricing fields; malformed new fields are rejected", () => {
  const old = newAlternative("o");
  delete old.pricingId;
  delete old.pricingReview;
  delete old.pricingEvidence;
  assert.equal(parseAlternatives([old], models, tiers)[0].pricingId, "");
  assert.throws(() => parseAlternatives([{ ...old, pricingId: null }], models, tiers));
});
