// Central product data store for the entire application

export type Product = {
  id: number
  name: string
  price: number
  salePrice?: number
  discount?: number
  category: string
  subcategory?: string
  description?: string
  features?: string[]
  image: string
  images?: string[]
  colors?: string[]
  sizes?: string[]
  inStock: boolean
  dateAdded: string
  isNew?: boolean
  isSale?: boolean
  isFeatured?: boolean
  rating: number
  reviews: number
  tags?: string[]
}

// Calculate if a product is new (added within the last 14 days)
const isProductNew = (dateString: string): boolean => {
  const productDate = new Date(dateString)
  const currentDate = new Date()
  const diffTime = currentDate.getTime() - productDate.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= 14
}

// Helper to calculate discount percentage
const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Central product data
export const products: Product[] = [
  {
    id: 1,
    name: "Crystal Pendant Necklace",
    price: 49.99,
    salePrice: 39.99,
    category: "jewelry",
    subcategory: "necklaces",
    description: "This elegant crystal pendant necklace features a stunning design that catches the light beautifully.",
    features: [
      "High-quality crystal pendant",
      "Adjustable chain length",
      "Hypoallergenic materials",
      "Tarnish-resistant finish",
    ],
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: ["Silver", "Gold", "Rose Gold"],
    inStock: true,
    dateAdded: "2025-05-01",
    isFeatured: true,
    rating: 4.5,
    reviews: 128,
    tags: ["crystal", "pendant", "elegant", "gift"],
  },
  {
    id: 2,
    name: "Wool Blend Overcoat",
    price: 129.99,
    salePrice: 89.99,
    category: "mens-coats",
    subcategory: "overcoats",
    description: "Stay warm and stylish with this premium wool blend overcoat, perfect for cold weather.",
    features: [
      "70% wool, 30% polyester blend",
      "Full lining",
      "Double-breasted design",
      "Two side pockets",
      "Inner pocket",
    ],
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: ["Black", "Navy", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    dateAdded: "2025-05-02",
    isFeatured: false,
    rating: 4.8,
    reviews: 86,
    tags: ["wool", "winter", "coat", "formal"],
  }
]

// Process products to add derived fields
export const processedProducts = products.map((product) => {
  // Calculate if product is new
  const isNew = isProductNew(product.dateAdded)

  // Calculate if product is on sale
  const isSale = product.salePrice !== undefined

  // Calculate discount percentage if on sale
  const discount = isSale ? calculateDiscount(product.price, product.salePrice!) : undefined

  return {
    ...product,
    isNew,
    isSale,
    discount,
  }
})

// Helper functions to get filtered products
export const getNewArrivals = () => {
  return processedProducts
    .filter((product) => product.isNew)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}

export const getSaleProducts = () => {
  return processedProducts.filter((product) => product.isSale).sort((a, b) => (b.discount || 0) - (a.discount || 0))
}

export const getFeaturedProducts = () => {
  return processedProducts.filter((product) => product.isFeatured)
}

export const getProductsByCategory = (category: string) => {
  return processedProducts.filter((product) => product.category === category)
}

export const getProductById = (id: number) => {
  return processedProducts.find((product) => product.id === id)
}

export const getRelatedProducts = (product: Product, limit = 4) => {
  return processedProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit)
}

// Functions to modify the products data
export const updateProduct = (updatedProduct: Product) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id)
  if (index !== -1) {
    products[index] = updatedProduct
    // Re-process the products to update derived fields
    processProducts()
  }
}

export const addProduct = (newProduct: Omit<Product, "id">) => {
  // Generate a new ID
  const newId = Math.max(...products.map((p) => p.id)) + 1
  const productWithId = { ...newProduct, id: newId } as Product
  products.push(productWithId)
  // Re-process the products to update derived fields
  processProducts()
  return productWithId
}

export const deleteProduct = (id: number) => {
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products.splice(index, 1)
    // Re-process the products to update derived fields
    processProducts()
    return true
  }
  return false
}

export const toggleProductSale = (id: number, salePrice?: number) => {
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    if (salePrice) {
      products[index].salePrice = salePrice
    } else {
      delete products[index].salePrice
    }
    // Re-process the products to update derived fields
    processProducts()
    return true
  }
  return false
}

// Helper function to re-process products after modifications
const processProducts = () => {
  // Clear the processedProducts array
  processedProducts.length = 0

  // Re-process all products and push them to processedProducts
  products.forEach((product) => {
    // Calculate if product is new
    const isNew = isProductNew(product.dateAdded)

    // Calculate if product is on sale
    const isSale = product.salePrice !== undefined

    // Calculate discount percentage if on sale
    const discount = isSale ? calculateDiscount(product.price, product.salePrice!) : undefined

    processedProducts.push({
      ...product,
      isNew,
      isSale,
      discount,
    })
  })
}

export default processedProducts
