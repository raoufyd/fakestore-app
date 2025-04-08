import { Suspense } from "react";
import ProductsList from "@/components/products/products-list";
import ProductsLoading from "@/components/products/products-loading";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
