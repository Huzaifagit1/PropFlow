import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PricingItemProps {
  children: React.ReactNode
  isIncluded?: boolean
}

function PricingItem({ children, isIncluded = true }: PricingItemProps) {
  return (
    <li className="flex items-center gap-2">
      {isIncluded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-green-500 flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 010 1.061l-11.25 11.25a.75.75 0 01-1.061 0l-5.25-5.25a.75.75 0 011.061-1.061L8.25 15.189l10.66-10.66a.75.75 0 011.062 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-red-500 flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className="text-sm">{children}</span>
    </li>
  )
}

export default function PricingPage() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Pricing Plans</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect plan for your prop trading business
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {/* Starter Plan */}
            <Card className="flex flex-col border-muted/50 h-full">
              <CardHeader className="flex flex-col gap-1 sm:text-center md:text-left lg:text-left">
                <div className="flex items-center gap-2 sm:justify-center md:justify-start lg:justify-start">
                  <CardTitle>Starter</CardTitle>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">30 Days</span>
                </div>
                <CardDescription>Try PropFlow risk-free</CardDescription>
                <div className="mt-4 flex items-baseline gap-1 sm:justify-center md:justify-start lg:justify-start">
                  <span className="text-3xl font-bold">$5</span>
                  <span className="text-muted-foreground">/month after trial</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground sm:text-center md:text-left lg:text-left">
                  Perfect for traders just getting started with a single prop firm.
                </p>
                <ul className="flex flex-1 flex-col gap-2 sm:items-center md:items-start lg:items-start">
                  <PricingItem>Connect 1 prop firm</PricingItem>
                  <PricingItem>30 days transaction history</PricingItem>
                  <PricingItem>Basic spending analytics</PricingItem>
                  <PricingItem>Secure bank connection</PricingItem>
                  <PricingItem isIncluded={false}>Multi-firm tracking</PricingItem>
                  <PricingItem isIncluded={false}>Extended history</PricingItem>
                  <PricingItem isIncluded={false}>PDF reports</PricingItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/register">Start Free Trial</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Standard Plan */}
            <Card className="flex flex-col border-emerald-200 shadow-md h-full">
              <CardHeader className="flex flex-col gap-1 sm:text-center md:text-left lg:text-left">
                <div className="flex items-center gap-2 sm:justify-center md:justify-start lg:justify-start">
                  <CardTitle>Standard</CardTitle>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Popular</span>
                </div>
                <CardDescription>For active prop traders</CardDescription>
                <div className="mt-4 flex items-baseline gap-1 sm:justify-center md:justify-start lg:justify-start">
                  <span className="text-3xl font-bold">$10</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground sm:text-center md:text-left lg:text-left">
                  Ideal for traders working with multiple prop firms who need more insights.
                </p>
                <ul className="flex flex-1 flex-col gap-2 sm:items-center md:items-start lg:items-start">
                  <PricingItem>Connect up to 3 prop firms</PricingItem>
                  <PricingItem>6 months transaction history</PricingItem>
                  <PricingItem>Detailed spending analytics</PricingItem>
                  <PricingItem>Secure bank connection</PricingItem>
                  <PricingItem>Basic reports</PricingItem>
                  <PricingItem>Performance tracking</PricingItem>
                  <PricingItem isIncluded={false}>Custom insights</PricingItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href="/register">Subscribe to Standard</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col border-muted/50 h-full">
              <CardHeader className="flex flex-col gap-1 sm:text-center md:text-left lg:text-left">
                <div className="flex sm:justify-center md:justify-start lg:justify-start">
                  <CardTitle>Premium</CardTitle>
                </div>
                <CardDescription>For serious prop traders</CardDescription>
                <div className="mt-4 flex items-baseline gap-1 sm:justify-center md:justify-start lg:justify-start">
                  <span className="text-3xl font-bold">$25</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground sm:text-center md:text-left lg:text-left">
                  Advanced features for professional traders managing multiple accounts.
                </p>
                <ul className="flex flex-1 flex-col gap-2 sm:items-center md:items-start lg:items-start">
                  <PricingItem>Unlimited prop firms</PricingItem>
                  <PricingItem>Unlimited transaction history</PricingItem>
                  <PricingItem>Advanced analytics</PricingItem>
                  <PricingItem>Secure bank connection</PricingItem>
                  <PricingItem>PDF reports & exports</PricingItem>
                  <PricingItem>Multi-firm tracking</PricingItem>
                  <PricingItem>Custom insights & alerts</PricingItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/register">Subscribe to Premium</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}