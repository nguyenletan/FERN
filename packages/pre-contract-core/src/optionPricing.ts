import type { Assessment } from "./assessment.ts";
import type { Alternative } from "./alternatives.ts";
import { costSummary, type PricingIssue } from "../../pricing-core/src/pricingHandover.ts";
function context(a: Assessment) {
  return {
    site: a.site,
    scope: a.scope,
    model: a.model,
    tier: a.tier,
    arrangement: a.arrangement,
    responsibilities: a.responsibilities,
    evidence: a.evidence,
    gaps: a.gaps,
    pricingId: a.pricingId,
  };
}
export function optionPricingBinding(
  a: Assessment,
  o: Alternative,
  base: PricingIssue,
  price: PricingIssue,
) {
  const { pricingReview: _, ...option } = o;
  return JSON.stringify({ context: context(a), option, base, price });
}
export function compareOptionPricing(a: Assessment, o: Alternative, list: PricingIssue[]) {
  const base = list.find((p) => p.id === a.pricingId),
    price = list.find((p) => p.id === o.pricingId);
  const gaps: string[] = [];
  if (!base)
    gaps.push("Select an available current-arrangement pricing version in Pricing evidence.");
  if (!price) gaps.push("Select an available pricing version for this option.");
  let baseline: number | null = null,
    amount: number | null = null,
    difference: number | null = null,
    percent: number | null = null;
  if (base && price) {
    baseline = costSummary(base.baseline).total;
    amount = costSummary(price.baseline).total;
    if (base.baseline.site !== a.site || price.baseline.site !== a.site)
      gaps.push("Pricing must belong to this facility.");
    if (!base.baseline.currency || base.baseline.currency !== price.baseline.currency)
      gaps.push("Currencies differ; no exchange-rate conversion is applied.");
    if (!base.baseline.baseDate || base.baseline.baseDate !== price.baseline.baseDate)
      gaps.push("Price dates differ; issue prices on a common date after documented rebasing.");
    for (const [label, p] of [
      ["Current arrangement", base],
      ["Alternative", price],
    ] as const) {
      const b = p.baseline.comparisonBasis;
      if (!b?.scope.trim() || !b.serviceLevel.trim() || !b.taxBasis.trim())
        gaps.push(label + ": issued pricing needs scope, service/maintenance level and tax basis.");
    }
    if (
      base.baseline.comparisonBasis?.taxBasis.trim().toLowerCase() !==
      price.baseline.comparisonBasis?.taxBasis.trim().toLowerCase()
    )
      gaps.push("Tax bases differ; correct the pricing basis before comparing.");
    if (
      baseline === null ||
      amount === null ||
      !Number.isFinite(baseline) ||
      !Number.isFinite(amount)
    )
      gaps.push("Complete valid issued cost inputs.");
    if (!a.model || !a.tier || !o.model || !o.tier)
      gaps.push("Record current and alternative service models and tiers.");
    if (!o.pricingEvidence.trim())
      gaps.push(
        "Document how each price applies to its model, tier, asset coverage and service scope; explain differences.",
      );
    if (o.pricingReview !== optionPricingBinding(a, o, base, price))
      gaps.push("Review and confirm this exact arrangement, option and pricing pair.");
    if (!gaps.length && baseline !== null && amount !== null) {
      difference = amount - baseline;
      percent = baseline === 0 ? null : (difference / baseline) * 100;
      if (!Number.isFinite(difference) || (percent !== null && !Number.isFinite(percent))) {
        gaps.push("Comparison exceeds calculation limits.");
        difference = null;
        percent = null;
      }
    }
  }
  return {
    base,
    price,
    gaps,
    baseline,
    amount,
    difference,
    percent,
    currency: base?.baseline.currency ?? "",
    eligible: gaps.length === 0,
  };
}
