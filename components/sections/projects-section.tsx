"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { BodyCanvas } from "@/components/three/body-model"
import { ProjectModelCanvas } from "@/components/three/models/project-model"

interface Project {
  id: string
  title: string
  category: "Web2" | "Web3"
  githubUrl: string
  media: string
  mediaType: "video" | "gif"
  year: string
  description: string
  stats?: {
    label: string
    value: string
  }
}

const projects: Project[] = [
  // Web2 Projects
  {
    id: "aurora-gold",
    title: "Aurora Gold",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/Aurora_Gold.git",
    media: "/Project/auroragold.mp4",
    mediaType: "video",
    year: "2025",
    description: "AI-Investment tracking platform"
  },
  {
    id: "plot-spot-builder",
    title: "Plot Spot Builder",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/Plot-spot-builder.git",
    media: "/Project/plotspot.mp4",
    mediaType: "video",
    year: "2025",
    description: "Interactive plot building tool"
  },
  {
    id: "zonify",
    title: "Zonify",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/Zonify.git",
    media: "/Project/zonify.mp4",
    mediaType: "video",
    year: "2024",
    description: "Zone mapping application"
  },
  {
    id: "calcybuilder",
    title: "CalcyBuilder",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/CalcyBuilder.git",
    media: "/Project/calcybuilder.mp4",
    mediaType: "video",
    year: "2025",
    description: "Dynamic calculator builder"
  },
  {
    id: "ai-recommendation-app",
    title: "AI Recommendation",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/AI_RECOMMENDATION_APP.git",
    media: "/Project/airecommend.mp4",
    mediaType: "video",
    year: "2025",
    description: "AI-recommendation app"
  },
  {
    id: "sociohead-platform",
    title: "SocioHead",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/SocioHead.git",
    media: "/Project/sociohead.mp4",
    mediaType: "video",
    year: "2025",
    description: "Social media analytics"
  },
  {
    id: "verida-telegram-integration",
    title: "Verida Integration",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/Verida-Telegram--AutoFetch.git",
    media: "/Project/verida.mp4",
    mediaType: "video",
    year: "2025",
    description: "Verida SDK integration"
  },
  {
    id: "kapda-ecommerce",
    title: "KAPDA",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/KAPDA.git",
    media: "/Project/kapda.mp4",
    mediaType: "video",
    year: "2024",
    description: "E-commerce platform"
  },
  {
    id: "cancer-prediction-ml",
    title: "Cancer Prediction ML",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/CancerPredictionML.git",
    media: "/Project/cancerprediction.mp4",
    mediaType: "video",
    year: "2025",
    description: "Cancer prediction Model"
  },
  {
    id: "movie-review-site",
    title: "IMDB Clone",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/MovieReviewSite-Spring.git",
    media: "/Project/imdb.mp4",
    mediaType: "video",
    year: "2024",
    description: "Movie rating platform"
  },
  {
    id: "springboot-cart",
    title: "SpringBoot Cart",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/SpringBoot-Cart.git",
    media: "/Project/springcart.mp4",
    mediaType: "video",
    year: "2024",
    description: "Shopping cart system"
  },
  {
    id: "barsat-chrome-extension",
    title: "Barsat Extension",
    category: "Web2",
    githubUrl: "https://github.com/SL177Y-0/Barsat-ChrExtension.git",
    media: "/Project/barsat.mp4",
    mediaType: "video",
    year: "2024",
    description: "Chrome Fun extension"
  },
  // Web3 Projects
  {
    id: "web3-signer",
    title: "Web3 Signer",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/Web3_Signer.git",
    media: "/Project/web3signer.mp4",
    mediaType: "video",
    year: "2025",
    description: "Secure Web3 Signer"
  },
  {
    id: "ether-snake",
    title: "EtherSnake",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/EtherSnake.git",
    media: "/Project/ethersnake.mp4",
    mediaType: "video",
    year: "2025",
    description: "Blockchain-Snake game"
  },
  {
    id: "cosmic-chat",
    title: "CosmicChat",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/CosmicChat.git",
    media: "/Project/cosmicchat.mp4",
    mediaType: "video",
    year: "2025",
    description: "Decentralized messaging platform"
  },
  {
    id: "space-id-integration",
    title: "SPACE ID SDK",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/web3-name-discoverer-tool.git",
    media: "/Project/spaceid.mp4",
    mediaType: "video",
    year: "2025",
    description: "Web3 DNS integration"
  },
  {
    id: "decentralized-task-management",
    title: "Task Management dApp",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/ToDo-Web3.git",
    media: "/Project/taskmanage.mp4",
    mediaType: "video",
    year: "2025",
    description: "Decentralized ToDo"
  },
  {
    id: "dao-gov-lite",
    title: "DAOGovLite",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/DaoGovLite.git",
    media: "/Project/daogov.mp4",
    mediaType: "video",
    year: "2025",
    description: "DAO governance platform"
  },
  {
    id: "timelock-wallet",
    title: "TimeLock Wallet",
    category: "Web3",
    githubUrl: "https://github.com/SL177Y-0/TimeLockWallet.git",
    media: "/Project/timelock.mp4",
    mediaType: "video",
    year: "2025",
    description: "Time-locked wallet"
  },
]

