import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { fetchProductBySlug, fetchProducts } from '../services/api'
import { formatPrice } from '../lib/utils'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/products/ProductCard'
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Plus,
  Minus,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedNotice, setAddedNotice] = useState(false)
  const [retryTrigger, setRetryTrigger] = useState(0)

  // Track slug changes during render
  const [prevSlug, setPrevSlug] = useState(slug)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    setLoading(true)
    setError(null)
    setIsNotFound(false)
    setQuantity(1)
  }

  // Preserve user's browsing context (category filters, sorting) if coming from catalogue
  const fromState = location.state?.from
  const isFromCatalogue = typeof fromState === 'string' && fromState.startsWith('/products')
  const backToCatalogueUrl = isFromCatalogue ? fromState : '/products'

  useEffect(() => {
    if (!slug) return

    const controller = new AbortController()

    fetchProductBySlug(slug, { signal: controller.signal })
      .then((res) => {
        const item = res.data
        setProduct(item)
        setLoading(false)
        setError(null)
        setIsNotFound(false)

        // Fetch related products dynamically from same category
        if (item && item.category) {
          fetchProducts(
            { category: item.category, limit: 4 },
            { signal: controller.signal }
          )
            .then((relatedRes) => {
              const filtered = (relatedRes.data || [])
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
              setRelatedProducts(filtered)
            })
            .catch(() => {
              // Non-critical; fallback to empty related products
              setRelatedProducts([])
            })
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return // Cancelled by subsequent navigation
        }
        console.error('Forma: Product fetch failed:', err)
        if (err.status === 404) {
          setIsNotFound(true)
        } else {
          setError(err.message || 'Unable to connect to Forma server.')
        }
        setLoading(false)
      })

    return () => controller.abort()
  }, [slug, retryTrigger])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity)
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 3500)
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setIsNotFound(false)
    setRetryTrigger((prev) => prev + 1)
  }

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-12 animate-pulse">
        {/* Navigation placeholder */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e8e5dc]">
          <div className="h-4 bg-[#e8e5dc] rounded-xs w-32" />
          <div className="h-4 bg-[#e8e5dc] rounded-xs w-48" />
        </div>

        {/* Product showcase skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 aspect-[4/3] sm:aspect-[1/1] bg-[#e8e5dc] rounded-xs" />
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="h-3 bg-[#e8e5dc] rounded-xs w-1/4" />
              <div className="h-8 bg-[#e8e5dc] rounded-xs w-3/4" />
              <div className="h-4 bg-[#e8e5dc] rounded-xs w-1/2" />
              <div className="h-8 bg-[#e8e5dc] rounded-xs w-1/3 pt-4" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-3 bg-[#e8e5dc] rounded-xs w-1/5" />
              <div className="h-16 bg-[#e8e5dc] rounded-xs w-full" />
            </div>
            <div className="h-12 bg-[#e8e5dc] rounded-xs w-full mt-6" />
          </div>
        </div>
      </div>
    )
  }

  // 404 Product Not Found State
  if (isNotFound) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8c8980] font-semibold block">
          Forma Store
        </span>
        <h1 className="text-3xl font-semibold text-[#121212]">
          Product Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#64645f] max-w-md mx-auto leading-relaxed">
          The requested product could not be found or may have been updated. Browse our catalogue to view currently available items.
        </p>
        <div className="pt-2">
          <Link
            to={backToCatalogueUrl}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] text-[#faf8f5] text-xs uppercase tracking-widest font-bold rounded-xs hover:bg-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    )
  }

  // Network / Server Error State with Retry
  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
          <AlertCircle size={22} strokeWidth={1.75} />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#121212]">
            Unable to Load Product
          </h1>
          <p className="text-xs sm:text-sm text-[#64645f] max-w-md mx-auto leading-relaxed">
            {error || 'An unexpected error occurred while fetching product details.'}
          </p>
        </div>
        <div className="pt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-[#faf8f5] text-xs uppercase tracking-widest font-bold rounded-xs hover:bg-black transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Try Again</span>
          </button>
          <Link
            to={backToCatalogueUrl}
            className="px-5 py-3 text-xs text-[#64645f] hover:text-[#121212] border border-[#d8d4ca] rounded-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Back to Catalogue
          </Link>
        </div>
      </div>
    )
  }

  // Specifications entries safely handled whether Object or Map
  const specsEntries =
    product.specs && typeof product.specs === 'object'
      ? Object.entries(product.specs)
      : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-12">
      
      {/* Top Navigation Row: Visible Back Control & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8e5dc]">
        {/* Visible Back Navigation Control */}
        <Link
          to={backToCatalogueUrl}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-[#121212] hover:text-[#64645f] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs group w-fit py-1"
          aria-label="Back to Catalogue"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-[#121212]" />
          <span>Back to Catalogue</span>
        </Link>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8c8980]">
          <Link to="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to={backToCatalogueUrl} className="hover:text-[#121212] transition-colors">
            Catalogue
          </Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#121212] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#121212] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Image Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#f3f0e9] rounded-xs border border-[#e8e5dc] shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-cinematic hover:scale-[1.02]"
            />
            {product.featured && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#ccff00] text-[#121212] text-[10px] uppercase tracking-[0.2em] font-bold rounded-xs shadow-xs">
                <Sparkles size={11} />
                <span>Forma Select</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8c8980] px-1 font-mono uppercase">
            <span>Item: {product.id || product.slug}</span>
            <span>Archival Object</span>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="lg:col-span-5 space-y-7">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8c8980]">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#121212] bg-[#f3f0e9] px-2.5 py-0.5 rounded-full border border-[#e8e5dc] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                {product.inStock ? 'Ready to Dispatch' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-4xl font-semibold text-[#121212] tracking-tight leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="mt-2 text-sm text-[#64645f] leading-relaxed font-serif-editorial italic">
                {product.tagline}
              </p>
            )}

            {/* Price Box */}
            <div className="mt-5 flex items-baseline gap-3 pb-5 border-b border-[#e8e5dc]">
              <span className="text-2xl sm:text-3xl font-bold text-[#121212] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#8c8980] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#8c8980] ml-auto">
                Inclusive of GST
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-[#64645f] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#64645f] leading-normal">
                    <span className="p-0.5 rounded-full bg-[#ccff00] text-[#121212] mt-0.5 shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {specsEntries.length > 0 && (
            <div className="space-y-2.5 pt-3 border-t border-[#e8e5dc]">
              <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
                Specifications
              </h3>
              <dl className="divide-y divide-[#f3f0e9] text-xs">
                {specsEntries.map(([key, val]) => (
                  <div key={key} className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#8c8980] font-medium">{key}</dt>
                    <dd className="font-semibold text-[#121212] text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quantity & Add to Bag Block */}
          <div className="space-y-3 pt-4 border-t border-[#e8e5dc]">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#d8d4ca] rounded-xs bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-[#64645f] hover:text-[#121212] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-xs font-bold text-[#121212] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-[#64645f] hover:text-[#121212] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Primary Add to Bag Action */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-[#121212] text-[#faf8f5] hover:bg-black disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 py-4 px-6 text-xs uppercase tracking-[0.18em] font-bold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] active:scale-[0.99]"
              >
                <ShoppingBag size={16} />
                <span>
                  {product.inStock
                    ? `Add to Bag — ${formatPrice(product.price * quantity)}`
                    : 'Out of Stock'}
                </span>
              </button>
            </div>

            {/* Notification state */}
            {addedNotice && (
              <div className="p-3.5 bg-[#f3f0e9] text-[#121212] text-xs border border-[#121212] rounded-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-full bg-[#ccff00] text-[#121212]">
                    <Check size={12} className="stroke-[3]" />
                  </span>
                  <span>Added {quantity} × {product.name} to your shopping bag.</span>
                </div>
                <Link
                  to="/cart"
                  className="font-bold text-[#121212] underline underline-offset-4 shrink-0 hover:opacity-75 uppercase tracking-wider text-[11px]"
                >
                  View Bag
                </Link>
              </div>
            )}

            <p className="text-[11px] text-[#8c8980] text-center">
              Standard courier delivery with tracking across India. Free shipping over ₹4,999.
            </p>
          </div>

          {/* Guarantees & Perks Strip */}
          <div className="pt-2 grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-white border border-[#e8e5dc] rounded-xs space-y-1 shadow-2xs">
              <Truck size={16} className="mx-auto text-[#121212]" strokeWidth={1.75} />
              <div className="text-[11px] font-bold text-[#121212]">Free Delivery</div>
              <div className="text-[10px] text-[#8c8980]">Over ₹4,999</div>
            </div>
            <div className="p-3 bg-white border border-[#e8e5dc] rounded-xs space-y-1 shadow-2xs">
              <ShieldCheck size={16} className="mx-auto text-[#121212]" strokeWidth={1.75} />
              <div className="text-[11px] font-bold text-[#121212]">Verified Quality</div>
              <div className="text-[10px] text-[#8c8980]">Tested Objects</div>
            </div>
            <div className="p-3 bg-white border border-[#e8e5dc] rounded-xs space-y-1 shadow-2xs">
              <RotateCcw size={16} className="mx-auto text-[#121212]" strokeWidth={1.75} />
              <div className="text-[11px] font-bold text-[#121212]">30-Day Returns</div>
              <div className="text-[10px] text-[#8c8980]">Hassle-Free</div>
            </div>
          </div>

        </div>

      </div>

      {/* Recommended Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#e8e5dc] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8c8980]">
                Curated Recommendations
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#121212] mt-0.5">
                More in {product.category}
              </h2>
            </div>
            <Link
              to={backToCatalogueUrl}
              className="text-xs uppercase tracking-wider font-semibold text-[#121212] hover:text-[#64645f]"
            >
              All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id || p._id} product={p} customFrom={backToCatalogueUrl} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
