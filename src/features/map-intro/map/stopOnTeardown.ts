/** Only what the teardown touches — structural so the test needs no DOM. */
type TeardownMap = {
  stop: () => void;
  on: (type: "unload", fn: () => void) => void;
  off: (type: "unload", fn: () => void) => void;
};

/**
 * Stops a running flight when the caller goes away — unless the map went away
 * first, in which case there is nothing left to stop and asking would throw.
 *
 * `map.stop()` on a destroyed map is not merely useless, it is fatal: Leaflet's
 * `stop()` routes through `setZoom` → `getCenter` → `_getMapPanePos`, which
 * reads `_leaflet_pos` off `_mapPane` — and `Map.remove()` deletes `_mapPane`.
 * That is the `Cannot read properties of undefined` crash on route change,
 * because React runs the map owner's cleanup (which removes the map) before the
 * camera's, following hook declaration order in MapStage.
 *
 * Nothing is lost by skipping it: `Map.remove()` calls `_stop()` itself, so the
 * flight this exists to cancel is already cancelled by the time we bow out.
 *
 * `unload` is the signal rather than a peek at `_mapPane` because it is public
 * API, and because Leaflet fires it *before* it starts dismantling itself — so
 * the flag is always set while the map is still answerable.
 */
export function stopOnTeardown(map: TeardownMap): () => void {
  let destroyed = false;
  const onUnload = () => {
    destroyed = true;
  };

  map.on("unload", onUnload);

  return () => {
    map.off("unload", onUnload);
    if (!destroyed) map.stop();
  };
}
