import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/home/hero-section";
import CategoryCards from "@/components/home/category-cards";
import FeaturedProducts from "@/components/home/featured-products";
import SaleBanner from "@/components/home/sale-banner";
import BenefitsSection from "@/components/home/benefits-section";
import { getProducts } from "@/services/product-service";
import NewsletterSection from "@/components/home/newsletter-section";

export default async function Home() {
  const products = await getProducts();
  console.log("products : ", products);
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="flex flex-col">
      <HeroSection />

      <div className="container mx-auto py-12">
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {featuredProducts.map((product, id) => (
              <div key={id} className="flex justify-center items-center">
                <Image
                  src={`${product.image}`}
                  alt={`Partner ${id + 1}`}
                  width={120}
                  height={50}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <CategoryCards />

        <div className="my-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-primary hover:underline">
              View All
            </Link>
          </div>

          <FeaturedProducts products={featuredProducts} />
        </div>

        <SaleBanner />

        <BenefitsSection />
      </div>
      <NewsletterSection />

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h2 className="text-center text-2xl font-bold mb-4">
            SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
          </h2>
        </div>
      </div>
    </div>
  );
}
