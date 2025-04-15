"use client"

import { useState, useEffect } from "react"
import { usePropFirms } from "@/components/prop-firm-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Lock, Crown, Check } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"

export function PropFirmSettings() {
  const { pendingPropFirms, togglePropFirm, addCustomPropFirm, savePreferences, discardChanges, hasPendingChanges } =
    usePropFirms()

  const { user } = useAuth()

  const [newFirmName, setNewFirmName] = useState("")
  const [newFirmKeyword, setNewFirmKeyword] = useState("")
  const [selectedCount, setSelectedCount] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Count selected firms in pending state
  useEffect(() => {
    setSelectedCount(pendingPropFirms.filter((firm) => firm.isSelected).length)
  }, [pendingPropFirms])

  // Helper function to determine if a feature is available based on plan
  const isFeatureAvailable = (requiredPlan: string) => {
    const planLevels = { starter: 0, standard: 1, premium: 2 }
    return planLevels[user?.plan as keyof typeof planLevels] >= planLevels[requiredPlan as keyof typeof planLevels]
  }

  // Check if user has reached their plan limit
  const hasReachedLimit = () => {
    if (user?.plan === "starter") return selectedCount >= 1
    if (user?.plan === "standard") return selectedCount >= 3
    return false // Premium has no limit
  }

  // Handle local toggle using the context's togglePropFirm
  const handleToggle = (id: string, isCurrentlySelected: boolean) => {
    // If trying to select and already at limit, show warning
    if (!isCurrentlySelected && hasReachedLimit()) {
      toast({
        title: "Plan limit reached",
        description:
          user?.plan === "starter"
            ? "Starter plan allows only 1 prop firm. Upgrade to Standard for up to 3 firms."
            : "Standard plan allows up to 3 prop firms. Upgrade to Premium for unlimited firms.",
        variant: "destructive",
      })
      return
    }

    // Update pending state through context
    togglePropFirm(id)
  }

  const handleSavePreferences = () => {
    setIsSaving(true)

    try {
      // Save preferences using the context function
      savePreferences()

      // Show success toast
      toast({
        title: "Preferences saved",
        description: "Your prop firm preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsSaving(false)
      }, 1000)
    }
  }

  const handleAddCustomFirm = () => {
    if (!newFirmName.trim() || !newFirmKeyword.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a firm name and a keyword to match in transactions.",
        variant: "destructive",
      })
      return
    }

    // Check if Pro plan
    if (!isFeatureAvailable("premium")) {
      toast({
        title: "Pro feature",
        description: "Adding custom prop firms requires a Pro plan.",
        variant: "destructive",
      })
      return
    }

    try {
      // Add the custom prop firm using the context function
      addCustomPropFirm(newFirmName, newFirmKeyword)

      // Show success toast
      toast({
        title: "Custom firm added",
        description: `"${newFirmName}" has been added to your prop firms.`,
      })

      // Clear the input fields
      setNewFirmName("")
      setNewFirmKeyword("")
    } catch (error) {
      toast({
        title: "Error adding firm",
        description: "There was a problem adding your custom firm. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prop Firm Selection</CardTitle>
        <CardDescription>Select the prop firms you want to track in your dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            PropFlow scans your banking transactions for entries that include these firm names.
          </p>
          <div className="text-sm">
            <span className="font-medium">{selectedCount}</span> /
            <span>{user?.plan === "starter" ? "1" : user?.plan === "standard" ? "3" : "∞"}</span> selected
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pendingPropFirms.map((firm) => (
           <div
           key={firm.id}
           className={`flex flex-col md:flex-row md:items-center md:space-x-3 rounded-md border p-4 ${
             !firm.isSelected && hasReachedLimit() ? "opacity-50" : ""
           }`}
         >
           <Checkbox
             id={`firm-${firm.id}`}
             checked={firm.isSelected}
             onCheckedChange={() => handleToggle(firm.id, firm.isSelected)}
             disabled={!firm.isSelected && hasReachedLimit()}
             className="shrink-0"
           />
         
           <div className="mt-2 md:mt-0 space-y-1">
             <label
               htmlFor={`firm-${firm.id}`}
               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
             >
               {firm.name}{" "}
               {firm.isCustom && <span className="text-xs text-muted-foreground">(Custom)</span>}
             </label>
             <p className="text-xs text-muted-foreground break-words">{firm.description}</p>
           </div>
         </div>
         
          ))}
        </div>

        <div
          className={`rounded-md ${isFeatureAvailable("premium") ? "bg-muted" : "bg-muted/50 border border-dashed"} p-4`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              {!isFeatureAvailable("premium") && <Lock className="h-3.5 w-3.5" />}
              Add Custom Prop Firm
              {!isFeatureAvailable("premium") && (
                <span className="text-xs text-muted-foreground">(Premium Feature)</span>
              )}
            </h4>

            {!isFeatureAvailable("premium") && (
              <Button size="sm" variant="outline" asChild>
                <Link href="/pricing">
                  <Crown className="mr-1.5 h-3.5 w-3.5" />
                  Upgrade
                </Link>
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Firm name (e.g. My Custom Firm)"
                className="max-w-sm"
                value={newFirmName}
                onChange={(e) => setNewFirmName(e.target.value)}
                disabled={!isFeatureAvailable("premium")}
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Transaction keyword (e.g. MYCUSTOM)"
                className="max-w-sm"
                value={newFirmKeyword}
                onChange={(e) => setNewFirmKeyword(e.target.value)}
                disabled={!isFeatureAvailable("premium")}
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddCustomFirm}
                disabled={!isFeatureAvailable("premium") || !newFirmName.trim() || !newFirmKeyword.trim()}
              >
                Add Custom
              </Button>
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Add custom prop firm names if they're not in the list above
          </p>
        </div>

        {user?.plan !== "premium" && (
          <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-sm">
            <div className="flex items-center gap-2 text-amber-800">
              <Crown className="h-4 w-4 text-amber-600" />
              <span className="font-medium">Plan Limits:</span>
              <ul className="list-disc ml-5 text-xs space-y-1">
                <li>Starter: 1 prop firm (30 days, then $5/mo)</li>
                <li>Standard: Up to 3 prop firms</li>
                <li>Premium: Unlimited firms + custom firms</li>
              </ul>
            </div>
          </div>
        )}

        <p className="mb-2 text-sm text-muted-foreground">
          {user?.plan === "starter"
            ? "Starter plan limited to 1 prop firm. $5/month after trial."
            : "Standard plan limited to 3 prop firms."}{" "}
          Some selected firms are not shown.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {hasPendingChanges && (
            <Button variant="outline" onClick={discardChanges} disabled={isSaving || !hasPendingChanges}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSavePreferences} disabled={isSaving || !hasPendingChanges}>
            {isSaving ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Saved
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>

        {hasPendingChanges && <p className="text-xs text-muted-foreground self-center">You have unsaved changes</p>}
      </CardFooter>
    </Card>
  )
}
