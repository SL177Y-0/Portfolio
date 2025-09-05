"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"

function ExperienceModel() {
  const { scene } = useGLTF('/models/experience.glb')
  const meshRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.12 + Math.sin(t * 0.25) * 0.06
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.05
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.03
  })
  
  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[2.4, 2.4, 2.4]} 
        position={[0, -1.8, 0]}
      />
    </group>
  )
}

const preloadModel = () => useGLTF.preload('/models/experience.glb')
setTimeout(preloadModel, 200)

export function ExperienceModelCanvas() {
  return (
    <div className="h-80 sm:h-96 lg:h-[28rem] bg-transparent">
      <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 8]} 
          fov={45}
          near={0.1}
          far={100}
        />
        <ambientLight intensity={0.9} />
        <pointLight position={[8, 8, 8]} intensity={1.1} />
        <pointLight position={[-6, 4, 6]} intensity={0.9} color="#3b82f6" />
        <spotLight position={[0, 10, 2]} angle={0.4} penumbra={0.9} intensity={1.2} color="#22c55e" />
        <spotLight position={[-4, 6, 4]} angle={0.35} penumbra={1} intensity={0.7} color="#f59e0b" />
        <Suspense fallback={null}>
          <ExperienceModel />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI * 0.85}
        />
      </Canvas>
    </div>
  )
}