"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type UserPlan = "starter" | "standard" | "premium"

interface User {
  id: string
  name: string
  email: string
  plan: UserPlan
  isAuthenticated: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, plan?: UserPlan) => void
  logout: () => void
  updatePlan: (plan: UserPlan) => void
}

const defaultUser: User = {
  id: "test-user-123",
  name: "Test User",
  email: "test@example.com",
  plan: "starter",
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("propflow-user")
    if (storedUser) {
      try {
        // Handle legacy plan names
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser.plan === "free") parsedUser.plan = "starter"
        if (parsedUser.plan === "basic") parsedUser.plan = "standard"
        if (parsedUser.plan === "pro") parsedUser.plan = "premium"

        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("propflow-user")
      }
    }
  }, [])

  // Login function - in a real app, this would validate credentials with your backend
  const login = (email: string, password: string, plan: UserPlan = "starter") => {
    const loggedInUser: User = {
      ...defaultUser,
      email,
      plan,
      isAuthenticated: true,
    }

    setUser(loggedInUser)
    localStorage.setItem("propflow-user", JSON.stringify(loggedInUser))
    localStorage.setItem("propflow-user-plan", plan) // For compatibility with existing code
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("propflow-user")
    localStorage.removeItem("propflow-user-plan")
  }

  // Update plan function
  const updatePlan = (plan: UserPlan) => {
    if (user) {
      const updatedUser = { ...user, plan }
      setUser(updatedUser)
      localStorage.setItem("propflow-user", JSON.stringify(updatedUser))
      localStorage.setItem("propflow-user-plan", plan) // For compatibility with existing code
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, updatePlan }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
