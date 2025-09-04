"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ContactModelCanvas } from "@/components/three/models/contact-model"

// Contact form component matching the screenshot design
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [] as string[],
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interestOptions = ["Web-Design", "Web-Development", "Branding", "TechTalks" , "Others"]
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e49ae0e9-0ccd-4fc9-8ef6-55a8e7eac008",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          interests: formData.interests.join(", "),
        }),
      })

      const result = await response.json()
      if (result.success) {
        console.log(result)
        setIsSubmitted(true)
      } else {
        console.error("Form submission failed", result)
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Something went wrong. Please try again.")
    }

    setIsSubmitting(false)

    // Reset form after 3 seconds if successful
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          interests: [],
          message: "",
        })
      }, 3000)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-green-400">✓</span>
        </div>
        <h3 className="font-display font-bold text-2xl mb-2 text-green-400">Message Sent!</h3>
        <p className="text-gray-300">Thanks for reaching out. I'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h3 className="font-display font-bold text-2xl mb-2 text-white" style={{ fontFamily: 'var(--font-agdasima)' }}>GET IN TOUCH</h3>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
          Let&apos;s Talk
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-agdasima)' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              required
              style={{ fontFamily: 'var(--font-agdasima)' }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-agdasima)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="YOUR E-MAIL"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              required
              style={{ fontFamily: 'var(--font-agdasima)' }}
            />
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-white font-medium mb-3" style={{ fontFamily: 'var(--font-agdasima)' }}>LET'S DISCUSS</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  formData.interests.includes(interest)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:bg-gray-600/50",
                )}
                style={{ fontFamily: 'var(--font-agdasima)' }}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-white text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-agdasima)' }}>
            Message
          </label>
          <textarea
            id="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            rows={4}
            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors resize-none"
            required
            style={{ fontFamily: 'var(--font-agdasima)' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="font-display font-bold text-lg bg-green-500 text-black px-8 py-3 rounded-full hover:bg-green-400 transition-all"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden contact-bg">
      <div className="container mx-auto relative z-10">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[10vh]">
          {/* Left side - 3D Model */}
          <div
            className={cn(
              "flex-shrink-0 transition-all duration-1000",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <ContactModelCanvas />
          </div>

          {/* Right side - Contact form */}
          <div
            className={cn(
              "flex-shrink-0 transition-all duration-1000 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
