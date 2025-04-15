"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Crown, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PlanFeatureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  icon?: ReactNode
  features: string[]
  planName: "Basic" | "Pro"
  planPrice: string
  ctaLabel?: string
}

export function PlanFeatureDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  features,
  planName,
  planPrice,
  ctaLabel = "Upgrade Now",
}: PlanFeatureDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {icon ||
              (planName === "Basic" ? (
                <Sparkles className="h-6 w-6 text-primary" />
              ) : (
                <Crown className="h-6 w-6 text-primary" />
              ))}
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="mb-2 text-center font-medium">{planName} Plan Features</div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-0.5">
                    <svg className="h-3 w-3 fill-primary" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{planName} Plan</div>
                <div className="text-sm text-muted-foreground">Billed monthly</div>
              </div>
              <div className="text-2xl font-bold">
                {planPrice}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full" asChild>
            <Link href="/pricing">{ctaLabel}</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
