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

The app is one page. Navigation is section-scroll via `react-scroll`; sections have IDs `section1`, `section2`, `section3`. The Header uses `LinkScroll` (not `<Link>`) to scroll to these IDs with `offset: -70`.

### Data layer — `src/constants/`

All editable site content lives here and is barrel-exported from `src/constants/index.ts`. To update content, edit only the constants files:

| File | Exports |
|---|---|
| `profile.ts` | `PROFILE` (name, role, bio, email, resumeUrl), `gmailComposeUrl` |
| `projects.ts` | `PROJECTS` (project card data + typed `Project` interface) |
| `techStack.ts` | `TECH_STACK` |
| `social.ts` | `SOCIAL_LINKS` |
| `navigation.ts` | `NAV_LINKS` |
| `hero.ts` | hero section copy |
| `motion.ts` | shared Framer Motion variants (`staggerContainer`, `fadeInUp`, `fadeInLeft`, `popIn`, `heroEntrance`, `floatKeyframes`) |

### Layout shell — `src/layouts/MainLayout.tsx`

Wraps every page. Renders in order: `AuroraBackground` (fixed behind everything) → `CursorGlow` (fixed spotlight) → sticky `Header` → `section-container` div with page content → `Footer`.

### UI primitives — `src/components/ui/`

Generic interactive building blocks that can be composed anywhere:

- **`TiltCard`** — Framer Motion 3D tilt-on-hover. Caches `getBoundingClientRect` on `mouseenter` (not per `mousemove`) to avoid layout thrashing. Also sets `--mx`/`--my` CSS vars for `.card-glow` to follow the cursor.
- **`GlassCard`** — glassmorphism container; relies on `.glass-card` + `.card-glow` CSS classes.
- **`MagneticButton`** — owns `transform` on its child; do not add CSS `transform` hover lifts to elements inside it (this is why `.contact-btn:hover` has no `translateY` while `.resume-btn:hover` does).
- **`OptimizedImg`** — shimmer skeleton until image loads.
- **`AuroraBackground`** / **`CursorGlow`** — pure CSS animation components; no state.

### Styling

Tailwind + `src/index.css`. Custom layout utility classes (`.layout`, `.home`, `.home-sub-containers`, `.section-container`, etc.) and all animation keyframes live in `index.css` using `@apply`.

**Custom breakpoints** (not standard Tailwind defaults):
- `xs`: 0–320px, `sm`: 321–640px, `md`: 641–900px, `lg`: 901–1200px, `xl`: 1201px+

**Custom color tokens** (defined in `tailwind.config.js`):
- `bg` (#1E162D) — page background
- `primary` (#5D5FEF) — accent/brand purple
- `white-0/1/2/3` — light text scale
- `dark-0/1/2` — dark text scale

**Animated gradient buttons**: `.btn-gradient`, `.resume-btn`, `.contact-btn` all share the same CSS gradient-shift + sheen-sweep animation. They're defined together in `index.css`; add new animated buttons by extending that selector group.

**Section scroll-snap**: `y proximity` snap is enabled on `lg+` screens via a `@media (min-width: 901px)` rule. `#section1/2/3` have `scroll-snap-align: start` and `scroll-margin-top: 90px`.

**Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables aurora blobs, marquee, shimmer, and button transitions.

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
