"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Play } from "lucide-react"
import type * as THREE from "three"
import type { Player } from "@/components/player-management"

interface PlayerSpinnerProps {
  players: Player[]
  onPlayerSelected: (player: Player) => void
  isSpinning: boolean
  onSpinComplete: () => void
}

function SpinningWheel({
  players,
  targetIndex,
  isSpinning,
}: {
  players: Player[]
  targetIndex: number
  isSpinning: boolean
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current && isSpinning) {
      const targetRotation = (targetIndex / players.length) * Math.PI * 2 + Math.PI * 8
      const currentRotation = meshRef.current.rotation.z
      const diff = targetRotation - currentRotation

      if (Math.abs(diff) > 0.01) {
        meshRef.current.rotation.z += diff * delta * 2
      } else {
        meshRef.current.rotation.z = targetRotation
      }
    }
  })

  return (
    <group ref={meshRef}>
      {players.map((player, index) => {
        const angle = (index / players.length) * Math.PI * 2
        const x = Math.cos(angle) * 2
        const y = Math.sin(angle) * 2

        return (
          <group key={player.id} position={[x, y, 0]}>
            {/* Player segment */}
            <mesh rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
              <meshStandardMaterial color={player.color} />
            </mesh>

            {/* Player name */}
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist-Bold.ttf"
            >
              {player.name}
            </Text>
          </group>
        )
      })}

      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pointer */}
      <mesh position={[0, 2.5, 0.2]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.2, 0.5, 3]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  )
}

export function PlayerSpinner({ players, onPlayerSelected, isSpinning, onSpinComplete }: PlayerSpinnerProps) {
  const [targetPlayerIndex, setTargetPlayerIndex] = useState(0)
  const [hasSpun, setHasSpun] = useState(false)

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * players.length)
    setTargetPlayerIndex(randomIndex)
    setHasSpun(true)

    // Simulate spin duration
    setTimeout(() => {
      onPlayerSelected(players[randomIndex])
      onSpinComplete()
    }, 3000)
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Player Spinner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Spinner */}
        <div className="h-64 w-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <SpinningWheel players={players} targetIndex={targetPlayerIndex} isSpinning={isSpinning} />
            <Environment preset="sunset" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Current players */}
        <div className="flex flex-wrap gap-2 justify-center">
          {players.map((player, index) => (
            <Badge
              key={player.id}
              variant="outline"
              className={`${
                index === targetPlayerIndex && hasSpun ? "bg-primary text-primary-foreground animate-pulse-glow" : ""
              }`}
              style={{
                backgroundColor: !hasSpun || index !== targetPlayerIndex ? player.color + "20" : undefined,
                borderColor: player.color,
              }}
            >
              {player.name}
            </Badge>
          ))}
        </div>

        {/* Spin button */}
        <Button onClick={spinWheel} disabled={isSpinning} className="w-full hover-lift animate-pulse-glow" size="lg">
          <Play className="mr-2 h-4 w-4" />
          {isSpinning ? "Spinning..." : "Spin to Choose Player"}
        </Button>
      </CardContent>
    </Card>
  )
}
