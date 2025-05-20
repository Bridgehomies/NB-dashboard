"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the last 30 days
const generateSalesData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate random sales data
    const revenue = Math.floor(Math.random() * 1000) + 500
    const orders = Math.floor(Math.random() * 20) + 5

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue,
      orders,
    })
  }

  return data
}

// Sample data for the last 12 months
const generateMonthlySalesData = () => {
  const data = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)

    // Generate random sales data
    const revenue = Math.floor(Math.random() * 20000) + 10000
    const orders = Math.floor(Math.random() * 200) + 100

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short" }),
      revenue,
      orders,
    })
  }

  return data
}

export function SalesChart() {
  const [timeRange, setTimeRange] = useState("30days")
  const [dataType, setDataType] = useState("revenue")

  // Choose data based on selected time range
  const chartData = timeRange === "30days" ? generateSalesData() : generateMonthlySalesData()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === "30days" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30days")}
          >
            Last 30 Days
          </Button>
          <Button
            variant={timeRange === "12months" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("12months")}
          >
            Last 12 Months
          </Button>
        </div>

        <Select value={dataType} onValueChange={setDataType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="orders">Orders</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip formatter={(value) => (dataType === "revenue" ? `$${value}` : value)} />
            <Legend />
            {dataType === "revenue" ? (
              <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            ) : (
              <Bar dataKey="orders" name="Orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
