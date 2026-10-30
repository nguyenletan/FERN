export type Alternative = {
  id: string;
  name: string;
  model: string;
  tier: string;
  scope: string;
  exceptions: string;
  strategies: string;
  mandatoryFloor: string;
  benefits: string;
  risks: string;
  shortTerm: string;
  mediumTerm: string;
  longTerm: string;
  evidence: string;
  gaps: string;
  disposition: string;
  reason: string;
  pricingId: string;
  pricingEvidence: string;
  pricingReview: string;
};
export const newAlternative = (id: string): Alternative => ({
  id,
  name: "",
  model: "",
  tier: "",
  scope: "",
  exceptions: "",
  strategies: "",
  mandatoryFloor: "",
  benefits: "",
  risks: "",
  shortTerm: "",
  mediumTerm: "",
  longTerm: "",
  evidence: "",
  gaps: "",
  disposition: "Under review",
  reason: "",
  pricingId: "",
  pricingEvidence: "",
  pricingReview: "",
});
export function parseAlternatives(
  raw: unknown,
  models: readonly string[],
  tiers: readonly string[],
): Alternative[] {
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > 20)
    throw Error("Invalid alternatives: maximum 20 per assessment.");
  const ids = new Set();
  return raw.map((a) => {
    if (a && typeof a === "object")
      a = {
        ...a,
        pricingId: a.pricingId === undefined ? "" : a.pricingId,
        pricingEvidence: a.pricingEvidence === undefined ? "" : a.pricingEvidence,
        pricingReview: a.pricingReview === undefined ? "" : a.pricingReview,
      };
    const keys = Object.keys(newAlternative(""));
    if (
      !a ||
      keys.some(
        (k) => typeof a[k] !== "string" || a[k].length > (k === "pricingReview" ? 2000000 : 20000),
      ) ||
      !a.id ||
      a.id.length > 100 ||
      ids.has(a.id)
    )
      throw Error("Invalid or duplicate alternative.");
    if (
      (a.model && !models.includes(a.model)) ||
      (a.tier && !tiers.includes(a.tier)) ||
      !["Under review", "Shortlisted", "Excluded"].includes(a.disposition)
    )
      throw Error("Unknown alternative model, tier or review status.");
    ids.add(a.id);
    return Object.fromEntries(keys.map((k) => [k, a[k]])) as Alternative;
  });
}
