import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useUIStore } from '@/stores'

export function Toaster() {
  const { toasts, dismissToast } = useUIStore()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = t.type === 'success' ? CheckCircle2 : t.type === 'error' ? XCircle : Info
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="pointer-events-auto glass-card rounded-xl px-4 py-3 flex items-center gap-3 min-w-[280px] shadow-2xl"
              onClick={() => dismissToast(t.id)}
            >
              <Icon
                className={`h-5 w-5 ${
                  t.type === 'success'
                    ? 'text-emerald-400'
                    : t.type === 'error'
                    ? 'text-red-400'
                    : 'text-primary'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{t.title}</div>
                {t.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
