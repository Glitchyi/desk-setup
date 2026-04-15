import { AnimatePresence, motion } from 'framer-motion'
import GearCard from './GearCard'
import type { GearItem } from '../data/gear'

interface GearGridProps {
  items: GearItem[]
}

export default function GearGrid({ items }: GearGridProps) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <GearCard key={item.id} item={item} index={i} />
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full py-16 text-center font-mono text-sm text-text-muted"
        >
          No items in this category.
        </motion.div>
      )}
    </motion.div>
  )
}
