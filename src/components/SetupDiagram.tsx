import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
}

function Node({
  label,
  sub,
  color = 'border-bg-border2 text-text-primary',
  index = 0,
}: {
  label: string
  sub?: string
  color?: string
  index?: number
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeIn}
      className={`px-3 py-2 border rounded-sm bg-bg-surface font-mono text-xs text-center ${color} min-w-[120px]`}
    >
      <div className="font-medium">{label}</div>
      {sub && <div className="text-text-muted text-[10px] mt-0.5">{sub}</div>}
    </motion.div>
  )
}

function Arrow({ label, vertical }: { label?: string; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-0.5`}>
      {label && <span className="font-mono text-[9px] text-text-muted">{label}</span>}
      <div className={vertical ? 'w-px h-6 bg-bg-border2' : 'h-px w-6 bg-bg-border2'} />
      <div className={vertical ? 'w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-bg-border2' : 'w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-bg-border2'} />
    </div>
  )
}

export default function SetupDiagram() {
  return (
    <section id="diagram" className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2 className="font-serif text-2xl font-light italic text-text-primary mb-1">Signal Flow</h2>
        <p className="font-mono text-xs text-text-muted">How everything connects</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="border border-bg-border rounded-sm bg-bg-surface p-6 overflow-x-auto"
      >
        {/* Network layer */}
        <div className="space-y-4">
          <div className="font-mono text-[10px] text-accent-amber uppercase tracking-widest mb-3">— Network</div>
          <div className="flex items-center gap-3 flex-wrap">
            <Node label="ISP" index={0} />
            <Arrow label="WAN" />
            <Node label="AX1500 Router" sub="WiFi 6" color="border-accent-teal/40 text-accent-teal" index={1} />
            <Arrow label="ETH" />
            <Node label="TL-SG105E" sub="5-port managed" color="border-accent-teal/30 text-text-primary" index={2} />
          </div>
          <div className="flex items-start gap-8 ml-[calc(180px+1.5rem)] flex-wrap">
            <div className="flex flex-col items-center gap-1">
              <Arrow vertical />
              <Node label="Asus TUF F15" sub="Windows" color="border-accent-teal/30 text-text-primary" index={3} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Arrow vertical />
              <Node label="Raspberry Pi 5" sub="Homelab" color="border-accent-teal/30 text-text-primary" index={4} />
            </div>
            <div className="flex flex-col items-center gap-1 -mt-10">
              <div className="font-mono text-[9px] text-text-muted mb-0.5">WiFi 6</div>
              <div className="w-px h-6 bg-accent-teal/30 border-dashed" />
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-accent-teal/30" />
              <Node label="MacBook Pro" sub="M3 Pro · macOS" color="border-accent-amber/40 text-accent-amber" index={5} />
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-bg-border" />

        {/* KVM layer */}
        <div className="space-y-4">
          <div className="font-mono text-[10px] text-accent-amber uppercase tracking-widest mb-3">— KVM & Display</div>
          <div className="flex items-center gap-3 flex-wrap">
            <Node label="Asus TUF F15" sub="HDMI + USB" index={6} />
            <Arrow label="HDMI" />
            <Node label="Ugreen KVM" sub="Core hub" color="border-accent-amber/60 text-accent-amber" index={7} />
            <Arrow label="HDMI" />
            <Node label="MacBook Pro" sub="HDMI + USB" index={8} />
          </div>
          <div className="flex items-start gap-6 ml-[calc(160px+1.5rem)] flex-wrap">
            {[
              { label: 'Acer XV272U V3', sub: '27" WQHD 180Hz', i: 9 },
              { label: 'NuPhy + Viper', sub: 'Keyboard + Mouse', i: 10 },
              { label: 'FIFINE A6T', sub: 'USB Mic', i: 11 },
            ].map((n) => (
              <div key={n.label} className="flex flex-col items-center gap-1">
                <Arrow vertical />
                <Node label={n.label} sub={n.sub} index={n.i} />
              </div>
            ))}
          </div>
        </div>

        <div className="my-6 h-px bg-bg-border" />

        {/* Audio layer */}
        <div className="space-y-4">
          <div className="font-mono text-[10px] text-accent-amber uppercase tracking-widest mb-3">— Audio</div>
          <div className="flex items-center gap-3 flex-wrap">
            <Node label="KVM USB Audio" sub="shared" index={12} />
            <Arrow label="USB" />
            <Node label="Fosi K5 Pro" sub="DAC / Amp" color="border-accent-amber/40 text-accent-amber" index={13} />
            <Arrow label="RCA" />
            <Node label="Mackie CR3-X" sub="Studio Monitors" color="border-accent-amber/30 text-text-primary" index={14} />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Node label="Asus TUF USB-C" sub="Windows only" index={15} />
            <Arrow label="USB-C" />
            <Node label="iFi GO Link" sub="Portable DAC" color="border-accent-amber/40 text-accent-amber" index={16} />
            <Arrow label="3.5mm" />
            <Node label="IE 200 / Moondrop" sub="IEMs" color="border-accent-amber/30 text-text-primary" index={17} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
