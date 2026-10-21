import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind class names cleanly without duplicates or conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formats numbers into standardized Indian Rupee currency format (e.g. ₹18,900)
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
