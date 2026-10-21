import { Link } from 'react-router-dom'
import { ArrowRight, Layers, ShieldCheck, Heart } from 'lucide-react'
import { getAllProducts, getCategoryMetadata } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function HomePage() {
  const allProducts = getAllProducts()
  const categories = getCategoryMetadata()

  // Curate 4 distinct, non-repetitive featured pieces across the 4 categories
  const curatedFeatured = [
    allProducts.find((p) => p.slug === 'komorebi-mechanical-keyboard'), // Workstation
    allProducts.find((p) => p.slug === 'studio-monolith-wireless-headphones'), // Audio
    allProducts.find((p) => p.slug === 'folio-leather-laptop-sleeve'), // Carry
    allProducts.find((p) => p.slug === 'strata-ambient-desk-lamp'), // Living
  ].filter(Boolean)

  // Everyday rituals collection (3 distinct products, no overlap with featured above)
  const everydayRituals = [
    allProducts.find((p) => p.slug === 'oblique-ceramic-coffee-tumbler'), // Living
    allProducts.find((p) => p.slug === 'atelier-leather-card-wallet'), // Carry
    allProducts.find((p) => p.slug === 'nomad-ballistic-tech-organizer'), // Carry
  ].filter(Boolean)

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-24">
      
      {/* 1. FINAL HOMEPAGE HERO: SIMPLE, ELEGANT & MEMORABLE */}
      <section className="relative pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xs overflow-hidden bg-zinc-900 min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] flex items-end border border-[#eae8e1] shadow-xs">
            
            {/* High-quality lifestyle photograph of thoughtfully arranged everyday essentials */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
              alt="Thoughtfully chosen everyday lifestyle objects and accessories"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Subtle, warm gradient scrim for optimal text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

            {/* Hero Copy Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-zinc-300 block">
                Forma
              </span>

              {/* Exact required headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.14] text-white">
                Everyday things. <span className="font-serif-editorial italic font-normal">Thoughtfully chosen.</span>
              </h1>

              {/* Exact required supporting copy */}
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-lg font-light">
                Discover the things that make everyday life a little better.
              </p>

              {/* Exact required primary CTA */}
              <div className="pt-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 bg-[#fafaf8] text-zinc-950 hover:bg-white text-xs uppercase tracking-[0.16em] font-semibold px-7 py-4 rounded-xs transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <span>Explore Collection</span>
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
              Browse
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
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
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
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
                  <span>Explore</span>
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
              Curated Selection
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
          {curatedFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. EVERYDAY RITUALS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f4ed] border border-[#eae8e1] rounded-xs p-6 sm:p-10 lg:p-12 space-y-8">
          
          {/* Feature Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#eae8e1]">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-zinc-500">
                Daily Essentials
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950">
                Objects for <span className="font-serif-editorial italic font-normal text-zinc-900">daily routines</span>.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Thoughtfully designed pieces for morning pour-overs, daily travels, and quiet evenings at home.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:opacity-75 self-start md:self-auto transition-opacity"
            >
              <span>View All Pieces</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Anchor Image + 3 Curated Everyday Items */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Natural Still Life Photography */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-xs bg-[#e9e7df] min-h-[300px] lg:min-h-full border border-[#eae8e1] group">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                alt="Quiet morning still life with ceramic mug and natural linen"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px]">
                <span className="tracking-widest uppercase text-zinc-200">The Morning Routine</span>
                <span className="text-zinc-300">Natural Daylight</span>
              </div>
            </div>

            {/* 3 Dedicated Everyday Pieces (Zero overlap with featured) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {everydayRituals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 5. BRAND & MATERIAL VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f4ed] border border-[#eae8e1] rounded-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Story & Philosophy */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-zinc-500">
                  Our Philosophy
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-zinc-950 leading-snug">
                  We create things made to be used and enjoyed every single day, using <span className="font-serif-editorial italic font-normal text-zinc-900">honest materials</span> that endure.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                  Every product is selected for natural texture, pleasant tactile feedback, and lasting durability. We avoid disposable trends in favor of timeless utility.
                </p>
              </div>

              {/* Material Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#eae8e1]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Layers size={14} className="text-zinc-600" />
                    <span>Durable Metals</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Aerospace-grade aluminum and machined brass.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <ShieldCheck size={14} className="text-zinc-600" />
                    <span>Natural Leather</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Vegetable-tanned hides that patina with use.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Heart size={14} className="text-zinc-600" />
                    <span>Thoughtful Form</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Ergonomic comfort tailored for everyday life.
                  </p>
                </div>
              </div>
            </div>

            {/* Tactile Material Reference Photo */}
            <div className="lg:col-span-5 relative bg-zinc-200 min-h-[300px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1000&q=80"
                alt="Natural timber and leather textures"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
