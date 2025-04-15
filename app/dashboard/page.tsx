"use client"

import { useState, useEffect, useMemo } from "react"

import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  CreditCard,
  Crown,
  Download,
  Filter,
  Lock,
  Search,
  Settings,
  Sparkles,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ExportReportDialog } from "@/components/export-report-dialog"
import { PlanSwitcher } from "@/components/plan-switcher"
import { ReturnsSwitcher } from "@/components/returns-switcher"
import { usePropFirms } from "@/components/prop-firm-context"
import { ProfitCurveChart } from "@/components/profit-curve-chart"
import { useAuth } from "@/components/auth/auth-context"
import { UserAccountNav } from "@/components/user-account-nav"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";


// Mock transaction data - positive returns
const positiveTransactions = [
  {
    date: "2023-04-01",
    firmId: "topstep",
    firm: "Topstep",
    category: "Payout",
    amount: 1250,
    notes: "",
  },
  {
    date: "2023-03-28",
    firmId: "apex",
    firm: "Apex",
    category: "Spending",
    amount: -200,
    notes: "",
  },
  {
    date: "2023-03-25",
    firmId: "tradeify",
    firm: "Tradeify",
    category: "Payout",
    amount: 850,
    notes: "",
  },
  {
    date: "2023-03-20",
    firmId: "mff",
    firm: "My Funded Futures",
    category: "Spending",
    amount: -150,
    notes: "",
  },
  {
    date: "2023-03-15",
    firmId: "topstep",
    firm: "Topstep",
    category: "Spending",
    amount: -175,
    notes: "",
  },
  {
    date: "2023-03-10",
    firmId: "apex",
    firm: "Apex",
    category: "Payout",
    amount: 1100,
    notes: "",
  },
  {
    date: "2023-03-05",
    firmId: "tpt",
    firm: "Take Profit Trader",
    category: "Spending",
    amount: -225,
    notes: "",
  },
]

// Mock transaction data - negative returns
const negativeTransactions = [
  {
    date: "2023-04-01",
    firmId: "topstep",
    firm: "Topstep",
    category: "Loss",
    amount: -750,
    notes: "",
  },
  {
    date: "2023-03-28",
    firmId: "apex",
    firm: "Apex",
    category: "Spending",
    amount: -200,
    notes: "",
  },
  {
    date: "2023-03-25",
    firmId: "tradeify",
    firm: "Tradeify",
    category: "Loss",
    amount: -450,
    notes: "",
  },
  {
    date: "2023-03-20",
    firmId: "mff",
    firm: "My Funded Futures",
    category: "Spending",
    amount: -150,
    notes: "",
  },
  {
    date: "2023-03-15",
    firmId: "topstep",
    firm: "Topstep",
    category: "Spending",
    amount: -175,
    notes: "",
  },
  {
    date: "2023-03-10",
    firmId: "apex",
    firm: "Apex",
    category: "Loss",
    amount: -300,
    notes: "",
  },
  {
    date: "2023-03-05",
    firmId: "tpt",
    firm: "Take Profit Trader",
    category: "Spending",
    amount: -225,
    notes: "",
  },
]

// Mock firm data - positive returns
const positiveFirmData = [
  { id: "topstep", name: "Topstep", spent: 1200, received: 3500 },
  { id: "apex", name: "Apex", spent: 1800, received: 2750 },
  { id: "tradeify", name: "Tradeify", spent: 950, received: 1500 },
  { id: "mff", name: "My Funded Futures", spent: 600, received: 1000 },
  { id: "tpt", name: "Take Profit Trader", spent: 800, received: 0 },
  { id: "ftmo", name: "FTMO", spent: 900, received: 2000 },
  { id: "e8", name: "E8 Funding", spent: 750, received: 1800 },
  { id: "5ers", name: "The 5%ers", spent: 850, received: 1600 },
]

