// Path: NB-dashboard/app/admin/orders/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Search, Eye, MoreHorizontal, Truck, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/orders")
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()

      const formattedOrders = data.map((order: any) => {
        const cardNumber = order.cardDetails?.number || ""
        const last4 = cardNumber.slice(-4)

        return {
          id: order._id || order.id,
          customer: {
            name: `${order.shippingInfo?.firstName || ""} ${order.shippingInfo?.lastName || ""}`.trim(),
            email: order.shippingInfo?.email || "N/A",
            phone: order.shippingInfo?.phone || "N/A",
          },
          date: order.createdAt,
          total: order.total,
          status: order.status,
          items: order.items,
          shipping: {
            address: order.shippingInfo?.address || "",
            city: order.shippingInfo?.city || "",
            country: order.shippingInfo?.country || "",
            postalCode: order.shippingInfo?.postalCode || "",
          },
          payment: {
            method: order.paymentMethod || "",
            cardLast4: last4,
            status: order.paymentStatus || "paid",
            nameOnCard: order.cardDetails?.nameOnCard || "",
          },
        }
      })

      setOrders(formattedOrders)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Define valid statuses to match backend
      const validStatuses = ["pending", "processing", "ready-to-ship", "shipped", "delivered", "cancelled"];
      
      // Normalize and validate status
      const normalizedStatus = newStatus.toLowerCase();
      console.log(`Attempting to update order ${orderId} to status: ${normalizedStatus}`);
      if (!validStatuses.includes(normalizedStatus)) {
        console.error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(", ")}`);
        throw new Error(`Invalid status: ${newStatus}`);
      }
  
      const payload = { status: normalizedStatus };
      console.log("Request payload:", JSON.stringify(payload));
  
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // Handle non-JSON responses
        console.error("API Error:", res.status, res.statusText, errorData);
        throw new Error(errorData.error || `Failed to update order status: ${res.statusText}`);
      }
  
      const updatedOrder = await res.json();
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: normalizedStatus } : order
      ));
  
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: normalizedStatus });
      }
  
      console.log(`Order ${orderId} status updated to ${normalizedStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      if (error instanceof Error) {
        alert(`Failed to update order status: ${error.message}`);
      } else {
        alert("Failed to update order status: An unknown error occurred.");
      }
    }
  };

  // View order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const filteredOrders = orders.filter((order) => {
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) return false

    if (statusFilter !== "all" && order.status !== statusFilter) return false

    if (dateFilter !== "all") {
      const orderDate = new Date(order.date)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const lastWeek = new Date(today)
      lastWeek.setDate(lastWeek.getDate() - 7)
      const lastMonth = new Date(today)
      lastMonth.setMonth(lastMonth.getMonth() - 1)

      if (
        (dateFilter === "today" && orderDate.toDateString() !== today.toDateString()) ||
        (dateFilter === "yesterday" && orderDate.toDateString() !== yesterday.toDateString()) ||
        (dateFilter === "last7days" && orderDate < lastWeek) ||
        (dateFilter === "last30days" && orderDate < lastMonth)
      ) return false
    }

    if (activeTab !== "all" && order.status !== activeTab) return false

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-100 text-gray-700">Pending</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>
      case "ready-to-ship":
        return <Badge className="bg-blue-100 text-blue-700">Ready to Ship</Badge>
      case "shipped":
        return <Badge className="bg-indigo-100 text-indigo-700">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-700">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage customer orders</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="ready-to-ship">Ready to Ship</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8">Loading...</td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8">No orders found.</td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                            <div className="text-xs text-gray-500">{order.items?.length || 0} items</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                            <div className="text-xs text-gray-500">{order.customer.email}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{new Date(order.date).toLocaleTimeString()}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">${order.total?.toFixed(2)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewOrderDetails(order)} className="cursor-pointer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                {(order.status === "pending" || order.status === "processing") && (
                                  <DropdownMenuItem
                                    onClick={() => updateOrderStatus(order.id, order.status === "pending" ? "processing" : "ready-to-ship")}
                                    className="cursor-pointer"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {order.status === "pending" ? "Mark as Processing" : "Mark as Ready to Ship"}
                                  </DropdownMenuItem>
                                )}
                                {order.status === "ready-to-ship" && (
                                  <DropdownMenuItem
                                    onClick={() => updateOrderStatus(order.id, "shipped")}
                                    className="cursor-pointer"
                                  >
                                    <Truck className="h-4 w-4 mr-2" />
                                    Mark as Shipped
                                  </DropdownMenuItem>
                                )}
                                {order.status === "shipped" && (
                                  <DropdownMenuItem
                                    onClick={() => updateOrderStatus(order.id, "delivered")}
                                    className="cursor-pointer"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Delivered
                                  </DropdownMenuItem>
                                )}
                                {(order.status === "pending" || order.status === "processing" || order.status === "ready-to-ship") && (
                                  <DropdownMenuItem
                                    onClick={() => updateOrderStatus(order.id, "cancelled")}
                                    className="cursor-pointer text-red-600"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Order Status</h3>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Address:</span> {selectedOrder.shipping.address}</p>
                  <p><span className="font-medium">City:</span> {selectedOrder.shipping.city}</p>
                  <p><span className="font-medium">Postal Code:</span> {selectedOrder.shipping.postalCode}</p>
                  <p><span className="font-medium">Country:</span> {selectedOrder.shipping.country}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Method:</span> {selectedOrder.payment.method}</p>
                  <p><span className="font-medium">Card Last 4:</span> ****{selectedOrder.payment.cardLast4}</p>
                  <p><span className="font-medium">Cardholder:</span> {selectedOrder.payment.nameOnCard}</p>
                  <p><span className="font-medium">Status:</span> {selectedOrder.payment.status}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${selectedOrder.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                {selectedOrder.status === "pending" && (
                  <Button onClick={() => updateOrderStatus(selectedOrder.id, "processing")}>
                    Mark as Processing
                  </Button>
                )}
                {selectedOrder.status === "processing" && (
                  <Button onClick={() => updateOrderStatus(selectedOrder.id, "ready-to-ship")}>
                    Mark as Ready to Ship
                  </Button>
                )}
                {selectedOrder.status === "ready-to-ship" && (
                  <Button onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}>
                    Mark as Shipped
                  </Button>
                )}
                {selectedOrder.status === "shipped" && (
                  <Button onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}>
                    Mark as Delivered
                  </Button>
                )}
                {(selectedOrder.status === "pending" || selectedOrder.status === "processing" || selectedOrder.status === "ready-to-ship") && (
                  <Button variant="destructive" onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}>
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}