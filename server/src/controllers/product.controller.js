import mongoose from 'mongoose'
import { Product } from '../models/product.model.js'
import { ensureDatabaseConnected } from '../config/db.js'

/**
 * Allowlisted sort fields to prevent NoSQL injection or arbitrary sorting
 */
const SORT_OPTIONS = {
  'featured': { featured: -1, createdAt: -1 },
  'price-asc': { price: 1, _id: 1 },
  'price-desc': { price: -1, _id: 1 },
  'name-asc': { name: 1, _id: 1 },
  'name-desc': { name: -1, _id: 1 },
  'newest': { createdAt: -1, _id: 1 },
  'oldest': { createdAt: 1, _id: 1 }
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12
const MAX_LIMIT = 50

/**
 * Utility to safely escape special characters in regular expressions
 */
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * GET /api/products
 *
 * Retrieves products with optional search, category filter, safe sorting, and pagination.
 */
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, sort = 'featured', page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query

    // 1. Validate Pagination Query Parameters
    const parsedPage = Number(page)
    const parsedLimit = Number(limit)

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid "page" parameter. Must be a positive integer greater than or equal to 1.'
      })
    }

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > MAX_LIMIT) {
      return res.status(400).json({
        success: false,
        message: `Invalid "limit" parameter. Must be a positive integer between 1 and ${MAX_LIMIT}.`
      })
    }

    // 2. Validate Sort Query Parameter
    if (!SORT_OPTIONS[sort]) {
      return res.status(400).json({
        success: false,
        message: `Invalid "sort" parameter. Allowed options: ${Object.keys(SORT_OPTIONS).join(', ')}`
      })
    }

    // 3. Check/ensure database connection health
    const isConnected = await ensureDatabaseConnected()
    if (!isConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again shortly.'
      })
    }

    // 4. Build MongoDB Query Filter
    const filter = {}

    // Category filter (case-insensitive exact match)
    if (category && typeof category === 'string' && category.trim() && category.trim().toLowerCase() !== 'all') {
      filter.category = { $regex: new RegExp(`^${escapeRegex(category.trim())}$`, 'i') }
    }

    // Search filter across name, description, and tagline
    if (search && typeof search === 'string' && search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), 'i')
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { tagline: searchRegex }
      ]
    }

    // 5. Execute Count & Query with Pagination
    const skip = (parsedPage - 1) * parsedLimit
    const sortCriteria = SORT_OPTIONS[sort]

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort(sortCriteria)
        .skip(skip)
        .limit(parsedLimit)
        .lean()
    ])

    const totalPages = Math.ceil(total / parsedLimit) || 0

    // 6. Return Structured JSON Response
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parsedPage,
      totalPages,
      limit: parsedLimit,
      hasNextPage: parsedPage < totalPages,
      hasPrevPage: parsedPage > 1,
      data: products
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/products/:id
 *
 * Retrieves a single product by its MongoDB ObjectId.
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params

    // 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid product ID format: "${id}". Must be a 24-character hexadecimal ObjectId.`
      })
    }

    // 2. Check/ensure database connection health
    const isConnected = await ensureDatabaseConnected()
    if (!isConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again shortly.'
      })
    }

    // 3. Query Product by _id
    const product = await Product.findById(id).lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with ID: ${id}`
      })
    }

    // 4. Return Product
    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/products/slug/:slug
 *
 * Retrieves a single product by its unique URL slug.
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params

    if (!slug || typeof slug !== 'string' || !slug.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A valid product slug is required.'
      })
    }

    const cleanSlug = slug.trim().toLowerCase()

    // 1. Check/ensure database connection health
    const isConnected = await ensureDatabaseConnected()
    if (!isConnected && mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again shortly.'
      })
    }

    // 2. Query Product by unique slug
    const product = await Product.findOne({ slug: cleanSlug }).lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with slug: "${cleanSlug}"`
      })
    }

    // 3. Return Product
    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}
