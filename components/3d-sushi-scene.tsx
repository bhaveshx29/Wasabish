"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei"
import { Suspense } from "react"

function SushiRoll({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Sushi roll base */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
          <meshStandardMaterial color="#f4f4f4" />
        </mesh>
        {/* Nori (seaweed) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.25, 16]} />
          <meshStandardMaterial color="#2d4a2b" />
        </mesh>
        {/* Salmon */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    </Float>
  )
}

function Wasabi({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={position}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </Float>
  )
}

function SushiScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SushiRoll position={[-2, 0, 0]} />
      <SushiRoll position={[2, 0, 0]} />
      <Wasabi position={[0, 1, 0]} />
      <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} position={[-1.5, -2, 0]}>
        Wasabish
        <meshStandardMaterial color="#d97706" />
      </Text3D>
      <Environment preset="sunset" />
    </>
  )
}

export function SushiScene3D() {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <SushiScene />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
