import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CartProvider } from '../context/CartContext'

/**
 * Root Application Component
 * Provides both the shared CartContext and the router context to the entire application.
 */
export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
