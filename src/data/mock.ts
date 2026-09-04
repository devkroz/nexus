import type { Post, User, Notification, Conversation } from '@/types'

export const me: User = {
  id: 'me',
  name: 'Alex Chen',
  username: 'alexcoder',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
  bio: 'Building the future of digital creation · Design + Code',
  followers: 12480,
  following: 234,
  verified: true,
}

export const users: User[] = [
  me,
  {
    id: 'u1',
    name: 'Maya Rivera',
    username: 'maya_designs',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    bio: 'Product designer @ Linear · Building tools for creators',
    followers: 28430,
    following: 412,
    verified: true,
    isFollowing: true,
  },
  {
    id: 'u2',
    name: 'Sam Wilson',
    username: 'sam_3d',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    bio: 'Creative developer · Three.js · WebGL',
    followers: 18920,
    following: 189,
    verified: true,
    isFollowing: false,
  },
  {
    id: 'u3',
    name: 'Aria Park',
    username: 'aria.codes',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad4208?w=200&h=200&fit=crop',
    bio: 'Frontend engineer · React, TypeScript, Animation',
    followers: 9210,
    following: 532,
    isFollowing: true,
  },
  {
    id: 'u4',
    name: 'Liam Foster',
    username: 'liam.ai',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop',
    bio: 'AI researcher · Generative models · Ex-OpenAI',
    followers: 56200,
    following: 124,
    verified: true,
    isFollowing: false,
  },
  {
    id: 'u5',
    name: 'Nina Volkov',
    username: 'nina.volkov',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    bio: 'Motion designer · After Effects · Cinema 4D',
    followers: 14280,
    following: 287,
    isFollowing: true,
  },
  {
    id: 'u6',
    name: 'Kai Tanaka',
    username: 'kai_t',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: 'Backend engineer · Distributed systems',
    followers: 7820,
    following: 91,
    isFollowing: false,
  },
  {
    id: 'u7',
    name: 'Sofia Mendes',
    username: 'sofia.m',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop',
    bio: 'Illustrator · Concept art · Digital painting',
    followers: 22480,
    following: 412,
    verified: true,
    isFollowing: true,
  },
]

const findUser = (id: string) => users.find((u) => u.id === id)!

const CODE_SAMPLE = `import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#a855f7"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </mesh>
      </Float>
    </Canvas>
  )
}`

