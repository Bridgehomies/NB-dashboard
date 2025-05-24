// "use client"

// import type React from "react"

// import { useState } from "react"
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

// interface AddProductDialogProps {
//   open: boolean
//   onClose: () => void
//   onAdd: (product: any) => void
// }

// export function AddProductDialog({ open, onClose, onAdd }: AddProductDialogProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     image: "/placeholder.svg?height=400&width=300", // Default placeholder
//     inStock: true,
//     dateAdded: new Date().toISOString().split("T")[0],
//     rating: 0,
//     reviews: 0,
//   })

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
//     const numericPrice = Number.parseFloat(formData.price)

//     if (isNaN(numericPrice)) {
//       alert("Please enter a valid price")
//       return
//     }

//     onAdd({
//       ...formData,
//       price: numericPrice,
//       rating: Number.parseFloat(formData.rating.toString()) || 0,
//       reviews: Number.parseInt(formData.reviews.toString()) || 0,
//     })

//     // Reset form
//     setFormData({
//       name: "",
//       price: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       image: "/placeholder.svg?height=400&width=300",
//       inStock: true,
//       dateAdded: new Date().toISOString().split("T")[0],
//       rating: 0,
//       reviews: 0,
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <form onSubmit={handleSubmit}>
//           <DialogHeader>
//             <DialogTitle>Add New Product</DialogTitle>
//             <DialogDescription>Add a new product to your inventory. Click save when you're done.</DialogDescription>
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
//                 <Input id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
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
//                 <Input id="dateAdded" name="dateAdded" type="date" value={formData.dateAdded} onChange={handleChange} />
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
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">Add Product</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onProductAdded?: () => void;
}

export function AddProductDialog({
  open,
  onClose,
  onProductAdded,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    inStock: true,
    dateAdded: new Date().toISOString().split("T")[0],
    rating: 0,
    reviews: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericPrice = Number.parseFloat(formData.price);
    if (isNaN(numericPrice)) {
      alert("Please enter a valid price");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", numericPrice.toString());
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("description", formData.description);
    data.append("inStock", String(formData.inStock));
    data.append("dateAdded", formData.dateAdded);
    data.append("rating", String(formData.rating));
    data.append("reviews", String(formData.reviews));
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      alert("Product added successfully!");

      if (onProductAdded) {
        onProductAdded();
      }

      setFormData({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        inStock: true,
        dateAdded: new Date().toISOString().split("T")[0],
        rating: 0,
        reviews: 0,
      });
      setImageFile(null);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="mens-coats">Men's Coats</SelectItem>
                    <SelectItem value="kids-clothing">Kids Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateAdded">Date Added</Label>
                <Input
                  id="dateAdded"
                  name="dateAdded"
                  type="date"
                  value={formData.dateAdded}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("inStock", checked)
                  }
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
