"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"

// GLB Project Model
function ProjectModel() {
  const { scene } = useGLTF('/models/project.glb')
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Smoother floating animation with varying frequencies
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.18 + Math.sin(t * 0.2) * 0.08
    
    // Gentle multi-axis rotation for more dynamic movement
    meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.08
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.04
  })
  
  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2.8, 2.8, 2.8]} 
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the GLB model
useGLTF.preload('/models/project.glb')

export function ProjectModelCanvas() {
  return (
    <div className="h-[20rem] sm:h-[28rem] lg:h-[36rem] bg-transparent">
      <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 8]} 
          fov={50}
          near={0.1}
          far={100}
        />
        <ambientLight intensity={0.85} />
        <pointLight position={[12, 8, 8]} intensity={1.3} />
        <pointLight position={[-8, 6, 4]} intensity={0.8} color="#8b5cf6" />
        <spotLight position={[0, 12, 4]} angle={0.45} penumbra={0.7} intensity={1.4} color="#22c55e" />
        <spotLight position={[5, 4, 6]} angle={0.3} penumbra={1} intensity={0.8} color="#ef4444" />
        <Suspense fallback={null}>
          <ProjectModel />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.04}
          autoRotate
          autoRotateSpeed={0.9}
          minPolarAngle={Math.PI / 12}
          maxPolarAngle={Math.PI * 0.9}
        />
      </Canvas>
    </div>
  )
}