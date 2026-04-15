# Desk Setup

An interactive, visual representation of my desk setup, gear, and connectivity chain. Built with React, Vite, TailwindCSS, D3.js, and Framer Motion.

## Features

- **Categorized Gear Grid**: Browse all devices and peripherals categorized and filterable.
- **Setup Diagram**: Visual layout of where everything physically sits.
- **Power Chain**: See how everything gets power from the wall to the device.
- **Connection Graph**: An interactive D3.js powered graph showing data/audio/video connectivity between components.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: D3.js

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Structure

- `src/components/`: Reusable React components (`Hero`, `FilterBar`, `GearGrid`, `SetupDiagram`, `PowerChain`, `ConnectionGraph`, `Footer`).
- `src/data/`: Static data representing the gear and relationships (`gear.ts`).
- `src/lib/`: Utility functions.
