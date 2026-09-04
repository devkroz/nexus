import { create } from 'zustand'
import type { Post, User, Notification, Conversation, Message } from '@/types'
import { posts as seedPosts, users as seedUsers, me as seedMe, notifications as seedNotifications, conversations as seedConversations } from '@/data/mock'
import { generateId } from '@/lib/utils'

interface FeedState {
  me: User
  posts: Post[]
  users: User[]
  liked: Record<string, boolean>
  saved: Record<string, boolean>
  reposted: Record<string, boolean>
  following: Record<string, boolean>
  toggleLike: (postId: string) => void
  toggleSave: (postId: string) => void
  toggleRepost: (postId: string) => void
  toggleFollow: (userId: string) => void
  publishPost: (post: Post) => void
  removePost: (postId: string) => void
  addComment: (postId: string) => void
}

export const useFeedStore = create<FeedState>((set) => ({
  me: seedMe,
  posts: seedPosts,
  users: seedUsers,
  liked: Object.fromEntries(seedPosts.filter((p) => p.liked).map((p) => [p.id, true])),
  saved: Object.fromEntries(seedPosts.filter((p) => p.saved).map((p) => [p.id, true])),
  reposted: Object.fromEntries(seedPosts.filter((p) => p.reposted).map((p) => [p.id, true])),
  following: Object.fromEntries(seedUsers.filter((u) => u.isFollowing).map((u) => [u.id, true])),
  toggleLike: (id) =>
    set((s) => {
      const wasLiked = !!s.liked[id]
      return {
        liked: { ...s.liked, [id]: !wasLiked },
        posts: s.posts.map((p) =>
          p.id === id ? { ...p, liked: !wasLiked, likes: p.likes + (wasLiked ? -1 : 1) } : p
        ),
      }
    }),
  toggleSave: (id) =>
    set((s) => {
      const wasSaved = !!s.saved[id]
      return {
        saved: { ...s.saved, [id]: !wasSaved },
        posts: s.posts.map((p) =>
          p.id === id ? { ...p, saved: !wasSaved, saves: p.saves + (wasSaved ? -1 : 1) } : p
        ),
      }
    }),
  toggleRepost: (id) =>
    set((s) => {
      const wasReposted = !!s.reposted[id]
      return {
        reposted: { ...s.reposted, [id]: !wasReposted },
        posts: s.posts.map((p) =>
          p.id === id
            ? { ...p, reposted: !wasReposted, reposts: p.reposts + (wasReposted ? -1 : 1) }
            : p
        ),
      }
    }),
  toggleFollow: (id) =>
    set((s) => {
      const wasFollowing = !!s.following[id]
      return {
        following: { ...s.following, [id]: !wasFollowing },
        me: { ...s.me, following: s.me.following + (wasFollowing ? -1 : 1) },
        users: s.users.map((u) =>
          u.id === id
            ? { ...u, isFollowing: !wasFollowing, followers: u.followers + (wasFollowing ? -1 : 1) }
            : u
        ),
      }
    }),
  publishPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  removePost: (id) => set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
  addComment: (id) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === id ? { ...p, comments: p.comments + 1 } : p)),
    })),
}))

interface UIState {
  searchOpen: boolean
  createPostOpen: boolean
  toasts: { id: string; title: string; description?: string; type: 'success' | 'error' | 'info' }[]
  openSearch: () => void
  closeSearch: () => void
  openCreatePost: () => void
  closeCreatePost: () => void
  toast: (t: { title: string; description?: string; type?: 'success' | 'error' | 'info' }) => void
  dismissToast: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  createPostOpen: false,
  toasts: [],
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openCreatePost: () => set({ createPostOpen: true }),
  closeCreatePost: () => set({ createPostOpen: false }),
  toast: ({ title, description, type = 'success' }) => {
    const id = generateId()
    set((s) => ({ toasts: [...s.toasts, { id, title, description, type }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 3200)
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

interface NotificationsState {
  items: Notification[]
  markAllRead: () => void
  markRead: (id: string) => void
  unreadCount: () => number
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  items: seedNotifications,
  markAllRead: () => set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
  markRead: (id) =>
    set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  unreadCount: () => get().items.filter((n) => !n.read).length,
}))

interface MessagesState {
  conversations: Conversation[]
  messagesByConversation: Record<string, Message[]>
  activeConversationId: string | null
  setActive: (id: string) => void
  sendMessage: (conversationId: string, text: string) => void
}

const initialMessages: Record<string, Message[]> = {}
seedConversations.forEach((c) => {
  initialMessages[c.id] = [
    c.lastMessage,
    {
      id: generateId(),
      conversationId: c.id,
      senderId: c.participants[0].id,
      text: 'Sounds great!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: 'read',
    },
  ]
})

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: seedConversations,
  messagesByConversation: initialMessages,
  activeConversationId: seedConversations[0]?.id ?? null,
  setActive: (id) =>
    set((s) => ({
      activeConversationId: id,
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    })),
  sendMessage: (conversationId, text) =>
    set((s) => {
      const newMessage: Message = {
        id: generateId(),
        conversationId,
        senderId: 'me',
        text,
        timestamp: new Date().toISOString(),
        status: 'sent',
      }
      return {
        messagesByConversation: {
          ...s.messagesByConversation,
          [conversationId]: [...(s.messagesByConversation[conversationId] ?? []), newMessage],
        },
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, lastMessage: newMessage } : c
        ),
      }
    }),
}))
