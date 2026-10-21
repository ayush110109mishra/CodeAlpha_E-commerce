import { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getProductBySlug, getAllProducts } from '../data/products'
import { formatPrice } from '../lib/utils'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/products/ProductCard'
import { ArrowLeft, Check, ShieldCheck, Truck, RotateCcw, ShoppingBag, Plus, Minus } from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const { addToCart } = useCart()
  const product = getProductBySlug(slug)
  const [quantity, setQuantity] = useState(1)
  const [addedNotice, setAddedNotice] = useState(false)

  // Preserve user's browsing context (category filters, sorting) if coming from catalogue
  const fromState = location.state?.from
  const isFromCatalogue = typeof fromState === 'string' && fromState.startsWith('/products')
  const backToCatalogueUrl = isFromCatalogue ? fromState : '/products'

  // Invalid or unknown product slug
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold block">
          Studio Archive
        </span>
        <h1 className="text-3xl font-semibold text-zinc-950">
          Piece Not Located
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          The requested design reference may have been archived or the URL has expired. Explore our active catalogue to view current studio pieces.
        </p>
        <div className="pt-2">
          <Link
            to={backToCatalogueUrl}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#121212] text-[#fafaf8] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Catalogue</span>
          </Link>
        </div>
      </div>
    )
  }

  // Related recommendations (other products in same category or featured, excluding current)
  const relatedProducts = getAllProducts()
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 3500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-12">
      
      {/* Top Navigation Row: Visible Back Control & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eae8e1]">
        {/* Visible Back Navigation Control */}
        <Link
          to={backToCatalogueUrl}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-zinc-700 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 rounded-xs group w-fit py-1"
          aria-label="Back to Catalogue"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-zinc-900" />
          <span>Back to Catalogue</span>
        </Link>

        {/* Editorial Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400">
          <Link to="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to={backToCatalogueUrl} className="hover:text-zinc-950 transition-colors">
            Catalogue
          </Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-zinc-950 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Image Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#f4f3ed] rounded-xs border border-[#eae8e1] shadow-2xs">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
            <span>Official Studio Reference Photography</span>
            <span>Ref: {product.id}</span>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="lg:col-span-5 space-y-7">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-zinc-500">
                {product.category} Series
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Available to Order
              </span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-4xl font-semibold text-zinc-950 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-zinc-500 leading-relaxed italic">
              {product.tagline}
            </p>

            {/* Price Box */}
            <div className="mt-5 flex items-baseline gap-3 pb-5 border-b border-[#eae8e1]">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-950 tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-zinc-500 ml-auto">
                Inclusive of all taxes (GST)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Engineering Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
                Engineering Highlights
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 leading-normal">
                    <Check size={14} className="text-zinc-950 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications */}
          {product.specs && (
            <div className="space-y-2.5 pt-3 border-t border-[#eae8e1]">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
                Specifications
              </h3>
              <dl className="divide-y divide-[#f0eee6] text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-2 flex justify-between gap-4">
                    <dt className="text-zinc-500">{key}</dt>
                    <dd className="font-medium text-zinc-950 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quantity & Add to Bag Block */}
          <div className="space-y-3 pt-4 border-t border-[#eae8e1]">
            <div className="flex items-center gap-3">
              {/* Refined Quantity Counter */}
              <div className="flex items-center border border-[#eae8e1] rounded-xs bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-xs font-semibold text-zinc-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Primary Add to Bag Action */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#121212] text-[#fafaf8] hover:bg-black transition-colors py-3.5 px-6 text-xs uppercase tracking-[0.16em] font-semibold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
              >
                <ShoppingBag size={16} />
                <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
              </button>
            </div>

            {/* Notification state */}
            {addedNotice && (
              <div className="p-3 bg-[#f5f4ed] text-zinc-900 text-xs border border-[#eae8e1] rounded-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>Added {quantity} × {product.name} to your shopping bag.</span>
                </div>
                <Link
                  to="/cart"
                  className="font-semibold text-zinc-950 underline underline-offset-2 shrink-0 hover:text-zinc-700"
                >
                  View Bag
                </Link>
              </div>
            )}

            <p className="text-[11px] text-zinc-400 text-center">
              Ships in plastic-free recycled pulp packaging with tracking.
            </p>
          </div>

          {/* Guarantees Strip */}
          <div className="pt-2 grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-white border border-[#eae8e1] rounded-xs space-y-1 shadow-2xs">
              <Truck size={15} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-800">Free Courier</div>
            </div>
            <div className="p-2.5 bg-white border border-[#eae8e1] rounded-xs space-y-1 shadow-2xs">
              <ShieldCheck size={15} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-800">2-Year Warranty</div>
            </div>
            <div className="p-2.5 bg-white border border-[#eae8e1] rounded-xs space-y-1 shadow-2xs">
              <RotateCcw size={15} className="mx-auto text-zinc-700" />
              <div className="text-[10px] font-medium text-zinc-800">30-Day Evaluation</div>
            </div>
          </div>

        </div>

      </div>

      {/* Recommended Studio Pairings */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#eae8e1] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
                Complete the Space
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 mt-0.5">
                Studio Pairings
              </h2>
            </div>
            <Link
              to={backToCatalogueUrl}
              className="text-xs uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-950"
            >
              All Pieces
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} customFrom={backToCatalogueUrl} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
