import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/products' },
    { name: 'Shopping Bag', path: '/cart' },
  ]

  const activeClass = ({ isActive }) =>
    `relative py-1 text-xs uppercase tracking-[0.16em] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 rounded-xs ${
      isActive
        ? 'text-zinc-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-zinc-950'
        : 'text-zinc-500 hover:text-zinc-950'
    }`

  return (
    <header className="sticky top-0 z-40 bg-[#fafaf8]/95 backdrop-blur-md border-b border-[#eae8e1] transition-colors">
      {/* Slim Understated Announcement Bar */}
      <div className="bg-[#121212] text-zinc-300 text-[11px] tracking-[0.14em] uppercase py-1.5 px-4 text-center font-normal flex items-center justify-center gap-2">
        <span>Complimentary express courier across India on orders over ₹4,999</span>
        <span className="hidden sm:inline text-zinc-500">•</span>
        <span className="hidden sm:inline text-zinc-400">Two-Year Studio Guarantee</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-zinc-800 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 rounded-sm"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>

          {/* Forma Brand Wordmark */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold tracking-[0.24em] uppercase text-zinc-950 hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 rounded-xs"
              aria-label="Forma Home"
            >
              Forma
            </Link>
            <span className="hidden md:inline-flex items-center text-[10px] tracking-widest uppercase px-2 py-0.5 border border-[#d8d6ce] text-zinc-600 rounded-full font-medium bg-[#f5f4ed]">
              Studio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={activeClass}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 rounded-xs"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </Link>

            {/* Cart Link with Restrained Badge */}
            <Link
              to="/cart"
              className="group relative p-2 text-zinc-900 hover:text-zinc-950 transition-colors rounded-full hover:bg-zinc-200/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900"
              aria-label={`View Shopping Bag (${totalItems} items)`}
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-semibold text-white tracking-tighter shadow-xs">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#eae8e1] bg-[#fafaf8] px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-wider uppercase py-2 transition-colors ${
                    isActive
                      ? 'font-semibold text-zinc-950 border-l-2 border-zinc-950 pl-2'
                      : 'text-zinc-600 hover:text-zinc-950 pl-2'
                  }`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-[#eae8e1] flex items-center justify-between text-xs text-zinc-500">
              <span>Forma Studio Edition</span>
              <span className="text-[11px] tracking-wider uppercase text-zinc-400">Kyoto • Berlin</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
