import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SaleBanner() {
  return (
    <section className="sale-banner text-white my-16 rounded-lg overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl">
          <span className="inline-block bg-white text-primary px-3 py-1 rounded text-sm font-medium mb-4">
            Limited Time Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Edition</h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
            pulvinar dapibus leo.
          </p>
          <p className="font-bold mb-6">Buy This T-shirt At 20% Discount, Use Code OFF20</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link href="/products">SHOP NOW</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

