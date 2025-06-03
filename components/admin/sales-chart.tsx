"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SalesChart() {
  const [timeRange, setTimeRange] = useState("7days")
  const [dataType, setDataType] = useState("revenue")
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const endpoint = `http://localhost:5000/api/sales-chart?range=${timeRange}`

    fetch(endpoint)
      .then(res => res.json())
      .then(setChartData)
      .catch(err => console.error("Failed to fetch chart data:", err))
  }, [timeRange])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Time range buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === "7days" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7days")}
          >
            Last 7 Days
          </Button>
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

        {/* Data type selector */}
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

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              formatter={value =>
                dataType === "revenue" ? `$${value}` : `${value} order(s)`
              }
            />
            <Legend />
            {dataType === "revenue" ? (
              <Bar
                dataKey="totalRevenue"
                name="Revenue"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            ) : (
              <Bar
                dataKey="totalOrders"
                name="Orders"
                fill="hsl(var(--accent))"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
