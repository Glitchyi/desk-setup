import { motion } from 'framer-motion'

// ─── Primitives ──────────────────────────────────────────────────────────────

const W = 130   // box width
const H = 36    // box height
const HW = W / 2
const HH = H / 2

interface BoxProps {
  cx: number; cy: number
  label: string; sub?: string
  color?: 'amber' | 'teal' | 'muted'
  index?: number
}

const COLOR_MAP = {
  amber: { rect: 'fill-bg-raised stroke-accent-amber/50', text: 'fill-accent-amber',    sub: 'fill-accent-amber/50' },
  teal:  { rect: 'fill-bg-raised stroke-accent-teal/50',  text: 'fill-accent-teal',     sub: 'fill-accent-teal/50'  },
  muted: { rect: 'fill-bg-raised stroke-bg-border2',      text: 'fill-text-secondary',  sub: 'fill-text-muted'      },
}

function Box({ cx, cy, label, sub, color = 'muted', index = 0 }: BoxProps) {
  const c = COLOR_MAP[color]
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
    >
      <rect
        x={cx - HW} y={cy - HH}
        width={W} height={H}
        rx={3}
        className={`${c.rect} stroke-[1]`}
      />
      <text
        x={cx} y={cy - (sub ? 5 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`${c.text} font-mono`}
        style={{ fontSize: 11, fontWeight: 500 }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx} y={cy + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className={c.sub}
          style={{ fontSize: 9 }}
        >
          {sub}
        </text>
      )}
    </motion.g>
  )
}

interface LineProps {
  points: [number, number][]
  label?: string
  color?: 'amber' | 'teal' | 'muted'
  dashed?: boolean
  index?: number
}

const LINE_COLOR = {
  amber: '#c8a96e',
  teal:  '#7fb5b0',
  muted: '#333330',
}

function Line({ points, label, color = 'muted', dashed = false, index = 0 }: LineProps) {
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const mid = points[Math.floor(points.length / 2)]
  const strokeColor = LINE_COLOR[color]
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
    >
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '4 3' : undefined}
        markerEnd={`url(#arrow-${color})`}
        opacity={0.8}
      />
      {label && (
        <text
          x={mid[0]} y={mid[1] - 5}
          textAnchor="middle"
          fill={strokeColor}
          style={{ fontSize: 8, opacity: 0.7 }}
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}

function SectionLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x} y={y}
      fill="#c8a96e"
      style={{ fontSize: 8, fontFamily: 'DM Mono, monospace', letterSpacing: 2, opacity: 0.7 }}
    >
      — {text.toUpperCase()}
    </text>
  )
}

// ─── Layout constants ────────────────────────────────────────────────────────

// Network row 1: y=60
const N_ISP    = [65,  60] as [number,number]
const N_RTR    = [235, 60] as [number,number]
const N_SW     = [420, 60] as [number,number]
const N_PI5    = [600, 60] as [number,number]
// Network row 2: y=130
const N_MAC    = [235,130] as [number,number]
const N_TUF    = [420,130] as [number,number]

// KVM row 1: y=225
const K_TUF    = [100,225] as [number,number]
const K_KVM    = [370,225] as [number,number]
const K_MAC    = [640,225] as [number,number]
// KVM row 2: y=310
const K_MON    = [205,310] as [number,number]
const K_KB     = [370,310] as [number,number]
const K_MIC    = [535,310] as [number,number]

// Audio row 1: y=390
const A_KUSB   = [60, 390] as [number,number]
const A_FOSI   = [250,390] as [number,number]
const A_MAC2   = [440,390] as [number,number]
// Audio row 2: y=455
const A_TUSC   = [60, 455] as [number,number]
const A_IFI    = [250,455] as [number,number]
const A_IE200  = [440,455] as [number,number]

// ─── Main component ──────────────────────────────────────────────────────────

