import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { BellIcon, ClockIcon, DocumentIcon, LevelBarsIcon, VertexLogo } from "@/components/ui/icons"
import { NavAuthControls } from "@/components/ui/nav-auth-controls"
import { urlFor } from "@/sanity/lib/image"
import type { CATALOG_COURSES_QUERY_RESULT } from "@/sanity/types"

function formatDuration(seconds: number) {
  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

export function CoursesCatalogPage({ courses }: { courses: CATALOG_COURSES_QUERY_RESULT }) {
  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#0F172A]">
      <div className="mx-auto min-h-screen max-w-[1160px] border-x border-[#EAE5DF]">
        <header className="flex h-[74px] items-center justify-between border-b border-[#EAE5DF] px-5 sm:h-[78px] sm:px-10">
          <div className="flex items-center gap-6 sm:gap-12">
            <Link href="/" aria-label="Vertex home" className="shrink-0">
              <VertexLogo />
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-9">
              <Link href="/courses" className="font-display text-[15px] text-[#DF6537]">
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

        <main className="px-5 py-10 sm:px-10 sm:py-14">
          <p className="font-sans text-[11px] font-semibold tracking-[0.15em] text-[#DF6537]">COURSE CATALOG</p>
          <h1 className="mt-3 font-display text-[40px] font-medium tracking-[-0.025em] text-[#0F172A] sm:text-[52px]">
            All Courses
          </h1>
          <p className="mt-4 max-w-[580px] font-sans text-[16px] leading-7 text-[#64748B]">
            Explore every course in the Vertex learning library.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const totalDuration = course.modules.reduce(
                (total, module) =>
                  total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.duration, 0),
                0
              )
              const coverUrl = course.coverImage.asset
                ? urlFor(course.coverImage).width(720).height(480).fit("crop").url()
                : null

              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group block rounded-[20px] border border-[#EAE5DF] bg-[#FAF8F5] p-1.5 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DFD8CE] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08)]"
                >
                  <article className="flex h-full flex-col rounded-[15px] border border-[#F2EFE9] bg-white p-6">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-[11px] bg-[#111111]">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={course.coverImage.alt}
                          fill
                          sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, 90vw"
                          className="object-cover"
                        />
                      ) : (
                        <span
                          className="flex h-full items-center justify-center font-display text-5xl text-white"
                          aria-hidden="true"
                        >
                          V
                        </span>
                      )}
                    </div>
                    <h2 className="mt-6 font-display text-[23px] font-medium leading-[1.3] text-[#0F172A] transition-colors group-hover:text-[#E3602D]">
                      {course.title}
                    </h2>
                    <p className="mt-3 flex-1 font-sans text-[14.5px] leading-[1.6] text-[#64748B]">{course.summary}</p>
                    <div className="mt-8 flex items-center justify-between gap-2 border-t border-[#F1EFEA] pt-4 font-sans text-[12px] text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <LevelBarsIcon level={course.level} size={14} />
                        {course.level}
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <ClockIcon size={14} />
                        {formatDuration(totalDuration)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <DocumentIcon size={14} />
                        {course.modules.length} modules
                      </span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
