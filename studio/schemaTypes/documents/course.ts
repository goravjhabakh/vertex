import { BookIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "curriculum", title: "Curriculum" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "overview", validation: (rule) => rule.required().max(140) }),
    defineField({
      name: "slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      group: "overview",
      rows: 4,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      type: "string",
      group: "overview",
      options: { list: ["Beginner", "Intermediate", "Advanced"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "price", type: "price", group: "overview", validation: (rule) => rule.required() }),
    defineField({ name: "popular", type: "boolean", group: "overview", initialValue: false }),
    defineField({
      name: "studentCount",
      title: "Student count",
      type: "number",
      group: "overview",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "learningOutcomes",
      title: "What you'll learn",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "learningOutcome" })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "instructor",
      type: "reference",
      group: "overview",
      to: [{ type: "instructor" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      group: "overview",
      to: [{ type: "category" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules",
      type: "array",
      group: "curriculum",
      of: [defineArrayMember({ type: "courseModule" })],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((modules) => {
            const ids =
              (modules as Array<{ lessons?: Array<{ _ref?: string }> }> | undefined)
                ?.flatMap((module) => module.lessons ?? [])
                .map((lesson) => lesson._ref)
                .filter(Boolean) ?? []
            return new Set(ids).size === ids.length || "A lesson can appear only once in a course."
          }),
    }),
  ],
  preview: { select: { title: "title", subtitle: "level", media: "coverImage" } },
})
