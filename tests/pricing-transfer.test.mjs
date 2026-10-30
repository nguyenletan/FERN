import test from "node:test";
import assert from "node:assert/strict";
import {
  issuePricing,
  readIssues,
  readLocalIssues,
  exportPricingIssue,
  previewPricingIssue,
  receivePricingIssue,
  costSummary,
  selectIssue,
  selectedIssue,
} from "../packages/pricing-core/src/pricingHandover.ts";
import { emptyBaseline } from "../packages/pricing-core/src/staffCosts.ts";
import {
  newAssessment,
  saveAssessment,
  readAssessments,
} from "../packages/pre-contract-core/src/assessment.ts";
import { newAlternative } from "../packages/pre-contract-core/src/alternatives.ts";
import {
  compareOptionPricing,
  optionPricingBinding,
} from "../packages/pre-contract-core/src/optionPricing.ts";
const now = "2026-09-10T12:00:00.000Z";
const memory = () => {
  const data = new Map();
  return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) };
};
const basis = (cost = 100, currency = "EUR") => ({
  ...emptyBaseline("TEST"),
  currency,
  baseDate: "2026-01-01",
  source: "Synthetic test source",
  comparisonBasis: {
    scope: "Synthetic FM scope",
    serviceLevel: "Synthetic level",
    taxBasis: "Excluding tax",
  },
  additionalCosts: [
    {
      id: "extra",
      category: "overhead",
      description: "Synthetic only",
      annualCost: String(cost),
      allocation: "100",
      treatment: "additional",
      evidence: "Synthetic evidence",
    },
  ],
});
const issued = (id = "source-1", cost = 100) => issuePricing(memory(), basis(cost), id, now);
const transfer = (s, p) =>
  receivePricingIssue(s, "TEST", previewPricingIssue(exportPricingIssue(p), "TEST"));
