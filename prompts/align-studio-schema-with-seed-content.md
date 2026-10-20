# Align Studio schema with the imported seed content

## Goal

Make the Sanity Studio schema match the already imported `studio/scripts/seed/seed.ndjson` document shape so Course, Lesson, Instructor, and Category lists render valid previews and the seeded content validates without errors. Do not modify either provided seed file or mutate imported documents.

## Skills and guidance read

- Repository `AGENTS.md`.
- `sanity-migration`, including `references/general.md`.
- `sanity-best-practices`, including `references/schema.md`.

## Code and data inspected

- Seed inventory: 141 content documents—10 courses, 120 lessons, 5 instructors, and 6 categories.
- `studio/schemaTypes/documents/{course,lesson,instructor,category}.ts`.
- `studio/schemaTypes/objects/{image,price,resource,learning-outcome,module,rich-text}.ts`.
- Live `pnpm exec sanity documents validate` result: 141 seeded documents checked; 135 documents have 524 errors.

## Confirmed schema/seed differences

| Content | Seed shape | Current schema shape |
| --- | --- | --- |
| Instructor expertise | string array | string |
| Course level | lowercase `beginner`, `intermediate`, `advanced` | title-cased allowed values |
| Course price | number | `price` object with amount/currency |
| Lesson duration | `duration` number | required `durationSeconds` number |
| Resource type | lowercase `link` | title-cased list excluding `link` |

Categories, images, Portable Text, modules, learning outcomes, references, and resource URLs match the imported document shape. The Category schema produces no document-validation errors, but will be included in browser verification because the user observes a list error there too.

## Decisions and assumptions

- Treat the supplied seed export as authoritative; align schemas rather than transform content or regenerate a seed.
- Keep Instructor `expertise` as an array of strings and use a preview `prepare` function to join it into a subtitle.
- Represent Course `price` as a non-negative number because the seed stores a numeric price (with `0` for free courses). Remove the unused custom price object from the registered schema types if no field uses it after the update.
- Use the seed field name `duration` for Lesson duration and update its preview selection to the same field.
- Use the exact lowercase seed values for Course level and Resource type options.
- Preserve existing field validation intent where it remains compatible with the seed.
- Do not change the imported documents, `seed.ndjson`, or `videos.json`.

## Files expected to change

- `studio/schemaTypes/documents/instructor.ts`
- `studio/schemaTypes/documents/course.ts`
- `studio/schemaTypes/documents/lesson.ts`
- `studio/schemaTypes/objects/resource.ts`
- `studio/schemaTypes/index.ts` (only if removing the no-longer-used price object registration)
- `studio/schemaTypes/objects/price.ts` (delete only if no longer registered or used)
- `prompts/align-studio-schema-with-seed-content.md`

## Security considerations

- This is a schema alignment only: no credentials, seed content, or imported documents are modified.
- Existing data remains intact; schema changes make its current shape valid.

## Acceptance criteria

- All 141 seeded content documents pass `sanity documents validate --level error`.
- Instructor previews show name, comma-separated expertise, and photo instead of invalid-preview errors.
- Course, Lesson, and Category list cards render without invalid-preview errors in an authenticated Studio session.
- Studio type checking and production build succeed.
- Both seed files have unchanged hashes.

## Checks to run

1. `pnpm typecheck` from `studio/`.
2. `pnpm build` from `studio/`.
3. `pnpm exec sanity documents validate --level error` against the configured dataset.
4. Start the Studio and use Playwright, where the authenticated browser session permits it, to open every content list and confirm no `Invalid preview config` cards.
5. Compare seed-file SHA-256 hashes before and after.

## Manual verification

1. Run `pnpm dev` from `studio/` and sign in.
2. Open Course, Lesson, Instructor, and Category from the Structure pane.
3. Confirm cards use their actual title, subtitle, and image fields with no invalid-preview error.
4. Open one free course and one paid course to confirm the numeric price field is editable.
5. Open a lesson to confirm its duration and resource type fields show their imported values.
