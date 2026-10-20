import { VertexHomePage } from "@/components/home/home-page"
import { getCatalogCourses } from "@/sanity/lib/data"

export const instant = false

export default async function HomePage() {
  const courses = await getCatalogCourses()

  return <VertexHomePage courses={courses} />
}
