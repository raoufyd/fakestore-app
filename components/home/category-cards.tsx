import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryCards() {
  const categories = [
    {
      title: "FOR WOMEN",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      link: "/products?category=women's clothing",
      buttonText: "SHOP NOW",
    },

    {
      title: "FOR MEN",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      link: "/products?category=men's clothing",
      buttonText: "CHECK OUT",
    },
  ];

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-6 ">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card relative overflow-hidden rounded-lg"
        >
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.title}
            width={400}
            height={500}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
            <h3 className="text-white text-xl font-bold mb-2">
              {category.title}
            </h3>
            <p className="text-white/80 mb-4 text-sm">{category.description}</p>
            <Button asChild size="sm" className="self-start">
              <Link href={category.link}>{category.buttonText}</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
