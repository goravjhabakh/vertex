import Link from "next/link"
import type { ReactNode } from "react"
import { HeroSearch } from "@/components/home/hero-search"
import {
  ArrowRightIcon,
  BellIcon,
  ClockIcon,
  DockerLogoMark,
  DocumentIcon,
  LevelBarsIcon,
  NextjsLogoMark,
  StarIcon,
  TypeScriptLogoMark,
  VertexLogo,
} from "@/components/ui/icons"

interface HomeCourse {
  slug: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  moduleCount: number
  logo: ReactNode
}

const HOME_COURSES: HomeCourse[] = [
  {
    slug: "nextjs-for-production",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: 12,
    logo: <NextjsLogoMark size={68} />,
  },
  {
    slug: "docker-essentials",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    moduleCount: 8,
    logo: <DockerLogoMark size={72} />,
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    moduleCount: 10,
    logo: <TypeScriptLogoMark size={68} />,
  },
]

function UserAvatar() {
  return (
    <div
      role="img"
      className="relative h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full border border-[#E5E0D8] bg-[#E8E2DC] shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
      aria-label="User profile"
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect width="80" height="80" fill="url(#avatar_bg)" />
        {/* Back hair */}
        <path d="M18 44C18 22 30 13 43 13C56 13 64 23 65 44C66 57 67 68 67 76H16C16 66 18 55 18 44Z" fill="#1F1614" />
        {/* Shoulders / dark top */}
        <path d="M12 80C14 66 25 60 40 60C55 60 66 66 68 80H12Z" fill="#18181B" />
        {/* Neck & collarbone */}
        <path d="M33 50H47V64C47 67.5 43.8 70 40 70C36.2 70 33 67.5 33 64V50Z" fill="#DFA689" />
        <path d="M33 52C35 55.5 45 55.5 47 52V57C44 59 36 59 33 57V52Z" fill="#C98B6E" opacity="0.55" />
        {/* Face */}
        <path
          d="M25.5 35C25.5 23.5 32 17.5 40.5 17.5C49 17.5 55 23.5 55 35C55 46.2 48.2 54.5 40.5 54.5C32.8 54.5 25.5 46.2 25.5 35Z"
          fill="url(#skin_grad)"
        />
        {/* Soft cheek blush */}
        <ellipse cx="31.5" cy="40.5" rx="3.8" ry="2.2" fill="#E0826D" opacity="0.35" />
        <ellipse cx="49" cy="40.5" rx="3.8" ry="2.2" fill="#E0826D" opacity="0.35" />
        {/* Eyebrows */}
        <path d="M30 31.2C32 29.8 35.2 29.8 37 30.8" stroke="#2A1B17" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M43.8 30.8C45.8 29.8 48.8 29.8 50.8 31.2" stroke="#2A1B17" strokeWidth="1.6" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="33.8" cy="34.5" rx="2.1" ry="1.4" fill="#1F1614" />
        <ellipse cx="47" cy="34.5" rx="2.1" ry="1.4" fill="#1F1614" />
        <circle cx="34.4" cy="34.1" r="0.5" fill="#FFFFFF" />
        <circle cx="47.6" cy="34.1" r="0.5" fill="#FFFFFF" />
        {/* Nose */}
        <path
          d="M40.5 34.5V41.2C39.4 41.8 38.6 41.6 38.2 41"
          stroke="#C28164"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Smile */}
        <path d="M35.2 45.2C37.2 47.4 43.2 47.4 45.2 45.2" stroke="#AD5348" strokeWidth="1.8" strokeLinecap="round" />
        {/* Front hair parting */}
        <path
          d="M24 38C24 25 32 18 41 18C44 18 47 19.5 49 22C46 19.5 39 20 33 25C28 29 26 35 25.5 41L24 38Z"
          fill="#1A1110"
        />
        <path
          d="M42 15C51 15 58 22 59 36C60 47 61 59 61 68H54C55 56 55 44 53 33C51 24 46 19 41 18L42 15Z"
          fill="#1A1110"
        />
        <defs>
          <linearGradient id="avatar_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAE5DF" />
            <stop offset="1" stopColor="#D6CFC7" />
          </linearGradient>
          <linearGradient id="skin_grad" x1="28" y1="18" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2C2A8" />
            <stop offset="1" stopColor="#DDA082" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
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

export function VertexHomePage() {
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
                    href="#all-courses"
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

              <div className="flex shrink-0 items-center gap-2.5 sm:gap-5">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#334155] transition-colors hover:bg-[#F3EFEA] hover:text-[#0F172A]"
                >
                  <BellIcon size={21} />
                </button>
                <UserAvatar />
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
                  href="#all-courses"
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
                  href="#all-courses"
                  className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-[#E56531] transition-colors hover:text-[#C2410C]"
                >
                  <span>View all courses</span>
                  <ArrowRightIcon size={17} />
                </Link>
              </div>

              {/* 3-Column Course Cards Grid */}
              <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
                {HOME_COURSES.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="group block rounded-[20px] border border-[#EAE5DF] bg-[#FAF8F5] p-1.5 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DFD8CE] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08)]"
                  >
                    <article className="flex h-full flex-col justify-between rounded-[15px] border border-[#F2EFE9] bg-white p-6">
                      <div>
                        <div className="inline-flex">{course.logo}</div>
                        <h3 className="mt-6 font-display text-[22px] font-medium leading-[1.3] text-[#0F172A] transition-colors group-hover:text-[#E3602D]">
                          {course.title}
                        </h3>
                        <p className="mt-3 font-sans text-[14.5px] leading-[1.6] text-[#64748B]">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-10 flex items-center justify-between gap-2 border-t border-[#F1EFEA] pt-4 font-sans text-[12px] text-[#64748B]">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <LevelBarsIcon level={course.level} size={14} />
                          <span>{course.level}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <ClockIcon size={14} className="text-[#64748B]" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <DocumentIcon size={14} className="text-[#64748B]" />
                          <span>{course.moduleCount} modules</span>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
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
