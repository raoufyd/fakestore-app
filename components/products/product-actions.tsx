"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"

interface ProductActionsProps {
  product: Product
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    setTimeout(() => {
      addToCart(product, 1)
      setIsAdding(false)
    }, 500) // Petit délai pour l'animation
  }

  const isFav = isFavorite(product.id)

  return (
    <div className="product-actions absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-3 bg-white/80 backdrop-blur-sm">
      <Button
        size="icon"
        variant={isFav ? "default" : "outline"}
        className={`rounded-full h-9 w-9 ${isFav ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}`}
        onClick={() => toggleFavorite(product)}
      >
        <Heart className={`h-4 w-4 ${isFav ? "fill-white text-white" : ""}`} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full h-9 w-9"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        <ShoppingCart className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" className="rounded-full h-9 w-9" asChild>
        <Link href={`/products/${product.id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

