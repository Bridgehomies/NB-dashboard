// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"

// interface EditProductDialogProps {
//   open: boolean
//   onClose: () => void
//   product: any
//   onSave: (product: any) => void
// }

// export function EditProductDialog({ open, onClose, product, onSave }: EditProductDialogProps) {
//   const [formData, setFormData] = useState({ ...product })

//   // Update form data when product changes
//   useEffect(() => {
//     setFormData({ ...product })
//   }, [product])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSwitchChange = (name: string, checked: boolean) => {
//     setFormData({ ...formData, [name]: checked })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Convert price to number
//     const numericPrice = Number.parseFloat(formData.price.toString())
//     const numericSalePrice = formData.salePrice ? Number.parseFloat(formData.salePrice.toString()) : undefined

//     if (isNaN(numericPrice)) {
//       alert("Please enter a valid price")
//       return
//     }

//     if (numericSalePrice !== undefined && isNaN(numericSalePrice)) {
//       alert("Please enter a valid sale price")
//       return
//     }

//     // Calculate discount if sale price exists
//     const discount = numericSalePrice ? Math.round(((numericPrice - numericSalePrice) / numericPrice) * 100) : undefined

//     onSave({
//       ...formData,
//       price: numericPrice,
//       salePrice: numericSalePrice,
//       discount,
//       isSale: numericSalePrice !== undefined,
//       rating: Number.parseFloat(formData.rating.toString()) || 0,
//       reviews: Number.parseInt(formData.reviews.toString()) || 0,
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <form onSubmit={handleSubmit}>
//           <DialogHeader>
//             <DialogTitle>Edit Product</DialogTitle>
//             <DialogDescription>Make changes to the product. Click save when you're done.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Product Name</Label>
//                 <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="price">Price</Label>
//                 <Input
//                   id="price"
//                   name="price"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="category">Category</Label>
//                 <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                   <SelectTrigger id="category">
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="jewelry">Jewelry</SelectItem>
//                     <SelectItem value="mens-coats">Men's Coats</SelectItem>
//                     <SelectItem value="kids-clothing">Kids Clothing</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="subcategory">Subcategory</Label>
//                 <Input id="subcategory" name="subcategory" value={formData.subcategory || ""} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description || ""}
//                 onChange={handleChange}
//                 rows={3}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="image">Image URL</Label>
//               <Input id="image" name="image" value={formData.image} onChange={handleChange} />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="dateAdded">Date Added</Label>
//                 <Input
//                   id="dateAdded"
//                   name="dateAdded"
//                   type="date"
//                   value={formData.dateAdded.split("T")[0]}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="flex items-center space-x-2 pt-6">
//                 <Switch
//                   id="inStock"
//                   checked={formData.inStock}
//                   onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
//                 />
//                 <Label htmlFor="inStock">In Stock</Label>
//               </div>
//             </div>

//             {formData.isSale && (
//               <div className="space-y-2">
//                 <Label htmlFor="salePrice">Sale Price</Label>
//                 <Input
//                   id="salePrice"
//                   name="salePrice"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.salePrice}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">Save Changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import React, { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface EditProductDialogProps {
  open: boolean
  onClose: () => void
  product: any
  onSave: (product: any) => void
}

export function EditProductDialog({
  open,
  onClose,
  product,
  onSave,
}: EditProductDialogProps) {
  const [formData, setFormData] = useState({ ...product })

  useEffect(() => {
    if (product) {
      setFormData({ ...product })
    }
  }, [product])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product details below</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="mens-coats">Men's Coats</SelectItem>
                <SelectItem value="kids-clothing">Kids Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>In Stock</Label>
            <Switch
              checked={formData.inStock || false}
              onCheckedChange={(value) => handleSwitchChange("inStock", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>New Arrival</Label>
            <Switch
              checked={formData.isNew || false}
              onCheckedChange={(value) => handleSwitchChange("isNew", value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
