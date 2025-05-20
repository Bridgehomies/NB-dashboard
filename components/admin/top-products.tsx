"use client"

import { useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

// Sample top products data
const topProductsData = [
  {
    id: 1,
    name: "Crystal Pendant Necklace",
    image: "/placeholder.svg?height=400&width=300",
    sold: 42,
    revenue: 2099.58,
    stock: 18,
  },
  {
    id: 5,
    name: "Trench Coat",
    image: "/placeholder.svg?height=400&width=300",
    sold: 37,
    revenue: 3699.63,
    stock: 12,
  },
  {
    id: 8,
    name: "Puffer Jacket",
    image: "/placeholder.svg?height=400&width=300",
    sold: 31,
    revenue: 2479.69,
    stock: 15,
  },
  {
    id: 2,
    name: "Wool Blend Overcoat",
    image: "/placeholder.svg?height=400&width=300",
    sold: 28,
    revenue: 2519.72,
    stock: 9,
  },
  {
    id: 12,
    name: "Layered Necklace Set",
    image: "/placeholder.svg?height=400&width=300",
    sold: 26,
    revenue: 1039.74,
    stock: 22,
  },
]

export function TopProducts() {
  const [products] = useState(topProductsData)
  const maxSold = Math.max(...products.map((product) => product.sold))

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center space-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.name}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>${product.revenue.toFixed(2)}</span>
              <span>{product.sold} sold</span>
              <span>{product.stock} in stock</span>
            </div>
            <Progress className="h-1.5 mt-2" value={(product.sold / maxSold) * 100} />
          </div>
        </div>
      ))}
    </div>
  )
}
