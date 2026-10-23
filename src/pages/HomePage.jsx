import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, Headphones, ArrowUpRight, Sparkles } from 'lucide-react'
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

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xs overflow-hidden bg-[#121212] min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-end border border-[#e8e5dc] shadow-sm">

            {/* Lifestyle storefront & product campaign photograph */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
              alt="Curated everyday essentials and lifestyle goods"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
            />

            {/* Scrim for text contrast and editorial depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/50 to-[#121212]/20" />

            {/* Subtle decorative grid lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Hero Copy Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-5">

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ccff00] text-[#121212] text-[10px] uppercase tracking-[0.24em] font-bold rounded-xs shadow-xs">
                  <Sparkles size={11} />
                  <span>Edition 2026</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-zinc-300">
                  Forma Store
                </span>
              </div>

              {/* Exact required headline with editorial weight */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
                Made for your <span className="font-serif-editorial italic font-normal text-white">everyday.</span>
              </h1>

              {/* Exact required supporting copy */}
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl font-light">
                Explore everyday essentials, tech accessories and more.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Exact required primary CTA */}
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2.5 bg-[#ccff00] text-[#121212] hover:bg-[#b5e600] text-xs uppercase tracking-[0.18em] font-bold px-7 py-4 rounded-xs transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] cursor-pointer"
                >
                  <span>Shop All Products</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/products?category=Tech%20%26%20Audio"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs uppercase tracking-[0.16em] font-medium px-6 py-4 rounded-xs transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Tech & Audio</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

            </div>

            {/* Bottom-right editorial stamp */}
            <div className="hidden md:block absolute bottom-8 right-8 z-10 text-right text-white/70 text-[10px] tracking-widest uppercase">
              <span className="block font-serif-editorial italic text-xs text-white">01 / Curated Objects</span>
              <span>Direct Courier Delivery</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRAND MANIFESTO MARQUEE STRIP */}
      <section className="border-y border-[#e8e5dc] bg-[#f3f0e9]/60 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#64645f] font-medium uppercase tracking-[0.24em] gap-8">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] ring-1 ring-[#121212]" />
            Precision Engineering
          </span>
          <span className="hidden sm:inline text-[#b5b0a3]">•</span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
            Tactile Materials
          </span>
          <span className="hidden md:inline text-[#b5b0a3]">•</span>
          <span className="hidden md:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] ring-1 ring-[#121212]" />
            Zero Compromise
          </span>
          <span className="hidden lg:inline text-[#b5b0a3]">•</span>
          <span className="hidden lg:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
            Complimentary Shipping Over ₹4,999
          </span>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e8e5dc]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8c8980]">
              Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212] mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="group text-xs uppercase tracking-[0.16em] font-semibold text-[#121212] inline-flex items-center gap-1.5 transition-colors hover:text-[#64645f]"
          >
            <span>View All ({allProducts.length})</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col bg-white border border-[#e8e5dc] rounded-xs overflow-hidden hover:border-[#121212] transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              {/* Category Photography */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f0e9]">
                <img
                  src={cat.image}
                  alt={`${cat.name} collection`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Clean Product Count Badge */}
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[#121212] font-bold rounded-xs shadow-xs">
                  {cat.itemCount} {cat.itemCount === 1 ? 'Product' : 'Products'}
                </span>
              </div>

              {/* Category Info */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#121212] group-hover:text-[#64645f] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="h-7 w-7 rounded-full bg-[#f3f0e9] group-hover:bg-[#ccff00] flex items-center justify-center transition-colors">
                      <ArrowRight size={14} className="text-[#121212] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#64645f] line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#f3f0e9] flex items-center justify-between text-[11px] text-[#8c8980] uppercase tracking-wider font-medium">
                  <span>Explore Series</span>
                  <span>Ready to Ship</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e8e5dc]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8c8980]">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212] mt-1">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="group text-xs uppercase tracking-[0.16em] font-semibold text-[#121212] inline-flex items-center gap-1.5 transition-colors hover:text-[#64645f]"
          >
            <span>View All {allProducts.length} Items</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL FLAGSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-xs overflow-hidden bg-[#121212] text-white border border-[#121212] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00] text-[#121212] text-[10px] uppercase tracking-[0.2em] font-bold rounded-xs">
                <span>Flagship Design</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
                Komorebi <span className="font-serif-editorial italic font-normal text-[#ccff00]">Mechanical</span> Keyboard
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-lg">
                Precision-machined unibody aluminum with factory-lubricated silent switches. Designed for acoustic perfection and ergonomic endurance.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-800 text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500">Chassis</span>
                  <span className="font-semibold text-white">Anodized 6063 Aluminum</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500">Battery</span>
                  <span className="font-semibold text-white">4,000 mAh (200 Hours)</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500">Connectivity</span>
                  <span className="font-semibold text-white">Tri-Mode BT 5.2 / 2.4G</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/products/komorebi-mechanical-keyboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#121212] hover:bg-[#ccff00] text-xs uppercase tracking-[0.16em] font-bold rounded-xs transition-colors"
                >
                  <span>View Product Details</span>
                  <ArrowRight size={14} />
                </Link>
                <span className="text-sm font-semibold text-zinc-300">₹18,900</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-xs overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80"
                  alt="Komorebi Mechanical Keyboard"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. MORE TO EXPLORE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e8e5dc]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8c8980]">
              Discover
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212] mt-1">
              More to Explore
            </h2>
          </div>
          <Link
            to="/products"
            className="group text-xs uppercase tracking-[0.16em] font-semibold text-[#121212] inline-flex items-center gap-1.5 transition-colors hover:text-[#64645f]"
          >
            <span>Browse Full Store</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {moreToExplore.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. STORE SERVICE & CUSTOMER PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f3f0e9] border border-[#e8e5dc] rounded-xs p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#e8e5dc] text-[#121212] shrink-0 shadow-2xs">
                <Truck size={20} strokeWidth={1.75} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
                  Complimentary Shipping
                </h3>
                <p className="text-xs text-[#64645f] leading-relaxed">
                  Free express courier delivery across India on all orders over ₹4,999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#e8e5dc] text-[#121212] shrink-0 shadow-2xs">
                <RotateCcw size={20} strokeWidth={1.75} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
                  Easy 30-Day Returns
                </h3>
                <p className="text-xs text-[#64645f] leading-relaxed">
                  Simple and hassle-free returns or exchanges within 30 days of receiving your order.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xs border border-[#e8e5dc] text-[#121212] shrink-0 shadow-2xs">
                <Headphones size={20} strokeWidth={1.75} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#121212]">
                  Dedicated Concierge
                </h3>
                <p className="text-xs text-[#64645f] leading-relaxed">
                  Questions about products or delivery? Our support team is here to assist with every order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
