import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import NewsletterForm from "../newsletter/newsletter-form";

export default function Footer() {
  const forHerLinks: any[] = [];

  const forHimLinks: any[] = [];

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">Weasydoo</span>
            </Link>
            <p className="text-gray-600 mb-4">
              The best look anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Her</h3>
            <ul className="space-y-2">
              {forHerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Him</h3>
            <ul className="space-y-2">
              {forHimLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to get updates about our latest
              collections
            </p>
            <NewsletterForm variant="inline" />
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>Copyright © 2025 Weasydoo Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
