import type { CameraTarget } from "../types";
import { SECTIONS } from "./sections";
import { distanceM } from "./intents";

/**
 * The people the second section puts on the map.
 *
 * Invented, and unavoidably so — the landing page has no user data of any kind,
 * and this section's whole claim ("see in real time who is building the future
 * alongside you") needs bodies on the map to be legible. They are fixtures for
 * a marketing page, not a feed.
 *
 * Roles are categories rather than job titles, which is a translation decision
 * as much as a design one. Spanish job nouns are gendered — Diseñadora vs
 * Diseñador — so per-person titles would mean fifteen gendered strings per
 * locale and a standing chance of getting somebody's wrong. Categories say the
 * same thing, work for the filter chips unchanged, and cost four keys.
 */
export type CreatorRole = "design" | "code" | "marketing" | "founder";

export const CREATOR_ROLES: readonly CreatorRole[] = [
  "design",
  "code",
  "marketing",
  "founder",
];

export type CreatorStatus = "collaborating" | "focused" | "creating";

export const roleLabelKey = (r: CreatorRole) =>
  `home.mapIntro.connect.roles.${r}`;
export const statusLabelKey = (s: CreatorStatus) =>
  `home.mapIntro.connect.statuses.${s}`;

/**
 * The same status in as few characters as it can be said in.
 *
 * Only for phones, and it buys pins rather than tidiness: "buscando
 * colaboración" is the widest line on the plate at 21 characters, and the width
 * of the plate is what decides how many people fit in a 343px band. Halving it
 * is the difference between one pin and three.
 */
export const statusShortLabelKey = (s: CreatorStatus) =>
  `home.mapIntro.connect.statusesShort.${s}`;

type CreatorSeed = {
  id: string;
  name: string;
  role: CreatorRole;
  status: CreatorStatus;
  /** Degrees from the section's camera centre. ~0.005 is roughly 550m. */
  offset: readonly [number, number];
};

/**
 * Scattered around the connect section's camera rather than given absolute
 * coordinates, so re-aiming that camera moves the whole cast with it instead of
 * stranding fifteen people in a neighbourhood the map no longer visits.
 *
 * The scatter is WIDE AND FLAT on purpose, and the shape is not arbitrary: this
 * section's window is a 1152x317 band. An earlier, evenly circular spread of
 * about 450m in each direction measured as a 350px blob in the middle of a
 * 1152px frame — only three of the fifteen had room for a label, and the rest
 * were culled while most of the band sat empty. Longitude is cheap here and
 * latitude is not, so the offsets follow the window's proportions: roughly six
 * times wider than tall.
 */
const SEEDS: readonly CreatorSeed[] = [
  { id: "c1", name: "Ana", role: "design", status: "collaborating", offset: [0.0006, -0.0021] },
  { id: "c2", name: "Nicolás", role: "code", status: "focused", offset: [-0.0009, 0.0034] },
  { id: "c3", name: "Juan", role: "founder", status: "creating", offset: [0.0013, 0.0088] },
  { id: "c4", name: "Valeria", role: "design", status: "creating", offset: [-0.0007, -0.0074] },
  { id: "c5", name: "Samuel", role: "code", status: "collaborating", offset: [0.0011, 0.0012] },
  { id: "c6", name: "Mariana", role: "marketing", status: "focused", offset: [-0.0014, -0.0043] },
  { id: "c7", name: "Tomás", role: "code", status: "creating", offset: [0.0004, 0.0119] },
  { id: "c8", name: "Salomé", role: "marketing", status: "collaborating", offset: [-0.0004, 0.0061] },
  { id: "c9", name: "Emilio", role: "founder", status: "focused", offset: [0.0016, -0.0108] },
  { id: "c10", name: "Isabela", role: "design", status: "focused", offset: [-0.0012, 0.0016] },
  { id: "c11", name: "Andrés", role: "code", status: "creating", offset: [0.0008, -0.0136] },
  { id: "c12", name: "Camila", role: "marketing", status: "creating", offset: [0.0002, -0.0096] },
  { id: "c13", name: "Sebastián", role: "founder", status: "collaborating", offset: [-0.0017, 0.0104] },
  { id: "c14", name: "Laura", role: "design", status: "collaborating", offset: [0.0010, 0.0046] },
  { id: "c15", name: "Daniel", role: "code", status: "focused", offset: [-0.0005, -0.0058] },
];

export type Creator = {
  id: string;
  name: string;
  role: CreatorRole;
  status: CreatorStatus;
  position: [number, number];
  /** Metres from the section's centre, rounded to something a human would say. */
  distanceM: number;
};

const CONNECT_CAMERA: CameraTarget =
  SECTIONS.find((s) => s.id === "connect")!.camera;

/**
 * The distance is COMPUTED from the offset, never written down beside it. Two
 * hand-maintained numbers describing the same fact drift the moment anybody
 * nudges a pin, and "180m" printed under a pin sitting half a kilometre away is
 * exactly the kind of detail that makes a demo feel fake.
 */
export const CREATORS: readonly Creator[] = SEEDS.map((s) => {
  const position: [number, number] = [
    CONNECT_CAMERA.center[0] + s.offset[0],
    CONNECT_CAMERA.center[1] + s.offset[1],
  ];
  const raw = distanceM(CONNECT_CAMERA.center, position);
  return {
    id: s.id,
    name: s.name,
    role: s.role,
    status: s.status,
    position,
    distanceM: Math.round(raw / 10) * 10,
  };
});

export function creatorsForRole(role: CreatorRole | null): readonly Creator[] {
  return role ? CREATORS.filter((c) => c.role === role) : CREATORS;
}

/**
 * Where the camera goes when a role is picked.
 *
 * Section 1 has moved the camera per chip since it was built; this one did not,
 * and the omission showed: on a phone, filtering by Marketing or Founders left
 * the map completely EMPTY under a headline promising to show who is creating
 * nearby. The cast is scattered wide so it fills a desktop band, and a phone
 * band only sees a fraction of that width — so whether a role had anyone on
 * screen came down to luck.
 *
 * Aimed at the group's MEDOID — the member with the least total distance to the
 * others — and not at its centroid, which was the first attempt and did not
 * work. The founders sit 2300m apart, so their centroid lands in a gap with
 * nobody within a phone screen of it and the section stayed empty. A medoid is
 * always an actual person, so that person is dead centre by construction and
 * the guarantee holds however scattered the group is.
 *
 * Derived rather than hand-picked, so moving a creator moves the camera with
 * them and the two cannot drift apart.
 */
export const ROLE_CAMERAS: Record<CreatorRole, [number, number]> = Object.
  fromEntries(
    CREATOR_ROLES.map((role) => {
      const group = CREATORS.filter((c) => c.role === role);
      const medoid = group.reduce((best, c) => {
        const spread = (x: Creator) =>
          group.reduce((sum, o) => sum + distanceM(x.position, o.position), 0);
        return spread(c) < spread(best) ? c : best;
      }, group[0]);
      return [role, medoid.position] as [CreatorRole, [number, number]];
    }),
  ) as Record<CreatorRole, [number, number]>;
