/**
 * Run with: node --test src/i18n/faqs.test.ts
 *
 * `/faqs` renders every question from `faqs.json`, so a key missing from one
 * locale shows up on the page as a raw `faqs…` path, and an English string
 * left in the Spanish file shows up on `/es/faqs`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type Tree = { [key: string]: string | Tree };

const faqsFor = (locale: string): Tree =>
  JSON.parse(
    readFileSync(
      new URL(`./messages/${locale}/faqs.json`, import.meta.url),
      "utf8"
    )
  );

const leaves = (tree: Tree, prefix = ""): [string, string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === "string"
      ? [[`${prefix}${key}`, value] as [string, string]]
      : leaves(value, `${prefix}${key}.`)
  );

const es = new Map(leaves(faqsFor("es")));
const en = new Map(leaves(faqsFor("en")));

test("es and en have exactly the same faq keys", () => {
  assert.deepEqual([...es.keys()].sort(), [...en.keys()].sort());
});

test("every faq key has copy in both locales", () => {
  for (const [locale, messages] of [["es", es], ["en", en]] as const) {
    for (const [key, value] of messages) {
      assert.ok(value.trim(), `${locale}: faqs.${key}`);
    }
  }
});

test("the spanish faq has no english faq copy left", () => {
  for (const [key, value] of es) {
    assert.notEqual(value, en.get(key), `faqs.${key} is still in English`);
  }
  const englishMarkers =
    /\b(the|you|your|and|what|how|with|can|does|is|are|who)\b/i;
  for (const [key, value] of es) {
    const text = value.replace(/<\/?b>/g, "");
    assert.doesNotMatch(text, englishMarkers, `faqs.${key}: "${text}"`);
  }
});

test("the plans answer bolds each plan name with a <b> tag and no other html", () => {
  for (const messages of [es, en]) {
    for (const plan of ["explorer", "nomad", "wanderlust"]) {
      const value = messages.get(`plans.whichPlans.${plan}`) ?? "";
      assert.match(value, /^<b>(Explorer|Nomad|Wanderlust)<\/b>/);
    }
    for (const [key, value] of messages) {
      const tags = value.match(/<\/?[a-z]+[^>]*>/gi) ?? [];
      assert.ok(
        tags.every((tag) => tag === "<b>" || tag === "</b>"),
        `faqs.${key} has html: ${tags.join(" ")}`
      );
    }
  }
});

test("the upgrade answer links the nomad page for each locale", () => {
  assert.match(
    es.get("plans.upgrade.answer") ?? "",
    /\(\/es\/subscribe-nomad-plan\)/
  );
  assert.match(
    en.get("plans.upgrade.answer") ?? "",
    /\(\/subscribe-nomad-plan\)/
  );
});
