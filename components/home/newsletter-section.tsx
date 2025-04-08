import NewsletterForm from "@/components/newsletter/newsletter-form"

export default function NewsletterSection() {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest fashion trends, new arrivals, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>
    </section>
  )
}

