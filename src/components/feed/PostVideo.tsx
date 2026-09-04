import { motion } from 'framer-motion'
import { Suspense, useState, useRef } from 'react'
import { Play, Pause, Volume2, Maximize2, MoreHorizontal } from 'lucide-react'
import type { VideoInfo } from '@/types'

interface PostVideoProps {
  video: VideoInfo
}

export function PostVideo({ video }: PostVideoProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const togglePlay = () => {
    if (playing) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setProgress((p) => (p >= 100 ? (window.clearInterval(intervalRef.current!), 100) : p + 0.5))
      }, 50)
    }
    setPlaying((p) => !p)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black group"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 w-16 items-center justify-center rounded-full glass neon-glow"
        >
          {playing ? (
            <Pause className="h-6 w-6 text-white" fill="white" />
          ) : (
            <Play className="h-6 w-6 text-white ml-1" fill="white" />
          )}
        </motion.div>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-xs font-medium">{video.title}</span>
          <span className="text-xs text-white/60">·</span>
          <span className="text-xs text-white/60">{video.duration}</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="p-1.5 rounded-full hover:bg-white/10"
              aria-label="Volume"
              onClick={(e) => e.stopPropagation()}
            >
              <Volume2 className="h-3.5 w-3.5 text-white" />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white/10"
              aria-label="Fullscreen"
              onClick={(e) => e.stopPropagation()}
            >
              <Maximize2 className="h-3.5 w-3.5 text-white" />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white/10"
              aria-label="More"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
