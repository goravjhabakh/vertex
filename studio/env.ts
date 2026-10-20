export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2026-10-20"
export const projectId = required("SANITY_STUDIO_PROJECT_ID")
export const dataset = required("SANITY_STUDIO_DATASET")

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}
