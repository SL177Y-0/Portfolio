"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ExperienceModelCanvas } from "@/components/three/models/experience-model"
import Image from "next/image"

type Card = { title: string; hint: string; link?: string }
type ExperienceData = {
  cards: Card[]
  description: string
  duration: string
  role: string
}

const clusterData: ExperienceData = {
  cards: [
    { title: "Social Score Website", hint: "Decentralized AI platform" },
    { title: "AI Vault Price Pool", hint: "Blockchain gaming system" },
    { title: "Voting System", hint: "Decentralized governance" },
    { title: "Cross-Chain Integration", hint: "EVM + Aptos support" },
  ],
  description: "At Cluster Protocol, a Decentralized-AI company, I spearheaded the development of several MVPs including a Social Score Website, AI-powered Vault Price Pool Game, and a Decentralized Voting System. I was deeply involved in performance optimization, enhancing the UI/UX, and working on cross-chain integration using both EVM and Aptos. My efforts resulted in the reduction of page load times by 30% and the improvement of system reliability through rigorous end-to-end testing. I also contributed to the branding of new vault systems and partner onboarding, ensuring a seamless user experience.",
  duration: "02/2025 - 07/2025",
  role: "Full Stack Blockchain Developer"
}

const ermData: ExperienceData = {
  cards: [
    { title: "Next.js SEO Projects", hint: "SSR for crawlability" },
    { title: "Core Web Vitals", hint: "Performance optimization" },
    { title: "SEO Audits", hint: "Technical & on-page analysis" },
    { title: "Analytics Monitoring", hint: "Google Search Console & GA" },
  ],
  description: "At Excel Range, a Marketing Agency in Delhi, I increased user retention by 35% by delivering SEO projects with Next.js SSR to boost crawlability, improve Core Web Vitals, and enhance overall search engine performance. I conducted comprehensive SEO audits to identify technical, on-page, and performance bottlenecks, followed by strategic improvements that positively impacted organic rankings. I monitored site analytics and tracked SEO KPIs (CTR, impressions, keyword rankings, bounce rate) using tools like Google Search Console, Google Analytics, and Lighthouse.",
  duration: "09/2024 - 10/2024",
  role: "Full Stack SEO Developer"
}

const veridaData: ExperienceData = {
  cards: [
    { title: "Telegram Integration", hint: "Data access & analysis" },
    { title: "SDK Contributions", hint: "Developer onboarding kit" },
    { title: "Community Support", hint: "Documentation featured" },
    { title: "Video Tutorials", hint: "Developer education" },
  ],
  description: "As an Open Source Contributor, I implemented Verida SDKs to extract and analyze Telegram data, developing an example app kit that demonstrated the integration of decentralized AI storage for developers. My contributions were featured in Verida's official documentation, and I also showcased the use case through a detailed video tutorial, helping developers easily onboard to the platform. I built and shared a reusable SDK integration kit, improving developer onboarding and worked closely with the community, contributing insights into decentralized data storage.",
  duration: "03/2025 - 04/2025",
  role: "Open Source Contributor"
}

export default function ExperienceSection() {
  const [tab, setTab] = useState<"Cluster Protocol" | "Excel Range" | "Verida">("Cluster Protocol")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.2 })
    if (sectionRef.current) ob.observe(sectionRef.current)
    return () => ob.disconnect()
  }, [])

  const currentData = tab === "Cluster Protocol" ? clusterData : tab === "Excel Range" ? ermData : veridaData

  // Logo function for each tab
  const getTabLogo = (tabName: string) => {
    switch (tabName) {
      case "Cluster Protocol":
        return (
          <Image
            src="/logo/cluster-logo.png"
            alt="Cluster Protocol"
            width={16}
            height={16}
            className="rounded-sm"
          />
        )
      case "Excel Range":
        return (
          <Image
            src="/logo/excel-logo.png"
            alt="Excel Range"
            width={16}
            height={16}
            className="rounded-sm"
          />
        )
      case "Verida":
        return (
          <Image
            src="/logo/verida-logo.png"
            alt="Verida"
            width={16}
            height={16}
            className="rounded-sm"
          />
        )
      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} id="experience" className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative experience-bg">
      <div className="container mx-auto">

        {/* two-column layout per wireframe */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Browser frame - dark theme */}
            <div className="mx-auto max-w-5xl rounded-xl lg:rounded-2xl overflow-hidden border border-gray-600 bg-gray-900 backdrop-blur">
              {/* Top bar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <div className="w-8 sm:w-14" />
                {/* Tabs moved to right - responsive */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                  {(["Cluster Protocol", "Excel Range", "Verida"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={cn(
                        "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap",
                        tab === t
                          ? "bg-green-600 text-white border border-green-500"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      )}
                      style={{ fontFamily: 'var(--font-agdasima)' }}
                    >
                      <div className="w-3 h-3 sm:w-4 sm:h-4">
                        {getTabLogo(t)}
                      </div>
                      <span className="hidden sm:inline">{t}</span>
                      <span className="sm:hidden">
                        {t === "Cluster Protocol" ? "Cluster" : t === "Excel Range" ? "Excel" : "Verida"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 bg-gray-900">
                {/* Project Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {currentData.cards.map((c, i) => (
                    <div
                      key={c.title}
                      className="relative group rounded-lg sm:rounded-xl border border-gray-700 bg-gray-800 overflow-hidden min-h-[120px] sm:min-h-[140px] hover:border-gray-600 transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-3 sm:p-4 relative z-10">
                        <div className="text-xs sm:text-sm text-gray-400 mb-2">{c.hint}</div>
                        <div className="font-display font-semibold text-base sm:text-lg text-white" style={{ fontFamily: 'var(--font-agdasima)' }}>{c.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Experience Description */}
                <div className="bg-gray-800 rounded-lg sm:rounded-xl border border-gray-700 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-content font-bold text-lg sm:text-xl text-white mb-1" style={{ fontFamily: 'var(--font-agdasima)' }}>{currentData.role}</h3>
                      <p className="font-content text-base sm:text-lg text-green-400" style={{ fontFamily: 'var(--font-agdasima)' }}>{currentData.duration}</p>
                    </div>
                  </div>
                  <p className="font-content text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-agdasima)' }}>{currentData.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3D experience model on the right */}
          <div className="lg:col-span-4 order-first lg:order-none h-64 sm:h-80 lg:h-auto hidden lg:block">
            <ExperienceModelCanvas />
          </div>
        </div>
      </div>
    </section>
  )
}
