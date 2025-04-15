"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, ChevronRight, CreditCard, Lock, PieChart, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SplashScreen } from "@/components/splash-screen"

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
      // Start showing content with a slight delay for smooth transition
      setTimeout(() => setShowContent(true), 100)
    }, 2500)

    return () => clearTimeout(splashTimer)
  }, [])

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen />}

      {/* Main Content */}
      <div
        className={`flex min-h-screen flex-col transition-opacity duration-1000 ease-in-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <header className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Wallet className="h-5 w-5" />
            <span>PropFlow</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
  <Link
    href="/login"
    className="text-sm font-medium text-muted-foreground hover:text-foreground truncate"
  >
    Login
  </Link>
  <Button asChild className="px-3 py-2 text-sm sm:px-4 sm:py-2.5">
    <Link href="/register" className="truncate">Get Started</Link>
  </Button>
</div>

        </header>
        <main className="flex-1">
          <section className="bg-gradient-to-b from-background to-muted/30 justify-center align-center">
            <div className="container flex flex-col items-center justify-center gap-4 py-12 text-center md:py-24 lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-[640px] space-y-6">  
              <h1 className="text-2xl font-bold leading-tight tracking-tighter text-center sm:text-5xl md:text-6xl">
  <span className="block sm:hidden">
    Track and manage your prop firm <span className="text-emerald-500">finances</span> with full clarity and ease
  </span>
  <span className="hidden sm:inline">
    Track your prop firm <span className="text-emerald-500">finances</span> with clarity
  </span>
</h1>    
 
                <p className="text-base sm:text-lg text-muted-foreground text-center">
  PropFlow helps you monitor spending and payouts from all your prop trading firms in one place, giving
  you the insights you need to maximize your profits.
</p>
                <div className="flex flex-col gap-4 sm:flex-row justify-center w-full">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/register">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
          <Link href="/learn-more">
            Learn More <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground lg:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <span>Secure bank connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <span>Automatic categorization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <span>Real-time insights</span>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 w-full max-w-[650px] lg:mt-0">
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-emerald-100/80 blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-emerald-100/80 blur-2xl"></div>

                <div className="relative z-10 overflow-hidden rounded-xl border bg-background shadow-xl">
                  {/* Device Mockup */}
                  <div className="flex flex-col rounded-t-xl bg-muted px-4 pt-3 pb-2">
                    <div className="mb-2 flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium">PropFlow Dashboard</div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-background"></div>
                        <div className="h-4 w-16 rounded-md bg-background"></div>
                      </div>
                    </div>
                  </div>  

                  {/* Dashboard Preview Content */}
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold">Welcome back, Alex</h3>
                      <p className="text-sm text-muted-foreground">Here's an overview of your prop firm activity</p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="rounded-lg border bg-card p-3 shadow-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-xs font-medium text-muted-foreground">Total Spent</div>
                          <div className="rounded-full bg-red-100 p-1">
                            <svg className="h-2 w-2 rotate-180 fill-red-600" viewBox="0 0 24 24">
                              <path d="M7 14l5-5 5 5H7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-lg font-bold">$4,550</div>
                      </div>
                      <div className="rounded-lg border bg-card p-3 shadow-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-xs font-medium text-muted-foreground">Total Received</div>
                          <div className="rounded-full bg-emerald-100 p-1">
                            <svg className="h-2 w-2 fill-emerald-600" viewBox="0 0 24 24">
                              <path d="M7 14l5-5 5 5H7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-lg font-bold">$8,750</div>
                      </div>
                      <div className="rounded-lg border bg-card p-3 shadow-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-xs font-medium text-muted-foreground">Net Total</div>
                          <div className="rounded-full bg-emerald-100 p-1">
                            <svg className="h-2 w-2 fill-emerald-600" viewBox="0 0 24 24">
                              <path d="M7 14l5-5 5 5H7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-lg font-bold">$4,200</div>
                      </div>
                      <div className="rounded-lg border bg-card p-3 shadow-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-xs font-medium text-muted-foreground">Transactions</div>
                          <div className="rounded-full bg-muted p-1">
                            <svg className="h-2 w-2 fill-muted-foreground" viewBox="0 0 24 24">
                              <path d="M7 10l5 5 5-5H7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-lg font-bold">32</div>
                      </div>
                    </div>

                    {/* Firm Breakdown Section - Replacing the Chart */}
                    <div className="space-y-4 rounded-lg border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Firm Breakdown</div>
                        <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs">
                          Last 30 days <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Topstep</span>
                            <span className="text-xs font-medium text-emerald-600">+$2,300</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "85%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Apex</span>
                            <span className="text-xs font-medium text-emerald-600">+$950</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "65%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Tradeify</span>
                            <span className="text-xs font-medium text-emerald-600">+$550</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 z-20 rounded-lg border bg-background p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <PieChart className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Net Profit</div>
                      <div className="text-sm font-bold text-emerald-600">+$4,200</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 z-20 rounded-lg border bg-background p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Connected</div>
                      <div className="text-sm font-bold">5 Firms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>  

          <section id="features" className="container py-12 md:py-24 lg:py-32 flex justify-center">
  <div className="mx-auto grid max-w-5xl gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
      <div className="rounded-full bg-primary/10 p-3">
        <Wallet className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-medium text-center">Connect Your Bank</h3>
      <p className="text-center text-sm text-muted-foreground">
        Securely connect your bank accounts with Plaid integration for automatic transaction tracking.
      </p>
    </div>
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
      <div className="rounded-full bg-primary/10 p-3">
        <BarChart3 className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-medium text-center">Automatic Tracking</h3>
      <p className="text-center text-sm text-muted-foreground">
        Transactions are automatically categorized by prop firm, giving you clear insights into your spending.
      </p>
    </div>
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm sm:col-span-2 md:col-span-1">
      <div className="rounded-full bg-primary/10 p-3">
        <Lock className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-medium text-center">Visualize Performance</h3>
      <p className="text-center text-sm text-muted-foreground">
        See your net performance across all prop firms with intuitive charts and analytics.
      </p>
    </div>
  </div>
</section>
        </main>
        <footer className="border-t bg-muted/50">
          <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <Wallet className="h-5 w-5" />
              <span>PropFlow</span>
            </div>
            <nav className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                About
              </Link>
              <Link href="#" className="hover:text-foreground">
                Contact
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}
