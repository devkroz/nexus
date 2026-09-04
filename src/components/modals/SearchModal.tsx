import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Hash, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { trendingTopics, onlineUsers, posts as allPosts } from '@/data/mock'
import { useUIStore } from '@/stores'
import { timeAgo } from '@/lib/utils'

export function SearchModal() {
  const { searchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchOpen) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && closeSearch()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [searchOpen, closeSearch])

  const results = query
    ? allPosts.filter(
        (p) =>
          p.content?.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.user.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const userResults = query
    ? onlineUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search NEXUS — posts, people, tags..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button onClick={closeSearch} className="p-1.5 rounded-full hover:bg-secondary/80">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
              {!query && (
                <div className="space-y-4 p-2">
                  <section>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3" /> Trending tags
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {trendingTopics.slice(0, 6).map((t) => (
                        <button
                          key={t.tag}
                          onClick={() => setQuery(t.tag)}
                          className="flex items-center gap-2 rounded-lg glass px-3 py-2 text-sm hover:bg-primary/10 transition-colors text-left"
                        >
                          <Hash className="h-3.5 w-3.5 text-primary" />
                          <span className="font-medium">{t.tag}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{t.posts}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Users className="h-3 w-3" /> Suggested people
                    </h4>
                    <div className="space-y-1">
                      {onlineUsers.slice(0, 4).map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            navigate('/profile')
                            closeSearch()
                          }}
                          className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/60"
                        >
                          <Avatar src={u.avatar} alt={u.name} size="sm" />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold">{u.name}</div>
                            <div className="text-xs text-muted-foreground">@{u.username}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {query && (
                <div className="space-y-3 p-2">
                  {userResults.length > 0 && (
                    <section>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">People</h4>
                      {userResults.slice(0, 3).map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            navigate('/profile')
                            closeSearch()
                          }}
                          className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/60"
                        >
                          <Avatar src={u.avatar} alt={u.name} size="sm" />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold">{u.name}</div>
                            <div className="text-xs text-muted-foreground">@{u.username}</div>
                          </div>
                        </button>
                      ))}
                    </section>
                  )}
                  {results.length > 0 && (
                    <section>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">Posts</h4>
                      {results.slice(0, 5).map((p) => (
                        <button
                          key={p.id}
                          onClick={closeSearch}
                          className="w-full flex items-start gap-3 rounded-lg p-2 hover:bg-secondary/60 text-left"
                        >
                          <Avatar src={p.user.avatar} alt={p.user.name} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold">{p.user.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {p.content}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              {timeAgo(p.timestamp)}
                            </div>
                          </div>
                        </button>
                      ))}
                    </section>
                  )}
                  {results.length === 0 && userResults.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
