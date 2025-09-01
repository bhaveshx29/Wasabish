"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Play } from "lucide-react"
import { useTheme } from "next-themes"
import { PlayerManagement, type Player } from "@/components/player-management"
import { AnimatedBackground } from "@/components/animated-background"
import { SimpleGameInterface } from "@/components/simple-game-interface"

const difficultyLevels = [
  {
    level: 1,
    name: "Mild Wasabi",
    description: "Fun & Light - Perfect for family gatherings",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: "🥒",
  },
  {
    level: 2,
    name: "Spicy Roll",
    description: "Bold & Silly - Get ready to laugh",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: "🍣",
  },
  {
    level: 3,
    name: "Hot Sake",
    description: "Flirty & NSFW - Adults only",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: "🍶",
  },
  {
    level: 4,
    name: "Dragon Roll",
    description: "Very NSFW & Kinky - Proceed with caution",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: "🐉",
  },
  {
    level: 5,
    name: "Ghost Pepper",
    description: "Extreme & Freaky - Only for the brave",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: "👻",
  },
]

type GameState = "home" | "players" | "playing"

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [gameState, setGameState] = useState<GameState>("home")
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectLevel = (level: number) => {
    setSelectedLevel(level)
    setGameState("players")
  }

  const startGame = () => {
    if (players.length >= 2 && selectedLevel !== null) {
      setGameState("playing")
    }
  }

  const backToHome = () => {
    setGameState("home")
    setPlayers([])
    setSelectedLevel(null)
  }

  const backToLevels = () => {
    setGameState("home")
  }

  if (!mounted) {
    return null
  }

  // Game Interface
  if (gameState === "playing" && selectedLevel) {
    return (
      <SimpleGameInterface
        players={players}
        selectedLevel={selectedLevel}
        difficultyLevels={difficultyLevels}
        onBackToSetup={backToLevels}
      />
    )
  }

  if (gameState === "players" && selectedLevel) {
    const selectedLevelData = difficultyLevels.find((l) => l.level === selectedLevel)

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative">
        <AnimatedBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Button variant="outline" onClick={backToLevels} className="flex items-center gap-2 bg-transparent">
              ← Back to Levels
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">{selectedLevelData?.icon}</span>
              <h1 className="text-4xl font-bold text-primary">{selectedLevelData?.name}</h1>
            </div>
            <p className="text-muted-foreground text-lg">{selectedLevelData?.description}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <PlayerManagement players={players} onPlayersChange={setPlayers} minPlayers={2} maxPlayers={8} />

            <div className="flex justify-center pt-6">
              <Button size="lg" className="text-lg px-8 py-6" onClick={startGame} disabled={players.length < 2}>
                <Play className="mr-2 h-5 w-5" />
                Start Game
                {players.length >= 2 && (
                  <Badge className="ml-2 bg-green-500 text-white">{players.length} players ready</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-primary">🍣 Wasabish</h1>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary mb-4 text-balance">Choose Your Spice Level</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Select a difficulty level to start your truth or dare adventure
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto mb-16">
          {difficultyLevels.map((level) => (
            <Card
              key={level.level}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50"
              onClick={() => selectLevel(level.level)}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{level.icon}</div>
                <Badge className={`${level.color} text-xs mb-2`}>Level {level.level}</Badge>
                <CardTitle className="text-lg">{level.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">{level.description}</p>
                <div className="flex justify-center">
                  {Array.from({ length: level.level }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary rounded-full mr-1" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">This game is made by bhavesh seechurn</p>
        </div>
      </div>
    </div>
  )
}
