"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  emoji: string
  duration: number
}

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  const sushiEmojis = ["🍣", "🍱", "🥢", "🍶", "🥒", "🐟", "🦐", "🥑"]

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          emoji: sushiEmojis[Math.floor(Math.random() * sushiEmojis.length)],
          duration: Math.random() * 20 + 10,
        })
      }
      setElements(newElements)
    }

    generateElements()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-10">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  )
}
