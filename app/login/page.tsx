"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthProviderButton, AuthProviderSeparator } from "@/components/auth-providers"
import { useAuth } from "@/components/auth/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password")
  const [plan, setPlan] = useState<"starter" | "standard" | "premium">("premium")
  const [showTestOptions, setShowTestOptions] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password, plan)
    router.push("/dashboard")
  }

  const toggleTestOptions = () => {
    setShowTestOptions(!showTestOptions)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="mb-8 flex items-center gap-2 font-semibold">
        <Wallet className="h-5 w-5" />
        <span>PropFlow</span>
      </div>
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* Test Options - Only visible in development */}
            <div className="pt-2">
              <button
                type="button"
                onClick={toggleTestOptions}
                className="text-xs text-muted-foreground hover:text-primary hover:underline"
              >
                {showTestOptions ? "Hide Test Options" : "Show Test Options"}
              </button>

              {showTestOptions && (
                <div className="mt-2 rounded-md border border-dashed border-amber-200 bg-amber-50 p-3">
                  <Label htmlFor="test-plan" className="text-xs text-amber-800">
                    Test Plan Level
                  </Label>
                  <Select value={plan} onValueChange={(value) => setPlan(value as "starter" | "standard" | "premium")}>
                    <SelectTrigger id="test-plan" className="mt-1 bg-white">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter Plan</SelectItem>
                      <SelectItem value="standard">Standard Plan</SelectItem>
                      <SelectItem value="premium">Premium Plan</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-amber-800">
                    This is for testing only. In production, plan levels would be managed by your backend.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              Login
            </Button>

            <AuthProviderSeparator />

            <AuthProviderButton provider="google" label="Sign in with Google" />

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
