import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react"
import { SalesChart } from "@/components/admin/sales-chart"
import { RecentOrders } from "@/components/admin/recent-orders"
import { TopProducts } from "@/components/admin/top-products"

export default function AdminDashboard() {
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
                <h3 className="text-2xl font-bold">$24,780</h3>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5% from last month
                </p>
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
                <h3 className="text-2xl font-bold">384</h3>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.2% from last month
                </p>
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
                <h3 className="text-2xl font-bold">1,284</h3>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.3% from last month
                </p>
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
                <h3 className="text-2xl font-bold">3.2%</h3>
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                  -0.4% from last month
                </p>
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
