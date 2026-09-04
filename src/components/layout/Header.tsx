import { motion } from 'framer-motion'
import { Search, Bell, Settings } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useFeedStore, useUIStore, useNotificationsStore } from '@/stores'

export function Header() {
  const { me } = useFeedStore()
  const { openSearch } = useUIStore()
  const { unreadCount } = useNotificationsStore()

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border/40 glass">
      <div className="h-full px-4 md:px-6 flex items-center gap-4 max-w-[1600px] mx-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openSearch}
          className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors w-full max-w-md"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Search NEXUS...</span>
          <span className="sm:hidden">Search</span>
          <kbd className="ml-auto hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </motion.button>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="relative p-2 rounded-full hover:bg-secondary/60 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount() > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-secondary/60 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          <Avatar
            src={me.avatar}
            alt={me.name}
            size="sm"
            className="ml-1 cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}
