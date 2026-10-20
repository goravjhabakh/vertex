import { CheckmarkCircleIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const learnerProgress = defineType({
  name: "learnerProgress",
  title: "Learner progress",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "userId",
      title: "Clerk user ID",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      type: "reference",
      to: [{ type: "course" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completedLessons",
      title: "Completed lessons",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }], options: { disableNew: true } })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "resumeLesson",
      title: "Resume lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      options: { disableNew: true },
    }),
    defineField({
      name: "resumePosition",
      title: "Resume position (seconds)",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: "userId", course: "course.title" },
    prepare: ({ title, course }) => ({ title: title ?? "Unknown learner", subtitle: course ?? "No course" }),
  },
})
