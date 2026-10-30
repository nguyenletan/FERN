/** NRM3 2nd ed. §§5.2–5.4. Source and limits: docs/apps/lifecycle/NRM3-LIFECYCLE-METHODOLOGY.md.
 * Pure primitives only. No assumed asset data, project approval or UI integration.
 */
function nonNegative(value: number, label: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a finite, non-negative number`);
  }
  return value;
}

function positive(value: number, label: string): number {
  nonNegative(value, label);
  if (value === 0) throw new RangeError(`${label} must be greater than zero`);
  return value;
}

function finiteResult(value: number): number {
  if (!Number.isFinite(value)) throw new RangeError("Calculation exceeds numeric range");
  return value;
}

export function overallLifeFactor(factors: readonly number[]): number {
  if (!factors.length) throw new RangeError("At least one explicit life factor is required");
  return positive(
    finiteResult(factors.reduce((result, factor) => result * positive(factor, "Life factor"), 1)),
    "Overall life factor",
  );
}

export function predictedLife(referenceServiceLife: number, factors: readonly number[]): number {
  return positive(
    finiteResult(
      positive(referenceServiceLife, "Reference service life") * overallLifeFactor(factors),
    ),
    "Predicted life",
  );
}

export function renewalQuantity(quantity: number, extent: number): number {
  nonNegative(extent, "Renewal extent");
  if (extent > 1) throw new RangeError("Renewal extent must be a decimal from 0 to 1");
  return finiteResult(nonNegative(quantity, "Quantity") * extent);
}

export function derivedRenewalRate(
  constructionRate: number,
  rateAdjustment: number,
  uplift: number,
): number {
  return finiteResult(
    nonNegative(constructionRate, "Construction rate") *
      nonNegative(rateAdjustment, "Rate adjustment") *
      (1 + nonNegative(uplift, "Renewal uplift")),
  );
}

export function renewalEventCost(quantity: number, unitRate: number): number {
  return finiteResult(
    nonNegative(quantity, "Renewal quantity") * nonNegative(unitRate, "Renewal unit rate"),
  );
}

/** Explicit inclusive horizon; fractional times are retained. Caller owns calendar
 * bucketing and the evidenced first-event/interval selection. No backlog inference.
 */
export function renewalEvents(
  firstEvent: number,
  interval: number,
  start: number,
  end: number,
): number[] {
  [firstEvent, start, end].forEach((value) => nonNegative(value, "Event/horizon time"));
  positive(interval, "Renewal interval");
  if (end < start) throw new RangeError("Horizon end must not precede its start");
  const snapIndex = (value: number) => {
    const nearest = Math.round(value);
    return Math.abs(value - nearest) <= Number.EPSILON * Math.max(1, Math.abs(value)) * 8
      ? nearest
      : value;
  };
  const firstIndex = Math.max(0, Math.ceil(snapIndex((start - firstEvent) / interval)));
  const lastIndex = Math.floor(snapIndex((end - firstEvent) / interval));
  if (!Number.isSafeInteger(firstIndex) || !Number.isSafeInteger(lastIndex))
    throw new RangeError("Event index exceeds numeric precision");
  const count = Math.max(0, lastIndex - firstIndex + 1);
  if (!Number.isSafeInteger(count) || count > 10000)
    throw new RangeError("Too many renewal events; check time units and interval");
  return Array.from({ length: count }, (_, i) =>
    finiteResult(firstEvent + (firstIndex + i) * interval),
  );
}
