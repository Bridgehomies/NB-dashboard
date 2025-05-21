// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Plus, Search, MoreHorizontal, Edit, Trash, Tag } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { processedProducts, updateProduct, addProduct, deleteProduct, toggleProductSale } from "@/lib/data/products"
// import { AddProductDialog } from "@/components/admin/add-product-dialog"
// import { EditProductDialog } from "@/components/admin/edit-product-dialog"
// import { DeleteProductDialog } from "@/components/admin/delete-product-dialog"
// import { SaleProductDialog } from "@/components/admin/sale-product-dialog"

// export default function ProductsPage() {
//   const [products, setProducts] = useState(processedProducts)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [sortBy, setSortBy] = useState("newest")
//   const [isAddProductOpen, setIsAddProductOpen] = useState(false)
//   const [isEditProductOpen, setIsEditProductOpen] = useState(false)
//   const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false)
//   const [isSaleProductOpen, setIsSaleProductOpen] = useState(false)
//   const [selectedProduct, setSelectedProduct] = useState<any>(null)

//   // Filter and sort products
//   const filteredProducts = products
//     .filter((product) => {
//       // Search filter
//       if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
//         return false
//       }

//       // Category filter
//       if (categoryFilter !== "all" && product.category !== categoryFilter) {
//         return false
//       }

//       // Status filter
//       if (statusFilter === "inStock" && !product.inStock) {
//         return false
//       }
//       if (statusFilter === "outOfStock" && product.inStock) {
//         return false
//       }
//       if (statusFilter === "onSale" && !product.isSale) {
//         return false
//       }
//       if (statusFilter === "new" && !product.isNew) {
//         return false
//       }

//       return true
//     })
//     .sort((a, b) => {
//       // Sort products
//       if (sortBy === "newest") {
//         return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
//       }
//       if (sortBy === "oldest") {
//         return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
//       }
//       if (sortBy === "priceHigh") {
//         return b.price - a.price
//       }
//       if (sortBy === "priceLow") {
//         return a.price - b.price
//       }
//       if (sortBy === "nameAZ") {
//         return a.name.localeCompare(b.name)
//       }
//       if (sortBy === "nameZA") {
//         return b.name.localeCompare(a.name)
//       }
//       return 0
//     })

//   // Handle product actions
//   const handleEditProduct = (product: any) => {
//     setSelectedProduct(product)
//     setIsEditProductOpen(true)
//   }

//   const handleDeleteProduct = (product: any) => {
//     setSelectedProduct(product)
//     setIsDeleteProductOpen(true)
//   }

//   const handleSaleProduct = (product: any) => {
//     setSelectedProduct(product)
//     setIsSaleProductOpen(true)
//   }

//   const confirmDeleteProduct = (id: number) => {
//     deleteProduct(id)
//     setProducts(processedProducts) // Refresh the local state with the updated central data
//     setIsDeleteProductOpen(false)
//   }

//   const confirmEditProduct = (editedProduct: any) => {
//     updateProduct(editedProduct)
//     setProducts(processedProducts)
//     setIsEditProductOpen(false)
//   }

//   const confirmAddProduct = (newProduct: any) => {
//     addProduct(newProduct)
//     setProducts(processedProducts)
//     setIsAddProductOpen(false)
//   }

//   const confirmSaleProduct = (product: any, salePrice: number) => {
//     toggleProductSale(product.id, salePrice)
//     setProducts(processedProducts)
//     setIsSaleProductOpen(false)
//   }

