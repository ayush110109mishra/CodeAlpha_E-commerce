import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Plus, Check } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

/**
 * Forma Product Card
 * Clean e-commerce product card with product imagery, clear pricing in INR,
 * working detail links, and an integrated quick add-to-cart action.
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
    setTimeout(() => setIsAdded(false), 1800)
  }

  return (
    <article className="group relative flex flex-col bg-white border border-[#eae8e1] rounded-xs overflow-hidden hover:border-zinc-400/80 hover:shadow-xs transition-all duration-300">
      {/* Product Image Stage */}
      <Link 
        to={`/products/${product.slug}`}
        state={{ from: currentPathWithSearch }}
        className="relative block aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#f4f3ed]"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-cinematic group-hover:scale-[1.035]"
        />

        {/* Hover Action Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-xs p-2 rounded-full text-zinc-900 shadow-sm">
          <ArrowUpRight size={15} strokeWidth={2} />
        </div>
      </Link>

      {/* Product Metadata Block */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500">
            {product.category}
          </span>
          <span className="text-[10px] text-zinc-400 font-medium">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-zinc-950 group-hover:text-zinc-600 transition-colors line-clamp-1">
          <Link 
            to={`/products/${product.slug}`}
            state={{ from: currentPathWithSearch }}
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 rounded-xs"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed flex-1">
          {product.tagline || product.description}
        </p>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#f0eee6] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-zinc-950 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 ${
                isAdded
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-zinc-900 text-white hover:bg-black'
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
