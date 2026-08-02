/**
 * Turns the raw site-visit footage in /data into web-ready clips.
 *
 * The source videos are 480x848 phone recordings that have been through
 * WhatsApp — that resolution is a hard ceiling and no amount of encoding
 * recovers it. So this script does the two things that genuinely help:
 *
 *  1. TRIMS. The originals run 13–63s; nobody watches that. Each clip is cut
 *     to the window listed below, chosen by looking through the footage frame
 *     by frame. The windows also do real work: they cut past the mirror selfie
 *     in bathroom-1 and past the person walking through living-room-1.
 *  2. DROPS THE AUDIO. The clips play muted and looped, so the audio track is
 *     pure weight — and phone footage picks up background conversation nobody
 *     consented to publish.
 *
 * Re-encoding beyond the trim would only add a second generation of loss, so
 * the quality target is deliberately high (CRF 21) — the file is small because
 * it is short, not because it has been squeezed.
 *
 * Run with: make media
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(root, "..", "data");
const VIDEO_OUT = join(root, "public", "media");
const PHOTO_OUT = join(root, "public", "images", "work");

/**
 * start/duration in seconds, picked by eye from the source footage.
 * `note` records why the window is where it is, so a re-cut doesn't
 * accidentally reintroduce something the window exists to avoid.
 */
const CLIPS = [
  { file: "kitchen-4", start: 0, duration: 13, note: "island, ovens and the marble floor — the strongest kitchen footage" },
  { file: "kitchen-1", start: 20, duration: 10, note: "ends before the extractor glass starts reflecting whoever is filming" },
  { file: "bathroom-2", start: 17, duration: 13, note: "bath with the lit niches, through to the basin" },
  { file: "bathroom-1", start: 9.5, duration: 12, note: "starts after the mirror shot, which catches the camera and whoever is holding it" },
  { file: "living-room-3", start: 0.5, duration: 11.5, note: "marble media wall, near enough the whole clip" },
  { file: "living-room-1", start: 7, duration: 6.7, note: "starts after someone walks through the shot" },
  { file: "room-1", start: 33, duration: 11, note: "starts past the bags on the floor; LED coving, then the finished bedroom" },
  { file: "ground-floor-1", start: 45, duration: 11, note: "staircase and chandelier — skips the light-switch close-up, stops before the hallway clutter" },
];

/**
 * The stills. Resized but not cropped: the strip crops them to portrait with
 * object-cover, and cropping twice loses framing the photographer chose.
 */
const PHOTOS = ["extension-1", "living-room-2", "living-room-5"];

function run(bin, args) {
  execFileSync(bin, args, { stdio: ["ignore", "ignore", "pipe"] });
}

/**
 * WebP comes from sharp, not ffmpeg: the ffmpeg most people have installed
 * (Homebrew's included) is built without libwebp, and sharp is already here as
 * a Next.js dependency. ffmpeg still pulls the frame — it is the one that can
 * seek into an mp4 — and hands over a PNG.
 */
async function frameToWebp(src, seconds, dest) {
  const tmp = `${dest}.tmp.png`;
  run("ffmpeg", ["-v", "error", "-y", "-ss", String(seconds), "-i", src, "-frames:v", "1", tmp]);
  await sharp(tmp).webp({ quality: 80 }).toFile(dest);
  rmSync(tmp, { force: true });
}

async function main() {
  if (!existsSync(DATA)) {
    console.error(`No source footage at ${DATA} — nothing to build.`);
    process.exit(1);
  }
  mkdirSync(VIDEO_OUT, { recursive: true });
  mkdirSync(PHOTO_OUT, { recursive: true });

  for (const { file, start, duration } of CLIPS) {
    const src = join(DATA, `${file}.mp4`);
    if (!existsSync(src)) {
      console.warn(`  skip ${file} — not in /data`);
      continue;
    }

    // -ss before -i seeks fast; -ss after would decode everything up to it.
    run("ffmpeg", [
      "-v", "error", "-y",
      "-ss", String(start), "-i", src, "-t", String(duration),
      "-an",                              // no audio — see the header
      "-c:v", "libx264", "-crf", "21", "-preset", "slow",
      "-pix_fmt", "yuv420p",              // Safari will not decode 4:4:4
      "-movflags", "+faststart",          // metadata first, so it starts on the first bytes
      join(VIDEO_OUT, `${file}.mp4`),
    ]);

    // The poster is the clip's own first frame, so play() causes no visible jump.
    await frameToWebp(src, start, join(VIDEO_OUT, `${file}.webp`));

    console.log(`  ${file}.mp4  ${duration}s`);
  }

  for (const name of PHOTOS) {
    const src = join(DATA, `${name}.jpeg`);
    if (!existsSync(src)) {
      console.warn(`  skip ${name} — not in /data`);
      continue;
    }
    // Long edge to 1400px. Retina-sharp at any size the strip renders, and
    // still honest to the 1536/2000px originals.
    await sharp(src)
      .rotate() // honour the EXIF orientation phones write instead of rotating pixels
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(PHOTO_OUT, `${name}.webp`));
    console.log(`  work/${name}.webp`);
  }
}

await main();
