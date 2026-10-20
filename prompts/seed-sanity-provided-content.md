# Seed Sanity from provided exports

## Goal

Import the provided Sanity seed export into the Studio's configured dataset without generating or altering any seed content. Verify the resulting document count after import.

## Skills and guidance read

- Root and repository `AGENTS.md` instructions.
- `sanity-migration`, including `references/general.md`.

## Code and configuration inspected

- `studio/sanity.cli.ts` configures the CLI with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.
- `studio/env.ts` requires those variables; `studio/.env.local` is available locally for the CLI configuration.
- `studio/package.json` provides the local Sanity CLI (`sanity` 5.31.2); the available CLI reports 6.7.2.
- `studio/scripts/seed/seed.ndjson` contains 141 documents: 6 categories, 5 instructors, 120 lessons, and 10 courses.
- `studio/scripts/seed/videos.json` contains metadata for the seeded lesson videos. It is not an NDJSON document import and will not be transformed or imported separately.

## Decisions and assumptions

- Treat `seed.ndjson` as the authoritative, complete document payload and import it unchanged.
- Use `npx sanity datasets import scripts/seed/seed.ndjson --replace` from `studio/`, so the stable document IDs make reruns convergent.
- The command writes to the dataset selected by the existing local Studio configuration. It may replace documents in that configured dataset with matching IDs but will not delete unrelated documents.
- Do not edit `studio/scripts/seed/seed.ndjson` or `studio/scripts/seed/videos.json`.
- Verify the import by querying the target dataset through the Sanity CLI and reporting both the total count and counts by seeded document type.

## Files expected to change

- `prompts/seed-sanity-provided-content.md` only.
- No seed file, schema, application code, or configuration file will be modified.

## Security considerations

- Use the existing local Sanity CLI authentication and project/dataset environment variables only.
- Do not display or commit credentials or environment values.
- Keep the target dataset private; no browser-side access or token changes are involved.

## Acceptance criteria

- The unmodified `seed.ndjson` import completes through the Sanity CLI.
- The import reports success without skipped document errors.
- A post-import query reports 141 seeded documents, with 6 categories, 5 instructors, 120 lessons, and 10 courses.
- `videos.json` remains untouched.
- Git status confirms no seed-file changes.

## Checks to run

1. Count the non-empty NDJSON lines and document types before import.
2. Run the Sanity dataset import command from `studio/`.
3. Query `count(*)` and grouped `_type` counts through the Sanity CLI after import.
4. Check git status for changes to the seed files.

## Manual verification

1. Open the Studio configured by `studio/.env.local`.
2. Confirm the Content list has categories, instructors, courses, and lessons.
3. Open a seeded course such as `Next.js App Router in Depth` and verify its ordered lesson references resolve.
