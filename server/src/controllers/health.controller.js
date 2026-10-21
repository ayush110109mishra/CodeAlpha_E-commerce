/**
 * Health Controller
 * 
 * Controller handles the request and sends back a response.
 * Yeh function tab execute hota hai jab client GET /api/health par request bhejta hai.
 */
export const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Forma API is running',
    data: {
      status: 'healthy',
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString()
    }
  })
}
