/**
 * Central fee math for cross-platform comparison (Kalshi + Polymarket).
 * Keep in sync with docs/kalshi-fees.md and Polymarket Gamma feeSchedule when possible.
 */

/** Default Polymarket taker rate when Gamma does not expose feeSchedule (non-sports). */
export const DEFAULT_POLY_TAKER_FEE = 0.02;

/** Kalshi: fee charged on expected profit → effective BUY YES ≈ p + 0.07·(1−p). */
export function effectiveKalshiBuyYes(price: number): number {
  const p = Math.min(1, Math.max(0, price));
  return p + 0.07 * (1 - p);
}

/** Polymarket: simple taker markup on notional (rate from DB / Gamma feeSchedule.rate). */
export function effectivePolymarketBuyYes(
  price: number,
  takerFeeRate: number | null | undefined
): number {
  const p = Math.min(1, Math.max(0, price));
  const r =
    takerFeeRate != null && Number.isFinite(takerFeeRate) && takerFeeRate >= 0 && takerFeeRate < 1
      ? takerFeeRate
      : DEFAULT_POLY_TAKER_FEE;
  return p * (1 + r);
}

export function effectivePolymarketBuyNo(
  price: number,
  takerFeeRate: number | null | undefined
): number {
  return effectivePolymarketBuyYes(price, takerFeeRate);
}

export function resolvePolymarketTakerFee(
  takerFeeFromDb: number | null | undefined
): number {
  if (
    takerFeeFromDb != null &&
    Number.isFinite(takerFeeFromDb) &&
    takerFeeFromDb >= 0 &&
    takerFeeFromDb < 1
  ) {
    return takerFeeFromDb;
  }
  return DEFAULT_POLY_TAKER_FEE;
}
