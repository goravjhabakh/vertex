import type { HTMLAttributes } from "react"
import { CheckCircleIcon, InProgressIcon, LockIcon, PlayCircleIcon } from "./icons"

export type BadgeVariant = "video" | "lesson" | "popular"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant
}

const badgeStyles: Record<BadgeVariant, { label: string; className: string }> = {
  video: {
    label: "VIDEO",
    className: "bg-[#FFEEE5] text-[#F97316]",
  },
  lesson: {
    label: "LESSON",
    className: "bg-[#EEF2FF] text-[#4F46E5]",
  },
  popular: {
    label: "POPULAR",
    className: "bg-[#FFEEE5] text-[#EA580C]",
  },
}

export function Badge({ variant, children, className = "", ...props }: BadgeProps) {
  const config = badgeStyles[variant]
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[6px] px-2.5 py-1 font-sans text-[11px] font-bold tracking-[0.04em] uppercase ${config.className} ${className}`}
      {...props}
    >
      {children ?? config.label}
    </span>
  )
}

export type StatusType = "in-progress" | "completed" | "now-playing" | "locked"

export function StatusIndicator({ status, label }: { status: StatusType; label?: string }) {
  switch (status) {
    case "in-progress":
      return (
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[13px] font-medium text-[#334155]">
          <InProgressIcon size={18} />
          <span>{label ?? "In Progress"}</span>
        </div>
      )
    case "completed":
      return (
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[13px] font-medium text-[#334155]">
          <CheckCircleIcon size={18} className="text-[#16A34A]" />
          <span>{label ?? "Completed"}</span>
        </div>
      )
    case "now-playing":
      return (
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[13px] font-medium text-[#334155]">
          <PlayCircleIcon variant="filled" size={18} className="text-[#F97316]" />
          <span>{label ?? "Now Playing"}</span>
        </div>
      )
    case "locked":
      return (
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[13px] font-medium text-[#334155]">
          <LockIcon size={17} className="text-[#475569]" />
          <span>{label ?? "Locked"}</span>
        </div>
      )
  }
}

export function ProgressBar({ value = 35, showLabel = true }: { value?: number; showLabel?: boolean }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="flex w-full items-center gap-4">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
        <div
          className="h-full rounded-full bg-[#F97316] transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 font-sans text-[13px] text-[#64748B]">
          <strong className="font-semibold text-[#0F172A]">{clamped}%</strong> complete
        </span>
      )}
    </div>
  )
}