// Mock firm data - negative returns
const negativeFirmData = [
  { id: "topstep", name: "Topstep", spent: 1200, received: 450 },
  { id: "apex", name: "Apex", spent: 1800, received: 500 },
  { id: "tradeify", name: "Tradeify", spent: 950, received: 300 },
  { id: "mff", name: "My Funded Futures", spent: 600, received: 200 },
  { id: "tpt", name: "Take Profit Trader", spent: 800, received: 0 },
  { id: "ftmo", name: "FTMO", spent: 900, received: 400 },
  { id: "e8", name: "E8 Funding", spent: 750, received: 300 },
  { id: "5ers", name: "The 5%ers", spent: 850, received: 250 },
]

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("30d")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [returnsType, setReturnsType] = useState<"positive" | "negative">("positive")
  const { getSelectedPropFirms, isSelected } = usePropFirms()
  const { user, updatePlan } = useAuth()

  // Get the appropriate data based on returns type
  const allTransactions = returnsType === "positive" ? positiveTransactions : negativeTransactions
  const allFirmData = returnsType === "positive" ? positiveFirmData : negativeFirmData

  // Get all selected prop firms
  const selectedPropFirms = useMemo(() => getSelectedPropFirms(), [getSelectedPropFirms])

  // Filter transactions based on selected prop firms
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions)
  const [filteredFirmData, setFilteredFirmData] = useState(allFirmData)
  const [totals, setTotals] = useState({
    spent: 0,
    received: 0,
    net: 0,
    transactions: 0,
  })

  // Update filtered data when selected firms change or returns type changes
  useEffect(() => {
    // Apply plan limits to the number of firms
    let limitedFirms = [...selectedPropFirms]
    if (user?.plan === "free" && limitedFirms.length > 1) {
      // Free plan: Only show the first selected firm
      limitedFirms = limitedFirms.slice(0, 1)
    } else if (user?.plan === "basic" && limitedFirms.length > 3) {
      // Basic plan: Only show up to 3 firms
      limitedFirms = limitedFirms.slice(0, 3)
    }

    const limitedFirmIds = limitedFirms.map((firm) => firm.id)

    // Filter transactions
    const transactions = allTransactions.filter((t) => {
      // Check if this transaction's firmId is in our limited firms list
      return limitedFirmIds.includes(t.firmId)
    })

    // For custom firms, we might not have matching transactions in our mock data
    // In a real app, you would query transactions based on the custom keywords
    setFilteredTransactions(transactions)

    // Filter firm data and include custom firms
    const firmData = allFirmData.filter((f) => limitedFirmIds.includes(f.id))

    // Add any custom firms that don't exist in the mock data
    const customFirms = limitedFirms.filter((firm) => firm.isCustom && !firmData.some((f) => f.id === firm.id))

    // For custom firms without data, create placeholder data
    const customFirmData = customFirms.map((firm) => ({
      id: firm.id,
      name: firm.name,
      spent: 0, // Default values
      received: 0, // Default values
    }))

    // Combine regular and custom firm data
    const combinedFirmData = [...firmData, ...customFirmData]

    setFilteredFirmData(combinedFirmData)

    // Calculate totals
    const spent = combinedFirmData.reduce((sum, firm) => sum + firm.spent, 0)
    const received = combinedFirmData.reduce((sum, firm) => sum + firm.received, 0)
    setTotals({
      spent,
      received,
      net: received - spent,
      transactions: transactions.length,
    })
  }, [selectedPropFirms, user?.plan, allTransactions, allFirmData, returnsType])

  // Helper function to determine if a feature is available based on plan
  const isFeatureAvailable = (requiredPlan: string) => {
    const planLevels = { starter: 0, standard: 1, premium: 2 }
    return planLevels[user?.plan as keyof typeof planLevels] >= planLevels[requiredPlan as keyof typeof planLevels]
  }

  // Handle plan change
  const handlePlanChange = (plan: "free" | "basic" | "pro") => {
    updatePlan(plan)
  }

  // Handle returns type change
  const handleReturnsChange = (returns: "positive" | "negative") => {
    setReturnsType(returns)
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
      
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <Wallet className="h-5 w-5" />
          <span className="sm:inline">PropFlow</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Plan Switcher - Only visible on larger screens */}
          <div className="hidden lg:block mr-1 sm:mr-2 rounded-md border border-dashed border-amber-200 bg-amber-50 px-2 py-1">
            <PlanSwitcher currentPlan={user?.plan || "free"} onPlanChange={handlePlanChange} />
          </div>

          {/* Returns Switcher - Only visible on larger screens */}
          <div className="hidden lg:block rounded-md border border-dashed border-amber-200 bg-amber-50 px-2 py-1">
            <ReturnsSwitcher currentReturns={returnsType} onReturnsChange={handleReturnsChange} />
          </div>

          {/* Membership Badge - Compact on mobile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`flex h-8 items-center justify-between rounded-full px-2 sm:px-3 py-1 text-xs font-medium ${
                    user?.plan === "starter"
                      ? "border border-gray-200 bg-gray-50 text-gray-700"
                      : user?.plan === "standard"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-indigo-200 bg-indigo-50 text-indigo-700"
                  }`}
                >
                  <span className="hidden xs:inline">
                    {user?.plan === "starter" 
                      ? "Starter" 
                      : user?.plan === "standard" 
                        ? "Standard" 
                        : "Premium"}
                  </span>
                  <span className="xs:hidden">
                    {user?.plan === "starter" 
                      ? "S" 
                      : user?.plan === "standard" 
                        ? "Std" 
                        : "P"}
                  </span>
                  
                  {user?.plan === "starter" ? (
                    <Link href="/pricing">
                      <Button variant="ghost" size="icon" className="ml-1 h-5 w-5 text-gray-500 hover:text-gray-700">
                        <Crown className="h-3 w-3" />
                      </Button>
                    </Link>
                  ) : user?.plan === "standard" ? (
                    <Link href="/pricing">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-5 w-5 text-emerald-500 hover:text-emerald-700"
                      >
                        <Sparkles className="h-3 w-3" />
                      </Button>
                    </Link>
                  ) : (
                    <Crown className="ml-1 h-3 w-3 text-indigo-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {user?.plan === "starter" ? (
                  <p>
                    <Link href="/pricing" className="text-xs font-medium text-primary hover:underline">
                      Upgrade your plan
                    </Link>{" "}
                    or continue at $5/month after your 30-day trial
                  </p>
                ) : user?.plan === "standard" ? (
                  <p>
                    <Link href="/pricing" className="text-xs font-medium text-primary hover:underline">
                      Upgrade your plan
                    </Link>{" "}
                    to unlock more features
                  </p>
                ) : (
                  <p>You're on our premium plan with all features unlocked</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Account Nav - Only visible on larger screens */}
          <div className="hidden lg:block">
            <UserAccountNav />
          </div>
          
          {/* Mobile Menu Button - Visible on medium and smaller screens */}
          <Sheet>
  {/* Mobile Menu Button – visible only on small screens */}
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  </SheetTrigger>

  {/* Slide-out Drawer Content */}
  <SheetContent
    side="right"
    className="w-full max-w-xs sm:max-w-sm lg:hidden overflow-y-auto px-4 py-4"
  >
    <div className="flex flex-col gap-4 break-words overflow-hidden">
      <h2 className="text-lg font-semibold">Options</h2>

      {/* Plan Switcher in Mobile Menu */}
      <div className="rounded-md border border-dashed border-amber-200 bg-amber-50 px-3 py-4 break-words overflow-hidden">
        <h3 className="mb-2 text-sm font-medium">Plan</h3>
        <PlanSwitcher
          currentPlan={user?.plan || "free"}
          onPlanChange={handlePlanChange}
        />
      </div>

      {/* Returns Switcher in Mobile Menu */}
      <div className="rounded-md border border-dashed border-amber-200 bg-amber-50 px-3 py-4 break-words overflow-hidden">
        <h3 className="mb-2 text-sm font-medium">Returns</h3>
        <ReturnsSwitcher
          currentReturns={returnsType}
          onReturnsChange={handleReturnsChange}
        />
      </div>

      {/* Account section */}
      <div className="mt-2 break-words overflow-hidden">
        <h3 className="mb-2 text-sm font-medium">Account</h3>
        <UserAccountNav />
      </div>
    </div>
  </SheetContent>
