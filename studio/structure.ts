import type { StructureResolver } from "sanity/structure"

const types = ["course", "lesson", "instructor", "category"]
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Vertex content")
    .items(types.map((type) => S.documentTypeListItem(type)))
