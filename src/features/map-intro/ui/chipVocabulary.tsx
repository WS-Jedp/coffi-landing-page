import type { IconType } from "react-icons";
import { FaBrain } from "react-icons/fa";
import {
  MdCampaign,
  MdCelebration,
  MdCode,
  MdDesignServices,
  MdEco,
  MdPeople,
  MdRocketLaunch,
} from "react-icons/md";
import {
  AMBIENCE_COLOR,
  AMBIENCE_INK,
  type Ambience,
} from "../map/pinVocabulary";
import { CREATOR_ROLES, type CreatorRole } from "../narrative/creators";
import { INTENT_AMBIENCE, INTENT_IDS, type IntentId } from "../narrative/intents";

/**
 * What a filter chip looks like: an icon and a two-tone accent.
 *
 * `tint` is the brand colour at full strength. It draws the border and the
 * icon's disc while resting, and it FILLS the chip when selected. `ink` is a
 * deeper shade of the same hue, used only for the glyph while resting, where it
 * sits on a disc that is 14% tint over white and needs to be legible.
 *
 * The selected chip carries `coffi-black`, not white, and that is what keeps the
 * fills bright. Darkening a brand colour until white text clears AA turns
 * amber into brown (#B45309) and the cowork blue into navy (#3B6BE0) — measured,
 * and it read exactly as dark as it sounds. Dark text on the colour itself
 * measures 4.95 (study), 6.33 (blue), 5.16 (green) and 7.84 (amber), so the
 * chips can stay the colour the brand actually uses.
 */
export type ChipVisual = {
  Icon: IconType;
  tint: string;
  ink: string;
  deep: string;
};

/**
 * The deepest step of each accent, and the only thing it is for is the label of
 * a SELECTED chip.
 *
 * The chip's own colour at a much lower lightness, rather than a neutral. Black
 * text on a saturated fill reads as a label dropped onto the chip; the same hue
 * taken down to near-ink reads as part of it, and it measures better than the
 * neutral did — 6.31 / 7.10 / 5.97 / 8.97 against the four fills, where
 * `coffi-black` managed 4.95 on the purple.
 *
 * White was the other option and it cannot work here: for white to clear AA the
 * fill has to be darkened until the amber becomes brown and the blue becomes
 * navy, which is the exact thing these accents were brightened to escape.
 *
 * Kept in this file rather than beside AMBIENCE_COLOR/AMBIENCE_INK because no
 * pin needs it — a pin never puts text on top of its own colour.
 */
const AMBIENCE_DEEP: Record<Ambience, string> = {
  study: "#1E1152",
  work: "#172554",
  cowork: "#172554",
  fun: "#451A03",
  romantic: "#500724",
};

/**
 * Coffi's green, for the one intent whose meaning outranks its data.
 *
 * `emerald-500`, the same green the app spends on wellness (`handlePurposeCardColor`
 * gives WORK_AND_WELLNESS the green family) and the same one already on this map
 * as the "looking to collaborate" status in `creatorPins`. So it is a colour the
 * section already speaks, not an import from outside the palette.
 */
const COFFI_GREEN = {
  tint: "#10B981",
  ink: "#047857",
  deep: "#022C22",
} as const;

/**
 * The intent chips wear the colour of the pins they summon.
 *
 * Both hexes come from `pinVocabulary` by import rather than by copy, so the
 * chip and the pin cannot drift apart: change a pin colour and the chip that
 * promises it changes with it. Which ambience each intent claims is itself
 * derived — see INTENT_AMBIENCE, and note that two intents deliberately share
 * the purple.
 *
 * The icons are the app's own, from `getPurposeGroupIcon` in
 * `coffi-app/src/common/utils/icons/icons`, because these chips are the same
 * control the visitor meets after installing: the same question deserves the
 * same glyph.
 *
 * They do NOT match the icons on the pins, and that is the point. The chip's
 * icon says what the visitor wants; the pin's says how the place reads right
 * now. Colour is what ties the two together — a brain is not a graduation cap,
 * but pressing the purple chip drops purple pins.
 *
 * FUN is the exception, as it is everywhere else in this feature: the app has no
 * "going out" purpose group, so its icon is the one the landing's own `fun` pins
 * already use.
 */
const INTENT_ICON: Record<IntentId, IconType> = {
  LOCKED_IN: FaBrain,
  NETWORK_AND_CHILL: MdPeople,
  WORK_AND_WELLNESS: MdEco,
  FUN: MdCelebration,
};

/**
 * Where an intent's colour is chosen rather than derived.
 *
 * WORK_AND_WELLNESS is green because unwinding is green in this brand — in the
 * app's own purpose cards and everywhere else — and that reading is worth more
 * than the `study` purple its pins happen to average out to. It also breaks the
 * tie that had this chip and Focus wearing the same colour, so the row reads as
 * four things again.
 *
 * The cowork blue is stepped one token lighter for a different reason, and only
 * for the fill: `#6E91FF` under `coffi-black` measures 4.46:1, four hundredths
 * short of AA, while `coffi-blue-400` clears it at 6.33. The resting border and
 * disc still use the pin's own blue — nothing there carries text.
 */
const INTENT_OVERRIDE: Partial<Record<IntentId, Partial<ChipVisual>>> = {
  WORK_AND_WELLNESS: COFFI_GREEN,
  NETWORK_AND_CHILL: { tint: "#94B3FF" },
};

export const INTENT_VISUAL: Record<IntentId, ChipVisual> = Object.fromEntries(
  INTENT_IDS.map((id) => {
    const ambience = INTENT_AMBIENCE[id];
    return [
      id,
      {
        Icon: INTENT_ICON[id],
        tint: AMBIENCE_COLOR[ambience],
        ink: AMBIENCE_INK[ambience],
        deep: AMBIENCE_DEEP[ambience],
        ...INTENT_OVERRIDE[id],
      },
    ];
  }),
) as Record<IntentId, ChipVisual>;

/**
 * The role chips share one accent, and the restraint is deliberate.
 *
 * Creator pins are coloured by STATUS — collaborating, focused, creating — not
 * by role, so a colour per role would teach a mapping the map never honours.
 * The house purple keeps the row in the same family as section 1 while the icons
 * do the distinguishing, which is all that is being asked of them.
 *
 * `study`'s pair is the Coffi purple pair (`coffi-purple-300` over
 * `coffi-purple`), reused here by name rather than re-typed as hex.
 */
const ROLE_ICON: Record<CreatorRole, IconType> = {
  design: MdDesignServices,
  code: MdCode,
  marketing: MdCampaign,
  founder: MdRocketLaunch,
};

export const ROLE_VISUAL: Record<CreatorRole, ChipVisual> = Object.fromEntries(
  CREATOR_ROLES.map((role) => [
    role,
    {
      Icon: ROLE_ICON[role],
      tint: AMBIENCE_COLOR.study,
      ink: AMBIENCE_INK.study,
      deep: AMBIENCE_DEEP.study,
    },
  ]),
) as Record<CreatorRole, ChipVisual>;
