import { CheckmarkCircleIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"
export const learningOutcome = defineType({
  name: "learningOutcome",
  title: "Learning outcome",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({ name: "icon", type: "string", description: "An icon identifier used by the website." }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(300) }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
})
