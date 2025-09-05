"use client"
import { lazy, Suspense } from "react"
import HeroSection from "@/components/sections/hero-section"
import GlassNavbar from "@/components/glass-navbar"
import MarqueePartition from "@/components/marquee-partition"

const ExperienceSection = lazy(() => import("@/components/sections/experience-section"))
const ProjectsSection = lazy(() => import("@/components/sections/projects-section"))
const SkillsSection = lazy(() => import("@/components/sections/skills-section"))
const FAQSection = lazy(() => import("@/components/sections/faq-section"))
const ContactSection = lazy(() => import("@/components/sections/contact-section"))
const Footer = lazy(() => import("@/components/sections/footer"))

const SectionSkeleton = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900/10 to-gray-800/10 animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-3 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function Portfolio() {
  return (
    <div>
      <GlassNavbar />
      <main>
        <section id="hero" aria-label="Hero">
          <HeroSection />
        </section>

        {/* alternate marquee directions (tilt auto derives from direction) */}
        <MarqueePartition text="• EXPERIENCE • JOURNEY • GROWTH" direction="left" speed="normal" />

        <section id="experience" aria-label="Experience">
          <Suspense fallback={<SectionSkeleton />}>
            <ExperienceSection />
          </Suspense>
        </section>

        <MarqueePartition text="• PROJECTS • INNOVATION • CREATIVITY" direction="right" speed="normal" />

        <section id="projects" aria-label="Projects">
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectsSection />
          </Suspense>
        </section>

        <MarqueePartition text="• SKILLS • EXPERTISE • MASTERY" direction="left" speed="normal" />

        <section id="skills" aria-label="Skills">
          <Suspense fallback={<SectionSkeleton />}>
            <SkillsSection />
          </Suspense>
        </section>

        <MarqueePartition text="• QUESTIONS • ANSWERS • CLARITY" direction="right" speed="normal" />

        <section id="faq" aria-label="FAQ">
          <Suspense fallback={<SectionSkeleton />}>
            <FAQSection />
          </Suspense>
        </section>

        <MarqueePartition text="• CONNECT • COLLABORATE • CREATE" direction="left" speed="normal" />

        <section id="contact" aria-label="Contact">
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
        </section>
      </main>
      <Suspense fallback={<SectionSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  )
}
