import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Users,
  Leaf,
  Heart,
  ShoppingBag,
  Globe,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Weasydoo Store",
  description:
    "Learn about Weasydoo Store's story, mission, values, and the team behind our fashion brand.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "David Kim",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300&text=David",
      bio: "David founded Weasydoo Store in 2015 with a vision to create affordable, high-quality fashion for everyone.",
    },
    {
      name: "Nina Rodriguez",
      role: "Creative Director",
      image: "/placeholder.svg?height=300&width=300&text=Nina",
      bio: "Nina brings over 15 years of experience in fashion design and has been with Weasydoo since the beginning.",
    },
    {
      name: "Kevin Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300&text=Kevin",
      bio: "Kevin ensures that our supply chain is efficient and that we maintain our commitment to ethical production.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Weasydoo Store has completely transformed my wardrobe. Their clothes are stylish, affordable, and last for years!",
      author: "Sarah J.",
      location: "New York, NY",
      rating: 5,
    },
    {
      quote:
        "I appreciate their commitment to sustainability. It's rare to find a fashion brand that truly cares about its environmental impact.",
      author: "Michael T.",
      location: "Los Angeles, CA",
      rating: 5,
    },
    {
      quote:
        "The customer service is exceptional. When I had an issue with my order, they resolved it immediately and even sent a small gift as an apology.",
      author: "Emma R.",
      location: "Chicago, IL",
      rating: 4,
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Founded in New York",
      description:
        "Weasydoo Store was established with a single location in Manhattan.",
    },
    {
      year: "2017",
      title: "Expanded Online",
      description:
        "Launched our e-commerce platform to reach customers nationwide.",
    },
    {
      year: "2019",
      title: "Sustainability Initiative",
      description:
        "Committed to using sustainable materials and ethical manufacturing processes.",
    },
    {
      year: "2021",
      title: "International Expansion",
      description:
        "Opened our first international stores in Canada and the UK.",
    },
    {
      year: "2025",
      title: "Weasydoo Foundation",
      description:
        "Established our foundation to support fashion education and sustainability projects.",
    },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction in everything we do.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainability",
      description:
        "We're committed to reducing our environmental impact through responsible practices.",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Inclusivity",
      description:
        "We design for everyone, regardless of size, age, or background.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Quality",
      description:
        "We never compromise on the quality of our products or services.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 mb-6">
            Founded in 2015, Weasydoo Store began with a simple mission: to
            provide high-quality, affordable fashion that makes everyone feel
            confident and stylish.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            What started as a small boutique in New York has grown into a global
            brand, but our commitment to quality, sustainability, and customer
            satisfaction remains unchanged.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Our Collection</Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://weasydoo.com/web/image/website/1/logo/Weasydoo?unique=840a122"
            alt="Weasydoo Store Flagship"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Weasydoo Store, we believe that fashion should be accessible,
            sustainable, and empowering. These core values guide everything we
            do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">{value.icon}</div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="bg-primary/5 rounded-lg p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 flex justify-center">
            <Globe className="h-32 w-32 text-primary" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Our Commitment to Sustainability
            </h2>
            <p className="text-gray-600 mb-4">
              We're dedicated to reducing our environmental footprint and
              promoting ethical practices throughout our supply chain. By 2025,
              we aim to use 100% sustainable materials in all our products.
            </p>
            <ul className="space-y-2">
              {[
                "Eco-friendly materials and packaging",
                "Ethical manufacturing processes",
                "Fair wages and safe working conditions",
                "Reduced carbon footprint in shipping and operations",
                "Recycling and upcycling initiatives",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind Weasydoo Store who work tirelessly
            to bring you the best in fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <div className="relative h-64 w-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Key milestones in our growth from a small boutique to a global
            fashion brand.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-1/2"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg -mx-6">
                  {milestone.year.substring(2)}
                </div>
                <div className="w-1/2 p-6 bg-white rounded-lg shadow-sm border">
                  <div className="font-bold text-primary mb-1">
                    {milestone.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic text-gray-600 mb-4">
                  "{testimonial.quote}"
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Weasydoo Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Experience the quality and style that thousands of customers love.
          Shop our latest collection and become part of the Weasydoo family.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
