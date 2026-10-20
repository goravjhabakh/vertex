# Implementation Prompt: Vertex Design System

## 1. Goal

Implement the **Vertex Design System** tokens, typography, reusable UI primitives, and interactive design system showcase page reproducing `@design/vertex-designsystem.png` pixel-accurately on desktop and responsively down to mobile.

## 2. Skills & Documentation Read

- `AGENTS.md` (project rules, workflow, architecture boundaries, UI fidelity requirements, checks)
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` (App Router layouts, pages, route props helpers)
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (Tailwind CSS v4 configuration and global CSS rules)
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (`next/font/google` font optimization for `Playfair_Display` and `Inter`)

## 3. Code Inspected

- `package.json`: Next.js `16.4.2`, React `19.3.0`, Tailwind CSS v4 (`@tailwindcss/turbopack`, `tailwindcss: ^4`), Biome `2.4.2`.
- `app/layout.tsx`: Root layout currently loading `Geist` and `Geist_Mono`.
- `app/globals.css`: Tailwind v4 `@import "tailwindcss";` and `@theme inline` block.
- `app/page.tsx`: Default Next.js starter template.
- `biome.json`: 2-space indent, 120 line width, double quotes, `asNeeded` semicolons, `es5` trailing commas.
- `design/vertex-designsystem.png`: Reference design system specification (Version 1.0 • May 2025).

## 4. Decisions & Assumptions

- **Fonts**: Configure `Playfair_Display` (weights 700, variable) and `Inter` (weights 400, 500, 600, 700, variable) via `next/font/google` in `app/layout.tsx` and expose `--font-display` and `--font-sans` in `app/globals.css`.
- **Theme Tokens (`app/globals.css`)**:
  - **Primary**:
    - `primary-500`: `#F97316`
    - `primary-400`: `#FB923C`
    - `primary-300`: `#FDBA74`
    - `primary-200`: `#FED7AA`
    - `primary-100`: `#FFEEE5`
  - **Neutral**:
    - `neutral-900`: `#0F172A`
    - `neutral-700`: `#334155`
    - `neutral-500`: `#64748B`
    - `neutral-300`: `#CBD5E1`
    - `neutral-200`: `#E2E8F0`
    - `neutral-100`: `#F1F5F9`
    - `neutral-50`: `#FAFAFC`
    - `white`: `#FFFFFF`
  - **Shadows**:
    - `shadow-ds-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
    - `shadow-ds-md`: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`
    - `shadow-ds-lg`: `0 12px 24px -4px rgba(15, 23, 42, 0.10)`
    - `shadow-ds-xl`: `0 20px 40px -8px rgba(15, 23, 42, 0.12)`
  - **Radius**: `4px` (xs), `8px` (sm), `12px` (md), `16px` (lg), `24px` (xl), `9999px` (full).
  - **Type Scale Utilities**:
    - Display 1: Playfair Display, `48px / 56px`, Bold (`700`)
    - Display 2: Playfair Display, `36px / 44px`, Bold (`700`)
    - Heading 1: Inter, `28px / 36px`, Semi Bold (`600`)
    - Heading 2: Inter, `22px / 30px`, Semi Bold (`600`)
    - Heading 3: Inter, `18px / 26px`, Medium (`500`)
    - Body Large: Inter, `16px / 24px`, Regular (`400`)
    - Body: Inter, `14px / 20px`, Regular (`400`)
    - Small: Inter, `12px / 16px`, Regular (`400`)
- **Reusable UI Components (`components/ui/`)**:
  - Build clean, typed primitives matching the design system so all subsequent pages (Catalog, Course, Lesson, Search) can reuse them directly:
    - `components/ui/icons.tsx`: All 9 design system icons (`Bell`, `Search`, `PlayCircle`, `Document`, `Bookmark`, `Signal`/`Level`, `Clock`, `User`, `ChevronRight`, `ChevronLeft`, `ChevronDown`, `ExternalLink`, `CheckCircle`, `Lock`, `InProgress`, `Eye`, `Grid`, `Target`, `Accessible`, `VertexLogo`, `NextjsMark`) in both `outline` (24x24 grid, 2px stroke, rounded caps) and `filled` variants.
    - `components/ui/button.tsx`: Primary, Secondary, Tertiary, and Text button variants with Default, Hover, and Disabled states (44px height, 12px radius, Inter Medium 14-16px).
    - `components/ui/input.tsx`: Search/Text Input (44px height, 12px radius, 1px solid `#E2E8F0`, focus `#FB923C`, optional `⌘ K` shortcut badge) and Select field.
    - `components/ui/badge.tsx`: `VIDEO` (orange pill), `LESSON` (indigo/purple pill), and `POPULAR` (orange tint pill) badges, plus Status Indicators (`In Progress`, `Completed`, `Now Playing`, `Locked`) and `ProgressBar`.
    - `components/ui/cards.tsx`: `CourseCard`, `VideoLessonCard`, `LessonResultCard`, and `ResourceCard` matching section 12 of the reference image.
    - `components/ui/navigation.tsx`: Top `Navbar` (`Vertex` logo + `Courses` & `My Learning`), `Breadcrumbs`, and `Pagination`.
- **Showcase Route**:
  - Render the complete 14-section Vertex Design System sheet at `/design-system` (`app/design-system/page.tsx`) and also render it on `/` (`app/page.tsx`) until the catalog page is implemented, so visiting either `/` or `/design-system` immediately displays the exact design system reference.

## 5. Files Expected to Touch

