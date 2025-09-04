"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useRef } from "react"
import type { Group } from "three"

function BodyModel() {
  const g = useRef<Group>(null)
  useFrame((s) => {
    if (!g.current) return
    const t = s.clock.getElapsedTime()
    g.current.rotation.y += 0.002
    g.current.position.y = Math.sin(t * 0.8) * 0.05
  })
  return (
    <group ref={g}>
      {/* Torso */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.28, 0.35, 1.0, 24]} />
        <meshStandardMaterial color="#22c55e" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#0891b2" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.45, 0.6, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 20]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[0.45, 0.6, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 20]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.15, -0.3, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 20]} />
        <meshStandardMaterial color="#14b8a6" />
      </mesh>
      <mesh position={[0.15, -0.3, 0]} rotation={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 20]} />
        <meshStandardMaterial color="#14b8a6" />
      </mesh>
    </group>
  )
}

export function BodyCanvas() {
  return (
    <div className="h-80 sm:h-96 lg:h-[28rem] bg-transparent">
      <Canvas style={{ background: 'transparent' }} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.9, 3.2]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[6, 6, 6]} intensity={1.0} />
        <spotLight position={[0, 4, 2]} angle={0.35} penumbra={1} intensity={0.9} color="#22c55e" />
        <BodyModel />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  )
}
