"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 300, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 201, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 254, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 270, fill: "var(--color-edge)" },
  { browser: "other", visitors: 260, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Faizan",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Tahir",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Kupe",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Liktha",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Akshy",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Progress</CardTitle>
        <CardDescription>Aug - Sept 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tahir is leading in <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total video progess of everyone
        </div>
      </CardFooter>
    </Card>
  )
}
