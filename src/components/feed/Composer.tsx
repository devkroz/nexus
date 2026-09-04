import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Hash, Smile, MapPin, X } from 'lucide-react'
import { useFeedStore, useUIStore } from '@/stores'
import { Avatar } from '@/components/ui/Avatar'
import { generateId } from '@/lib/utils'
import type { Post } from '@/types'

export function Composer() {
  const { me, publishPost } = useFeedStore()
  const { toast, closeCreatePost } = useUIStore()
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handlePost = async () => {
    if (!text.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    const newPost: Post = {
      id: generateId(),
      user: me,
      type: 'normal',
      content: text,
      media: [],
      likes: 0,
      comments: 0,
      reposts: 0,
      saves: 0,
      shares: 0,
      tags: [],
      timestamp: new Date().toISOString(),
      liked: false,
      saved: false,
      reposted: false,
    }
    publishPost(newPost)
    setText('')
    setSubmitting(false)
    toast({ title: 'Post published', description: 'Your post is now live in the feed' })
    closeCreatePost()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex gap-3">
        <Avatar src={me.avatar} alt={me.name} size="md" />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening in your world?"
            className="w-full bg-transparent resize-none outline-none text-base placeholder:text-muted-foreground/60 min-h-[80px]"
            autoFocus
          />
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                className="p-2 rounded-full hover:bg-secondary/80 hover:text-primary transition-colors"
                aria-label="Add image"
              >
                <Image className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-secondary/80 hover:text-primary transition-colors"
                aria-label="Add tag"
              >
                <Hash className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-secondary/80 hover:text-primary transition-colors"
                aria-label="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-secondary/80 hover:text-primary transition-colors"
                aria-label="Add location"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{text.length}/280</span>
              <button
                onClick={handlePost}
                disabled={!text.trim() || submitting}
                className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:bg-primary/90 active:scale-95 transition-all"
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CreatePostModal() {
  const { createPostOpen, closeCreatePost } = useUIStore()

  if (!createPostOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={closeCreatePost}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-xl glass-card rounded-2xl"
      >
        <button
          onClick={closeCreatePost}
          className="absolute right-3 top-3 p-2 rounded-full hover:bg-secondary/80"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Create post</h2>
          <Composer />
        </div>
      </motion.div>
    </motion.div>
  )
}
