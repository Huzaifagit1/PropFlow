import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  CreditCard,
  FileText,
  LineChart,
  PieChart,
  Shield,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnMorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Wallet className="h-5 w-5" />
            <span>PropFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simplify Your Prop Firm <span className="text-emerald-500">Financial Management</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                PropFlow is the all-in-one platform designed specifically for prop traders to track, analyze, and
                optimize their financial performance across multiple prop firms.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">
                    View Pricing <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is PropFlow Section */}
        <section className="py-16 md:py-24">  
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold tracking-tight">What is PropFlow?</h2>
              <p className="mt-6 text-center text-lg text-muted-foreground">
                PropFlow is a specialized financial tracking platform built for prop traders who manage multiple
                accounts across different proprietary trading firms.
              </p>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="flex flex-col items-start gap-2 items-center">
                  <div className="rounded-full bg-emerald-100 p-2 items-center">
                    <Wallet className="h-5 w-5 text-emerald-600 text-center" />
                  </div>
                  <h3 className="text-lg font-bold text-center sm:text-xl">Centralized Dashboard</h3>

                  <p className="text-muted-foreground text-center">
                    Consolidate all your prop firm accounts in one place. Track subscriptions, resets, payouts, and more
                    with a unified view of your trading business.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 items-center">
                  <div className="rounded-full bg-emerald-100 p-2 items-center">
                    <LineChart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-center sm:text-xl">Performance Analytics</h3>
                  <p className="text-muted-foreground text-center">
                    Visualize your financial performance across all prop firms with detailed charts and metrics that
                    help you identify which firms are most profitable.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 items-center" >
                  <div className="rounded-full bg-emerald-100 p-2">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-center sm:text-xl">Automatic Transaction Tracking </h3>
                  <p className="text-muted-foreground text-center">
                    Connect your bank account securely through Plaid to automatically import and categorize all the prop
                    firm-related transactions.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 items-center">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-center sm:text-xl">Detailed Reporting </h3>
                  <p className="text-muted-foreground text-center">
                    Generate comprehensive reports for tax purposes, performance reviews, or to optimize your allocation
                    of capital across different prop firms.
                  </p>
                </div>  
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/30 py-16 md:py-24">
  <div className="container">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-bold tracking-tight">How PropFlow Works</h2>
      <p className="mt-6 text-center text-lg text-muted-foreground">
        Getting started with PropFlow is simple. Follow these steps to gain clarity on your prop firm finances.
      </p>

      <div className="mt-12">
        <div className="relative">
          {/* Timeline line - adjusted for better responsiveness */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Step 1 */}
          <div className="relative mb-12 md:mb-16">
            <div className="flex items-start">
              {/* Circle with number - positioned absolutely for consistent alignment */}
              <div className="absolute left-0 sm:left-2 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white transform md:-translate-x-1/2">
                1
              </div>
              
              {/* Content container with better responsive layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 ml-12 sm:ml-16 md:ml-0">
                {/* Left content (right-aligned on desktop) */}
                <div className="md:pr-8 md:text-right order-1">
                  <h3 className="text-xl font-medium">Connect Your Bank</h3>
                  <p className="mt-2 text-muted-foreground">
                    Securely link your bank accounts using our Plaid integration. Your credentials are never
                    stored on our servers.
                  </p>
                </div>
                
                {/* Icon container */}
                <div className="hidden md:flex md:items-start md:pl-8 order-2">
                  <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <Shield className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-12 md:mb-16">
            <div className="flex items-start">
              {/* Circle with number */}
              <div className="absolute left-0 sm:left-2 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white transform md:-translate-x-1/2">
                2
              </div>
              
              {/* Content container */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 ml-12 sm:ml-16 md:ml-0">
                {/* Icon container - first on mobile, second on desktop */}
                <div className="hidden md:flex md:items-start md:justify-end md:pr-8 order-2 md:order-1">
                  <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <Wallet className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                
                {/* Right content */}
                <div className="md:pl-8 order-1 md:order-2">
                  <h3 className="text-xl font-medium">Select Your Prop Firms</h3>
                  <p className="mt-2 text-muted-foreground">
                    Choose which prop firms you want to track. PropFlow automatically identifies transactions
                    related to these firms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-12 md:mb-16">
            <div className="flex items-start">
              {/* Circle with number */}
              <div className="absolute left-0 sm:left-2 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white transform md:-translate-x-1/2">
                3
              </div>
              
              {/* Content container */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 ml-12 sm:ml-16 md:ml-0">
                {/* Left content */}
                <div className="md:pr-8 md:text-right order-1">
                  <h3 className="text-xl font-medium">View Your Dashboard</h3>
                  <p className="mt-2 text-muted-foreground">
                    Access your personalized dashboard showing spending, payouts, and net profit across all your
                    prop firms.
                  </p>
                </div>
                
                {/* Icon container */}
                <div className="hidden md:flex md:items-start md:pl-8 order-2">
                  <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <BarChart3 className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="flex items-start">
              {/* Circle with number */}
              <div className="absolute left-0 sm:left-2 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white transform md:-translate-x-1/2">
                4
              </div>
              
              {/* Content container */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 ml-12 sm:ml-16 md:ml-0">
                {/* Icon container */}
                <div className="hidden md:flex md:items-start md:justify-end md:pr-8 order-2 md:order-1">
                  <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <PieChart className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                
                {/* Right content */}
                <div className="md:pl-8 order-1 md:order-2">
                  <h3 className="text-xl font-medium">Generate Reports</h3>
                  <p className="mt-2 text-muted-foreground">
                    Create detailed reports for specific time periods or prop firms to gain deeper insights into
                    your trading business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Benefits for Traders Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold tracking-tight">Benefits for Traders</h2>
              <p className="mt-6 text-center text-lg text-muted-foreground">
                PropFlow helps you make data-driven decisions about your prop firm investments.
              </p>

              <div className="mt-12">
                <Tabs defaultValue="clarity" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
  <TabsTrigger value="clarity" className="text-xs sm:text-sm md:text-base font-medium">
    Financial Clarity
  </TabsTrigger>
  <TabsTrigger value="optimization" className="text-xs sm:text-sm md:text-base font-medium">
    Optimization
  </TabsTrigger>
  <TabsTrigger value="time" className="text-xs sm:text-sm md:text-base font-medium">
    Time Saving
  </TabsTrigger>
</TabsList>


                  <TabsContent value="clarity" className="mt-6 rounded-lg border bg-card p-6">
                    <h3 className="text-xl font-medium">Gain Complete Financial Clarity</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Unified View:</span> See all your prop firm
                          expenses and income in one place instead of juggling multiple accounts and statements.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">True ROI Calculation:</span> Understand your
                          actual return on investment across all prop firms, accounting for all fees and payouts.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Historical Performance:</span> Track your
                          financial performance over time to identify trends and patterns in your trading business.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="optimization" className="mt-6 rounded-lg border bg-card p-6">
                    <h3 className="text-xl font-medium">Optimize Your Prop Firm Portfolio</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Firm Comparison:</span> Easily compare the
                          performance of different prop firms to identify which ones provide the best return.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Capital Allocation:</span> Make data-driven
                          decisions about where to allocate your capital based on historical performance.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Cost Reduction:</span> Identify unnecessary
                          expenses and optimize your subscription plans to maximize profitability.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="time" className="mt-6 rounded-lg border bg-card p-6">
                    <h3 className="text-xl font-medium">Save Time and Reduce Stress</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Automated Tracking:</span> Eliminate manual
                          record-keeping and spreadsheets with automatic transaction categorization.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Tax Preparation:</span> Generate reports that
                          make tax season easier by having all your trading business expenses and income organized.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-1">
                          <svg className="h-3 w-3 fill-emerald-600" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Focus on Trading:</span> Spend less time on
                          administrative tasks and more time on what matters—improving your trading performance.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted/30 py-16 md:py-24">
  <div className="container px-4 sm:px-6">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-bold tracking-tight">What Traders Are Saying</h2>
      <p className="mt-6 text-center text-lg text-muted-foreground">
        Hear from prop traders who have transformed their financial management with PropFlow.
      </p>
  
      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* First testimonial */}
        <Card className="h-full">
          <CardContent className="pt-6 h-full flex flex-col">
            <div className="flex flex-col gap-4 h-full">
              {/* Stars - centered on small and medium screens */}
              <div className="flex gap-0.5 text-amber-400 justify-center lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground flex-grow text-center lg:text-left">
                "Before PropFlow, I was using spreadsheets to track my prop firm expenses. Now I can see exactly
                which firms are profitable and which ones are costing me money. It's been a game-changer for my
                trading business."
              </p>
              {/* Trader info - centered on small and medium screens */}
              <div className="mt-auto pt-4 text-center lg:text-left">
                <p className="font-medium">Michael T.</p>
                <p className="text-sm text-muted-foreground">Futures Trader</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second testimonial */}
        <Card className="h-full">
          <CardContent className="pt-6 h-full flex flex-col">
            <div className="flex flex-col gap-4 h-full">
              {/* Stars - centered on small and medium screens */}
              <div className="flex gap-0.5 text-amber-400 justify-center lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground flex-grow text-center lg:text-left">
                "The automatic transaction tracking is incredible. I no longer have to manually log every
                subscription payment or payout. PropFlow has saved me hours each month and given me insights I
                never had before."
              </p>
              {/* Trader info - centered on small and medium screens */}
              <div className="mt-auto pt-4 text-center lg:text-left">
                <p className="font-medium">Sarah K.</p>
                <p className="text-sm text-muted-foreground">Forex Trader</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third testimonial */}
        <Card className="h-full sm:col-span-2 lg:col-span-1">
          <CardContent className="pt-6 h-full flex flex-col">
            <div className="flex flex-col gap-4 h-full">
              {/* Stars - centered on small and medium screens */}
              <div className="flex gap-0.5 text-amber-400 justify-center lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground flex-grow text-center lg:text-left">
                "Tax time used to be a nightmare with all my prop firm accounts. PropFlow's reporting feature
                made it so much easier this year. I was able to generate all the reports I needed in minutes
                instead of days."
              </p>
              {/* Trader info - centered on small and medium screens */}
              <div className="mt-auto pt-4 text-center lg:text-left">
                <p className="font-medium">David R.</p>
                <p className="text-sm text-muted-foreground">Options Trader</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-6 text-center text-lg text-muted-foreground">
                Get answers to common questions about PropFlow.
              </p>

              <div className="mt-12">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How secure is PropFlow?</AccordionTrigger>
                    <AccordionContent>
                      PropFlow takes security seriously. We use bank-level encryption and never store your bank
                      credentials. All connections are made through Plaid's secure API, which is used by major financial
                      institutions. Your data is encrypted both in transit and at rest.
                    </AccordionContent>
                  </AccordionItem>  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Which firms does PropFlow support?</AccordionTrigger>
                    <AccordionContent>
                      PropFlow supports all major prop firms including Topstep, Apex, Tradeify, My Funded Futures, FTMO,
                      E8 Funding, The 5%ers, and many more. If you use a prop firm that's not automatically recognized,
                      you can add custom firms in our Pro plan.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do I need to connect my bank account?</AccordionTrigger>
                    <AccordionContent>
                      While connecting your bank account provides the best experience with automatic transaction
                      tracking, it's not required. You can manually enter transactions if you prefer, though this is
                      more time-consuming and prone to errors.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I track multiple prop firms?</AccordionTrigger>
                    <AccordionContent>
                      Yes! PropFlow is specifically designed for traders who use multiple prop firms. Our Free plan
                      allows tracking 1 firm, Basic plan allows up to 3 firms, and our Pro plan offers unlimited firm
                      tracking.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How does PropFlow help with taxes?</AccordionTrigger>
                    <AccordionContent>
                      PropFlow categorizes all your prop firm-related transactions and allows you to generate detailed
                      reports for any time period. These reports can be used for tax preparation, showing all your
                      business expenses and income. While we don't provide tax advice, our reports make it much easier
                      for you or your accountant to prepare your tax returns.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 30-day free trial that allows you to track one prop firm with basic features.
                      After the trial period, it's just $5/month to continue using these features, or you can upgrade to
                      a paid plan for additional features and firm tracking.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-xl bg-card p-8 shadow-lg md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Ready to Transform Your Prop Firm Management?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Join thousands of traders who are saving time, reducing stress, and making better financial decisions
                  with PropFlow.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/pricing">
                      View Pricing <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>  
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  30-day free trial, then $5/month. No long-term commitment. Upgrade anytime.
                </p>
              </div>
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
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
  <Link 
    href="/" 
    className="hover:text-foreground transition-colors whitespace-nowrap"
  >
    Home
  </Link>
  <Link 
    href="/pricing" 
    className="hover:text-foreground transition-colors whitespace-nowrap"
  >
    Pricing
  </Link>
  <Link 
    href="#" 
    className="hover:text-foreground transition-colors whitespace-nowrap"
  >
    About
  </Link>
  <Link 
    href="#" 
    className="hover:text-foreground transition-colors whitespace-nowrap"
  >
    Contact
  </Link>
  <Link 
    href="#" 
    className="hover:text-foreground transition-colors hidden sm:inline-block whitespace-nowrap"
  >
    Privacy Policy
  </Link>
  <Link 
    href="#" 
    className="hover:text-foreground transition-colors sm:hidden whitespace-nowrap"
  >
    Privacy
  </Link>
</nav>
        </div>
      </footer>
    </div>
  )
}
