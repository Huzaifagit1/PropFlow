"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Crown,
  Download,
  FileText,
  Filter,
  LineChart,
  Lock,
  PieChart,
  Printer,
  Save,
  Share2,
  Sliders,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MonthlyPerformanceChart } from "@/components/monthly-performance-chart"
import { ProfitLossChart } from "@/components/profit-loss-chart"
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart"

// Mock user data - in a real app, this would come from authentication
const userData = {
  name: "Alex",
  plan: "free", // Options: "free", "basic", "pro"
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last6months")
  const [reportType, setReportType] = useState("performance")
  const { plan } = userData

  // Helper function to determine if a feature is available based on plan
  const isProPlan = plan === "pro"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Wallet className="h-5 w-5" />
            <span>PropFlow</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/50 pb-12">
        <div className="container py-6">
          <div className="mb-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Advanced Reports</h1>
                <p className="text-muted-foreground">Detailed analytics and insights for your prop firm activity</p>
              </div>

              {/* Pro Feature Badge */}
              {!isProPlan && (
                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                  <Crown className="h-4 w-4" />
                  <div className="text-sm">
                    <span className="font-medium">Pro Feature</span> - This is a preview of what's available with the
                    Pro plan
                  </div>
                  <Button size="sm" className="ml-2 bg-amber-600 hover:bg-amber-700" asChild>
                    <Link href="/pricing">Upgrade</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Report Controls */}
          <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Analysis</SelectItem>
                      <SelectItem value="spending">Spending Breakdown</SelectItem>
                      <SelectItem value="profitloss">Profit & Loss</SelectItem>
                      <SelectItem value="custom" disabled={!isProPlan}>
                        {!isProPlan && <Lock className="mr-2 h-3 w-3" />}
                        Custom Report
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last3months">Last 3 Months</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom" disabled={!isProPlan}>
                        {!isProPlan && <Lock className="mr-2 h-3 w-3" />}
                        Custom Range
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firms">Firms</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="firms">
                      <SelectValue placeholder="Select firms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Firms</SelectItem>
                      <SelectItem value="topstep">Topstep</SelectItem>
                      <SelectItem value="apex">Apex</SelectItem>
                      <SelectItem value="traidefy">Traidefy</SelectItem>
                      <SelectItem value="mff">My Funded Futures</SelectItem>
                      <SelectItem value="tpt">Take Profit Trader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" disabled={!isProPlan}>
                        <Sliders className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Advanced Filters (Pro)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" disabled={!isProPlan}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Save Report (Pro)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={!isProPlan}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled={!isProPlan}>
                      <FileText className="mr-2 h-4 w-4" />
                      PDF Report
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={!isProPlan}>
                      <FileText className="mr-2 h-4 w-4" />
                      CSV Data
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={!isProPlan}>
                      <Printer className="mr-2 h-4 w-4" />
                      Print Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Summary of your trading performance across all firms</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" disabled={!isProPlan}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Net Profit</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold text-emerald-600">$4,200</div>
                      <div className="text-sm text-emerald-600">+42.8%</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>vs. previous period</span>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">ROI</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold">92.3%</div>
                      <div className="text-sm text-emerald-600">+15.2%</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>Return on investment</span>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Best Performing Firm</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold">Topstep</div>
                      <div className="text-sm text-emerald-600">+$2,300</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <PieChart className="h-3 w-3" />
                      <span>54.8% of total profit</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Net profit/loss by month across all firms</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MonthlyPerformanceChart />
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>In-depth breakdown of your trading performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profitloss">
                  <TabsList className="mb-4">
                    <TabsTrigger value="profitloss">Profit & Loss</TabsTrigger>
                    <TabsTrigger value="spending">Spending Breakdown</TabsTrigger>
                    <TabsTrigger value="trends" disabled={!isProPlan}>
                      {!isProPlan && <Lock className="mr-2 h-3 w-3" />}
                      Trend Analysis
                    </TabsTrigger>
                    <TabsTrigger value="predictions" disabled={!isProPlan}>
                      {!isProPlan && <Lock className="mr-2 h-3 w-3" />}
                      Predictions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profitloss" className="h-[400px]">
                    <ProfitLossChart />
                  </TabsContent>

                  <TabsContent value="spending" className="h-[400px]">
                    <SpendingBreakdownChart />
                  </TabsContent>

                  <TabsContent value="trends">
                    <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-1 text-lg font-medium">Advanced Trend Analysis</h3>
                        <p className="mb-4 max-w-md text-sm text-muted-foreground">
                          Unlock AI-powered trend analysis to identify patterns in your trading performance and optimize
                          your strategy.
                        </p>
                        <Button asChild>
                          <Link href="/pricing">Upgrade to Pro</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="predictions">
                    <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <LineChart className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-1 text-lg font-medium">Predictive Analytics</h3>
                        <p className="mb-4 max-w-md text-sm text-muted-foreground">
                          Get AI-powered predictions about your future performance based on historical data and market
                          trends.
                        </p>
                        <Button asChild>
                          <Link href="/pricing">Upgrade to Pro</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Insights and Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Insights & Recommendations</CardTitle>
                <CardDescription>AI-powered analysis of your trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-emerald-100 p-1">
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      </div>
                      <h3 className="font-medium">Performance Insight</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your Topstep account is outperforming other firms by 32%. Consider allocating more capital to this
                      account to maximize returns.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 p-1">
                        <Filter className="h-4 w-4 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Spending Optimization</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You're spending 15% more on Apex subscription fees compared to similar firms. Consider reviewing
                      your subscription plan or exploring alternatives.
                    </p>
                  </div>

                  {!isProPlan && (
                    <div className="rounded-lg border border-dashed p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-full bg-muted p-1">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-muted-foreground">Advanced Insights</h3>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Upgrade to Pro to unlock 5+ additional personalized insights and recommendations to optimize
                        your trading strategy.
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/pricing">View Pro Features</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Custom Report Builder - Pro Only */}
            <Card className={!isProPlan ? "opacity-75" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Custom Report Builder</CardTitle>
                    <CardDescription>Create tailored reports with the metrics that matter to you</CardDescription>
                  </div>
                  {!isProPlan && (
                    <div className="rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Pro Feature
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isProPlan ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                    <Crown className="mb-2 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-medium">Unlock Custom Reports</h3>
                    <p className="mb-6 max-w-md text-center text-muted-foreground">
                      With the Pro plan, you can create fully customized reports with exactly the metrics and
                      visualizations you need.
                    </p>
                    <Button asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input id="report-name" placeholder="My Custom Report" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="report-description">Description</Label>
                        <Input id="report-description" placeholder="Report description (optional)" />
                      </div>
                      <div className="space-y-2">
                        <Label>Included Metrics</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="metric-profit" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="metric-profit" className="text-sm">
                              Net Profit
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="metric-roi" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="metric-roi" className="text-sm">
                              ROI
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="metric-spending" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="metric-spending" className="text-sm">
                              Spending
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="metric-payouts" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="metric-payouts" className="text-sm">
                              Payouts
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Visualizations</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="viz-bar" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="viz-bar" className="text-sm">
                              Bar Chart
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="viz-line" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="viz-line" className="text-sm">
                              Line Chart
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="viz-pie" className="h-4 w-4" />
                            <Label htmlFor="viz-pie" className="text-sm">
                              Pie Chart
                            </Label>
                          </div>
                          <div className="flex items-center gap-2 rounded-md border p-2">
                            <input type="checkbox" id="viz-table" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="viz-table" className="text-sm">
                              Data Table
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Schedule</Label>
                        <Select defaultValue="manual">
                          <SelectTrigger>
                            <SelectValue placeholder="Report frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual Generation</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
                <Button variant="outline" disabled={!isProPlan}>
                  Save Template
                </Button>
                <Button disabled={!isProPlan}>Generate Report</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
