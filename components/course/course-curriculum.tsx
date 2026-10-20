"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDownIcon } from "@/components/ui/icons"
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity/types"

type CourseModules = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>["modules"]

interface CourseCurriculumProps {
  modules: CourseModules
  courseId: string
  completedLessonIds: string[]
  isAuthenticated: boolean
}

function formatDuration(seconds: number) {
  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

export function CourseCurriculum({
  modules,
  courseId,
  completedLessonIds: initialCompletedLessonIds,
  isAuthenticated,
}: CourseCurriculumProps) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedModuleKey, setExpandedModuleKey] = useState<string | null>(null)
  const [completedLessonIds, setCompletedLessonIds] = useState(initialCompletedLessonIds)
  const [pendingLessonId, setPendingLessonId] = useState<string | null>(null)
  const [progressError, setProgressError] = useState<string | null>(null)
  const visibleModules = isExpanded ? modules : modules.slice(0, 6)
  const totalDuration = modules.reduce(
    (total, module) => total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.lesson.duration, 0),
    0
  )

  async function toggleLessonCompletion(lessonId: string) {
    const completed = !completedLessonIds.includes(lessonId)
    setPendingLessonId(lessonId)
    setProgressError(null)

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, completed }),
      })
      if (!response.ok) throw new Error("Unable to save lesson progress")

      const progress = (await response.json()) as { completedLessonIds: string[] }
      setCompletedLessonIds(progress.completedLessonIds)
      router.refresh()
    } catch {
      setProgressError("Unable to save progress. Please try again.")
    } finally {
      setPendingLessonId(null)
    }
  }

  return (
    <section aria-labelledby="course-content-heading" className="mt-8 sm:mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <h2
          id="course-content-heading"
          className="font-display text-[24px] font-medium tracking-[-0.015em] text-[#111111] sm:text-[27px]"
        >
          Course Content
        </h2>
        <p className="font-display text-[14px] text-[#697078]">
          {modules.length} modules <span className="mx-1.5">•</span> {formatDuration(totalDuration)}
        </p>
      </div>

      <ol className="mt-4 overflow-hidden rounded-[12px] border border-[#EAE3DC] bg-[#FEFDFC]">
        {visibleModules.map((module, index) => {
          const moduleDuration = module.lessons.reduce((total, lesson) => total + lesson.lesson.duration, 0)

          return (
            <li key={module._key} className="border-[#EAE3DC] [&:not(:last-child)]:border-b">
              <button
                type="button"
                aria-expanded={expandedModuleKey === module._key}
                aria-controls={`module-lessons-${module._key}`}
                onClick={() => setExpandedModuleKey((current) => (current === module._key ? null : module._key))}
                className="grid w-full grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#FAF7F3] sm:grid-cols-[52px_minmax(0,1fr)_70px_28px] sm:px-5 sm:py-3"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EEE7E0] font-display text-[17px] text-[#222222]">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[16px] font-medium leading-5 text-[#171717]">
                    {module.title}
                  </span>
                  <span className="mt-0.5 block line-clamp-2 font-display text-[13px] leading-[1.35] text-[#697078] sm:line-clamp-1">
                    {module.summary}
                  </span>
                </span>
                <span className="hidden whitespace-nowrap font-display text-[14px] text-[#697078] sm:block">
                  {formatDuration(moduleDuration)}
                </span>
                <ChevronDownIcon
                  size={18}
                  className={expandedModuleKey === module._key ? "rotate-180 text-[#59616A]" : "text-[#59616A]"}
                />
              </button>

              {expandedModuleKey === module._key && (
                <ol
                  id={`module-lessons-${module._key}`}
                  className="border-t border-[#EEE7E0] bg-[#FCFAF7] px-4 py-2 sm:px-5"
                >
                  {module.lessons.map(({ _key, lesson }, lessonIndex) => (
                    <li key={_key} className="border-b border-[#EEE7E0] last:border-b-0">
                      <Link
                        href={`/lessons/${lesson.slug}`}
                        className="flex items-center justify-between gap-4 px-2 py-3 font-sans transition-colors hover:text-[#DF6537]"
                      >
                        <span className="min-w-0">
                          <span className="block text-[12px] font-medium text-[#8A827A]">
                            Lesson {index + 1}.{lessonIndex + 1}
                          </span>
                          <span className="mt-0.5 block truncate text-[14px] font-medium text-[#1F2937]">
                            {lesson.title}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-[12px] text-[#697078]">
                          {lesson.freePreview && (
                            <span className="rounded bg-[#FFF0EB] px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-[#DD663D]">
                              FREE
                            </span>
                          )}
                          {formatDuration(lesson.duration)}
                        </span>
                      </Link>
                      {isAuthenticated ? (
                        <button
                          type="button"
                          disabled={pendingLessonId === lesson._id}
                          onClick={() => toggleLessonCompletion(lesson._id)}
                          className="mb-3 ml-2 rounded border border-[#E2D9D1] px-2 py-1 text-[11px] font-medium text-[#5D5249] transition hover:border-[#DF6537] hover:text-[#DF6537] disabled:cursor-wait disabled:opacity-60"
                        >
                          {completedLessonIds.includes(lesson._id) ? "Completed" : "Mark complete"}
                        </button>
                      ) : (
                        <Link
                          href="/sign-in"
                          className="mb-3 ml-2 inline-block text-[11px] font-medium text-[#DF6537] hover:text-[#C9502D]"
                        >
                          Sign in to track
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          )
        })}
      </ol>

      {modules.length > 6 && (
        <div className="relative z-10 -mt-px flex justify-center">
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="inline-flex h-11 items-center gap-5 rounded-[8px] border border-[#EAE3DC] bg-[#FEFDFC] px-5 font-display text-[14px] text-[#161616] transition-colors hover:bg-[#FAF7F3]"
          >
            {isExpanded ? "Show fewer modules" : `Show all ${modules.length} modules`}
            <ChevronDownIcon size={17} className={isExpanded ? "rotate-180" : ""} />
          </button>
        </div>
      )}
      {progressError && (
        <p role="alert" className="mt-3 text-center font-sans text-[13px] text-[#C9502D]">
          {progressError}
        </p>
      )}
    </section>
  )
}
