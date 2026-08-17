"use client";

import { useMemo, useState } from "react";
import type { IntentId } from "../narrative/intents";
import type { CreatorRole } from "../narrative/creators";

export type SectionFilters = {
  intent: IntentId | null;
  setIntent: (id: IntentId | null) => void;
  role: CreatorRole | null;
  setRole: (id: CreatorRole | null) => void;
};

/**
 * The chip selections, held above both the copy and the map.
 *
 * They live this high because two very different consumers need the same
 * answer: `SectionCopy` renders the chips, and `MapIntro` has to fold the intent
 * into the camera target before handing it to `useSectionCamera` — which must
 * remain the ONLY thing that writes the camera. A second writer reading the
 * chips directly is exactly the shape of the latch bug that once dissolved the
 * intro's wide valley into street level.
 *
 * Not persisted and not in the URL. This is a scroll-driven story on a landing
 * page, not an app view worth deep-linking, and the intent that does matter is
 * carried out by the closing CTA as a `purpose` query param.
 */
export function useSectionFilters(): SectionFilters {
  const [intent, setIntent] = useState<IntentId | null>(null);
  const [role, setRole] = useState<CreatorRole | null>(null);

  return useMemo(
    () => ({ intent, setIntent, role, setRole }),
    [intent, role],
  );
}
