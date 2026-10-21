/**
 * 404 Not Found Middleware
 * 
 * Jab koi client kisi aise route/URL par request bhejta hai jo hamare server me defined nahi hai,
 * tab yeh middleware trigger hota hai aur HTML error page ke badle clean JSON 404 return karta hai.
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} — Route not found`
  })
}
