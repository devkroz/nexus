import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, Video, Info, Search } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { useMessagesStore } from '@/stores'
import { timeAgo, cn } from '@/lib/utils'

export default function MessagesPage() {
  const { conversations, messagesByConversation, activeConversationId, setActive, sendMessage } =
    useMessagesStore()
  const [draft, setDraft] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const messagesEnd = useRef<HTMLDivElement>(null)

  const active = conversations.find((c) => c.id === activeConversationId)
  const messages = activeConversationId ? messagesByConversation[activeConversationId] ?? [] : []
  const partner = active?.participants.find((p) => p.id !== 'me')

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = () => {
    if (!draft.trim() || !activeConversationId) return
    sendMessage(activeConversationId, draft)
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 h-[calc(100vh-5rem)] lg:h-[calc(100vh-4rem)]">
      <div className="glass-card rounded-2xl overflow-hidden h-full flex">
        <aside
          className={cn(
            'w-full md:w-80 border-r border-border flex flex-col',
            mobileView === 'chat' && 'hidden md:flex'
          )}
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-lg mb-3">Messages</h2>
            <div className="flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search messages..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {conversations.map((c) => {
              const p = c.participants.find((u) => u.id !== 'me')!
              const isActive = c.id === activeConversationId
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActive(c.id)
                    setMobileView('chat')
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 hover:bg-secondary/60 transition-colors text-left',
                    isActive && 'bg-secondary/80'
                  )}
                >
                  <div className="relative">
                    <Avatar src={p.avatar} alt={p.name} size="md" />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {timeAgo(c.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">
                        {c.lastMessage.text}
                      </span>
                      {c.unreadCount > 0 && (
                        <span className="ml-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        <main
          className={cn(
            'flex-1 flex flex-col',
            mobileView === 'list' && 'hidden md:flex'
          )}
        >
          {active && partner ? (
            <>
              <header className="h-16 border-b border-border px-4 flex items-center gap-3">
                <button
                  className="md:hidden p-2 -ml-2 rounded-full hover:bg-secondary/60"
                  onClick={() => setMobileView('list')}
                >
                  ←
                </button>
                <Avatar src={partner.avatar} alt={partner.name} size="md" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {active.online ? 'Active now' : 'Last seen 2h ago'}
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-secondary/60">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary/60">
                  <Video className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary/60">
                  <Info className="h-4 w-4" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                <AnimatePresence>
                  {messages.map((m) => {
                    const isMe = m.senderId === 'me'
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
                      >
                        <div
                          className={cn(
                            'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                            isMe
                              ? 'bg-primary text-primary-foreground rounded-br-sm'
                              : 'bg-secondary rounded-bl-sm'
                          )}
                        >
                          <p>{m.text}</p>
                          <div
                            className={cn(
                              'text-[10px] mt-1',
                              isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            )}
                          >
                            {timeAgo(m.timestamp)}
                            {isMe && m.status === 'read' && ' · Read'}
                            {isMe && m.status === 'delivered' && ' · Delivered'}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
                <div ref={messagesEnd} />
              </div>

              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!draft.trim()}
                    className="rounded-full bg-primary p-2.5 text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
