import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './config/db.js'

// Robustly load server/.env regardless of current working directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config()

// Configure PORT (defaults to 5000 if not specified in .env)
const PORT = process.env.PORT || 5000

// Initialize MongoDB Connection, then listen for incoming requests
const startServer = async () => {
  // Attempt database connection
  await connectDB()

  // Start listening for incoming HTTP requests (bound to 0.0.0.0 for universal IPv4/IPv6 localhost access)
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`=================================================`)
    console.log(`🚀 Forma Backend Server is running!`)
    console.log(`📡 Local:       http://localhost:${PORT}`)
    console.log(`📡 Network:     http://127.0.0.1:${PORT}`)
    console.log(`🩺 Health API:  http://localhost:${PORT}/api/health`)
    console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`=================================================\n`)
  })

  // Handle server startup errors gracefully (e.g. port already in use)
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another process.`)
      console.error(`👉 Change the PORT in server/.env or stop the other process.\n`)
    } else {
      console.error(`\n❌ Server error:`, error.message)
    }
    process.exit(1)
  })

  // Graceful shutdown on process termination signals (Ctrl+C / SIGTERM)
  process.on('SIGINT', () => {
    console.log(`\n🛑 Gracefully shutting down Forma server...`)
    server.close(() => {
      console.log(`✅ Server stopped cleanly. Goodbye!`)
      process.exit(0)
    })
  })
}

startServer()
