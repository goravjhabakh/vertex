import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

const projectId = required("NEXT_PUBLIC_SANITY_PROJECT_ID")
const dataset = required("NEXT_PUBLIC_SANITY_DATASET")
const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}
