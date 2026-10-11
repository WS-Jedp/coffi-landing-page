/**
 * Plan prices in whole COP. The only place the landing reads a price from.
 *
 * The backend charges from the same table in Wompi cents
 * (`PAYMENTS_ENUM`, coffi-main-backend `src/common/utils/payments`). Change
 * both together; `pricing.test.ts` pins these values.
 *
 * `earlyAdopter` is what gets charged today; `regular` is the reference shown
 * struck through. Space plans are before IVA.
 */
export type PlanPrice = {
  earlyAdopter: { monthly: number; yearly: number };
  regular: { monthly: number; yearly: number };
};

export const PRICING_COP = {
  nomad: {
    earlyAdopter: { monthly: 29_900, yearly: 279_000 },
    regular: { monthly: 39_900, yearly: 399_000 },
  },
  hub: {
    earlyAdopter: { monthly: 49_900, yearly: 479_000 },
    regular: { monthly: 79_900, yearly: 799_000 },
  },
  /** Up to three sites. */
  orbital: {
    earlyAdopter: { monthly: 129_900, yearly: 1_249_000 },
    regular: { monthly: 199_900, yearly: 1_990_000 },
  },
  /** Each Orbital site past the third. */
  orbitalExtraSite: {
    earlyAdopter: { monthly: 39_900, yearly: 379_000 },
    regular: { monthly: 59_900, yearly: 599_000 },
  },
} satisfies Record<string, PlanPrice>;

/** Sites an Orbital plan covers before extra sites are billed. */
export const ORBITAL_INCLUDED_SITES = 3;

/**
 * `29900` → `"$29.900"`. Colombian grouping in every locale, written by hand
 * so the server and the browser can't disagree (`toLocaleString` depends on
 * the runtime's ICU data, which would break hydration).
 */
export const formatCOP = (pesos: number): string =>
  `$${Math.round(pesos)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

/** Whole percent a yearly plan saves against twelve monthly payments. */
export const savePercent = ({
  monthly,
  yearly,
}: {
  monthly: number;
  yearly: number;
}): number => Math.round((1 - yearly / (monthly * 12)) * 100);

/** What a yearly plan costs per month, rounded to the peso. */
export const monthlyEquivalent = (yearly: number): number =>
  Math.round(yearly / 12);

/** Wompi charges in cents. */
export const toWompiCents = (pesos: number): number => pesos * 100;
