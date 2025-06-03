"use client"

import { useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

// Sample top selling products data
const topSellingProductsData = [
  {
    id: 1,
    name: "Crystal Pendant Necklace",
    image: "/placeholder.svg?height=400&width=300",
    category: "Jewelry",
    sold: 42,
    revenue: 2099.58,
  },
  {
    id: 5,
    name: "Trench Coat",
    image: "/placeholder.svg?height=400&width=300",
    category: "Coats",
    sold: 37,
    revenue: 3699.63,
  },
  {
    id: 8,
    name: "Puffer Jacket",
    image: "/placeholder.svg?height=400&width=300",
    category: "Coats",
    sold: 31,
    revenue: 2479.69,
  },
  {
    id: 2,
    name: "Wool Blend Overcoat",
    image: "/placeholder.svg?height=400&width=300",
    category: "Coats",
    sold: 28,
    revenue: 2519.72,
  },
  {
    id: 12,
    name: "Layered Necklace Set",
    image: "/placeholder.svg?height=400&width=300",
    category: "Jewelry",
    sold: 26,
    revenue: 1039.74,
  },
]

export function TopSellingProductsTable() {
  const [products] = useState(topSellingProductsData)
  const maxSold = Math.max(...products.map((product) => product.sold))

  return (
    <div className="space-y-4">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2 text-right">Sold</th>
            <th className="px-4 py-2 text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="text-sm text-gray-900">{product.category}</div>
              </td>
              <td className="px-4 py-2 text-right">
                <div className="text-sm font-medium">{product.sold}</div>
                <Progress className="h-1.5 mt-1" value={(product.sold / maxSold) * 100} />
              </td>
              <td className="px-4 py-2 text-right">
                <div className="text-sm font-medium">${product.revenue.toFixed(2)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
