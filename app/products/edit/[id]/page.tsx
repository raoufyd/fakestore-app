"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProductById, updateProduct } from "@/services/product-service"
import { useAuth } from "@/context/auth-context"
import ProductForm from "@/components/products/product-form"
import type { Product, ProductCreate } from "@/types/product"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const productData = await getProductById(Number(id))
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

  const handleSubmit = async (productData: ProductCreate) => {
    if (!user || !product) {
      toast({
        title: "Error",
        description: "You must be logged in to edit a product.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    try {
      setIsSubmitting(true)
      await updateProduct(product.id, productData, user.token)
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully.",
      })
      router.push(`/products/${product.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the product.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading product...</span>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href={`/products/${product.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to product
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={product} />
      </div>
    </div>
  )
}

