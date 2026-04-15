import { motion } from 'framer-motion'
import { GEAR, CATEGORIES } from '../data/gear'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const categoryCounts = CATEGORIES.filter(c => c.id !== 'all').map(c => ({
  label: c.label,
  count: GEAR.filter(g => g.category === c.id).length,
})).filter(c => c.count > 0).slice(0, 4)

export default function Hero() {
  return (
    <header className="relative border-b border-bg-border overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-amber/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-accent-teal/5 blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto px-4 py-20 sm:py-28 relative"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Location tag */}
        <motion.div variants={item} className="mb-6">
          <span className="font-mono text-xs text-accent-amber tracking-widest uppercase">
            Perumpāvūr, Kerala
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="font-serif text-5xl sm:text-7xl font-light italic text-text-primary leading-none mb-4"
        >
          Advaith's Setup
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-mono text-sm text-text-secondary tracking-wide mb-10"
        >
          standing desk · dual machine · studio audio
        </motion.p>

        {/* Amber rule */}
        <motion.div variants={item} className="relative mb-10">
          <div className="h-px bg-bg-border w-full" />
          <div className="h-px bg-accent-amber/40 w-32 absolute top-0 left-0 glow-amber" />
        </motion.div>

        {/* Stat pills */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <StatPill value={GEAR.length} label="items total" />
          {categoryCounts.map(c => (
            <StatPill key={c.label} value={c.count} label={c.label.toLowerCase()} />
          ))}
        </motion.div>
      </motion.div>
    </header>
  )
}

function StatPill({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border border-bg-border rounded-sm bg-bg-surface font-mono text-xs">
      <span className="text-accent-amber">{value}</span>
      <span className="text-text-muted">{label}</span>
    </div>
  )
}
