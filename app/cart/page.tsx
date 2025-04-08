"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simuler un processus de paiement
    setTimeout(() => {
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!",
      })
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Cart Items ({totalItems})</h2>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <Link href={`/products/${item.product.id}`} className="text-lg font-medium hover:text-primary">
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                    <div className="mt-1 text-lg font-bold">${item.product.price.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center mt-4 sm:mt-0">
                    <div className="flex border rounded-md mr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-r-none h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                        className="w-12 h-8 text-center border-x rounded-none"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-l-none h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{totalPrice > 50 ? "Free" : "$5.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice > 50 ? 0 : 5) + totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Shipping is free for orders over $50. All prices include applicable taxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

