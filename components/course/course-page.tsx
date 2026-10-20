import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowRightIcon,
  BellIcon,
  BookmarkIcon,
  ClockIcon,
  DocumentIcon,
  LevelBarsIcon,
  UserIcon,
  VertexLogo,
} from "@/components/ui/icons"
import { NavAuthControls } from "@/components/ui/nav-auth-controls"
import { urlFor } from "@/sanity/lib/image"
import type { COURSE_BY_SLUG_QUERY_RESULT, LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY_RESULT } from "@/sanity/types"
import { CourseCurriculum } from "./course-curriculum"

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>

function formatDuration(seconds: number) {
  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

function formatStudentCount(count: number) {
  if (count < 1000) return count.toString()
  return `${(count / 1000).toFixed(count >= 10_000 ? 1 : 1).replace(/\.0$/, "")}k`
}

function OutcomeIcon({ name }: { name: string | null }) {
  const className = "h-12 w-12 shrink-0 text-[#DF6537] sm:h-14 sm:w-14"

  if (name === "layers") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="m24 6 18 10-18 10L6 16 24 6Z" stroke="currentColor" strokeWidth="2" />
        <path d="m6 24 18 10 18-10M6 32l18 10 18-10" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (name === "workflow") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <rect x="7" y="7" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="29" y="29" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M19 13h8a5 5 0 0 1 5 5v11M13 19v11a5 5 0 0 0 5 5h11" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (name === "gauge") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M7 35a17 17 0 1 1 34 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m24 25 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="25" r="3" fill="currentColor" />
        <path
          d="M12 31h.01M17 20h.01M31 20h.01M36 31h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 38h20a8 8 0 0 0 1.5-15.86A13 13 0 0 0 12 18.5 10 10 0 0 0 15 38Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function CoursePage({
  course,
  progress,
  isAuthenticated,
}: {
  course: Course
  progress: LEARNER_PROGRESS_BY_USER_AND_COURSE_QUERY_RESULT
  isAuthenticated: boolean
}) {
  const totalDuration = course.modules.reduce(
    (total, module) => total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.lesson.duration, 0),
    0
  )
  const coverUrl = course.coverImage.asset ? urlFor(course.coverImage).width(960).height(960).fit("crop").url() : null
  const lessons = course.modules.flatMap((module) => module.lessons.map(({ lesson }) => lesson))
  const completedLessonIds = progress?.completedLessonIds ?? []
  const completedLessonIdSet = new Set(completedLessonIds)
  const progressPercent = lessons.length ? Math.round((completedLessonIds.length / lessons.length) * 100) : 0
  const firstLesson = course.modules[0]?.lessons[0]?.lesson
  const resumeLesson = progress?.resumeLessonId
    ? lessons.find((lesson) => lesson._id === progress.resumeLessonId)
    : undefined
  const continueLesson =
    resumeLesson && !completedLessonIdSet.has(resumeLesson._id)
      ? resumeLesson
      : (lessons.find((lesson) => !completedLessonIdSet.has(lesson._id)) ?? firstLesson)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FCFBF9] text-[#121212]">
      <div className="mx-auto flex min-h-screen max-w-[1160px]">
        <aside
          aria-hidden="true"
          className="hidden w-[28px] shrink-0 border-r border-[#EAE5DF] lg:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(216, 206, 194, 0.35) 6px, rgba(216, 206, 194, 0.35) 7px)",
          }}
        />

        <div className="min-w-0 flex-1 pb-10">
          <header className="flex h-[78px] items-center justify-between border-b border-[#EAE5DF] px-5 sm:px-10">
            <div className="flex items-center gap-6 sm:gap-12">
              <Link href="/" aria-label="Vertex home" className="shrink-0">
                <VertexLogo />
              </Link>
              <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-9">
                <Link
                  href="/courses"
                  className="font-display text-[15px] text-[#171717] transition-colors hover:text-[#DF6537]"
                >
                  Courses
                </Link>
                <Link
                  href="/my-learning"
                  className="font-display text-[15px] text-[#171717] transition-colors hover:text-[#DF6537]"
                >
                  My Learning
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="inline-flex h-10 w-10 items-center justify-center text-[#59616A] hover:text-[#171717]"
              >
                <BellIcon size={21} />
              </button>
              <Suspense fallback={<div className="h-10 w-10 animate-pulse rounded-full bg-[#F3EFEA]" />}>
                <NavAuthControls />
              </Suspense>
            </div>
          </header>

          <main className="px-5 pt-8 sm:px-10 sm:pt-9">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 font-display text-[15px] text-[#697078]"
            >
              <Link href="/courses" className="transition-colors hover:text-[#171717]">
                All Courses
              </Link>
              <span aria-hidden="true" className="text-[#92979B]">
                ›
              </span>
              <span>{course.title}</span>
            </nav>

            <section className="mt-8 grid items-center gap-9 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-[62px]">
              <div className="relative aspect-square overflow-hidden rounded-[15px] bg-[#101112] shadow-[0_8px_20px_-12px_rgba(15,23,42,0.25)]">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={course.coverImage.alt}
                    fill
                    sizes="(min-width: 1024px) 340px, 80vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_35%_30%,#36393b,transparent_45%),linear-gradient(135deg,#131415,#030303)]">
                    <span className="font-display text-7xl text-white">V</span>
                  </div>
                )}
              </div>

              <div className="max-w-[600px]">
                {course.popular && (
                  <span className="inline-flex rounded-[6px] bg-[#FFF0EB] px-3 py-1.5 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#DD663D]">
                    POPULAR
                  </span>
                )}
                <h1 className="mt-5 font-display text-[42px] font-medium leading-[1.04] tracking-[-0.035em] text-[#0C0C0C] sm:text-[54px]">
                  {course.title}
                </h1>
                <p className="mt-5 max-w-[580px] font-display text-[18px] leading-[1.68] text-[#697078] sm:text-[19px]">
                  {course.summary}
                </p>

                <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-display text-[14px] text-[#697078]">
                  <div className="inline-flex items-center gap-2">
                    <LevelBarsIcon level={course.level} size={17} />
                    <dt className="sr-only">Level</dt>
                    <dd>{course.level}</dd>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <ClockIcon size={18} />
                    <dt className="sr-only">Duration</dt>
                    <dd>{formatDuration(totalDuration)}</dd>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <DocumentIcon size={17} />
                    <dt className="sr-only">Modules</dt>
                    <dd>{course.modules.length} modules</dd>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <UserIcon size={18} />
                    <dt className="sr-only">Students</dt>
                    <dd>{formatStudentCount(course.studentCount)} students</dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-4">
                  {continueLesson && (
                    <Link
                      href={`/lessons/${continueLesson.slug}`}
                      className="inline-flex h-[54px] items-center gap-6 rounded-[9px] bg-gradient-to-b from-[#E97950] to-[#DC613A] px-6 font-display text-[16px] text-white shadow-[0_4px_10px_rgba(192,76,39,0.25)] transition hover:from-[#DF6B43] hover:to-[#CC5430]"
                    >
                      Continue Learning <ArrowRightIcon size={20} />
                    </Link>
                  )}
                  <button
                    type="button"
                    className="inline-flex h-[54px] items-center gap-3 rounded-[9px] border border-[#E2D9D1] px-5 font-display text-[16px] text-[#171717] transition hover:bg-[#FAF7F3]"
                  >
                    <BookmarkIcon size={19} /> Bookmark
                  </button>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="learn-heading"
              className="mt-12 rounded-[13px] border border-[#EAE3DC] p-6 sm:mt-16 sm:p-7"
            >
              <h2
                id="learn-heading"
                className="font-display text-[24px] font-medium tracking-[-0.015em] text-[#171717]"
              >
                What you’ll learn
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {course.learningOutcomes.map((outcome) => (
                  <article
                    key={outcome._key}
                    className="flex min-h-[136px] items-center gap-5 rounded-[9px] border border-[#EAE3DC] px-5 py-5 sm:px-7"
                  >
                    <OutcomeIcon name={outcome.icon} />
                    <div>
                      <h3 className="font-display text-[18px] font-medium leading-6 text-[#171717]">{outcome.title}</h3>
                      <p className="mt-2 font-display text-[15px] leading-[1.55] text-[#697078]">
                        {outcome.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <CourseCurriculum
              modules={course.modules}
              courseId={course._id}
              completedLessonIds={completedLessonIds}
              isAuthenticated={isAuthenticated}
            />
          </main>
        </div>

        <aside
          aria-hidden="true"
          className="hidden w-[28px] shrink-0 border-l border-[#EAE5DF] lg:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(216, 206, 194, 0.35) 6px, rgba(216, 206, 194, 0.35) 7px)",
          }}
        />
      </div>

      <aside
        aria-label="Course progress"
        className="fixed inset-x-5 bottom-4 z-20 mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-5 rounded-[10px] border border-[#EAE3DC] bg-[#FEFDFC] px-5 py-4 shadow-[0_10px_24px_rgba(80,54,36,0.1)] sm:inset-x-10 sm:px-7"
      >
        {isAuthenticated ? (
          <>
            <div className="min-w-[210px]">
              <p className="font-display text-[13px] text-[#697078]">Your Progress</p>
              <p className="mt-1 font-display text-[15px] text-[#171717]">
                <strong className="font-medium">{progressPercent}%</strong> complete
              </p>
            </div>
            <div className="h-2 min-w-[140px] flex-1 rounded-full bg-[#E5E2E0] sm:max-w-[280px]">
              <div
                className="h-full rounded-full bg-[#DF6A45] transition-[width]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {continueLesson && (
              <Link
                href={`/lessons/${continueLesson.slug}`}
                className="inline-flex h-[54px] items-center gap-6 rounded-[9px] bg-gradient-to-b from-[#E97950] to-[#DC613A] px-6 font-display text-[16px] text-white shadow-[0_4px_10px_rgba(192,76,39,0.25)]"
              >
                Continue Learning <ArrowRightIcon size={20} />
              </Link>
            )}
          </>
        ) : (
          <>
            <div>
              <p className="font-display text-[15px] text-[#171717]">Sign in to track your progress</p>
              <p className="mt-1 font-display text-[13px] text-[#697078]">
                Completed lessons sync to your learner account.
              </p>
            </div>
            <Link
              href="/sign-in"
              className="inline-flex h-[48px] items-center rounded-[9px] bg-gradient-to-b from-[#E97950] to-[#DC613A] px-6 font-display text-[16px] text-white shadow-[0_4px_10px_rgba(192,76,39,0.25)]"
            >
              Sign In
            </Link>
          </>
        )}
      </aside>
    </div>
  )
}
