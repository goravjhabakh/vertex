import { PlayIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

const supportedVideoUrl = (value: unknown) => {
  if (typeof value !== "string" || !value) return "A video URL is required."
  try {
    const host = new URL(value).hostname.toLowerCase()
    return (
      [
        "youtube.com",
        "www.youtube.com",
        "youtu.be",
        "vimeo.com",
        "www.vimeo.com",
        "bunny.net",
        "iframe.mediadelivery.net",
      ].includes(host) || "Use a YouTube, Vimeo, or Bunny video URL."
    )
  } catch {
    return "Use a valid HTTPS video URL."
  }
}

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  icon: PlayIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "video", title: "Video" },
    { name: "resources", title: "Resources" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (rule) => rule.required().max(140) }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "notes", type: "richText", group: "content", validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "keyPoints",
      title: "Key points",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "proTip",
      title: "Pro tip",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "video",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https"] })
          .custom(supportedVideoUrl),
    }),
    defineField({ name: "thumbnail", type: "imageWithAlt", group: "video", validation: (rule) => rule.required() }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
      group: "video",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({ name: "freePreview", title: "Free preview", type: "boolean", group: "video", initialValue: false }),
    defineField({
      name: "studentCount",
      title: "Student count",
      type: "number",
      group: "video",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "resources",
      type: "array",
      group: "resources",
      of: [defineArrayMember({ type: "resource" })],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "duration", media: "thumbnail" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `${Math.round(subtitle / 60)} min` : "No duration",
      media,
    }),
  },
})
