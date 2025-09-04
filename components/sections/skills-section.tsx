"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Mapping of skills from sequence.txt to their image files
const skillsData = [
  { name: "C", image: "/Skills/C.png" },
  { name: "JavaScript", image: "/Skills/JAVASCRIPT.png" },
  { name: "TypeScript", image: "/Skills/TYPESCRIPT.png" },
  { name: "Python", image: "/Skills/PYTHON.png" },
  { name: "Golang", image: "/Skills/GOLANG.png" },
  { name: "Rust", image: "/Skills/RUST.png" },
  { name: "Solidity", image: "/Skills/SOLIDITY.png" },
  { name: "HTML", image: "/Skills/HTML.png" },
  { name: "CSS", image: "/Skills/CSS.png" },
  { name: "Shell", image: "/Skills/SHELL.png" },
  { name: "React.js", image: "/Skills/REACTJS.png" },
  { name: "Next.js", image: "/Skills/NEXTJS.png" },
  { name: "Vite", image: "/Skills/VITE.png" },
  { name: "Redux", image: "/Skills/REDUX.png" },
  { name: "React Native", image: "/Skills/NATIVE.png" },
  { name: "Tailwind CSS", image: "/Skills/TAILWIND.png" },
  { name: "ShadCN", image: "/Skills/SHADCN.png" },
  { name: "Three.js", image: "/Skills/THREEJS.png" },
  { name: "Phaser", image: "/Skills/PHASER.png" },
  { name: "Node.js", image: "/Skills/NODEJS.png" },
  { name: "Express.js", image: "/Skills/EXPRESSJS.png" },
  { name: "NestJS", image: "/Skills/NESTJS.png" },
  { name: "FastAPI", image: "/Skills/FASTAPI.png" },
  { name: "MongoDB", image: "/Skills/MONGODB.png" },
  { name: "PostgreSQL", image: "/Skills/POSTGRESQL.png" },
  { name: "MySQL", image: "/Skills/MYSQL.png" },
  { name: "DynamoDB", image: "/Skills/DYNAMODB.png" },
  { name: "Supabase", image: "/Skills/SUPABASE.png" },
  { name: "Prisma ORM", image: "/Skills/PRISMAORM.png" },
  { name: "Postman", image: "/Skills/POSTMAN.png" },
  { name: "Jest", image: "/Skills/JEST.png" },
  { name: "Socket.io", image: "/Skills/SOCKET.png" },
  { name: "AWS", image: "/Skills/AWS.png" },
  { name: "Docker", image: "/Skills/DOCKER.png" },
  { name: "Render", image: "/Skills/RENDER.png" },
  { name: "Vercel", image: "/Skills/VERCEL.png" },
  { name: "Ubuntu", image: "/Skills/UBUNTU.png" },
  { name: "WebContainer", image: "/Skills/WEBCONTAINER.png" },
  { name: "EVM", image: "/Skills/EVM.png" },
  { name: "Ether.js", image: "/Skills/ETHERJS.png" },
  { name: "Hardhat", image: "/Skills/HARDHAT.png" },
  { name: "OpenZeppelin", image: "/Skills/OPENZEP.png" },
  { name: "IPFS", image: "/Skills/IPFS.png" },
  { name: "Solana", image: "/Skills/SOLANA.png" },
  { name: "Hugging Face", image: "/Skills/HUGGING.png" },
  { name: "GenAI", image: "/Skills/GENAI.png" },
  { name: "Prompt Engineering", image: "/Skills/PROMPT.png" },
  { name: "GitHub", image: "/Skills/GITHUB.png" },
  { name: "VibeCode", image: "/Skills/VIBECODE.png" },
]

// Skill card component with hover effects
function SkillCard({ skill, index, hoveredIndex }: { 
  skill: { name: string; image: string }; 
  index: number; 
  hoveredIndex: number | null 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

  return (
    <div
      className={cn(
        "relative aspect-square cursor-pointer transition-all duration-500 ease-out overflow-visible",
        isHovered && "z-20 scale-150 rounded-lg",
        isOtherHovered && "blur-[2px] opacity-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={skill.image}
        alt={skill.name}
        fill
        className={cn(
          "transition-all duration-200 ease-out",
          !isHovered ? "object-cover object-top" : "object-contain object-center",
          isHovered && "rounded-lg"
        )}
      />
    </div>
  )
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), {
      threshold: 0.2,
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-black"
    >
      <div className="relative z-10">
        {/* Interactive grid of skill cards with padding for hover expansion */}
        <div
          className={cn(
            "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 min-h-screen transition-all duration-1000",
            "gap-0 py-8 sm:py-12 lg:py-16", // Responsive vertical padding
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-100",
          )}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {skillsData.map((skill, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <SkillCard 
                skill={skill} 
                index={index} 
                hoveredIndex={hoveredIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}