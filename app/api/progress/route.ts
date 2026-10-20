import { auth } from "@clerk/nextjs/server"
import { writeToken } from "@/sanity/env"
import { client } from "@/sanity/lib/client"
import { COURSE_LESSON_IDS_QUERY, LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY } from "@/sanity/lib/queries"

type ProgressRequest = {
  courseId?: unknown
  lessonId?: unknown
  completed?: unknown
}

export async function POST(request: Request) {
  const { isAuthenticated, userId } = await auth()
  if (!isAuthenticated || !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!writeToken) {
    return Response.json({ error: "Progress storage is not configured" }, { status: 503 })
  }

  let body: ProgressRequest
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (typeof body.courseId !== "string" || typeof body.lessonId !== "string" || typeof body.completed !== "boolean") {
    return Response.json({ error: "Invalid progress payload" }, { status: 400 })
  }

  const course = await client.fetch(COURSE_LESSON_IDS_QUERY, { courseId: body.courseId })
  if (!course || !course.lessonIds.includes(body.lessonId)) {
    return Response.json({ error: "Lesson does not belong to this course" }, { status: 404 })
  }

  const existing = await client.fetch(LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY, { userId, courseId: body.courseId })
  const completedLessonIds = new Set(existing?.completedLessonIds ?? [])
  if (body.completed) {
    completedLessonIds.add(body.lessonId)
  } else {
    completedLessonIds.delete(body.lessonId)
  }

  const progressDocument = {
    userId,
    course: { _type: "reference" as const, _ref: body.courseId },
    completedLessons: [...completedLessonIds].map((lessonId) => ({ _type: "reference" as const, _ref: lessonId })),
  }
  const writeClient = client.withConfig({ token: writeToken })
  if (existing) {
    await writeClient.patch(existing._id).set(progressDocument).commit()
  } else {
    await writeClient.create({ _type: "learnerProgress", ...progressDocument })
  }

  return Response.json({ completedLessonIds: [...completedLessonIds] })
}
