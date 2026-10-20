import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { CoursePage } from "@/components/course/course-page"
import { getCourseBySlug, getLearnerProgress } from "@/sanity/lib/data"

export const instant = false

export default async function CourseDetailPage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const { isAuthenticated, userId } = await auth()
  const progress = isAuthenticated && userId ? await getLearnerProgress(userId, course._id) : null

  return <CoursePage course={course} progress={progress} isAuthenticated={isAuthenticated} />
}