export default function SetupDiagram() {
  return (
    <section id="diagram" className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-serif text-2xl font-light italic text-text-primary mb-1">Signal Flow</h2>
        <p className="font-mono text-xs text-text-muted">How everything connects</p>
      </motion.div>

      <div className="border border-bg-border rounded-sm bg-bg-surface p-4 overflow-x-auto">
        <svg
          viewBox="0 0 760 490"
          className="w-full min-w-[600px]"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          {/* ── Arrow marker defs ── */}
          <defs>
            {(['amber','teal','muted'] as const).map(c => (
              <marker
                key={c}
                id={`arrow-${c}`}
                markerWidth="7" markerHeight="7"
                refX="5" refY="3.5"
                orient="auto"
              >
                <path
                  d="M0,0.5 L0,6.5 L6,3.5 z"
                  fill={LINE_COLOR[c]}
                  opacity={0.9}
                />
              </marker>
            ))}
          </defs>

          {/* ══════════ NETWORK ══════════ */}
          <SectionLabel x={10} y={22} text="Network" />
          <line x1={10} y1={28} x2={740} y2={28} stroke="#252522" strokeWidth={1} />

          {/* Network connections */}
          <Line points={[[N_ISP[0]+HW,60],[N_RTR[0]-HW,60]]} label="WAN" color="teal" index={0} />
          <Line points={[[N_RTR[0]+HW,60],[N_SW[0]-HW,60]]} label="ETH" color="teal" index={1} />
          <Line points={[[N_SW[0]+HW,60],[N_PI5[0]-HW,60]]} label="ETH" color="teal" index={2} />
          {/* Router → MacBook (WiFi dashed) */}
          <Line points={[[N_RTR[0],60+HH],[N_RTR[0],N_MAC[1]-HH]]} label="WiFi 6" color="teal" dashed index={3} />
          {/* Switch → Asus TUF (wired) */}
          <Line points={[[N_SW[0],60+HH],[N_SW[0],N_TUF[1]-HH]]} label="ETH" color="teal" index={4} />

          {/* Network boxes */}
          <Box cx={N_ISP[0]} cy={N_ISP[1]} label="ISP" color="muted" index={0} />
          <Box cx={N_RTR[0]} cy={N_RTR[1]} label="AX1500" sub="Router · WiFi 6" color="teal" index={1} />
          <Box cx={N_SW[0]}  cy={N_SW[1]}  label="TL-SG105E" sub="5-port switch" color="teal" index={2} />
          <Box cx={N_PI5[0]} cy={N_PI5[1]} label="Raspberry Pi 5" sub="Homelab · Linux" color="teal" index={3} />
          <Box cx={N_MAC[0]} cy={N_MAC[1]} label="MacBook Pro" sub="M3 Pro · macOS" color="amber" index={4} />
          <Box cx={N_TUF[0]} cy={N_TUF[1]} label="Asus TUF F15" sub="Windows" color="amber" index={5} />

          {/* ══════════ KVM ══════════ */}
          <SectionLabel x={10} y={183} text="KVM + Display" />
          <line x1={10} y1={189} x2={740} y2={189} stroke="#252522" strokeWidth={1} />

          {/* Asus TUF → KVM */}
          <Line
            points={[[K_TUF[0]+HW, K_TUF[1]], [K_KVM[0]-HW, K_KVM[1]]]}
            label="HDMI+USB" color="amber" index={5}
          />
          {/* MacBook → KVM */}
          <Line
            points={[[K_MAC[0]-HW, K_MAC[1]], [K_KVM[0]+HW, K_KVM[1]]]}
            label="HDMI+USB" color="amber" index={6}
          />
          {/* KVM → Monitor (route through intermediate point) */}
          <Line
            points={[
              [K_KVM[0]-60, K_KVM[1]+HH],
              [K_KVM[0]-60, K_KVM[1]+42],
              [K_MON[0],    K_KVM[1]+42],
              [K_MON[0],    K_MON[1]-HH],
            ]}
            label="HDMI" color="teal" index={7}
          />
          {/* KVM → Keyboard/Mouse (straight down) */}
          <Line
            points={[[K_KVM[0], K_KVM[1]+HH], [K_KVM[0], K_KB[1]-HH]]}
            label="USB" color="teal" index={8}
          />
          {/* KVM → Mic (right branch) */}
          <Line
            points={[
              [K_KVM[0]+60, K_KVM[1]+HH],
              [K_KVM[0]+60, K_KVM[1]+42],
              [K_MIC[0],    K_KVM[1]+42],
              [K_MIC[0],    K_MIC[1]-HH],
            ]}
            label="USB" color="teal" index={9}
          />

          {/* KVM boxes */}
          <Box cx={K_TUF[0]} cy={K_TUF[1]} label="Asus TUF F15" color="amber" index={6} />
          <Box cx={K_KVM[0]} cy={K_KVM[1]} label="Ugreen KVM" sub="HDMI · 4K@60Hz" color="amber" index={7} />
          <Box cx={K_MAC[0]} cy={K_MAC[1]} label="MacBook Pro" color="amber" index={8} />
          <Box cx={K_MON[0]} cy={K_MON[1]} label="XV272U V3" sub={'27" WQHD 180Hz'} color="teal" index={9} />
          <Box cx={K_KB[0]}  cy={K_KB[1]}  label="NuPhy + Viper" sub="KB + Mouse" color="muted" index={10} />
          <Box cx={K_MIC[0]} cy={K_MIC[1]} label="FIFINE A6T" sub="USB Mic" color="muted" index={11} />

          {/* ══════════ AUDIO ══════════ */}
          <SectionLabel x={10} y={352} text="Audio" />
          <line x1={10} y1={358} x2={740} y2={358} stroke="#252522" strokeWidth={1} />

          {/* Chain 1: KVM USB Audio → Fosi K5 → Mackie */}
          <Line points={[[A_KUSB[0]+HW, A_KUSB[1]], [A_FOSI[0]-HW, A_FOSI[1]]]} label="USB" color="amber" index={10} />
          <Line points={[[A_FOSI[0]+HW, A_FOSI[1]], [A_MAC2[0]-HW, A_MAC2[1]]]} label="RCA" color="amber" index={11} />

          {/* Chain 2: TUF USB-C → iFi GO → IE 200 */}
          <Line points={[[A_TUSC[0]+HW, A_TUSC[1]], [A_IFI[0]-HW, A_IFI[1]]]} label="USB-C" color="amber" index={12} />
          <Line points={[[A_IFI[0]+HW, A_IFI[1]], [A_IE200[0]-HW, A_IE200[1]]]} label="3.5mm" color="amber" index={13} />

          {/* Audio boxes */}
          <Box cx={A_KUSB[0]} cy={A_KUSB[1]} label="KVM Audio" sub="USB shared" color="muted" index={12} />
          <Box cx={A_FOSI[0]} cy={A_FOSI[1]} label="Fosi K5 Pro" sub="DAC / Amp" color="amber" index={13} />
          <Box cx={A_MAC2[0]} cy={A_MAC2[1]} label="Mackie CR3-X" sub="Monitors" color="amber" index={14} />
          <Box cx={A_TUSC[0]} cy={A_TUSC[1]} label="TUF USB-C" sub="Windows only" color="muted" index={15} />
          <Box cx={A_IFI[0]}  cy={A_IFI[1]}  label="iFi GO Link" sub="Portable DAC" color="amber" index={16} />
          <Box cx={A_IE200[0]} cy={A_IE200[1]} label="IE 200 / MD" sub="IEMs" color="amber" index={17} />
        </svg>
      </div>
    </section>
  )
}
