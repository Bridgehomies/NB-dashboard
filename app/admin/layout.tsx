import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, BarChart2, Settings } from "lucide-react"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Admin Dashboard - NabeeraBaeera",
  description: "Admin dashboard for NabeeraBaeera e-commerce platform",
}

// This is a simple auth check - in a real app, you would use a proper auth system
function checkAuth() {
  // For demo purposes, we'll just return true
  // In a real app, you would check if the user is authenticated and has admin privileges
  return true
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const isAuthenticated = checkAuth()

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar navItems={navItems} />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </div>
  )
}
