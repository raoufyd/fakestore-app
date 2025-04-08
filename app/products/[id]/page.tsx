import { Suspense } from "react";
import ProductDetail from "@/components/products/product-detail";
import ProductDetailLoading from "@/components/products/product-detail-loading";

interface ProductPageProps {
  params: {
    id: number;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailLoading />}>
        <ProductDetail id={id} />
      </Suspense>
    </div>
  );
}