</Sheet>

        </div>  
      </div>
    </header>
        <main className="flex-1 bg-muted/50 pb-12 w-full">
          <div className="container py-6">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
  <div>
    <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
    <p className="text-muted-foreground">Here's an overview of your prop firm activity</p>
  </div>
  <div className="flex items-center space-x-2">
    {/* Prop Firms Badge - Always visible */}
    <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 whitespace-nowrap">
      <CreditCard className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
      <span className="text-xs font-medium">
        <span className="hidden xs:inline">
          {selectedPropFirms.length} Prop {selectedPropFirms.length === 1 ? "Firm" : "Firms"}
        </span>
        <span className="xs:hidden">{selectedPropFirms.length}</span>
        {user?.plan === "starter" ? " (1 max)" : user?.plan === "standard" ? " (3 max)" : ""}
      </span>
    </Badge>

    {/* Manage Firms Button - Icon only on small screens */}
    <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3 whitespace-nowrap" asChild>
      <Link href="/settings?tab=propfirms">
        <Settings className="h-3.5 w-3.5" />
        <span className="hidden sm:inline ml-1">Manage Firms</span>
      </Link>
    </Button>

    {/* Date Filter Select - FIXED to maintain consistent size across breakpoints */}
    <Select value={dateFilter} onValueChange={setDateFilter}>
      <SelectTrigger className="h-8 w-[160px] whitespace-nowrap">
        <Calendar className="mr-1 h-3.5 w-3.5" />
        <SelectValue placeholder="Period" className="text-sm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="30d">Last 30 days</SelectItem>
        <SelectItem value="3m" disabled={!isFeatureAvailable("basic")}>
          {!isFeatureAvailable("basic") && <Lock className="mr-2 h-3 w-3" />}
          Last 3 months
        </SelectItem>
        <SelectItem value="6m" disabled={!isFeatureAvailable("basic")}>
          {!isFeatureAvailable("basic") && <Lock className="mr-2 h-3 w-3" />}
          Last 6 months
        </SelectItem>
        <SelectItem value="ytd" disabled={!isFeatureAvailable("pro")}>
          {!isFeatureAvailable("pro") && <Lock className="mr-2 h-3 w-3" />}
          Year to date
        </SelectItem>
        <SelectItem value="custom" disabled={!isFeatureAvailable("pro")}>
          {!isFeatureAvailable("pro") && <Lock className="mr-2 h-3 w-3" />}
          Custom range
        </SelectItem>
      </SelectContent>
    </Select>

    {/* Export Button - Always visible as icon */}
    <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => setExportDialogOpen(true)}>
      <Download className="h-4 w-4" />
    </Button>
  </div>
