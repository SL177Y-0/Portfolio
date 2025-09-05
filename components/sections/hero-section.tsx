"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Text, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"
import { scrollToId } from "@/lib/utils"

function HeroModel() {
  const { scene } = useGLTF('/models/rishihero.glb')
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.1
  })
  
  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -2.0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/rishihero.glb')

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const handleProjectViewClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId("projects")
  }

  // Enhanced video loop handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoLoop = () => {
      // Smooth restart by briefly reducing opacity during transition
      video.style.opacity = "0.95"
      setTimeout(() => {
        video.style.opacity = "1"
      }, 100)
    }

    const onDataLoaded = () => {
      console.log("Video data loaded successfully.")
      // Set the playback speed to 75% of the original
      video.playbackRate = 0.75
    }

    const onError = (e: Event) => {
      console.error("Video Error:", e)
      if (video.error) {
        console.error("Video error code:", video.error.code)
        console.error("Video error message:", video.error.message)
      }
    }

    const onStalled = () => {
      console.warn("Video stalled: The browser is trying to get media data, but data is not available.")
    }

    const onSuspend = () => {
      console.warn("Video suspend: The browser is intentionally not getting media data.")
    }

    video.addEventListener("loadeddata", onDataLoaded)
    video.addEventListener("error", onError)
    video.addEventListener("stalled", onStalled)
    video.addEventListener("suspend", onSuspend)
    video.addEventListener("ended", handleVideoLoop)
    video.addEventListener("seeked", handleVideoLoop)

    return () => {
      video.removeEventListener("loadeddata", onDataLoaded)
      video.removeEventListener("error", onError)
      video.removeEventListener("stalled", onStalled)
      video.removeEventListener("suspend", onSuspend)
      video.removeEventListener("ended", handleVideoLoop)
      video.removeEventListener("seeked", handleVideoLoop)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Enhanced Video Background with Smooth Looping */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          poster="https://res.cloudinary.com/dyfbk6hzo/image/upload/v1757068060/Screenshot_2025-09-05_155700_adkrbq.png"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out"
        >
          <source
            src="https://res.cloudinary.com/dyfbk6hzo/video/upload/f_auto,q_auto/v1757067440/hero008_4_rzkq0v.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Subtle overlay animation to further mask any loop transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-20 pt-32 sm:pt-40 lg:pt-48 xl:pt-0">
        {/* Mobile: Vertical stack, Desktop: 2-column grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen lg:min-h-0">
          
          {/* 3D Model - First on mobile, second on desktop */}
          <div className="order-1 lg:order-2 w-full h-64 sm:h-80 md:h-96 lg:h-[500px] transition-all duration-300">
            <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
              <PerspectiveCamera makeDefault position={[0, 2, 5]} />
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <spotLight position={[0, 8, 2]} angle={0.35} penumbra={1} intensity={0.9} color="#22c55e" />
              <Suspense fallback={null}>
                <HeroModel />
              </Suspense>
              {/* OrbitControls for 360° rotation with auto-rotate */}
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                autoRotate
                autoRotateSpeed={0.6}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
              />
            </Canvas>
          </div>

          {/* Text and Button - Second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 pt-8 sm:pt-12 lg:pt-16 xl:pt-20">
            <h1 
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight text-black" 
              style={{ 
                fontFamily: 'var(--font-runker)', 
                lineHeight: '0.8',
                letterSpacing: '0.01rem'
              }}
            >
              Crafting Web<br />
              Experiences @ One<br />
              Pixel Per MilliSecond
            </h1>
            
            <div className="flex justify-center lg:justify-start items-center gap-2 pt-2">
              <a href="#projects" onClick={handleProjectViewClick} className="btn bg-black scale-75 sm:scale-90 lg:scale-100">
                <span className="btn__content bg-[#FFDE21] text-black font-bold text-xs sm:text-sm lg:text-base" style={{ fontFamily: 'var(--font-syne)' }}>
                  VIEW MY PROJECTS
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
