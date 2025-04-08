"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductById, deleteProduct } from "@/services/product-service"
import type { Product } from "@/types/product"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, Edit, Trash2, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailProps {
  id: number
}

function ProductDetailLoading() {
  return (
    <div className="flex items-center justify-center h-48">
      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      Loading product details...
    </div>
  )
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const router = useRouter()
  const { user, isAdmin } = useAuth()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (err) {
        setError("Error loading product. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleDelete = async () => {
    if (!user || !product || !isAdmin) return

    try {
      setIsDeleting(true)
      await deleteProduct(product.id, user.token)
      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
      })
      router.push("/products")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete the product.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    setIsAddingToCart(true)
    setTimeout(() => {
      addToCart(product, quantity)
      setIsAddingToCart(false)
    }, 500)
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))
  }

  if (isLoading) {
    return <ProductDetailLoading />
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Product not found"}</AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
        </Button>
      </div>
    )
  }

  const isFav = isFavorite(product.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
        </Button>

        {user && isAdmin && (
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link href={`/products/edit/${product.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg flex items-center justify-center border">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain max-h-[400px]"
          />
        </div>

        <div className="space-y-6">
          <Badge variant="outline" className="mb-2 capitalize">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center">
            <div className="flex items-center">
              {renderStars(product.rating.rate)}
              <span className="ml-2 text-sm text-gray-500">
                ({product.rating.rate}/5) - {product.rating.count} reviews
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <div className="flex items-center justify-center w-12 border-x">{quantity}</div>
              <Button variant="ghost" size="icon" className="rounded-l-none" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </div>

            <Button className="flex-1" onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            <Button
              variant={isFav ? "default" : "outline"}
              size="icon"
              className={isFav ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}
              onClick={() => toggleFavorite(product)}
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-white text-white" : ""}`} />
            </Button>
          </div>

          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 border rounded-md mt-2">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(product.rating.rate)}</div>
                <span className="text-sm">Based on {product.rating.count} reviews</span>
              </div>
              <p className="text-sm text-gray-500">No written reviews yet. Be the first to review this product!</p>
            </TabsContent>
            <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
              <p className="mb-2">Free shipping on orders over $50.</p>
              <p className="mb-2">Delivery within 3-5 business days.</p>
              <p>International shipping available.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

