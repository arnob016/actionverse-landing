import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Action Tokens",
  description: "Action Tokens - Empowering Positive Actions Through Blockchain. Encouraging consumers to take positive actions in the physical world using blockchain technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>

        <Header />
        {children}
        <Footer />
        <Toaster />

      </body>
    </html>
  )
}

