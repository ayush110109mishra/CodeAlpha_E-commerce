/**
 * Forma Frontend API Service
 *
 * Centralized, reusable client for interacting with the Express/MongoDB backend API.
 * Uses VITE_API_BASE_URL with safe fallback, error normalization, and request cancellation.
 */

const API_BASE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'http://localhost:5000/api'
).replace(/\/+$/, '')

/**
 * Custom Error Class for API responses
 */
export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Normalizes a product document from the API to guarantee
 * consistent field shapes for all frontend components and CartContext.
 */
export const normalizeProduct = (p) => {
  if (!p || typeof p !== 'object') return null

  // Ensure specs is a plain JavaScript object
  let specsObj = p.specs || {}
  if (specsObj instanceof Map) {
    specsObj = Object.fromEntries(specsObj.entries())
  } else if (typeof specsObj !== 'object') {
    specsObj = {}
  }

  return {
    ...p,
    // Preserve custom stable string ID (e.g. 'forma-01') falling back to MongoDB _id
    id: p.id || p._id,
    _id: p._id || p.id,
    slug: p.slug || '',
    name: p.name || 'Untitled Product',
    tagline: p.tagline || '',
    category: p.category || 'General',
    price: typeof p.price === 'number' ? p.price : 0,
    originalPrice: typeof p.originalPrice === 'number' ? p.originalPrice : null,
    // Ensure image is a singular string URL
    image: p.image || (Array.isArray(p.images) && p.images[0]) || '',
    description: p.description || '',
    features: Array.isArray(p.features) ? p.features : [],
    specs: specsObj,
    featured: Boolean(p.featured),
    inStock: p.inStock !== false
  }
}

/**
 * Fetch products list with optional search, category, sort, and pagination.
 * Supports passing an AbortSignal to cancel in-flight requests.
 */
export const fetchProducts = async (
  { search, category, sort = 'featured', page = 1, limit = 12 } = {},
  { signal } = {}
) => {
  const params = new URLSearchParams()

  if (search && typeof search === 'string' && search.trim()) {
    params.set('search', search.trim())
  }

  if (category && typeof category === 'string' && category.trim() && category.trim().toLowerCase() !== 'all') {
    params.set('category', category.trim())
  }

  // Map legacy frontend 'curated' sort to backend 'featured'
  const normalizedSort = sort === 'curated' ? 'featured' : sort
  if (normalizedSort) {
    params.set('sort', normalizedSort)
  }

  if (page) params.set('page', String(page))
  if (limit) params.set('limit', String(limit))

  const queryString = params.toString()
  const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`

  try {
    const response = await fetch(url, { signal })
    const json = await response.json().catch(() => null)

    if (!response.ok) {
      const errorMsg = json?.message || `Failed to fetch products (HTTP ${response.status})`
      throw new ApiError(errorMsg, response.status, json)
    }

    return {
      success: true,
      count: json?.count || 0,
      total: json?.total || 0,
      page: json?.page || 1,
      totalPages: json?.totalPages || 0,
      limit: json?.limit || limit,
      hasNextPage: Boolean(json?.hasNextPage),
      hasPrevPage: Boolean(json?.hasPrevPage),
      data: Array.isArray(json?.data) ? json.data.map(normalizeProduct).filter(Boolean) : []
    }
  } catch (error) {
    // If request was aborted by AbortController, rethrow as-is
    if (error.name === 'AbortError') throw error
    if (error instanceof ApiError) throw error

    throw new ApiError(
      error.message || 'Unable to connect to Forma server. Please check your network.',
      0
    )
  }
}

/**
 * Fetch a single product by its URL slug.
 * Supports passing an AbortSignal.
 */
export const fetchProductBySlug = async (slug, { signal } = {}) => {
  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    throw new ApiError('Product slug is required.', 400)
  }

  const url = `${API_BASE_URL}/products/slug/${encodeURIComponent(slug.trim())}`

  try {
    const response = await fetch(url, { signal })
    const json = await response.json().catch(() => null)

    if (!response.ok) {
      const errorMsg = json?.message || `Product not found (HTTP ${response.status})`
      throw new ApiError(errorMsg, response.status, json)
    }

    return {
      success: true,
      data: normalizeProduct(json?.data)
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error
    if (error instanceof ApiError) throw error

    throw new ApiError(
      error.message || 'Unable to connect to Forma server. Please check your network.',
      0
    )
  }
}

/**
 * Fetch a single product by its MongoDB ObjectId.
 */
export const fetchProductById = async (id, { signal } = {}) => {
  if (!id) throw new ApiError('Product ID is required.', 400)

  const url = `${API_BASE_URL}/products/${encodeURIComponent(id)}`

  try {
    const response = await fetch(url, { signal })
    const json = await response.json().catch(() => null)

    if (!response.ok) {
      const errorMsg = json?.message || `Failed to fetch product (HTTP ${response.status})`
      throw new ApiError(errorMsg, response.status, json)
    }

    return {
      success: true,
      data: normalizeProduct(json?.data)
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error
    if (error instanceof ApiError) throw error

    throw new ApiError(
      error.message || 'Unable to connect to Forma server. Please check your network.',
      0
    )
  }
}
