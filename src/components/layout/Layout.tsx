import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { TrendingSidebar } from './TrendingSidebar'
import { Toaster } from '@/components/ui/Toaster'
import { SearchModal } from '@/components/modals/SearchModal'
import { CreatePostModal } from '@/components/feed/Composer'

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex max-w-[1600px] mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <TrendingSidebar />
      </div>
      <MobileNav />
      <Toaster />
      <SearchModal />
      <CreatePostModal />
    </div>
  )
}
