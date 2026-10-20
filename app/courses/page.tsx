import { CoursesCatalogPage } from "@/components/catalog/courses-catalog-page"
import { getCatalogCourses } from "@/sanity/lib/data"

export const instant = false

export default async function CoursesPage() {
  const courses = await getCatalogCourses()

  return <CoursesCatalogPage courses={courses} />
}
