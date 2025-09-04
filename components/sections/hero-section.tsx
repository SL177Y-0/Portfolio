"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Text, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"
import { scrollToId } from "@/lib/utils"

// GLB Hero Model
function HeroModel() {
  const { scene } = useGLTF('/models/rishihero.glb')
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle floating animation
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.1
  })
  
  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -2.0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the GLB model
useGLTF.preload('/models/rishihero.glb')

function Logo3D() {
  const ref = useRef<Group>(null)
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.1
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.05
    }
  })
  return (
    <group ref={ref}>
     
      {/* removed backing box to eliminate black rectangle behind text */}
    </group>
  )
}

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
      video.style.opacity = '0.95'
      setTimeout(() => {
        video.style.opacity = '1'
      }, 100)
    }

    // Preload and setup smooth playback
    video.addEventListener('loadeddata', () => {
      console.log('Video data loaded successfully.');
      video.style.opacity = '1'
      // Set the playback speed to 75% of the original
      video.playbackRate = 0.75
    });

    video.addEventListener('error', (e) => {
      console.error('Video Error:', e);
      // You can inspect the error object in the console for more details
      if (video.error) {
        console.error('Video error code:', video.error.code);
        console.error('Video error message:', video.error.message);
      }
    });

    video.addEventListener('stalled', () => {
      console.warn('Video stalled: The browser is trying to get media data, but data is not available.');
    });

    video.addEventListener('suspend', () => {
      console.warn('Video suspend: The browser is intentionally not getting media data.');
    });

    video.addEventListener('ended', handleVideoLoop)
    video.addEventListener('seeked', handleVideoLoop)

    return () => {
      video.removeEventListener('ended', handleVideoLoop)
      video.removeEventListener('seeked', handleVideoLoop)
      video.removeEventListener('error', () => {});
      video.removeEventListener('stalled', () => {});
      video.removeEventListener('suspend', () => {});
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Enhanced Video Background with Smooth Looping */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          poster="/Bg/gradbg.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out"
          style={{ opacity: 0 }}
        >
          <source src="/Bg/hero008.mp4" type="video/mp4" />
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
            {/* 
            ====== FONT SWITCHING GUIDE ======
            
            To change the hero font, replace 'var(--font-sledge)' in fontFamily below with any of these options:
            
            🎨 AVAILABLE FONTS:
            • var(--font-boughy)     → Boughy (original choice, M/W issues)
            • var(--font-sledge)     → Sledge (current, good for headers)
            • var(--font-brans)      → Brans (medium weight, clean)
            • var(--font-brodaers)   → Brodaers (expanded/wide, great for hero)
            • var(--font-leon-slab)  → Leon Slab (serif, classic)
            • var(--font-runker)     → Runker (bold italic, dramatic)
            • var(--font-spot)       → Spot (normal, clean)
            • var(--font-spot-italic)→ Spot Italic (stylish)
            • var(--font-wosker)     → Wosker (demo font)
            
            💡 RECOMMENDED FOR HERO:
            • Brodaers (expanded/wide fonts work great for hero text)
            • Sledge (current choice, good balance)
            • Leon Slab (if you want serif elegance)
            
            📝 HOW TO SWITCH:
            Just change: fontFamily: 'var(--font-sledge)'
            To:         fontFamily: 'var(--font-brodaers)'
            */}
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

      {/* Removed top-right social bubbles; keep logo */}
      <div className="absolute top-8 left-8 w-32 h-20 z-20">
        <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 3]} />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.0} />
          <Suspense fallback={null}>
            <Logo3D />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
