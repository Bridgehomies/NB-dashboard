// "use client"

// import { useState } from "react"
// import { Search, Filter, Eye, MoreHorizontal, Truck, CheckCircle, XCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { OrderDetailsDialog } from "@/components/admin/order-details-dialog"

// // Sample orders data
// const ordersData = [
//   {
//     id: "ORD-7352",
//     customer: {
//       name: "John Smith",
//       email: "john.smith@example.com",
//       phone: "+1 (555) 123-4567",
//     },
//     date: "2025-05-12T14:30:00Z",
//     total: 129.99,
//     status: "processing",
//     items: [
//       { id: 1, name: "Crystal Pendant Necklace", price: 49.99, quantity: 1 },
//       { id: 2, name: "Wool Blend Overcoat", price: 79.99, quantity: 1 },
//     ],
//     shipping: {
//       address: "123 Main St, Apt 4B",
//       city: "New York",
//       state: "NY",
//       zip: "10001",
//       country: "United States",
//       method: "Standard Shipping",
//       tracking: "",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "1234",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7351",
//     customer: {
//       name: "Sarah Johnson",
//       email: "sarah.johnson@example.com",
//       phone: "+1 (555) 234-5678",
//     },
//     date: "2025-05-12T10:15:00Z",
//     total: 79.98,
//     status: "shipped",
//     items: [{ id: 4, name: "Pearl Drop Earrings", price: 39.99, quantity: 2 }],
//     shipping: {
//       address: "456 Oak Ave",
//       city: "Chicago",
//       state: "IL",
//       zip: "60601",
//       country: "United States",
//       method: "Express Shipping",
//       tracking: "USPS1234567890",
//     },
//     payment: {
//       method: "PayPal",
//       email: "sarah.johnson@example.com",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7350",
//     customer: {
//       name: "Michael Brown",
//       email: "michael.brown@example.com",
//       phone: "+1 (555) 345-6789",
//     },
//     date: "2025-05-11T16:45:00Z",
//     total: 199.95,
//     status: "delivered",
//     items: [
//       { id: 5, name: "Trench Coat", price: 149.99, quantity: 1 },
//       { id: 7, name: "Statement Bracelet", price: 29.99, quantity: 1 },
//       { id: 14, name: "Hoop Earrings", price: 19.97, quantity: 1 },
//     ],
//     shipping: {
//       address: "789 Pine St",
//       city: "Los Angeles",
//       state: "CA",
//       zip: "90001",
//       country: "United States",
//       method: "Standard Shipping",
//       tracking: "FEDEX9876543210",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "5678",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7349",
//     customer: {
//       name: "Emily Davis",
//       email: "emily.davis@example.com",
//       phone: "+1 (555) 456-7890",
//     },
//     date: "2025-05-11T09:20:00Z",
//     total: 59.99,
//     status: "processing",
//     items: [{ id: 9, name: "Gemstone Ring", price: 59.99, quantity: 1 }],
//     shipping: {
//       address: "321 Elm St",
//       city: "Houston",
//       state: "TX",
//       zip: "77001",
//       country: "United States",
//       method: "Standard Shipping",
//       tracking: "",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "9012",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7348",
//     customer: {
//       name: "Robert Wilson",
//       email: "robert.wilson@example.com",
//       phone: "+1 (555) 567-8901",
//     },
//     date: "2025-05-10T13:10:00Z",
//     total: 149.97,
//     status: "shipped",
//     items: [
//       { id: 3, name: "Kids Denim Jacket", price: 49.99, quantity: 1 },
//       { id: 6, name: "Kids Floral Dress", price: 34.99, quantity: 2 },
//       { id: 10, name: "Kids Striped Sweater", price: 29.99, quantity: 1 },
//     ],
//     shipping: {
//       address: "654 Maple Ave",
//       city: "Philadelphia",
//       state: "PA",
//       zip: "19019",
//       country: "United States",
//       method: "Express Shipping",
//       tracking: "DHL5678901234",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "3456",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7347",
//     customer: {
//       name: "Jennifer Martinez",
//       email: "jennifer.martinez@example.com",
//       phone: "+1 (555) 678-9012",
//     },
//     date: "2025-05-10T08:45:00Z",
//     total: 199.99,
//     status: "ready-to-ship",
//     items: [{ id: 11, name: "Leather Jacket", price: 199.99, quantity: 1 }],
//     shipping: {
//       address: "987 Cedar St",
//       city: "Phoenix",
//       state: "AZ",
//       zip: "85001",
//       country: "United States",
//       method: "Standard Shipping",
//       tracking: "",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "7890",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7346",
//     customer: {
//       name: "David Anderson",
//       email: "david.anderson@example.com",
//       phone: "+1 (555) 789-0123",
//     },
//     date: "2025-05-09T15:30:00Z",
//     total: 89.98,
//     status: "delivered",
//     items: [
//       { id: 12, name: "Layered Necklace Set", price: 59.99, quantity: 1 },
//       { id: 17, name: "Charm Bracelet", price: 29.99, quantity: 1 },
//     ],
//     shipping: {
//       address: "246 Birch St",
//       city: "San Francisco",
//       state: "CA",
//       zip: "94016",
//       country: "United States",
//       method: "Express Shipping",
//       tracking: "UPS2468013579",
//     },
//     payment: {
//       method: "PayPal",
//       email: "david.anderson@example.com",
//       status: "paid",
//     },
//   },
//   {
//     id: "ORD-7345",
//     customer: {
//       name: "Lisa Thomas",
//       email: "lisa.thomas@example.com",
//       phone: "+1 (555) 890-1234",
//     },
//     date: "2025-05-09T11:20:00Z",
//     total: 39.99,
//     status: "cancelled",
//     items: [{ id: 13, name: "Kids Raincoat", price: 39.99, quantity: 1 }],
//     shipping: {
//       address: "135 Walnut St",
//       city: "Seattle",
//       state: "WA",
//       zip: "98101",
//       country: "United States",
//       method: "Standard Shipping",
//       tracking: "",
//     },
//     payment: {
//       method: "Credit Card",
//       cardLast4: "2345",
//       status: "refunded",
//     },
//   },
// ]

