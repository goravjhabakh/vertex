import { Badge, ProgressBar, StatusIndicator } from "@/components/ui/badge"
import { Button, TertiaryActionButton, TextVideoButton } from "@/components/ui/button"
import { CourseCard, LessonResultCard, ResourceCard, VideoLessonCard } from "@/components/ui/cards"
import {
  AccessiblePrincipleIcon,
  BellIcon,
  BookmarkIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentIcon,
  EyePrincipleIcon,
  GridPrincipleIcon,
  PlayCircleIcon,
  SearchIcon,
  SignalIcon,
  TargetPrincipleIcon,
  UserIcon,
  VertexLogo,
} from "@/components/ui/icons"
import { SearchInput, SelectField } from "@/components/ui/input"
import { BrandNav, Breadcrumbs, Pagination } from "@/components/ui/navigation"

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2.5 font-sans text-[12px] font-bold tracking-[0.12em] uppercase">
      <span className="text-[#F97316]">{number}</span>
      <span className="text-[#0F172A]">{title}</span>
    </div>
  )
}

const primarySwatches = [
  { name: "Primary 500", hex: "#F97316", bg: "#F97316", border: false },
  { name: "Primary 400", hex: "#FB923C", bg: "#FB923C", border: false },
  { name: "Primary 300", hex: "#FDBA74", bg: "#FDBA74", border: false },
  { name: "Primary 200", hex: "#FED7AA", bg: "#FED7AA", border: false },
  { name: "Primary 100", hex: "#FFEEE5", bg: "#FFEEE5", border: false },
]

const neutralSwatches = [
  { name: "Neutral 900", hex: "#0F172A", bg: "#0F172A", border: false },
  { name: "Neutral 700", hex: "#334155", bg: "#334155", border: false },
  { name: "Neutral 500", hex: "#64748B", bg: "#64748B", border: false },
  { name: "Neutral 300", hex: "#CBD5E1", bg: "#CBD5E1", border: false },
  { name: "Neutral 200", hex: "#E2E8F0", bg: "#E2E8F0", border: false },
  { name: "Neutral 100", hex: "#F1F5F9", bg: "#F1F5F9", border: false },
  { name: "Neutral 50", hex: "#FAFAFC", bg: "#FAFAFC", border: true },
  { name: "White", hex: "#FFFFFF", bg: "#FFFFFF", border: true },
]

const typeScaleRows = [
  {
    style: "Display 1",
    className: "font-display text-[20px] font-bold text-[#0F172A]",
    font: "Playfair Display",
    size: "48 / 56",
    weight: "Bold",
    use: "Page titles",
  },
  {
    style: "Display 2",
    className: "font-display text-[18px] font-bold text-[#0F172A]",
    font: "Playfair Display",
    size: "36 / 44",
    weight: "Bold",
    use: "Section titles",
  },
  {
    style: "Heading 1",
    className: "font-sans text-[16px] font-semibold text-[#0F172A]",
    font: "Inter",
    size: "28 / 36",
    weight: "Semi Bold",
    use: "Card titles",
  },
  {
    style: "Heading 2",
    className: "font-sans text-[15px] font-semibold text-[#0F172A]",
    font: "Inter",
    size: "22 / 30",
    weight: "Semi Bold",
    use: "Sub section",
  },
  {
    style: "Heading 3",
    className: "font-sans text-[14px] font-medium text-[#0F172A]",
    font: "Inter",
    size: "18 / 26",
    weight: "Medium",
    use: "Small titles",
  },
  {
    style: "Body Large",
    className: "font-sans text-[14px] font-semibold text-[#0F172A]",
    font: "Inter",
    size: "16 / 24",
    weight: "Regular",
    use: "Body copy",
  },
  {
    style: "Body",
    className: "font-sans text-[13px] font-semibold text-[#0F172A]",
    font: "Inter",
    size: "14 / 20",
    weight: "Regular",
    use: "Supporting text",
  },
  {
    style: "Small",
    className: "font-sans text-[12px] font-semibold text-[#0F172A]",
    font: "Inter",
    size: "12 / 16",
    weight: "Regular",
    use: "Captions, meta",
  },
]

