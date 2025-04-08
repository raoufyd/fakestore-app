"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { loginUser } from "@/services/auth-service"
import { useToast } from "@/components/ui/use-toast"

export type UserRole = "admin" | "client"

export type User = {
  id: number
  username: string
  email: string
  name: {
    firstname: string
    lastname: string
  }
  token: string
  role: UserRole // Ajout du rôle utilisateur
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean // Ajout d'un helper pour vérifier si l'utilisateur est admin
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const pathname = usePathname()

  // Helper pour vérifier si l'utilisateur est admin
  const isAdmin = user?.role === "admin"

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect to login page if user tries to access protected routes
    const protectedRoutes = ["/products/create", "/products/edit"]
    const adminOnlyRoutes = ["/admin", "/products/create", "/products/edit"] // Routes réservées aux admins

    const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route))
    const isAdminRoute = adminOnlyRoutes.some((route) => pathname?.startsWith(route))

    if (isProtectedRoute && !user && !isLoading) {
      toast({
        title: "Access Denied",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      })
      router.push("/login")
    } else if (isAdminRoute && user && !isAdmin && !isLoading) {
      toast({
        title: "Access Denied",
        description: "You must be an administrator to access this page.",
        variant: "destructive",
      })
      router.push("/products")
    }
  }, [pathname, user, isLoading, router, toast, isAdmin])

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      const userData = await loginUser(username, password)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name.firstname} ${userData.name.lastname}!`,
      })
      router.push("/products")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid username or password.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, isAdmin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

