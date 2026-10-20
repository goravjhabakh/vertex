import type { SchemaTypeDefinition } from "sanity"
import { category } from "./documents/category"
import { course } from "./documents/course"
import { instructor } from "./documents/instructor"
import { lesson } from "./documents/lesson"
import { imageWithAlt } from "./objects/image"
import { learningOutcome } from "./objects/learning-outcome"
import { module } from "./objects/module"
import { price } from "./objects/price"
import { resource } from "./objects/resource"
import { richText } from "./objects/rich-text"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, course, instructor, lesson, imageWithAlt, learningOutcome, module, price, resource, richText],
}
