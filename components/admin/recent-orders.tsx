// NB-dashboard/components/admin/recent-orders.tsx

"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye } from "lucide-react"

export function RecentOrders() {
  interface Order {
    _id: string;
    items: { name: string; quantity: number }[];
    shippingInfo?: { firstName: string; lastName: string };
    createdAt: string;
    status: string;
    total: number;
  }

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/recent-orders")
      .then(res => res.json())
      .then(setOrders)
      .catch(err => console.error("Failed to fetch recent orders", err))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium">{order._id.slice(-6)}</div>
                <div className="text-xs text-gray-500">{order.items.length} items</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm">{order.shippingInfo?.firstName} {order.shippingInfo?.lastName}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Badge className={`${getStatusColor(order.status)} capitalize`}>{order.status}</Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Update Status</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Contact Customer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
