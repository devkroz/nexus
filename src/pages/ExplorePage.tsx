import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid3x3, List } from 'lucide-react'
import { PostCard } from '@/components/feed/PostCard'
import { Avatar } from '@/components/ui/Avatar'
import { useFeedStore } from '@/stores'

const filters = [
  { id: 'all', label: 'All' },
  { id: '3d', label: '3D' },
  { id: 'project', label: 'Projects' },
  { id: 'code', label: 'Code' },
  { id: 'video', label: 'Video' },
  { id: 'normal', label: 'Posts' },
]

export default function ExplorePage() {
  const { posts, users, following, toggleFollow } = useFeedStore()
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (filter !== 'all' && p.type !== filter) return false
      if (query) {
        const q = query.toLowerCase()
        return (
          p.content?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.user.name.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [posts, filter, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
        <p className="text-muted-foreground text-sm">
          Discover the most interesting content from across the network
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-full glass px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, people, tags..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-full glass">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-full transition-colors ${
              view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-full transition-colors ${
              view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id
                ? 'bg-foreground text-background'
                : 'bg-secondary/60 text-foreground/80 hover:bg-secondary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 opacity-30">🔍</div>
          <h3 className="text-lg font-semibold">Nothing to show</h3>
          <p className="text-sm text-muted-foreground mt-1">Try a different filter or search</p>
        </div>
      ) : (
        <div
          className={
            view === 'grid'
              ? 'columns-1 md:columns-2 gap-6 [&>*]:mb-6 [&>*]:break-inside-avoid'
              : 'space-y-6'
          }
        >
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}

      <section className="pt-8">
        <h2 className="text-xl font-bold mb-4">People to follow</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {users
            .filter((u) => u.id !== 'me')
            .slice(0, 6)
            .map((user) => {
              const isFollowing = !!following[user.id]
              return (
                <div key={user.id} className="glass-card rounded-2xl p-4 text-center">
                  <Avatar src={user.avatar} alt={user.name} size="lg" className="mx-auto mb-3" />
                  <div className="font-semibold text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground mb-3">@{user.username}</div>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`w-full rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      isFollowing
                        ? 'bg-secondary text-foreground'
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
    </div>
  )
}
