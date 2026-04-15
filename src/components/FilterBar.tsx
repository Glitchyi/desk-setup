import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { cn } from '../lib/utils'
import type { Category } from '../data/gear'

interface FilterBarProps {
  active: string
  onChange: (cat: string) => void
  categories: { id: Category | 'all'; label: string; icon: string }[]
  counts: Record<string, number>
}

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.FC<{ className?: string; size?: number }>>)[name]
  if (!Icon) return null
  return <Icon className={className} size={14} />
}

export default function FilterBar({ active, onChange, categories, counts }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
      {categories.map((cat) => {
        const isActive = active === cat.id
        const count = counts[cat.id] ?? 0
        const isEmpty = count === 0 && cat.id !== 'all'

        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm border font-mono text-xs whitespace-nowrap transition-colors duration-200',
              isActive
                ? 'border-accent-amber text-accent-amber bg-accent-amber/10'
                : isEmpty
                ? 'border-bg-border text-text-muted opacity-40 cursor-default'
                : 'border-bg-border text-text-secondary hover:border-bg-border2 hover:text-text-primary',
            )}
          >
            <CategoryIcon name={cat.icon} />
            <span>{cat.label}</span>
            <span
              className={cn(
                'ml-0.5 tabular-nums',
                isActive ? 'text-accent-amber/70' : 'text-text-muted',
              )}
            >
              {count}
            </span>
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 border border-accent-amber/50 rounded-sm pointer-events-none"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