// export default function OrdersPage() {
//   const [orders, setOrders] = useState(ordersData)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [dateFilter, setDateFilter] = useState("all")
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState<any>(null)
//   const [activeTab, setActiveTab] = useState("all")

//   // Filter orders based on search, status, and date
//   const filteredOrders = orders.filter((order) => {
//     // Search filter
//     if (
//       searchQuery &&
//       !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
//     ) {
//       return false
//     }

//     // Status filter
//     if (statusFilter !== "all" && order.status !== statusFilter) {
//       return false
//     }

//     // Date filter
//     if (dateFilter !== "all") {
//       const orderDate = new Date(order.date)
//       const today = new Date()
//       const yesterday = new Date(today)
//       yesterday.setDate(yesterday.getDate() - 1)
//       const lastWeek = new Date(today)
//       lastWeek.setDate(lastWeek.getDate() - 7)
//       const lastMonth = new Date(today)
//       lastMonth.setMonth(lastMonth.getMonth() - 1)

//       if (
//         (dateFilter === "today" && orderDate.toDateString() !== today.toDateString()) ||
//         (dateFilter === "yesterday" && orderDate.toDateString() !== yesterday.toDateString()) ||
//         (dateFilter === "last7days" && orderDate < lastWeek) ||
//         (dateFilter === "last30days" && orderDate < lastMonth)
//       ) {
//         return false
//       }
//     }

//     // Tab filter
//     if (activeTab === "processing" && order.status !== "processing") {
//       return false
//     }
//     if (activeTab === "ready-to-ship" && order.status !== "ready-to-ship") {
//       return false
//     }
//     if (activeTab === "shipped" && order.status !== "shipped") {
//       return false
//     }
//     if (activeTab === "delivered" && order.status !== "delivered") {
//       return false
//     }
//     if (activeTab === "cancelled" && order.status !== "cancelled") {
//       return false
//     }

//     return true
//   })

//   // View order details
//   const viewOrderDetails = (order: any) => {
//     setSelectedOrder(order)
//     setIsDetailsOpen(true)
//   }

//   // Update order status
//   const updateOrderStatus = (orderId: string, newStatus: string) => {
//     setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
//   }

