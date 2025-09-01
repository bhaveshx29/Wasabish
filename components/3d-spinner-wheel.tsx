"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Player {
  id: string
  name: string
  color: string
}

interface SpinnerWheelProps {
  players: Player[]
  onPlayerSelected: (player: Player, questionType: "truth" | "dare") => void
}

function WheelSegment({
  player,
  index,
  totalPlayers,
  rotation,
}: {
  player: Player
  index: number
  totalPlayers: number
  rotation: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const segmentAngle = (Math.PI * 2) / totalPlayers
  const startAngle = index * segmentAngle + rotation

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation
    }
  })

  return (
    <group>
      {/* Wheel segment */}
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, startAngle]}>
        <ringGeometry args={[1, 2.5, 0, segmentAngle]} />
        <meshStandardMaterial color={player.color} />
      </mesh>

      {/* Player name text */}
      <Text
        position={[Math.cos(startAngle + segmentAngle / 2) * 1.75, Math.sin(startAngle + segmentAngle / 2) * 1.75, 0.1]}
        rotation={[0, 0, startAngle + segmentAngle / 2 + Math.PI / 2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {player.name}
      </Text>
    </group>
  )
}

function SpinningWheel({
  players,
  isSpinning,
  finalRotation,
}: {
  players: Player[]
  isSpinning: boolean
  finalRotation: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [currentRotation, setCurrentRotation] = useState(0)

  useFrame((state, delta) => {
    if (groupRef.current && isSpinning) {
      const speed = 10 * (1 - currentRotation / finalRotation)
      const newRotation = currentRotation + speed * delta

      if (newRotation >= finalRotation) {
        setCurrentRotation(finalRotation)
      } else {
        setCurrentRotation(newRotation)
        groupRef.current.rotation.z = newRotation
      }
    }
  })

  useEffect(() => {
    if (!isSpinning) {
      setCurrentRotation(0)
      if (groupRef.current) {
        groupRef.current.rotation.z = 0
      }
    }
  }, [isSpinning])

  return (
    <group ref={groupRef}>
      {players.map((player, index) => (
        <WheelSegment key={player.id} player={player} index={index} totalPlayers={players.length} rotation={0} />
      ))}

      {/* Center circle */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Pointer */}
      <mesh position={[0, 2.8, 0.2]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.2, 0.5, 3]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  )
}

export function SpinnerWheel3D({ players, onPlayerSelected }: SpinnerWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [questionType, setQuestionType] = useState<"truth" | "dare" | null>(null)
  const [finalRotation, setFinalRotation] = useState(0)

  const spin = () => {
    if (isSpinning || players.length === 0) return

    setIsSpinning(true)
    setSelectedPlayer(null)
    setQuestionType(null)

    // Calculate random final rotation
    const spins = 3 + Math.random() * 3 // 3-6 full spins
    const segmentAngle = (Math.PI * 2) / players.length
    const randomSegment = Math.floor(Math.random() * players.length)
    const finalRot = spins * Math.PI * 2 + randomSegment * segmentAngle

    setFinalRotation(finalRot)

    // Stop spinning after animation
    setTimeout(() => {
      setIsSpinning(false)
      const selectedIndex = Math.floor((finalRot % (Math.PI * 2)) / segmentAngle)
      const player = players[selectedIndex] || players[0]
      const type = Math.random() > 0.5 ? "truth" : "dare"

      setSelectedPlayer(player)
      setQuestionType(type)

      setTimeout(() => {
        onPlayerSelected(player, type)
      }, 1000)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-80 h-80 bg-gradient-to-br from-card to-muted rounded-full p-4">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SpinningWheel players={players} isSpinning={isSpinning} finalRotation={finalRotation} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {selectedPlayer && questionType && (
        <Card className="max-w-md">
          <CardContent className="text-center p-6">
            <div className="text-2xl mb-2">{selectedPlayer.name}</div>
            <div className="text-lg font-semibold text-primary mb-2">{questionType.toUpperCase()}</div>
          </CardContent>
        </Card>
      )}

      <Button size="lg" onClick={spin} disabled={isSpinning || players.length === 0} className="text-lg px-8 py-6">
        {isSpinning ? "Spinning..." : "🎯 Spin the Wheel"}
      </Button>
    </div>
  )
}
