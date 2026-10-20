# Limit the home course showcase

## Goal

Keep the home page Sanity-backed, but display only the first three catalog courses. Point course-discovery links at the future `/courses` route without creating or modifying that index page.

## Context inspected

- `app/page.tsx` fetches the seeded catalog server-side with `getCatalogCourses()`.
- `components/home/home-page.tsx` renders every fetched course in the existing All Courses grid.
- `sanity/lib/queries.ts` orders catalog courses by `popular desc, title asc`.

## Decision

- Slice the already fetched, ordered course list to three entries at the home-page presentation boundary.
- Preserve the existing Sanity fetch, card content, and layout.
- Point home course CTAs, shared course navigation, and course-page return links to `/courses` so the future catalog route has one consistent destination.
- Do not add routes, schema fields, dependencies, writes, or browser-side data access.

## Expected files

- `components/home/home-page.tsx`
- `components/course/course-page.tsx`
- `components/ui/navigation.tsx`

## Acceptance criteria

- The home page displays exactly three seeded Sanity course cards.
- Card data remains sourced from Sanity.
- Course-discovery links point to `/courses`.
- No `/courses` index page is added or changed.

## Checks

1. `pnpm typecheck`
2. Targeted Biome check for the edited component.
3. Verify the home page with Playwright.
