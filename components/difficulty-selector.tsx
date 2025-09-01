"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dice6 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DifficultyLevel {
  level: number
  name: string
  description: string
  color: string
  icon: string
}

interface DifficultySelectorProps {
  selectedLevel: number | null
  onLevelSelect: (level: number) => void
  levels: DifficultyLevel[]
}

export function DifficultySelector({ selectedLevel, onLevelSelect, levels }: DifficultySelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dice6 className="h-5 w-5 text-primary" />
          Select Difficulty Level
        </CardTitle>
        <CardDescription>Choose how spicy you want your game to be</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {levels.map((level) => (
            <div
              key={level.level}
              className={cn(
                "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50",
                selectedLevel === level.level
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50",
              )}
              onClick={() => onLevelSelect(level.level)}
            >
              <div className="flex items-center gap-3">
                <Badge className={level.color}>Level {level.level}</Badge>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>{level.icon}</span>
                    {level.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: level.level }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full mr-1",
                      selectedLevel === level.level ? "bg-primary" : "bg-muted-foreground/50",
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
