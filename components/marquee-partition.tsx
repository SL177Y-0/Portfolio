"use client"

import { useEffect, useState } from "react"

interface MarqueePartitionProps {
  text: string
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
}

export default function MarqueePartition({ text, direction = "left", speed = "normal" }: MarqueePartitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const id = `marquee-${text.replace(/\s+/g, "-").toLowerCase()}`

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), {
      threshold: 0.1,
    })
    const el = document.getElementById(id)
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  const speedBase =
    speed === "slow" ? "animate-marquee-slow" : speed === "fast" ? "animate-marquee-fast" : "animate-marquee"
  const dirClass = direction === "right" ? `${speedBase} animate-marquee-reverse` : speedBase

  return (
    <div id={id} className="relative h-24 overflow-hidden">
      {/* diagonal stripe with dark charcoal background */}
      <div
        className="absolute inset-0"
        style={{
          transform: direction === "right" ? "skewY(-3deg) scaleY(2.0)" : "skewY(3deg) scaleY(2.0)",
          transformOrigin: "center",
          background: "#1a1a1a", // Dark charcoal background
          width: "110%",
          left: "-5%",
        }}
      />
      <div className={`absolute inset-0 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
        {/* Infinite marquee line */}
        <div 
          className={`flex items-center h-full whitespace-nowrap ${dirClass}`}
          style={{
            willChange: 'transform',
          }}
        >
          {/* Create enough repetitions to ensure seamless scrolling */}
          {Array.from({ length: 200 }).map((_, i) => {
            const parts = text.split("•").map(p => p.trim()).filter(Boolean);
            return (
              <div
                key={i}
                className="font-black text-4xl uppercase tracking-widest flex-shrink-0"
                style={{
                  fontFamily: "Impact, Haettenschweiler, 'Arial Black', sans-serif",
                  marginRight: "2rem", // Consistent spacing
                }}
              >
                {parts.map((part, index) => {
                  const styles: React.CSSProperties[] = [
                    { color: "#DFFF00" }, // Lime Green
                    { color: "#808080", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }, // Dark Gray with shadow
                    { color: "#FFFFFF", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }, // White with shadow
                  ];
                  return (
                    <span key={index} style={styles[index % 3]}>
                      {part}{" "}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
