import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export default function SiteFooter() {

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 mt-auto">
      {/* Editorial Value Pillars */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-100">
                <Truck size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-100">
                  Global Express Courier
                </h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Fast, tracked door-to-door delivery with carbon-neutral transit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-100">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-100">
                  Two-Year Studio Warranty
                </h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Precision-built to endure daily wear with uncompromised materials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-100">
                <RotateCcw size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-100">
                  30-Day Evaluation Period
                </h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Try pieces in your daily workflow. Hassle-free exchanges and returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="text-xl font-bold tracking-[0.28em] uppercase text-zinc-100 inline-block">
              Forma
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Forma designs tactile instruments, minimalist workstation goods, and everyday carry pieces built for focused minds and enduring spaces.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 text-[11px] uppercase tracking-wider bg-zinc-900 text-zinc-300 rounded border border-zinc-800">
                CodeAlpha Internship Project • Phase 1 Foundation
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-zinc-100 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-zinc-100 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Workstation" className="hover:text-zinc-100 transition-colors">
                  Workstation Essentials
                </Link>
              </li>
              <li>
                <Link to="/products?category=Audio" className="hover:text-zinc-100 transition-colors">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-zinc-100 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200">
              The Dispatch
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated notes on industrial design, studio releases, and exclusive limited drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 rounded-l-md focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-zinc-100 text-zinc-950 px-3.5 py-2.5 text-xs font-medium rounded-r-md hover:bg-zinc-200 transition-colors flex items-center justify-center"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            <p className="text-[10px] text-zinc-600">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Bottom Subfooter */}
        <div className="mt-16 pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <div>
            &copy; {CURRENT_YEAR} Forma Goods Co. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>Designed for minimalists</span>
            <span>•</span>
            <span>Client-side React 19 + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
