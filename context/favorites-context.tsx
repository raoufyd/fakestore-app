"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"
import { useToast } from "@/components/ui/use-toast"

type FavoritesContextType = {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: number) => void
  isFavorite: (productId: number) => boolean
  toggleFavorite: (product: Product) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([])
  const { toast } = useToast()

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites data:", error)
        localStorage.removeItem("favorites")
      }
    }
  }, [])

  // Sauvegarder les favoris dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: Product) => {
    setFavorites((prevFavorites) => {
      // Vérifier si le produit est déjà dans les favoris
      if (prevFavorites.some((item) => item.id === product.id)) {
        return prevFavorites
      }

      toast({
        title: "Added to Favorites",
        description: `${product.title} added to your favorites`,
      })

      return [...prevFavorites, product]
    })
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites((prevFavorites) => {
      const itemToRemove = prevFavorites.find((item) => item.id === productId)

      if (itemToRemove) {
        toast({
          title: "Removed from Favorites",
          description: `${itemToRemove.title} removed from your favorites`,
        })
      }

      return prevFavorites.filter((item) => item.id !== productId)
    })
  }

  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId)
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

