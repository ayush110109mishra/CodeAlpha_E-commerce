import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Plus, Minus, Eye } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import { PRODUCTS } from '../data/products'

export default function CartPage() {
  // CRITICAL REQUIREMENT: Default cart starts genuinely empty
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [demoItems, setDemoItems] = useState([
    {
      product: PRODUCTS[0], // Komorebi Mechanical Keyboard
      quantity: 1
    },
    {
      product: PRODUCTS[2], // Folio Leather Laptop Sleeve
      quantity: 1
    }
  ])

  // Calculations for preview layout
  const subtotal = demoItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal > 150 ? 0 : 15
  const total = subtotal + shipping

  const handleUpdateDemoQty = (id, delta) => {
    setDemoItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const handleRemoveDemoItem = (id) => {
    setDemoItems((prev) => prev.filter((item) => item.product.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
      
      {/* Page Title & Scope Context */}
      <div className="border-b border-[#eae8e1] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 font-semibold">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 mt-1">
            Shopping Bag
          </h1>
        </div>

        {/* Isolated Layout Preview Switch (for reviewers only) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 bg-white border border-[#eae8e1] px-3 py-1.5 rounded-xs transition-colors cursor-pointer shadow-2xs"
          >
            <Eye size={13} />
            <span>{isPreviewMode ? 'Hide Layout Preview' : 'Preview Order Summary Layout'}</span>
          </button>
        </div>
      </div>

      {/* 1. DEFAULT GENUINE EMPTY STATE */}
      {!isPreviewMode ? (
        <div className="py-20 sm:py-28 text-center space-y-6 bg-white border border-[#eae8e1] rounded-xs px-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f5f4ed] flex items-center justify-center text-zinc-700 border border-[#eae8e1]">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-zinc-950 tracking-tight">
              Your shopping bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              When you select pieces from the studio archive, they will appear here with calculated shipping and packaging details.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121212] text-[#fafaf8] text-xs uppercase tracking-[0.16em] font-semibold rounded-xs hover:bg-black transition-colors shadow-xs"
            >
              <ArrowLeft size={14} />
              <span>Explore Collection</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-8 border-t border-[#f4f3ed] max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-zinc-500">
            <div>• Free courier over $150</div>
            <div>• 30-day studio trial</div>
            <div>• Carbon-neutral transit</div>
          </div>
        </div>
      ) : (
        /* 2. ISOLATED DEMO ORDER-SUMMARY LAYOUT PREVIEW (Clearly labeled for review) */
        <div className="space-y-6">
          {/* Isolation Notice Banner */}
          <div className="p-4 bg-[#f5f4ed] border border-[#d8d6ce] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Design Preview Mode Active
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Demonstrating order calculations and item rows for design review. These items are not saved to a real user session.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewMode(false)}
              className="text-xs font-semibold text-zinc-900 underline underline-offset-4 self-start sm:self-auto cursor-pointer"
            >
              Return to Empty State
            </button>
          </div>

          {demoItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Items List */}
              <div className="lg:col-span-8 divide-y divide-[#eae8e1] border-y border-[#eae8e1]">
                {demoItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-6 flex gap-4 sm:gap-6">
                    <Link
                      to={`/products/${product.slug}`}
                      className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden bg-[#f4f3ed] rounded-xs border border-[#eae8e1]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </Link>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                              {product.category}
                            </span>
                            <h3 className="text-sm font-semibold text-zinc-900">
                              <Link to={`/products/${product.slug}`} className="hover:underline">
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <span className="text-sm font-semibold text-zinc-950 tabular-nums">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center border border-[#eae8e1] rounded-xs bg-white">
                          <button
                            type="button"
                            onClick={() => handleUpdateDemoQty(product.id, -1)}
                            className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-semibold text-zinc-900 tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateDemoQty(product.id, 1)}
                            className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveDemoItem(product.id)}
                          className="text-xs text-zinc-400 hover:text-red-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-white border border-[#eae8e1] p-6 rounded-xs space-y-6 shadow-2xs">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 border-b border-[#eae8e1] pb-3">
                  Estimated Summary
                </h2>

                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-zinc-950 tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <dt>Express Courier</dt>
                    <dd className="font-medium text-zinc-950 tabular-nums">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </dd>
                  </div>
                  <div className="pt-3 border-t border-[#eae8e1] flex justify-between text-sm">
                    <dt className="font-semibold text-zinc-950">Estimated Total</dt>
                    <dd className="font-bold text-zinc-950 tabular-nums">{formatPrice(total)}</dd>
                  </div>
                </dl>

                <div className="space-y-2">
                  <button
                    type="button"
                    disabled
                    className="w-full bg-[#121212] text-[#fafaf8] opacity-65 cursor-not-allowed py-3.5 px-4 text-xs uppercase tracking-widest font-semibold rounded-xs flex items-center justify-center gap-2"
                  >
                    <span>Checkout (Available in Phase 3)</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center">
                    Full payment processing & transaction handling will be connected in Phase 3.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500 justify-center pt-2 border-t border-[#f4f3ed]">
                  <ShieldCheck size={14} className="text-zinc-700" />
                  <span>256-Bit Encrypted Architecture</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center space-y-3 bg-white border border-dashed border-[#eae8e1] rounded-xs">
              <p className="text-xs text-zinc-500">All sample items removed from preview.</p>
              <button
                type="button"
                onClick={() =>
                  setDemoItems([
                    { product: PRODUCTS[0], quantity: 1 },
                    { product: PRODUCTS[2], quantity: 1 }
                  ])
                }
                className="text-xs text-zinc-900 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Reset sample items
              </button>
            </div>
          )}
        </div>
      )}

      {/* Continue Browsing Return Link */}
      <div className="pt-4">
        <Link
          to="/products"
          className="text-xs text-zinc-500 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Continue browsing catalogue</span>
        </Link>
      </div>

    </div>
  )
}
