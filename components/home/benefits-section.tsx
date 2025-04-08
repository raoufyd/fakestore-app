import { Truck, Award, Gift, ShieldCheck } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Worldwide Shipping",
      description: "We offer worldwide shipping to all countries across the world",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Best Quality",
      description: "We sell products from the best brands in the industry",
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Best Offers",
      description: "We offer the best prices and promotions for our customers",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Secure Payments",
      description: "We use secure payment methods for all transactions",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
      {benefits.map((benefit, index) => (
        <div key={index} className="text-center p-6 border rounded-lg">
          <div className="flex justify-center mb-4">{benefit.icon}</div>
          <h3 className="font-bold mb-2">{benefit.title}</h3>
          <p className="text-gray-600 text-sm">{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}

