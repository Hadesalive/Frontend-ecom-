// New Leone (NLe) display currency for the Sierra Leone storefront.
// Base product values are stored in USD magnitudes; we convert at format time
// so the whole catalog can be repriced by changing this single constant.
export const USD_TO_NLE = 23;

export function formatPrice(usd: number): string {
  const nle = Math.round(usd * USD_TO_NLE);
  return `NLe ${nle.toLocaleString("en-US")}`;
}
