import { Badge } from "./badge"
import { ClockIcon, DocumentIcon, ExternalLinkIcon, FolderIcon, PlayCircleIcon, SignalIcon } from "./icons"

export interface CourseCardProps {
  title: string
  description: string
  level: string
  duration: string
  moduleCount: number
  iconLetter?: string
}

export function CourseCard({ title, description, level, duration, moduleCount, iconLetter = "N" }: CourseCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.05)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0F172A] font-sans text-[18px] font-bold text-white">
          {iconLetter}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-[16px] font-semibold leading-6 text-[#0F172A]">{title}</h3>
          <p className="mt-1 font-sans text-[13px] leading-5 text-[#64748B]">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#F1F5F9] pt-3.5 font-sans text-[12px] text-[#64748B]">
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          <SignalIcon size={13} className="text-[#64748B]" />
          <span>{level}</span>
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          <ClockIcon size={13} className="text-[#64748B]" />
          <span>{duration}</span>
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          <FolderIcon size={13} className="text-[#64748B]" />
          <span>{moduleCount} modules</span>
        </span>
      </div>
    </div>
  )
}

export interface VideoLessonCardProps {
  title: string
  description: string
  lessonNumber: string
  timestamp: string
  actionLabel?: string
}

export function VideoLessonCard({ title, description, lessonNumber, timestamp, actionLabel }: VideoLessonCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.05)]">
      <div>
        <Badge variant="video" />
        <h3 className="mt-3 font-sans text-[16px] font-semibold leading-6 text-[#0F172A]">{title}</h3>
        <p className="mt-1.5 font-sans text-[13px] leading-5 text-[#64748B]">{description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#F1F5F9] pt-3.5 font-sans text-[12px]">
        <span className="text-[#64748B]">
          {lessonNumber} <span className="mx-1">•</span> {timestamp}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[#F97316]">
          <PlayCircleIcon variant="outline" size={15} className="text-[#F97316]" />
          <span>{actionLabel ?? `Watch from ${timestamp}`}</span>
        </span>
      </div>
    </div>
  )
}

export interface LessonResultCardProps {
  title: string
  description: string
  moduleLabel: string
  actionLabel?: string
}

export function LessonResultCard({
  title,
  description,
  moduleLabel,
  actionLabel = "View lesson",
}: LessonResultCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.05)]">
      <div>
        <Badge variant="lesson" />
        <h3 className="mt-3 font-sans text-[16px] font-semibold leading-6 text-[#0F172A]">{title}</h3>
        <p className="mt-1.5 font-sans text-[13px] leading-5 text-[#64748B]">{description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#F1F5F9] pt-3.5 font-sans text-[12px]">
        <span className="text-[#64748B]">{moduleLabel}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[#F97316]">
          <span>{actionLabel}</span>
          <ExternalLinkIcon size={14} className="text-[#F97316]" />
        </span>
      </div>
    </div>
  )
}

export interface ResourceCardProps {
  title: string
  description: string
  fileType: string
  fileSize: string
}

export function ResourceCard({ title, description, fileType, fileSize }: ResourceCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.05)]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#F8FAFC] text-[#334155]">
          <DocumentIcon variant="outline" size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-[16px] font-semibold leading-6 text-[#0F172A]">{title}</h3>
          <p className="mt-1 font-sans text-[13px] leading-5 text-[#64748B]">{description}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#F1F5F9] pt-3.5 font-sans text-[12px]">
        <span className="text-[#64748B]">
          {fileType} <span className="mx-1">•</span> {fileSize}
        </span>
        <ExternalLinkIcon size={15} className="text-[#F97316]" />
      </div>
    </div>
  )
}
