import { getDatabaseStatus } from '../config/db.js'

/**
 * Health Controller
 * 
 * Returns current API status, database connection status,
 * server uptime, and timestamp.
 */
export const getHealthStatus = (req, res) => {
  const dbStatus = getDatabaseStatus()

  res.status(200).json({
    success: true,
    message: 'Forma API is running',
    data: {
      status: 'healthy',
      database: dbStatus,
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString()
    }
  })
}
