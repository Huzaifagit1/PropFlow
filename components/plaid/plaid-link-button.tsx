"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface PlaidLinkButtonProps {
  onSuccess?: () => void
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function PlaidLinkButton({ onSuccess, className, variant = "default" }: PlaidLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleOpenPlaidLink = async () => {
    // Check if user is authenticated
    const user = localStorage.getItem("propflow-user")
    if (!user || !JSON.parse(user).isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in before connecting your bank account.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you would:
      // 1. Call your backend to create a link_token
      // 2. Initialize Plaid Link with that token
      // 3. Handle the onSuccess callback

      // For frontend demo, simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful connection
      localStorage.setItem("propflow-plaid-connected", "true")

      toast({
        title: "Bank connected successfully",
        description: "Your bank account has been connected to PropFlow.",
      })

      // Call the success callback if provided
      if (onSuccess) {
        onSuccess()
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "There was an error connecting your bank account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button className={className} variant={variant} onClick={handleOpenPlaidLink} disabled={isLoading}>
        <Shield className="mr-2 h-4 w-4" />
        {isLoading ? "Connecting..." : "Connect with Plaid"}
      </Button>

      <p className="text-xs text-muted-foreground">
        By connecting your accounts, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        . PropFlow uses Plaid to connect to your bank. Plaid may use your information in accordance with their{" "}
        <a
          href="https://plaid.com/legal/#end-user-privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}
