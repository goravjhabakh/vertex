"use client"

import { Show, SignInButton, UserButton } from "@clerk/nextjs"

export function NavAuthControls() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full border border-[#E5E0D8] bg-[#F7F4EF] px-4 font-sans text-[13px] sm:text-[14px] font-medium text-[#1E293B] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all hover:bg-[#EFE9E0] hover:text-[#0F172A]"
          >
            Sign In
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] rounded-full border border-[#E5E0D8] shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
            },
          }}
        />
      </Show>
    </>
  )
}
