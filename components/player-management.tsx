"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, X, UserPlus, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Player {
  id: string
  name: string
  color: string
  isActive?: boolean
}

interface PlayerManagementProps {
  players: Player[]
  onPlayersChange: (players: Player[]) => void
  minPlayers?: number
  maxPlayers?: number
}

const playerColors = [
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
]

export function PlayerManagement({ players, onPlayersChange, minPlayers = 2, maxPlayers = 8 }: PlayerManagementProps) {
  const [newPlayerName, setNewPlayerName] = useState("")
  const [error, setError] = useState("")

  const addPlayer = () => {
    if (!newPlayerName.trim()) {
      setError("Please enter a player name")
      return
    }

    if (players.some((p) => p.name.toLowerCase() === newPlayerName.toLowerCase())) {
      setError("Player name already exists")
      return
    }

    if (players.length >= maxPlayers) {
      setError(`Maximum ${maxPlayers} players allowed`)
      return
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      color: playerColors[players.length % playerColors.length],
    }

    onPlayersChange([...players, newPlayer])
    setNewPlayerName("")
    setError("")
  }

  const removePlayer = (playerId: string) => {
    onPlayersChange(players.filter((p) => p.id !== playerId))
    setError("")
  }

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    onPlayersChange(shuffled)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addPlayer()
    }
  }

  const canStartGame = players.length >= minPlayers

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Player Management
        </CardTitle>
        <CardDescription>
          Add {minPlayers} or more players to start the game (max {maxPlayers})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Player Input */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter player name..."
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            maxLength={20}
          />
          <Button onClick={addPlayer} disabled={players.length >= maxPlayers}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Players List */}
        {players.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Players ({players.length}/{maxPlayers})
              </h4>
              {players.length > 1 && (
                <Button variant="outline" size="sm" onClick={shufflePlayers}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              )}
            </div>

            <div className="grid gap-2">
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <Badge className={cn("text-xs", player.color)}>Player {index + 1}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlayer(player.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Game Status */}
            <div className="pt-2 border-t">
              {canStartGame ? (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Ready to start! You have {players.length} players.
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                  Add {minPlayers - players.length} more player{minPlayers - players.length !== 1 ? "s" : ""} to start.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No players added yet.</p>
            <p className="text-xs">Add at least {minPlayers} players to start the game.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