//   // Get status badge color
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "processing":
//         return (
//           <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
//             Processing
//           </Badge>
//         )
//       case "ready-to-ship":
//         return (
//           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//             Ready to Ship
//           </Badge>
//         )
//       case "shipped":
//         return (
//           <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
//             Shipped
//           </Badge>
//         )
//       case "delivered":
//         return (
//           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//             Delivered
//           </Badge>
//         )
//       case "cancelled":
//         return (
//           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">Unknown</Badge>
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Orders</h1>
//           <p className="text-gray-500">Manage customer orders</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid grid-cols-6 mb-4">
//           <TabsTrigger value="all">All Orders</TabsTrigger>
//           <TabsTrigger value="processing">Processing</TabsTrigger>
//           <TabsTrigger value="ready-to-ship">Ready to Ship</TabsTrigger>
//           <TabsTrigger value="shipped">Shipped</TabsTrigger>
//           <TabsTrigger value="delivered">Delivered</TabsTrigger>
//           <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
//         </TabsList>

//         <TabsContent value={activeTab}>
//           {/* Filters */}
//           <Card className="mb-6">
//             <CardContent className="p-6">
//               <div className="grid gap-4 md:grid-cols-4">
//                 <div className="relative">
//                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     type="search"
//                     placeholder="Search orders..."
//                     className="pl-8"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Orders Table */}
//           <Card>
//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b bg-gray-50">
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Order ID
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Total
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredOrders.map((order) => (
//                       <tr key={order.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">{order.id}</div>
//                           <div className="text-xs text-gray-500">{order.items.length} items</div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
//                           <div className="text-xs text-gray-500">{order.customer.email}</div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</div>
//                           <div className="text-xs text-gray-500">{new Date(order.date).toLocaleTimeString()}</div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
//                         <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem onClick={() => viewOrderDetails(order)} className="cursor-pointer">
//                                 <Eye className="h-4 w-4 mr-2" />
//                                 View Details
//                               </DropdownMenuItem>
//                               {order.status === "processing" && (
//                                 <DropdownMenuItem
//                                   onClick={() => updateOrderStatus(order.id, "ready-to-ship")}
//                                   className="cursor-pointer"
//                                 >
//                                   <CheckCircle className="h-4 w-4 mr-2" />
//                                   Mark as Ready to Ship
//                                 </DropdownMenuItem>
//                               )}
//                               {order.status === "ready-to-ship" && (
//                                 <DropdownMenuItem
//                                   onClick={() => updateOrderStatus(order.id, "shipped")}
//                                   className="cursor-pointer"
//                                 >
//                                   <Truck className="h-4 w-4 mr-2" />
//                                   Mark as Shipped
//                                 </DropdownMenuItem>
//                               )}
//                               {order.status === "shipped" && (
//                                 <DropdownMenuItem
//                                   onClick={() => updateOrderStatus(order.id, "delivered")}
//                                   className="cursor-pointer"
//                                 >
//                                   <CheckCircle className="h-4 w-4 mr-2" />
//                                   Mark as Delivered
//                                 </DropdownMenuItem>
//                               )}
//                               {(order.status === "processing" || order.status === "ready-to-ship") && (
//                                 <DropdownMenuItem
//                                   onClick={() => updateOrderStatus(order.id, "cancelled")}
//                                   className="cursor-pointer text-red-600"
//                                 >
//                                   <XCircle className="h-4 w-4 mr-2" />
//                                   Cancel Order
//                                 </DropdownMenuItem>
//                               )}
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {filteredOrders.length === 0 && (
//                   <div className="text-center py-8">
//                     <p className="text-gray-500">No orders found</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Order Details Dialog */}
//       {selectedOrder && (
//         <OrderDetailsDialog
//           open={isDetailsOpen}
//           onClose={() => setIsDetailsOpen(false)}
//           order={selectedOrder}
//           onUpdateStatus={updateOrderStatus}
//         />
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)

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
          },
          payment: {
            method: order.paymentMethod || "",
            cardLast4: last4,
            status: order.paymentStatus || "pending",
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
        return <Badge className="bg-gray-100 text-gray-700">Pending</Badge>
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
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
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
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">Loading...</td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">No orders found.</td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="px-4 py-2">{order.id}</td>
                          <td className="px-4 py-2">{order.customer.name}</td>
                          <td className="px-4 py-2">{new Date(order.date).toLocaleString()}</td>
                          <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-2">{getStatusBadge(order.status)}</td>
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
    </div>
  )
}

