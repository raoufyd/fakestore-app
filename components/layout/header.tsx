"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { Button } from "@/components/ui/button";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  LogOut,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "EVERYTHING", href: "/products" },
    { name: "WOMEN", href: "/products?category=women's clothing" },
    { name: "MEN", href: "/products?category=men's clothing" },
    { name: "ELECTRONICS", href: "/products?category=electronics" },
    { name: "JEWELERY", href: "/products?category=jewelery" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white shadow-md" : "bg-primary text-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">Weasydoo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-medium hover:text-primary/80 transition-colors",
                  isScrolled ? "text-gray-800" : "text-white",
                  "focus:underline underline-offset-4"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium hidden md:block",
                isScrolled ? "text-gray-800" : "text-white",
                "focus:underline underline-offset-4"
              )}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium hidden md:block",
                isScrolled ? "text-gray-800" : "text-white",
                "focus:underline underline-offset-4"
              )}
            >
              CONTACT US
            </Link>

            {/* Favorites Icon */}
            <Link
              href="/favorites"
              className={cn(
                "relative",
                isScrolled ? "text-gray-800" : "text-white"
              )}
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {favorites.length}
                </Badge>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className={cn(
                "relative",
                isScrolled ? "text-gray-800" : "text-white"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(isScrolled ? "text-gray-800" : "text-white")}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>
                        {user.name.firstname} {user.name.lastname}
                      </span>
                      <span className="text-xs text-gray-500">
                        {isAdmin ? "Administrator" : "Customer"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/cart" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Cart</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className={cn(isScrolled ? "text-gray-800" : "text-white")}
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={cn(
                    "h-6 w-6",
                    isScrolled ? "text-gray-800" : "text-white"
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "h-6 w-6",
                    isScrolled ? "text-gray-800" : "text-white"
                  )}
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-medium px-4 py-2 hover:bg-gray-100 rounded",
                    isScrolled ? "text-gray-800" : "text-white",
                    pathname === item.href && "font-bold"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/about"
                className={cn(
                  "font-medium px-4 py-2 hover:bg-gray-100 rounded",
                  isScrolled ? "text-gray-800" : "text-white"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "font-medium px-4 py-2 hover:bg-gray-100 rounded",
                  isScrolled ? "text-gray-800" : "text-white"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
