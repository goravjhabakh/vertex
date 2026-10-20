import { SignUp } from "@clerk/nextjs"
import { Suspense } from "react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFBF9]">
      <Suspense fallback={<div className="h-96 w-80 animate-pulse rounded-2xl bg-[#F3EFEA]" />}>
        <SignUp />
      </Suspense>
    </div>
  )
}
