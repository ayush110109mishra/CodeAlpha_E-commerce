import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, Headphones } from 'lucide-react'
import { getAllProducts, getCategoryMetadata } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function HomePage() {
  const allProducts = getAllProducts()
  const categories = getCategoryMetadata()

  // 1. Featured Products (4 distinct items across categories)
  const featuredProducts = [
    allProducts.find((p) => p.slug === 'komorebi-mechanical-keyboard'), // Tech & Audio
    allProducts.find((p) => p.slug === 'studio-monolith-wireless-headphones'), // Tech & Audio
    allProducts.find((p) => p.slug === 'folio-leather-laptop-sleeve'), // Bags & Accessories
    allProducts.find((p) => p.slug === 'strata-ambient-desk-lamp'), // Home Essentials
  ].filter(Boolean)

  // 2. More to Explore (4 distinct items, zero overlap with featured products)
  const moreToExplore = [
    allProducts.find((p) => p.slug === 'atlas-magsafe-desk-stand'), // Tech & Audio
    allProducts.find((p) => p.slug === 'meridian-waxed-canvas-duffle'), // Bags & Accessories
    allProducts.find((p) => p.slug === 'oblique-ceramic-coffee-tumbler'), // Home Essentials
    allProducts.find((p) => p.slug === 'nomad-ballistic-tech-organizer'), // Bags & Accessories
  ].filter(Boolean)

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HOMEPAGE HERO */}
      <section className="relative pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xs overflow-hidden bg-zinc-900 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-end border border-[#eae8e1] shadow-xs">
            
            {/* Lifestyle storefront & product campaign photograph */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
              alt="Curated everyday essentials and lifestyle goods"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Scrim for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />

            {/* Hero Copy Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-zinc-300 block">
                Forma Online Store
              </span>

              {/* Exact required headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] text-white">
                Made for your everyday.
              </h1>

              {/* Exact required supporting copy */}
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-lg font-light">
                Explore everyday essentials, tech accessories and more.
              </p>

              {/* Exact required primary CTA */}
              <div className="pt-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 bg-[#fafaf8] text-zinc-950 hover:bg-white text-xs uppercase tracking-[0.16em] font-semibold px-7 py-4 rounded-xs transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <span>Shop All Products</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eae8e1]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Department
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All ({allProducts.length})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col bg-white border border-[#eae8e1] rounded-xs overflow-hidden hover:border-zinc-400 transition-all duration-300 shadow-2xs"
            >
              {/* Category Photography */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f3ed]">
                <img
                  src={cat.image}
                  alt={`${cat.name} collection`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Clean Product Count Badge */}
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/90 backdrop-blur-xs text-zinc-800 font-medium rounded-xs shadow-2xs">
                  {cat.itemCount} {cat.itemCount === 1 ? 'Product' : 'Products'}
                </span>
              </div>

              {/* Category Info */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowRight size={15} className="text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f4f3ed] flex items-center justify-between text-[11px] text-zinc-400 uppercase tracking-wider">
                  <span>Browse Products</span>
                  <span className="text-zinc-300">•</span>
                  <span>In Stock</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eae8e1]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Popular Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:opacity-75 transition-opacity inline-flex items-center gap-1.5"
          >
            <span>View All {allProducts.length} Products</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. MORE TO EXPLORE (Neutral title, zero overlap with featured products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eae8e1]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Discover
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
              More to Explore
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:opacity-75 transition-opacity inline-flex items-center gap-1.5"
          >
            <span>Browse Full Store</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {moreToExplore.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. STORE SERVICE & CUSTOMER BENEFITS (Practical e-commerce perks, no fake manufacturing claims) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f4ed] border border-[#eae8e1] rounded-xs p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#eae8e1] text-zinc-900 shrink-0 shadow-2xs">
                <Truck size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-950">
                  Complimentary Shipping
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Free express courier delivery across India on all orders over ₹4,999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#eae8e1] text-zinc-900 shrink-0 shadow-2xs">
                <RotateCcw size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-950">
                  Easy 30-Day Returns
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Simple and hassle-free returns or exchanges within 30 days of receiving your order.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#eae8e1] text-zinc-900 shrink-0 shadow-2xs">
                <Headphones size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-950">
                  Dedicated Support
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Questions about products or delivery? Our team is here to assist with every order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
