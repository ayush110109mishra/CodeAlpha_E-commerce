import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, normalizeCategory } from '../data/products'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/products/ProductCard'
import { Search, ArrowUpDown, RotateCcw, X, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawCategory = searchParams.get('category') || 'All'
  const activeCategory = normalizeCategory(rawCategory)
  const sortBy = searchParams.get('sort') || 'curated'
  const urlSearchQuery = searchParams.get('q') || ''
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  const currentPage = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1

  // Local immediate search input state for instant typing responsiveness
  const [searchInput, setSearchInput] = useState(urlSearchQuery)
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlSearchQuery)

  if (prevUrlQuery !== urlSearchQuery) {
    setPrevUrlQuery(urlSearchQuery)
    setSearchInput(urlSearchQuery)
  }

  // API Data State
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryTrigger, setRetryTrigger] = useState(0)

  // Debounce search input changes into URL search parameters (300ms)
  const isFirstMount = useRef(true)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    const timer = setTimeout(() => {
      const trimmed = searchInput.trim()
      const currentUrlQ = searchParams.get('q') || ''

      if (trimmed !== currentUrlQ) {
        setLoading(true)
        const nextParams = new URLSearchParams(searchParams)
        if (trimmed) {
          nextParams.set('q', trimmed)
        } else {
          nextParams.delete('q')
        }
        // Reset to page 1 on new search query
        nextParams.delete('page')
        setSearchParams(nextParams, { replace: true })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, searchParams, setSearchParams])

  // Fetch products from backend whenever filters, sort, page, or retryTrigger change
  useEffect(() => {
    const controller = new AbortController()

    const normalizedQuery = urlSearchQuery.trim()

    fetchProducts(
      {
        search: normalizedQuery || undefined,
        category: activeCategory !== 'All' ? activeCategory : undefined,
        sort: sortBy,
        page: currentPage,
        limit: 12,
      },
      { signal: controller.signal }
    )
      .then((res) => {
        setProducts(res.data || [])
        setPagination({
          page: res.page || 1,
          totalPages: res.totalPages || 1,
          total: res.total || 0,
        })
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return // Cancelled by subsequent request
        }
        console.error('Forma: Catalogue fetch failed:', err)
        setError(err.message || 'Unable to connect to Forma catalogue server.')
        setLoading(false)
      })

    return () => controller.abort()
  }, [urlSearchQuery, activeCategory, sortBy, currentPage, retryTrigger])

  // URL query parameter handlers
  const handleClearSearch = () => {
    setSearchInput('')
    setLoading(true)
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('q')
    nextParams.delete('page')
    setSearchParams(nextParams, { replace: true })
  }

  const handleCategorySelect = (category) => {
    setLoading(true)
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'All') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleSortChange = (newSort) => {
    setLoading(true)
    const nextParams = new URLSearchParams(searchParams)
    if (newSort === 'curated') {
      nextParams.delete('sort')
    } else {
      nextParams.set('sort', newSort)
    }
    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleResetAll = () => {
    setSearchInput('')
    setLoading(true)
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    nextParams.delete('q')
    nextParams.delete('page')
    nextParams.delete('sort')
    setSearchParams(nextParams)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === currentPage) return
    setLoading(true)
    const nextParams = new URLSearchParams(searchParams)
    if (newPage === 1) {
      nextParams.delete('page')
    } else {
      nextParams.set('page', String(newPage))
    }
    setSearchParams(nextParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setLoading(true)
    setRetryTrigger((prev) => prev + 1)
  }

  const hasActiveFilters = activeCategory !== 'All' || Boolean(urlSearchQuery.trim())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
      
      {/* Catalogue Header & Description */}
      <div className="border-b border-[#eae8e1] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
              Forma Store
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-[11px] text-zinc-500 tracking-wider">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            All Products
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl leading-relaxed">
            Explore our curated collection of everyday essentials, tech accessories, carry goods, and home objects.
          </p>
        </div>

        {/* Live Catalogue Count & Status Indicator */}
        <div className="text-xs text-zinc-500 flex items-center gap-2">
          {loading ? (
            <span className="inline-flex items-center gap-1.5 text-zinc-400">
              <Loader2 size={13} className="animate-spin" />
              <span>Updating catalogue...</span>
            </span>
          ) : !error ? (
            <span>
              Showing {products.length} of {pagination.total} {pagination.total === 1 ? 'item' : 'items'}
            </span>
          ) : null}
        </div>
      </div>

      {/* Filter, Search & Sort Toolbar */}
      <div className="space-y-4">
        
        {/* Row 1: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Accessible Debounced Search Input */}
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products, brands and categories"
              className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-[#d0cdc4] hover:border-zinc-400 rounded-xs text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/15 transition-all shadow-2xs"
            />
            {searchInput && (
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

      {/* Main Content: Loading Skeletons, Error Banner, Empty State, or Product Grid */}
      {loading ? (
        /* Clean Skeleton Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-[#eae8e1] rounded-xs overflow-hidden animate-pulse flex flex-col"
            >
              <div className="aspect-[4/3] sm:aspect-[1/1] bg-[#eae8e1]" />
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2.5 bg-[#eae8e1] rounded-xs w-1/3" />
                  <div className="h-4 bg-[#eae8e1] rounded-xs w-3/4" />
                  <div className="h-3 bg-[#eae8e1] rounded-xs w-full" />
                </div>
                <div className="pt-3 border-t border-[#f0eee6] flex items-center justify-between">
                  <div className="h-4 bg-[#eae8e1] rounded-xs w-1/4" />
                  <div className="h-7 bg-[#eae8e1] rounded-xs w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error State with Retry Button */
        <div className="py-16 sm:py-20 text-center space-y-4 bg-white border border-[#eae8e1] rounded-xs px-6 max-w-2xl mx-auto shadow-2xs">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
            <AlertCircle size={22} strokeWidth={1.75} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-zinc-950">
              Unable to load products
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              {error}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121212] text-[#fafaf8] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-black transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="px-4 py-2.5 text-xs text-zinc-600 hover:text-zinc-950 border border-[#d0cdc4] rounded-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : products.length > 0 ? (
        /* Product Grid */
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pt-8 border-t border-[#eae8e1] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#eae8e1] bg-white text-zinc-700 hover:bg-[#f4f3ed] hover:text-zinc-950 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                  const pNum = idx + 1
                  const isCurrent = pNum === currentPage
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => handlePageChange(pNum)}
                      className={`w-8 h-8 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#121212] text-[#fafaf8]'
                          : 'bg-white text-zinc-600 hover:bg-[#f4f3ed] hover:text-zinc-950 border border-[#eae8e1]'
                      }`}
                    >
                      {pNum}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= pagination.totalPages}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#eae8e1] bg-white text-zinc-700 hover:bg-[#f4f3ed] hover:text-zinc-950 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty Results State */
        <div className="py-20 sm:py-24 text-center space-y-4 bg-white border border-[#eae8e1] rounded-xs px-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#f5f4ed] flex items-center justify-center text-zinc-500 border border-[#eae8e1]">
            <Search size={20} strokeWidth={1.5} />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-semibold text-zinc-950">
              No matching products found
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {urlSearchQuery && activeCategory !== 'All' ? (
                <>No items found matching &ldquo;<span className="font-medium text-zinc-800">{urlSearchQuery}</span>&rdquo; in the <span className="font-medium text-zinc-800">{activeCategory}</span> category.</>
              ) : urlSearchQuery ? (
                <>No items found matching &ldquo;<span className="font-medium text-zinc-800">{urlSearchQuery}</span>&rdquo; across all products.</>
              ) : (
                <>No products currently found in the <span className="font-medium text-zinc-800">{activeCategory}</span> category.</>
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
