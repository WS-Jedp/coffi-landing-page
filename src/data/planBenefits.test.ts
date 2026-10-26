/**
 * Run with: node --test src/data/planBenefits.test.ts
 *
 * The lists render straight from these keys, so a key missing from one locale
 * shows up on the page as a raw `home.subscriptions…` path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  EXPLORER_BENEFITS,
  NOMAD_BENEFITS,
  NOMAD_CHECKOUT_BENEFITS,
  NOMAD_CHECKOUT_DESCRIBED,
} from "./planBenefits.ts";

type Plans = Record<
  "explorer" | "nomad",
  {
    benefits: Record<string, string>;
    benefitsDescriptions?: Record<string, string>;
  }
>;

const plansFor = (locale: string): Plans =>
  JSON.parse(
    readFileSync(
      new URL(`../i18n/messages/${locale}/home.json`, import.meta.url),
      "utf8"
    )
  ).subscriptions.plans;

const LOCALES = ["es", "en"];

for (const locale of LOCALES) {
  test(`${locale}: every listed benefit has copy`, () => {
    const plans = plansFor(locale);

    for (const key of EXPLORER_BENEFITS) {
      assert.ok(plans.explorer.benefits[key], `explorer.benefits.${key}`);
    }
    for (const key of NOMAD_BENEFITS) {
      assert.ok(plans.nomad.benefits[key], `nomad.benefits.${key}`);
    }
    for (const key of NOMAD_CHECKOUT_DESCRIBED) {
      assert.ok(
        plans.nomad.benefitsDescriptions?.[key],
        `nomad.benefitsDescriptions.${key}`
      );
    }
  });

  test(`${locale}: no benefit copy is left over from a removed line`, () => {
    const plans = plansFor(locale);

    assert.deepEqual(
      Object.keys(plans.explorer.benefits).sort(),
      [...EXPLORER_BENEFITS].sort()
    );
    assert.deepEqual(
      Object.keys(plans.nomad.benefits).sort(),
      [...NOMAD_BENEFITS].sort()
    );
    assert.deepEqual(
      Object.keys(plans.nomad.benefitsDescriptions ?? {}).sort(),
      [...NOMAD_CHECKOUT_DESCRIBED].sort()
    );
  });
}

test("the checkout lists the city and visible-time lines", () => {
  for (const key of ["visibleInCity", "visibleTimePoints"] as const) {
    assert.ok(NOMAD_CHECKOUT_BENEFITS.includes(key), key);
  }
  assert.ok(EXPLORER_BENEFITS.includes("visibleTimePoints"));
});

test("every described checkout line is a checkout line", () => {
  for (const key of NOMAD_CHECKOUT_DESCRIBED) {
    assert.ok(NOMAD_CHECKOUT_BENEFITS.includes(key), key);
  }
});
