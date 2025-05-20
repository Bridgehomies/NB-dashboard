"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tag } from "lucide-react"

interface SaleProductDialogProps {
  open: boolean
  onClose: () => void
  product: any
  onSave: (salePrice: number) => void
}

export function SaleProductDialog({ open, onClose, product, onSave }: SaleProductDialogProps) {
  const [salePrice, setSalePrice] = useState("")
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    if (product) {
      // If product already has a sale price, use it
      setSalePrice(product.salePrice ? product.salePrice.toString() : "")

      // Calculate initial discount
      const price = Number.parseFloat(product.price)
      const sale = Number.parseFloat(salePrice)
      if (!isNaN(price) && !isNaN(sale) && price > 0) {
        setDiscount(Math.round(((price - sale) / price) * 100))
      } else {
        setDiscount(0)
      }
    }
  }, [product, open, salePrice])

  const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSalePrice = e.target.value
    setSalePrice(newSalePrice)

    // Calculate discount
    const price = Number.parseFloat(product.price)
    const sale = Number.parseFloat(newSalePrice)
    if (!isNaN(price) && !isNaN(sale) && price > 0) {
      setDiscount(Math.round(((price - sale) / price) * 100))
    } else {
      setDiscount(0)
    }
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiscount = Number.parseInt(e.target.value)
    setDiscount(isNaN(newDiscount) ? 0 : newDiscount)

    // Calculate sale price based on discount
    const price = Number.parseFloat(product.price)
    if (!isNaN(price) && price > 0) {
      const newSalePrice = price * (1 - newDiscount / 100)
      setSalePrice(newSalePrice.toFixed(2))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const salePriceNum = Number.parseFloat(salePrice)
    if (isNaN(salePriceNum) || salePriceNum <= 0) {
      alert("Please enter a valid sale price")
      return
    }

    if (salePriceNum >= product.price) {
      alert("Sale price must be less than regular price")
      return
    }

    onSave(salePriceNum)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-accent" />
              Add Product to Sale
            </DialogTitle>
            <DialogDescription>
              Set a sale price for "{product?.name}". The regular price is ${product?.price.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price ($)</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                min="0.01"
                max={product?.price - 0.01}
                value={salePrice}
                onChange={handleSalePriceChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="1"
                max="99"
                value={discount}
                onChange={handleDiscountChange}
                required
              />
            </div>
            <div className="pt-2">
              <div className="text-sm font-medium">Summary:</div>
              <div className="text-sm text-gray-500">
                Regular Price: ${product?.price.toFixed(2)}
                <br />
                Sale Price: ${salePrice || "0.00"}
                <br />
                Discount: {discount}%
                <br />
                Savings: ${(product?.price - Number.parseFloat(salePrice || "0")).toFixed(2)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent-hover">
              Add to Sale
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
