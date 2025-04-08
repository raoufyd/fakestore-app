"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  Package,
  Settings,
  Plus,
  Mail,
} from "lucide-react";
import { getSubscriberStats } from "@/services/newsletter-service";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  // Rediriger si l'utilisateur n'est pas connecté ou n'est pas admin
  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return null;
  }
  // Obtenir les statistiques des abonnés à la newsletter
  const newsletterStats = getSubscriberStats();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/products/create">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/products/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/newsletter">
                  <Mail className="h-4 w-4 mr-2" />
                  Manage Newsletter
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View All Products
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Store Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Newsletter Subscribers
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsletterStats.active}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>
              Latest products added to the store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-md mr-3"></div>
                    <div>
                      <p className="font-medium">Product {i}</p>
                      <p className="text-sm text-gray-500">Added 2 days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(Math.random() * 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">In stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Order #{Math.floor(Math.random() * 10000)}
                    </p>
                    <p className="text-sm text-gray-500">Customer {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(Math.random() * 200).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {
                        ["Pending", "Processing", "Shipped", "Delivered"][
                          Math.floor(Math.random() * 4)
                        ]
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
