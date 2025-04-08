import { Loader2 } from "lucide-react"

export default function ProductDetailLoading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading product details...</span>
    </div>
  )
}

