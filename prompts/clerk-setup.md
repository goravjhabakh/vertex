# Implementation Prompt: Clerk Authentication Setup

## 1. Goal

Integrate Clerk authentication into the Vertex Next.js application using the user-selected Clerk application `app_3KwBbjo9LN8YeIaZ0Qz0Ah9IGVp` as instructed. This provides authentication, user session management, middleware protection for private routes, and live auth controls in the navigation bar.

## 2. Skills & Documentation Read

- `AGENTS.md` (project rules, tech stack, Clerk auth boundaries: "Auth is Clerk, wired through Next.js middleware. It gates whatever a feature marks as private, keeps its secret key on the server, and exposes only its publishable key to the browser.")
- `clerk` / `clerk-setup` skills (`.agents/skills/clerk-setup/SKILL.md`)
- `clerk-cli` skill (`.agents/skills/clerk-cli/SKILL.md`)
- `clerk-nextjs-patterns` skill
- Next.js App Router rules (`node_modules/next/dist/docs/`)

## 3. Code Inspected

- `package.json`: Next.js `16.4.2`, React `19.3.0`, React DOM `19.3.0`, pnpm package manager. No `@clerk/nextjs` installed yet.
- `app/layout.tsx`: Root layout with `<html>` and `<body>`. Needs `<ClerkProvider>` inside `<body>` (wrapping children).
- `components/home/home-page.tsx`: Navigation bar contains presentational notification bell and static `UserAvatar` SVG mockup. Needs live Clerk auth controls (`<SignInButton>`, `<SignUpButton>`, `<Show>`, `<UserButton>`).
- Middleware: No existing middleware. Needs `middleware.ts` exporting `clerkMiddleware()` with recommended Next.js matcher.

## 4. Decisions & Assumptions

- **Target Clerk Application**: Explicitly targeted to `app_3KwBbjo9LN8YeIaZ0Qz0Ah9IGVp` via CLI (`npx clerk init --app app_3KwBbjo9LN8YeIaZ0Qz0Ah9IGVp --no-skills`).
- **SDK Version**: Latest `@clerk/nextjs` (v6+ / current generation for React 19 and Next.js 16).
- **Provider Placement**: As per Clerk Core 3 / current Next.js rules, `<ClerkProvider>` wraps children inside `<body>` in `app/layout.tsx`.
- **Middleware**: Create `middleware.ts` in root with Clerk's standard App Router matcher:
  ```ts
  import { clerkMiddleware } from "@clerk/nextjs/server"

  export default clerkMiddleware()

  export const config = {
    matcher: [
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      "/(api|trpc)(.*)",
    ],
  }
  ```
- **Navigation Controls**:
  - Replace static `UserAvatar` mockup in `components/home/home-page.tsx` with Clerk auth controls using `<Show when="signed-in">` and `<Show when="signed-out">`.
  - When signed out: Show clean, styled `Sign in` button / link matching the warm neutral Vertex UI theme.
  - When signed in: Show `<UserButton />` with profile menu.
  - Bell notification icon remains presentational as per `AGENTS.md` ("Some surfaces are presentational only, with no backend of their own: the My Learning page, the notifications bell...").
- **Environment Variables**:
  - `clerk init` or `clerk env pull` populates `.env.local` with development keys for `app_3KwBbjo9LN8YeIaZ0Qz0Ah9IGVp`.
  - Never commit `.env.local`. Ensure `.env.example` documents `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

## 5. Files Expected to Touch

- `package.json` / `pnpm-lock.yaml`: add `@clerk/nextjs`.
- `middleware.ts`: create middleware with `clerkMiddleware()`.
- `app/layout.tsx`: wrap `children` with `<ClerkProvider>`.
- `components/home/home-page.tsx`: replace static mockup avatar with Clerk `<Show>`, `<SignInButton>`, and `<UserButton>`.
- `.env.example`: add Clerk environment variable definitions without secrets.

## 6. Requirements

1. Install and configure `@clerk/nextjs` for Next.js 16 and React 19.
2. Link to application `app_3KwBbjo9LN8YeIaZ0Qz0Ah9IGVp`.
3. Add `middleware.ts` protecting route resolution while keeping public pages browseable as specified in `AGENTS.md`.
4. Wrap application in `<ClerkProvider>` inside `<body>`.
5. Display live Clerk auth controls in the navigation bar.
6. Verify via `npx -y clerk@latest doctor` and project build checks.

## 7. Security Considerations

- Secret key `CLERK_SECRET_KEY` remains strictly server-side and never exposed to client code.
- Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is exposed in browser environment.
- Do not print secret keys to console or commit them to git.

## 8. Acceptance Criteria

- `@clerk/nextjs` is installed and builds cleanly.
- `middleware.ts` runs on request without edge errors.
- `ClerkProvider` is configured in `app/layout.tsx`.
- Vertex header displays interactive auth state (Sign in button when signed out, `UserButton` avatar when signed in).
- TypeScript check (`pnpm exec tsc --noEmit`), Biome check (`pnpm run lint`), and build (`pnpm run build`) pass.
- `npx -y clerk@latest doctor` confirms valid Clerk setup.

## 9. Checks to Run

1. `npx -y clerk@latest doctor`
2. `pnpm exec tsc --noEmit`
3. `pnpm run lint`
4. `pnpm run build`

## 10. Manual Test Steps

1. Run `pnpm run dev` and navigate to `http://localhost:5173`.
2. Observe the top right navigation bar: verify the "Sign in" button is displayed when signed out.
3. Click "Sign in" and verify Clerk modal or hosted sign-in opens.
4. Sign in with an account and verify the profile avatar (`UserButton`) appears in the nav header.
5. Click the profile avatar to view account options and sign out.
