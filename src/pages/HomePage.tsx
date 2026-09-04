import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Hero3D } from '@/components/3d/HeroScene'
import { PostCard } from '@/components/feed/PostCard'
import { PostSkeleton } from '@/components/ui/Skeleton'
import { Composer } from '@/components/feed/Composer'
import { useFeedStore } from '@/stores'
import { Sparkline } from '@/components/ui/Sparkline'

const sparkData = [12, 18, 14, 22, 28, 24, 32, 38, 42, 48, 52, 64]

export default function HomePage() {
  const { posts } = useFeedStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      <Hero3D />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        <StatCard label="Active creators" value="2.4K" trend="+12%" />
        <StatCard label="Posts today" value="847" trend="+5%" spark />
        <StatCard label="3D scenes" value="192" trend="+24%" />
      </motion.div>

      <Composer />

      <div className="space-y-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      {!loading && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          You've reached the end of the feed · Check back later
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, trend, spark }: { label: string; value: string; trend: string; spark?: boolean }) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">{trend}</div>
        </div>
        {spark && <Sparkline data={sparkData} height={32} width={64} />}
      </div>
    </div>
  )
}
