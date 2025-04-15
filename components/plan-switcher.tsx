"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlanSwitcherProps {
  currentPlan: "starter" | "standard" | "premium"
  onPlanChange: (plan: "starter" | "standard" | "premium") => void
}

export function PlanSwitcher({ currentPlan, onPlanChange }: PlanSwitcherProps) {
  const [plan, setPlan] = useState(currentPlan)

  const handlePlanSelect = (plan: "starter" | "standard" | "premium") => {
    setPlan(plan)
    onPlanChange(plan)
  }

  return (
    <Select value={plan} onValueChange={handlePlanSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="standard">Standard</SelectItem>
        <SelectItem value="premium">Premium</SelectItem>
      </SelectContent>
    </Select>
  )
}
