"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", profit: 850 },
  { month: "Feb", profit: 1200 },
  { month: "Mar", profit: 950 },
  { month: "Apr", profit: 1500 },
  { month: "May", profit: 1100 },
  { month: "Jun", profit: 1800 },
  { month: "Jul", profit: 1400 },
  { month: "Aug", profit: 2100 },
  { month: "Sep", profit: 1700 },
  { month: "Oct", profit: 2300 },
  { month: "Nov", profit: 1900 },
  { month: "Dec", profit: 2500 },
]

export function MonthlyPerformanceChart() {
  return (
    <ChartContainer
      className="h-full w-full"
      config={{
        data,
        margin: { top: 30, right: 30, left: 50, bottom: 30 },
        layout: "horizontal",
        xAxis: [
          {
            scaleType: "point",
            dataKey: "month",
            tickLine: false,
          },
        ],
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
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
                              Net Profit
                            </span>
                            <span className="font-medium text-emerald-600">${payload[0].value}</span>
                          </div>
                        </div>
                      }
                      header={`${payload[0].payload.month} 2023`}
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
