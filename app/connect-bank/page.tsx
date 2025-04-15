import Link from "next/link"
import { Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaidLinkButton } from "@/components/plaid/plaid-link-button"

export default function ConnectBankPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="mb-8 flex items-center gap-2 font-semibold">
        <Wallet className="h-5 w-5" />
        <span>PropFlow</span>
      </div>
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Securely Connect Your Bank</CardTitle>
          <CardDescription>
            We use Plaid to securely connect to your bank. Your credentials are never stored on our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <PlaidLinkButton className="flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700" />

          <div className="space-y-2">
            <p className="text-xs text-center text-muted-foreground">Trusted by banks worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Chase", "Bank of America", "Wells Fargo", "Citi"].map((bank) => (
                <div
                  key={bank}
                  className="flex h-8 items-center justify-center rounded-md bg-muted px-3 text-xs font-medium"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border bg-muted/30 p-3">
            <h3 className="mb-1 text-sm font-medium">How your data is protected:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Bank-level 256-bit encryption</li>
              <li>• Your credentials are never stored</li>
              <li>• Read-only access to your transaction data</li>
              <li>• You can disconnect at any time</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Skip for now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
