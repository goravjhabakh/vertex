import type { InputHTMLAttributes, SelectHTMLAttributes } from "react"
import { ChevronDownIcon, SearchIcon } from "./icons"

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showShortcut?: boolean
  shortcutLabel?: string
}

export function SearchInput({
  showShortcut = true,
  shortcutLabel = "⌘ K",
  placeholder = "Search anything...",
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div
      className={`group flex h-[44px] w-full items-center gap-2.5 rounded-[12px] border border-[#E2E8F0] bg-white px-4 transition-colors focus-within:border-[#FB923C] ${className}`}
    >
      <SearchIcon size={18} className="shrink-0 text-[#64748B]" />
      <input
        type="text"
        placeholder={placeholder}
        className="h-full w-full bg-transparent font-sans text-[14px] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
        {...props}
      />
      {showShortcut && (
        <kbd className="inline-flex h-6 shrink-0 items-center rounded-[6px] border border-[#E2E8F0] bg-[#FAFAFC] px-1.5 font-sans text-[11px] font-medium text-[#64748B]">
          {shortcutLabel}
        </kbd>
      )}
    </div>
  )
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ label: string; value: string }>
}

export function SelectField({ options, className = "", ...props }: SelectFieldProps) {
  return (
    <div className={`relative flex h-[44px] w-full items-center ${className}`}>
      <select
        className="h-full w-full appearance-none rounded-[12px] border border-[#E2E8F0] bg-white px-4 pr-10 font-sans text-[14px] font-medium text-[#0F172A] transition-colors focus:border-[#FB923C] focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon size={18} className="pointer-events-none absolute right-3.5 text-[#334155]" />
    </div>
  )
}
