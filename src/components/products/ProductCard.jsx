import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../../lib/utils'

/**
 * Reusable Product Card component for catalogues and featured carousels/grids.
 * Editorial, restrained styling with crisp hover states.
 */
export default function ProductCard({ product }) {
  if (!product) return null

  return (
    <article className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-sm overflow-hidden hover:border-zinc-400/80 transition-colors duration-200">
      {/* Product Image Stage */}
      <Link 
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-zinc-100"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Featured Tag Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-zinc-100 text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium rounded-xs">
            Studio Pick
          </div>
        )}

        {/* Quick View Link Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-900 shadow-xs">
          <ArrowUpRight size={16} />
        </div>
      </Link>

      {/* Product Details Block */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium mb-1">
          {product.category}
        </div>

        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
          <Link to={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed flex-1">
          {product.tagline || product.description}
        </p>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-zinc-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-medium text-zinc-900 hover:underline underline-offset-4"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