const spacingUnits = [
  { px: "4", rem: "(0.25rem)", w: 6, h: 6 },
  { px: "8", rem: "(0.5rem)", w: 12, h: 12 },
  { px: "12", rem: "(0.75rem)", w: 18, h: 18 },
  { px: "16", rem: "(1rem)", w: 24, h: 24 },
  { px: "24", rem: "(1.5rem)", w: 30, h: 30 },
  { px: "32", rem: "(2rem)", w: 38, h: 38 },
  { px: "40", rem: "(2.5rem)", w: 46, h: 46 },
  { px: "48", rem: "(3rem)", w: 54, h: 54 },
  { px: "64", rem: "(4rem)", w: 64, h: 64 },
]

const radiusTokens = [
  { label: "4px", sub: "(xs)", radius: "4px" },
  { label: "8px", sub: "(sm)", radius: "8px" },
  { label: "12px", sub: "(md)", radius: "12px" },
  { label: "16px", sub: "(lg)", radius: "16px" },
  { label: "24px", sub: "(xl)", radius: "24px" },
  { label: "Full", sub: "(circle)", radius: "9999px" },
]

const shadowTokens = [
  {
    name: "Sm",
    offset: "0 1px 2px 0",
    rgba: "rgba(15, 23, 42, 0.05)",
    shadow: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
  },
  {
    name: "Md",
    offset: "0 4px 12px -2px",
    rgba: "rgba(15, 23, 42, 0.08)",
    shadow: "0 4px 12px -2px rgba(15, 23, 42, 0.08)",
  },
  {
    name: "Lg",
    offset: "0 12px 24px -4px",
    rgba: "rgba(15, 23, 42, 0.10)",
    shadow: "0 12px 24px -4px rgba(15, 23, 42, 0.10)",
  },
  {
    name: "Xl",
    offset: "0 20px 40px -8px",
    rgba: "rgba(15, 23, 42, 0.12)",
    shadow: "0 20px 40px -8px rgba(15, 23, 42, 0.12)",
  },
]

const principles = [
  {
    title: "Clarity First",
    description: "Every element should communicate clearly.",
    icon: EyePrincipleIcon,
  },
  {
    title: "Consistency",
    description: "Use components and patterns consistently across the platform.",
    icon: GridPrincipleIcon,
  },
  {
    title: "Focus & Calm",
    description: "Remove noise and help learners focus on what matters.",
    icon: TargetPrincipleIcon,
  },
  {
    title: "Accessible",
    description: "Design with accessibility and inclusivity in mind.",
    icon: AccessiblePrincipleIcon,
  },
]