const categories = ["Web2", "Web3"] as const
type Category = (typeof categories)[number]

function BentoCard({ p, span }: { p: Project; span: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={p.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm hover:border-white/30 transition-all duration-300 hover:scale-[1.02]",
        span,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Background */}
      <div className="absolute inset-0">
        {p.mediaType === "video" ? (
          <video
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            ref={(video) => {
              if (video) {
                if (isHovered) {
                  video.play()
                } else {
                  video.pause()
                  video.currentTime = 0
                }
              }
            }}
          >
            <source src={p.media} type="video/mp4" />
          </video>
        ) : (
          // This block can now be safely removed or left as a fallback,
          // but since we are converting all GIFs, it won't be used.
          // For cleanliness, we can remove it.
          <></>
        )}
        
        {/* Dark overlay when not hovered */}
        <div 
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isHovered ? "opacity-0" : "opacity-60"
          )}
        />
      </div>
      
      {/* Content - visible when not hovered */}
      <div 
        className={cn(
          "relative p-6 h-full flex flex-col justify-between text-white transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-3">
              {p.category}
            </span>
            <h3 className="font-content font-bold text-xl lg:text-2xl leading-tight mb-2">
              {p.title}
            </h3>
          </div>
          <span className="text-xs font-medium opacity-80">
            {p.year}
          </span>
        </div>
        
        {/* Description */}
        <p className="font-content text-sm opacity-90 leading-relaxed mb-4 flex-1">
          {p.description}
        </p>
        
        {/* Stats Footer */}
        {p.stats && (
          <div className="mt-auto">
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-xs font-medium opacity-80">
                {p.stats.label}
              </span>
              <span className="text-lg font-bold">
                {p.stats.value}
              </span>
            </div>
          </div>
        )}
      </div>
    </a>
  )
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Web2")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const filtered = projects.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.2 })
    if (sectionRef.current) ob.observe(sectionRef.current)
    return () => ob.disconnect()
  }, [])

  const spans = [
    "lg:col-span-2 lg:row-span-2", // Large square card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-2", // Large square card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-2", // Large square card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-3 lg:row-span-2", // Extra large featured card
    "lg:col-span-3 lg:row-span-1", // Extra wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-2 lg:row-span-1", // Wide card
    "lg:col-span-3 lg:row-span-1", // Extra wide card
    "lg:col-span-3 lg:row-span-1", // Extra wide card
  ]

  return (
    <section ref={sectionRef} className="section-padding relative project-bg">
      <div className="container mx-auto">
        <div className={cn("text-center mb-10 transition-all duration-700", isVisible ? "opacity-100" : "opacity-0")}>
       
        </div>

        {/* two-column layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 3D project model on the left */}
          <div className="lg:col-span-4 lg:mt-120">
            <ProjectModelCanvas />
          </div>

          <div className="lg:col-span-8">
            {/* Liquid Glass Filter Navigation */}
            <div className="flex justify-center mb-8">
              <div 
                className={cn(
                  "backdrop-blur-xl border border-white/30 rounded-2xl px-4 py-3 shadow-2xl flex gap-2",
                  "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-white/20 before:to-transparent before:pointer-events-none",
                  "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-black/5 after:to-transparent after:pointer-events-none",
                  "relative"
                )}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                }}
              >
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 z-10",
                      activeCategory === c
                        ? "bg-white/30 text-gray-700 shadow-lg backdrop-blur-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/20",
                    )}
                    style={{ fontFamily: 'var(--font-agdasima)' }}
                  >
                    {activeCategory === c && (
                      <div className="absolute inset-0 rounded-xl ring-1 ring-white/40 bg-gradient-to-br from-white/50 to-white/20" />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[180px] gap-4">
              {filtered.map((p, i) => (
                <BentoCard key={p.id} p={p} span={spans[i % spans.length]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
