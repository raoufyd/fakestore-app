import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="hero-section text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Raining Offers For Hot Summer!
          </h1>
          <p className="text-xl mb-8">25% Off On All Products</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link href="/products">SHOP NOW</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
