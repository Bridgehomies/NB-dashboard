"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

interface AdminSidebarProps {
  navItems: NavItem[]
}

export function AdminSidebar({ navItems }: AdminSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <Link href="/admin" className="flex items-center">
          {collapsed ? (
            <span className="font-bold text-xl">NB</span>
          ) : (
            <span className="font-bold text-xl">NabeeraBaeera</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
                  pathname === item.href && "bg-primary text-white hover:bg-primary-hover",
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
