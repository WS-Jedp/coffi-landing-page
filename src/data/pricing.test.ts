/**
 * Run with: node --test src/data/pricing.test.ts
 *
 * The backend pins the same table, in cents, in
 * coffi-main-backend `src/common/utils/payments/payments.spec.ts`. If one side
 * changes without the other, the landing advertises a price Wompi won't charge.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  PRICING_COP,
  formatCOP,
  monthlyEquivalent,
  savePercent,
  toWompiCents,
} from "./pricing.ts";

test("prices match the backend's Wompi amounts, in cents", () => {
  const cents = {
    nomad: [2_990_000, 27_900_000, 3_990_000, 39_900_000],
    hub: [4_990_000, 47_900_000, 7_990_000, 79_900_000],
    orbital: [12_990_000, 124_900_000, 19_990_000, 199_000_000],
    orbitalExtraSite: [3_990_000, 37_900_000, 5_990_000, 59_900_000],
  };

  for (const [plan, expected] of Object.entries(cents)) {
    const price = PRICING_COP[plan as keyof typeof PRICING_COP];
    assert.deepEqual(
      [
        price.earlyAdopter.monthly,
        price.earlyAdopter.yearly,
        price.regular.monthly,
        price.regular.yearly,
      ].map(toWompiCents),
      expected,
      plan,
    );
  }
});

test("formatCOP groups thousands with dots", () => {
  assert.equal(formatCOP(29_900), "$29.900");
  assert.equal(formatCOP(279_000), "$279.000");
  assert.equal(formatCOP(1_249_000), "$1.249.000");
  assert.equal(formatCOP(900), "$900");
});

test("yearly savings and monthly equivalent", () => {
  assert.equal(savePercent(PRICING_COP.nomad.earlyAdopter), 22);
  assert.equal(savePercent(PRICING_COP.hub.earlyAdopter), 20);
  assert.equal(savePercent(PRICING_COP.orbital.earlyAdopter), 20);
  assert.equal(savePercent(PRICING_COP.orbitalExtraSite.earlyAdopter), 21);
  assert.equal(monthlyEquivalent(PRICING_COP.nomad.earlyAdopter.yearly), 23_250);
});
