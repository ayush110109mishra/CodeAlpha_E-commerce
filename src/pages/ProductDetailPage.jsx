import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { formatPrice } from '../lib/utils'
import { ArrowLeft, Check, ShieldCheck, Truck, RotateCcw, ShoppingBag } from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [addedNotice, setAddedNotice] = useState(false)

  // Handle invalid/missing product slug
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl font-semibold text-zinc-900">
          Product Not Found
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          The requested item may have been discontinued or the URL is invalid. Browse our active catalogue to discover current releases.
        </p>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Catalogue</span>
          </Link>
        </div>
      </div>
    )
  }

  const handleSimulatedAdd = () => {
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12">
      
      {/* Editorial Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500">
        <Link to="/" className="hover:text-zinc-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-zinc-900 transition-colors">
          Products
        </Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-zinc-900 transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-zinc-900 font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Product Imagery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-zinc-100 rounded-sm border border-zinc-200/80">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium rounded-xs">
                Featured Edition
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 text-center italic">
            Precision engineering shot • Studio reference preview
          </p>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
              {product.category}
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 italic">
              {product.tagline}
            </p>

            {/* Price Box */}
            <div className="mt-6 flex items-baseline gap-3 pb-6 border-b border-zinc-200">
              <span className="text-2xl font-bold text-zinc-950">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-zinc-500 ml-auto">
                Duties & VAT included
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600">
                    <Check size={14} className="text-zinc-950 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications Table */}
          {product.specs && (
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
                Technical Specifications
              </h3>
              <dl className="divide-y divide-zinc-100 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-2 flex justify-between">
                    <dt className="text-zinc-500">{key}</dt>
                    <dd className="font-medium text-zinc-900 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Actions Block */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={handleSimulatedAdd}
              className="w-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors py-4 px-6 text-xs uppercase tracking-widest font-semibold rounded-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={16} />
              <span>{addedNotice ? 'Added to Bag (Phase 1 Preview)' : 'Add to Bag'}</span>
            </button>

            {addedNotice && (
              <div className="p-3 bg-zinc-100 text-zinc-800 text-xs text-center border border-zinc-200 rounded-xs animate-in fade-in duration-200">
                Item acknowledged in Phase 1 foundation shell. Persistent cart state will be wired in Phase 2.
              </div>
            )}

            <p className="text-[11px] text-zinc-400 text-center">
              Ships within 24 hours from central European hub.
            </p>
          </div>

          {/* Value Guarantee List */}
          <div className="pt-4 border-t border-zinc-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-zinc-50 border border-zinc-200/60 rounded-xs space-y-1">
              <Truck size={14} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-700">Free Courier</div>
            </div>
            <div className="p-2 bg-zinc-50 border border-zinc-200/60 rounded-xs space-y-1">
              <ShieldCheck size={14} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-700">2-Year Warranty</div>
            </div>
            <div className="p-2 bg-zinc-50 border border-zinc-200/60 rounded-xs space-y-1">
              <RotateCcw size={14} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-700">30-Day Returns</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
