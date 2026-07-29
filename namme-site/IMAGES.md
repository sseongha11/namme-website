# Images

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
2. **Hero image** — one strong photo of a completed extension
3. **Service images** — one per category (extensions, lofts, renovations)
4. **About page** — the team, on site

### How to swap one in

Drop the photo into `public/images/` using the **same filename** as the SVG it
replaces, with a `.jpg` or `.webp` extension, then update the `src` in the
component. For example, to replace the hero:

```
public/images/hero.jpg          ← add this
src/components/hero.tsx         ← change src="/images/hero.svg" to "/images/hero.jpg"
```

Project images follow a fixed naming pattern:

```
public/images/project-<slug>-after.svg     ← completed
public/images/project-<slug>-during.svg    ← mid-build
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
