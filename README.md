# Vertex

Vertex has independent web and Sanity Studio workspaces. Course content is authored in the standalone Studio; the Next.js app only reads published content on the server.

## Getting Started

Configure `.env.local` from `.env.example`; `SANITY_API_READ_TOKEN` must be a read-only token for the private dataset. Configure `studio/.env.local` from `studio/.env.example`.

Run the web app:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173). Run Studio independently with `pnpm --dir studio dev` and open [http://localhost:3333](http://localhost:3333).

## Content model

- Courses contain ordered, embedded modules; modules contain ordered lesson references. Module and lesson numbers are derived from this order.
- Lessons, instructors, and categories are reusable documents. A lesson’s parent courses are resolved by reverse reference; lessons never store their parent course.
- Durations are seconds. Price stores a decimal major-unit amount and ISO currency code. Images require alternative text.
- Notes and bios are Portable Text. Resources and video URLs require HTTP(S); lesson URLs accept YouTube, Vimeo, and Bunny hosts.

Run `pnpm --dir studio typegen` after schema/query changes. It extracts `schema.json` (ignored) and generates committed `sanity/types.ts`. Run `pnpm sanity:smoke` to validate private published reads; optionally set `SANITY_SMOKE_COURSE_SLUG`, `SANITY_SMOKE_LESSON_SLUG`, and `SANITY_SMOKE_INSTRUCTOR_SLUG`.

Use `pnpm --dir studio build` and `pnpm --dir studio deploy` to build and deploy the Studio. Do not use the removed `/studio` application route.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
