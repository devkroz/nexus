import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SparklineProps {
  data: number[]
  color?: string
  height?: number
  width?: number
}

export function Sparkline({ data, color = '#a855f7', height = 32, width = 80 }: SparklineProps) {
  const [path, setPath] = useState('')
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  useEffect(() => {
    const step = width / (data.length - 1)
    const newPath = data
      .map((v, i) => {
        const x = i * step
        const y = height - ((v - min) / range) * height
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
    setPath(newPath)
  }, [data, width, height, max, min, range])

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="spark-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill="url(#spark-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </svg>
  )
}
