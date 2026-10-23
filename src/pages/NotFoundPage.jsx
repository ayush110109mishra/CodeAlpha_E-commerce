import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-28 sm:py-36 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f3f0e9] text-[#121212] border border-[#e8e5dc]">
        <Compass size={28} strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8c8980] font-semibold block">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#121212] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#64645f] max-w-md mx-auto leading-relaxed">
          The requested page does not exist or has moved. Explore our catalogue to discover currently available objects.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] text-[#faf8f5] hover:bg-black text-xs uppercase tracking-widest font-bold rounded-xs transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#121212] border border-[#d8d4ca] hover:border-[#121212] text-xs uppercase tracking-widest font-bold rounded-xs hover:bg-[#f3f0e9] transition-colors"
        >
          <span>View All Products</span>
        </Link>
      </div>
    </div>
  )
}
