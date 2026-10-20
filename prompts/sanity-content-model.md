# Vertex content model, standalone Studio, and server data layer

## Goal

Implement the requested course, embedded module, lesson, instructor, and category model; a standalone Sanity Studio; and typed, server-only content reads for the existing Next.js app. Follow root AGENTS.md.

## Guidance read

- `sanity-best-practices`: schema, GROQ, Next.js integration, TypeGen, project structure, and Studio structure rules via Sanity MCP.
- `content-modeling-best-practices` and its reference-versus-embedding guide.
- Current Sanity Studio project structure documentation, discovered with `search_docs` and read with `read_docs`.
- Installed Next.js 16.4.2 guides for fetching data, Cache Components, and server-only module boundaries.

## Inspection and findings

- Inspected root package/scripts, workspace configuration, TypeScript, Biome, Next config, environment example, gitignore, README, app layout, proxy, embedded Studio route, and every existing Sanity module.
- Working tree was clean at inspection.
- Next.js lives at the repo root, with existing Clerk integration and designed pages. Cache Components and Partial Prefetching are enabled.
- Sanity 5.31.2 and next-sanity 13.3.4 are already installed. Studio is embedded at `/studio`; schemas are empty. The existing client is unauthenticated, and the unused live helper has no private dataset configuration.
- Sanity MCP identifies the existing Vertex project (`uweatctn`) and its `production` dataset. Dataset visibility is currently public.

## Decisions and scope

1. Treat the existing root package as the web workspace; add `studio/` as a separate pnpm workspace with its own package, TypeScript config, dev/build/deploy commands, and Sanity configuration. This provides independent applications without moving the existing website. Keep root web commands working.
2. Move Studio configuration and schema ownership into `studio/`; remove the inspected embedded route and superseded scaffold. Keep web read modules under root `sanity/`. Check imports before removing files.
3. Reuse the existing Vertex project and dataset. After approval, change `production` to private, verify the ACL, and configure a least-privileged read token through available authenticated tooling or user-provided environment configuration. Do not substitute an administrator/write token in the web app.
4. Implement only the requested content foundation. Video ingestion, video documents, Context/search configuration, progress, analytics, new learner pages, preview mode, and content seeding are separate work. No content/config import is needed without supplied source documents; report that explicitly.
5. Preserve installed major versions and existing site/auth behavior. Add only necessary compatible dependencies and scripts.
6. Retain API date `2026-10-20`. Published reads only; no browser token or live-browser data subscription. Start with uncached authenticated reads (`useCdn: false`, `cache: no-store`) and document Suspense usage for future Server Component callers with Cache Components enabled. Avoid adding a cache invalidation system in this task.

## Content requirements

Use `defineType`, `defineField`, and `defineArrayMember`, named exports, editor descriptions, previews, field groups where useful, and icons compatible with the installed package.

- **course document:** required title, unique per-type slug, summary, cover image, level, nonnegative price, instructor reference, category reference, and ordered modules. Optional popular flag defaults false; student count is a nonnegative integer defaulting to zero. Learning outcomes are a short array of objects containing icon identifier, title, and description. Price uses a structured amount/currency object, with an explicit ISO currency code rather than an assumed currency.
- **module object:** title, summary, ordered strong lesson references. Embed only within course. Reject duplicate lesson references within a course to keep numbering unambiguous. Reuse across different courses is allowed.
- **lesson document:** title, unique per-type slug, HTTPS video URL, thumbnail image, positive integer duration in seconds, free-preview boolean, nonnegative integer student count, Portable Text notes, short string-array key points, optional plain-text pro tip, and resources. Resources contain type, title, description, and HTTP(S) URL. Validate supported video host families (YouTube, Vimeo, Bunny); this validates authored URLs, not playback or ingestion support. No stored parent course or ordinal fields.
- **instructor document:** name, unique per-type slug, photo, expertise string, and Portable Text bio.
- **category document:** title, unique per-type slug, description.
- Shared image type uses hotspot/crop and required alternative text. Shared Portable Text supports paragraphs, headings, lists, emphasis, strong, inline code, and validated HTTP(S) link annotations. Store structured blocks, not Markdown/HTML.
- Require core fields and nonempty curriculum arrays for publishing. Use sensible short-list limits and descriptive validation messages; drafts may remain incomplete.
- Studio navigation lists Courses, Lessons, Instructors, and Categories. Modules and other objects are edited in place, never listed as documents.

## Server data layer

- Add `server-only` boundaries to credential configuration, authenticated client, fetch helper, and repository functions.
- Validate required environment values without printing secrets. Separate client-safe image configuration from the token-bearing client. No `NEXT_PUBLIC_` or `SANITY_STUDIO_` secret token.
- Use `next-sanity` `defineQuery`, parameterized slugs/filters, explicit projections, and generated query-result types.
- Provide functions for catalog courses (optional category/level filters), categories, course by slug with ordered modules and lessons, lesson by slug with its containing courses, and instructor by slug with their courses.
- Derive lesson parent relationships through reverse references. Return all containing courses rather than arbitrarily choosing one when a lesson is reused. Derive module/lesson numbering from original array order; preserve array keys and account for unresolved references without renumbering later entries.
- Project card data narrowly; return notes/resources only for lesson detail and instructor bio only where needed. Include image references, crop/hotspot, alt, and appropriate asset metadata for future rendering.
- Preserve `null` for missing detail documents and empty arrays for valid empty collections. Propagate configuration/auth/network errors rather than disguising failures as empty content.
- Configure schema extraction and TypeGen from `studio/` to scan root web queries and emit committed `sanity/types.ts`. Do not hand-maintain duplicate document/result interfaces. Exclude generated artifacts from formatting as appropriate.
- Add a repeatable read-only smoke command for live queries, with optional real slugs, to check the actual data layer without adding public diagnostic routes. Empty dataset results are valid but must be reported as such.

