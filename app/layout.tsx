import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans, Syne, Agdasima } from "next/font/google"
import localFont from 'next/font/local'
import "./globals.css"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
})

const agdasima = Agdasima({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-agdasima",
})

const brodaers = localFont({
  src: '../public/fonts/brodaers/Brodaers Expanded Regular.ttf',
  display: 'swap',
  variable: '--font-brodaers',
})

export const metadata: Metadata = {
  title: "SL177Y",
  description:
    "Building the Future in 3D",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${openSans.variable} ${syne.variable} ${brodaers.variable} ${agdasima.variable} antialiased`}
    >
      <body className="overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
