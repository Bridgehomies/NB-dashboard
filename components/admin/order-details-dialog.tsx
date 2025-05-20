"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Truck, XCircle } from "lucide-react"

interface OrderDetailsDialogProps {
  open: boolean
  onClose: () => void
  order: any
  onUpdateStatus: (orderId: string, status: string) => void
}

export function OrderDetailsDialog({ open, onClose, order, onUpdateStatus }: OrderDetailsDialogProps) {
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Processing
          </Badge>
        )
      case "ready-to-ship":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Ready to Ship
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order {order.id}</span>
            {getStatusBadge(order.status)}
          </DialogTitle>
          <DialogDescription>Placed on {new Date(order.date).toLocaleString()}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-4">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">ID: {item.id}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <div className="text-sm">${item.price.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <div className="text-sm">{item.quantity}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr className="border-t">
                    <td colSpan={3} className="px-4 py-2 text-right font-medium">
                      Total
                    </td>
                    <td className="px-4 py-2 text-right font-bold">${order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Payment Information</h3>
              <div className="text-sm">
                <p>Method: {order.payment.method}</p>
                {order.payment.cardLast4 && <p>Card: **** **** **** {order.payment.cardLast4}</p>}
                {order.payment.email && <p>PayPal: {order.payment.email}</p>}
                <p>
                  Status: <span className="capitalize">{order.payment.status}</span>
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customer" className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Customer Information</h3>
              <div className="text-sm">
                <p>Name: {order.customer.name}</p>
                <p>Email: {order.customer.email}</p>
                <p>Phone: {order.customer.phone}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm">
                <p>{order.shipping.address}</p>
                <p>
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </p>
                <p>{order.shipping.country}</p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Shipping Method</h3>
              <div className="text-sm">
                <p>{order.shipping.method}</p>
                {order.shipping.tracking && (
                  <p>
                    Tracking Number: <span className="font-medium">{order.shipping.tracking}</span>
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <div>
            {order.status === "processing" && (
              <Button
                variant="outline"
                onClick={() => {
                  onUpdateStatus(order.id, "ready-to-ship")
                  onClose()
                }}
                className="mr-2"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Ready to Ship
              </Button>
            )}
            {order.status === "ready-to-ship" && (
              <Button
                variant="outline"
                onClick={() => {
                  onUpdateStatus(order.id, "shipped")
                  onClose()
                }}
                className="mr-2"
              >
                <Truck className="h-4 w-4 mr-2" />
                Mark as Shipped
              </Button>
            )}
            {order.status === "shipped" && (
              <Button
                variant="outline"
                onClick={() => {
                  onUpdateStatus(order.id, "delivered")
                  onClose()
                }}
                className="mr-2"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
            )}
            {(order.status === "processing" || order.status === "ready-to-ship") && (
              <Button
                variant="destructive"
                onClick={() => {
                  onUpdateStatus(order.id, "cancelled")
                  onClose()
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