export const posts: Post[] = [
  {
    id: 'p1',
    user: findUser('u1'),
    type: 'project',
    content: 'Just shipped the new dashboard redesign. Took 3 months but the result speaks for itself. ⚡',
    media: [],
    project: {
      title: 'Lumen Dashboard v2.0',
      description: 'A complete redesign of our analytics platform with real-time data visualization, focus on clarity and speed.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'WebGL'],
      demoUrl: '#',
      repoUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    },
    likes: 2840,
    comments: 187,
    reposts: 412,
    saves: 1820,
    tags: ['Design', 'Dashboard', 'UI/UX'],
    timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    liked: true,
    saved: false,
    reposted: false,
  },
  {
    id: 'p2',
    user: findUser('u2'),
    type: '3d',
    content: 'Been playing with WebGL fragment shaders and metaballs. The fluid simulation is buttery smooth on modern GPUs. Drag to rotate, scroll to zoom.',
    media: [],
    threeD: {
      position: { x: 0, y: 0, z: 0 },
      scale: 1,
      color: '#a855f7',
      type: 'icosa',
    },
    likes: 5230,
    comments: 421,
    reposts: 892,
    saves: 3140,
    tags: ['ThreeJS', 'WebGL', 'Shaders'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    liked: false,
    saved: true,
    reposted: false,
  },
  {
    id: 'p3',
    user: findUser('u4'),
    type: 'normal',
    content: 'New paper: "Scaling Laws for Generative Models" — we found that model performance follows a predictable power law with respect to compute, data, and parameters. Implications for the next 5 years of AI research are profound. 🧵',
    media: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop'],
    likes: 8920,
    comments: 1240,
    reposts: 3120,
    saves: 5640,
    tags: ['AI', 'Research', 'ML'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    liked: true,
    saved: true,
    reposted: false,
  },
  {
    id: 'p4',
    user: findUser('u3'),
    type: 'code',
    content: 'Just learned that `useDeferredValue` can dramatically improve INP when working with heavy list renders. Sharing a snippet from the talk I gave last week.',
    media: [],
    code: {
      language: 'typescript',
      content: CODE_SAMPLE,
      lines: 18,
    },
    likes: 1240,
    comments: 87,
    reposts: 234,
    saves: 920,
    tags: ['React', 'Performance', 'TypeScript'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    liked: false,
    saved: false,
    reposted: false,
  },
  {
    id: 'p5',
    user: findUser('u5'),
    type: 'video',
    content: 'A 30-second loop I made for a client. Cinema 4D + Redshift. What do you think?',
    media: [],
    video: {
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
      duration: '0:30',
      title: 'Neon Loop',
    },
    likes: 3420,
    comments: 198,
    reposts: 412,
    saves: 1890,
    tags: ['Motion', '3D', 'Animation'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    liked: true,
    saved: false,
    reposted: false,
  },
  {
    id: 'p6',
    user: findUser('u7'),
    type: 'normal',
    content: 'New character design exploration. Been wanting to capture the feeling of being watched from somewhere you cannot see. 👁️',
    media: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop',
    ],
    likes: 4820,
    comments: 312,
    reposts: 624,
    saves: 2340,
    tags: ['Illustration', 'Character', 'Concept Art'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    liked: false,
    saved: true,
    reposted: false,
  },
  {
    id: 'p7',
    user: findUser('u6'),
    type: 'normal',
    content: 'Hot take: microservices were a mistake. The industry is finally waking up to the fact that modular monoliths deliver 90% of the benefits with 10% of the operational cost.',
    media: [],
    likes: 1920,
    comments: 482,
    reposts: 287,
    saves: 412,
    tags: ['Backend', 'Architecture', 'Hot Take'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    liked: false,
    saved: false,
    reposted: false,
  },
  {
    id: 'p8',
    user: findUser('u1'),
    type: 'normal',
    content: 'A morning well spent. The view from my new apartment is unreal. Sometimes you need to step away from the screen.',
    media: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'],
    likes: 892,
    comments: 124,
    reposts: 18,
    saves: 92,
    tags: ['Personal', 'Photography'],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    liked: true,
    saved: false,
    reposted: false,
  },
]

export const trendingTopics = [
  { tag: '#WebGL', posts: '12.4K', category: 'Tech' },
  { tag: '#AIArt', posts: '8.2K', category: 'AI' },
  { tag: '#React', posts: '24.1K', category: 'Dev' },
  { tag: '#ThreeJS', posts: '5.6K', category: 'Tech' },
  { tag: '#UIDesign', posts: '15.8K', category: 'Design' },
  { tag: '#OpenSource', posts: '9.3K', category: 'Dev' },
  { tag: '#MotionDesign', posts: '4.2K', category: 'Design' },
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: findUser('u1'),
    message: 'liked your post about the dashboard redesign',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'follow',
    user: findUser('u4'),
    message: 'started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'comment',
    user: findUser('u3'),
    message: 'commented: "This is exactly what I needed, thanks for sharing!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
  },
  {
    id: 'n4',
    type: 'mention',
    user: findUser('u2'),
    message: 'mentioned you in a comment',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
  },
  {
    id: 'n5',
    type: 'project',
    user: findUser('u5'),
    message: 'updated their project "Aurora"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    read: true,
  },
  {
    id: 'n6',
    type: 'like',
    user: findUser('u7'),
    message: 'and 12 others liked your post',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    read: true,
  },
  {
    id: 'n7',
    type: 'follow',
    user: findUser('u6'),
    message: 'started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
]

const sampleMessages = [
  'Hey! Loved your latest post about shaders 🔥',
  'Want to collab on a Three.js project?',
  'I just pushed the update, check it out!',
  'That landing page is unreal.',
  'Are you going to the conference next month?',
  'Just sent you the Figma file',
  'The animation work you did was incredible',
  'Let me know when you ship the new version',
  'Thanks for the feedback! 🙏',
  'I had a similar idea, lets sync up',
  'Quick question about your setup',
  'We should grab coffee sometime',
]

export const conversations: Conversation[] = users.slice(1, 6).map((u, i) => ({
  id: `c${i}`,
  participants: [me, u],
  lastMessage: {
    id: `m${i}`,
    conversationId: `c${i}`,
    senderId: u.id,
    text: sampleMessages[i % sampleMessages.length],
    timestamp: new Date(Date.now() - 1000 * 60 * (i + 1) * 15).toISOString(),
    status: i % 3 === 0 ? 'read' : i % 3 === 1 ? 'delivered' : 'sent',
  },
  unreadCount: i < 2 ? Math.floor(Math.random() * 3) + 1 : 0,
  online: i < 2,
}))

export const onlineUsers: User[] = users.slice(1, 8).filter((u) => u.id !== me.id)
