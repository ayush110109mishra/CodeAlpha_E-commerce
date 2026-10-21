import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getProductById } from '../data/products'

/**
 * Storage key for persisting cart items in browser localStorage.
 */
export const CART_STORAGE_KEY = 'forma-cart'

/**
 * Safely loads and validates initial cart items from browser localStorage.
 * Handles missing localStorage, malformed JSON, corrupted data, invalid product IDs,
 * non-positive or non-integer quantities, and duplicate entries.
 */
function getInitialCart() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const validItems = []
    const seenProductIds = new Set()

    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue

      // Support productId, id, or nested product.id for robustness
      const productId = item.productId || item.id || item.product?.id
      if (!productId || typeof productId !== 'string') continue

      // Prevent duplicate cart entries for the same product
      if (seenProductIds.has(productId)) continue

      // Validate that quantity is a finite positive integer >= 1
      const numQty = Number(item.quantity)
      if (!Number.isFinite(numQty) || numQty <= 0) continue
      const quantity = Math.max(1, Math.floor(numQty))

      // Validate that the product reference exists in the active catalogue
      const product = getProductById(productId)
      if (!product) continue

      seenProductIds.add(productId)
      validItems.push({ product, quantity })
    }

    return validItems
  } catch (error) {
    console.warn('Forma: Failed to parse stored cart from localStorage:', error)
    return []
  }
}

/**
 * Shared Shopping Cart Context for Forma
 *
 * Provides shared frontend state for the shopping bag across the application.
 * Manages cart item storage with automatic localStorage persistence, quantity updates,
 * additions, removals, and derived totals without persisting derived data.
 */
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Initialize cart items from validated localStorage data
  const [cartItems, setCartItems] = useState(getInitialCart)

  // Persist cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return

    try {
      // Persist only clean identifier and quantity tuples (no derived values)
      const serialized = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized))
    } catch (error) {
      console.warn('Forma: Failed to save cart to localStorage:', error)
    }
  }, [cartItems])

  /**
   * Adds a product to the cart with the specified quantity.
   * If the item already exists, its quantity is incremented.
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return
    const addQty = Math.max(1, Math.floor(quantity) || 1)

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      )

      if (existingIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + addQty }
            : item
        )
      }

      return [...prevItems, { product, quantity: addQty }]
    })
  }

  /**
   * Removes an item completely from the cart by its product ID.
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    )
  }

  /**
   * Updates the quantity of a product in the cart.
   * If the target quantity is 0 or less, the item is removed from the cart.
   */
  const updateQuantity = (productId, quantity) => {
    const numQty = Number(quantity)
    if (!Number.isFinite(numQty)) return

    const validQty = Math.floor(numQty)

    setCartItems((prevItems) => {
      if (validQty <= 0) {
        return prevItems.filter((item) => item.product.id !== productId)
      }

      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    })
  }

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setCartItems([])
  }

  /**
   * Derived total count of all units in the cart.
   */
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  /**
   * Derived monetary subtotal of all items in the cart.
   */
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  )

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [cartItems, totalItems, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Custom hook for consuming the CartContext.
 * Ensures the component is wrapped within CartProvider.
 */
// oxlint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