## Expected files

- New `studio/package.json`, `studio/tsconfig.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/env.ts`, `studio/structure.ts`, `studio/schemaTypes/**`, and `studio/.env.example`.
- Update/add root `sanity/env.ts`, `sanity/lib/{client,fetch,image,data,queries}.ts`, generated `sanity/types.ts`, and a read-only smoke script under `scripts/`.
- Remove superseded root Studio configs, root empty schema/structure files, unused live helper, and `app/studio/[[...tool]]/page.tsx` after verifying references.
- Update `package.json`, `pnpm-workspace.yaml`, lockfile, `tsconfig.json` workspace exclusions, `.gitignore`, `biome.json` if needed, `.env.example`, and README.
- Environment secrets remain only in ignored local files. Root `.env.example` is the canonical variable inventory, including instructions for Studio variables and optional deployment identifiers.

## Security

- Private dataset; authenticated published reads on the web server only.
- Studio authenticates authors through Sanity's normal authoring login, independently of learner Clerk authentication.
- No token in browser bundles, logged configuration, generated types, examples, or git-tracked files.
- No mutations exported from the web data layer; no preview/draft leakage.
- Validate URL protocols and parameterize GROQ values. Preserve existing remote content; do not overwrite or seed production documents.
- Inspect deployed schemas before any document queries. If no schema is deployed, use local definitions and deploy them; do not retry missing-schema discovery.

## Acceptance criteria

1. Web and Studio develop/build independently; `/studio` is no longer embedded.
2. All requested types, relationships, validations, and editor previews work.
3. TypeGen reproduces the committed types and query results without handwritten casts hiding errors.
4. Server reads use the private dataset and only published content; ordering and reverse relationships are correct.
5. Existing site routes and Clerk integration still render.
6. Dataset privacy is verified; Studio application and schema are deployed when authentication permits. Report concrete blockers if deployment or token provisioning needs user input.
7. README documents authoring, environment setup, units, relationships, TypeGen, read helpers, smoke checks, and deployment commands.

## Checks to run after approval

- Install through pnpm and verify independent workspace dependency resolution.
- Root web: add/run `pnpm typecheck`, run `pnpm lint`, and `pnpm build`.
- Studio: run `pnpm --dir studio typecheck`, `pnpm --dir studio build`, schema extraction, and TypeGen. Confirm a second TypeGen run is stable.
- Validate schemas and existing documents if any; verify required numeric/URL fields and array reference rules. Add focused semantic query/ordering checks where needed, rather than tests duplicating schema declarations.
- Run the read-only live smoke script with server credentials; verify missing slug, empty collection handling, and published perspective. Test actual relationships if suitable content exists, without inventing production content for testing.
- Run both dev servers and use Playwright to verify the existing homepage and standalone Studio load, Studio navigation exposes four document types, and embedded `/studio` is gone. Report author-login limitations honestly.
- Deploy Studio application and schema to the existing Vertex project. Use a discovered existing deployment target; if none exists, use a project-specific available Studio hostname and record its URL. Add Studio localhost/hosted CORS origins only as necessary.
- Verify private ACL and inspect the web client boundary for token leaks. Review `git diff` and report actual check results.

## Exact manual test steps

1. Configure root `.env.local` using `.env.example`, including the read-only token. Configure `studio/.env.local` from its example using the same project and dataset.
2. Run `pnpm dev`; open `http://localhost:5173` and confirm the existing homepage and auth links work.
3. In another terminal run `pnpm --dir studio dev`; open `http://localhost:3333` and sign in with your Sanity account.
4. Confirm Courses, Lessons, Instructors, and Categories are listed, and Modules are not a document list.
5. Create draft instructor/category/lesson records. Verify missing required values, negative duration/counts, and invalid URLs show validation errors. Verify notes/bio use rich-text blocks.
6. In a draft course, select an instructor/category, add two modules, and reference lessons. Reorder modules/lessons and verify the order persists. Duplicate a lesson reference within the course and verify validation rejects it.
7. With real published content available, run the documented smoke command with its course, lesson, and instructor slugs; verify ordered curriculum and all reverse course references. Run with a nonexistent slug and confirm null.
8. Run `pnpm --dir studio typegen`, `pnpm typecheck`, `pnpm lint`, and both workspace builds.
9. Open the recorded deployed Studio URL and confirm the same model is available. Confirm the dataset is private in Sanity Manage.

## Approval

Approval authorizes this implementation, the existing production dataset's change to private, and deployment of the standalone Studio and schema. Content creation remains an author/manual-test action, not an automatic seed/import.
