export type FrameLoader = {
  /** The decoded frame at `index`, or the nearest decoded one, or null. */
  nearest(index: number): HTMLImageElement | null;
  /** Begin fetching. Idempotent. */
  start(): void;
  /** Abandon pending work. Decoded frames stay resident. */
  stop(): void;
  loadedCount(): number;
  readonly total: number;
  /** Fires as frames land. Returns an unsubscribe. */
  subscribe(fn: (loaded: number) => void): () => void;
};

export type FrameLoaderOptions = {
  count: number;
  srcFor: (index: number) => string;
  /** Parallel in-flight requests. 6 matches a browser's per-origin budget. */
  concurrency?: number;
};

/**
 * Fetches and decodes the frame sequence.
 *
 * Two deliberate choices:
 *
 * 1. `HTMLImageElement` + `decode()`, not `createImageBitmap`. An ImageBitmap
 *    pins its decoded pixels until you call `close()`, so a 61-frame sequence
 *    would be ~212 MiB the browser is not allowed to reclaim. Image elements let
 *    it evict under memory pressure and re-decode lazily, which costs a few ms
 *    on a rare frame instead of an OOM kill on a phone.
 *
 * 2. Coarse-to-fine order: frame 0, then the last frame, then every 8th, then
 *    everything else. A scrub that starts before loading finishes then always
 *    has *some* frame within a few indices, so it degrades into a choppier
 *    version of the same animation rather than a blank canvas.
 */
export function createFrameLoader({
  count,
  srcFor,
  concurrency = 6,
}: FrameLoaderOptions): FrameLoader {
  const frames = new Array<HTMLImageElement | null>(count).fill(null);
  const listeners = new Set<(loaded: number) => void>();
  let loaded = 0;
  let started = false;
  let cancelled = false;

  const order = buildPriorityOrder(count);

  function announce() {
    for (const fn of listeners) fn(loaded);
  }

  async function worker(queue: number[]) {
    while (!cancelled) {
      const index = queue.pop();
      if (index === undefined) return;
      if (frames[index]) continue;

      const img = new Image();
      img.decoding = "async";
      // The section sits a screen below the hero; never compete with the LCP.
      img.fetchPriority = "low";
      img.src = srcFor(index);

      try {
        await img.decode();
      } catch {
        // A failed frame is survivable: `nearest` will skip over it. Bailing out
        // of the whole sequence because one request failed would not be.
        continue;
      }
      if (cancelled) return;
      frames[index] = img;
      loaded += 1;
      announce();
    }
  }

  return {
    total: count,
    loadedCount: () => loaded,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    start() {
      if (started) return;
      started = true;
      // Workers pop from the end, so reverse to preserve priority order.
      const queue = [...order].reverse();
      for (let i = 0; i < Math.min(concurrency, count); i++) void worker(queue);
    },
    stop() {
      cancelled = true;
    },
    nearest(index) {
      const i = index < 0 ? 0 : index >= count ? count - 1 : index;
      if (frames[i]) return frames[i];
      for (let d = 1; d < count; d++) {
        if (i - d >= 0 && frames[i - d]) return frames[i - d];
        if (i + d < count && frames[i + d]) return frames[i + d];
      }
      return null;
    },
  };
}

/** frame 0, last frame, every 8th, then the rest. */
export function buildPriorityOrder(count: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const push = (i: number) => {
    if (i >= 0 && i < count && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };

  push(0);
  push(count - 1);
  for (let i = 0; i < count; i += 8) push(i);
  for (let i = 0; i < count; i++) push(i);
  return order;
}
