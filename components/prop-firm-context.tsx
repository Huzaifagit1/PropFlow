"use client"

import { useContext } from "react"

// Create a new context file to manage prop firm selection state
import { createContext, useState, useEffect, type ReactNode } from "react"

// Define the types for our context
type PropFirm = {
  id: string
  name: string
  isSelected: boolean
  description: string
  isCustom?: boolean
}

type PropFirmContextType = {
  propFirms: PropFirm[]
  pendingPropFirms: PropFirm[]
  togglePropFirm: (id: string) => void
  getSelectedPropFirms: () => PropFirm[]
  isSelected: (id: string) => boolean
  addCustomPropFirm: (name: string, keyword: string) => void
  savePreferences: () => void
  discardChanges: () => void
  hasPendingChanges: boolean
}

// Create the initial prop firms data
const defaultPropFirms: PropFirm[] = [
  { id: "topstep", name: "Topstep", isSelected: true, description: "Transactions containing 'Topstep'" },
  { id: "apex", name: "Apex", isSelected: true, description: "Transactions containing 'Apex'" },
  { id: "tradeify", name: "Tradeify", isSelected: true, description: "Transactions containing 'Tradeify'" },
  { id: "mff", name: "My Funded Futures", isSelected: true, description: "Transactions containing 'Funded Futures'" },
  { id: "tpt", name: "Take Profit Trader", isSelected: true, description: "Transactions containing 'Take Profit'" },
  { id: "ftmo", name: "FTMO", isSelected: false, description: "Transactions containing 'FTMO'" },
  { id: "e8", name: "E8 Funding", isSelected: false, description: "Transactions containing 'E8'" },
  { id: "5ers", name: "The 5%ers", isSelected: false, description: "Transactions containing '5%ers'" },
]

// Create the context
const PropFirmContext = createContext<PropFirmContextType | undefined>(undefined)

// Create a provider component
export function PropFirmProvider({ children }: { children: ReactNode }) {
  const [propFirms, setPropFirms] = useState<PropFirm[]>(() => {
    // Try to load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("propflow-selected-firms")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error("Failed to parse saved prop firms", e)
        }
      }
    }
    return defaultPropFirms
  })

  // Create a separate state for pending changes
  const [pendingPropFirms, setPendingPropFirms] = useState<PropFirm[]>(propFirms)
  const [hasPendingChanges, setHasPendingChanges] = useState(false)

  // Initialize pending state when propFirms changes
  useEffect(() => {
    setPendingPropFirms([...propFirms])
    setHasPendingChanges(false)
  }, [propFirms])

  // Toggle a prop firm's selected state in the pending state
  const togglePropFirm = (id: string) => {
    setPendingPropFirms(
      pendingPropFirms.map((firm) => (firm.id === id ? { ...firm, isSelected: !firm.isSelected } : firm)),
    )
    setHasPendingChanges(true)
  }

  // Add a custom prop firm to the pending state
  const addCustomPropFirm = (name: string, keyword: string) => {
    // Create a unique ID based on the name
    const id = name.toLowerCase().replace(/\s+/g, "-")

    // Check if a firm with this ID already exists in pending state
    if (pendingPropFirms.some((firm) => firm.id === id)) {
      // If it exists, just update it
      setPendingPropFirms(
        pendingPropFirms.map((firm) =>
          firm.id === id
            ? {
                ...firm,
                name,
                description: `Transactions containing '${keyword}'`,
                isSelected: true,
                isCustom: true,
              }
            : firm,
        ),
      )
    } else {
      // Otherwise add a new firm
      const newFirm: PropFirm = {
        id,
        name,
        isSelected: true,
        description: `Transactions containing '${keyword}'`,
        isCustom: true,
      }

      setPendingPropFirms([...pendingPropFirms, newFirm])
    }
    setHasPendingChanges(true)
  }

  // Save pending changes to the actual state and localStorage
  const savePreferences = () => {
    setPropFirms([...pendingPropFirms])

    if (typeof window !== "undefined") {
      localStorage.setItem("propflow-selected-firms", JSON.stringify(pendingPropFirms))
    }

    setHasPendingChanges(false)
  }

  // Discard pending changes and revert to the current state
  const discardChanges = () => {
    setPendingPropFirms([...propFirms])
    setHasPendingChanges(false)
  }

  // Get only the selected prop firms from the current state (not pending)
  const getSelectedPropFirms = () => {
    return propFirms.filter((firm) => firm.isSelected)
  }

  // Check if a specific firm is selected in the current state (not pending)
  const isSelected = (id: string) => {
    return propFirms.find((firm) => firm.id === id)?.isSelected || false
  }

  return (
    <PropFirmContext.Provider
      value={{
        propFirms,
        pendingPropFirms,
        togglePropFirm,
        getSelectedPropFirms,
        isSelected,
        addCustomPropFirm,
        savePreferences,
        discardChanges,
        hasPendingChanges,
      }}
    >
      {children}
    </PropFirmContext.Provider>
  )
}

// Create a hook to use the context
export function usePropFirms() {
  const context = useContext(PropFirmContext)
  if (context === undefined) {
    throw new Error("usePropFirms must be used within a PropFirmProvider")
  }
  return context
}
