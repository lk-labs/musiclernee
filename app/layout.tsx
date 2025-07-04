import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "CVGPraySing - Music Portfolio & Learning Platform",
  description:
    "Professional music portfolio and learning platform offering composition, foundation, auditing, and teaching services.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
