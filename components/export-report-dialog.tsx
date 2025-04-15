"use client"

import { useState } from "react"
import { Download, Lock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ExportReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userPlan: "free" | "basic" | "pro"
}

export function ExportReportDialog({ open, onOpenChange, userPlan }: ExportReportDialogProps) {
  const [reportType, setReportType] = useState("transactions")
  const [dateRange, setDateRange] = useState("30d")
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  // Helper function to determine if a feature is available based on plan
  const isFeatureAvailable = (requiredPlan: string) => {
    const planLevels = { free: 0, basic: 1, pro: 2 }
    return planLevels[userPlan as keyof typeof planLevels] >= planLevels[requiredPlan as keyof typeof planLevels]
  }

  const handleExport = () => {
    setIsGenerating(true)

    // Simulate PDF generation delay
    setTimeout(() => {
      setIsGenerating(false)

      // Create a fake download by opening a new window with a preview
      const reportWindow = window.open("", "_blank")
      if (reportWindow) {
        reportWindow.document.write(generateReportHTML(reportType, dateRange, userPlan))
        reportWindow.document.title = `PropFlow - ${getReportTitle(reportType)} Report`
        reportWindow.document.close()
      }

      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>Generate and download reports based on your PropFlow data</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <RadioGroup id="report-type" value={reportType} onValueChange={setReportType} className="grid gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transactions" id="transactions" />
                <Label htmlFor="transactions" className="flex items-center gap-2 font-normal">
                  Transaction History
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="summary" id="summary" disabled={!isFeatureAvailable("basic")} />
                <Label
                  htmlFor="summary"
                  className={`flex items-center gap-2 font-normal ${!isFeatureAvailable("basic") ? "text-muted-foreground" : ""}`}
                >
                  {!isFeatureAvailable("basic") && <Lock className="h-3.5 w-3.5" />}
                  Monthly Summary
                  {!isFeatureAvailable("basic") && <span className="ml-1 text-xs">(Basic Plan)</span>}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="performance" id="performance" disabled={!isFeatureAvailable("basic")} />
                <Label
                  htmlFor="performance"
                  className={`flex items-center gap-2 font-normal ${!isFeatureAvailable("basic") ? "text-muted-foreground" : ""}`}
                >
                  {!isFeatureAvailable("basic") && <Lock className="h-3.5 w-3.5" />}
                  Performance Analysis
                  {!isFeatureAvailable("basic") && <span className="ml-1 text-xs">(Basic Plan)</span>}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="detailed" id="detailed" disabled={!isFeatureAvailable("pro")} />
                <Label
                  htmlFor="detailed"
                  className={`flex items-center gap-2 font-normal ${!isFeatureAvailable("pro") ? "text-muted-foreground" : ""}`}
                >
                  {!isFeatureAvailable("pro") && <Lock className="h-3.5 w-3.5" />}
                  Detailed Analytics
                  {!isFeatureAvailable("pro") && <span className="ml-1 text-xs">(Pro Plan)</span>}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" disabled={!isFeatureAvailable("pro")} />
                <Label
                  htmlFor="custom"
                  className={`flex items-center gap-2 font-normal ${!isFeatureAvailable("pro") ? "text-muted-foreground" : ""}`}
                >
                  {!isFeatureAvailable("pro") && <Lock className="h-3.5 w-3.5" />}
                  Custom Report
                  {!isFeatureAvailable("pro") && <span className="ml-1 text-xs">(Pro Plan)</span>}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-in-one" id="all-in-one" disabled={!isFeatureAvailable("pro")} />
                <Label
                  htmlFor="all-in-one"
                  className={`flex items-center gap-2 font-normal ${!isFeatureAvailable("pro") ? "text-muted-foreground" : ""}`}
                >
                  {!isFeatureAvailable("pro") && <Lock className="h-3.5 w-3.5" />}
                  All-in-One Report
                  {!isFeatureAvailable("pro") && <span className="ml-1 text-xs">(Pro Plan)</span>}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="3m" disabled={!isFeatureAvailable("basic")}>
                    {!isFeatureAvailable("basic") && <Lock className="mr-2 h-3 w-3" />}
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="6m" disabled={!isFeatureAvailable("basic")}>
                    {!isFeatureAvailable("basic") && <Lock className="mr-2 h-3 w-3" />}
                    Last 6 months
                  </SelectItem>
                  <SelectItem value="1y" disabled={!isFeatureAvailable("pro")}>
                    {!isFeatureAvailable("pro") && <Lock className="mr-2 h-3 w-3" />}
                    Last year
                  </SelectItem>
                  <SelectItem value="all" disabled={!isFeatureAvailable("pro")}>
                    {!isFeatureAvailable("pro") && <Lock className="mr-2 h-3 w-3" />}
                    All time
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv" disabled={!isFeatureAvailable("basic")}>
                    {!isFeatureAvailable("basic") && <Lock className="mr-2 h-3 w-3" />}
                    CSV Spreadsheet
                  </SelectItem>
                  <SelectItem value="xlsx" disabled={!isFeatureAvailable("pro")}>
                    {!isFeatureAvailable("pro") && <Lock className="mr-2 h-3 w-3" />}
                    Excel Spreadsheet
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          {!isFeatureAvailable("pro") && (
            <div className="text-xs text-muted-foreground">
              {userPlan === "free" ? (
                <>
                  <Link href="/pricing" className="text-primary hover:underline">
                    Upgrade your plan
                  </Link>{" "}
                  or continue at $5/month after your trial for basic export options
                </>
              ) : (
                <>
                  <Link href="/pricing" className="text-primary hover:underline">
                    Upgrade your plan
                  </Link>{" "}
                  for more export options
                </>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isGenerating}>
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to get report title
function getReportTitle(reportType: string): string {
  switch (reportType) {
    case "transactions":
      return "Transaction History"
    case "summary":
      return "Monthly Summary"
    case "performance":
      return "Performance Analysis"
    case "detailed":
      return "Detailed Analytics"
    case "custom":
      return "Custom"
    case "all-in-one":
      return "Comprehensive"
    default:
      return "PropFlow"
  }
}

// Generate HTML for the report preview
function generateReportHTML(reportType: string, dateRange: string, userPlan: string): string {
  const dateRangeText =
    {
      "7d": "Last 7 days",
      "30d": "Last 30 days",
      "3m": "Last 3 months",
      "6m": "Last 6 months",
      "1y": "Last year",
      all: "All time",
    }[dateRange] || "Last 30 days"

  const reportTitle = getReportTitle(reportType)

  // Common header and styles
  let html = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .report-container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .logo-icon { width: 24px; height: 24px; margin-right: 8px; }
        h1 { color: #111; margin: 10px 0; }
        .subtitle { color: #666; margin-bottom: 20px; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 30px; color: #666; font-size: 14px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid #eee; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background-color: #f5f5f5; text-align: left; padding: 10px; }
        td { padding: 10px; border-bottom: 1px solid #eee; }
        .amount-positive { color: #10b981; }
        .amount-negative { color: #ef4444; }
        .tag { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
        .tag-payout { background-color: #d1fae5; color: #065f46; }
        .tag-spending { background-color: #fee2e2; color: #991b1b; }
        .summary-box { background-color: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
        .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .summary-item { }
        .summary-label { font-size: 12px; color: #666; margin-bottom: 5px; }
        .summary-value { font-size: 18px; font-weight: bold; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; }
        .watermark { position: fixed; bottom: 10px; right: 10px; opacity: 0.5; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="report-container">
        <div class="header">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 16H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style="font-weight: bold;">PropFlow</span>
          </div>
          <h1>${reportTitle} Report</h1>
          <p class="subtitle">${dateRangeText}</p>
        </div>
        
        <div class="meta">
          <div>Generated on: ${new Date().toLocaleDateString()}</div>
          <div>Plan: ${userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</div>
        </div>
  `

  // Report-specific content
  switch (reportType) {
    case "transactions":
      html += generateTransactionReport()
      break
    case "summary":
      html += generateSummaryReport()
      break
    case "performance":
      html += generatePerformanceReport()
      break
    case "detailed":
      html += generateDetailedReport()
      break
    case "custom":
      html += generateCustomReport()
      break
    case "all-in-one":
      html += generateAllInOneReport()
      break
    default:
      html += generateTransactionReport()
  }

  // Footer
  html += `
        <div class="footer">
          <p>This report was generated by PropFlow. For questions, contact support@propflow.com</p>
        </div>
        
        <div class="watermark">
          PropFlow ${userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
        </div>
      </div>
    </body>
    </html>
  `

  return html
}

// Generate transaction report content
function generateTransactionReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Transaction Summary</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <div class="summary-label">Total Spent</div>
          <div class="summary-value amount-negative">$4,550.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Total Received</div>
          <div class="summary-value amount-positive">$8,750.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Net Total</div>
          <div class="summary-value amount-positive">$4,200.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Transactions</div>
          <div class="summary-value">32</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Firm</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-04-01</td>
            <td>Topstep</td>
            <td><span class="tag tag-payout">Payout</span></td>
            <td class="amount-positive">+$1,250.00</td>
            <td>Monthly profit share</td>
          </tr>
          <tr>
            <td>2023-03-28</td>
            <td>Apex</td>
            <td><span class="tag tag-spending">Spending</span></td>
            <td class="amount-negative">-$200.00</td>
            <td>Monthly subscription</td>
          </tr>
          <tr>
            <td>2023-03-25</td>
            <td>Traidefy</td>
            <td><span class="tag tag-payout">Payout</span></td>
            <td class="amount-positive">+$850.00</td>
            <td>Weekly profit distribution</td>
          </tr>
          <tr>
            <td>2023-03-20</td>
            <td>My Funded Futures</td>
            <td><span class="tag tag-spending">Spending</span></td>
            <td class="amount-negative">-$150.00</td>
            <td>Account reset fee</td>
          </tr>
          <tr>
            <td>2023-03-15</td>
            <td>Topstep</td>
            <td><span class="tag tag-spending">Spending</span></td>
            <td class="amount-negative">-$175.00</td>
            <td>Monthly subscription</td>
          </tr>
          <tr>
            <td>2023-03-10</td>
            <td>Apex</td>
            <td><span class="tag tag-payout">Payout</span></td>
            <td class="amount-positive">+$1,100.00</td>
            <td>Profit withdrawal</td>
          </tr>
          <tr>
            <td>2023-03-05</td>
            <td>Take Profit Trader</td>
            <td><span class="tag tag-spending">Spending</span></td>
            <td class="amount-negative">-$225.00</td>
            <td>Account upgrade</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

// Generate summary report content
function generateSummaryReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Monthly Overview</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <div class="summary-label">Total Spent</div>
          <div class="summary-value amount-negative">$4,550.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Total Received</div>
          <div class="summary-value amount-positive">$8,750.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Net Total</div>
          <div class="summary-value amount-positive">$4,200.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">ROI</div>
          <div class="summary-value amount-positive">92.3%</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Firm Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Firm</th>
            <th>Spent</th>
            <th>Received</th>
            <th>Net</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Topstep</td>
            <td class="amount-negative">$1,200.00</td>
            <td class="amount-positive">$3,500.00</td>
            <td class="amount-positive">+$2,300.00</td>
            <td class="amount-positive">191.7%</td>
          </tr>
          <tr>
            <td>Apex</td>
            <td class="amount-negative">$1,800.00</td>
            <td class="amount-positive">$2,750.00</td>
            <td class="amount-positive">+$950.00</td>
            <td class="amount-positive">52.8%</td>
          </tr>
          <tr>
            <td>Traidefy</td>
            <td class="amount-negative">$950.00</td>
            <td class="amount-positive">$1,500.00</td>
            <td class="amount-positive">+$550.00</td>
            <td class="amount-positive">57.9%</td>
          </tr>
          <tr>
            <td>My Funded Futures</td>
            <td class="amount-negative">$600.00</td>
            <td class="amount-positive">$1,000.00</td>
            <td class="amount-positive">+$400.00</td>
            <td class="amount-positive">66.7%</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2 class="section-title">Monthly Trend</h2>
      <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <p style="color: #666;">Monthly performance chart would appear here</p>
        <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
          <svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,150 L50,120 L100,130 L150,100 L200,110 L250,80 L300,60 L350,40 L400,30 L450,10 L500,0" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M0,150 L50,120 L100,130 L150,100 L200,110 L250,80 L300,60 L350,40 L400,30 L450,10 L500,0" fill="#10b98120" stroke="none" />
          </svg>
        </div>
      </div>
    </div>
  `
}

// Generate performance report content
function generatePerformanceReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Performance Overview</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <div class="summary-label">Total Net Profit</div>
          <div class="summary-value amount-positive">$4,200.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">ROI</div>
          <div class="summary-value amount-positive">92.3%</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Best Performing Firm</div>
          <div class="summary-value">Topstep</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Profit Share</div>
          <div class="summary-value">54.8%</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Performance by Firm</h2>
      <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <p style="color: #666;">Performance chart would appear here</p>
        <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
          <svg width="400" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="50" height="120" fill="#10b981" />
            <rect x="90" y="60" width="50" height="90" fill="#10b981" />
            <rect x="170" y="80" width="50" height="70" fill="#10b981" />
            <rect x="250" y="90" width="50" height="60" fill="#10b981" />
            <rect x="330" y="110" width="50" height="40" fill="#10b981" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Performance Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Monthly Profit</td>
            <td>$1,400.00</td>
            <td class="amount-positive">+15.2%</td>
          </tr>
          <tr>
            <td>Profit Consistency</td>
            <td>87%</td>
            <td class="amount-positive">+5.3%</td>
          </tr>
          <tr>
            <td>Subscription Cost Ratio</td>
            <td>18.2%</td>
            <td class="amount-negative">-2.1%</td>
          </tr>
          <tr>
            <td>Profit per Firm</td>
            <td>$840.00</td>
            <td class="amount-positive">+12.8%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

// Generate detailed report content
function generateDetailedReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Performance Analytics</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <div class="summary-label">Total Net Profit</div>
          <div class="summary-value amount-positive">$4,200.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">ROI</div>
          <div class="summary-value amount-positive">92.3%</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Profit Growth</div>
          <div class="summary-value amount-positive">+42.8%</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">Efficiency Score</div>
          <div class="summary-value">8.7/10</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Advanced Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Benchmark</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Profit Margin</td>
            <td>48.0%</td>
            <td>35.2%</td>
            <td class="amount-positive">Above Average</td>
          </tr>
          <tr>
            <td>Cost Efficiency</td>
            <td>0.52</td>
            <td>0.65</td>
            <td class="amount-positive">Excellent</td>
          </tr>
          <tr>
            <td>Profit Consistency</td>
            <td>87%</td>
            <td>72%</td>
            <td class="amount-positive">Above Average</td>
          </tr>
          <tr>
            <td>Growth Rate</td>
            <td>42.8%</td>
            <td>25.0%</td>
            <td class="amount-positive">Excellent</td>
          </tr>
          <tr>
            <td>Subscription Optimization</td>
            <td>0.78</td>
            <td>0.60</td>
            <td class="amount-positive">Excellent</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2 class="section-title">Spending Breakdown</h2>
      <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <p style="color: #666;">Spending breakdown chart would appear here</p>
        <div style="height: 200px; display: flex; align-items: center; justify-content: center;">
          <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#eee" strokeWidth="30" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="30" strokeDasharray="251.2 502.4" strokeDashoffset="0" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="30" strokeDasharray="125.6 502.4" strokeDashoffset="-251.2" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#8b5cf6" strokeWidth="30" strokeDasharray="75.4 502.4" strokeDashoffset="-376.8" transform="rotate(-90 100 100)" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="30" strokeDasharray="50.2 502.4" strokeDashoffset="-452.2" transform="rotate(-90 100 100)" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Insights & Recommendations</h2>
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <div style="font-weight: bold; margin-bottom: 5px; color: #10b981;">Performance Insight</div>
        <p style="margin: 0; font-size: 14px;">Your Topstep account is outperforming other firms by 32%. Consider allocating more capital to this account to maximize returns.</p>
      </div>
      
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <div style="font-weight: bold; margin-bottom: 5px; color: #f97316;">Spending Optimization</div>
        <p style="margin: 0; font-size: 14px;">You're spending 15% more on Apex subscription fees compared to similar firms. Consider reviewing your subscription plan or exploring alternatives.</p>
      </div>
      
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 15px;">
        <div style="font-weight: bold; margin-bottom: 5px; color: #3b82f6;">Growth Opportunity</div>
        <p style="margin: 0; font-size: 14px;">Based on your performance history, you could potentially increase your net profit by 25% by adding one more high-performing prop firm to your portfolio.</p>
      </div>
    </div>
  `
}

// Generate custom report content
function generateCustomReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Custom Report</h2>
      <p>This is a custom report with your selected metrics and visualizations.</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Performance Overview</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <div class="summary-label">Total Net Profit</div>
          <div class="summary-value amount-positive">$4,200.00</div>
        </div>
        <div class="summary-box">
          <div class="summary-label">ROI</div>
          <div class="summary-value amount-positive">92.3%</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Selected Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Net Profit</td>
            <td>$4,200.00</td>
            <td class="amount-positive">+42.8%</td>
          </tr>
          <tr>
            <td>ROI</td>
            <td>92.3%</td>
            <td class="amount-positive">+15.2%</td>
          </tr>
          <tr>
            <td>Spending</td>
            <td>$4,550.00</td>
            <td class="amount-negative">+12.5%</td>
          </tr>
          <tr>
            <td>Payouts</td>
            <td>$8,750.00</td>
            <td class="amount-positive">+25.2%</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2 class="section-title">Custom Visualizations</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <p style="color: #666;">Bar Chart</p>
          <div style="height: 150px; display: flex; align-items: flex-end; justify-content: space-around;">
            <div style="width: 30px; height: 120px; background-color: #10b981; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 30px; height: 90px; background-color: #10b981; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 30px; height: 70px; background-color: #10b981; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 30px; height: 60px; background-color: #10b981; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 30px; height: 40px; background-color: #10b981; border-radius: 4px 4px 0 0;"></div>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <p style="color: #666;">Line Chart</p>
          <div style="height: 150px; display: flex; align-items: center; justify-content: center;">
            <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,80 L40,70 L80,50 L120,30 L160,20 L200,10" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M0,80 L40,70 L80,50 L120,30 L160,20 L200,10" fill="#10b98120" stroke="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `
}

// Generate all-in-one comprehensive report content
function generateAllInOneReport(): string {
  return `
    <div class="section">
      <h2 class="section-title">Comprehensive Report</h2>
      <p>This all-in-one report combines transaction history, performance analysis, and detailed analytics into a single comprehensive document.</p>
    </div>
    
    ${generateTransactionReport()}
    
    <div style="page-break-before: always;"></div>
    
    ${generatePerformanceReport()}
    
    <div style="page-break-before: always;"></div>
    
    ${generateDetailedReport()}
    
    <div class="section">
      <h2 class="section-title">Executive Summary</h2>
      <div class="summary-box" style="padding: 20px;">
        <h3 style="margin-top: 0; font-size: 16px; margin-bottom: 15px;">Key Insights</h3>
        <div class="summary-grid">
          <div>
            <div class="summary-label">Best Performing Firm</div>
            <div class="summary-value">Topstep</div>
            <div class="text-sm" style="color: #10b981; margin-top: 5px;">+$2,300 (191.7% ROI)</div>
          </div>
          <div>
            <div class="summary-label">Overall Portfolio Health</div>
            <div class="summary-value">Excellent</div>
            <div class="text-sm" style="color: #10b981; margin-top: 5px;">92.3% ROI</div>
          </div>
        </div>
        
        <h3 style="margin-top: 20px; font-size: 16px; margin-bottom: 15px;">Recommendations</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">
            <strong>Allocation Strategy:</strong> Consider increasing capital allocation to Topstep by 15-20% to maximize returns.
          </li>
          <li style="margin-bottom: 10px;">
            <strong>Cost Optimization:</strong> Review Apex subscription fees which are 15% higher than industry average.
          </li>
          <li style="margin-bottom: 10px;">
            <strong>Growth Opportunity:</strong> Adding one more high-performing prop firm could increase net profit by approximately 25%.
          </li>
        </ul>
      </div>
    </div>
  `
}
