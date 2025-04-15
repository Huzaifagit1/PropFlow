"use client"

import { useState, useEffect } from "react"
import { CreditCard, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { PlaidLinkButton } from "./plaid-link-button"

// Mock data for connected accounts
const mockConnectedAccounts = [
  {
    id: "acc_123",
    name: "Chase Checking",
    mask: "1234",
    type: "checking",
    institution: {
      name: "Chase",
      logo: "https://plaid.com/assets/img/institutions/chase.svg",
    },
    connectedAt: "2023-04-01T12:00:00Z",
  },
  {
    id: "acc_456",
    name: "Bank of America Savings",
    mask: "5678",
    type: "savings",
    institution: {
      name: "Bank of America",
      logo: "https://plaid.com/assets/img/institutions/bank-of-america.svg",
    },
    connectedAt: "2023-03-15T10:30:00Z",
  },
]

export function PlaidConnections({ compact = false, showHeader = true }: { compact?: boolean; showHeader?: boolean }) {
  const [isLoading, setIsLoading] = useState(true)
  const [connectedAccounts, setConnectedAccounts] = useState<typeof mockConnectedAccounts>([])
  const { toast } = useToast()

  useEffect(() => {
    // Check if Plaid is connected in localStorage (for demo)
    const isPlaidConnected = localStorage.getItem("propflow-plaid-connected") === "true"

    // For frontend demo, simulate API call to get connected accounts
    const fetchConnectedAccounts = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (isPlaidConnected) {
          setConnectedAccounts(mockConnectedAccounts)
        } else {
          setConnectedAccounts([])
        }
      } catch (error) {
        console.error("Error fetching connected accounts:", error)
        toast({
          title: "Error",
          description: "Failed to load connected accounts. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchConnectedAccounts()
  }, [toast])

  const handleDisconnect = async (accountId: string) => {
    try {
      // For frontend demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove the account from the list
      setConnectedAccounts(connectedAccounts.filter((account) => account.id !== accountId))

      // If no accounts left, set Plaid as disconnected
      if (connectedAccounts.length === 1) {
        localStorage.removeItem("propflow-plaid-connected")
      }

      toast({
        title: "Account disconnected",
        description: "Your bank account has been disconnected successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePlaidSuccess = () => {
    // Refresh the connected accounts
    setConnectedAccounts(mockConnectedAccounts)
    localStorage.setItem("propflow-plaid-connected", "true")
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <CardTitle>Connected Bank Accounts</CardTitle>
          <CardDescription>Manage your connected bank accounts</CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className={`flex justify-center ${compact ? "py-4" : "py-8"}`}>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : connectedAccounts.length > 0 ? (
          <>
            {connectedAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {account.institution.name} •••• {account.mask}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnect(account.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            ))}

            <div className="rounded-md border border-dashed p-4 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Connect another bank account to track more transactions
              </p>
              <PlaidLinkButton variant="outline" onSuccess={handlePlaidSuccess} />
            </div>
          </>
        ) : (
          <div className={`flex flex-col items-center justify-center ${compact ? "py-4" : "py-8"} text-center`}>
            <CreditCard className={`mb-2 ${compact ? "h-8 w-8" : "h-12 w-12"} text-muted-foreground`} />
            <h3 className={`${compact ? "text-base" : "text-lg"} font-medium`}>No connected accounts</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Connect your bank account to start tracking your prop firm transactions
            </p>
            {!compact && <PlaidLinkButton onSuccess={handlePlaidSuccess} />}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/20 px-6 py-4">
        <div className="text-xs text-muted-foreground">
          <p>
            Your financial data is securely transmitted using bank-level encryption. PropFlow never stores your bank
            credentials.
          </p>
          <p className="mt-1">
            You can disconnect your accounts at any time. Learn more about{" "}
            <a href="/privacy" className="text-primary hover:underline">
              how we protect your data
            </a>
            .
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
