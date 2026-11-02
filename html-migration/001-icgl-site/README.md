# ICGL Website

A multi-page React + Vite + Tailwind CSS site for Impact Credit Guarantee
Limited (ICGL), structured after guarantee.green with ICGL's own real
content (pulled from icgl-website.netlify.app), in an #A9D046 lime accent —
now with scroll animations and motion polish inspired by guarantee.green.

## Setup

```bash
npm ci             # reproducible install from package-lock.json
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Use a maintained Node.js LTS version supported by Vite 5.

## Motion / animation

- `src/components/motion/Reveal.jsx` — fades + slides an element in once it
  scrolls into view. Wrap any section/heading in `<Reveal>...</Reveal>`.
- `src/components/motion/StaggerGroup.jsx` — wrap a grid of cards in
  `<StaggerGroup>`, each card in `<StaggerItem>`, and they animate in one
  after another as the group enters the viewport.
- `src/components/motion/Counter.jsx` — animates a number counting up once
  it's in view (used for the hero stats on Home).
- Navbar (`src/components/layout/Navbar.jsx`) shrinks into a pill shape
  with a shadow once you scroll past the top, mirroring guarantee.green's
  sticky nav.
- Hero has softly drifting blurred shapes in the background
  (`animate-drift-a/b/c` in `src/index.css`).
- The PFI logo strip on Home scrolls continuously (`animate-marquee`).
- Buttons/cards lift slightly and arrows nudge on hover across the site.
- The FAQ accordion (`src/pages/resources/Faqs.jsx`) animates open/closed
  with `framer-motion`'s `AnimatePresence`.

Note: guarantee.green (built on Framer) also has bespoke scroll-jacking
effects — an SVG "tree" that draws in as you scroll, and stacked cards that
pin and slide over each other. Those are very specific to Framer's engine;
I built close equivalents (staggered reveals, animated counters, a morphing
nav) rather than a pixel-for-pixel port, since hand-rolling scroll-jacking
tends to be fragile across browsers/screen sizes.

## Pages

- `/` Home
- `/about` About (identity, board, management)
- `/services` Services
- `/impact` Impact dashboard
- `/eligibility` Eligibility criteria
- `/career` Careers
- `/contact` Contact
- `/resources/news`, `/faqs`, `/ratings`, `/publications`, `/policies`,
  `/privacy-policy`, `/whistleblowing`

## Structure

- `src/App.jsx` — routes (React Router)
- `src/components/layout/` — Navbar, Footer, Layout (page wrapper)
- `src/components/motion/` — Reveal, StaggerGroup, Counter
- `src/components/PageHero.jsx` — shared page banner/breadcrumb
- `src/pages/` — one file per page, `src/pages/resources/` for the Resources dropdown
- `src/data/content.js` — all copy/data in one place

Note: `src/components/*.jsx` at the top level (Hero, Navbar, Footer, Cta,
Faq, etc. — not under `layout/` or `motion/`) are leftover from the
original single-page version and are no longer imported anywhere. Safe to
ignore or delete later.

## System documentation

The documentation set in [`docs/`](./docs/README.md) describes the current
architecture, quality assurance approach, UAT scenarios, observed test
evidence, and operational/release procedures. Browser screenshots used as
evidence are in [`docs/images/`](./docs/images/).

## Before you publish

- Contact form is front-end only (no backend wired up yet) — it currently
  shows a success state on submit. The complaints form opens a pre-filled
  email in the visitor's email application; delivery depends on the visitor
  sending that email.
- Publication cards currently display a Download label without a wired
  download target. Confirm and attach the publication files before relying
  on the action.
- Cookie preferences are stored in local storage. Optional analytics and
  marketing preferences are not connected to tracking scripts in this
  repository; connect and validate consent gating before adding such scripts.
- The Whistleblowing policy card currently points to the Anti-Bribery &
  Corruption PDF. Confirm this shared mapping with the policy owner, or
  replace it with the approved Whistleblowing PDF.
- Whistleblowing hotline/email numbers and the Deloitte/CBN channels were
  copied verbatim from the reference site; double-check they're still
  correct before going live.
- Google Maps embed on the Contact page uses the same coordinates as the
  reference site — verify the pin is accurate.
