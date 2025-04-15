"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user?.isAuthenticated) {
      router.push("/login")
    }
  }, [user, router])

  if (!user?.isAuthenticated) {
    return null
  }

  return <>{children}</>
}
