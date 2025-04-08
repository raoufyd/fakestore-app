import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ProductActions from "@/components/products/product-actions"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  // Determine if product is on sale (for demo purposes, we'll say products with ID divisible by 3 are on sale)
  const isOnSale = product.id % 3 === 0

  // Calculate sale price (20% off)
  const salePrice = isOnSale ? product.price * 0.8 : null

  return (
    <div className={cn("product-card group relative", className)}>
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-[300px] object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Sale badge */}
        {isOnSale && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">SALE</Badge>}

        {/* Product actions */}
        <ProductActions product={product} />
      </div>

      <div className="mt-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <div className="mt-2 flex items-center">
          {isOnSale ? (
            <>
              <span className="text-lg font-bold text-red-500">${salePrice?.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

