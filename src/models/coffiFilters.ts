import {
  NOISE_LEVEL_ENUM,
  PLACE_COMMODITIES_ENUM,
  PLACE_RULES_ENUM,
  PLACE_TYPES,
  WIFI_SPEED_COMMODITY_ENUM,
} from "@/models/places";

/**
 * The filter contract between this landing page and the Coffi app.
 *
 * Everything that travels in the URL is written in the APP's vocabulary, never
 * in the landing's. The app only validates and applies; it never learns our
 * marketing labels. That direction was chosen deliberately: any future sender —
 * an email campaign, an ad, a printed QR — writes the same six params, and the
 * app needs exactly one parser for all of them.
 *
 * Values are always enum NAMES, never the numeric ids the app's filter slice
 * uses internally. Those ids are neither contiguous nor stable (place types
 * skip 4; the people-amount catalogue starts at 2), so putting them in a URL
 * would freeze an implementation detail into a public contract.
 *
 *   {APP_URL}/home
 *     ?purpose=<PURPOSE_BASED_GROUP>
 *     &types=<PLACE_TYPES,...>
 *     &commodities=<PLACE_COMMODITIES_ENUM,...>
 *     &commodityValues=<commodity:VALUE,...>
 *     &noise=<PLACE_NOISE_LEVEL>
 *     &rules=<PLACE_RULES_ENUM,...>
 */

/**
 * Mirrored from `coffi-app/src/models/purposeBasedGroup`, which is what the
 * app's own "intention for today" filter is built on. Same reasoning as the
 * map-intro intents: matching the product exactly is what makes the promise
 * honest — the Hero asks the app's question, not a paraphrase of it.
 */
export enum PURPOSE_BASED_GROUP {
  LOCKED_IN = "LOCKED_IN",
  MEETINGS_DAY = "MEETINGS_DAY",
  BUILD_MODE = "BUILD_MODE",
  NETWORK_AND_CHILL = "NETWORK_AND_CHILL",
  WORK_AND_WELLNESS = "WORK_AND_WELLNESS",
  WEEKEND_WORK_AND_VIEWS = "WEEKEND_WORK_AND_VIEWS",
  NIGHT_OWL_MODE = "NIGHT_OWL_MODE",
}

/**
 * The purposes the Hero offers.
 *
 * NIGHT_OWL_MODE is in the enum but NOT here: its entry in the app's
 * `purposeBasedGroups` is commented out, so selecting it expands to zero tags
 * and filters nothing. Offering a chip that quietly does nothing is worse than
 * offering one fewer.
 */
export const PURPOSE_OPTIONS = [
  PURPOSE_BASED_GROUP.LOCKED_IN,
  PURPOSE_BASED_GROUP.MEETINGS_DAY,
  PURPOSE_BASED_GROUP.BUILD_MODE,
  PURPOSE_BASED_GROUP.NETWORK_AND_CHILL,
  PURPOSE_BASED_GROUP.WORK_AND_WELLNESS,
  PURPOSE_BASED_GROUP.WEEKEND_WORK_AND_VIEWS,
] as const;

export type PurposeId = (typeof PURPOSE_OPTIONS)[number];

/**
 * Narrows an arbitrary string to a purpose the app can act on, or null.
 *
 * Senders do not all speak in purposes the product has. The map-intro track
 * offers a "FUN" intent that has no counterpart in `purposeBasedGroups` — so
 * rather than teach every caller which values are real, they ask here and a
 * value the app cannot use simply becomes no filter at all.
 */
export const toPurposeId = (
  value: string | null | undefined
): PurposeId | null =>
  PURPOSE_OPTIONS.find((option) => option === value) ?? null;

/**
 * The place types the Hero offers.
 *
 * PARK and RESTAURANT exist in PLACE_TYPES but have no id in the app's filter
 * catalogue, so the app cannot filter by them — same rule as above.
 */
