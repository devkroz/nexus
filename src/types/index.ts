export type PostType = 'normal' | 'project' | '3d' | 'code' | 'video'

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  followers: number
  following: number
  verified?: boolean
  isFollowing?: boolean
}

export interface ProjectInfo {
  title: string
  description: string
  technologies: string[]
  demoUrl: string
  repoUrl: string
  thumbnail: string
}

export interface ThreeDInfo {
  url?: string
  position: { x: number; y: number; z: number }
  scale: number
  color: string
  type: 'torus' | 'sphere' | 'cube' | 'icosa'
}

export interface CodeInfo {
  language: string
  content: string
  lines: number
}

export interface VideoInfo {
  thumbnail: string
  duration: string
  title: string
}

export interface Post {
  id: string
  user: User
  content?: string
  media: string[]
  type: PostType
  project?: ProjectInfo
  threeD?: ThreeDInfo
  code?: CodeInfo
  video?: VideoInfo
  likes: number
  comments: number
  reposts: number
  saves: number
  shares?: number
  bookmarks?: number
  tags: string[]
  timestamp: string
  liked: boolean
  saved: boolean
  reposted: boolean
}

export interface Notification {
  id: string
  type: 'like' | 'follow' | 'comment' | 'mention' | 'project'
  user: User
  post?: Post
  message: string
  timestamp: string
  read: boolean
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage: Message
  unreadCount: number
  online: boolean
}

export type Theme = 'dark' | 'light'

export type ViewMode = 'grid' | 'list'
