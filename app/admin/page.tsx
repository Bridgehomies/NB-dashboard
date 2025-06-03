"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react"
import { SalesChart } from "@/components/admin/sales-chart"
import { RecentOrders } from "@/components/admin/recent-orders"
import { TopProducts } from "@/components/admin/top-products"

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    conversionRate: "0.00",
    prev: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      conversionRate: "0.00",
    },
  });

  const calcDelta = (current: number, prev: number) => {
    if (!prev || prev === 0) return "N/A";
    const delta = ((current - prev) / prev) * 100;
    const isNegative = delta < 0;
    const sign = isNegative ? "" : "+";
    return `${sign}${delta.toFixed(1)}%`;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard-metrics")
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error("Failed to load metrics", err))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</h3>
                <p className="text-xs text-gray-400">{calcDelta(metrics.totalRevenue, metrics.prev.totalRevenue)} from last period</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{metrics.totalOrders}</h3>
                <p className="text-xs text-gray-400">{calcDelta(metrics.totalOrders, metrics.prev.totalOrders)} from last period</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <h3 className="text-2xl font-bold">{metrics.totalCustomers}</h3>
                <p className="text-xs text-gray-400">{calcDelta(metrics.totalCustomers, metrics.prev.totalCustomers)} from last period</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold">{metrics.conversionRate}%</h3>
                <p className="text-xs text-gray-400">{calcDelta(parseFloat(metrics.conversionRate), parseFloat(metrics.prev.conversionRate))} from last period</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>View your sales data for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>

      {/* Recent Orders and Top Products */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
