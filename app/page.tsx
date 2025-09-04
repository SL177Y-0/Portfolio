"use client"
import HeroSection from "@/components/sections/hero-section"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import FAQSection from "@/components/sections/faq-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/sections/footer"
import GlassNavbar from "@/components/glass-navbar"
import MarqueePartition from "@/components/marquee-partition"

export default function Portfolio() {
  // removed custom cursor logic
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
          <ExperienceSection />
        </section>

        <MarqueePartition text="• PROJECTS • INNOVATION • CREATIVITY" direction="right" speed="normal" />

        <section id="projects" aria-label="Projects">
          <ProjectsSection />
        </section>

        <MarqueePartition text="• SKILLS • EXPERTISE • MASTERY" direction="left" speed="normal" />

        <section id="skills" aria-label="Skills">
          <SkillsSection />
        </section>

        <MarqueePartition text="• QUESTIONS • ANSWERS • CLARITY" direction="right" speed="normal" />

        <section id="faq" aria-label="FAQ">
          <FAQSection />
        </section>

        <MarqueePartition text="• CONNECT • COLLABORATE • CREATE" direction="left" speed="normal" />

        <section id="contact" aria-label="Contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}
