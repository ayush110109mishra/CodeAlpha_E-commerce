import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthRoutes from './routes/health.routes.js'
import { notFound } from './middleware/not-found.js'
import { errorHandler } from './middleware/error-handler.js'

// Load environment variables from .env
dotenv.config()

const app = express()

// ----------------------------------------------------
// 1. CORS Configuration (Controlled cross-origin access)
// ----------------------------------------------------
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
const allowedOrigins = [
  clientUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, postman, direct tools) or matching allowed frontend origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS policy: Origin ${origin} is not allowed access`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

// ----------------------------------------------------
// 2. Body Parser Middleware
// ----------------------------------------------------
// Incoming JSON requests ko parse karta hai taaki req.body me access mil sake
app.use(express.json())

// URL-encoded form data parse karne ke liye
app.use(express.urlencoded({ extended: true }))

// ----------------------------------------------------
// 3. API Routes
// ----------------------------------------------------
// Mount health check route under /api/health
app.use('/api/health', healthRoutes)

// Root route friendly welcome
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Forma E-Commerce API',
    endpoints: {
      health: '/api/health'
    }
  })
})

// ----------------------------------------------------
// 4. Fallback 404 & Centralized Error Handlers
// ----------------------------------------------------
// Agar request kisi defined route se match nahi hui, toh 404 JSON response do
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app