- `app/layout.tsx` (configure `Playfair_Display` and `Inter` fonts, page metadata, light theme background `#FAFAFC` / `#F8F6F4`)
- `app/globals.css` (define `@theme` tokens for colors, fonts, shadows, radii, and type scale classes)
- `components/ui/icons.tsx` (create outline & filled 24x24 icon set and Vertex logo)
- `components/ui/button.tsx` (create Primary, Secondary, Tertiary, Text button component)
- `components/ui/input.tsx` (create SearchInput and Select component)
- `components/ui/badge.tsx` (create Badge, StatusIndicator, and ProgressBar components)
- `components/ui/cards.tsx` (create CourseCard, VideoLessonCard, LessonResultCard, and ResourceCard components)
- `components/ui/navigation.tsx` (create NavbarLink, Breadcrumbs, and Pagination components)
- `components/design-system/design-system-showcase.tsx` (complete 14-section layout matching `design/vertex-designsystem.png`)
- `app/design-system/page.tsx` (route serving the design system showcase)
- `app/page.tsx` (render the design system showcase on home until catalog is built)

## 6. Requirements

1. Reproduce all 14 sections of `@design/vertex-designsystem.png` accurately:
   - Header left card: Vertex logo, "Design System" Display title, description copy, `VERSION 1.0 • MAY 2025`.
   - `01 COLORS`: Primary (`#F97316`, `#FB923C`, `#FDBA74`, `#FED7AA`, `#FFEEE5`) and Neutral (`#0F172A`, `#334155`, `#64748B`, `#CBD5E1`, `#E2E8F0`, `#F1F5F9`, `#FAFAFC`, `#FFFFFF`) swatches with labels and hex codes.
   - `02 TYPOGRAPHY`: `Ag` Playfair Display (`Elegant • Readable • Timeless`) and `Ag` Inter (`Clean • Modern • Highly legible`).
   - `03 TYPE SCALE`: Table with Style, Font, Size / Line Height, Weight, and Use columns for Display 1, Display 2, Heading 1, Heading 2, Heading 3, Body Large, Body, Small.
   - `04 SPACING SYSTEM`: Base unit 4px with proportional Peach/Orange blocks for `4 (0.25rem)`, `8 (0.5rem)`, `12 (0.75rem)`, `16 (1rem)`, `24 (1.5rem)`, `32 (2rem)`, `40 (2.5rem)`, `48 (3rem)`, `64 (4rem)`.
   - `05 RADIUS & SHADOWS`: Radius boxes (`4px (xs)`, `8px (sm)`, `12px (md)`, `16px (lg)`, `24px (xl)`, `Full (circle)`) and Shadows (`Sm`, `Md`, `Lg`, `Xl`) with exact CSS shadow strings.
   - `06 ICONS`: Outline Style row, Filled Style row ("Fileed Style" in reference), and Icon Specs list.
   - `07 BUTTONS`: Matrix of Primary, Secondary, Tertiary, Text across Default, Hover, Disabled states + Button Specs list.
   - `08 INPUTS`: Search / Text Input (`Search anything...` + `⌘ K`), Select (`Most Relevant`), and Field Specs list.
   - `09 BADGES / TAGS`: `VIDEO`, `LESSON`, `POPULAR` badges with titles above.
   - `10 STATUS / INDICATORS`: `In Progress`, `Completed`, `Now Playing`, `Locked`.
   - `11 PROGRESS BAR`: Orange progress bar at 35% with `35% complete` label.
   - `12 CARDS`: Course Card (`Next.js for Production`), Lesson Card (Video) (`Data Fetching in Server Components`), Lesson Card (Lesson) (`Data Fetching & Caching`), and Resource Card (`Caching and Revalidation Guide`).
   - `13 NAVIGATION`: Vertex brand + `Courses` (active orange) / `My Learning`, Breadcrumbs (`All Courses > Next.js for Production > Data Fetching & Caching`), and Pagination (`< 1 2 3 ... 8 >` with `1` active).
   - `14 PRINCIPLES`: `Clarity First`, `Consistency`, `Focus & Calm`, `Accessible` with circular icons and descriptions.
2. Responsive layout: Exact Bento grid on desktop (`lg` / `xl`) and clean stacked responsive layout on mobile/tablet viewports.
3. No external runtime icon dependencies required; pure SVG components adhering to 24x24px, 2px stroke, rounded caps.

## 7. Security Considerations

- Purely presentational UI components and CSS tokens; no secrets, tokens, or external API calls are introduced.
- Server/client boundaries preserved (components are server-compatible by default, with interactive inputs/selects safe for client use).

## 8. Acceptance Criteria

- All color tokens, font families, type scale sizes/line-heights, radii, and shadows match `design/vertex-designsystem.png`.
- Reusable UI components in `components/ui/*` are exported and strongly typed for upcoming pages.
- TypeScript check (`pnpm exec tsc --noEmit`), Biome check (`pnpm run lint`), and Next.js production build (`pnpm run build`) pass with zero errors.
- Visual verification in Playwright confirms desktop and mobile layouts match `design/vertex-designsystem.png`.

## 9. Checks to Run

1. `pnpm exec tsc --noEmit`
2. `pnpm run lint`
3. `pnpm run build`
4. Playwright visual verification against `http://localhost:3000` (desktop `1440x2000` and mobile `390x844`).

## 10. Manual Test Steps

1. Start the development server with `pnpm run dev`.
2. Open `http://localhost:3000` (or `http://localhost:3000/design-system`) in a browser.
3. Verify all 14 numbered sections (`01 COLORS` through `14 PRINCIPLES`) plus the top-left Vertex Design System header block match `@design/vertex-designsystem.png`.
4. Test interactive states on inputs (focus border `#FB923C`), buttons (hover states), and responsive resizing from `1440px` down to `375px`.
