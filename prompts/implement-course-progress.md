# Implement real course progress

## Goal

Replace the removed fake course progress with authenticated, server-authorized learner progress stored in Sanity. Keep the course-detail design aligned with `design/vertex-course.png`, use real completion data for the progress percentage, and make Continue Learning select a real next lesson.

## Skills and documentation reviewed

- Root `AGENTS.md`
- `sanity-best-practices` skill and Next.js/GROQ guidance
- `clerk` and `clerk-nextjs-patterns` skills
- Local Clerk Next.js server/client and protected API-route references

## Existing code inspected

- The course-detail route is public and server-renders a Sanity course with `getCourseBySlug()`.
- Expanded module rows now expose real seeded lessons and `/lessons/[slug]` links.
- Clerk v7 is configured through a bare `clerkMiddleware()` proxy, and auth API calls require `await auth()`.
- The Studio currently has no progress document schema.
- Sanity environment configuration exposes a read token only; `.env.example` needs a server-only write token entry for progress mutations.
- There is no lesson/player route, so no actual playback position can yet be measured.

## Data model

Add a `learnerProgress` Sanity document, one document per learner and course:

- `userId`: Clerk user ID, server-authored only.
- `course`: required reference to `course`.
- `completedLessons`: ordered/set-like array of required lesson references.
- `resumeLesson`: optional reference to `lesson`.
- `resumePosition`: optional non-negative integer seconds.

The app will query the current user’s record by Clerk ID and course ID. It will not expose, query, or alter another learner’s record.

## Decisions

- Keep public browsing. Signed-out learners see no fabricated percentage and a sign-in affordance in the progress dock.
- Signed-in learners with no record start at a truthful 0%; the percentage is completed course lessons divided by total course lessons.
- Each expanded lesson gets a compact completion toggle. Its server route validates that the submitted lesson belongs to the submitted course before writing.
- Completion writes go to a protected Next.js route handler that resolves the Clerk user ID on the server and uses a Sanity write token only there.
- The client sends only `courseId`, `lessonId`, and an intended completed state. It never sends a user ID, token, or percentage.
- Continue Learning targets `resumeLesson` when it is still incomplete, otherwise the first incomplete lesson in authored course order; if all are complete, it targets the first lesson. Since no player exists, it cannot yet update `resumePosition`.
- The progress dock returns, visually matching the reference, but its percentage and fill width are always derived from real stored completion state. No 35% default remains.
- Keep lesson links as-is; they may 404 until lesson pages are implemented.

## Files expected to change

- `studio/schemaTypes/documents/learner-progress.ts`
- `studio/schemaTypes/index.ts`
- `sanity/env.ts`
- `sanity/lib/client.ts` or a dedicated server-only write client
- `sanity/lib/queries.ts`
- `sanity/lib/data.ts`
- `app/api/progress/route.ts`
- `app/courses/[slug]/page.tsx`
- `components/course/course-page.tsx`
- `components/course/course-curriculum.tsx`
- `.env.example`
- generated `sanity/types.ts`

## Security

- Read and write tokens remain server-only; only `SANITY_API_WRITE_TOKEN` is added and it must use the least privilege needed for progress documents.
- The route checks Clerk authentication with `await auth()` and returns 401 when signed out.
- The route ignores any client-supplied user ID, checks course/lesson membership from Sanity before mutation, and writes only the authenticated user’s own record.
- The client receives only its own completion lesson IDs and derived percentage, never credentials or other learners’ records.
- All progress writes go through the protected route handler; there are no direct browser-to-Sanity mutations.

## Acceptance criteria

- A signed-in learner can mark an expanded real lesson complete/incomplete and the state persists in Sanity.
- The progress dock’s label, percent, and bar reflect the actual stored completion state.
- Continue Learning resolves from stored progress and real seeded lesson slugs.
- A signed-out learner cannot mutate progress and is not shown a fabricated percentage.
- Invalid course/lesson combinations are rejected by the route handler.
- The desktop progress dock matches the reference’s layout, and the page remains responsive.
- Studio TypeGen/typecheck, web typecheck, targeted lint, production build, and Playwright checks pass.

## Checks to run

1. `pnpm --dir studio typecheck`
2. `pnpm --dir studio typegen`
3. `pnpm typecheck`
4. Targeted Biome check
5. `pnpm build`
6. Deploy Studio/schema only if authenticated Sanity credentials are available and deployment is requested/appropriate.
7. Playwright: signed-out course page, sign-in prompt, expanded curriculum, and layout; authenticated mutation is documented as requiring configured Clerk test credentials.

## Manual test steps

1. Add a least-privilege `SANITY_API_WRITE_TOKEN` to `.env.local`.
2. Deploy the Studio schema and use the course page while signed into Clerk.
3. Expand a module and toggle a lesson completion control.
4. Reload the course and verify the completion state, percentage, bar, and Continue Learning target persist.
5. Sign out and confirm completion controls cannot write progress and no synthetic percentage appears.
