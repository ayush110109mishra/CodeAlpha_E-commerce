import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import { PRODUCTS } from '../data/products'

export default function CartPage() {
  // Mock cart items for Phase 1 preview
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCTS[0],
      quantity: 1
    },
    {
      product: PRODUCTS[1],
      quantity: 1
    }
  ])

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal > 150 ? 0 : 15
  const total = subtotal + shipping

  const handleRemoveMockItem = (id) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id))
  }

  const handleResetMockCart = () => {
    setCartItems([
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 }
    ])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8">
      
      {/* Scope Notice Banner */}
      <div className="bg-zinc-100 border border-zinc-200/80 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-zinc-900 text-white">
            <ShoppingBag size={16} />
          </div>
          <div>
            <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
              Cart Page Shell • Phase 1 Preview
            </span>
            <span className="text-xs text-zinc-600">
              Interactive layout and styling foundation. Full global state & checkout logic will arrive in Phase 2.
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <button
            type="button"
            onClick={handleResetMockCart}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-900 underline underline-offset-4 self-start sm:self-auto cursor-pointer"
          >
            Reload Preview Items
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCartItems([])}
            className="text-xs text-zinc-500 hover:text-zinc-900 self-start sm:self-auto cursor-pointer"
          >
            Simulate Empty State
          </button>
        )}
      </div>

      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Shopping Bag
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Review your selected items before proceeding to secure checkout.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 divide-y divide-zinc-200 border-y border-zinc-200">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="py-6 flex gap-4 sm:gap-6">
                <Link
                  to={`/products/${product.slug}`}
                  className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden bg-zinc-100 rounded-sm border border-zinc-200"
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
                      <span className="text-sm font-semibold text-zinc-950">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <span>Qty:</span>
                      <span className="px-2 py-0.5 border border-zinc-200 rounded text-zinc-900 font-medium">
                        {quantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMockItem(product.id)}
                      className="text-xs text-zinc-400 hover:text-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      aria-label={`Remove ${product.name} from bag`}
                    >
                      <Trash2 size={13} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200 p-6 rounded-sm space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-3">
              Order Summary
            </h2>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-600">
                <dt>Subtotal</dt>
                <dd className="font-medium text-zinc-900">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-zinc-600">
                <dt>Courier Delivery</dt>
                <dd className="font-medium text-zinc-900">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </dd>
              </div>
              <div className="pt-3 border-t border-zinc-200 flex justify-between text-sm">
                <dt className="font-semibold text-zinc-950">Estimated Total</dt>
                <dd className="font-bold text-zinc-950">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              disabled
              className="w-full bg-zinc-950 text-white opacity-70 cursor-not-allowed py-3.5 px-4 text-xs uppercase tracking-widest font-semibold rounded-xs flex items-center justify-center gap-2"
            >
              <span>Checkout Disabled (Phase 1)</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 justify-center">
              <ShieldCheck size={14} className="text-zinc-700" />
              <span>256-bit Encrypted Checkout Ready for Phase 2</span>
            </div>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 bg-white border border-dashed border-zinc-300 rounded-sm">
          <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
            <ShoppingBag size={20} />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-900">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Explore our collection of minimal workstation goods and timeless everyday carry pieces.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Browse Catalogue</span>
            </Link>
          </div>
        </div>
      )}

      {/* Return Link */}
      <div className="pt-6">
        <Link
          to="/products"
          className="text-xs text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Continue browsing products</span>
        </Link>
      </div>

    </div>
  )
}
