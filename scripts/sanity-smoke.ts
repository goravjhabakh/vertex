import { createClient } from "@sanity/client"
import {
  CATALOG_COURSES_QUERY,
  CATEGORIES_QUERY,
  COURSE_BY_SLUG_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  LESSON_BY_SLUG_QUERY,
} from "../sanity/lib/queries"

const required = (name: string) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

const client = createClient({
  projectId: required("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: required("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-20",
  token: required("SANITY_API_READ_TOKEN"),
  perspective: "published",
  useCdn: false,
})

async function main() {
  const [courses, categories] = await Promise.all([
    client.fetch(CATALOG_COURSES_QUERY, {}),
    client.fetch(CATEGORIES_QUERY, {}),
  ])
  console.log(`Found ${courses.length} courses and ${categories.length} categories.`)
  for (const [name, get, slug] of [
    ["course", COURSE_BY_SLUG_QUERY, process.env.SANITY_SMOKE_COURSE_SLUG],
    ["lesson", LESSON_BY_SLUG_QUERY, process.env.SANITY_SMOKE_LESSON_SLUG],
    ["instructor", INSTRUCTOR_BY_SLUG_QUERY, process.env.SANITY_SMOKE_INSTRUCTOR_SLUG],
  ] as const) {
    if (slug) console.log(`${name} ${slug}:`, (await client.fetch(get, { slug })) ? "found" : "not found")
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
