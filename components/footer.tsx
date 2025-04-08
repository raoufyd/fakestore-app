import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const footerLinks = [
    {
      title: "Get to Know Us",
      links: ["About us", "Careers", "Press Releases", "Amazon Science"],
    },
    {
      title: "Connect with Us",
      links: ["Facebook", "Twitter", "Instagram"],
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell on Amazon",
        "Sell under Amazon Accelerator",
        "Protect and Build Your Brand",
        "Amazon Global Selling",
        "Become an Affiliate",
        "Fulfilment by Amazon",
        "Advertise Your Products",
        "Amazon Pay on Merchants",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "COVID-19 and Amazon",
        "Your Account",
        "Returns Centre",
        "100% Purchase Protection",
        "Amazon App Download",
        "Help",
      ],
    },
  ]

  const countries = [
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "Italy",
    "Japan",
    "Mexico",
    "Netherlands",
    "Poland",
    "Singapore",
    "Spain",
    "Turkey",
    "United Arab Emirates",
  ]

  return (
    <footer className="bg-[#232F3E] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="text-sm text-gray-300 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col items-center">
          <Link href="/" className="mb-4">
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="Amazon.in"
              width={100}
              height={30}
              className="h-6 w-auto"
            />
          </Link>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <select className="bg-[#232F3E] border border-gray-600 rounded text-sm p-1">
              <option>English</option>
              <option>हिन्दी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-300">
            {countries.map((country, index) => (
              <Link key={index} href="#" className="hover:underline">
                {country}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#131A22] py-4 text-xs text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-2">
            <Link href="#" className="hover:underline">
              Conditions of Use & Sale
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Notice
            </Link>
            <Link href="#" className="hover:underline">
              Interest-Based Ads
            </Link>
          </div>
          <p>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  )
}

