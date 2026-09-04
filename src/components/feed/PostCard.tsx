import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  MoreHorizontal,
  ExternalLink,
  Github,
  X,
  Send,
  CornerDownRight,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import type { Post as PostType } from '@/types'
import { useFeedStore, useUIStore } from '@/stores'
import { PostModel } from '@/components/3d/PostModel'
import { PostVideo } from './PostVideo'
import { PostCode } from './PostCode'
import { timeAgo, cn } from '@/lib/utils'
import { Sparkline } from '@/components/ui/Sparkline'

interface PostCardProps {
  post: PostType
}

const trendData = [3, 5, 4, 7, 9, 8, 12, 10, 14, 18, 16, 22, 20, 25, 28]

export function PostCard({ post }: PostCardProps) {
  const { toggleLike, toggleSave, toggleRepost, addComment } = useFeedStore()
  const { toast, openSearch } = useUIStore()
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')

  const handleShare = () => {
    navigator.clipboard.writeText(`https://nexus.app/post/${post.id}`)
    toast({ title: 'Link copied', description: 'Post link copied to clipboard' })
  }

  const handlePostComment = () => {
    if (!newComment.trim()) return
    addComment(post.id)
    setNewComment('')
    toast({ title: 'Comment posted', type: 'success' })
  }

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl overflow-hidden hover-lift"
      >
        <header className="flex items-center justify-between p-5 pb-3">
          <button className="flex items-center gap-3 group text-left">
            <Avatar
              src={post.user.avatar}
              alt={post.user.name}
              size="md"
              ring
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {post.user.name}
                </span>
                {post.user.verified && (
                  <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="text-muted-foreground text-sm">@{post.user.username}</span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">{timeAgo(post.timestamp)}</span>
              </div>
              {post.user.bio && (
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.user.bio}</p>
              )}
            </div>
          </button>
          <button
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </header>

        {post.content && (
          <div className="px-5 pb-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      openSearch()
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {post.type === '3d' && post.threeD && (
          <div className="px-5 pb-3">
            <PostModel info={post.threeD} />
          </div>
        )}

        {post.type === 'code' && post.code && (
          <div className="px-5 pb-3">
            <PostCode code={post.code} />
          </div>
        )}

        {post.type === 'video' && post.video && (
          <div className="px-5 pb-3">
            <PostVideo video={post.video} />
          </div>
        )}

        {post.type === 'project' && post.project && (
          <div className="px-5 pb-3">
            <div className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/40 transition-colors">
              <div className="aspect-[2/1] overflow-hidden bg-secondary">
                <img
                  src={post.project.thumbnail}
                  alt={post.project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{post.project.title}</h3>
                  <Sparkline data={trendData} color="#a855f7" height={28} width={64} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.project.technologies.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => toast({ title: 'Opening demo...' })}
                    className="flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" /> Live demo
                  </button>
                  <button
                    onClick={() => toast({ title: 'Opening repository...' })}
                    className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                  >
                    <Github className="h-3 w-3" /> Source
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {post.type === 'normal' && post.media.length > 0 && (
          <div
            className={cn(
              'px-5 pb-3 grid gap-1',
              post.media.length === 1 && 'grid-cols-1',
              post.media.length === 2 && 'grid-cols-2',
              post.media.length > 2 && 'grid-cols-2'
            )}
          >
            {post.media.map((src, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={cn(
                  'overflow-hidden rounded-xl border border-border',
                  post.media.length === 1 && 'aspect-[2/1]',
                  post.media.length > 1 && 'aspect-square'
                )}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        )}

        <footer className="px-5 py-3 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ActionButton
              active={post.liked}
              activeClass="text-red-500"
              onClick={() => toggleLike(post.id)}
              icon={Heart}
              label={post.likes}
              fillWhenActive
            />
            <ActionButton
              onClick={() => setCommentsOpen(true)}
              icon={MessageCircle}
              label={post.comments}
            />
            <ActionButton
              active={post.reposted}
              activeClass="text-emerald-500"
              onClick={() => toggleRepost(post.id)}
              icon={Repeat2}
              label={post.reposts}
            />
            <ActionButton onClick={handleShare} icon={Share2} label={post.shares ?? 0} />
          </div>
          <ActionButton
            active={post.saved}
            activeClass="text-primary"
            onClick={() => toggleSave(post.id)}
            icon={Bookmark}
            label={post.saves}
            fillWhenActive
          />
        </footer>
      </motion.article>

      <Modal
        open={imageIndex !== null}
        onClose={() => setImageIndex(null)}
        size="xl"
        className="bg-black/80"
      >
        {imageIndex !== null && (
          <div className="relative">
            <button
              onClick={() => setImageIndex(null)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-background/80 p-2 hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={post.media[imageIndex]}
              alt=""
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        )}
      </Modal>

      <Modal
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        size="md"
        className="max-h-[80vh]"
      >
        <div className="flex flex-col max-h-[80vh]">
          <div className="border-b border-border px-5 py-4">
            <h3 className="font-semibold">Replies ({post.comments})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
            {Array.from({ length: 4 }).map((_, i) => {
              const u = ['u1', 'u2', 'u3', 'u4'][i]
              return (
                <div key={i} className="flex gap-3">
                  <Avatar src={`https://i.pravatar.cc/80?img=${i + 10}`} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">creator_{u}</span>
                      <span className="text-xs text-muted-foreground">{timeAgo(new Date(Date.now() - i * 600000).toISOString())}</span>
                    </div>
                    <p className="text-sm mt-1">
                      {i === 0 && 'This is genuinely impressive work. The shader work is top tier.'}
                      {i === 1 && 'Saving this for later, the lighting setup is incredible.'}
                      {i === 2 && 'Would love to see the source code if you open source it.'}
                      {i === 3 && 'Just shared this with the team, we are definitely using this pattern.'}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <button className="hover:text-red-400 transition-colors">Like</button>
                      <button className="hover:text-primary transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <CornerDownRight className="h-4 w-4 text-muted-foreground" />
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                placeholder="Post your reply..."
                className="flex-1 rounded-full bg-secondary/60 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={handlePostComment}
                disabled={!newComment.trim()}
                className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

interface ActionButtonProps {
  active?: boolean
  activeClass?: string
  onClick?: () => void
  icon: React.ComponentType<{ className?: string; fill?: string }>
  label: number
  fillWhenActive?: boolean
}

function ActionButton({ active, activeClass, onClick, icon: Icon, label, fillWhenActive }: ActionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors hover:bg-secondary/60',
        active ? activeClass : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <motion.div
        animate={active ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <Icon className="h-4 w-4" fill={active && fillWhenActive ? 'currentColor' : 'none'} />
      </motion.div>
      {label > 0 && <span className="text-xs font-medium">{label}</span>}
    </motion.button>
  )
}
