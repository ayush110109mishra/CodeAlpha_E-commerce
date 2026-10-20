import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200">
        <Compass size={24} strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
          Page Not Located
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          The destination you requested does not exist or has been relocated within the Forma archive.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-zinc-200 transition-colors"
        >
          <span>Explore Products</span>
        </Link>
      </div>
    </div>
  )
}
