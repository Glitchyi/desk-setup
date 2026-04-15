import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const strips = [
  {
    id: 'havells-a',
    name: 'Havells Strip A',
    color: 'border-accent-amber/50 text-accent-amber',
    iconColor: 'text-accent-amber',
    devices: ['Standing desk motor', 'Acer Nitro XV272U V3', 'Quntis HY214 PRO light bar', 'Mackie CR3-X speakers'],
  },
  {
    id: 'belkin-8',
    name: 'Belkin 8-port',
    color: 'border-accent-teal/50 text-accent-teal',
    iconColor: 'text-accent-teal',
    devices: ['Phone charger', 'Google Nest Hub', 'MacBook Pro charger', '→ Havells Strip B'],
  },
  {
    id: 'havells-b',
    name: 'Havells Strip B',
    color: 'border-bg-border2 text-text-secondary',
    iconColor: 'text-text-muted',
    devices: ['Asus TUF F15 charger', 'TP-Link TL-SG105E switch', 'Raspberry Pi 5'],
    note: 'Fed by Belkin 8-port',
  },
]

export default function PowerChain() {
  return (
    <section id="power" className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-serif text-2xl font-light italic text-text-primary mb-1">Power Chain</h2>
        <p className="font-mono text-xs text-text-muted">Three strips, everything accounted for</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {strips.map((strip, si) => (
          <motion.div
            key={strip.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: si * 0.1, duration: 0.45, ease: 'easeOut' }}
            className={`border rounded-sm bg-bg-surface p-4 ${strip.color}`}
          >
            {/* Strip header */}
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className={strip.iconColor} />
              <span className="font-mono text-xs font-medium">{strip.name}</span>
            </div>
            {strip.note && (
              <div className="font-mono text-[10px] text-text-muted mb-3 border-b border-bg-border pb-2">
                {strip.note}
              </div>
            )}
            <ul className="space-y-2">
              {strip.devices.map((dev, di) => (
                <motion.li
                  key={di}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1 + di * 0.05 + 0.1, duration: 0.3 }}
                  className="flex items-center gap-2 font-mono text-[11px] text-text-secondary"
                >
                  <span className="w-1 h-1 rounded-full bg-current shrink-0 opacity-60" />
                  {dev}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