//   const removeSale = (id: number) => {
//     toggleProductSale(id)
//     setProducts(processedProducts)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Products</h1>
//           <p className="text-gray-500">Manage your product inventory</p>
//         </div>
//         <Button onClick={() => setIsAddProductOpen(true)}>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Product
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <div className="relative">
//               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="jewelry">Jewelry</SelectItem>
//                 <SelectItem value="mens-coats">Men's Coats</SelectItem>
//                 <SelectItem value="kids-clothing">Kids Clothing</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="inStock">In Stock</SelectItem>
//                 <SelectItem value="outOfStock">Out of Stock</SelectItem>
//                 <SelectItem value="onSale">On Sale</SelectItem>
//                 <SelectItem value="new">New Arrivals</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sort By" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="oldest">Oldest First</SelectItem>
//                 <SelectItem value="priceHigh">Price: High to Low</SelectItem>
//                 <SelectItem value="priceLow">Price: Low to High</SelectItem>
//                 <SelectItem value="nameAZ">Name: A to Z</SelectItem>
//                 <SelectItem value="nameZA">Name: Z to A</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products Table */}
//       <Card>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date Added
//                   </th>
//                   <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0 relative">
//                           <Image
//                             src={product.image || "/placeholder.svg"}
//                             alt={product.name}
//                             fill
//                             className="rounded-md object-cover"
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                           <div className="text-sm text-gray-500">ID: {product.id}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 capitalize">{product.category.replace(/-/g, " ")}</div>
//                       <div className="text-xs text-gray-500">
//                         {product.subcategory && product.subcategory.replace(/-/g, " ")}
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       {product.isSale ? (
//                         <div>
//                           <div className="text-sm font-medium text-accent">${product.salePrice?.toFixed(2)}</div>
//                           <div className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</div>
//                         </div>
//                       ) : (
//                         <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
//                       )}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap gap-1">
//                         {product.inStock ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//                             In Stock
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
//                             Out of Stock
//                           </Badge>
//                         )}
//                         {product.isNew && (
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//                             New
//                           </Badge>
//                         )}
//                         {product.isSale && (
//                           <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
//                             Sale
//                           </Badge>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(product.dateAdded).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => handleEditProduct(product)} className="cursor-pointer">
//                             <Edit className="h-4 w-4 mr-2" />
//                             Edit
//                           </DropdownMenuItem>
//                           {product.isSale ? (
//                             <DropdownMenuItem onClick={() => removeSale(product.id)} className="cursor-pointer">
//                               <Tag className="h-4 w-4 mr-2" />
//                               Remove Sale
//                             </DropdownMenuItem>
//                           ) : (
//                             <DropdownMenuItem onClick={() => handleSaleProduct(product)} className="cursor-pointer">
//                               <Tag className="h-4 w-4 mr-2" />
//                               Add to Sale
//                             </DropdownMenuItem>
//                           )}
//                           <DropdownMenuItem
//                             onClick={() => handleDeleteProduct(product)}
//                             className="cursor-pointer text-red-600"
//                           >
//                             <Trash className="h-4 w-4 mr-2" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No products found</p>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Dialogs */}
//       <AddProductDialog open={isAddProductOpen} onClose={() => setIsAddProductOpen(false)} onAdd={confirmAddProduct} />

//       {selectedProduct && (
//         <>
//           <EditProductDialog
//             open={isEditProductOpen}
//             onClose={() => setIsEditProductOpen(false)}
//             product={selectedProduct}
//             onSave={confirmEditProduct}
//           />

//           <DeleteProductDialog
//             open={isDeleteProductOpen}
//             onClose={() => setIsDeleteProductOpen(false)}
//             product={selectedProduct}
//             onDelete={() => confirmDeleteProduct(selectedProduct.id)}
//           />

//           <SaleProductDialog
//             open={isSaleProductOpen}
//             onClose={() => setIsSaleProductOpen(false)}
//             product={selectedProduct}
//             onSave={(salePrice) => confirmSaleProduct(selectedProduct, salePrice)}
//           />
//         </>
//       )}
//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, Edit, Trash, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProductDialog } from "@/components/admin/add-product-dialog";
import { EditProductDialog } from "@/components/admin/edit-product-dialog";
import { DeleteProductDialog } from "@/components/admin/delete-product-dialog";
import { SaleProductDialog } from "@/components/admin/sale-product-dialog";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [isSaleProductOpen, setIsSaleProductOpen] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Backend actions
  const addProduct = async (product: any) => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    fetchProducts();
  };

  const updateProduct = async (product: any) => {
    await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const toggleProductSale = async (id: string, salePrice?: number) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isSale: salePrice ? true : false,
        salePrice: salePrice || null,
      }),
    });
    fetchProducts();
  };

  // Filter & Sort
  const filteredProducts = products
    .filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (categoryFilter !== "all" && product.category !== categoryFilter)
        return false;
      if (statusFilter === "inStock" && !product.inStock) return false;
      if (statusFilter === "outOfStock" && product.inStock) return false;
      if (statusFilter === "onSale" && !product.isSale) return false;
      if (statusFilter === "new" && !product.isNew) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
      if (sortBy === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="mens-coats">Men's Coats</SelectItem>
                <SelectItem value="kids-clothing">Kids Clothing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="inStock">In Stock</SelectItem>
                <SelectItem value="outOfStock">Out of Stock</SelectItem>
                <SelectItem value="onSale">On Sale</SelectItem>
                <SelectItem value="new">New Arrivals</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="nameAZ">Name: A to Z</SelectItem>
                <SelectItem value="nameZA">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date Added</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            ID: {product._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 capitalize">{product.category}</td>
                    <td className="px-4 py-4">
                      {product.isSale ? (
                        <div>
                          <div className="text-accent font-semibold">
                            ${product.salePrice.toFixed(2)}
                          </div>
                          <div className="text-xs line-through text-gray-500">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <div>${product.price.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`border ${
                            product.inStock
                              ? "text-green-700 bg-green-50"
                              : "text-red-700 bg-red-50"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                        {product.isNew && (
                          <Badge
                            variant="outline"
                            className="text-blue-700 bg-blue-50"
                          >
                            New
                          </Badge>
                        )}
                        {product.isSale && (
                          <Badge
                            variant="outline"
                            className="text-purple-700 bg-purple-50"
                          >
                            Sale
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(product.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditProductOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsSaleProductOpen(true);
                            }}
                          >
                            <Tag className="w-4 h-4 mr-2" />
                            {product.isSale ? "Update Sale" : "Add to Sale"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteProductOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddProductDialog
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAdd={addProduct}
      />
      {selectedProduct && (
        <>
          <EditProductDialog
            open={isEditProductOpen}
            onClose={() => setIsEditProductOpen(false)}
            product={selectedProduct}
            onSave={updateProduct}
          />
          {/* <DeleteProductDialog
            open={isDeleteProductOpen}
            onClose={() => setIsDeleteProductOpen(false)}
            product={selectedProduct}
            onDelete={() => deleteProduct(selectedProduct._id)}
          /> */}
          <DeleteProductDialog
            open={isDeleteProductOpen}
            onClose={() => setIsDeleteProductOpen(false)}
            product={selectedProduct}
            onDelete={async () => {
              await deleteProduct(selectedProduct._id);
              setIsDeleteProductOpen(false); // close modal after delete
            }}
          />

          <SaleProductDialog
            open={isSaleProductOpen}
            onClose={() => setIsSaleProductOpen(false)}
            product={selectedProduct}
            onSave={(price) => toggleProductSale(selectedProduct._id, price)}
          />
        </>
      )}
    </div>
  );
}
