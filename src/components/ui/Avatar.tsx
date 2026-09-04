import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  ring?: boolean
}

const sizeMap = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-24 w-24 text-2xl',
}

export function Avatar({ src, alt, fallback, size = 'md', className, ring }: AvatarProps) {
  const initials =
    fallback ??
    alt
      ?.split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ??
    '?'

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/60 to-pink-500/60 text-white font-semibold select-none',
        sizeMap[size],
        ring && 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background',
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? ''}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            target.parentElement?.setAttribute('data-fallback', initials)
          }}
        />
      ) : null}
      <span className={cn('absolute inset-0 flex items-center justify-center', src && 'hidden')}>
        {initials}
      </span>
    </div>
  )
}
