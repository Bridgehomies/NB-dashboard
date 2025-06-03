"use client"

import { useState, useEffect } from "react"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

interface Notification {
  type: "order" | "review"
  message: string
  timestamp: string
}

export function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const router = useRouter()
  const { logout } = useAuth()

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [ordersRes, reviewsRes] = await Promise.all([
          fetch("http://localhost:5000/api/orders"),
          fetch("http://localhost:5000/api/reviews"), // example endpoint
        ])

        const orders = await ordersRes.json()
        const reviews = await reviewsRes.json()

        const newNotifications: Notification[] = []

        if (Array.isArray(orders)) {
          orders.slice(0, 3).forEach((order) => {
            newNotifications.push({
              type: "order",
              message: `New Order #${order._id}`,
              timestamp: new Date(order.createdAt).toLocaleTimeString(),
            })
          })
        }

        if (Array.isArray(reviews)) {
          reviews.slice(0, 3).forEach((review) => {
            newNotifications.push({
              type: "review",
              message: `New Review: ${review.productName}`,
              timestamp: new Date(review.createdAt).toLocaleTimeString(),
            })
          })
        }

        setNotifications(newNotifications)
      } catch (err) {
        console.error("Failed to fetch notifications", err)
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center py-2 text-sm text-gray-500">No new notifications</p>
              ) : (
                notifications.map((notif, idx) => (
                  <DropdownMenuItem key={idx} className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">{notif.message}</span>
                      <span className="text-sm text-gray-500">{notif.timestamp}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout()
                router.push("/sign-in")
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
