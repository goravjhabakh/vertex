import type { SVGProps } from "react"

export interface IconProps extends SVGProps<SVGSVGElement> {
  variant?: "outline" | "filled"
  size?: number
}

export function VertexLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2.5 2.5H19.5L16.2 8H10.5L16 18.2L23.8 2.5H29.5L16 26.5L2.5 2.5Z" fill="url(#vertex_grad)" />
        <defs>
          <linearGradient id="vertex_grad" x1="2.5" y1="2.5" x2="29.5" y2="26.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
        </defs>
      </svg>
      {showText && <span className="font-sans text-[22px] font-bold tracking-tight text-neutral-900">Vertex</span>}
    </div>
  )
}

export function BellIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path d="M12 2a1.5 1.5 0 0 0-1.5 1.5v.7A6.5 6.5 0 0 0 5.5 10.5v4.38l-1.36 1.7A1 1 0 0 0 4.92 18h14.16a1 1 0 0 0 .78-1.42l-1.36-1.7V10.5a6.5 6.5 0 0 0-5-6.3v-.7A1.5 1.5 0 0 0 12 2Zm-2.5 17.5a2.5 2.5 0 0 0 5 0h-5Z" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function SearchIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={variant === "filled" ? 2.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  )
}

export function PlayCircleIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 6.8v6.4c0 .62.68 1 1.21.67l5.12-3.2a.79.79 0 0 0 0-1.34l-5.12-3.2A.79.79 0 0 0 10 8.8Z"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="10 8.5 16 12 10 15.5 10 8.5" fill="currentColor" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  )
}

export function DocumentIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.41a2 2 0 0 0-.59-1.41l-4.41-4.41A2 2 0 0 0 13.59 2H6Zm7 1.5V8h4.5L13 3.5ZM8 11.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  )
}

export function BookmarkIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path d="M6 3a2 2 0 0 0-2 2v16l8-4.5L20 21V5a2 2 0 0 0-2-2H6Z" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="m19 21-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}

export function SignalIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="4" y="13" width="3.5" height="7" rx="1" />
        <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
        <rect x="16.5" y="4" width="3.5" height="16" rx="1" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="13" width="3.5" height="7" rx="0.8" />
      <rect x="10.25" y="9" width="3.5" height="11" rx="0.8" />
      <rect x="16.5" y="4" width="3.5" height="16" rx="0.8" />
    </svg>
  )
}

export function ClockIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 5a1 1 0 1 0-2 0v5c0 .33.17.65.45.83l3.5 2.25a1 1 0 1 0 1.1-1.66L13 11.45V7Z"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  )
}

export function UserIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  if (variant === "filled") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <circle cx="12" cy="7.5" r="4" />
        <path d="M4.5 19.5c0-3.59 3.36-6 7.5-6s7.5 2.41 7.5 6v.5h-15v-.5Z" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M19 20v-1a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v1" />
      <circle cx="12" cy="7.5" r="3.5" />
    </svg>
  )
}

export function ChevronRightIcon({ variant = "outline", size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={variant === "filled" ? 2.6 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function ChevronLeftIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function ExternalLinkIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function FolderIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function InProgressIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" stroke="#E2E8F0" strokeWidth={2.2} />
      <path d="M12 3a9 9 0 1 1-6.36 2.64" stroke="#F97316" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.8-5" />
    </svg>
  )
}

export function LockIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="11" width="16" height="10" rx="2" ry="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

export function EyePrincipleIcon({ size = 28, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function GridPrincipleIcon({ size = 26, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  )
}

export function TargetPrincipleIcon({ size = 28, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4.5" />
      <circle cx="11" cy="13" r="1.5" fill="currentColor" />
      <path d="m19 5-6.5 6.5" />
      <path d="M16 5h3v3" />
    </svg>
  )
}

export function AccessiblePrincipleIcon({ size = 28, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="5" r="2" />
      <path d="M5 9.5h14" />
      <path d="M12 9.5v5.5" />
      <path d="m9.5 21 2.5-6 2.5 6" />
    </svg>
  )
}
