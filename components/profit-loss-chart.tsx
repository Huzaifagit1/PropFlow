"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Topstep",
    profit: 2300,
    loss: 0,
  },
  {
    name: "Apex",
    profit: 950,
    loss: 0,
  },
  {
    name: "Traidefy",
    profit: 550,
    loss: 0,
  },
  {
    name: "My Funded Futures",
    profit: 400,
    loss: 0,
  },
  {
    name: "Take Profit Trader",
    profit: 0,
    loss: 225,
  },
]

export function ProfitLossChart() {
  return (
    <ChartContainer
      className="h-full w-full"
      config={{
        data,
        margin: { top: 30, right: 30, left: 50, bottom: 30 },
        layout: "horizontal",
        xAxis: [
          {
            scaleType: "band",
            dataKey: "name",
            tickLine: false,
          },
        ],
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div className="flex flex-col gap-2">
                          {payload[0].value > 0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Profit
                              </span>
                              <span className="font-medium">${payload[0].value}</span>
                            </div>
                          )}
                          {payload[1].value > 0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                Loss
                              </span>
                              <span className="font-medium">${payload[1].value}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2 border-t pt-2">
                            <span className="text-sm font-medium text-muted-foreground">Net</span>
                            <span className="font-medium">${payload[0].value - payload[1].value}</span>
                          </div>
                        </div>
                      }
                      header={payload[0].payload.name}
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="loss" name="Loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