export const PLACE_TYPE_OPTIONS = [
  PLACE_TYPES.COFFEE,
  PLACE_TYPES.LIBRARY,
  PLACE_TYPES.LOOKOUT,
  PLACE_TYPES.ROOFTOP,
  PLACE_TYPES.COWORK_ZONE,
] as const;

export type PlaceTypeId = (typeof PLACE_TYPE_OPTIONS)[number];

/**
 * The needs the Hero offers.
 *
 * These keep landing-owned ids rather than app enum names, because a need is a
 * curated bundle with a friendly name — "fast Wi-Fi" is one idea to a visitor
 * but a commodity-with-value to the app, and "quiet" is a noise level, not a
 * commodity at all. The id is ours; what TRAVELS is its expansion below.
 */
export const NEED_OPTIONS = [
  "fastWifi",
  "plugs",
  "quiet",
  "outdoor",
  "petFriendly",
] as const;

export type NeedId = (typeof NEED_OPTIONS)[number];

/** A need's contribution to the canonical selection. */
type NeedExpansion = {
  commodities?: PLACE_COMMODITIES_ENUM[];
  commodityValues?: { commodity: PLACE_COMMODITIES_ENUM; value: string }[];
  noise?: NOISE_LEVEL_ENUM;
  rules?: PLACE_RULES_ENUM[];
};

/**
 * Every need maps onto a filter the app actually supports today. That is the
 * whole constraint, and it is what the previous set failed: "good light",
 * "inspiring vibe" and "spacious" had no counterpart in the app's model, so
 * three of five chips were decoration.
 */
export const NEED_EXPANSION: Record<NeedId, NeedExpansion> = {
  fastWifi: {
    commodityValues: [
      {
        commodity: PLACE_COMMODITIES_ENUM.WIFI_SPEED,
        value: WIFI_SPEED_COMMODITY_ENUM.FAST,
      },
    ],
  },
  plugs: { commodities: [PLACE_COMMODITIES_ENUM.PUBLIC_PLUGS] },
  quiet: { noise: NOISE_LEVEL_ENUM.QUIET },
  outdoor: { commodities: [PLACE_COMMODITIES_ENUM.OUTDOOR_SEATING] },
  petFriendly: { rules: [PLACE_RULES_ENUM.PET_FRIENDLY] },
};

export interface CoffiFilterSelection {
  purpose?: PurposeId | null;
  placeType?: PlaceTypeId | null;
  needs?: NeedId[];
}

const unique = <T,>(values: T[]): T[] => Array.from(new Set(values));

/**
 * Turns a Hero selection into the query params the app reads.
 *
 * Needs are merged rather than concatenated: two of them can contribute to the
 * same dimension, and the app's own reducers append without de-duplicating, so
 * a repeated value would be applied twice on the other side.
 */
export const buildCoffiFilterParams = (
  selection: CoffiFilterSelection
): URLSearchParams => {
  const params = new URLSearchParams();

  const commodities: PLACE_COMMODITIES_ENUM[] = [];
  const commodityValues: string[] = [];
  const rules: PLACE_RULES_ENUM[] = [];
  let noise: NOISE_LEVEL_ENUM | null = null;

  for (const need of selection.needs ?? []) {
    const expansion = NEED_EXPANSION[need];
    if (!expansion) continue;

    commodities.push(...(expansion.commodities ?? []));
    rules.push(...(expansion.rules ?? []));
    for (const { commodity, value } of expansion.commodityValues ?? []) {
      commodityValues.push(`${commodity}:${value}`);
    }
    // Noise is single-valued in the app, so the last need to ask for it wins.
    if (expansion.noise) noise = expansion.noise;
  }

  if (selection.purpose) params.set("purpose", selection.purpose);
  if (selection.placeType) params.set("types", selection.placeType);
  if (commodities.length) {
    params.set("commodities", unique(commodities).join(","));
  }
  if (commodityValues.length) {
    params.set("commodityValues", unique(commodityValues).join(","));
  }
  if (noise) params.set("noise", noise);
  if (rules.length) params.set("rules", unique(rules).join(","));

  return params;
};
