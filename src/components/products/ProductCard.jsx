import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Plus, Check } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

/**
 * Forma Product Card
 * Editorial e-commerce product card with smooth hover transitions,
 * electric lime micro-accents, clear INR pricing, and quick add-to-bag.
 */
export default function ProductCard({ product, customFrom }) {
  const location = useLocation()
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  if (!product) return null

  // Capture current path and query parameters to preserve user browsing context
  const currentPathWithSearch = customFrom || (location.pathname + location.search)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1600)
  }

  return (
    <article className="group relative flex flex-col bg-white border border-[#e8e5dc] rounded-xs overflow-hidden hover:border-[#121212]/70 hover:shadow-md transition-all duration-300">
      {/* Product Image Stage */}
      <Link 
        to={`/products/${product.slug}`}
        state={{ from: currentPathWithSearch }}
        className="relative block aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#f3f0e9]"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-cinematic group-hover:scale-[1.045]"
        />

        {/* Stock / Category Micro-Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {product.featured && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#ccff00] text-[#121212] font-bold rounded-xs shadow-xs">
              Featured
            </span>
          )}
        </div>

        {/* Hover Arrow Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 bg-[#121212] p-2 rounded-full text-[#ccff00] shadow-sm">
          <ArrowUpRight size={14} strokeWidth={2.25} />
        </div>
      </Link>

      {/* Product Metadata Block */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#64645f]">
            {product.category}
          </span>
          <span className="text-[10px] text-[#64645f] font-medium">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            ) : (
              'Sold Out'
            )}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[#121212] group-hover:text-[#64645f] transition-colors line-clamp-1">
          <Link 
            to={`/products/${product.slug}`}
            state={{ from: currentPathWithSearch }}
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-[#64645f] line-clamp-2 leading-relaxed flex-1">
          {product.tagline || product.description}
        </p>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#f3f0e9] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#121212] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8c8980] line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] ${
                isAdded
                  ? 'bg-[#ccff00] text-[#121212] border border-[#121212] shadow-xs'
                  : 'bg-[#121212] text-[#faf8f5] hover:bg-black hover:border-black active:scale-95'
              }`}
              aria-label={`Add ${product.name} to bag`}
            >
              {isAdded ? (
                <>
                  <Check size={12} className="stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus size={12} className="stroke-[2.5]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
