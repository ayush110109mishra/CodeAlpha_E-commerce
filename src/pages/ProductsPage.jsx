import { useSearchParams } from 'react-router-dom'
import { getAllProducts, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { Search, ArrowUpDown, RotateCcw, X } from 'lucide-react'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') || 'All'
  const sortBy = searchParams.get('sort') || 'curated'
  const searchQuery = searchParams.get('q') || ''

  // 1. Base inventory
  const allProducts = getAllProducts()

  // 2. Filter by Category
  const categoryFiltered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(
        (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
      )

  // 3. Filter by Search Query across name, category, tagline, description, features, & specs
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const searchFiltered = normalizedQuery
    ? categoryFiltered.filter((product) => {
        const matchName = product.name.toLowerCase().includes(normalizedQuery)
        const matchCategory = product.category.toLowerCase().includes(normalizedQuery)
        const matchTagline = product.tagline?.toLowerCase().includes(normalizedQuery)
        const matchDescription = product.description?.toLowerCase().includes(normalizedQuery)
        const matchFeatures = product.features?.some((feature) =>
          feature.toLowerCase().includes(normalizedQuery)
        )
        const matchSpecs =
          product.specs &&
          Object.values(product.specs).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(normalizedQuery)
          )

        return (
          matchName ||
          matchCategory ||
          matchTagline ||
          matchDescription ||
          matchFeatures ||
          matchSpecs
        )
      })
    : categoryFiltered

  // 4. Apply Sorting (non-mutating clone)
  const sortedProducts = [...searchFiltered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'curated':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  // URL query parameter handlers
  const handleSearchChange = (value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value) {
      nextParams.set('q', value)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
  }

  const handleClearSearch = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('q')
    setSearchParams(nextParams, { replace: true })
  }

  const handleCategorySelect = (category) => {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'All') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    setSearchParams(nextParams)
  }

  const handleSortChange = (newSort) => {
    const nextParams = new URLSearchParams(searchParams)
    if (newSort === 'curated') {
      nextParams.delete('sort')
    } else {
      nextParams.set('sort', newSort)
    }
    setSearchParams(nextParams)
  }

  const handleResetAll = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    nextParams.delete('q')
    setSearchParams(nextParams)
  }

  const hasActiveFilters = activeCategory !== 'All' || Boolean(searchQuery.trim())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
      
      {/* Catalogue Header & Description */}
      <div className="border-b border-[#eae8e1] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
              Forma Archive
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-[11px] text-zinc-500 tracking-wider">
              {activeCategory === 'All' ? 'Complete Collection' : `${activeCategory} Series`}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            The Catalogue
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl leading-relaxed">
            Every instrument is engineered for tactile feedback, silent operation, and long-term durability. Search by specification or filter by workspace series.
          </p>
        </div>
      </div>

      {/* Filter, Search & Sort Toolbar */}
      <div className="space-y-4">
        
        {/* Row 1: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Polish & Familiar Accessible Search Input */}
          <div className="relative flex-1 w-full max-w-2xl">
            <label htmlFor="catalogue-search" className="sr-only">
              Search products, brands and categories
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search size={18} strokeWidth={2} />
            </div>
            <input
              id="catalogue-search"
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products, brands and categories"
              className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-[#d0cdc4] hover:border-zinc-400 rounded-xs text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/15 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors"
                aria-label="Clear search input"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <label htmlFor="catalogue-sort" className="flex items-center gap-1.5 text-xs text-zinc-500 uppercase tracking-wider font-medium">
              <ArrowUpDown size={13} />
              <span>Sort:</span>
            </label>
            <select
              id="catalogue-sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white border border-[#d0cdc4] hover:border-zinc-400 rounded-xs px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/15 transition-all cursor-pointer shadow-2xs"
            >
              <option value="curated">Curated (Default)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A–Z)</option>
            </select>
          </div>

        </div>

        {/* Row 2: Category Pills Strip & Reset Action */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase()
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] rounded-xs transition-all cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 ${
                  isSelected
                    ? 'bg-[#121212] text-[#fafaf8] shadow-xs'
                    : 'bg-[#f4f3ed] text-zinc-600 hover:bg-[#e9e7df] hover:text-zinc-950 border border-[#eae8e1]'
                }`}
              >
                {cat}
              </button>
            )
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-950 ml-2 cursor-pointer underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 rounded-xs"
            >
              <RotateCcw size={12} />
              <span>Reset filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Product Grid or Polished Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Polished Empty Results State */
        <div className="py-20 sm:py-24 text-center space-y-4 bg-white border border-[#eae8e1] rounded-xs px-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#f5f4ed] flex items-center justify-center text-zinc-500 border border-[#eae8e1]">
            <Search size={20} strokeWidth={1.5} />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-semibold text-zinc-950">
              No matching pieces found
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {searchQuery && activeCategory !== 'All' ? (
                <>No items found matching &ldquo;<span className="font-medium text-zinc-800">{searchQuery}</span>&rdquo; in the <span className="font-medium text-zinc-800">{activeCategory}</span> series.</>
              ) : searchQuery ? (
                <>No items found matching &ldquo;<span className="font-medium text-zinc-800">{searchQuery}</span>&rdquo; across all collections.</>
              ) : (
                <>No pieces currently catalogued in the <span className="font-medium text-zinc-800">{activeCategory}</span> series.</>
              )}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121212] text-[#fafaf8] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Clear search & filters</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
