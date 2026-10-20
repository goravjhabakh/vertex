# Implement the courses catalog

## Goal

Implement the missing `/courses` page as a simple public catalog of all seeded Sanity courses, resolving the course-discovery links added to the home page.

## Context inspected

- `app/page.tsx` already fetches `getCatalogCourses()` server-side.
- `components/home/home-page.tsx` has the current Sanity-backed course card presentation.
- `sanity/lib/data.ts` and `sanity/lib/queries.ts` expose the catalog data, including cover image, level, module lessons, and durations.
- `/courses/[slug]` is the existing course-detail route.

## Decision

- Add only `app/courses/page.tsx` and a small server-rendered catalog component.
- Reuse the existing course card visual language and shared navigation; fetch all catalog courses server-side.
- Use all currently available Sanity catalog data. Do not add filtering, pagination, search behavior, client state, schema changes, writes, or new dependencies.
- Because the catalog fetch is fresh and Cache Components is enabled, export `instant = false` on the route.

## Expected files

- `app/courses/page.tsx`
- `components/catalog/courses-catalog-page.tsx`

## Security

- Fetch through the existing server-only data accessor only.
- Keep the Sanity API token on the server; no client data calls or writes.

## Acceptance criteria

- `/courses` returns 200 and renders every seeded Sanity course.
- Each card uses real data and links to `/courses/[slug]`.
- Existing home and course-detail links to `/courses` now resolve.
- The catalog is responsive and uses the existing design system.
- Typecheck, targeted lint, build, and Playwright verification pass.

## Checks

1. `pnpm typecheck`
2. Targeted Biome check
3. `pnpm build`
4. Verify `/courses` and a course card with Playwright.
