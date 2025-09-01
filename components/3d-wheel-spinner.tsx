"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"
import type { Player } from "./game-interface"

interface WheelSegment {
  player: Player
  startAngle: number
  endAngle: number
  color: string
}

function WheelMesh({
  segments,
  isSpinning,
  onSpinComplete,
  selectedPlayer,
}: {
  segments: WheelSegment[]
  isSpinning: boolean
  onSpinComplete: (player: Player, type: "truth" | "dare") => void
  selectedPlayer: Player | null
}) {
  const wheelRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState(0)
  const [spinSpeed, setSpinSpeed] = useState(0)
  const [isDecelerating, setIsDecelerating] = useState(false)

  useEffect(() => {
    if (isSpinning && !isDecelerating) {
      setSpinSpeed(0.3 + Math.random() * 0.2) // Random initial speed
      setIsDecelerating(false)
    }
  }, [isSpinning])

  useFrame((state, delta) => {
    if (wheelRef.current && isSpinning) {
      if (!isDecelerating && spinSpeed > 0.05) {
        // Spinning phase
        setRotation((prev) => prev + spinSpeed)
        wheelRef.current.rotation.z = rotation
      } else if (!isDecelerating) {
        // Start decelerating
        setIsDecelerating(true)
      } else {
        // Deceleration phase
        const newSpeed = spinSpeed * 0.98 // Gradual slowdown
        setSpinSpeed(newSpeed)
        setRotation((prev) => prev + newSpeed)
        wheelRef.current.rotation.z = rotation

        if (newSpeed < 0.01) {
          // Spin complete - determine winner
          const normalizedRotation = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
          const pointerAngle = Math.PI / 2 // Pointer at top
          const selectedAngle = (pointerAngle - normalizedRotation + Math.PI * 2) % (Math.PI * 2)

          const winner =
            segments.find((segment) => selectedAngle >= segment.startAngle && selectedAngle < segment.endAngle) ||
            segments[0]

          const questionType = Math.random() > 0.5 ? "truth" : "dare"
          onSpinComplete(winner.player, questionType)
        }
      }
    }
  })

  return (
    <group ref={wheelRef}>
      {/* Wheel segments */}
      {segments.map((segment, index) => {
        const segmentAngle = segment.endAngle - segment.startAngle
        const midAngle = segment.startAngle + segmentAngle / 2

        return (
          <group key={segment.player.id}>
            {/* Segment geometry */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, midAngle]}>
              <ringGeometry args={[1, 3, 1, Math.max(1, Math.floor((segmentAngle * 32) / (Math.PI * 2)))]} />
              <meshStandardMaterial
                color={segment.color}
                transparent
                opacity={selectedPlayer?.id === segment.player.id ? 1 : 0.8}
              />
            </mesh>

            {/* Player name text */}
            <Text
              position={[Math.cos(midAngle) * 2, Math.sin(midAngle) * 2, 0.1]}
              rotation={[0, 0, midAngle + Math.PI / 2]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-bold.woff"
            >
              {segment.player.name}
            </Text>
          </group>
        )
      })}

      {/* Center hub */}
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Pointer */}
      <mesh position={[0, 3.2, 0.2]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.2, 0.6, 3]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

interface SpinWheelProps {
  players: Player[]
  isSpinning: boolean
  onSpinComplete: (player: Player, type: "truth" | "dare") => void
  selectedPlayer: Player | null
}

export function SpinWheel({ players, isSpinning, onSpinComplete, selectedPlayer }: SpinWheelProps) {
  const segments: WheelSegment[] = players.map((player, index) => {
    const segmentAngle = (Math.PI * 2) / players.length
    const startAngle = index * segmentAngle
    const endAngle = (index + 1) * segmentAngle

    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ]

    return {
      player,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
    }
  })

  return (
    <div className="w-96 h-96 mx-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} />

        <WheelMesh
          segments={segments}
          isSpinning={isSpinning}
          onSpinComplete={onSpinComplete}
          selectedPlayer={selectedPlayer}
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
