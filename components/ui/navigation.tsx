import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, VertexLogo } from "./icons"

export interface BrandNavProps {
  activeItem?: "courses" | "my-learning"
}

export function BrandNav({ activeItem = "courses" }: BrandNavProps) {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <VertexLogo />
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        <Link
          href="/"
          className={`font-sans text-[14px] font-semibold transition-colors ${
            activeItem === "courses" ? "text-[#F97316]" : "text-[#334155] hover:text-[#0F172A]"
          }`}
        >
          Courses
        </Link>
        <Link
          href="/my-learning"
          className={`font-sans text-[14px] font-semibold transition-colors ${
            activeItem === "my-learning" ? "text-[#F97316]" : "text-[#334155] hover:text-[#0F172A]"
          }`}
        >
          My Learning
        </Link>
      </nav>
    </div>
  )
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-[13px]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={item.label} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-[#64748B] transition-colors hover:text-[#0F172A]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-[#334155]" : "text-[#64748B]"}>{item.label}</span>
            )}
            {!isLast && <ChevronRightIcon size={14} className="text-[#94A3B8]" />}
          </div>
        )
      })}
    </nav>
  )
}

export interface PaginationProps {
  currentPage?: number
  totalPages?: number
}

export function Pagination({ currentPage = 1, totalPages = 8 }: PaginationProps) {
  const pages: Array<number | "ellipsis"> = [1, 2, 3, "ellipsis", totalPages]

  return (
    <nav aria-label="Pagination" className="inline-flex items-center gap-1.5 font-sans text-[13px]">
      <button
        type="button"
        aria-label="Previous page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
      >
        <ChevronLeftIcon size={15} />
      </button>
      {pages.map((page) => {
        if (page === "ellipsis") {
          return (
            <span key="ellipsis" className="inline-flex h-8 w-8 items-center justify-center text-[#64748B]">
              ...
            </span>
          )
        }
        const active = page === currentPage
        return (
          <button
            key={page}
            type="button"
            aria-current={active ? "page" : undefined}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-[8px] font-medium transition-colors ${
              active
                ? "border border-[#FB923C] bg-[#FFEEE5]/60 text-[#F97316]"
                : "text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
            }`}
          >
            {page}
          </button>
        )
      })}
      <button
        type="button"
        aria-label="Next page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
      >
        <ChevronRightIcon size={15} />
      </button>
    </nav>
  )
}
