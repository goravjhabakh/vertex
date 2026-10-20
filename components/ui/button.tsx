import type { ButtonHTMLAttributes, ReactNode } from "react"
import { ExternalLinkIcon, PlayCircleIcon } from "./icons"

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text"
export type ButtonSize = "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  forceHover?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function Button({
  variant = "primary",
  size = "lg",
  forceHover = false,
  disabled = false,
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const heightClass = "h-[44px]"
  const paddingClass = variant === "text" ? "px-1" : size === "lg" ? "px-4" : "px-3"
  const radiusClass = "rounded-[12px]"
  const baseClass =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[13px] font-medium leading-5 transition-all duration-150 select-none cursor-pointer disabled:cursor-not-allowed"

  const variantClasses: Record<ButtonVariant, string> = {
    primary: disabled
      ? "bg-[#FFEEE5] text-[#FB923C]/70"
      : forceHover
        ? "bg-[#C2410C] text-white shadow-[0_4px_12px_-2px_rgba(15,23,42,0.12)]"
        : "bg-[#F97316] text-white hover:bg-[#C2410C] shadow-[0_1px_2px_0_rgba(15,23,42,0.05)]",
    secondary: disabled
      ? "border border-[#FED7AA] bg-white text-[#FDBA74]"
      : forceHover
        ? "border border-[#EA580C] bg-[#FFEEE5]/50 text-[#EA580C]"
        : "border border-[#F97316] bg-white text-[#F97316] hover:border-[#EA580C] hover:bg-[#FFEEE5]/50 hover:text-[#EA580C]",
    tertiary: disabled
      ? "border border-[#E2E8F0] bg-[#FAFAFC] text-[#CBD5E1]"
      : forceHover
        ? "border border-[#CBD5E1] bg-[#F1F5F9] text-[#0F172A]"
        : "border border-[#E2E8F0] bg-white text-[#334155] hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
    text: disabled
      ? "bg-transparent text-[#FDBA74]"
      : forceHover
        ? "bg-transparent text-[#C2410C]"
        : "bg-transparent text-[#F97316] hover:text-[#C2410C]",
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${baseClass} ${heightClass} ${paddingClass} ${radiusClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  )
}

export function TertiaryActionButton({
  children = "View Lesson",
  forceHover = false,
  disabled = false,
  ...props
}: Omit<ButtonProps, "variant" | "icon" | "children"> & { children?: ReactNode }) {
  return (
    <Button
      variant="tertiary"
      forceHover={forceHover}
      disabled={disabled}
      icon={<ExternalLinkIcon size={15} className="shrink-0" />}
      {...props}
    >
      {children}
    </Button>
  )
}

export function TextVideoButton({
  children = "Watch Video",
  forceHover = false,
  disabled = false,
  ...props
}: Omit<ButtonProps, "variant" | "icon" | "children"> & { children?: ReactNode }) {
  return (
    <Button
      variant="text"
      forceHover={forceHover}
      disabled={disabled}
      icon={<PlayCircleIcon variant="outline" size={16} className="shrink-0" />}
      {...props}
    >
      {children}
    </Button>
  )
}
