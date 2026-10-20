import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart' },
  ]

  const activeClass = ({ isActive }) =>
    isActive
      ? 'text-zinc-950 font-medium border-b border-zinc-950 pb-0.5'
      : 'text-zinc-500 hover:text-zinc-900 transition-colors pb-0.5'

  return (
    <header className="sticky top-0 z-40 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-[11px] uppercase tracking-[0.2em] py-2 px-4 text-center font-medium">
        Complimentary express courier on orders over $150
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-zinc-700 hover:text-zinc-950 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold tracking-[0.28em] uppercase text-zinc-950 hover:opacity-80 transition-opacity"
            >
              Forma
            </Link>
            <span className="hidden md:inline-block ml-4 text-[10px] tracking-widest uppercase px-2 py-0.5 border border-zinc-300 text-zinc-500 rounded-full">
              Studio Edition
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
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

          {/* Action / Utilities */}
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="hidden lg:inline-flex items-center gap-1 text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={14} />
            </Link>

            {/* Cart Icon Link */}
            <Link
              to="/cart"
              className="relative p-2 text-zinc-800 hover:text-zinc-950 transition-colors rounded-full hover:bg-zinc-100"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-medium text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-200 bg-zinc-50 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-sm font-semibold tracking-wider uppercase text-zinc-950 py-1'
                    : 'text-sm tracking-wider uppercase text-zinc-600 hover:text-zinc-900 py-1'
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-zinc-200 text-xs text-zinc-500">
              Forma Lifestyle & Tech Accessories
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
