import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { GEAR, GEAR_EDGES, type Category } from '../data/gear'

// ─── Colours ─────────────────────────────────────────────────────────────────

const CAT_COLOR: Record<Category, string> = {
  computers:   '#7fb5b0',
  kvm:         '#c8a96e',
  display:     '#7fb5b0',
  audio:       '#c8a96e',
  peripherals: '#555450',
  network:     '#7fb5b0',
  power:       '#c8a96e',
  furniture:   '#555450',
  homelab:     '#7fb5b0',
  extras:      '#c8a96e',
}

const EDGE_COLOR: Record<string, string> = {
  signal:   '#c8a96e44',
  network:  '#7fb5b044',
  power:    '#bf616a33',
  physical: '#55545044',
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface SimNode extends d3.SimulationNodeDatum {
  id: string
  label: string
  category: Category
  r: number
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  label: string
  type: string
}

// ─── Build simulation data ────────────────────────────────────────────────────

// Count connections per node
const degreeMap = new Map<string, number>()
GEAR_EDGES.forEach(e => {
  degreeMap.set(e.source, (degreeMap.get(e.source) ?? 0) + 1)
  degreeMap.set(e.target, (degreeMap.get(e.target) ?? 0) + 1)
})

const nodes: SimNode[] = GEAR.map(g => ({
  id: g.id,
  label: g.name,
  category: g.category,
  r: 5 + Math.min((degreeMap.get(g.id) ?? 0) * 1.5, 10),
}))

const nodeMap = new Map(nodes.map(n => [n.id, n]))

const links: SimLink[] = GEAR_EDGES
  .filter(e => nodeMap.has(e.source) && nodeMap.has(e.target))
  .map(e => ({
    source: e.source,
    target: e.target,
    label: e.label,
    type: e.type,
  }))

// ─── Component ───────────────────────────────────────────────────────────────

export default function ConnectionGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const simRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null)
  const [dimensions, setDimensions] = useState({ w: 800, h: 520 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map())

  // ── Measure container
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setDimensions({ w: Math.max(w, 400), h: Math.max(w * 0.65, 380) })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── Run simulation
  useEffect(() => {
    const { w, h } = dimensions

    // Deep-clone nodes to avoid mutating originals across re-runs
    const simNodes: SimNode[] = nodes.map(n => ({ ...n }))
    const simLinks: SimLink[] = links.map(l => ({ ...l }))

    simRef.current?.stop()

    const sim = d3
      .forceSimulation<SimNode>(simNodes)
      .force('link', d3.forceLink<SimNode, SimLink>(simLinks).id(d => d.id).distance(90).strength(0.4))
      .force('charge', d3.forceManyBody<SimNode>().strength(-220))
      .force('center', d3.forceCenter(w / 2, h / 2))
      .force('collide', d3.forceCollide<SimNode>(d => d.r + 16))
      .force('x', d3.forceX(w / 2).strength(0.04))
      .force('y', d3.forceY(h / 2).strength(0.04))
      .alphaDecay(0.025)

    simRef.current = sim

    let frame = 0
    sim.on('tick', () => {
      frame++
      if (frame % 2 !== 0) return // skip every other tick for perf
      setPositions(new Map(simNodes.map(n => [n.id, { x: n.x ?? w/2, y: n.y ?? h/2 }])))
    })

    return () => { sim.stop() }
  }, [dimensions])

  // ── Drag handler
  const onMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    const sim = simRef.current
    if (!sim) return
    const node = (sim.nodes() as SimNode[]).find(n => n.id === nodeId)
    if (!node) return

    node.fx = node.x
    node.fy = node.y
    sim.alphaTarget(0.3).restart()

    const onMove = (me: MouseEvent) => {
      const svg = svgRef.current!.getBoundingClientRect()
      node.fx = me.clientX - svg.left
      node.fy = me.clientY - svg.top
    }
    const onUp = () => {
      node.fx = null
      node.fy = null
      sim.alphaTarget(0)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  const { w, h } = dimensions
  const hovered = hoveredId ? GEAR.find(g => g.id === hoveredId) : null

  return (
    <section id="graph" className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-serif text-2xl font-light italic text-text-primary mb-1">
          Connection Graph
        </h2>
        <p className="font-mono text-xs text-text-muted">
          Every device and how it relates — drag nodes to explore
        </p>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative border border-bg-border rounded-sm bg-bg-surface overflow-hidden"
        style={{ height: h }}
      >
        {/* Legend */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {[
            { color: '#7fb5b0', label: 'computers / network / display' },
            { color: '#c8a96e', label: 'audio / kvm / power / extras' },
            { color: '#555450', label: 'peripherals / furniture' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="font-mono text-[9px] text-text-muted">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 right-3 z-10 border border-bg-border2 rounded-sm bg-bg-raised px-3 py-2 font-mono max-w-[200px]"
          >
            <div className="text-[11px] text-text-primary font-medium">{hovered.name}</div>
            <div className="text-[9px] text-text-muted mt-0.5 capitalize">{hovered.category}</div>
            {hovered.subcategory && (
              <div className="text-[9px] text-text-muted">{hovered.subcategory}</div>
            )}
            <div className="text-[9px] text-accent-amber mt-1">
              {degreeMap.get(hovered.id) ?? 0} connection{(degreeMap.get(hovered.id) ?? 0) !== 1 ? 's' : ''}
            </div>
          </motion.div>
        )}

        <svg
          ref={svgRef}
          width={w}
          height={h}
          className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
        >
          <defs>
            {/* Radial glow filter */}
            <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Edges ── */}
          <g>
            {links.map((link, i) => {
              const sid = typeof link.source === 'object' ? (link.source as SimNode).id : link.source as string
              const tid = typeof link.target === 'object' ? (link.target as SimNode).id : link.target as string
              const s = positions.get(sid)
              const t = positions.get(tid)
              if (!s || !t) return null
              const isActive = hoveredId === sid || hoveredId === tid
              return (
                <line
                  key={i}
                  x1={s.x} y1={s.y}
                  x2={t.x} y2={t.y}
                  stroke={isActive ? (hoveredId === sid ? CAT_COLOR[(nodeMap.get(sid)?.category ?? 'extras')] : CAT_COLOR[(nodeMap.get(tid)?.category ?? 'extras')]) : EDGE_COLOR[link.type] ?? '#33333044'}
                  strokeWidth={isActive ? 1.5 : 1}
                  opacity={hoveredId && !isActive ? 0.15 : 0.6}
                  style={{ transition: 'opacity 0.15s, stroke-width 0.15s' }}
                />
              )
            })}
          </g>

          {/* ── Nodes ── */}
          <g>
            {nodes.map(node => {
              const pos = positions.get(node.id)
              if (!pos) return null
              const color = CAT_COLOR[node.category]
              const isHovered = hoveredId === node.id
              const isConnected = hoveredId ? links.some(l => {
                const sid = typeof l.source === 'object' ? (l.source as SimNode).id : l.source as string
                const tid = typeof l.target === 'object' ? (l.target as SimNode).id : l.target as string
                return (sid === hoveredId && tid === node.id) || (tid === hoveredId && sid === node.id)
              }) : false
              const dimmed = hoveredId && !isHovered && !isConnected

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x},${pos.y})`}
                  style={{ cursor: 'grab', opacity: dimmed ? 0.2 : 1, transition: 'opacity 0.15s' }}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseDown={e => onMouseDown(e, node.id)}
                >
                  {/* Glow ring for hovered/connected */}
                  {(isHovered || isConnected) && (
                    <circle
                      r={node.r + 5}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0.3}
                    />
                  )}
                  {/* Main dot */}
                  <circle
                    r={isHovered ? node.r + 2 : node.r}
                    fill={color}
                    opacity={isHovered ? 1 : 0.85}
                    filter={isHovered ? `url(#glow-${color === '#c8a96e' ? 'amber' : 'teal'})` : undefined}
                    style={{ transition: 'r 0.15s' }}
                  />
                  {/* Label — always visible for high-degree nodes, hover for others */}
                  {(isHovered || isConnected || (degreeMap.get(node.id) ?? 0) >= 5) && (
                    <text
                      y={-(node.r + 5)}
                      textAnchor="middle"
                      fill={isHovered ? color : '#8a8780'}
                      style={{ fontSize: isHovered ? 10 : 8, fontFamily: 'DM Mono, monospace', pointerEvents: 'none' }}
                    >
                      {node.label.length > 18 ? node.label.slice(0, 17) + '…' : node.label}
                    </text>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </motion.div>
    </section>
  )
}
