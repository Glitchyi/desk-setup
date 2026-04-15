import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-bg-border mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted">
          Built with React + Vite · Deployed on Cloudflare Pages
        </span>
        <span className="font-mono text-xs text-text-muted">
          {new Date().getFullYear()}
        </span>
      </div>
    </motion.footer>
  )
}
