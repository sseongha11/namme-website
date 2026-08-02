# Naeem — website

Marketing site for Naeem — a small, local, friendly Derby based general building
company: brickwork, landscape gardening, extensions, driveways, rendering,
refurbishments, roofing, tiling, bathrooms, painting & decorating, kitchen
fitting and commercial fit-out.

## Running it

```
make          # list every command
make up       # start the site and open it in your browser
make down     # stop it
make status   # is it running?
```

The site runs at <http://localhost:3000>. Use `make up PORT=4000` if 3000 is busy.

Other useful commands:

```
make build    # production build
make check    # type-check and lint
make images   # regenerate the placeholder illustrations
make media    # cut the footage in data/ into web-ready clips (needs ffmpeg)
make logs     # tail the dev server log
```

## Where to edit things

Almost all copy lives in `naeem-building/src/content/`, separate from the components,
so you can change text without touching layout code.

| File | What it holds |
| --- | --- |
| `content/site.ts` | **Phone, email, address, hours, canonical URL, the 5-stage process, FAQs.** Start here. |
| `content/services.ts` | The 12 trades, with prices, timescales and permission routes |
| `content/projects.ts` | Portfolio case studies |
| `content/areas.ts` | Service areas and their local planning notes |
| `content/guides.ts` | The four cost and planning guides |
| `content/testimonials.ts` | Reviews |
| `content/work.ts` | Site footage, tagged by trade — feeds the strips on the service pages |
| `content/ar.ts` | All Arabic copy for the `/ar` page |

Anything marked `TODO` in those files is a placeholder waiting for real data.

## Structure

- `/` — English homepage (primary language)
- `/services`, `/services/[slug]` — 12 service pages
- `/projects`, `/projects/[slug]` — portfolio
- `/areas`, `/areas/[slug]` — 12 location pages (the local SEO engine)
- `/guides`, `/guides/[slug]` — research-stage cost and planning content
- `/about`, `/contact`, `/privacy`, `/terms`
- `/ar` — Arabic summary page, right-to-left

44 pages, all statically generated.

## The site is live

`NEXT_PUBLIC_SITE_STATUS=live` is set in Vercel, so the preview banner is gone
and the pages are indexable. There is no enquiry form: contact is WhatsApp,
phone and email, which cannot silently fail the way an unwired form did.

**First, before anything else: get the clients' permission for the site
footage.** Eight service pages now show real clips from finished jobs (see
`content/work.ts` and IMAGES.md). Publishing the inside of somebody's home needs
their agreement, and it is worth having in writing. The clips were cut to remove
the people who appeared in them, which is not the same thing. The barber shop on
`/services/commercial-fit-out` is a trading business rather than a home, which
usually makes the conversation easier — but the shop is identifiable, so it
still needs asking. None of the footage is tied to a named job or date either,
so it cannot yet link back to a case study.

Then, roughly in order:

1. **Photographs of the Loughborough job.** The biggest single gap — the case
   study currently shows an illustration. Drop the files in and add them to
   `photos` in `content/projects.ts`; no code change needed. See IMAGES.md.
2. **Add more real projects and reviews.** One of each is enough to be honest;
   more is better. Never invent one — see the rules at the top of
   `content/projects.ts` and `content/testimonials.ts`.
3. **Add trust signals only when they are real.** Headline stats, a review
   score and accreditations were all removed rather than left unverified. If
   Naeem holds an FMB, TrustMark, Gas Safe or NICEIC registration, add it back
   with a membership number that can be looked up.
4. **Have a native Arabic speaker review `content/ar.ts`.** Arabic that reads
   slightly off does more damage than no Arabic page. `/ar` and the Arabic
   business card now both cover commercial fit-out — four groups, twelve
   trades, in step with the English — but that wording is the newest and least
   tested part of the file, so it is where a reviewer should start. The terms
   used are `تجهيز المحلات التجارية` in running lists and `الأعمال التجارية`
   as the group heading; they appear in `content/ar.ts` and in
   `docs/templates/build.mjs`, and want changing together.
5. **Legal review of `/privacy` and `/terms`.** Both are starting points, not
   advice.
6. **Verify the planning notes in `content/areas.ts`** against each council's
   current local plan. Planning policy moves, and these pages state specifics
   about conservation areas, the Derwent Valley Mills World Heritage Site and
   the Nottingham–Derby Green Belt.

## Deployments

Pushing to `main` deploys automatically to <https://naeem-building.vercel.app>.
Pull requests get their own preview URL. Vercel's Root Directory for this
project is `naeem-building`, since the app sits one level below the repo root.

To take the site out of preview mode, set `NEXT_PUBLIC_SITE_STATUS=live` in the
Vercel project's environment variables — but work through the checklist above
first.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Motion, Radix
primitives, Embla carousel. No form libraries — contact is WhatsApp, phone and
email. Deploys as a static site — Vercel, Netlify or Cloudflare Pages will all
host it.

Note: `npm audit` reports issues in the ESLint and PostCSS toolchains. Those are
build-time dependencies only and don't ship to visitors; fixing them requires a
breaking ESLint major upgrade, so they've been left alone deliberately.
