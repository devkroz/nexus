import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success'
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary/20 text-primary border-primary/30',
      secondary: 'bg-secondary text-secondary-foreground border-border',
      outline: 'border-border bg-transparent text-foreground/70',
      success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    }
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
