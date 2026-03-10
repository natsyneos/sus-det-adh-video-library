# Dev Handoff — Suspect & Detect ADH1 Video Library

## What This Is

A single-screen, iPad-optimized web app that serves as a video library kiosk for a pharmaceutical sales aid. It was originally scaffolded from a Figma Make export and then built out via AI-assisted ("vibe-coded") development. The app is intentionally minimal — two clickable video cards that open a fullscreen Wistia video player — but it needs to be cleaned up, production-hardened, and potentially extended.

**Client/Brand:** BridgeBio Pharma — Suspect & Detect ADH1 campaign
**Target device:** iPad (1366×1024 display, landscape orientation)
**Deployment context:** Sales rep kiosk / leave-behind — likely run as a browser in kiosk mode, not on the open web

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | React | 18.3.1 |
| Build tool | Vite | 6.3.5 |
| Language | TypeScript | (implicit via Vite/React) |
| Styling | Tailwind CSS v4 + inline styles | 4.1.12 |
| Package manager | npm (or pnpm — pnpm overrides present in package.json) |
| Video hosting | Wistia | — |
| Font | Plus Jakarta Sans (Google Fonts) | — |

The `package.json` has pnpm overrides configured, but the README says `npm i`. Either works. Confirm with the team and standardize on one.

---

## Project Structure

```
sus-det-video-library/
├── src/
│   ├── main.tsx                  # React entry point — mounts App into #root
│   ├── app/
│   │   ├── App.tsx               # THE entire application — all logic lives here
│   │   └── components/
│   │       ├── ui/               # shadcn/ui component library (auto-generated)
│   │       │                     # Most of these are UNUSED — see cleanup notes
│   │       └── figma/
│   │           └── ImageWithFallback.tsx   # Figma Make helper — likely unused
│   └── styles/
│       ├── index.css             # Imports the three below
│       ├── fonts.css             # Google Fonts import (Plus Jakarta Sans)
│       ├── tailwind.css          # @import "tailwindcss"
│       └── theme.css             # CSS custom properties / design tokens
├── assets/
│   └── iPad-Background.png      # Full-bleed background image
├── guidelines/
│   └── Guidelines.md            # Figma Make AI guidelines file — empty/unused
├── vite.config.ts               # Vite config with React + Tailwind plugins, @ alias
├── package.json
├── postcss.config.mjs
└── README.md                    # Minimal Figma Make default — not useful
```

---

## How the App Works

Everything lives in `src/app/App.tsx`. There is no routing, no state management library, no backend.

### Layout

The app renders a fixed 1366×1024px canvas centered on a black `100vw × 100vh` background. This pixel-perfect sizing is intentional — it matches the iPad display and was designed to look correct in browser kiosk mode at that exact resolution.

Inside the canvas:
1. **Background** — `iPad-Background.png` fills the canvas with a `22% black overlay` on top
2. **Headline** — "SUSPECT & DETECT ADH1" (with "Video Library" subtitle)
3. **Two video cards** — side by side, each ~45% wide
4. **Legal footer** — abbreviation definition + copyright line

### Video Cards

Each card:
- Displays a Wistia thumbnail image (hardcoded URL — see Known Issues)
- Has a CSS-triangle play button centered on the thumbnail
- Has a title and one-line description
- On click, sets `activeVideo` state to a Wistia video ID string

### Video Playback

When `activeVideo` is set, a fullscreen modal overlay renders inside the iPad canvas. It embeds the Wistia video via `<iframe>` with `autoPlay=1`. A close button (top-right ×) and clicking the backdrop both dismiss it by setting `activeVideo` to `null`.

Wistia video IDs are defined at the top of App.tsx:

```ts
const VIDEOS = {
  mod: '1sdm5ev81y',      // Mechanism of Disease
  jessica: 'oh4fj045uf',  // Jessica's Story
};
```

**To add a new video:** add an entry to `VIDEOS`, create a new card in the JSX following the same pattern as the existing two.

---

## Design Tokens / Brand Colors

These are not in Tailwind or theme.css — they are hardcoded inline in App.tsx. Keep them consistent if you refactor:

| Token | Value | Usage |
|---|---|---|
| Brand gold / accent | `#FFC359` | Play button background, headline accent text |
| Card background | `#252528` | Default card bg |
| Card background (hover) | `#2a2a2e` | Hovered card bg |
| Card border | `#3a3a3e` | Default card border |
| Card border (hover) | `#5a5a5e` | Hovered card border |
| Subtitle text | `#B5BEBE` | "Video Library" subtitle |
| Body text muted | `rgba(255,255,255,0.65)` | Card description text |
| Footer text | `rgba(255,255,255,0.5)` | Legal footer |
| Deep navy | `#0a1423` | Play button triangle fill |
| Canvas bg | `#000000` | Outer page background |
| Overlay | `rgba(0,0,0,0.22)` | Darkens the iPad background image |
| Modal bg | `rgba(0,0,0,0.92)` | Video modal backdrop |

Font: **Plus Jakarta Sans** — loaded from Google Fonts. Weights used: 400 (regular), 700 (bold). The font-family is set inline as `"'Plus Jakarta Sans', sans-serif"` on the root div. If internet access is not guaranteed (kiosk environment), self-host this font.

---

## Known Issues & Cleanup Required

This was built fast with AI assistance. Below is an honest list of things that need attention before this is considered production-ready.

