import { useSearchParams } from 'react-router-dom'
import { getProductsByCategory, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  const products = getProductsByCategory(activeCategory)

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      searchParams.delete('category')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ category })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
      
      {/* Header Banner */}
      <div className="border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold">
            Forma Storefront
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight mt-1">
            The Catalogue
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-xl">
            Explore our curated inventory of minimal desktop gear, audio fidelity instruments, and tailored everyday accessories.
          </p>
        </div>

        {/* Count & Status */}
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>Showing <strong className="text-zinc-900 font-semibold">{products.length}</strong> {products.length === 1 ? 'item' : 'items'}</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 uppercase tracking-wider mr-2">
          <SlidersHorizontal size={13} />
          <span>Filter:</span>
        </div>
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory.toLowerCase() === cat.toLowerCase()
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-950 text-white font-medium shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          )
        })}

        {activeCategory !== 'All' && (
          <button
            type="button"
            onClick={() => handleCategorySelect('All')}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-950 ml-2 cursor-pointer underline underline-offset-4"
          >
            <RotateCcw size={12} />
            Reset filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-zinc-50 border border-dashed border-zinc-300 rounded-sm">
          <p className="text-sm text-zinc-500">No products found in this category.</p>
          <button
            type="button"
            onClick={() => handleCategorySelect('All')}
            className="text-xs uppercase tracking-wider font-semibold text-zinc-900 underline underline-offset-4"
          >
            View all products
          </button>
        </div>
      )}

    </div>
  )
}
