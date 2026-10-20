# Connect home courses to seeded Sanity content

## Goal

Replace the hardcoded home-page course cards with the seeded Sanity courses while preserving the layout and visual treatment shown in the supplied home-page reference.

## Skills and documentation reviewed

- Root `AGENTS.md`
- `sanity-best-practices` skill, including Next.js and GROQ guidance
- Next.js 16 local server/component and layouts-and-pages documentation

## Existing code inspected

- `components/home/home-page.tsx` defines a hardcoded `HOME_COURSES` array and renders it in the existing three-column All Courses section.
- `sanity/lib/data.ts` already exports the server-only `getCatalogCourses` accessor.
- `sanity/lib/queries.ts` already projects the fields needed for a catalog card: slug, title, summary, level, student count, cover image, and related metadata.
- The seed data in `studio/scripts/seed/seed.ndjson` contains multiple courses, including the course presently viewable at `/courses/nextjs-app-router-in-depth`.
- `components/ui/icons.tsx` contains the shared metadata icons used by the visual design.

## Decisions and assumptions

- Make the root page async and fetch catalog courses server-side with `getCatalogCourses()`; do not send a Sanity token or browser fetch to the client.
- Because the catalog request is intentionally fresh and `cacheComponents` is enabled, the root route will export `instant = false`, following the installed Next.js 16 guidance for uncached request-time data.
- Preserve the existing home layout, header, search, and all non-card sections.
- Derive each displayed module count from `course.modules.length`. The current catalog projection must be extended only as needed to include the module array or an equivalent count.
- The course schema has no course-logo field. Use the authored cover image as the card media, retaining a safe fallback treatment when no asset is available. Do not retain mock SVG logos or add a new schema field.
- Derive course duration only when it can be done from fetched lesson durations; otherwise omit the duration rather than inventing one. The catalog card query will resolve ordered module lessons and their `duration` fields so the existing duration metadata remains data-driven.
- Keep cards linked to `/courses/[slug]`, now backed by the previously implemented course route.
- Maintain the existing card visual proportions even if seeded course titles/summaries differ from the reference mock content.

## Files expected to change

- `app/page.tsx` — fetch course data in the root Server Component and pass it into the home page.
- `components/home/home-page.tsx` — remove mock course data and render typed Sanity course card values.
- `sanity/lib/queries.ts` — extend the catalog projection only with the module/lesson duration information required for truthful card metadata.
- `sanity/types.ts` — regenerated after the GROQ change; never hand-edited.
- `next.config.ts` — only if an additional permitted Sanity image host is required (not expected).

## Requirements

1. Fetch only through the existing server-only Sanity data accessor.
2. Render all returned seeded courses in the All Courses section, retaining the responsive one-to-three-column grid.
3. Use each course’s title, summary, level, cover image, slug, modules, and lesson durations from Sanity.
4. Do not hardcode course titles, descriptions, slugs, durations, module counts, or visual logos.
5. Keep image alt text authored in Sanity and provide a presentational fallback when the cover image has no asset.
6. Regenerate TypeGen after updating the query.
7. Keep content browsing public and do not add writes, client tokens, or new dependencies.

## Security

- The root route remains a Server Component and imports the server-only accessor only on the server.
- No Sanity read token may reach props, browser code, HTML, or client-side network calls.
- Return and render the minimum existing catalog projection; do not expose private fields.

## Acceptance criteria

- The home page’s All Courses cards are populated by the current seeded Sanity data.
- Editing a seeded course’s title, summary, cover image, level, module ordering, or lesson duration changes its card after the normal server refresh.
- Every card links to a corresponding Sanity-backed `/courses/[slug]` page.
- The card grid remains visually faithful to the supplied reference and responsive.
- Typecheck, TypeGen, production build, and targeted lint checks pass.

## Checks to run

1. `pnpm --dir studio typegen`
2. `pnpm typecheck`
3. `pnpm lint` (report any unrelated existing failures precisely)
4. `pnpm build`
5. Use Playwright to verify seeded cards, a card link, and a mobile viewport.

## Manual test steps

1. Ensure the seeded Studio content is imported and `.env.local` has the private read token and public Sanity project settings.
2. Run `pnpm dev` and open `http://localhost:5173`.
3. Confirm each All Courses card title, summary, cover, level, duration, and module count match Sanity content.
4. Select a course card and confirm `/courses/<slug>` displays its corresponding detail page.
5. Resize to a mobile viewport and confirm cards stack without clipping or horizontal scrolling.
