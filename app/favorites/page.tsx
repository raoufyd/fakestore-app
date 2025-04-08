"use client"

import Link from "next/link"
import { useFavorites } from "@/context/favorites-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import ProductCard from "@/components/products/product-card"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-6">You haven't added any products to your favorites yet.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Favorites</h1>
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

