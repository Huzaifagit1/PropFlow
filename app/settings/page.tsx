"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, LogOut, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropFirmSettings } from "@/components/prop-firm-settings"
import { PlaidConnections } from "@/components/plaid/plaid-connections"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    // Get the tab from the URL query parameters
    const tabParam = searchParams.get("tab")
    if (tabParam && ["profile", "accounts", "propfirms"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Add a function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update the URL without refreshing the page
    const url = new URL(window.location.href)
    url.searchParams.set("tab", value)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-10 border-b bg-background">
  <div className="container flex h-16 items-center justify-between px-4 sm:px-6 py-4 gap-2 flex-nowrap overflow-hidden">
    
    {/* Left: Back to Dashboard */}
    <div className="flex items-center gap-2 min-w-0">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm sm:text-base truncate"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <span className="truncate">Back to Dashboard</span>
      </Link>
    </div>

    {/* Right: App Name */}
    <div className="flex items-center gap-1 font-semibold text-sm sm:text-base min-w-0">
      <Wallet className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
      <span className="truncate">PropFlow</span>
    </div>

  </div>
</header>

      <main className="flex-1 bg-muted/50 pb-12">
        <div className="container py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="flex w-full">
  <TabsTrigger value="profile" className="flex-1 flex items-center justify-center gap-1 px-1 sm:px-4">
    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    <span className="text-xs sm:text-sm">Profile</span>
  </TabsTrigger>
  <TabsTrigger value="accounts" className="flex-1 flex items-center justify-center gap-1 px-1 sm:px-4">
    <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    <span className="hidden xs:inline text-xs sm:text-sm">Connected</span>
    <span className="xs:hidden text-xs sm:text-sm">Accounts</span>
  </TabsTrigger>
  <TabsTrigger value="propfirms" className="flex-1 flex items-center justify-center gap-1 px-1 sm:px-4">
    <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    <span className="hidden xs:inline text-xs sm:text-sm">Prop Firms</span>
    <span className="xs:hidden text-xs sm:text-sm">Firms</span>
  </TabsTrigger>
</TabsList>
            <TabsContent value="profile" className="space-y-6">
              <Card>  
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about your account activity
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new transactions in your account
                      </p>
                    </div>
                    <Switch id="transaction-alerts" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="accounts" className="space-y-6">
  {/* Connected Bank Accounts Card */}
  <Card>
    <CardHeader>
      <CardTitle>Connected Bank Accounts</CardTitle>
      <CardDescription>Manage your connected bank accounts</CardDescription>
    </CardHeader>

    <CardContent>
      <PlaidConnections showHeader={false} />
    </CardContent>

    <CardFooter className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
      <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
        <Link href="/settings?tab=propfirms">
          <Wallet className="mr-2 h-4 w-4" />
          Manage Prop Firms
        </Link>
      </Button>
      <Button className="gap-2 w-full md:w-auto" asChild>
        <Link href="/connect-bank">
          <CreditCard className="h-4 w-4" />
          Connect New Account
        </Link>
      </Button>
    </CardFooter>
  </Card>

  {/* Account Actions Card */}
  <Card>
    <CardHeader>
      <CardTitle>Account Actions</CardTitle>
      <CardDescription>Manage your account settings</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/20 p-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <div className="font-medium text-destructive">Delete Account</div>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data
          </p>
        </div>
        <Button variant="destructive" size="sm" className="w-full md:w-auto">
          <LogOut className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </div>
    </CardContent>
  </Card>
</TabsContent>


            <TabsContent value="propfirms" className="space-y-6">
              <PropFirmSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