</div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totals.spent.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Received</CardTitle>
                  {returnsType === "positive" ? (
                    <ArrowUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totals.received.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    {returnsType === "positive" ? "+25.2%" : "-35.8%"} from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Net Total</CardTitle>
                  {totals.net >= 0 ? (
                    <ArrowUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totals.net >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    ${totals.net.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {returnsType === "positive" ? "+42.8%" : "-68.3%"} from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totals.transactions}</div>
                  <p className="text-xs text-muted-foreground">-4 from last period</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader>  
                  <CardTitle>Profit Curve </CardTitle>
                  <CardDescription>Your cumulative profit/loss over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfitCurveChart data={filteredTransactions} />
                </CardContent>
              </Card>  
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Firm Breakdown</CardTitle>
                  <CardDescription>Your activity by prop firm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredFirmData.map((firm) => (
                      <div key={firm.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center font-medium">
                            {!isFeatureAvailable("basic") && firm.id !== "topstep" && (
                              <Lock className="mr-1.5 h-3 w-3 text-muted-foreground" />
                            )}
                            {firm.name}
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              firm.received - firm.spent >= 0 ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {firm.received - firm.spent >= 0 ? "+" : ""}${(firm.received - firm.spent).toFixed(2)}
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className={`h-2 rounded-full ${
                              firm.received - firm.spent >= 0 ? "bg-emerald-500" : "bg-red-500"
                            }`}
                            style={{
                              width: `${(firm.received / (firm.spent + firm.received || 1)) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Spent: ${firm.spent}</span>
                          <span>Received: ${firm.received}</span>
                        </div>
                      </div>
                    ))}

                    {filteredFirmData.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Wallet className="mb-2 h-8 w-8 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No firms selected</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Select prop firms in settings to see your data
                        </p>
                        <Button size="sm" asChild>
                          <Link href="/settings?tab=propfirms">Manage Firms</Link>
                        </Button>
                      </div>
                    )}

                    {!isFeatureAvailable("basic") && filteredFirmData.length > 0 && (
                      <div className="mt-4 rounded-md border border-dashed p-3 text-center">
                        <p className="mb-2 text-sm text-muted-foreground">
                          Upgrade to Basic or Pro to connect more firms
                        </p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/pricing">View Plans</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  {selectedPropFirms.length > filteredFirmData.length && (
                    <div className="mt-4 rounded-md border border-dashed p-3 text-center">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {user?.plan === "free"
                          ? "Trial plan limited to 1 prop firm. $5/month after trial."
                          : "Basic plan limited to 3 prop firms."}{" "}
                        Some selected firms are not shown.
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/pricing">Upgrade Plan</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
            <CardHeader>
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    {/* Left side: Title & Description */}
    <div>
      <CardTitle className="text-xl">Recent Transactions</CardTitle>
      <CardDescription className="text-sm">
        A list of your recent transactions across all prop firms
      </CardDescription>
    </div>

    {/* Right side: Input + Buttons row */}
    <div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4 md:w-auto">
      {/* Search Input */}
      <div className="relative w-full md:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search transactions..."
          className="w-full md:w-[300px] pl-8"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>

        {!isFeatureAvailable("pro") && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1" asChild>
                  <Link href="/pricing">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Advanced</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">
                  Upgrade to Pro for advanced filtering and custom insights
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  </div>
</CardHeader>


  <CardContent>
    {filteredTransactions.length > 0 ? (
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Firm</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Add Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction, i) => (
              <TableRow
                key={i}
                className={
                  !isFeatureAvailable("basic") && transaction.firmId !== "topstep"
                    ? "opacity-50"
                    : ""
                }
              >
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  {!isFeatureAvailable("basic") && transaction.firmId !== "topstep" ? (
                    <div className="flex items-center">
                      <Lock className="mr-1.5 h-3 w-3 text-muted-foreground" />
                      {transaction.firm}
                    </div>
                  ) : (
                    transaction.firm
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.category === "Payout"
                        ? "bg-emerald-100 text-emerald-800"
                        : transaction.category === "Loss"
                        ? "bg-red-100 text-red-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell
                  className={
                    transaction.amount > 0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={transaction.notes}
                      placeholder="Add notes about this transaction..."
                      className="w-full border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0 text-muted-foreground placeholder:text-muted-foreground/70"
                      onBlur={(e) => {
                        console.log(
                          `Updated note for transaction ${transaction.date}: ${e.target.value}`
                        )
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-50 hover:opacity-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Wallet className="mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">No transactions to display</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Select prop firms in settings to see your transactions
        </p>
        <Button asChild>
          <Link href="/settings?tab=propfirms">Manage Firms</Link>
        </Button>
      </div>
    )}

    {filteredTransactions.length > 0 && (
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          {user?.plan === "starter"
            ? "7 days (30-day trial, then $5/mo)"
            : user?.plan === "standard"
            ? "6 months"
            : "all"}{" "}
          of transaction history
        </p>

        {user?.plan === "starter" && (
          <Button size="sm" variant="outline" asChild>
            <Link href="/pricing">
              <Lock className="mr-1.5 h-3 w-3" />
              Unlock Full History
            </Link>
          </Button>
        )}
      </div>
    )}
  </CardContent>

  {!isFeatureAvailable("pro") && filteredTransactions.length > 0 && (
    <CardFooter className="border-t bg-muted/20 px-6 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h4 className="text-sm font-medium">Need detailed reports?</h4>
          <p className="text-xs text-muted-foreground">
            Upgrade to Pro for PDF exports and advanced analytics
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/pricing">Upgrade to Pro</Link>
        </Button>
      </div>
    </CardFooter>
  )}
</Card>

          </div>
        </main>
  
        {/* Export Report Dialog */}
        <ExportReportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          userPlan={user?.plan || "free"}
        />
      </div>
    </AuthGuard>
  )
}
