import { defineQuery } from "next-sanity"

const image = `asset->{_id,url,metadata{dimensions,lqip}},alt,crop,hotspot`
const instructor = `"instructor": instructor->{_id,name,"slug":slug.current,expertise,photo{${image}}}`
const category = `"category": category->{_id,title,"slug":slug.current,description}`
const lessonCard = `_key,"lesson": @->{_id,title,"slug":slug.current,duration,freePreview,thumbnail{${image}}}`

export const CATALOG_COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current) && (!defined($category) || category->slug.current == $category) && (!defined($level) || level == $level)]
  | order(popular desc, title asc) {_id,title,"slug":slug.current,summary,level,price,popular,studentCount,coverImage{${image}},${instructor},${category},modules[]{_key,"lessons":lessons[]->{duration}}}
`)
export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && defined(slug.current)] | order(title asc) {_id,title,"slug":slug.current,description}`
)
export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{_id,title,"slug":slug.current,summary,level,price,popular,studentCount,coverImage{${image}},learningOutcomes[]{_key,icon,title,description},${instructor},${category},modules[]{_key,title,summary,"lessons":lessons[]{${lessonCard}}}}
`)
export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{_id,title,"slug":slug.current,videoUrl,thumbnail{${image}},duration,freePreview,studentCount,notes,keyPoints,proTip,resources[]{_key,type,title,description,url},"courses": *[_type == "course" && references(^._id)]{_id,title,"slug":slug.current,coverImage{${image}},${instructor},${category},modules[]{_key,title,"lessons":lessons[]{_key,"lessonId":@._ref}}}}
`)
export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{_id,name,"slug":slug.current,expertise,photo{${image}},bio,"courses": *[_type == "course" && instructor._ref == ^._id] | order(title asc){_id,title,"slug":slug.current,summary,level,coverImage{${image}},${category}}}
`)
export const LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY = defineQuery(`
  *[_type == "learnerProgress" && userId == $userId && course._ref == $courseId][0]{_id,"completedLessonIds":completedLessons[]._ref,"resumeLessonId":resumeLesson._ref,resumePosition}
`)
export const COURSE_LESSON_IDS_QUERY = defineQuery(`
  *[_type == "course" && _id == $courseId][0]{_id,"lessonIds":modules[].lessons[]._ref}
`)
