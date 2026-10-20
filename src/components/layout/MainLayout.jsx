import { Outlet } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

/**
 * MainLayout provides the global scaffolding:
 * - Persistent navigation header
 * - Scrollable main content area (Outlet for active page shell)
 * - Persistent editorial footer
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#121212] selection:bg-[#121212] selection:text-[#fafaf8]">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
