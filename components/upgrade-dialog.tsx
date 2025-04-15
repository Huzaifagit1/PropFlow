"use client"

import Link from "next/link"
import { Crown, Lock, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requiredPlan: "basic" | "pro"
  featureName: string
  featureDescription?: string
}

export function UpgradeDialog({
  open,
  onOpenChange,
  requiredPlan,
  featureName,
  featureDescription,
}: UpgradeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {requiredPlan === "basic" ? (
              <Sparkles className="h-6 w-6 text-primary" />
            ) : (
              <Crown className="h-6 w-6 text-primary" />
            )}
          </div>
          <DialogTitle className="text-center">Upgrade to {requiredPlan === "basic" ? "Basic" : "Pro"}</DialogTitle>
          <DialogDescription className="text-center">
            {featureDescription ||
              `The ${featureName} feature requires the ${requiredPlan === "basic" ? "Basic" : "Pro"} plan or higher.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-lg border p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{featureName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {featureDescription ||
                `Unlock ${featureName} and more features by upgrading to the ${
                  requiredPlan === "basic" ? "Basic" : "Pro"
                } plan.`}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <div className="rounded-lg border p-3 text-center">
              <div className="font-medium">Current Plan</div>
              <div className="text-sm text-muted-foreground">Trial (then $5/mo)</div>
            </div>
            <div className="rounded-lg border border-primary bg-primary/5 p-3 text-center">
              <div className="font-medium text-primary">{requiredPlan === "basic" ? "Basic Plan" : "Pro Plan"}</div>
              <div className="text-sm text-primary">${requiredPlan === "basic" ? "10" : "25"}/month</div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full" asChild>
            <Link href="/pricing">View Pricing Plans</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