test("Pricing issue transfer across separate stores retains identity, revision, evidence and recalculated costs", () => {
  const source = memory(),
    dest = memory();
  for (let n = 1; n <= 4; n++) issuePricing(source, basis(n * 100), "price-" + n, now);
  const issue = readLocalIssues(source, "TEST")[3];
  const preview = previewPricingIssue(exportPricingIssue(issue), "TEST");
  assert.equal(dest.data.size, 0);
  assert.equal(preview.revision, 4);
  transfer(dest, issue);
  assert.deepEqual(readIssues(dest, "TEST"), [issue]);
  assert.equal(costSummary(readIssues(dest, "TEST")[0].baseline).total, 400);
  assert.equal(readLocalIssues(dest, "TEST").length, 0);
  assert.equal(selectedIssue(dest, "TEST", "pre-contract"), null);
});
test("Repeated and reordered imports are idempotent; conflicting same-ID input is rejected without writes", () => {
  const dest = memory(),
    issue = issued();
  transfer(dest, issue);
  const before = JSON.stringify([...dest.data]);
  const reordered = {
    ...issue,
    baseline: Object.fromEntries(Object.entries(issue.baseline).reverse()),
  };
  assert.equal(receivePricingIssue(dest, "TEST", reordered).alreadyPresent, true);
  assert.equal(JSON.stringify([...dest.data]), before);
  for (const patch of [
    { revision: 2 },
    { issuedAt: "2026-09-11T00:00:00Z" },
    { baseline: basis(999) },
  ]) {
    assert.throws(
      () => receivePricingIssue(dest, "TEST", { ...issue, ...patch }),
      /different inputs/,
    );
    assert.equal(JSON.stringify([...dest.data]), before);
  }
});
test("Independent source revisions coexist without changing local numbering or recipient/assessment selections", () => {
  const dest = memory(),
    one = issuePricing(dest, basis(40), "local-1", now);
  selectIssue(dest, "TEST", "pre-contract", one.id);
  selectIssue(dest, "TEST", "lifecycle", one.id);
  const saved = saveAssessment(
    dest,
    { ...newAssessment("TEST", "assessment"), name: "Synthetic draft", pricingId: one.id },
    now,
  );
  transfer(dest, issued("remote-1", 80));
  transfer(dest, issued("remote-2", 90));
  assert.equal(readIssues(dest, "TEST").length, 3);
  assert.equal(issuePricing(dest, basis(60), "local-2", now).revision, 2);
  assert.equal(selectedIssue(dest, "TEST", "pre-contract"), one.id);
  assert.equal(selectedIssue(dest, "TEST", "lifecycle"), one.id);
  assert.deepEqual(readAssessments(dest, "TEST"), [saved]);
  assert.throws(() => issuePricing(dest, basis(70), "remote-1", now), /already exists/);
});
test("Wrong site, missing identity, invalid costs/date/revision/status, raw calculations and oversized files are rejected", () => {
  const issue = issued();
  assert.throws(() => previewPricingIssue(exportPricingIssue(issue), "OTHER"));
  for (const patch of [
    { id: "" },
    { revision: 0 },
    { revision: 1.5 },
    { status: "approved" },
    { issuedAt: "2026-02-30T00:00:00Z" },
    { baseline: basis(-1) },
  ])
    assert.throws(() =>
      previewPricingIssue(
        JSON.stringify({ format: "FERN-pricing-issue-transfer-v1", issue: { ...issue, ...patch } }),
        "TEST",
      ),
    );
  assert.throws(
    () =>
      previewPricingIssue(
        JSON.stringify({ method: "FERN-pricing-scheduled-costs-v3", baseline: issue.baseline }),
        "TEST",
      ),
    /Editable calculation records/,
  );
  assert.throws(() => previewPricingIssue(" ".repeat(15_000_001), "TEST"), /15 MB/);
  const withTotals = JSON.parse(exportPricingIssue(issue));
  withTotals.total = 999;
  withTotals.issue.total = 1;
  assert.equal(
    costSummary(previewPricingIssue(JSON.stringify(withTotals), "TEST").baseline).total,
    100,
  );
});
test("Corrupt histories, quota failures and import limits preserve existing records", () => {
  const issue = issued(),
    dest = memory();
  dest.setItem("fern.pricing.received-issues.v1.TEST", "broken");
  const before = [...dest.data];
  assert.throws(() => transfer(dest, issue));
  assert.deepEqual([...dest.data], before);
  const noWrite = {
    getItem: () => null,
    setItem: () => {
      throw Error("Storage full");
    },
  };
  assert.throws(() => transfer(noWrite, issue), /Storage full/);
  const full = memory();
  full.setItem(
    "fern.pricing.received-issues.v1.TEST",
    JSON.stringify(Array.from({ length: 200 }, (_, i) => ({ ...issue, id: "p-" + i }))),
  );
  assert.throws(() => transfer(full, issue), /200 received/);
  assert.equal(readIssues(full, "TEST").length, 200);
  const local = memory();
  issuePricing(local, basis(), "same", now);
  local.setItem(
    "fern.pricing.received-issues.v1.TEST",
    JSON.stringify([{ ...issued("same"), baseline: basis(80) }]),
  );
  assert.throws(() => readIssues(local, "TEST"), /Conflicting pricing/);
});
test("Transferred option prices retain comparison gates, signed differences and fixed assessment references", () => {
  const dest = memory();
  transfer(dest, issued("base", 100));
  transfer(dest, issued("option", 80));
  const a = {
    ...newAssessment("TEST", "a"),
    name: "Comparison",
    pricingId: "base",
    model: "Full Blue Badge",
    tier: "Plus",
  };
  const option = {
    ...newAlternative("o"),
    name: "Synthetic alternative",
    pricingId: "option",
    model: "IFM",
    tier: "Core",
    pricingEvidence: "Synthetic applicability review",
  };
  const list = readIssues(dest, "TEST");
  option.pricingReview = optionPricingBinding(a, option, ...list);
  assert.equal(compareOptionPricing(a, option, list).difference, -20);
  assert.equal(compareOptionPricing(a, option, list).percent, -20);
  transfer(dest, issued("later", 50));
  assert.equal(compareOptionPricing(a, option, readIssues(dest, "TEST")).difference, -20);
  const mixed = issued("mixed");
  mixed.baseline.currency = "GBP";
  transfer(dest, mixed);
  option.pricingId = "mixed";
  option.pricingReview = optionPricingBinding(a, option, list[0], mixed);
  assert.equal(compareOptionPricing(a, option, readIssues(dest, "TEST")).difference, null);
});
