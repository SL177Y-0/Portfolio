"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"

// GLB Contact Model
function ContactModel() {
  const { scene } = useGLTF('/models/contact.glb')
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Smoother floating animation with eased curves
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15 + Math.sin(t * 0.3) * 0.05
    
    // Gentle rotation on Y-axis
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.1
  })
  
  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[3.0, 3.0, 3.0]} 
        position={[0, -2.9, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the GLB model
useGLTF.preload('/models/contact.glb')

export function ContactModelCanvas() {
  return (
    <div className="h-[16rem] sm:h-[24rem] lg:h-[32rem] bg-transparent">
      <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 8]} 
          fov={45}
          near={0.1}
          far={100}
        />
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <pointLight position={[-5, 5, 5]} intensity={0.8} color="#60a5fa" />
        <spotLight position={[0, 8, 3]} angle={0.4} penumbra={0.8} intensity={1.1} color="#22c55e" />
        <spotLight position={[3, 3, 3]} angle={0.3} penumbra={1} intensity={0.6} color="#a855f7" />
        <Suspense fallback={null}>
          <ContactModel />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  )
}