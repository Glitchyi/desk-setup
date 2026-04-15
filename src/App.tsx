import { useState } from 'react'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import GearGrid from './components/GearGrid'
import SetupDiagram from './components/SetupDiagram'
import PowerChain from './components/PowerChain'
import Footer from './components/Footer'
import { GEAR, CATEGORIES } from './data/gear'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? GEAR
    : GEAR.filter(g => g.category === activeCategory)

  const counts = Object.fromEntries(
    CATEGORIES.map(c => [
      c.id,
      c.id === 'all' ? GEAR.length : GEAR.filter(g => g.category === c.id).length,
    ])
  )

  return (
    <div className="min-h-screen bg-bg-base">
      <Hero />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section>
          <FilterBar
            active={activeCategory}
            onChange={setActiveCategory}
            categories={CATEGORIES}
            counts={counts}
          />
          <div className="mt-6">
            <GearGrid items={filtered} />
          </div>
        </section>
        <SetupDiagram />
        <PowerChain />
      </main>
      <Footer />
    </div>
  )
}
