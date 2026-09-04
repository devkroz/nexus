import { motion } from 'framer-motion'
import { Bookmark, Folder } from 'lucide-react'
import { PostCard } from '@/components/feed/PostCard'
import { useFeedStore } from '@/stores'

const folders = [
  { id: 'all', name: 'All saved', count: 0, color: 'from-primary to-pink-500' },
  { id: 'design', name: 'Design inspiration', count: 0, color: 'from-blue-500 to-cyan-500' },
  { id: 'code', name: 'Code snippets', count: 0, color: 'from-emerald-500 to-green-500' },
  { id: '3d', name: '3D references', count: 0, color: 'from-orange-500 to-red-500' },
]

export default function BookmarksPage() {
  const { posts } = useFeedStore()
  const saved = posts.filter((p) => p.saved)
  const byType = {
    design: saved.filter((p) => p.tags.some((t) => t.toLowerCase().includes('design'))).length,
    code: saved.filter((p) => p.type === 'code').length,
    '3d': saved.filter((p) => p.type === '3d').length,
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bookmark className="h-7 w-7 text-primary" /> Saved
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your private collection of {saved.length} posts
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {folders.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl p-4 text-left"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3`}>
              <Folder className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-sm">{f.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {f.id === 'all' ? saved.length : byType[f.id as keyof typeof byType] ?? 0} items
            </div>
          </motion.button>
        ))}
      </div>

      <div className="space-y-6 max-w-2xl">
        {saved.length > 0 ? (
          saved.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
            <h3 className="font-semibold">No bookmarks yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Save posts to revisit them later
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
