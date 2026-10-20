# Fix Instructor Studio previews

## Goal

Remove the `Invalid preview config` errors from Instructor list cards in Sanity Studio while preserving the imported instructor data.

## Skills and guidance read

- Repository `AGENTS.md`.
- `sanity-best-practices`, including `references/schema.md`.

## Code and data inspected

- `studio/schemaTypes/documents/instructor.ts` declares `expertise` as a single `string` and directly selects it as the preview `subtitle`.
- The five imported instructor documents in `studio/scripts/seed/seed.ndjson` store `expertise` as arrays of strings.
- `pnpm exec sanity documents validate` confirms all five instructors fail validation because the schema expects a string and receives an array.
- The same validation run identifies unrelated pre-existing schema/seed mismatches in courses and lessons. They are not part of this focused Instructor preview fix.

## Decisions and assumptions

- Update the Instructor schema to model `expertise` as an array of string values, matching the seeded content and its intended meaning.
- Add a preview `prepare` function that renders the expertise array as a human-readable string subtitle, preventing the preview from receiving a raw array.
- Do not mutate the already imported Instructor documents or either provided seed file.
- Do not address unrelated course or lesson validation failures in this task.

## Files expected to change

- `studio/schemaTypes/documents/instructor.ts`
- `prompts/fix-instructor-studio-previews.md`

## Security considerations

- This is a local Studio schema-only change; it uses no credentials and does not expose or mutate content.
- Existing content remains unchanged.

## Acceptance criteria

- Instructor `expertise` accepts the seeded array-of-strings shape.
- Instructor previews render the name, a comma-separated expertise subtitle, and photo.
- Sanity document validation reports no Instructor errors.
- Studio type checking succeeds.
- The seed files remain unmodified.

## Checks to run

1. `pnpm typecheck` in `studio/`.
2. `pnpm exec sanity documents validate --level error` against the configured dataset; filter/report Instructor validation results.
3. Run the Studio and verify every Instructor list card renders normally.

## Manual verification

1. Run `pnpm dev` in `studio/`.
2. Open **Instructor** in the Structure pane.
3. Confirm all five entries show a name, profile image, and comma-separated expertise rather than `Invalid preview config`.
