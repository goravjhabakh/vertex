# Implementation Prompt: Vertex Home Page

## 1. Goal

Implement the **Vertex Home Page** (`app/page.tsx`) reproducing `@design/vertex-home.png` pixel-accurately on desktop and responsively down to mobile, while keeping the Design System showcase accessible at `/design-system`.

## 2. Skills & Documentation Read

- `AGENTS.md` (project rules, workflow, architecture boundaries, UI fidelity requirements, checks)
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md` — Sanity schema/data shape alignment for courses)
- `node_modules/next/dist/docs/01-app/01-getting-started/01-installation.md` (Next.js 16 App Router conventions, TypeScript, Biome)
- `prompts/design-system.md` (existing design system tokens and component primitives)

## 3. Code Inspected

- `package.json`: Next.js `16.4.2`, React `19.3.0`, Tailwind CSS v4, Biome `2.4.2`.
- `app/layout.tsx`: Root layout loading `Playfair_Display` and `Inter` via `next/font/google`.
- `app/globals.css`: Theme tokens (`--color-primary-*`, `--color-neutral-*`, `--font-display`, `--font-sans`, shadows, radii, and type scale classes).
- `app/page.tsx`: Currently renders `<DesignSystemShowcase />` as a placeholder until the home/catalog page is built.
- `app/design-system/page.tsx`: Dedicated route serving `<DesignSystemShowcase />`.
- `components/ui/icons.tsx`, `components/ui/navigation.tsx`, `components/ui/input.tsx`, `components/ui/button.tsx`, `components/ui/cards.tsx`, `components/ui/badge.tsx`: Existing UI primitives.
- `design/vertex-home.png`: Desktop reference image for the Vertex Home Page.

## 4. Decisions & Assumptions

- **Font Weights**: Update `Playfair_Display` in `app/layout.tsx` to load weights `["400", "500", "600", "700"]` so the serif display headline (`Search your learning in plain English.`), section heading (`All Courses`), and course card titles (`Next.js for Production`, `Docker Essentials`, `TypeScript Deep Dive`) render with the exact stroke weight from `@design/vertex-home.png`.
- **Page Frame & Background**:
  - Warm off-white background (`#FCFBF9`) with a centered main container (`max-w-[1120px]`) flanked on left and right (`hidden md:block`) by vertical borders (`#EFECE6`) and a subtle 45-degree warm diagonal hatched pattern strip matching the reference frame.
- **Top Navigation Bar**:
  - Full-width header inside the main container with bottom border (`#EFECE6`).
  - Left: `VertexLogo` (`Vertex`) + navigation links `Courses` (`/`) and `My Learning` (`/my-learning`) in `#0F172A`.
  - Right: Presentational notification bell button (`BellIcon`) and circular user avatar (`40x40px`) matching the reference portrait.
- **Hero Section**:
  - Subtle warm radial glow and faint grid/dot backdrop, separated from the courses section by a full-width horizontal border (`#EFECE6`).
  - Pill badge: `INTELLIGENT LEARNING` in `#E86A33` on a warm peach pill (`bg-[#FDF3EC] border border-[#F9DEC9]`).
  - Headline: Two-line `Playfair Display` heading `Search your learning` / `in plain English.` (`text-[44px] sm:text-[56px] md:text-[64px] leading-[1.12] tracking-[-0.02em] text-[#0F172A]`).
  - Subtitle: Two-line `Inter` copy `Vertex understands what you want to learn and` / `finds the exact lessons across all your courses.` (`text-[16px] sm:text-[18px] leading-[1.6] text-[#64748B]`).
  - Primary CTA Button: `Explore Courses` + right arrow `→` (`#E86A38` coral-orange fill with warm elevation shadow `0 10px 22px -6px rgba(232,106,56,0.5)`), scrolling smoothly to `#all-courses`.
  - Hero Search Bar: Interactive client component (`components/home/hero-search.tsx`) with double-layered soft frame, `SearchIcon`, input `Ask anything about your learning...`, and `⌘ K` keyboard shortcut badge. Pressing `⌘K` / `Ctrl+K` focuses the input; submitting navigates to `/search?q=<encoded-query>` (or `/search` if empty).
