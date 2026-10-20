"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useEffect, useRef, useState } from "react"
import { SearchIcon } from "@/components/ui/icons"

export function HeroSearch() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[772px]">
      <div className="rounded-[18px] border border-[#EDE8E1] bg-[#FAF8F5]/90 p-1 shadow-[0_12px_34px_-10px_rgba(15,23,42,0.06)]">
        <div className="flex h-[58px] sm:h-[62px] w-full items-center gap-3.5 rounded-[14px] border border-[#EFECE6] bg-white px-5 transition-colors focus-within:border-[#FB923C]">
          <SearchIcon size={21} className="shrink-0 text-[#475569]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask anything about your learning..."
            aria-label="Ask anything about your learning"
            className="h-full w-full bg-transparent font-sans text-[15px] sm:text-[17px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
          />
          <kbd className="inline-flex h-[34px] shrink-0 items-center justify-center rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F6] px-3 font-sans text-[13px] font-medium text-[#334155] shadow-[0_1px_1px_rgba(15,23,42,0.03)]">
            ⌘ K
          </kbd>
        </div>
      </div>
    </form>
  )
}
