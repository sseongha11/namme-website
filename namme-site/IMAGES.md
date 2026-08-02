# Images

## Site footage — the clips on the service pages

Real footage from finished jobs now runs on seven of the eleven service pages,
in the strip under the intro. The masters live in `/data` at the repo root; they
are phone recordings that have been through WhatsApp, so they are 480x848 and
that resolution is a ceiling nothing recovers.

`scripts/build-media.mjs` (`make media`, needs `ffmpeg`) cuts each master to a
short clip in `public/media/` and writes a poster frame beside it. It exists to
do three things:

- **Trim.** The masters run 13–63s. Each is cut to a 7–13s window chosen by
  looking through the footage. Total weight drops from 60 MB to 12 MB.
- **Cut people out.** Several windows are positioned specifically to miss
  someone — a reflection in a bathroom mirror, a person walking through shot,
  a face in the glass of an extractor hood. The reasons are recorded next to
  each window in the script; keep them there if you re-cut.
- **Drop the audio.** The clips play muted, so the track is pure weight, and
  phone footage picks up background conversation nobody agreed to publish.

To add a clip: put the master in `/data`, add a window to `CLIPS` in the script,
run `make media`, then add an entry to `src/content/work.ts` tagging the trades
it shows. A service with no footage renders no strip at all, so partial
coverage is fine.

**Do not stretch these full-bleed.** The strip holds them at roughly 300px wide,
where a 480px source is still above retina density and looks sharp. Across a
full section they look like what they are. Held at phone size they read as
evidence from site, which is the whole point of using them.

Still uncovered: brickwork, roofing, driveways and landscape gardening — all
four outdoor trades. Those are the footage worth capturing next.

## What's here now

Every image on the site is a generated SVG illustration in `public/images/`,
produced by `scripts/generate-images.mjs`. Regenerate them any time with:

```
make images
```

These are **placeholders, and deliberately illustrations rather than stock
photography.** Research on builder websites is consistent on this point: generic
stock photos of other people's houses actively damage credibility, because
visitors recognise them. An obvious, well-made illustration reads as "photography
pending" instead of "pretending".

## Replacing them with real photographs

This is the single highest-value thing you can do to the site. Over half of
homeowners rule out builders whose sites show no real project evidence.

### Priority order

1. **Project photos** — the portfolio does more work than everything else combined
2. **Hero image** — one strong photo of a finished job
3. **Service images** — one per trade (brickwork, driveways, roofing, rendering …)
4. **About page** — the team, on site

### How to swap one in

Drop the photo into `public/images/` using the **same filename** as the SVG it
replaces, with a `.jpg` or `.webp` extension, then update the `src` in the
component. For example, to replace the hero:

```
public/images/hero.jpg          ← add this
src/components/hero.tsx         ← change src="/images/hero.svg" to "/images/hero.jpg"
```

### Project photographs — no code change needed

Projects are the exception: drop the file into `public/images/` under any name,
then add it to that project's `photos` array in `src/content/projects.ts`:

```ts
photos: [
  {
    src: "/images/loughborough-first-floor-after.jpg",
    alt: "Finished first floor landing with new flooring",
    stage: "after",
  },
  {
    src: "/images/loughborough-first-floor-during.jpg",
    alt: "First floor mid-job, floor up and walls prepared",
    stage: "during",
  },
],
```

Every place that project appears — the homepage, the projects index, the case
study, service and area pages — picks the photograph up. Leave `photos` empty
and the generated illustration renders instead, so a half-photographed
portfolio still looks deliberate.

Write the `alt` text for the photograph rather than reusing the illustration's:
it is what a screen reader announces, and it is read by search engines.

If you would rather not touch the content file, the illustration filenames are:

```
public/images/project-<slug>-after.svg     ← completed
public/images/project-<slug>-during.svg    ← mid-job
```

where `<slug>` matches the project's `slug` in `src/content/projects.ts`.

### Photograph the build, not just the result

**Build-in-progress photos convert better than finished shots.** A finished
kitchen could have been photographed anywhere; scaffolding, steels going in and a
half-built wall prove the work is yours. The project pages give the "during"
photo equal visual weight to the "after" for exactly this reason.

Worth capturing on every job:

- The property before anything starts, from the street and from the garden
- Groundworks and foundations
- Steels being craned or carried in and fixed
- The structure at first-fix, before plastering hides everything
- Scaffolding up, with the team working
- The finished space, ideally in daylight, wide angle, tidied

### Practical notes

- Shoot landscape. The layout expects 4:3 and 16:10 crops.
- Use a phone in good daylight rather than flash. Modern phone cameras are fine.
- Avoid wide-angle distortion on interiors — step back rather than zoom out.
- Get the client's written permission before publishing photos of their home.
- Aim for at least 2000px on the long edge so the images stay sharp on retina
  screens.

Once real photos exist, `scripts/generate-images.mjs` and the SVGs it produces
can be deleted entirely.
