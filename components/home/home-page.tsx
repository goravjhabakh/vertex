import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { HeroSearch } from "@/components/home/hero-search"
import {
  ArrowRightIcon,
  BellIcon,
  ClockIcon,
  DocumentIcon,
  LevelBarsIcon,
  StarIcon,
  VertexLogo,
} from "@/components/ui/icons"
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

function RisingBarsFooterGraphic() {
  const leftBars = [
    { left: "0%", width: "7.8%", height: "46%", opacity: 0.55 },
    { left: "7.8%", width: "7.6%", height: "72%", opacity: 0.72 },
    { left: "15.4%", width: "7.6%", height: "94%", opacity: 0.88 },
    { left: "23.0%", width: "7.6%", height: "68%", opacity: 0.74 },
    { left: "30.6%", width: "7.6%", height: "38%", opacity: 0.52 },
  ]

  const rightBars = [
    { left: "51.5%", width: "8.1%", height: "30%", opacity: 0.45 },
    { left: "59.6%", width: "8.1%", height: "50%", opacity: 0.65 },
    { left: "67.7%", width: "8.1%", height: "64%", opacity: 0.72 },
    { left: "75.8%", width: "8.1%", height: "78%", opacity: 0.82 },
    { left: "83.9%", width: "8.1%", height: "94%", opacity: 0.9 },
    { left: "92.0%", width: "8.0%", height: "80%", opacity: 0.75 },
  ]

  return (
    <div
      className="pointer-events-none relative mt-auto h-[180px] sm:h-[225px] w-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top soft fade mask */}
      <div className="absolute inset-0 flex items-end">
        {[...leftBars, ...rightBars].map((bar) => (
          <div
            key={bar.left}
            style={{
              left: bar.left,
              width: bar.width,
              height: bar.height,
              opacity: bar.opacity,
            }}
            className="absolute bottom-0 rounded-t-[4px] bg-gradient-to-t from-[#E86634] via-[#F4956A]/75 to-[#FCE5D8]/10 blur-[1px]"
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#FCFBF9] to-transparent" />
    </div>
  )
}

export function VertexHomePage({ courses }: { courses: CATALOG_COURSES_QUERY_RESULT }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#FCFBF9] text-[#0F172A]">
      <div className="mx-auto flex min-h-screen max-w-[1160px] flex-col">
        <div className="relative flex flex-1">
          {/* Left Diagonal Hatch Gutter */}
          <div
            aria-hidden="true"
            className="hidden w-[28px] shrink-0 border-r border-[#EAE5DF] lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(216, 206, 194, 0.35) 6px, rgba(216, 206, 194, 0.35) 7px)",
            }}
          />

          {/* Main Framed Content Column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top Navigation Bar */}
            <header className="flex h-[74px] sm:h-[78px] items-center justify-between border-b border-[#EAE5DF] px-4 sm:px-10">
              <div className="flex items-center gap-4 sm:gap-12">
                <Link href="/" aria-label="Vertex Home" className="shrink-0">
                  <VertexLogo />
                </Link>
                <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-9">
                  <Link
                    href="/courses"
                    className="whitespace-nowrap font-sans text-[14px] sm:text-[15px] font-normal text-[#1E293B] transition-colors hover:text-[#F97316]"
                  >
                    Courses
                  </Link>
                  <Link
                    href="/my-learning"
                    className="whitespace-nowrap font-sans text-[14px] sm:text-[15px] font-normal text-[#1E293B] transition-colors hover:text-[#F97316]"
                  >
                    My Learning
                  </Link>
                </nav>
              </div>

              <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#334155] transition-colors hover:bg-[#F3EFEA] hover:text-[#0F172A]"
                >
                  <BellIcon size={21} />
                </button>
                <Suspense
                  fallback={<div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#F3EFEA] animate-pulse" />}
                >
                  <NavAuthControls />
                </Suspense>
              </div>
            </header>

            {/* Hero Section */}
            <section
              className="relative border-b border-[#EAE5DF] px-6 pt-14 pb-14 text-center sm:px-10 sm:pt-[68px] sm:pb-[64px]"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(254, 215, 170, 0.18) 0%, rgba(252, 251, 249, 0) 75%)",
              }}
            >
              {/* Intelligent Learning Badge */}
              <div className="inline-flex items-center justify-center rounded-[10px] border border-[#F5D8C3] bg-[#FDF3EB] px-4 py-2 font-sans text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#E0632E]">
                INTELLIGENT LEARNING
              </div>

              {/* Hero Display Heading */}
              <h1 className="mx-auto mt-6 max-w-[680px] font-display text-[40px] font-normal leading-[1.13] tracking-[-0.015em] text-[#0F172A] sm:text-[56px] md:text-[64px]">
                Search your learning
                <br />
                in plain English.
              </h1>

              {/* Hero Subtitle */}
              <p className="mx-auto mt-6 max-w-[530px] font-sans text-[16px] font-normal leading-[1.6] text-[#64748B] sm:text-[18px]">
                Vertex understands what you want to learn and
                <br className="hidden sm:inline" /> finds the exact lessons across all your courses.
              </p>

              {/* Explore Courses CTA Button */}
              <div className="mt-8">
                <Link
                  href="/courses"
                  className="inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] bg-gradient-to-b from-[#EE7748] to-[#E3602D] px-7 font-sans text-[16px] font-medium text-white shadow-[0_10px_22px_-6px_rgba(227,96,45,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:from-[#E56B3B] hover:to-[#D45321]"
                >
                  <span>Explore Courses</span>
                  <ArrowRightIcon size={18} />
                </Link>
              </div>

              {/* Hero Search Input */}
              <div className="mt-11">
                <HeroSearch />
              </div>
            </section>

            {/* All Courses Section */}
            <section id="all-courses" className="px-6 pt-12 pb-10 sm:px-10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-[26px] font-medium tracking-[-0.01em] text-[#0F172A] sm:text-[29px]">
                  All Courses
                </h2>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-[#E56531] transition-colors hover:text-[#C2410C]"
                >
                  <span>View all courses</span>
                  <ArrowRightIcon size={17} />
                </Link>
              </div>

              {/* 3-Column Course Cards Grid */}
              <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
                {courses.slice(0, 3).map((course) => {
                  const totalDuration = course.modules.reduce(
                    (total, module) =>
                      total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.duration, 0),
                    0
                  )
                  const coverUrl = course.coverImage.asset
                    ? urlFor(course.coverImage).width(136).height(136).fit("crop").url()
                    : null

                  return (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="group block rounded-[20px] border border-[#EAE5DF] bg-[#FAF8F5] p-1.5 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DFD8CE] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08)]"
                    >
                      <article className="flex h-full flex-col justify-between rounded-[15px] border border-[#F2EFE9] bg-white p-6">
                        <div>
                          <div className="relative h-[68px] w-[68px] overflow-hidden rounded-[16px] bg-[#111111]">
                            {coverUrl ? (
                              <Image
                                src={coverUrl}
                                alt={course.coverImage.alt}
                                fill
                                sizes="68px"
                                className="object-cover"
                              />
                            ) : (
                              <span
                                className="flex h-full items-center justify-center font-display text-[30px] text-white"
                                aria-hidden="true"
                              >
                                V
                              </span>
                            )}
                          </div>
                          <h3 className="mt-6 font-display text-[22px] font-medium leading-[1.3] text-[#0F172A] transition-colors group-hover:text-[#E3602D]">
                            {course.title}
                          </h3>
                          <p className="mt-3 font-sans text-[14.5px] leading-[1.6] text-[#64748B]">{course.summary}</p>
                        </div>

                        <div className="mt-10 flex items-center justify-between gap-2 border-t border-[#F1EFEA] pt-4 font-sans text-[12px] text-[#64748B]">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <LevelBarsIcon level={course.level} size={14} />
                            <span>{course.level}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <ClockIcon size={14} className="text-[#64748B]" />
                            <span>{formatDuration(totalDuration)}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <DocumentIcon size={14} className="text-[#64748B]" />
                            <span>{course.modules.length} modules</span>
                          </span>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Weekly Courses Callout Divider */}
            <div className="mt-2 flex items-center gap-5 px-6 sm:px-10">
              <div className="h-px flex-1 bg-[#EAE5DF]" />
              <div className="inline-flex items-center gap-2.5 font-sans text-[14px] sm:text-[15px] font-normal text-[#475569]">
                <StarIcon size={20} className="shrink-0 text-[#F97316]" />
                <span>New courses and lessons added every week.</span>
              </div>
              <div className="h-px flex-1 bg-[#EAE5DF]" />
            </div>

            {/* Bottom Rising Bars Skyline */}
            <RisingBarsFooterGraphic />
          </div>

          {/* Right Diagonal Hatch Gutter */}
          <div
            aria-hidden="true"
            className="hidden w-[28px] shrink-0 border-l border-[#EAE5DF] lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(216, 206, 194, 0.35) 6px, rgba(216, 206, 194, 0.35) 7px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
