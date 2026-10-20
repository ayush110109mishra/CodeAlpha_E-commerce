import { useSearchParams } from 'react-router-dom'
import { getProductsByCategory, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { ArrowUpDown, RotateCcw } from 'lucide-react'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'
  const sortBy = searchParams.get('sort') || 'curated'

  // Retrieve base filtered products
  const rawProducts = getProductsByCategory(activeCategory)

  // Apply sorting directly based on URL query parameter
  const sortedProducts = [...rawProducts].sort((a, b) => {
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

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    setSearchParams(nextParams)
  }

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
            Every instrument is engineered for tactile feedback, silent operation, and long-term durability. Filter by space or sort by specification.
          </p>
        </div>

        {/* Live Inventory Counter */}
        <div className="flex items-center gap-2 text-xs text-zinc-600 bg-white border border-[#eae8e1] px-3.5 py-2 rounded-xs self-start md:self-auto shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
          <span>Showing <strong className="text-zinc-950 font-semibold">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? 'piece' : 'pieces'}</span>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        
        {/* Category Pills Strip */}
        <div className="flex flex-wrap items-center gap-2">
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

          {activeCategory !== 'All' && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-950 ml-2 cursor-pointer underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 rounded-xs"
            >
              <RotateCcw size={12} />
              <span>Reset filter</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="catalogue-sort" className="flex items-center gap-1.5 text-xs text-zinc-500 uppercase tracking-wider font-medium">
            <ArrowUpDown size={13} />
            <span>Sort:</span>
          </label>
          <select
            id="catalogue-sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-white border border-[#eae8e1] rounded-xs px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-colors cursor-pointer shadow-2xs"
          >
            <option value="curated">Curated (Default)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A–Z)</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 text-center space-y-4 bg-white border border-dashed border-[#d8d6ce] rounded-xs">
          <p className="text-sm text-zinc-500">No pieces currently listed in this category.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs uppercase tracking-wider font-semibold text-zinc-950 underline underline-offset-4 cursor-pointer"
          >
            View all products
          </button>
        </div>
      )}

    </div>
  )
}
