"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/product-service";
import { useAuth } from "@/context/auth-context";
import ProductForm from "@/components/products/product-form";
import type { ProductCreate } from "@/types/product";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (productData: ProductCreate) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a product.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      const newProduct = await createProduct(productData, user.token);
      toast({
        title: "Product Created",
        description: "The product has been created successfully.",
      });
      console.log("newProduct 01 : ", newProduct);
      router.push(`/products/`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the product.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
