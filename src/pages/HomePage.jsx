import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Layers, ShieldCheck, Eye } from 'lucide-react'
import { getAllProducts, getFeaturedProducts, getCategoryMetadata } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function HomePage() {
  const allProducts = getAllProducts()
  const allFeatured = getFeaturedProducts()
  const categories = getCategoryMetadata()

  // Curate diverse category representation across the 4 featured cards
  // (Carry -> Workstation Dock -> Audio -> Keyboard)
  const curatedFeatured = [
    allFeatured.find((p) => p.category === 'Carry') || allFeatured[2],
    allFeatured.find((p) => p.slug === 'atlas-magsafe-desk-stand') || allFeatured[3],
    allFeatured.find((p) => p.category === 'Audio') || allFeatured[1],
    allFeatured.find((p) => p.slug === 'komorebi-mechanical-keyboard') || allFeatured[0],
  ].filter(Boolean)

  // Signature Collection: "Objects for the in-between" (Morning ritual, transit, late-night)
  const inBetweenProducts = [
    allProducts.find((p) => p.slug === 'oblique-ceramic-coffee-tumbler'),
    allProducts.find((p) => p.slug === 'nomad-ballistic-tech-organizer'),
    allProducts.find((p) => p.slug === 'strata-ambient-desk-lamp'),
  ].filter(Boolean)

  return (
    <div className="flex flex-col space-y-20 sm:space-y-28 pb-24">
      
      {/* 1. CINEMATIC LIFESTYLE CAMPAIGN HERO */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141414] text-[#fafaf8] rounded-xs overflow-hidden border border-zinc-800 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[600px]">
              
              {/* Left Column: Multi-Category Editorial Narrative */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
                <div className="space-y-6 max-w-xl">
                  {/* Subtle Studio Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-medium bg-zinc-800/90 border border-zinc-700/70 rounded-full text-zinc-300">
                    <Sparkles size={11} className="text-zinc-400" />
                    <span>Multi-Discipline Studio • Autumn Campaign</span>
                  </div>

                  {/* Confident Headline with Editorial Typography */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] text-zinc-100">
                    Essential objects for <span className="font-serif-editorial italic font-normal text-white">modern workspaces</span> and considered living.
                  </h1>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
                    Forma curates architectural workstation tools, spatial acoustic instruments, vegetable-tanned leather carry, and ambient living pieces engineered to quiet the mind.
                  </p>
                </div>

                {/* Hero Actions & Multi-Category Micro-Strip */}
                <div className="pt-8 sm:pt-12 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 bg-[#fafaf8] text-[#121212] hover:bg-white text-xs uppercase tracking-[0.16em] font-semibold px-6 py-3.5 rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/products?category=Audio"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-zinc-300 hover:text-white px-5 py-3.5 border border-zinc-700/80 hover:border-zinc-500 rounded-xs transition-colors"
                    >
                      <span>Acoustic Fidelity</span>
                    </Link>
                  </div>

                  {/* Multi-discipline index strip */}
                  <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-zinc-400 tracking-wider">
                    <span>01 Workstation</span>
                    <span className="text-zinc-700">•</span>
                    <span>02 Audio</span>
                    <span className="text-zinc-700">•</span>
                    <span>03 Everyday Carry</span>
                    <span className="text-zinc-700">•</span>
                    <span>04 Living Space</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Wide Landscape Lifestyle Scene */}
              <div className="lg:col-span-5 relative bg-zinc-900 overflow-hidden min-h-[340px] lg:min-h-full group">
                <img
                  src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1800&q=80"
                  alt="Forma curated lifestyle workspace scene with natural oak, lamp, audio gear, and thoughtful study objects"
                  className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-zinc-950/60 lg:to-transparent" />

                {/* Subtle Cinematic Crop Marker */}
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-zinc-300 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-xs border border-white/10 font-mono">
                  FRAME 01 // 35MM STUDIO STILL
                </div>

                {/* Floating Campaign Spotlight: Highlighting Audio / Studio Monolith */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#121212]/90 backdrop-blur-md border border-zinc-700/80 p-3.5 rounded-xs text-white max-w-xs shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                        Studio Drop Spotlight
                      </div>
                      <div className="text-xs font-semibold text-zinc-100 truncate">
                        Studio Monolith Headphones
                      </div>
                    </div>
                    <Link
                      to="/products/studio-monolith-wireless-headphones"
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-zinc-200 transition-colors shrink-0"
                      aria-label="View Studio Monolith Headphones"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY DISCOVERY TILES (4 Unique Visual Worlds) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eae8e1]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Curated Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
              Explore by Space
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Complete Catalogue</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group relative flex flex-col bg-white border border-[#eae8e1] rounded-xs overflow-hidden hover:border-zinc-400 transition-all duration-300"
            >
              {/* Category-Specific Photography with Cinematic Hover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f3ed]">
                <img
                  src={cat.image}
                  alt={`${cat.name} collection`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />

                {/* Count Badge */}
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/90 backdrop-blur-xs text-zinc-800 font-medium rounded-xs shadow-2xs">
                  {cat.itemCount} {cat.itemCount === 1 ? 'Piece' : 'Pieces'}
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
                  <span>View Series</span>
                  <span className="text-zinc-300">•</span>
                  <span>In Stock</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. DIVERSIFIED FEATURED STUDIO DROPS (Non-repetitive merchandise) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eae8e1]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
              Featured Studio Drops
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:opacity-75 transition-opacity inline-flex items-center gap-1.5"
          >
            <span>View All 8 Pieces</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {curatedFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. ONE SIGNATURE EDITORIAL FEATURE: "Objects for the in-between" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f4ed] border border-[#eae8e1] rounded-xs p-6 sm:p-10 lg:p-12 space-y-8">
          
          {/* Feature Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#eae8e1]">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-zinc-500">
                Signature Feature • Volume 02
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950">
                Objects for the <span className="font-serif-editorial italic font-normal text-zinc-900">in-between</span>.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Pieces designed for the spaces between focused sessions — the morning pour-over, the walk across town, and the quiet hour before sleep.
              </p>
            </div>

            <Link
              to="/products?category=Living"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-900 hover:opacity-75 self-start md:self-auto transition-opacity"
            >
              <span>Explore Living & Carry</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Cinematic Anchor Image + 3 Curated In-Between Objects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Cinematic Still Life Photo */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-xs bg-[#e9e7df] min-h-[300px] lg:min-h-full border border-[#eae8e1] group">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                alt="Quiet transitional still-life with ceramic vessels and morning shadow"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-cinematic group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-zinc-300 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-xs border border-white/10 font-mono">
                FRAME 02 // TRANSLUCENT STILL
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px]">
                <span className="tracking-widest uppercase text-zinc-200">The Transitional Ritual</span>
                <span className="text-zinc-300">Kyoto Studio Still</span>
              </div>
            </div>

            {/* 3 Dedicated In-Between Pieces */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {inBetweenProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 5. BRAND & MATERIAL CRAFTSMANSHIP (Tactile Design Principles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f4ed] border border-[#eae8e1] rounded-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Story & Philosophy */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-zinc-500">
                  Forma Design Philosophy
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-zinc-950 leading-snug">
                  We eliminate disposable plastics and decorative noise in favor of <span className="font-serif-editorial italic font-normal text-zinc-900">monolithic metals</span>, natural cork, and vegetable-tanned hides.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                  Every instrument undergoes structural evaluation for tactile weight, surface resonance, and thermal comfort. We design pieces that patina gracefully with decades of daily use.
                </p>
              </div>

              {/* Material Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#eae8e1]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Layers size={14} className="text-zinc-600" />
                    <span>6063 Aluminum</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Precision CNC unibody milling for zero deck deflection.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <ShieldCheck size={14} className="text-zinc-600" />
                    <span>Tuscan Leather</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Vegetable-tanned hides developing deep organic luster.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Eye size={14} className="text-zinc-600" />
                    <span>Pure Ergonomics</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Tested angles that quiet the desk and comfort the wrists.
                  </p>
                </div>
              </div>
            </div>

            {/* Tactile Material Reference Photo */}
            <div className="lg:col-span-5 relative bg-zinc-200 min-h-[300px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1000&q=80"
                alt="Tactile walnut wood and desk textures"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[10px] uppercase tracking-widest text-zinc-700 px-3 py-1 rounded-xs">
                Studio Material Reference
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
