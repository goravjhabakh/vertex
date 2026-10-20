# Implement the Sanity-backed course page

## Goal

Create the public dynamic course route at `/courses/[slug]` and reproduce `design/vertex-course.png` using real course, instructor, learning-outcome, module, and lesson data from Sanity. The page must be responsive while preserving the supplied desktop layout.

## Skills and documentation reviewed

- Root `AGENTS.md`
- `sanity-best-practices` skill, including the Next.js integration and GROQ references
- Next.js 16 local documentation:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - `node_modules/next/dist/docs/01-app/02-guides/authentication-with-cache-components.md`

## Existing code and configuration inspected

- The root workspace is the Next.js web app; `studio/` is the standalone Sanity Studio.
- Existing server-only Sanity data access exists in `sanity/lib/client.ts`, `sanity/lib/fetch.ts`, and `sanity/lib/data.ts`.
- `COURSE_BY_SLUG_QUERY` already resolves a course, its instructor and category, learning outcomes, ordered modules, and ordered lesson references.
- Course/lesson schemas live in `studio/schemaTypes/documents/course.ts`, `studio/schemaTypes/documents/lesson.ts`, and object schemas under `studio/schemaTypes/objects/`.
- The query currently asks for `durationSeconds`, but the deployed lesson schema and seeded content use `duration`. This must be corrected in the query and regenerated TypeGen output before the course page consumes duration data.
- Existing home-page chrome and reusable SVG icons are in `components/home/home-page.tsx` and `components/ui/icons.tsx`; auth controls already account for the `cacheComponents` requirement through a `Suspense` boundary.
- The working tree was clean before this work.

## Decisions and assumptions

- The route is public and read-only. It will render as an async Server Component, retrieve only the requested course through the existing server-only data layer, and call `notFound()` when the course slug is absent.
- Because `cacheComponents` is enabled and the Sanity fetch is intentionally uncached, the dynamic route will export `instant = false`, following the installed Next.js 16 migration guidance. This avoids blocking-prerender validation while retaining server-only access.
- The visual layout matches the reference, but visible copy and image assets come from the selected Sanity course. The seed's `nextjs-app-router-in-depth` course therefore will not be renamed to the mock title in the design.
- Total duration is derived by summing resolved lesson durations; module count is `course.modules.length`; learner-facing student count is formatted compactly (for example, `18.2k`).
- The primary CTA points to the first lesson only if that route exists at implementation time; otherwise it remains a styled, non-navigating presentational control so the course page creates no dead route. Bookmark remains presentational because no bookmark storage feature or server write route exists in scope.
- The curriculum initially displays the first six modules to mirror the reference and exposes an accessible client-side “Show all / Show fewer” control for remaining modules. Module rows use the authored module title and summary, aggregated lesson duration, and a chevron affordance; no curriculum data is fabricated.
- The existing course fields do not include a course logo. The cover image is the hero art source. The cover treatment will keep the reference’s dark rounded artwork framing without adding a new CMS field or hardcoded Next.js logo.
- Learning-outcome `icon` identifiers will map to the closest existing/local SVG icon, with a deterministic generic fallback. Unknown identifiers will never break rendering.
- The fixed bottom progress dock is visual-only at this stage: progress persistence is out of scope and must not be written by the browser.

## Files expected to change

- `app/courses/[slug]/page.tsx` — dynamic Server Component route and missing-course handling.
- `components/course/course-page.tsx` — responsive presentational course page built from typed course data.
- `components/course/course-curriculum.tsx` — small Client Component limited to show-more/show-less curriculum interaction, if needed.
- `components/ui/icons.tsx` — only if missing icons are needed for the supplied reference.
- `sanity/lib/queries.ts` — replace invalid `durationSeconds` projections with schema-aligned `duration` projections.
- `sanity/types.ts` — regenerated, not manually edited, after the query correction.
- `app/globals.css` — only for reusable page-specific pattern or responsive styles that cannot be expressed with existing Tailwind utilities.
- `next.config.ts` — allow optimized `next/image` requests from the Sanity image CDN.

## Requirements

1. Build `/courses/[slug]` with real Sanity content via `getCourseBySlug`; keep the Sanity token and all fetches server-side.
2. Use Next.js 16 async dynamic-route params (`await params`) and `notFound()` for unknown courses.
3. Recreate the reference structure:
   - framed desktop shell with diagonal side hatch gutters and shared navigation/auth controls;
   - breadcrumb to the courses index and the current course title;
   - hero cover, optional Popular badge, course title, summary, level, derived duration, module count, student count, CTA, and bookmark control;
   - “What you’ll learn” two-column outcome grid;
   - course-content heading, aggregate metadata, curriculum rows, and show-all control;
   - fixed visual progress dock, matching the supplied reference without persisting or inventing progress.
4. Use `next/image` for Sanity images where practical, preserving supplied alt text and a safe visual fallback if an image asset is unavailable.
5. Derive all numeric values from content; do not hardcode course/module/lesson titles, counts, duration, descriptions, or learner data.
6. Ensure keyboard-accessible interactive controls, semantic headings, labelled navigation, and responsive behavior: stack hero content and outcome cards on narrow screens, keep touch targets usable, and avoid horizontal overflow.
7. Reuse existing fonts, chrome, color system, and UI patterns before adding new styles or dependencies. Do not install an icon library or add a separate backend.
8. Regenerate Sanity TypeGen from the Studio workspace after query changes instead of editing generated types manually.

## Security

- Import the data accessor only from server-rendered route/component code; it is already protected by `server-only`.
- Do not expose `SANITY_API_READ_TOKEN`, client configuration beyond existing public project metadata, or private document fields to the browser.
- Do not add browser-side Sanity, Clerk, or progress writes.
- Treat Sanity text and image fields as data; render text as React content and use authored image alt text.

## Acceptance criteria

- `/courses/nextjs-app-router-in-depth` renders from seeded Sanity data without hardcoded course content.
- A nonexistent slug returns Next.js’s not-found response.
- Course-level aggregate duration and each visible module duration are correct sums of Sanity lesson `duration` values.
- The visual hierarchy, spacing, borders, typography, side gutters, hero, outcome grid, curriculum, and bottom dock closely match `design/vertex-course.png` at desktop width.
- The page is usable and visually coherent on mobile.
- No client bundle imports server-only Sanity modules or secret values.
- Typecheck, lint, production build, Studio typecheck, and Studio TypeGen complete successfully.

## Checks to run

1. `pnpm --dir studio typecheck`
2. `pnpm --dir studio typegen`
3. `pnpm typecheck`
4. `pnpm lint`
5. `pnpm build`
6. Start `pnpm dev`, open the seeded course route, and verify it in Playwright at desktop and mobile viewports.

## Manual test steps

1. Ensure the supplied Sanity seed is imported and the root `.env.local` contains the required private read token and public Sanity project/dataset variables.
2. Run `pnpm dev` and visit `http://localhost:5173/courses/nextjs-app-router-in-depth`.
3. Confirm the title, summary, cover, badge, level, student count, learning outcomes, modules, and lesson-derived durations reflect Studio content.
4. Select “Show all modules,” then “Show fewer modules,” and confirm the curriculum expands and collapses without losing order.
5. Resize to a mobile viewport and confirm the hero and outcome grid stack without clipping or horizontal scrolling.
6. Visit `/courses/not-a-course` and confirm the not-found UI appears.
