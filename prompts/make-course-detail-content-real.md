# Make course-detail content real

## Goal

Make `/courses/[slug]` interactive using only seeded Sanity course and lesson content. Remove the fabricated progress display instead of inventing learner state.

## Context inspected

- `app/courses/[slug]/page.tsx` obtains the selected course with the server-only `getCourseBySlug()` accessor.
- `COURSE_BY_SLUG_QUERY` already fetches each ordered module plus its ordered lesson `_id`, title, slug, duration, free-preview flag, and thumbnail.
- `components/course/course-curriculum.tsx` currently expands only the number of visible modules; its chevrons do not expose lesson data.
- `components/course/course-page.tsx` contains fixed 35% progress and non-navigating Continue Learning controls.
- There is no Sanity `progress` schema or seeded learner-progress record. The user chose to remove fabricated progress rather than build authenticated progress tracking.

## Decisions

- Keep the course page server-rendered; pass its already fetched, serializable module/lesson data into a narrow Client Component solely for per-module expand/collapse state.
- Each module row toggles its real lesson list. Lesson entries show authored title, derived duration, and free-preview status when set.
- Lesson links point to `/lessons/[slug]`. The requested lesson routes are not built, so those links can return the application’s 404 page for now.
- Both Continue Learning controls link to the first lesson in course order. If no lesson exists, do not render those controls.
- Remove the fixed progress dock entirely. Do not add a zero value, local state, a progress schema, writes, or client-side token access.
- Preserve course fields as sourced from Sanity; do not hardcode curriculum content.

## Expected files

- `components/course/course-curriculum.tsx`
- `components/course/course-page.tsx`

## Security

- Reuse the existing server-only Sanity fetch; do not move it to the browser.
- No learner data is written or fabricated.
- Send only the existing course query’s rendered lesson fields to the Client Component.

## Acceptance criteria

- Clicking any module row expands and collapses its real Sanity lessons.
- Every displayed lesson title and duration is from the selected course’s query result.
- Continue Learning points to the first stored lesson URL.
- No fixed or fabricated progress percentage remains.
- Course content still responds well on mobile and typecheck, targeted lint, build, and Playwright checks pass.

## Checks

1. `pnpm typecheck`
2. Targeted Biome check
3. `pnpm build`
4. Playwright: expand a module, verify its lesson links, verify Continue Learning, and confirm no progress percentage appears.
