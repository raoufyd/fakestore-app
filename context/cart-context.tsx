"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"
import { useToast } from "@/components/ui/use-toast"

export type CartItem = {
  product: Product
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Calculer le nombre total d'articles et le prix total
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id)

      if (existingItemIndex >= 0) {
        // Mettre à jour la quantité si le produit existe déjà
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity

        toast({
          title: "Cart Updated",
          description: `${product.title} quantity updated to ${updatedItems[existingItemIndex].quantity}`,
        })

        return updatedItems
      } else {
        // Ajouter le nouveau produit au panier
        toast({
          title: "Added to Cart",
          description: `${product.title} added to your cart`,
        })

        return [...prevItems, { product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.product.id === productId)

      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.product.title} removed from your cart`,
        })
      }

      return prevItems.filter((item) => item.product.id !== productId)
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

