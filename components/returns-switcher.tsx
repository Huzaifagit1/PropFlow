"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TrendingDown, TrendingUp } from "lucide-react"

interface ReturnsSwitcherProps {
  currentReturns: "positive" | "negative"
  onReturnsChange: (returns: "positive" | "negative") => void
}

export function ReturnsSwitcher({ currentReturns, onReturnsChange }: ReturnsSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium">Test Returns:</span>
      <ToggleGroup
        type="single"
        value={currentReturns}
        onValueChange={(value) => value && onReturnsChange(value as "positive" | "negative")}
      >
        <ToggleGroupItem value="positive" aria-label="Positive Returns" className="h-7 px-2">
          <TrendingUp className="mr-1 h-3.5 w-3.5" />
          <span className="text-xs">Positive</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="negative" aria-label="Negative Returns" className="h-7 px-2">
          <TrendingDown className="mr-1 h-3.5 w-3.5" />
          <span className="text-xs">Negative</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
