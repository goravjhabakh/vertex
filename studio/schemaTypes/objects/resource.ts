import { LinkIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

const httpUrl = (value: unknown) =>
  !value || (typeof value === "string" && /^https?:\/\//i.test(value)) || "Use an HTTP(S) URL."
export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Code", value: "code" },
          { title: "Download", value: "download" },
          { title: "Tool", value: "tool" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(300) }),
    defineField({ name: "url", type: "url", validation: (rule) => rule.required().custom(httpUrl) }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
})
