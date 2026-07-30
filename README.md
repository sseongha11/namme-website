# Namme — website

Marketing site for Namme — a small, local, friendly Derby based general building
company: brickwork, landscape gardening, extensions, driveways, rendering,
refurbishments, roofing, tiling, bathrooms, painting & decorating and kitchen
fitting.

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
make logs     # tail the dev server log
```

## Where to edit things

Almost all copy lives in `namme-site/src/content/`, separate from the components,
so you can change text without touching layout code.

| File | What it holds |
| --- | --- |
| `content/site.ts` | **Phone, email, address, hours, canonical URL, the 5-stage process, FAQs.** Start here. |
| `content/services.ts` | The 11 trades, with prices, timescales and permission routes |
| `content/projects.ts` | Portfolio case studies |
| `content/areas.ts` | Service areas and their local planning notes |
| `content/guides.ts` | The four cost and planning guides |
| `content/testimonials.ts` | Reviews |
| `content/ar.ts` | All Arabic copy for the `/ar` page |

Anything marked `TODO` in those files is a placeholder waiting for real data.

## Structure

- `/` — English homepage (primary language)
- `/services`, `/services/[slug]` — 11 service pages
- `/projects`, `/projects/[slug]` — portfolio
- `/areas`, `/areas/[slug]` — 12 location pages (the local SEO engine)
- `/guides`, `/guides/[slug]` — research-stage cost and planning content
- `/about`, `/contact`, `/privacy`, `/terms`
- `/ar` — Arabic summary page, right-to-left

50 pages, all statically generated.

## Before this goes live

These are blocking:

1. **Add `RESEND_API_KEY` in Vercel.** The enquiry form posts to
   `src/app/api/enquiry/route.ts`, which emails it to the address in
   `content/site.ts`. Without the key the endpoint returns an error and the form
   tells the customer to ring instead — deliberately, because a form that
   silently discards enquiries is worse than no form. Sign up at resend.com with
   the same Gmail the enquiries go to, create a key, then:

   ```
   vercel env add RESEND_API_KEY production
   ```

   Optional: `ENQUIRY_TO` to send somewhere other than the site email, and
   `ENQUIRY_FROM` if a verified sending domain is ever set up.
2. **Confirm the company registration name** in `content/site.ts` — `legalName`
   is still a guess, and it appears in the footer copyright line.
3. **Replace the projects and testimonials with real ones.** The seven case
   studies and six reviews in there now are realistic but invented, and are
   marked as such. This is the last remaining placeholder content on the site.
4. **Add trust signals only when they are real.** Headline stats, a review
   score and accreditations were all removed rather than left unverified. If
   Namme holds an FMB, TrustMark, Gas Safe or NICEIC registration, add it back
   with a membership number that can be looked up.
5. **Have a native Arabic speaker review `content/ar.ts`.** Arabic that reads
   slightly off does more damage than no Arabic page.
6. **Legal review of `/privacy` and `/terms`.** Both are starting points, not
   advice.
7. **Verify the planning notes in `content/areas.ts`** against each council's
   current local plan. Planning policy moves, and these pages state specifics
   about conservation areas, the Derwent Valley Mills World Heritage Site and
   the Nottingham–Derby Green Belt.

Then: real photographs. See `namme-site/IMAGES.md`.

## Deployments

Pushing to `main` deploys automatically to <https://namme-site.vercel.app>.
Pull requests get their own preview URL. Vercel's Root Directory for this
project is `namme-site`, since the app sits one level below the repo root.

To take the site out of preview mode, set `NEXT_PUBLIC_SITE_STATUS=live` in the
Vercel project's environment variables — but work through the checklist above
first.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Motion, Radix
primitives, Embla carousel, react-hook-form with Zod. Deploys as a static site —
Vercel, Netlify or Cloudflare Pages will all host it.

Note: `npm audit` reports issues in the ESLint and PostCSS toolchains. Those are
build-time dependencies only and don't ship to visitors; fixing them requires a
breaking ESLint major upgrade, so they've been left alone deliberately.
