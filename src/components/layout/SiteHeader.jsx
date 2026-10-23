import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'
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
    `relative py-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs ${
      isActive
        ? 'text-[#121212] font-semibold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#121212]'
        : 'text-[#64645f] hover:text-[#121212]'
    }`

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e5dc] transition-colors">
      {/* Top Ticker / Announcement Bar */}
      <div className="bg-[#121212] text-zinc-300 text-[11px] tracking-[0.18em] uppercase py-2 px-4 text-center font-normal flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#ccff00]" />
          <span>Complimentary express courier across India on orders over ₹4,999</span>
        </span>
        <span className="hidden sm:inline text-zinc-600">•</span>
        <span className="hidden sm:inline text-zinc-400">Easy 30-Day Returns</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#121212] hover:bg-[#f3f0e9] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>

          {/* Forma Brand Wordmark with Electric Lime Accent */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="group flex items-center gap-1.5 text-xl sm:text-2xl font-bold tracking-[0.28em] uppercase text-[#121212] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs"
              aria-label="Forma Home"
            >
              <span>Forma</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] ring-2 ring-[#121212] transition-transform duration-300 group-hover:scale-125" />
            </Link>
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
              className="hidden lg:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#64645f] hover:text-[#121212] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212] rounded-xs"
            >
              <span>Explore Store</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </Link>

            {/* Cart Link with Tactile Dynamic Badge */}
            <Link
              to="/cart"
              className="group relative p-2.5 text-[#121212] hover:bg-[#f3f0e9] transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#121212]"
              aria-label={`View Shopping Bag (${totalItems} items)`}
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#121212] text-[10px] font-bold text-[#ccff00] tracking-tighter shadow-xs border border-[#121212] group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#e8e5dc] bg-[#faf8f5] px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xs tracking-[0.18em] uppercase py-2 transition-colors ${
                    isActive
                      ? 'font-bold text-[#121212] border-l-2 border-[#121212] pl-2.5 bg-[#f3f0e9]/50'
                      : 'text-[#64645f] hover:text-[#121212] pl-2.5'
                  }`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-[#e8e5dc] flex items-center justify-between text-xs text-[#64645f]">
              <span className="font-serif-editorial italic">Designed for daily ritual</span>
              <span className="text-[10px] tracking-widest uppercase text-[#121212] font-semibold bg-[#ccff00] px-2 py-0.5 rounded-xs">
                In Stock
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
