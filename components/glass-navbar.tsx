"use client"

import { useState, useEffect } from "react"
import { cn, scrollToId } from "@/lib/utils"
import { Home, Briefcase, FolderOpen, Zap, HelpCircle, Mail, Share } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Skills", href: "#skills", icon: Zap },
  { name: "FAQ", href: "#faq", icon: HelpCircle },
  { name: "Contact", href: "#contact", icon: Mail },
  { name: "Social", href: "#footer", icon: Share },
]

export default function GlassNavbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY < 50)
      const sections = navItems.map((item) => item.href.slice(1))
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section)
        if (el) {
          const r = el.getBoundingClientRect()
          return r.top <= 100 && r.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        "bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3 shadow-2xl",
        "before:absolute before:inset-0 before:rounded-xl sm:before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-white/20 before:to-transparent before:pointer-events-none",
        "after:absolute after:inset-0 after:rounded-xl sm:after:rounded-2xl after:bg-gradient-to-t after:from-black/5 after:to-transparent after:pointer-events-none",
        isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none",
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center gap-1 sm:gap-2 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.slice(1)
          const show = activeLabel === item.name
          return (
            <div key={item.name} className="relative">
              <a
                href={item.href}
                aria-label={`Go to ${item.name}`}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-300",
                  "hover:scale-105 hover:bg-white/20",
                  isActive 
                    ? "bg-white/30 text-gray-700 shadow-lg backdrop-blur-sm" 
                    : "text-gray-600 hover:text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const targetId = item.href.slice(1)
                  scrollToId(targetId)
                }}
                onMouseEnter={() => setActiveLabel(item.name)}
                onMouseLeave={() => setActiveLabel(null)}
              >
                <Icon size={16} className="sm:w-5 sm:h-5" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-white/40 bg-gradient-to-br from-white/50 to-white/20" />
                )}
              </a>
              {show && (
                <div className="font-content absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm rounded-md sm:rounded-lg border border-white/20 whitespace-nowrap">
                  {item.name}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-l border-t border-white/20" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
