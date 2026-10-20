import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vertex — AI-Powered Learning Platform",
  description:
    "A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-50 font-sans text-neutral-900">{children}</body>
    </html>
  )
}
