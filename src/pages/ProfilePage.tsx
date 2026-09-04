import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Calendar, MapPin, Link as LinkIcon, Grid3x3, Bookmark, Heart, MessageCircle } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { PostCard } from '@/components/feed/PostCard'
import { useFeedStore } from '@/stores'
import { formatNumber, cn } from '@/lib/utils'

const tabs = [
  { id: 'posts', label: 'Posts', icon: Grid3x3 },
  { id: 'media', label: 'Media', icon: MessageCircle },
  { id: 'likes', label: 'Likes', icon: Heart },
  { id: 'bookmarks', label: 'Saved', icon: Bookmark },
]

export default function ProfilePage() {
  const { me, posts } = useFeedStore()
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)

  const myPosts = posts.filter((p) => p.user.id === 'me')
  const mediaPosts = myPosts.filter((p) => p.media.length > 0)
  const coverGradient = 'from-purple-600/40 via-pink-500/30 to-blue-500/40'

  return (
    <div className="pb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative h-48 md:h-64 bg-gradient-to-br ${coverGradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.3),transparent_70%)]" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-4 -mt-16 relative">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Avatar
              src={me.avatar}
              alt={me.name}
              size="2xl"
              ring
              className="border-4 border-background"
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-2 md:pt-16">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  {me.name}
                  {me.verified && (
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </h1>
                <div className="text-muted-foreground">@{me.username}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={following ? 'secondary' : 'default'}
                  onClick={() => setFollowing((f) => !f)}
                >
                  {following ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" /> Message
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {me.bio && <p className="mt-3 text-sm max-w-xl">{me.bio}</p>}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Joined March 2024
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="h-3 w-3" /> alexchen.dev
              </span>
            </div>

            <div className="mt-3 flex gap-5 text-sm">
              <span>
                <strong className="text-foreground">{formatNumber(me.following)}</strong>{' '}
                <span className="text-muted-foreground">Following</span>
              </span>
              <span>
                <strong className="text-foreground">{formatNumber(me.followers)}</strong>{' '}
                <span className="text-muted-foreground">Followers</span>
              </span>
              <span>
                <strong className="text-foreground">{myPosts.length}</strong>{' '}
                <span className="text-muted-foreground">Posts</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-b border-border flex gap-1 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'posts' && (
            <div className="space-y-6 max-w-2xl">
              {myPosts.length > 0 ? (
                myPosts.map((p) => <PostCard key={p.id} post={p} />)
              ) : (
                <EmptyState message="You haven't posted anything yet" />
              )}
            </div>
          )}
          {activeTab === 'media' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {mediaPosts.length > 0 ? (
                mediaPosts.map((p) =>
                  p.media.map((src, i) => (
                    <motion.button
                      key={`${p.id}-${i}`}
                      whileHover={{ scale: 1.02 }}
                      className="aspect-square overflow-hidden rounded-xl border border-border"
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </motion.button>
                  ))
                )
              ) : (
                <div className="col-span-full">
                  <EmptyState message="No media yet" />
                </div>
              )}
            </div>
          )}
          {activeTab === 'likes' && (
            <div className="space-y-6 max-w-2xl">
              {posts
                .filter((p) => p.liked)
                .slice(0, 4)
                .map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
            </div>
          )}
          {activeTab === 'bookmarks' && (
            <div className="space-y-6 max-w-2xl">
              {posts
                .filter((p) => p.saved)
                .map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20 glass-card rounded-2xl">
      <div className="text-5xl mb-3 opacity-30">📭</div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
