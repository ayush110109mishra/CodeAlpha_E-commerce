import { RouterProvider } from 'react-router-dom'
import { router } from './router'

/**
 * Root Application Component
 * Provides the router context to the entire application.
 */
export default function App() {
  return <RouterProvider router={router} />
}
