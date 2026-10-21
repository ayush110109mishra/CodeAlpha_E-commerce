import { createContext, useContext, useState, useMemo } from 'react'

/**
 * Shared Shopping Cart Context for Forma
 *
 * Provides shared frontend state for the shopping bag across the application.
 * Manages cart item storage, quantity changes, additions, removals, and derived
 * totals (item count, subtotal) without persistent storage in this phase.
 */
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // In-memory cart items array: [{ product, quantity }]
  const [cartItems, setCartItems] = useState([])

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
   * Clamps the minimum quantity to 1. Removal is an explicit action via removeFromCart.
   */
  const updateQuantity = (productId, quantity) => {
    const validQty = Math.max(1, Math.floor(quantity) || 1)

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    )
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
