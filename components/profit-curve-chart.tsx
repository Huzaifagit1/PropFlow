"use client"

import { useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Transaction {
  date: string
  firmId: string
  firm: string
  category: string
  amount: number
  notes: string
}

interface ProfitCurveChartProps {
  data?: Transaction[]
}

export function ProfitCurveChart({ data = [] }: ProfitCurveChartProps) {
  // Process the transaction data to create a cumulative profit curve
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    // Sort transactions by date
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Create cumulative data points
    let cumulativeNet = 0

    return sortedData.map((transaction) => {
      cumulativeNet += transaction.amount

      return {
        date: transaction.date,
        net: cumulativeNet,
        // Include the transaction details for the tooltip
        firm: transaction.firm,
        amount: transaction.amount,
        category: transaction.category,
        notes: transaction.notes,
      }
    })
  }, [data])

  // Determine if the final net value is positive or negative
  const isNetPositive = useMemo(() => {
    if (chartData.length === 0) return true
    return chartData[chartData.length - 1].net >= 0
  }, [chartData])

  // If no data is provided or the data array is empty, show a message
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[300px] w-full flex-col items-center justify-center text-center">
        <p className="text-lg font-medium">No data to display</p>
        <p className="text-sm text-muted-foreground">Select prop firms in settings to see your data</p>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Format date to show only month and day
              const date = new Date(value)
              return `${date.getMonth() + 1}/${date.getDate()}`
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
            domain={["auto", "auto"]}
          />
          <Tooltip
            content={(props) => {
              const { active, payload } = props
              if (active && payload && payload.length) {
                const data = payload[0].payload
                const netValue = data.net
                const isPositive = data.amount >= 0

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="mb-1 font-medium">{new Date(data.date).toLocaleDateString()}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Net Profit/Loss:</span>
                        <span className={netValue >= 0 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                          ${netValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Firm:</span>
                        <span className="font-medium">{data.firm}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Transaction:</span>
                        <span className={isPositive ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                          {isPositive ? "+" : ""}${Math.abs(data.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{data.category}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="net"
            stroke={isNetPositive ? "#10b981" : "#ef4444"}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: isNetPositive ? "#10b981" : "#ef4444",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            activeDot={{
              r: 6,
              fill: isNetPositive ? "#10b981" : "#ef4444",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
