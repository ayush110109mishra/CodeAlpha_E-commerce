import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../../lib/utils'

/**
 * Editorial Product Card
 * Product-led presentation with restrained typography, crisp image stage, and smooth microinteractions.
 * Preserves the current browsing context (category filters, sort order) in navigation state.
 */
export default function ProductCard({ product, customFrom }) {
  const location = useLocation()
  if (!product) return null

  // Capture current path and query parameters to preserve user browsing context
  const currentPathWithSearch = customFrom || (location.pathname + location.search)

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
          {product.specs?.Origin && (
            <span className="text-[10px] text-zinc-400 truncate max-w-[120px] text-right">
              {product.specs.Origin.replace('Crafted in ', '').replace('Artisan handcrafted in ', '')}
            </span>
          )}
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
        <div className="mt-4 pt-3 border-t border-[#f0eee6] flex items-center justify-between">
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

          <Link
            to={`/products/${product.slug}`}
            state={{ from: currentPathWithSearch }}
            className="text-xs font-medium text-zinc-800 hover:text-zinc-950 hover:underline underline-offset-4 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
