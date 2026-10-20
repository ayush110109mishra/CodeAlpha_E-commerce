import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getFeaturedProducts, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-20">
      
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900 text-white py-20 sm:py-32">
        {/* Subtle background ambient overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center filter grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-medium bg-zinc-800/80 border border-zinc-700/60 rounded-full text-zinc-300">
              <Sparkles size={12} className="text-zinc-400" />
              Autumn / Winter Studio Collection
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] text-zinc-100">
              Tactile objects for <span className="font-semibold italic font-serif">focused minds</span> and quiet desks.
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              Forma crafts essential workstation tools, acoustic devices, and minimalist carry goods. Each piece is engineered with monolithic materials and restrained aesthetics.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 hover:bg-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded-xs transition-colors"
              >
                <span>View Catalogue</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/products?category=Workstation"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-white px-5 py-3.5 border border-zinc-800 hover:border-zinc-700 rounded-xs transition-colors"
              >
                Workstation Goods
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Shortcuts Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-b border-zinc-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
                Disciplines
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
                Curated by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-950 inline-flex items-center gap-1"
            >
              All Categories <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {CATEGORIES.filter((c) => c !== 'All').map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group p-5 bg-white border border-zinc-200/80 rounded-sm hover:border-zinc-900 transition-colors flex flex-col justify-between h-32"
            >
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                Forma Series
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform">
                  {category}
                </span>
                <ArrowRight size={15} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Editorial Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
              Curated Selection
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Featured Studio Drops
            </h2>
          </div>
          <Link
            to="/products"
            className="mt-2 sm:mt-0 text-xs uppercase tracking-widest font-semibold text-zinc-900 hover:opacity-70 transition-opacity inline-flex items-center gap-1"
          >
            <span>Explore All 8 Pieces</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Craftsmanship Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-zinc-100 rounded-sm p-8 sm:p-14 border border-zinc-200/60">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              The Design Ethos
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-zinc-900 leading-snug">
              Every detail is considered. We eliminate non-essential ornamentation to let pure texture, raw metals, and thoughtful utility speak for themselves.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Forma was conceived for creators, developers, and writers who require enduring reliability without visual noise. Every fastener, gasket, and surface treatment undergoes rigorous ergonomic testing before release.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
