import { motion } from 'framer-motion'
import { Heart, UserPlus, MessageCircle, AtSign, Sparkles, BellOff } from 'lucide-react'
import { useNotificationsStore } from '@/stores'
import { Avatar } from '@/components/ui/Avatar'
import { timeAgo, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const iconForType = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  mention: AtSign,
  project: Sparkles,
}

const colorForType = {
  like: 'text-red-400 bg-red-500/10',
  follow: 'text-primary bg-primary/10',
  comment: 'text-emerald-400 bg-emerald-500/10',
  mention: 'text-blue-400 bg-blue-500/10',
  project: 'text-yellow-400 bg-yellow-500/10',
}

export default function NotificationsPage() {
  const { items, markAllRead, markRead, unreadCount } = useNotificationsStore()

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount() > 0 ? `${unreadCount()} unread` : 'You are all caught up'}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead}>
          <BellOff className="h-4 w-4 mr-1" /> Mark all read
        </Button>
      </div>

      <div className="space-y-1">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <BellOff className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold">No notifications yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              When someone interacts with your posts, you will see it here
            </p>
          </div>
        ) : (
          items.map((n, i) => {
            const Icon = iconForType[n.type]
            return (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => markRead(n.id)}
                className={cn(
                  'w-full flex items-start gap-3 rounded-2xl p-3 text-left hover:bg-secondary/60 transition-colors',
                  !n.read && 'bg-primary/5 border border-primary/10'
                )}
              >
                <div className="relative">
                  <Avatar src={n.user.avatar} alt={n.user.name} size="md" />
                  <div
                    className={cn(
                      'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background',
                      colorForType[n.type]
                    )}
                  >
                    <Icon className="h-2.5 w-2.5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-semibold">{n.user.name}</span>{' '}
                    <span className="text-muted-foreground">{n.message}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{timeAgo(n.timestamp)}</div>
                </div>
                {!n.read && <div className="h-2 w-2 rounded-full bg-primary mt-2" />}
              </motion.button>
            )
          })
        )}
      </div>
    </div>
  )
}
