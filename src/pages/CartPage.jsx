import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Plus, Minus, Sparkles } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart()

  // Complimentary express shipping on orders over ₹4,999
  const shipping = subtotal > 4999 ? 0 : 350
  const total = subtotal + (cartItems.length > 0 ? shipping : 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
      
      {/* Page Title & Scope Context */}
      <div className="border-b border-[#e8e5dc] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#8c8980] font-semibold">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212] mt-1">
            Shopping Bag
          </h1>
        </div>

        {cartItems.length > 0 && (
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#64645f] font-medium">
              <span className="font-bold text-[#121212]">{totalItems}</span> {totalItems === 1 ? 'item' : 'items'} in your bag
            </p>
            <span className="text-[#d8d4ca]">•</span>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-[#8c8980] hover:text-red-700 transition-colors underline underline-offset-4 cursor-pointer font-medium"
            >
              Clear Bag
            </button>
          </div>
        )}
      </div>

      {/* 1. EMPTY STATE WHEN CART HAS NO ITEMS */}
      {cartItems.length === 0 ? (
        <div className="py-20 sm:py-28 text-center space-y-6 bg-white border border-[#e8e5dc] rounded-xs px-4 shadow-sm">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f3f0e9] flex items-center justify-center text-[#121212] border border-[#e8e5dc]">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-[#121212] tracking-tight">
              Your shopping bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-[#64645f] leading-relaxed">
              When you add items to your shopping bag, they will appear here with calculated shipping and order details.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#121212] text-[#faf8f5] hover:bg-black text-xs uppercase tracking-[0.18em] font-bold rounded-xs transition-colors shadow-xs"
            >
              <ArrowLeft size={14} />
              <span>Explore Catalogue</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-8 border-t border-[#f3f0e9] max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-[#8c8980]">
            <div>• Free courier over ₹4,999</div>
            <div>• 30-day easy returns</div>
            <div>• Tracked express delivery</div>
          </div>
        </div>
      ) : (
        /* 2. ACTIVE SHOPPING BAG WITH LIVE CART ITEMS & SUMMARY */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Items List */}
          <div className="lg:col-span-8 divide-y divide-[#e8e5dc] border-y border-[#e8e5dc]">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="py-6 flex gap-4 sm:gap-6">
                <Link
                  to={`/products/${product.slug}`}
                  className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden bg-[#f3f0e9] rounded-xs border border-[#e8e5dc]"
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
                        <span className="text-[10px] uppercase tracking-wider text-[#8c8980] font-medium">
                          {product.category}
                        </span>
                        <h2 className="text-sm font-semibold text-[#121212]">
                          <Link to={`/products/${product.slug}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#121212] tabular-nums block">
                          {formatPrice(product.price * quantity)}
                        </span>
                        {quantity > 1 && (
                          <span className="text-[11px] text-[#8c8980] tabular-nums">
                            {formatPrice(product.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-[#64645f] line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    {/* Stepper with minimum quantity clamped to 1 */}
                    <div className="flex items-center border border-[#d8d4ca] rounded-xs bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-[#64645f] hover:text-[#121212] transition-colors cursor-pointer"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#121212] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-[#64645f] hover:text-[#121212] transition-colors cursor-pointer"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Explicit Item Removal */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-xs text-[#8c8980] hover:text-red-700 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
                      aria-label={`Remove ${product.name} from bag`}
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
          <div className="lg:col-span-4 bg-white border border-[#e8e5dc] p-6 sm:p-7 rounded-xs space-y-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#121212] border-b border-[#e8e5dc] pb-3">
              Order Summary
            </h2>

            <dl className="space-y-3.5 text-xs">
              <div className="flex justify-between text-[#64645f]">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-[#121212] tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-[#64645f]">
                <dt>Delivery</dt>
                <dd className="font-semibold text-[#121212] tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">Free Express</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </dd>
              </div>

              {subtotal < 4999 ? (
                <div className="text-[11px] text-[#64645f] bg-[#f3f0e9] p-3 border border-[#e8e5dc] rounded-xs flex items-start gap-2">
                  <Sparkles size={14} className="text-[#121212] shrink-0 mt-0.5" />
                  <span>
                    Add <span className="font-bold text-[#121212]">{formatPrice(4999 - subtotal)}</span> more for complimentary express shipping.
                  </span>
                </div>
              ) : (
                <div className="text-[11px] text-[#121212] bg-[#ccff00]/30 p-2.5 border border-[#ccff00] rounded-xs flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
                  <span>Unlocked complimentary express shipping</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#e8e5dc] flex justify-between text-base">
                <dt className="font-bold text-[#121212]">Estimated Total</dt>
                <dd className="font-bold text-[#121212] tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>

            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full bg-[#121212] text-[#faf8f5] opacity-65 cursor-not-allowed py-4 px-4 text-xs uppercase tracking-[0.2em] font-bold rounded-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
              <p className="text-[10px] text-[#8c8980] text-center">
                Secure checkout and gateway integration ready for production.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#64645f] justify-center pt-2 border-t border-[#f3f0e9]">
              <ShieldCheck size={14} className="text-[#121212]" />
              <span>256-Bit Encrypted Order Review</span>
            </div>
          </div>

        </div>
      )}

      {/* Continue Browsing Return Link */}
      <div className="pt-4">
        <Link
          to="/products"
          className="text-xs font-semibold text-[#64645f] hover:text-[#121212] inline-flex items-center gap-1.5 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft size={13} />
          <span>Continue shopping</span>
        </Link>
      </div>

    </div>
  )
}
