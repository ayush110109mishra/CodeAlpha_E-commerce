import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-28 sm:py-36 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f4f3ed] text-zinc-800 border border-[#eae8e1]">
        <Compass size={24} strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          The requested page does not exist or has been moved. Explore our products to continue shopping.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#121212] text-[#fafaf8] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-zinc-900 border border-[#eae8e1] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#f4f3ed] transition-colors"
        >
          <span>View All Products</span>
        </Link>
      </div>
    </div>
  )
}
