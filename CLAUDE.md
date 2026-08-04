# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server (hot reload, LAN-accessible via --host)
npm run build        # tsc + vite build (output: dist/)
npm run lint         # ESLint — zero warnings allowed (--max-warnings 0)
npm run preview      # serve the dist/ build locally
npm run convert:images  # convert source images to .webp via sharp (scripts/convert-images.mjs)
```

No test runner is configured.

Node 24.x is required (pinned in `package.json` `engines` and Vercel config).

## Architecture

### Single-page, no router

The app is one page. Navigation is section-scroll via `react-scroll`; sections have IDs `intro`, `work`, `skills`, `contact`. The Header uses `LinkScroll` with `spy` + `onSetActive` to track the active link, `offset: -70`.

### v3 design — "Command Line" terminal

The site is a dark, monochrome terminal aesthetic (from the Google Stitch mockup in `mockup/`):

- **Palette:** pure black `bg` (#000), `inverse-primary` (#c6c6c6) body text, `inverse-surface` (#303033) borders, `primary-container` (#1b1b1b) recessed surfaces, `on-primary` (#fff) headings.
- **Type:** triple-font strategy — **Hanken Grotesk** (`font-headline`) for headlines, **Inter** (`font-body`) for body, **Geist Mono** (`font-mono`) for all labels/meta. Google Fonts are loaded in `index.html`.
- **Motifs:** `> ` prompt prefixes on section titles, `[BRACKETED]` metadata, mono uppercase labels, a blinking cursor block (`.cursor-block`), and hard 4px offset shadows on card hover (`.term-card`).
- **Sections:** hero (`> SYSTEM READY.` + headline + CTAs), `> ./projects` gallery, `> agentic_stack --tools`, `> sys_info --skills` matrix, terminal footer.
- Design tokens live in `tailwind.config.js` (custom `fontSize` tokens like `headline-xl`, `label-mono`; custom spacing `stack-lg`, `gutter`, etc.). Reusable classes are in `src/index.css` (`.term-card`, `.term-chip`, `.term-section-head`, `.btn-solid`, `.btn-ghost`, `.term-label`).

### Data layer — `src/constants/`

All editable site content lives here and is barrel-exported from `src/constants/index.ts`. To update content, edit only the constants files:

| File | Exports |
|---|---|
| `profile.ts` | `PROFILE` (name, role, bio, email, resumeUrl, copyright), `gmailComposeUrl` |
| `projects.ts` | `PROJECTS` (typed `Project` incl. `tags` for terminal chips) |
| `agentic.ts` | `AGENTIC_TOOLS` (the `agentic_stack --tools` cards) |
| `skills.ts` | `SKILL_GROUPS` (the `sys_info --skills` matrix) |
| `social.ts` | `SOCIAL_LINKS` |
| `navigation.ts` | `NAV_LINKS` |
| `hero.ts` | `HERO` (hero copy) |
| `motion.ts` | shared Framer Motion variants (`staggerContainer`, `fadeInUp`, `fadeInLeft`) |

### Layout shell — `src/layouts/MainLayout.tsx`

Wraps every page: sticky/fixed `Header` → `main.section-container` (max-width 1280px, `pt-[88px]` to clear the fixed header) with page content → `Footer` (`id="contact"`).

### Components

- **`src/components/Header.tsx`** — fixed top nav: `Yusri v3` logo, mono nav links, `Connect` mailto button, `[MENU]` mobile toggle.
- **`src/components/home/Left.tsx` / `Right.tsx`** — hero text column + grayscale avatar box.
- **`src/components/projects/`** — `Projects.tsx` (section header + grid), `ProjectCard.tsx` (terminal archive card: grayscale image that colorizes on hover, `v3.0.{id}` version tag, mono chips from `project.tags`).
- **`src/components/tools/AgenticStack.tsx`** — `> agentic_stack --tools` cards.
- **`src/components/stacks/TeckStack.tsx`** — `> sys_info --skills` matrix.
- **`src/components/ui/OptimizedImg.tsx`** — the only remaining UI primitive: shimmer skeleton until load.

### Styling

Tailwind + `src/index.css`. All custom layout classes (`.layout`, `.section-container`) and terminal helpers (`.term-*`, `.btn-*`, `.cursor-block`) use `@apply`. `.shimmer` is used by `OptimizedImg`.

**Custom breakpoints** (min-width, standard Tailwind semantics; note the custom pixel thresholds):
- `sm`: 321px, `md`: 641px, `lg`: 901px, `xl`: 1201px+

**Custom color tokens** (defined in `tailwind.config.js`): `bg` (#000), `primary` (#000), `on-primary` (#fff), `inverse-primary`, `inverse-surface`, `primary-container`, `secondary-fixed`, `outline`, plus legacy `white-0/1/2/3`, `dark-0/1/2`.

**Section anchors**: `#intro/#work/#skills/#contact` carry `scroll-margin-top: 90px` so native anchor jumps clear the fixed header. Note: do NOT add `scroll-snap-type` or CSS `scroll-behavior: smooth` on `html` — both fight `react-scroll`'s JS animation and cause nav links to land off-target.

**Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables shimmer, the blinking cursor, and card hover transforms.

### Assets

Images must be `.webp`. Source images are converted with `npm run convert:images`. Assets are barrel-exported:
- `src/assets/icons/index.ts`
- `src/assets/images/index.ts`

Import from the barrel, not the file directly.

## Deployment

Deployed to Vercel. Config in `vercel.json`:
- `framework: "vite"`, install via `npm install`, build via `npm run build`
- `/assets/*` gets 1-year immutable cache headers
- Image/font files get 1-day + stale-while-revalidate headers

## Stack decision

The repo intentionally uses **Vite** (not Next.js). A Next.js migration was merged and then reverted — keep all changes within the Vite/SPA architecture.
