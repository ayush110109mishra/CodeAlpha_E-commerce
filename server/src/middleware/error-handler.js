/**
 * Centralized Error Handling Middleware
 * 
 * Express me error handling middleware ke liye strictly 4 parameters hone zaroori hain: (err, req, res, _next).
 * Express function ke argument count (fn.length === 4) se pehchanta hai ki yeh error handler hai.
 * 
 * Kisi bhi route me error aane par server crash hone se bachata hai
 * aur client ko structured JSON error response deta hai.
 */
export const errorHandler = (err, req, res, _next) => {
  // Agar status code pehle se set nahi hai ya default 200 hai, toh 500 (Internal Server Error) use karo
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.statusCode || 500)
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Security note: Stack trace sirf development mode me dikhao, production me nahi
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
