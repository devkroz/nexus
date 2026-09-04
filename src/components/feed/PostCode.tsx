import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import type { CodeInfo } from '@/types'
import { useUIStore } from '@/stores'

const languageColors: Record<string, string> = {
  typescript: 'text-blue-400',
  javascript: 'text-yellow-400',
  python: 'text-emerald-400',
  rust: 'text-orange-400',
  go: 'text-cyan-400',
  css: 'text-pink-400',
  html: 'text-orange-500',
  bash: 'text-green-400',
}

export function PostCode({ code }: { code: CodeInfo }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useUIStore()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.content)
      setCopied(true)
      toast({ title: 'Copied to clipboard', description: `${code.lines} lines of ${code.language}` })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ title: 'Copy failed', type: 'error' })
    }
  }

  const lines = code.content.split('\n')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-border bg-[#0a0a0a]"
    >
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className={`text-xs font-medium ${languageColors[code.language] ?? 'text-foreground/70'}`}>
            {code.language}
          </span>
          <span className="text-[10px] text-muted-foreground">{code.lines} lines</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-secondary transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed font-mono scrollbar-thin">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 inline-block w-6 text-right text-muted-foreground/40 select-none">
              {i + 1}
            </span>
            <code className="text-foreground/90 whitespace-pre">{line}</code>
          </div>
        ))}
      </pre>
    </motion.div>
  )
}
