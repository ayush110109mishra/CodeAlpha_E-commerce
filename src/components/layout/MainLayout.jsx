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
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
