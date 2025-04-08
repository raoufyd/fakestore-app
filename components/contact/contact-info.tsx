import Link from "next/link"
import type { ReactNode } from "react"

interface ContactInfoProps {
  icon: ReactNode
  title: string
  description: string
  contact: string
  secondaryContact?: string
  link?: string
}

export default function ContactInfo({ icon, title, description, contact, secondaryContact, link }: ContactInfoProps) {
  const content = (
    <div className="bg-white p-6 rounded-lg border shadow-sm h-full">
      <div className="flex flex-col items-start">
        <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">{description}</p>
        <p className="font-medium">{contact}</p>
        {secondaryContact && <p className="font-medium">{secondaryContact}</p>}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block h-full hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

