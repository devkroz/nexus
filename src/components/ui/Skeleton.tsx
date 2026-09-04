import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = 'rect', width, height, ...props }: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  }
  return (
    <div
      className={cn('shimmer bg-secondary/40', variants[variant], className)}
      style={{ width, height }}
      {...props}
    />
  )
}

export function PostSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 space-y-4"
    >
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="20%" height={10} />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <Skeleton variant="rect" height={300} />
    </motion.div>
  )
}