- **All Courses Section (`#all-courses`)**:
  - Header row: `All Courses` (`font-display text-[28px] font-semibold text-[#0F172A]`) on the left, `View all courses →` link (`text-[15px] font-medium text-[#EA580C]`) on the right.
  - 3-column responsive grid (`grid-cols-1 md:grid-cols-3 gap-6`) of double-framed course cards linking to `/courses/[slug]`:
    1. **Next.js for Production** (`slug: "nextjs-for-production"`): Glossy dark Next.js `N` emblem (`64x64`), description `"Build scalable, high-performance web applications with Next.js."`, metadata: `Intermediate` • `18h 24m` • `12 modules`.
    2. **Docker Essentials** (`slug: "docker-essentials"`): Custom SVG Docker whale & containers illustration (`64x64`), description `"Containerize applications and streamline your development workflow."`, metadata: `Beginner` • `10h 12m` • `8 modules`.
    3. **TypeScript Deep Dive** (`slug: "typescript-deep-dive"`): Blue `#3178C6` rounded square `TS` emblem (`64x64`), description `"Go beyond the basics and write safer, more expressive code."`, metadata: `Intermediate` • `14h 36m` • `10 modules`.
  - Metadata row uses level signal bars (`Intermediate` = 2 of 3 bars dark, `Beginner` = 1 of 3 bars dark), `ClockIcon`, and folded-corner `DocumentIcon`.
- **Weekly Update Banner & Rising Skyline Graphic**:
  - Horizontal divider line split around a centered callout with an orange outline `StarIcon` and `"New courses and lessons added every week."`.
  - Bottom decorative warm orange/peach vertical rising gradient columns matching the left and right bar clusters at the bottom of `@design/vertex-home.png`.

## 5. Files Expected to Touch

- `app/layout.tsx` (add weights `400`, `500`, `600` to `Playfair_Display`)
- `components/ui/icons.tsx` (add `ArrowRightIcon`, `StarIcon`, `NextjsLogoMark`, `DockerLogoMark`, `TypeScriptLogoMark`, and level-aware `LevelBarsIcon`)
- `components/home/hero-search.tsx` (interactive client search bar supporting `⌘K` focus and form submission to `/search`)
- `components/home/home-page.tsx` (complete Vertex Home Page layout, header, hero, course catalog grid, weekly banner, and rising bar visual)
- `app/page.tsx` (render `<VertexHomePage />`)

## 6. Requirements

1. Match `@design/vertex-home.png` on desktop (`1440px` width) in layout, spacing, typography, colors, borders, icons, and decorative elements.
2. Adapt cleanly down to mobile (`390px` width): stack the 3 course cards into 1 column, scale display typography sensibly, and keep the top header and search bar accessible.
3. Preserve `/design-system` so the previously built design system showcase remains intact.
4. Keep server/client boundaries clean: `app/page.tsx` and `components/home/home-page.tsx` are Server Components; only `components/home/hero-search.tsx` is a Client Component (`"use client"`) for keyboard shortcut (`⌘K`) and form navigation.

## 7. Security Considerations

- No secrets, tokens, or client-side direct database writes are introduced.
- Search query parameter is safely encoded with `encodeURIComponent` / `URLSearchParams` before navigation.

## 8. Acceptance Criteria

- Visiting `/` renders the Vertex Home Page matching `@design/vertex-home.png`.
- Pressing `⌘K` (or `Ctrl+K`) focuses the hero search input; typing a query and pressing Enter navigates to `/search?q=...`.
- All 3 course cards (`Next.js for Production`, `Docker Essentials`, `TypeScript Deep Dive`) display their exact brand artwork, serif titles, descriptions, and bottom metadata rows (`Intermediate / 18h 24m / 12 modules`, `Beginner / 10h 12m / 8 modules`, `Intermediate / 14h 36m / 10 modules`).
- TypeScript check (`pnpm exec tsc --noEmit`), Biome check (`pnpm run lint`), and production build (`pnpm run build`) pass with zero errors.
- Playwright verification on desktop and mobile viewports confirms visual accuracy.

## 9. Checks to Run

1. `pnpm exec tsc --noEmit`
2. `pnpm run lint`
3. `pnpm run build`
4. Playwright visual inspection at `http://localhost:5173` on desktop and mobile viewports.

## 10. Manual Test Steps

1. Run `pnpm run dev` and open `http://localhost:5173` in a browser.
2. Verify the top navbar (`Vertex`, `Courses`, `My Learning`, notification bell, user avatar), hero badge (`INTELLIGENT LEARNING`), headline (`Search your learning in plain English.`), subtitle, `Explore Courses ->` button, and hero search input (`Ask anything about your learning...` + `⌘ K`).
3. Press `⌘K` (macOS) or `Ctrl+K` (Windows/Linux) and confirm focus moves to the search input.
4. Scroll to `All Courses` and verify the 3 course cards (`Next.js for Production`, `Docker Essentials`, `TypeScript Deep Dive`), the `"New courses and lessons added every week."` callout, and the bottom rising gradient bars.
5. Resize the browser down to mobile (`390px` width) and verify responsive layout stacking.
