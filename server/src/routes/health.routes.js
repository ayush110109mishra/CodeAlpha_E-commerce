import { Router } from 'express'
import { getHealthStatus } from '../controllers/health.controller.js'

/**
 * Health Routes
 * 
 * Router client request ke method aur path ko sahi controller ke sath map karta hai.
 * Yaha GET '/' request ko getHealthStatus controller function se connect kiya gaya hai.
 */
const router = Router()

// GET /api/health
router.get('/', getHealthStatus)

export default router
