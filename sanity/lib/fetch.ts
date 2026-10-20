import "server-only"
import type { QueryParams } from "@sanity/client"
import { client } from "./client"

export async function sanityFetch<QueryString extends string>(query: QueryString, params: QueryParams = {}) {
  return client.fetch(query, params, { cache: "no-store" })
}
