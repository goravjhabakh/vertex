import { SignIn } from "@clerk/nextjs"
import { Suspense } from "react"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFBF9]">
      <Suspense fallback={<div className="h-96 w-80 animate-pulse rounded-2xl bg-[#F3EFEA]" />}>
        <SignIn />
      </Suspense>
    </div>
  )
}
