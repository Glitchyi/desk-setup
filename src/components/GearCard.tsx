import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn } from '../lib/utils'
import type { GearItem, Category } from '../data/gear'

function GearIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.FC<{ className?: string; size?: number }>>)[name]
  if (!Icon) return null
  return <Icon className={className} size={18} />
}

const CATEGORY_COLOR: Record<Category, string> = {
  computers:   'text-accent-teal',
  kvm:         'text-accent-amber',
  display:     'text-accent-teal',
  audio:       'text-accent-amber',
  peripherals: 'text-text-secondary',
  network:     'text-accent-teal',
  power:       'text-accent-amber',
  furniture:   'text-text-secondary',
  homelab:     'text-accent-teal',
  extras:      'text-accent-amber',
}

const BADGE_COLOR: Record<string, string> = {
  Windows: 'border-accent-teal/40 text-accent-teal',
  macOS:   'border-accent-amber/40 text-accent-amber',
  Core:    'border-accent-amber/60 text-accent-amber bg-accent-amber/10',
}

interface GearCardProps {
  item: GearItem
  index: number
}

export default function GearCard({ item, index }: GearCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative flex flex-col gap-3 p-4 rounded-sm border border-bg-border bg-bg-surface',
        'hover:border-bg-border2 hover:bg-bg-raised transition-colors duration-200',
      )}
    >
      {/* Badge */}
      {item.badge && (
        <span
          className={cn(
            'absolute top-3 right-3 font-mono text-[10px] px-1.5 py-0.5 border rounded-sm',
            BADGE_COLOR[item.badge] ?? 'border-bg-border2 text-text-muted',
          )}
        >
          {item.badge}
        </span>
      )}

      {/* Icon + subcategory */}
      <div className="flex items-center gap-2">
        <div className={cn('p-1.5 rounded-sm bg-bg-raised border border-bg-border', CATEGORY_COLOR[item.category])}>
          <GearIcon name={item.icon} />
        </div>
        {item.subcategory && (
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            {item.subcategory}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-serif text-lg font-light italic text-text-primary leading-tight pr-8">
        {item.name}
      </h3>

      {/* Description */}
      <p className="font-mono text-xs text-text-secondary leading-relaxed">
        {item.description}
      </p>

      {/* Specs */}
      <ul className="space-y-1 mt-auto">
        {item.specs.map((spec, i) => (
          <li key={i} className="font-mono text-[11px] text-text-muted flex gap-2">
            <span className="text-accent-amber shrink-0">—</span>
            <span>{spec}</span>
          </li>
        ))}
      </ul>

      {/* Link */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-[11px] text-accent-amber hover:text-accent-amber/80 transition-colors mt-1 w-fit"
        >
          View on Amazon
          <ExternalLink size={10} />
        </a>
      )}
    </motion.article>
  )
}
