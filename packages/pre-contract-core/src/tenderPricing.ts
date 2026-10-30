import { costSummary, type PricingIssue } from "../../pricing-core/src/pricingHandover.ts";
import { comparePricing } from "../../pricing-core/src/comparisons.ts";
export function tenderPricing(issue: PricingIssue) {
  const total = costSummary(issue.baseline).total;
  const comparisons = comparePricing(issue.baseline, total);
  const eligible = comparisons.filter((c) => !c.gaps.length && c.amount !== null);
  const ranked = eligible
    .map((c) => ({
      ...c,
      costRank: 1 + eligible.filter((other) => other.amount! < c.amount!).length,
    }))
    .sort((a, b) => a.costRank - b.costRank || a.name.localeCompare(b.name));
  return {
    baseline: total,
    ranked,
    pending: comparisons.filter((c) => c.gaps.length),
    issueId: issue.id,
    revision: issue.revision,
  };
}
