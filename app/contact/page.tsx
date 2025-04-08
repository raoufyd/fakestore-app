import type { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Weasydoo Store",
  description:
    "Get in touch with our customer service team. We're here to help with any questions or concerns about your orders, products, or account.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      description: "Our friendly team is here to help.",
      contact: "support@Weasydoostore.com",
      link: "mailto:support@Weasydoostore.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm.",
      contact: "+1 (555) 000-0000",
      link: "tel:+15550000000",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Visit Us",
      description: "Come say hello at our store.",
      contact: "123 Fashion St, New York, NY",
      link: "https://maps.google.com",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Working Hours",
      description: "We're open:",
      contact: "Mon-Sat: 10am - 8pm",
      secondaryContact: "Sunday: 12pm - 6pm",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Please fill out the form below or use one
          of our contact methods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <ContactInfo
                key={index}
                icon={method.icon}
                title={method.title}
                description={method.description}
                contact={method.contact}
                secondaryContact={method.secondaryContact}
                link={method.link}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help with an Order?</h2>
        <p className="text-gray-600 mb-6">
          Our customer service team is available to assist you with any
          questions about your orders.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="mailto:orders@Weasydoostore.com"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Support
          </a>
          <a
            href="tel:+15550000000"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Support
          </a>
        </div>
      </div>
    </div>
  );
}
