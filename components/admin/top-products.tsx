// NB-dashboard/components/admin/top-products.tsx

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export function TopProducts() {
  interface Product {
    _id: string;
    totalSold: number;
    totalRevenue: number;
  }

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/top-products")
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error("Failed to fetch top products", err))
  }, [])

  const maxSold = Math.max(...products.map(p => p.totalSold || 0))

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md border">
            <Image src="/placeholder.svg" alt={product._id} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product._id}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>${product.totalRevenue.toFixed(2)}</span>
              <span>{product.totalSold} sold</span>
            </div>
            <Progress className="h-1.5 mt-2" value={(product.totalSold / maxSold) * 100} />
          </div>
        </div>
      ))}
    </div>
  )
}
