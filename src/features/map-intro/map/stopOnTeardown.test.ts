/**
 * Run with: node --test src/features/map-intro/map/stopOnTeardown.test.ts
 *
 * The bug this guards against only showed up on a route change, which is the
 * one moment nobody is looking at the map — so it is asserted here rather than
 * left to be caught by whoever next clicks a link on the landing page.
 *
 * The fake mirrors Leaflet 1.9.4's real teardown, read from
 * node_modules/leaflet/dist/leaflet-src.js:
 *
 *   Map.remove()  fires `unload` (:3893) and only then `delete this._mapPane`
 *                 (:3909) — which is what makes `unload` a usable liveness
 *                 signal rather than a courtesy notification.
 *   Map.stop()    (:3719) routes through setZoom → getCenter → _moved →
 *                 _getMapPanePos → getPosition(this._mapPane) (:2559), so on a
 *                 removed map it reads `_leaflet_pos` off undefined and throws.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { stopOnTeardown } from "./stopOnTeardown.ts";

function fakeMap() {
  const listeners = new Set<() => void>();
  let removed = false;
  let stops = 0;

  return {
    get stopCount() {
      return stops;
    },
    get listenerCount() {
      return listeners.size;
    },
    stop() {
      if (removed) {
        // The exact shape of the reported crash.
        throw new TypeError("Cannot read properties of undefined (reading '_leaflet_pos')");
      }
      stops++;
    },
    on(_type: "unload", fn: () => void) {
      listeners.add(fn);
    },
    off(_type: "unload", fn: () => void) {
      listeners.delete(fn);
    },
    /** Leaflet's Map.remove(): announce, then become unusable. */
    remove() {
      for (const fn of listeners) fn();
      removed = true;
    },
  };
}

test("a map torn down before the effect's cleanup is left alone", () => {
  // The route change: useLeafletMap's cleanup removes the map first, because
  // its hook is declared above useSectionCamera's in MapStage.
  const map = fakeMap();
  const teardown = stopOnTeardown(map);

  map.remove();

  assert.doesNotThrow(teardown);
  assert.equal(map.stopCount, 0, "a removed map stopped itself on the way out");
});

test("a live map is still stopped, exactly once", () => {
  // The whole point of the cleanup: a flight left mid-air when the camera's
  // owner goes away. Leaflet's remove() is not involved here, so nothing else
  // would cancel it.
  const map = fakeMap();
  const teardown = stopOnTeardown(map);

  teardown();

  assert.equal(map.stopCount, 1);
});

test("the liveness listener does not outlive the effect", () => {
  // The map outlives one useSectionCamera effect run whenever its deps change,
  // so a listener left behind would accumulate for the life of the map.
  const map = fakeMap();
  const teardown = stopOnTeardown(map);
  assert.equal(map.listenerCount, 1);

  teardown();

  assert.equal(map.listenerCount, 0);
});
