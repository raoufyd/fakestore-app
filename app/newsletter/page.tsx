import type { Metadata } from "next";
import NewsletterForm from "@/components/newsletter/newsletter-form";
import { Mail, Bell, Gift, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscribe to Our Newsletter | Weasydoo Store",
  description:
    "Stay updated with the latest fashion trends, new arrivals, and exclusive offers by subscribing to our newsletter.",
};

export default function NewsletterPage() {
  const benefits = [
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Stay Updated",
      description: "Be the first to know about new arrivals and collections",
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: "Exclusive Offers",
      description: "Get access to subscriber-only deals and promotions",
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Birthday Gifts",
      description: "Receive a special discount during your birthday month",
    },
    {
      icon: <Tag className="h-8 w-8 text-primary" />,
      title: "Early Access",
      description: "Shop sales before they're available to the public",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest fashion trends, new arrivals, and
          exclusive offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and be part of our fashion community. We
            send out newsletters only twice a month, so we won't flood your
            inbox.
          </p>
          <p className="text-gray-600 mb-6">
            You can unsubscribe at any time by clicking the link in the footer
            of our emails.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm">
              By subscribing, you agree to our Privacy Policy and consent to
              receive marketing communications.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <NewsletterForm
            title="Subscribe Today"
            description="Fill out the form below to join our newsletter and receive exclusive offers."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Benefits of Subscribing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border text-center"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Subscribe?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of fashion enthusiasts who already subscribe to our
          newsletter.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm variant="inline" />
        </div>
      </div>
    </div>
  );
}
