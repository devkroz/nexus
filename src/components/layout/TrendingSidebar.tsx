import { motion } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useFeedStore } from '@/stores'
import { trendingTopics, onlineUsers } from '@/data/mock'
import { formatNumber } from '@/lib/utils'

export function TrendingSidebar() {
  const { following, toggleFollow } = useFeedStore()

  const suggested = onlineUsers.slice(0, 3)

  return (
    <aside className="hidden xl:flex w-80 shrink-0 flex-col h-[calc(100vh-4rem)] sticky top-16 border-l border-border/40 px-4 py-6 space-y-4 overflow-y-auto scrollbar-thin">
      <section className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, i) => (
            <motion.button
              key={topic.tag}
              whileHover={{ x: 2 }}
              className="w-full text-left group"
            >
              <div className="text-xs text-muted-foreground">
                {i + 1} · {topic.category}
              </div>
              <div className="text-sm font-semibold group-hover:text-primary transition-colors">
                {topic.tag}
              </div>
              <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Who to follow</h3>
        </div>
        <div className="space-y-3">
          {suggested.map((user) => {
            const isFollowing = !!following[user.id]
            return (
              <div key={user.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    @{user.username} · {formatNumber(user.followers)} followers
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(user.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    isFollowing
                      ? 'bg-secondary text-foreground hover:bg-secondary/70'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Active now</h3>
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {onlineUsers.filter((u) => u.id !== 'me').length} online
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {onlineUsers.slice(0, 10).map((user) => (
            <button key={user.id} className="group relative" title={user.name}>
              <Avatar src={user.avatar} alt={user.name} size="sm" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </button>
          ))}
        </div>
      </section>

      <footer className="text-xs text-muted-foreground/60 px-2">
        <p>© 2025 NEXUS · Terms · Privacy · About</p>
      </footer>
    </aside>
  )
}
