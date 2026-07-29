# Namme — website

Marketing site for Namme, builders in Derby specialising in extensions, loft
conversions and renovations.

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
| `content/site.ts` | **Phone, email, address, hours, stats, accreditations, the 5-stage process, FAQs.** Start here. |
| `content/services.ts` | The 10 services, with prices, timescales, planning routes |
| `content/projects.ts` | Portfolio case studies |
| `content/areas.ts` | Service areas and their local planning notes |
| `content/guides.ts` | The four cost and planning guides |
| `content/testimonials.ts` | Reviews |
| `content/ar.ts` | All Arabic copy for the `/ar` page |

Anything marked `TODO` in those files is a placeholder waiting for real data.

## Structure

- `/` — English homepage (primary language)
- `/services`, `/services/[slug]` — 10 service pages
- `/projects`, `/projects/[slug]` — portfolio
- `/areas`, `/areas/[slug]` — 9 location pages (the local SEO engine)
- `/guides`, `/guides/[slug]` — research-stage cost and planning content
- `/about`, `/contact`, `/privacy`, `/terms`
- `/ar` — Arabic summary page, right-to-left

45 pages, all statically generated.

## Before this goes live

These are blocking:

1. **Wire up the enquiry form.** `src/app/api/enquiry/route.ts` currently
   validates and logs but sends nothing. Connect it to email (Resend or
   Postmark) or a CRM. A form that silently discards enquiries is worse than no
   form at all.
2. **Replace the placeholder contact details** — email, address, and the company
   registration name in `content/site.ts`.
3. **Check the headline numbers are true.** `stats` and `rating` in
   `content/site.ts` currently say 15+ years, 350+ projects, 4.9 from 120+
   reviews. If those aren't accurate, change them — specific and true beats
   impressive and false, and a wrong review count is checkable.
4. **Confirm the accreditations.** The footer lists FMB, TrustMark, Gas Safe,
   NICEIC, CSCS and a 5-year warranty. Remove any Namme doesn't actually hold.
5. **Replace the projects and testimonials with real ones.** The six in there
   now are realistic but invented, and are marked as such.
6. **Have a native Arabic speaker review `content/ar.ts`.** Arabic that reads
   slightly off does more damage than no Arabic page.
7. **Legal review of `/privacy` and `/terms`.** Both are starting points, not
   advice.
8. **Verify the planning notes in `content/areas.ts`** against each council's
   current local plan. Planning policy moves, and these pages state specifics
   about conservation areas, the Derwent Valley Mills World Heritage Site and
   the Nottingham–Derby Green Belt.

Then: real photographs. See `namme-site/IMAGES.md`.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Motion, Radix
primitives, Embla carousel, react-hook-form with Zod. Deploys as a static site —
Vercel, Netlify or Cloudflare Pages will all host it.

Note: `npm audit` reports issues in the ESLint and PostCSS toolchains. Those are
build-time dependencies only and don't ship to visitors; fixing them requires a
breaking ESLint major upgrade, so they've been left alone deliberately.
