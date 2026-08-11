/**
 * Encode the map-intro frame sequence for the web.
 *
 * Source: assets-src/map-intro/frame_0001.webp ... frame_0145.webp
 *         1136x800 LOSSLESS WebP, ~54 MB total. Gitignored.
 *
 * Output: public/assets/animations/map-intro/{640,1136}/frame_XXXX.webp
 *         Lossy, decimated. ~5 MB total. Committed.
 *
 * Two things drive this script:
 *
 *  1. Only frames 1..120 are used. Frame 120 is the flat city view we hand off
 *     to Leaflet from; 121-145 keep pushing in and are unused.
 *
 *  2. Decoded RAM, not bytes on the wire, is the binding constraint. A decoded
 *     1136x800 frame costs 1136*800*4 = 3.47 MiB. All 120 would be 416 MiB and
 *     iOS kills the tab. Decimating gives back RAM linearly:
 *
 *        rung 1136, every 2nd frame -> 60 frames -> ~208 MiB
 *        rung  640, every 3rd frame -> 40 frames -> ~ 44 MiB
 *
 *     Over a ~220svh scroll track, 60 frames is still ~29 px of scroll per
 *     frame, which is finer than anyone can perceive while scrubbing.
 *
 * Frames 1..73 carry an alpha channel (the folded paper floats on transparency);
 * 74..145 are opaque. alphaQuality is kept high so the paper's edge does not
 * fringe against the page background.
 *
 * Usage: npm run encode:map-intro
 */
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets-src", "map-intro");
const OUT_DIR = path.join(ROOT, "public", "assets", "animations", "map-intro");

/** Last frame we use. The tail (121-145) is a deeper push-in we don't scrub. */
const LAST_FRAME = 120;

const RUNGS = [
  { width: 1136, step: 2, quality: 78 },
  { width: 640, step: 3, quality: 74 },
];

const SHARED = { effort: 6, alphaQuality: 90, smartSubsample: true };

const srcName = (n) => `frame_${String(n).padStart(4, "0")}.webp`;

async function main() {
  const available = new Set(await readdir(SRC_DIR));

  const manifest = { lastSourceFrame: LAST_FRAME, rungs: {} };
  let grandTotal = 0;

  for (const rung of RUNGS) {
    const dir = path.join(OUT_DIR, String(rung.width));
    await mkdir(dir, { recursive: true });

    // Source frame numbers this rung keeps. Always include frame 1 and
    // LAST_FRAME: they are the two the scrubber pins to (first paint and the
    // Leaflet handoff), so they must never be decimated away.
    const frames = [];
    for (let n = 1; n <= LAST_FRAME; n += rung.step) frames.push(n);
    if (frames.at(-1) !== LAST_FRAME) frames.push(LAST_FRAME);

    let bytes = 0;
    for (const [i, n] of frames.entries()) {
      const name = srcName(n);
      if (!available.has(name)) throw new Error(`Missing source frame: ${name}`);

      // Output is re-indexed 0..N-1 so the runtime never needs to know the
      // decimation step — it just asks for index i.
      const outName = `frame_${String(i).padStart(4, "0")}.webp`;
      const info = await sharp(path.join(SRC_DIR, name))
        .resize({ width: rung.width, withoutEnlargement: true })
        .webp({ quality: rung.quality, ...SHARED })
        .toFile(path.join(dir, outName));
      bytes += info.size;
    }

    grandTotal += bytes;
    manifest.rungs[rung.width] = {
      frameCount: frames.length,
      step: rung.step,
      quality: rung.quality,
      sourceFrames: frames,
      bytes,
    };
    console.log(
      `${String(rung.width).padStart(4)}px  ${String(frames.length).padStart(3)} frames  ` +
        `${(bytes / 1e6).toFixed(2)} MB  (avg ${Math.round(bytes / frames.length / 1024)} KB)`,
    );
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(`total ${(grandTotal / 1e6).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
