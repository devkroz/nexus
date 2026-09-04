import { motion } from 'framer-motion'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
}

export function NavLink({ to, icon: Icon, label, badge }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-foreground/70 hover:bg-secondary/60 hover:text-foreground'
        )
      }
    >
      {({ isActive }) => (
        <>
          <motion.span
            initial={false}
            animate={{ scale: isActive ? 1.05 : 1 }}
            className="relative"
          >
            <Icon className="h-5 w-5" />
          </motion.span>
          <span className="flex-1">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              {badge}
            </span>
          )}
        </>
      )}
    </RouterNavLink>
  )
}