### High Priority

**1. Thumbnail images are hardcoded Wistia delivery URLs**
The thumbnail `src` attributes point to specific Wistia image delivery hashes:
```
https://embed-ssl.wistia.com/deliveries/a8ffc07c5daf6b5297554348618e6c30.jpg...
https://embed-ssl.wistia.com/deliveries/256781751faf6405fa1467b16a1d6274.jpg...
```
These are fragile — Wistia can regenerate these URLs. The right approach is either:
- Use the Wistia oEmbed/data API to fetch thumbnail URLs dynamically, or
- Download the thumbnails and serve them as local assets

**2. All styling is inline — should be refactored to Tailwind or CSS modules**
The entire `App.tsx` uses inline `style={{}}` objects. This is difficult to maintain, makes responsive design awkward, and means the brand color tokens are scattered and undocumented. Refactor to Tailwind utility classes using the existing brand colors (which should be added to the Tailwind config or theme.css as custom tokens).

**3. The canvas is fixed at 1366×1024px — not responsive**
This is intentional for the iPad kiosk use case, but if the app ever needs to run on other screen sizes (e.g. a laptop demo), it will break. At minimum, add a CSS scale transform to make the fixed canvas fit different viewports, or document clearly that 1366×1024 is the only supported resolution.

**4. Self-host the font**
The app imports Plus Jakarta Sans from Google Fonts. In a kiosk environment (no guaranteed internet), this will fail silently and fall back to the system sans-serif. Download the font files and serve them from `src/assets/fonts/`.

### Medium Priority

**5. Massive unused dependency footprint**
`package.json` includes the full shadcn/ui component library, MUI, React Hook Form, Recharts, React DnD, and more — virtually none of which is used in the actual app. This inflates the bundle significantly. Audit and remove unused packages. At minimum:
- Remove: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `recharts`, `react-hook-form`, `react-dnd`, `react-dnd-html5-backend`, `react-day-picker`, `react-slick`, `react-responsive-masonry`, `input-otp`, `cmdk`, `vaul`, `sonner`, `next-themes`, `embla-carousel-react`, `date-fns`, `react-popper`, `@popperjs/core`
- Probably keep: `lucide-react` (icons), `motion` (if animation is planned), `clsx`, `tailwind-merge`, and any Radix primitives actually used

**6. The `src/app/components/ui/` directory is entirely unused scaffolding**
This is a full shadcn/ui component library that was auto-generated by Figma Make. Since none of these components are used in the actual app, this directory can be deleted, or left as a component library if future development will use shadcn patterns.

**7. `ImageWithFallback.tsx` and `guidelines/Guidelines.md` are unused**
Both are Figma Make scaffolding artifacts. Safe to delete.

**8. `package.json` name is `@figma/my-make-file`**
This should be renamed to something meaningful (e.g. `sus-det-video-library`) before any deployment or package management.

### Low Priority

**9. Play button uses CSS border triangles**
The play button chevron is built with CSS border tricks (`borderLeft`, `borderTop`, `borderBottom`). This works but is fragile and non-semantic. Replace with an SVG play icon (Lucide's `Play` component is already installed) for better maintainability.

**10. Hover effects are split between React state and inline `onMouseEnter`/`onMouseLeave`**
The card hover uses React state (`hoveredCard`), but the play button hover uses direct DOM manipulation via `e.currentTarget.style`. These should be unified — use CSS/Tailwind hover classes or React state consistently.

**11. No accessibility**
- No `aria-label` on the play button or close button
- No keyboard navigation (can't tab to a card and press Enter)
- For a kiosk this may be acceptable, but flag for the client if there are ADA requirements

---

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server (usually http://localhost:5173)
npm run dev

# Build for production
npm run build
```

The production build outputs to `dist/`. For kiosk deployment, serve this as a static site — just point the kiosk browser at `index.html`.

---

## Deployment Notes

- **Target:** iPad in browser kiosk mode (landscape, 1366×1024)
- **Recommended browser:** Safari (iPadOS) or Chrome in kiosk mode
- **Static hosting:** No server required — the build output is entirely static
- **Internet required at runtime** for: Google Fonts, Wistia video embed, Wistia thumbnails. If the kiosk has no internet access, all three must be self-hosted/pre-loaded.

---

## Wistia Integration

Videos are embedded via Wistia's standard iframe embed:

```
https://fast.wistia.net/embed/iframe/{VIDEO_ID}?autoPlay=1&fitStrategy=fill&fullscreenButton=true
```

- `autoPlay=1` — video starts immediately when modal opens
- `fitStrategy=fill` — video fills the iframe container
- `fullscreenButton=true` — Wistia's native fullscreen button is available within the player

The modal itself is already fullscreen within the iPad canvas, so the user effectively gets a fullscreen experience without needing the Wistia fullscreen button. You may want to set `fullscreenButton=false` to keep the UI clean.

**To update or replace a video:** Change the corresponding ID in the `VIDEOS` constant at the top of `App.tsx`. Make sure the Wistia account hosting the video allows embedding from whatever domain this is served from (check Wistia embed settings / domain restrictions).

---

## If You're Adding More Videos

The current layout is two cards side by side at 45% width each, with a 30px gap. Adding a third card will require a layout redesign — the cards will need to be smaller or arranged differently to fit within the 1366px canvas width. Consider switching to a 3-column grid with smaller cards, or a scrollable carousel.
