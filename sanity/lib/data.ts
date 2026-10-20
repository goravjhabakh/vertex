import "server-only"
import { sanityFetch } from "./fetch"
import {
  CATALOG_COURSES_QUERY,
  CATEGORIES_QUERY,
  COURSE_BY_SLUG_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY,
  LESSON_BY_SLUG_QUERY,
} from "./queries"

export function getCatalogCourses(filters: { category?: string; level?: string } = {}) {
  return sanityFetch(CATALOG_COURSES_QUERY, {
    category: filters.category ?? null,
    level: filters.level ?? null,
  })
}
export function getCategories() {
  return sanityFetch(CATEGORIES_QUERY)
}
export function getCourseBySlug(slug: string) {
  return sanityFetch(COURSE_BY_SLUG_QUERY, { slug })
}
export function getLessonBySlug(slug: string) {
  return sanityFetch(LESSON_BY_SLUG_QUERY, { slug })
}
export function getInstructorBySlug(slug: string) {
  return sanityFetch(INSTRUCTOR_BY_SLUG_QUERY, { slug })
}
export function getLearnerProgress(userId: string, courseId: string) {
  return sanityFetch(LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY, { userId, courseId })
}
