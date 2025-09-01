"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles } from "lucide-react"
import { getRandomQuestion } from "@/lib/game-data"
import type { Player } from "@/components/player-management"

interface SimpleGameInterfaceProps {
  players: Player[]
  selectedLevel: number
  difficultyLevels: Array<{
    level: number
    name: string
    description: string
    color: string
    icon: string
  }>
  onBackToSetup: () => void
}

export function SimpleGameInterface({
  players,
  selectedLevel,
  difficultyLevels,
  onBackToSetup,
}: SimpleGameInterfaceProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<string>("")
  const [questionType, setQuestionType] = useState<"truth" | "dare">("truth")
  const [isRevealing, setIsRevealing] = useState(false)
  const [showEffects, setShowEffects] = useState(false)

  const selectedLevelData = difficultyLevels.find((l) => l.level === selectedLevel)

  const generateNewRound = () => {
    console.log("[v0] Starting new round generation")
    setIsRevealing(true)
    setShowEffects(true)

    // Show effects for 2 seconds
    setTimeout(() => {
      // Randomly select player and question type
      const randomPlayer = players[Math.floor(Math.random() * players.length)]
      const randomType = Math.random() > 0.5 ? "truth" : "dare"

      console.log("[v0] Selected player:", randomPlayer.name)
      console.log("[v0] Selected type:", randomType)
      console.log("[v0] Selected level:", selectedLevel)

      const questionData = getRandomQuestion(randomType, selectedLevel)
      const question = questionData
        ? questionData.text
        : `No ${randomType} questions available for level ${selectedLevel}`

      console.log("[v0] Retrieved question:", question)

      setCurrentPlayer(randomPlayer)
      setQuestionType(randomType)
      setCurrentQuestion(question)
      setShowEffects(false)
      setIsRevealing(false)
    }, 2000)
  }

  useEffect(() => {
    // Start first round automatically
    generateNewRound()
  }, [])

  if (showEffects) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-8xl mb-8">🍣</div>
          <div className="text-4xl font-bold text-primary mb-4 animate-pulse">Selecting Player...</div>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={onBackToSetup} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Setup
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedLevelData?.icon}</span>
            <Badge className={selectedLevelData?.color}>{selectedLevelData?.name}</Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {currentPlayer && (
            <Card className="mb-8 border-2 border-primary/20 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: currentPlayer.color }}
                  >
                    {currentPlayer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-3xl text-primary">{currentPlayer.name}</CardTitle>
                    <Badge
                      className={`mt-2 ${
                        questionType === "truth" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {questionType.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <p className="text-xl leading-relaxed text-foreground">{currentQuestion}</p>
                </div>

                <Button size="lg" onClick={generateNewRound} className="text-lg px-8 py-6" disabled={isRevealing}>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Next Round
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentPlayer?.id === player.id ? "border-primary bg-primary/10 scale-105" : "border-border bg-card"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: player.color }}
                  >
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium truncate">{player.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
