import { UserIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
export const instructor = defineType({
  name: "instructor",
  title: "Instructor",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "photo", type: "imageWithAlt", validation: (rule) => rule.required() }),
    defineField({
      name: "expertise",
      type: "array",
      of: [defineArrayMember({ type: "string", validation: (rule) => rule.required().max(160) })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "bio", type: "richText", validation: (rule) => rule.required().min(1) }),
  ],
  preview: {
    select: { title: "name", expertise: "expertise", media: "photo" },
    prepare: ({ title, expertise, media }) => ({
      title,
      subtitle: expertise?.join(", ") ?? "No expertise",
      media,
    }),
  },
})
