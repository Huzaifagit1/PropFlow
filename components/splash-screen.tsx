"use client"

import { useEffect, useState } from "react"
import { Wallet } from "lucide-react"

export function SplashScreen() {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    // Start the animation sequence
    const stage1 = setTimeout(() => setAnimationStage(1), 300) // Logo appears
    const stage2 = setTimeout(() => setAnimationStage(2), 800) // Logo grows
    const stage3 = setTimeout(() => setAnimationStage(3), 1300) // Text appears
    const stage4 = setTimeout(() => setAnimationStage(4), 2000) // Start fade out

    return () => {
      clearTimeout(stage1)
      clearTimeout(stage2)
      clearTimeout(stage3)
      clearTimeout(stage4)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center transition-all duration-700 ease-in-out ${
            animationStage === 0
              ? "scale-0 opacity-0"
              : animationStage === 1
                ? "scale-100 opacity-100"
                : animationStage === 2
                  ? "scale-110 opacity-100"
                  : "scale-100 opacity-100"
          } ${animationStage === 4 ? "opacity-0" : ""}`}
        >
          <div
            className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 transition-all duration-500 ${
              animationStage >= 2 ? "shadow-lg" : ""
            }`}
          >
            <Wallet
              className={`h-10 w-10 text-white transition-all duration-500 ${
                animationStage >= 2 ? "animate-pulse" : ""
              }`}
            />

            {/* Animated rings */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-emerald-300 transition-all duration-1000 ${
                animationStage >= 2 ? "scale-125 opacity-0" : "scale-100 opacity-0"
              }`}
            ></div>
            <div
              className={`absolute inset-0 rounded-full border-2 border-emerald-300 transition-all duration-1000 delay-200 ${
                animationStage >= 2 ? "scale-150 opacity-0" : "scale-100 opacity-0"
              }`}
            ></div>
          </div>
        </div>

        <div
          className={`mt-6 text-2xl font-bold tracking-tight transition-all duration-500 ${
            animationStage >= 3 ? "opacity-100" : "opacity-0"
          } ${animationStage === 4 ? "opacity-0" : ""}`}
        >
          PropFlow
        </div>

        <div
          className={`mt-2 text-sm text-muted-foreground transition-all duration-500 ${
            animationStage >= 3 ? "opacity-100" : "opacity-0"
          } ${animationStage === 4 ? "opacity-0" : ""}`}
        >
          Track your finances with clarity
        </div>
      </div>
    </div>
  )
}