export function DesignSystemShowcase() {
  const cardSurface =
    "rounded-[24px] border border-[#F1EDE8] bg-[#FCFBF9] p-6 sm:p-8 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)]"

  return (
    <div className="min-h-screen w-full bg-[#FAF7F4] px-4 py-6 text-[#0F172A] sm:px-6 sm:py-8 lg:px-8">
      <main className="mx-auto flex w-full max-w-[1380px] flex-col gap-5">
        {/* ROW 1: Intro + 01 Colors */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Brand Intro Card */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-4`}>
            <div>
              <VertexLogo />
              <h1 className="mt-6 font-display text-[44px] font-bold leading-[52px] tracking-tight text-[#0F172A] sm:text-[48px] sm:leading-[56px]">
                Design System
              </h1>
              <p className="mt-5 font-sans text-[15px] leading-[26px] text-[#64748B]">
                A unified design language for Vertex learning platform. Clean, modern and focused on clarity,
                consistency and intuitive learning experiences.
              </p>
            </div>
            <div className="mt-8 font-sans text-[11px] font-semibold tracking-[0.12em] text-[#64748B] uppercase">
              VERSION 1.0 <span className="mx-1.5 text-[#CBD5E1]">•</span> MAY 2025
            </div>
          </section>

          {/* 01 COLORS */}
          <section className={`${cardSurface} lg:col-span-8`}>
            <SectionHeading number="01" title="COLORS" />

            <div>
              <h2 className="font-sans text-[13px] font-semibold text-[#0F172A]">Primary</h2>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {primarySwatches.map((swatch) => (
                  <div key={swatch.name} className="flex flex-col">
                    <div
                      className="h-[62px] w-full rounded-[12px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]"
                      style={{ backgroundColor: swatch.bg }}
                    />
                    <span className="mt-2 font-sans text-[12px] font-medium text-[#0F172A]">{swatch.name}</span>
                    <span className="font-sans text-[11px] text-[#64748B]">{swatch.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-sans text-[13px] font-semibold text-[#0F172A]">Neutral</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
                {neutralSwatches.map((swatch) => (
                  <div key={swatch.name} className="flex flex-col">
                    <div
                      className={`h-[52px] w-full rounded-[10px] ${swatch.border ? "border border-[#E2E8F0]" : ""}`}
                      style={{ backgroundColor: swatch.bg }}
                    />
                    <span className="mt-2 font-sans text-[12px] font-medium text-[#0F172A]">{swatch.name}</span>
                    <span className="font-sans text-[11px] text-[#64748B]">{swatch.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ROW 2: 02 Typography + 03 Type Scale */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 02 TYPOGRAPHY */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-5`}>
            <SectionHeading number="02" title="TYPOGRAPHY" />

            <div className="my-auto flex flex-col gap-10 py-2">
              <div className="flex items-center gap-7">
                <span className="w-[88px] shrink-0 text-center font-display text-[56px] font-bold leading-none text-[#0F172A]">
                  Ag
                </span>
                <div>
                  <div className="font-display text-[22px] font-bold text-[#0F172A]">Playfair Display</div>
                  <div className="mt-1.5 font-sans text-[13px] text-[#64748B]">
                    Elegant <span className="mx-1.5 text-[#F97316]">•</span> Readable{" "}
                    <span className="mx-1.5 text-[#F97316]">•</span> Timeless
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-7">
                <span className="w-[88px] shrink-0 text-center font-sans text-[56px] font-semibold leading-none text-[#0F172A]">
                  Ag
                </span>
                <div>
                  <div className="font-sans text-[22px] font-semibold text-[#0F172A]">Inter</div>
                  <div className="mt-1.5 font-sans text-[13px] text-[#64748B]">
                    Clean <span className="mx-1.5 text-[#F97316]">•</span> Modern{" "}
                    <span className="mx-1.5 text-[#F97316]">•</span> Highly legible
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 TYPE SCALE */}
          <section className={`${cardSurface} lg:col-span-7`}>
            <SectionHeading number="03" title="TYPE SCALE" />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left font-sans">
                <thead>
                  <tr className="border-b border-[#F1EDE8] text-[12px] font-medium text-[#64748B]">
                    <th className="pb-2.5 font-medium">Style</th>
                    <th className="pb-2.5 font-medium">Font</th>
                    <th className="pb-2.5 font-medium">Size / Line Height</th>
                    <th className="pb-2.5 font-medium">Weight</th>
                    <th className="pb-2.5 font-medium">Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F5F1] text-[13px]">
                  {typeScaleRows.map((row) => (
                    <tr key={row.style}>
                      <td className={`py-2 ${row.className}`}>{row.style}</td>
                      <td className="py-2 text-[#64748B]">{row.font}</td>
                      <td className="py-2 text-[#64748B]">{row.size}</td>
                      <td className="py-2 text-[#64748B]">{row.weight}</td>
                      <td className="py-2 text-[#64748B]">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* ROW 3: 04 Spacing System + 05 Radius & Shadows */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 04 SPACING SYSTEM */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-6`}>
            <div>
              <SectionHeading number="04" title="SPACING SYSTEM" />
              <p className="font-sans text-[13px] font-medium text-[#334155]">Base unit: 4px</p>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-3 pt-4">
              {spacingUnits.map((unit) => (
                <div key={unit.px} className="flex flex-col items-center">
                  <div
                    className="rounded-[6px] bg-[#FED7AA]/75"
                    style={{ width: `${unit.w}px`, height: `${unit.h}px` }}
                  />
                  <span className="mt-3 font-sans text-[12px] font-semibold text-[#0F172A]">{unit.px}</span>
                  <span className="mt-0.5 font-sans text-[11px] text-[#64748B]">{unit.rem}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 05 RADIUS & SHADOWS */}
          <section className={`${cardSurface} lg:col-span-6`}>
            <SectionHeading number="05" title="RADIUS & SHADOWS" />

            <div>
              <h2 className="font-sans text-[13px] font-semibold text-[#0F172A]">Radius</h2>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {radiusTokens.map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div
                      className="h-[52px] w-[52px] border border-[#E2E8F0] bg-white"
                      style={{ borderRadius: item.radius }}
                    />
                    <span className="mt-2 font-sans text-[12px] font-medium text-[#0F172A]">{item.label}</span>
                    <span className="font-sans text-[11px] text-[#64748B]">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-sans text-[13px] font-semibold text-[#0F172A]">Shadows</h2>
              <div className="mt-3 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {shadowTokens.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-[12px] border border-[#F1F5F9] bg-white p-3.5"
                    style={{ boxShadow: item.shadow }}
                  >
                    <div className="font-sans text-[13px] font-bold text-[#0F172A]">{item.name}</div>
                    <div className="mt-1 font-sans text-[10px] leading-4 text-[#64748B]">{item.offset}</div>
                    <div className="font-sans text-[10px] leading-4 text-[#64748B]">{item.rgba}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ROW 4: 06 Icons + 07 Buttons + 08 Inputs */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 06 ICONS */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-3`}>
            <div>
              <SectionHeading number="06" title="ICONS" />

              <div>
                <h2 className="font-sans text-[12px] font-semibold text-[#334155]">Outline Style</h2>
                <div className="mt-3 flex items-center justify-between text-[#0F172A]">
                  <BellIcon variant="outline" size={20} />
                  <SearchIcon variant="outline" size={20} />
                  <PlayCircleIcon variant="outline" size={20} />
                  <DocumentIcon variant="outline" size={20} />
                  <BookmarkIcon variant="outline" size={20} />
                  <SignalIcon variant="outline" size={20} />
                  <ClockIcon variant="outline" size={20} />
                  <UserIcon variant="outline" size={20} />
                  <ChevronRightIcon variant="outline" size={20} />
                </div>
              </div>

              <div className="mt-6">
                <h2 className="font-sans text-[12px] font-semibold text-[#334155]">Fileed Style</h2>
                <div className="mt-3 flex items-center justify-between text-[#0F172A]">
                  <BellIcon variant="filled" size={20} />
                  <SearchIcon variant="filled" size={20} />
                  <PlayCircleIcon variant="filled" size={20} />
                  <DocumentIcon variant="filled" size={20} />
                  <BookmarkIcon variant="filled" size={20} />
                  <SignalIcon variant="filled" size={20} />
                  <ClockIcon variant="filled" size={20} />
                  <UserIcon variant="filled" size={20} />
                  <ChevronRightIcon variant="filled" size={20} />
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#F1EDE8] pt-4">
              <h3 className="font-sans text-[12px] font-semibold text-[#334155]">Icon Specs</h3>
              <ul className="mt-2 space-y-1.5 font-sans text-[12px] text-[#64748B]">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>24x24px grid</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>2px stroke width (outline)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Rounded line caps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Consistent optical balance</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 07 BUTTONS */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-6`}>
            <div>
              <SectionHeading number="07" title="BUTTONS" />

              <div className="overflow-x-auto">
                <div className="min-w-[520px]">
                  <div className="grid grid-cols-[64px_1fr_1.15fr_1.1fr_1fr] items-center gap-3 pb-3 font-sans text-[12px] font-medium text-[#64748B]">
                    <span />
                    <span>Primary</span>
                    <span>Secondary</span>
                    <span>Tertiary</span>
                    <span>Text</span>
                  </div>

                  {/* Default Row */}
                  <div className="grid grid-cols-[64px_1fr_1.15fr_1.1fr_1fr] items-center gap-3 py-2">
                    <span className="font-sans text-[12px] font-medium text-[#334155]">Default</span>
                    <div>
                      <Button variant="primary">Get Started</Button>
                    </div>
                    <div>
                      <Button variant="secondary">Explore Courses</Button>
                    </div>
                    <div>
                      <TertiaryActionButton>View Lesson</TertiaryActionButton>
                    </div>
                    <div>
                      <TextVideoButton>Watch Video</TextVideoButton>
                    </div>
                  </div>

                  {/* Hover Row */}
                  <div className="grid grid-cols-[64px_1fr_1.15fr_1.1fr_1fr] items-center gap-3 py-2">
                    <span className="font-sans text-[12px] font-medium text-[#334155]">Hover</span>
                    <div>
                      <Button variant="primary" forceHover>
                        Get Started
                      </Button>
                    </div>
                    <div>
                      <Button variant="secondary" forceHover>
                        Explore Courses
                      </Button>
                    </div>
                    <div>
                      <TertiaryActionButton forceHover>View Lesson</TertiaryActionButton>
                    </div>
                    <div>
                      <TextVideoButton forceHover>Watch Video</TextVideoButton>
                    </div>
                  </div>

                  {/* Disabled Row */}
                  <div className="grid grid-cols-[64px_1fr_1.15fr_1.1fr_1fr] items-center gap-3 py-2">
                    <span className="font-sans text-[12px] font-medium text-[#64748B]">Disabled</span>
                    <div>
                      <Button variant="primary" disabled>
                        Get Started
                      </Button>
                    </div>
                    <div>
                      <Button variant="secondary" disabled>
                        Explore Courses
                      </Button>
                    </div>
                    <div>
                      <TertiaryActionButton disabled>View Lesson</TertiaryActionButton>
                    </div>
                    <div>
                      <TextVideoButton disabled>Watch Video</TextVideoButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#F1EDE8] pt-4">
              <h3 className="font-sans text-[12px] font-semibold text-[#334155]">Button Specs</h3>
              <ul className="mt-2 space-y-1.5 font-sans text-[12px] text-[#64748B]">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Height: 44px (default)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Padding: 0 16px (lg), 0 12px (md)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Radius: 12px</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Font: Inter Medium (14–16px)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 08 INPUTS */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-3`}>
            <div>
              <SectionHeading number="08" title="INPUTS" />

              <div>
                <label htmlFor="ds-search-input" className="block font-sans text-[12px] font-semibold text-[#334155]">
                  Search / Text Input
                </label>
                <div className="mt-2">
                  <SearchInput id="ds-search-input" placeholder="Search anything..." />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="ds-select-field" className="block font-sans text-[12px] font-semibold text-[#334155]">
                  Select
                </label>
                <div className="mt-2">
                  <SelectField
                    id="ds-select-field"
                    defaultValue="most-relevant"
                    options={[
                      { label: "Most Relevant", value: "most-relevant" },
                      { label: "Newest First", value: "newest" },
                      { label: "Most Popular", value: "popular" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#F1EDE8] pt-4">
              <h3 className="font-sans text-[12px] font-semibold text-[#334155]">Field Specs</h3>
              <ul className="mt-2 space-y-1.5 font-sans text-[12px] text-[#64748B]">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Height: 44px</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Radius: 12px</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Border: 1px solid #E2E8F0</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Padding: 0 16px</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
                  <span>Focus: Border color #FB923C</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* ROW 5: 09 Badges / Tags + 10 Status / Indicators + 11 Progress Bar */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 09 BADGES / TAGS */}
          <section className={`${cardSurface} lg:col-span-3`}>
            <SectionHeading number="09" title="BADGES / TAGS" />
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div>
                <div className="mb-2.5 font-sans text-[12px] font-semibold text-[#334155]">Video</div>
                <Badge variant="video" />
              </div>
              <div>
                <div className="mb-2.5 font-sans text-[12px] font-semibold text-[#334155]">Lesson</div>
                <Badge variant="lesson" />
              </div>
              <div>
                <div className="mb-2.5 font-sans text-[12px] font-semibold text-[#334155]">Popular</div>
                <Badge variant="popular" />
              </div>
            </div>
          </section>

          {/* 10 STATUS / INDICATORS */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-5`}>
            <SectionHeading number="10" title="STATUS / INDICATORS" />
            <div className="my-auto flex flex-wrap items-center justify-between gap-3 py-2">
              <StatusIndicator status="in-progress" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="now-playing" />
              <StatusIndicator status="locked" />
            </div>
          </section>

          {/* 11 PROGRESS BAR */}
          <section className={`${cardSurface} flex flex-col justify-between lg:col-span-4`}>
            <SectionHeading number="11" title="PROGRESS BAR" />
            <div className="my-auto py-3">
              <ProgressBar value={35} />
            </div>
          </section>
        </div>

        {/* ROW 6: 12 CARDS */}
        <section className={cardSurface}>
          <SectionHeading number="12" title="CARDS" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col">
              <span className="mb-2.5 font-sans text-[12px] font-medium text-[#64748B]">Course Card</span>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                moduleCount={12}
                iconLetter="N"
              />
            </div>

            <div className="flex flex-col">
              <span className="mb-2.5 font-sans text-[12px] font-medium text-[#64748B]">Lesson Card (Video)</span>
              <VideoLessonCard
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lessonNumber="Lesson 5.1"
                timestamp="12:45"
              />
            </div>

            <div className="flex flex-col">
              <span className="mb-2.5 font-sans text-[12px] font-medium text-[#64748B]">Lesson Card (Lesson)</span>
              <LessonResultCard
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                moduleLabel="Module 5"
              />
            </div>

            <div className="flex flex-col">
              <span className="mb-2.5 font-sans text-[12px] font-medium text-[#64748B]">Resource Card</span>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                fileType="PDF"
                fileSize="1.2 MB"
              />
            </div>
          </div>
        </section>

        {/* ROW 7: 13 NAVIGATION */}
        <section className={cardSurface}>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading number="13" title="NAVIGATION" />
              <BrandNav activeItem="courses" />
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#F1EDE8] lg:pl-8">
              <div className="mb-2.5 font-sans text-[12px] font-semibold text-[#334155]">Breadcrumbs</div>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "/" },
                  { label: "Next.js for Production", href: "/courses/nextjs-for-production" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>

            <div className="lg:col-span-3 lg:border-l lg:border-[#F1EDE8] lg:pl-8">
              <div className="mb-2.5 font-sans text-[12px] font-semibold text-[#334155]">Pagination</div>
              <Pagination currentPage={1} totalPages={8} />
            </div>
          </div>
        </section>

        {/* ROW 8: 14 PRINCIPLES */}
        <section className={cardSurface}>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 font-sans text-[12px] font-bold tracking-[0.12em] uppercase">
                <span className="text-[#F97316]">14</span>
                <span className="text-[#0F172A]">PRINCIPLES</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-10 xl:grid-cols-4">
              {principles.map((principle) => {
                const IconComponent = principle.icon
                return (
                  <div key={principle.title} className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F5F1] text-[#475569]">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="font-sans text-[13px] font-bold text-[#0F172A]">{principle.title}</h3>
                      <p className="mt-0.5 font-sans text-[12px] leading-[18px] text-[#64748B]">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
