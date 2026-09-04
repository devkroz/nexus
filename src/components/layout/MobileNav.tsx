import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { Home, Compass, Plus, Bell, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { motion } from 'framer-motion'

const items = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: 'create', icon: Plus, label: 'Create', isAction: true },
  { to: '/notifications', icon: Bell, label: 'Alerts' },
  { to: '/profile', icon: UserIcon, label: 'Me' },
]

export function MobileNav() {
  const location = useLocation()
  const { openCreatePost } = useUIStore()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-16 border-t border-border/40 glass">
      <div className="grid grid-cols-5 h-full max-w-md mx-auto">
        {items.map((item) => {
          if (item.isAction) {
            return (
              <button
                key={item.to}
                onClick={openCreatePost}
                className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-foreground"
                aria-label={item.label}
              >
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink-500"
                >
                  <item.icon className="h-4 w-4 text-white" />
                </motion.span>
              </button>
            )
          }
          const isActive =
            item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-xs',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <motion.span whileTap={{ scale: 0.9 }}>
                <item.icon className="h-5 w-5" />
              </motion.span>
              <span className="text-[10px]">{item.label}</span>
            </RouterNavLink>
          )
        })}
      </div>
    </nav>
  )
}
