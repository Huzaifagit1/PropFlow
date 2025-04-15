"use client"

import { Download, Printer, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface ReportPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportType: string
  reportHtml: string
  userPlan: "free" | "basic" | "pro"
}

export function ReportPreviewDialog({
  open,
  onOpenChange,
  reportType,
  reportHtml,
  userPlan,
}: ReportPreviewDialogProps) {
  // Helper function to determine if a feature is available based on plan
  const isFeatureAvailable = (requiredPlan: string) => {
    const planLevels = { free: 0, basic: 1, pro: 2 }
    return planLevels[userPlan as keyof typeof planLevels] >= planLevels[requiredPlan as keyof typeof planLevels]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Report Preview</DialogTitle>
          <DialogDescription>Preview your {reportType} report before downloading</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="max-h-[60vh] overflow-auto">
          <iframe srcDoc={reportHtml} title="Report Preview" className="h-[60vh] w-full border-0" />
        </div>
        <DialogFooter className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={!isFeatureAvailable("basic")}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" disabled={!isFeatureAvailable("pro")}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
