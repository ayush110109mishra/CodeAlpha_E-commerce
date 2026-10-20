import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind class names cleanly without duplicates or conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formats numbers into standardized currency format (e.g. $129.00)
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
