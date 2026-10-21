import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export default function SiteFooter() {
  return (
    <footer className="bg-[#121212] text-zinc-400 border-t border-zinc-800/80 mt-auto">
      
      {/* Customer Service Pillars */}
      <div className="border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xs bg-zinc-900 border border-zinc-800 text-zinc-200 shrink-0">
                <Truck size={18} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-200">
                  Express Delivery
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fast, tracked door-to-door courier delivery across India. Free on orders over ₹4,999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xs bg-zinc-900 border border-zinc-800 text-zinc-200 shrink-0">
                <ShieldCheck size={18} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-200">
                  Quality Assurance
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Carefully selected products designed for reliable, enjoyable everyday use.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xs bg-zinc-900 border border-zinc-800 text-zinc-200 shrink-0">
                <RotateCcw size={18} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-200">
                  30-Day Easy Returns
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hassle-free exchanges and returns within 30 days of receiving your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <Link 
              to="/" 
              className="text-xl font-bold tracking-[0.24em] uppercase text-zinc-100 inline-block hover:opacity-85 transition-opacity"
            >
              Forma
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Forma is a modern direct-to-consumer store offering a curated range of everyday essentials, tech accessories, and lifestyle goods.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest bg-zinc-900 text-zinc-300 rounded-xs border border-zinc-800">
                CodeAlpha Full Stack Project • Modern E-Commerce
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200">
              Departments
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-zinc-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-zinc-100 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tech%20%26%20Audio" className="hover:text-zinc-100 transition-colors">
                  Tech & Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=Bags%20%26%20Accessories" className="hover:text-zinc-100 transition-colors">
                  Bags & Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home%20Essentials" className="hover:text-zinc-100 transition-colors">
                  Home Essentials
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-zinc-100 transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Dispatch Column */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200">
              Newsletter
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe for new product drops, stock updates, and exclusive customer discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 rounded-l-xs focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-[#fafaf8] text-[#121212] px-3.5 py-2.5 text-xs font-medium rounded-r-xs hover:bg-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            <p className="text-[10px] text-zinc-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Bottom Subfooter */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <div>
            &copy; {CURRENT_YEAR} Forma Online Store. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Everyday essentials, thoughtfully chosen</span>
            <span>•</span>
            <span>Customer Care: support@forma.store</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
