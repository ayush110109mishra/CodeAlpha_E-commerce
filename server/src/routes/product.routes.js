import { Router } from 'express'
import { getProducts, getProductById, getProductBySlug } from '../controllers/product.controller.js'

const router = Router()

/**
 * Product Routes
 *
 * Order is critical: /slug/:slug MUST be mounted before /:id so that Express
 * does not interpret the literal path segment "slug" as an :id parameter.
 *
 * GET /api/products           - List products with filtering, search, sort, and pagination
 * GET /api/products/slug/:slug - Get a single product by unique URL slug
 * GET /api/products/:id       - Get a single product by MongoDB ObjectId
 */
router.get('/', getProducts)
router.get('/slug/:slug', getProductBySlug)
router.get('/:id', getProductById)

export default router
