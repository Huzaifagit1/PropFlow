"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface FirmData {
  id: string
  name: string
  spent: number
  received: number
}

interface DashboardChartProps {
  data?: FirmData[]
}

// Default data if none is provided
const defaultData = [
  {
    id: "topstep",
    name: "Topstep",
    spent: 1200,
    received: 3500,
  },
  {
    id: "apex",
    name: "Apex",
    spent: 1800,
    received: 2750,
  },
  {
    id: "traidefy",
    name: "Traidefy",
    spent: 950,
    received: 1500,
  },
  {
    id: "mff",
    name: "My Funded Futures",
    spent: 600,
    received: 1000,
  },
  {
    id: "tpt",
    name: "Take Profit Trader",
    spent: 800,
    received: 0,
  },
]

export function DashboardChart({ data = defaultData }: DashboardChartProps) {
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
    <ChartContainer
      className="h-[300px] w-full"
      config={{
        data,
        margin: { top: 5, right: 5, left: 5, bottom: 5 },
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
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}`} />
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
                              <span className="h-2 w-2 rounded-full bg-red-500" />
                              Spent
                            </span>
                            <span className="font-medium">${payload[0].value}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Received
                            </span>  
                            <span className="font-medium">${payload[1].value}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 border-t pt-2">
                            <span className="text-sm font-medium text-muted-foreground">Net</span>
                            <span className="font-medium">${payload[1].value - payload[0].value}</span>
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
          <Legend />
          <Bar dataKey="spent" name="Spent" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="received" name="Received" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
