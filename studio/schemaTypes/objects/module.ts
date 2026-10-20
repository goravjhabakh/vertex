import { FolderIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
export const module = defineType({
  name: "courseModule",
  title: "Module",
  type: "object",
  icon: FolderIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required().max(500) }),
    defineField({
      name: "lessons",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "lesson" }], options: { disableNew: true }, weak: false }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((lessons) => {
            const ids =
              (lessons as Array<{ _ref?: string }> | undefined)?.map((lesson) => lesson._ref).filter(Boolean) ?? []
            return new Set(ids).size === ids.length || "A lesson can appear only once in a course."
          }),
    }),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
})
