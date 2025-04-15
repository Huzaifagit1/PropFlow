"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Subscriptions", value: 2500, color: "#10b981" },
  { name: "Account Resets", value: 800, color: "#3b82f6" },
  { name: "Account Upgrades", value: 650, color: "#8b5cf6" },
  { name: "Platform Fees", value: 400, color: "#f97316" },
  { name: "Other", value: 200, color: "#6b7280" },
]

export function SpendingBreakdownChart() {
  return (
    <ChartContainer
      className="h-full w-full"
      config={{
        data,
        margin: { top: 0, right: 0, left: 0, bottom: 0 },
      }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltip>
                        <ChartTooltipContent
                          content={
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                  <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: payload[0].payload.color }}
                                  />
                                  Amount
                                </span>
                                <span className="font-medium">${payload[0].value}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium text-muted-foreground">% of Total</span>
                                <span className="font-medium">{((payload[0].value / 4550) * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          }
                          header={payload[0].name}
                        />
                      </ChartTooltip>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Spending Breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Your total spending of $4,550 is distributed across the following categories:
            </p>
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${item.value}</span>
                    <span className="text-xs text-muted-foreground">({((item.value / 4550) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}
