/**
 * What each plan lists, in order. The copy lives in
 * `home.subscriptions.plans.<plan>.benefits.<key>` in both locales.
 *
 * Every line has to be something the app does today for that plan. The source
 * of truth is the backend: `hasCityScope` (connections) decides what only a
 * paid plan gets, and `POINTS_TABLE` (gamification) decides the 2x. Community
 * spots and real-time filters are open to every plan "while we validate
 * Product Market Fit", so they sit under Explorer, not Nomad. If they get
 * gated, move them back.
 */
export const EXPLORER_BENEFITS = [
  "allSpots",
  "filters",
  "liveStatus",
  "sessions",
  "coffiPoints",
  "freeForever",
] as const;

export const NOMAD_BENEFITS = [
  "explorerBenefits",
  "cityPresence",
  "presenceFilter",
  "visibleInCity",
  "2xCoffiPoints",
  "exclusivePerks",
] as const;

/**
 * The three the checkout explains at length, each with a line under
 * `nomad.benefitsDescriptions`. Only what Explorer does not already have.
 */
export const NOMAD_CHECKOUT_BENEFITS = [
  "cityPresence",
  "2xCoffiPoints",
  "exclusivePerks",
] as const satisfies readonly (typeof NOMAD_BENEFITS)[number][];

export type NomadCheckoutBenefit = (typeof NOMAD_CHECKOUT_BENEFITS)[number];
