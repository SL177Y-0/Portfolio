"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Mapping of skills from sequence.txt to their image files
const skillsData = [
  { name: "C", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060887/C_rlm3ta.png" },
  { name: "JavaScript", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060888/JAVASCRIPT_hzpr9o.png" },
  { name: "TypeScript", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060891/TYPESCRIPT_x6sqij.png" },
  { name: "Python", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060887/PYTHON_mcvdzp.png" },
  { name: "Golang", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060888/GOLANG_vkuvey.png" },
  { name: "Rust", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060886/RUST_uukprw.png" },
  { name: "Solidity", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060887/SOLIDITY_anrwj4.png" },
  { name: "HTML", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060887/HTML_ftbwz4.png" },
  { name: "CSS", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060890/CSS_eonecj.png" },
  { name: "Shell", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060886/SHELL_eimcb3.png" },
  { name: "React.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060885/REACTJS_wituj4.png" },
  { name: "Next.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060885/NEXTJS_l2v7v5.png" },
  { name: "Vite", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060885/VITE_twkqnu.png" },
  { name: "Redux", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060884/REDUX_c4d5w7.png" },
  { name: "React Native", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060885/NATIVE_yoguj0.png" },
  { name: "Tailwind CSS", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060886/TAILWIND_l7xxfv.png" },
  { name: "ShadCN", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060884/SHADCN_cqs2aq.png" },
  { name: "Three.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060879/THREEJS_ywsxth.png" },
  { name: "Phaser", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060878/PHASER_v5yktz.png" },
  { name: "Node.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060884/NODEJS_riey8c.png" },
  { name: "Express.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060883/EXPRESSJS_meqsys.png" },
  { name: "NestJS", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060883/NESTJS_ushlm6.png" },
  { name: "FastAPI", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060882/FASTAPI_ffvp2a.png" },
  { name: "MongoDB", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060876/MONGODB_ksftse.png" },
  { name: "PostgreSQL", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060878/POSTGRESQL_a5tig8.png" },
  { name: "MySQL", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060877/MYSQL_z7yghj.png" },
  { name: "DynamoDB", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060875/DYNAMODB_apjuyy.png" },
  { name: "Supabase", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060879/SUPABASE_u58kow.png" },
  { name: "Prisma ORM", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060887/PRISMAORM_n4o603.png" },
  { name: "Postman", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060879/POSTMAN_ibh19e.png" },
  { name: "Jest", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060878/JEST_zzv67l.png" },
  { name: "Socket.io", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060882/SOCKET_kmwrdu.png" },
  { name: "AWS", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060877/AWS_v892uh.png" },
  { name: "Docker", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060877/DOCKER_nr5wis.png" },
  { name: "Render", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060879/RENDER_mgejgi.png" },
  { name: "Vercel", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060876/VERCEL_rkey0z.png" },
  { name: "Ubuntu", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060875/UBUNTU_tvheko.png" },
  { name: "WebContainer", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060881/WEBCONTAINER_cpd0gi.png" },
  { name: "EVM", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060880/EVM_thjewi.png" },
  { name: "Ether.js", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060882/ETHERJS_ouh58o.png" },
  { name: "Hardhat", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060882/HARDHAT_ip82pk.png" },
  { name: "OpenZeppelin", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060880/OPENZEP_qaml8u.png" },
  { name: "IPFS", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060881/IPFS_yevnhu.png" },
  { name: "Solana", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060880/SOLANA_ivbuew.png" },
  { name: "Hugging Face", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060880/HUGGING_dsqdki.png" },
  { name: "GenAI", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060881/GENAI_gedqip.png" },
  { name: "Prompt Engineering", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060885/PROMPT_zeamaz.png" },
  { name: "GitHub", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060876/GITHUB_ratlfn.png" },
  { name: "VibeCode", image: "https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757060883/VIBECODE_hf7tzq.png" },
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
