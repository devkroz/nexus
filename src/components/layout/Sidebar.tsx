import { NavLink } from './NavLink'
import {
  Home,
  Compass,
  Users,
  Bookmark,
  MessageCircle,
  Bell,
  User as UserIcon,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useFeedStore, useUIStore } from '@/stores'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { me, following } = useFeedStore()
  const { openCreatePost } = useUIStore()
  const followingCount = Object.values(following).filter(Boolean).length

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '#following', icon: Users, label: 'Following' },
    { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/profile', icon: UserIcon, label: 'Profile' },
  ]

  return (
    <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col h-[calc(100vh-4rem)] sticky top-16 border-r border-border/40 px-4 py-6">
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openCreatePost}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-pink-500 px-4 py-3 font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
      >
        <span className="flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Create
        </span>
      </motion.button>

      <div className="mt-auto pt-6 space-y-3">
        <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">
          <span>{followingCount} following</span>
          <span>·</span>
          <span>{me.followers.toLocaleString()} followers</span>
        </div>
        <div className="rounded-2xl glass-card p-3 flex items-center gap-3">
          <Avatar src={me.avatar} alt={me.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{me.name}</div>
            <div className="text-xs text-muted-foreground truncate">@{me.username}</div>
          </div>
          <div className="flex gap-1">
            <button
              className="p-1.5 rounded-full hover:bg-secondary/80"
              aria-label="Settings"
            >
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-secondary/80"
              aria-label="Log out"
            >
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
