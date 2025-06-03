"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for customer acquisition
const generateCustomerData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate random customer data
    const newCustomers = Math.floor(Math.random() * 15) + 5
    const returningCustomers = Math.floor(Math.random() * 10) + 3

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      new: newCustomers,
      returning: returningCustomers,
    })
  }

  return data
}

export function CustomerAcquisitionChart() {
  const data = generateCustomerData()

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="new" name="New Customers" stroke="#FF6384" strokeWidth={2} />
          <Line type="monotone" dataKey="returning" name="Returning Customers" stroke="#36A2EB" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
