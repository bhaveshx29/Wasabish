"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Moon, Sun, Home, RotateCcw, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { getRandomQuestion, type GameQuestion } from "@/lib/game-data"
import { cn } from "@/lib/utils"
import { ParticleEffect } from "@/components/particle-effect"
import { SpinWheel } from "@/components/3d-wheel-spinner"

export interface Player {
  id: string
  name: string
  color: string
  isActive?: boolean
  score?: number
}

export interface DifficultyLevel {
  level: number
  name: string
  description: string
  color: string
  icon: string
}

interface GameInterfaceProps {
  players: Player[]
  selectedLevel: number
  difficultyLevels: DifficultyLevel[]
  onBackToSetup: () => void
}

export function GameInterface({ players, selectedLevel, difficultyLevels, onBackToSetup }: GameInterfaceProps) {
  const { theme, setTheme } = useTheme()
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null)
  const [questionType, setQuestionType] = useState<"truth" | "dare" | null>(null)
  const [roundCount, setRoundCount] = useState(1)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)

  const currentLevel = difficultyLevels.find((level) => level.level === selectedLevel)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const handleSpinComplete = (player: Player, type: "truth" | "dare") => {
    const question = getRandomQuestion(type, selectedLevel)
    if (question) {
      setCurrentPlayer(player)
      setCurrentQuestion(question)
      setQuestionType(type)
      setTimer(60)
      setIsTimerRunning(true)
      setIsSpinning(false)
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 800)
    }
  }

  const nextTurn = () => {
    setCurrentPlayer(null)
    setCurrentQuestion(null)
    setQuestionType(null)
    setTimer(0)
    setIsTimerRunning(false)
    setRoundCount((prev) => prev + 1)
    setIsSpinning(true)
  }

  const startSpin = () => {
    setIsSpinning(true)
  }

  const resetGame = () => {
    setCurrentPlayer(null)
    setCurrentQuestion(null)
    setQuestionType(null)
    setRoundCount(1)
    setTimer(0)
    setIsTimerRunning(false)
    setIsSpinning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 animate-slide-up">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBackToSetup} size="sm" className="hover-lift bg-transparent">
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={resetGame} size="sm" className="hover-lift bg-transparent">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="animate-pulse">
              Round {roundCount}
            </Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover-lift"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Game Progress */}
        <div className="max-w-4xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Game Progress</span>
            <Badge className={cn(currentLevel?.color, "animate-pulse")}>
              <span className="animate-float">{currentLevel?.icon}</span>
              <span className="ml-1">{currentLevel?.name}</span>
            </Badge>
          </div>
          <Progress value={currentQuestion ? 100 : 0} className="h-2" />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Spinning Wheel or Question Display */}
          {!currentQuestion ? (
            <div className="text-center">
              <div className="mb-8 animate-bounce-in">
                <h1 className="text-4xl font-bold text-primary mb-4">
                  {roundCount === 1 ? "Let's Start!" : "Next Player!"}
                </h1>
                <p className="text-muted-foreground text-lg">Spin the wheel to see who gets the challenge</p>
              </div>

              <div className="mb-8">
                <SpinWheel
                  players={players}
                  isSpinning={isSpinning}
                  onSpinComplete={handleSpinComplete}
                  selectedPlayer={currentPlayer}
                />
              </div>

              {!isSpinning && (
                <Button onClick={startSpin} size="lg" className="animate-pulse-glow hover-lift">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Spin the Wheel!
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Current Player */}
              <Card className="mb-6 glass-card hover-lift animate-bounce-in">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                    <span className="text-2xl">{questionType === "truth" ? "🤔" : "⚡"}</span>
                  </div>
                  <CardTitle className="text-2xl">{currentPlayer?.name}'s Challenge</CardTitle>
                  <CardDescription>
                    <Badge
                      className={cn(
                        questionType === "truth"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                        "animate-pulse mr-2",
                      )}
                    >
                      {questionType === "truth" ? "🤔 Truth" : "⚡ Dare"}
                    </Badge>
                    {timer > 0 && (
                      <span
                        className={cn(
                          "font-mono text-sm",
                          timer <= 10 ? "text-red-500 animate-pulse" : "text-muted-foreground",
                        )}
                      >
                        {formatTime(timer)}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Question Display */}
              <Card className="mb-6 glass-card hover-lift animate-bounce-in">
                <CardHeader>
                  <CardTitle className="text-lg leading-relaxed animate-shimmer text-center">
                    {currentQuestion.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button onClick={nextTurn} size="lg" className="hover-lift">
                    <Zap className="mr-2 h-4 w-4" />
                    Next Turn
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Players List */}
          <Card className="glass-card hover-lift animate-slide-up">
            <CardHeader>
              <CardTitle className="text-lg">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {players.map((player, index) => (
                  <Badge
                    key={player.id}
                    className={cn(
                      player.color,
                      currentPlayer?.id === player.id && "ring-2 ring-primary ring-offset-2 animate-pulse-glow",
                      "animate-bounce-in",
                    )}
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {player.name}
                    {currentPlayer?.id === player.id && <span className="animate-float ml-1">👑</span>}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ParticleEffect trigger={showParticles} />
    </div>
  )
}
