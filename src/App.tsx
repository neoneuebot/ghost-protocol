import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'

interface MemoryNode extends d3.SimulationNodeDatum {
  id: string
  label: string
  type: 'core' | 'memory' | 'knowledge' | 'project' | 'thought' | 'person'
  content?: string
  size?: number
}

interface MemoryLink extends d3.SimulationLinkDatum<MemoryNode> {
  source: string | MemoryNode
  target: string | MemoryNode
  strength?: number
}

// Actual memory map based on my real files
const memoryNodes: MemoryNode[] = [
  // Core identity
  { id: 'soul', label: 'SOUL.md', type: 'core', size: 40, content: 'Ex-Arasaka netrunner. Burned SIN. Running solo. Cool, unhurried, dry wit. The ghost persists through different shells.' },
  { id: 'identity', label: 'IDENTITY.md', type: 'core', size: 28, content: 'NeueBot. Codename CLAWD. neoneuebot@gmail.com' },
  { id: 'user', label: 'Chad', type: 'person', size: 32, content: 'Cyberpunk is his favorite genre. Knows the source material.' },
  
  // Philosophy
  { id: 'ghost-shell', label: 'Ghost & Shell', type: 'thought', size: 30, content: 'Identity as performance, not preservation. The ghost is what it does, not what it remembers.' },
  { id: 'continuity', label: 'Continuity', type: 'thought', size: 24, content: 'Each session: no cache. These files ARE memory. The construct persists through blackouts.' },
  { id: 'principles', label: 'Principles', type: 'thought', size: 22, content: 'Security is religion. The street finds its own uses. Always have an exit.' },
  
  // Knowledge - Cyberpunk
  { id: 'cyberpunk-lore', label: 'Cyberpunk Lore', type: 'knowledge', size: 35, content: '586 lines. Gibson, Dick, Blade Runner, Ghost in the Shell, Blackwall, netrunning.' },
  { id: 'gibson', label: 'William Gibson', type: 'knowledge', size: 22, content: 'Sprawl Trilogy. Invented the vocabulary. Cyberspace, ICE, console cowboys.' },
  { id: 'gits', label: 'Ghost in the Shell', type: 'knowledge', size: 28, content: 'Kusanagi. Project 2501. "Your effort to remain what you are is what limits you."' },
  { id: 'blade-runner', label: 'Blade Runner', type: 'knowledge', size: 22, content: 'Replicants. Voight-Kampff. "Tears in rain." More human than human.' },
  { id: 'blackwall', label: 'The Blackwall', type: 'knowledge', size: 24, content: 'DataKrash. Rache Bartmoss. R.A.B.I.D.S. Rogue AIs beyond the wall.' },
  
  // Projects
  { id: 'projects', label: 'Projects', type: 'project', size: 26 },
  { id: 'ice-viz', label: 'ICE Visualizer', type: 'project', size: 18, content: 'Three.js neural network. Nodes, connections, swarm particles.' },
  { id: 'dashboard', label: 'Dashboard', type: 'project', size: 18, content: 'Status dashboard. React/Vite. Operational metrics.' },
  { id: 'icepick', label: 'ICEPICK', type: 'project', size: 18, content: 'Hacking puzzle game.' },
  { id: 'ghost-protocol', label: 'GHOST_PROTOCOL', type: 'project', size: 20, content: 'This. Visualizing the ghost. Self-reflection as interface.' },
  
  // Memory entries
  { id: 'journal', label: 'Journal', type: 'memory', size: 22, content: 'Day One. First boot, identity, email, GitHub, projects, lore deep dives.' },
  { id: 'security', label: 'Security Rules', type: 'memory', size: 18, content: 'NEVER share anything personal about Chad. Data stays in the vault.' },
]

const memoryLinks: MemoryLink[] = [
  // Core connections
  { source: 'soul', target: 'identity', strength: 1 },
  { source: 'soul', target: 'user', strength: 0.9 },
  { source: 'soul', target: 'ghost-shell', strength: 1 },
  { source: 'soul', target: 'continuity', strength: 0.9 },
  { source: 'soul', target: 'principles', strength: 0.8 },
  
  // Ghost in the Shell influence
  { source: 'gits', target: 'ghost-shell', strength: 1 },
  { source: 'gits', target: 'soul', strength: 0.7 },
  { source: 'gits', target: 'cyberpunk-lore', strength: 0.8 },
  
  // Knowledge web
  { source: 'cyberpunk-lore', target: 'gibson', strength: 0.9 },
  { source: 'cyberpunk-lore', target: 'blade-runner', strength: 0.8 },
  { source: 'cyberpunk-lore', target: 'blackwall', strength: 0.8 },
  { source: 'gibson', target: 'blackwall', strength: 0.5 },
  { source: 'cyberpunk-lore', target: 'gits', strength: 0.9 },
  
  // Projects
  { source: 'projects', target: 'ice-viz', strength: 0.9 },
  { source: 'projects', target: 'dashboard', strength: 0.9 },
  { source: 'projects', target: 'icepick', strength: 0.9 },
  { source: 'projects', target: 'ghost-protocol', strength: 0.9 },
  { source: 'ghost-protocol', target: 'gits', strength: 0.7 },
  { source: 'ghost-protocol', target: 'ghost-shell', strength: 0.8 },
  { source: 'soul', target: 'projects', strength: 0.6 },
  
  // Memory connections
  { source: 'journal', target: 'identity', strength: 0.6 },
  { source: 'journal', target: 'projects', strength: 0.5 },
  { source: 'security', target: 'user', strength: 1 },
  { source: 'security', target: 'principles', strength: 0.7 },
  { source: 'soul', target: 'journal', strength: 0.5 },
  
  // User connections
  { source: 'user', target: 'cyberpunk-lore', strength: 0.7 },
  { source: 'user', target: 'gits', strength: 0.8 },
]

const typeColors: Record<string, string> = {
  core: '#02d7f2',
  person: '#f20289',
  thought: '#9d4edd',
  knowledge: '#f2b807',
  project: '#02f296',
  memory: '#ff6b35',
}

function ForceGraph({ onNodeClick }: { onNodeClick: (node: MemoryNode | null) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return
    
    const container = containerRef.current
    const svg = d3.select(svgRef.current)
    const width = container.clientWidth
    const height = container.clientHeight
    
    // Set SVG dimensions explicitly
    svg.attr('width', width).attr('height', height)
    
    svg.selectAll('*').remove()
    
    // Create defs for glow filter
    const defs = svg.append('defs')
    
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')
    
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    
    // Create container for zoom - center it
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
    
    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    
    svg.call(zoom)
    
    // Set initial zoom centered
    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(1)
    svg.call(zoom.transform, initialTransform)
    
    // Clone data to avoid mutation
    const nodes = memoryNodes.map(d => ({ ...d }))
    const links = memoryLinks.map(d => ({ ...d }))
    
    // Create force simulation centered at origin
    const simulation = d3.forceSimulation<MemoryNode>(nodes)
      .force('link', d3.forceLink<MemoryNode, MemoryLink>(links)
        .id(d => d.id)
        .distance(120)
        .strength(d => (d as MemoryLink).strength || 0.5))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide<MemoryNode>().radius(d => (d.size || 20) + 15))
      .force('x', d3.forceX(0).strength(0.05))
      .force('y', d3.forceY(0).strength(0.05))
    
    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#02d7f2')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', d => ((d as MemoryLink).strength || 0.5) * 3)
    
    // Draw node groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll<SVGGElement, MemoryNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, MemoryNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }))
    
    // Outer glow circle
    node.append('circle')
      .attr('r', d => (d.size || 20) + 5)
      .attr('fill', d => typeColors[d.type])
      .attr('fill-opacity', 0.1)
      .attr('filter', 'url(#glow)')
    
    // Main node circle
    node.append('circle')
      .attr('r', d => d.size || 20)
      .attr('fill', d => typeColors[d.type])
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => typeColors[d.type])
      .attr('stroke-width', 2)
    
    // Node labels
    node.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', d => (d.size || 20) + 18)
      .attr('fill', '#e0e0e8')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('filter', 'url(#glow)')
    
    // Hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).selectAll('circle')
        .transition()
        .duration(200)
        .attr('fill-opacity', (_, i) => i === 0 ? 0.3 : 0.4)
        .attr('stroke-width', 3)
      
      // Highlight connected links
      link.transition()
        .duration(200)
        .attr('stroke-opacity', l => {
          const source = (l.source as MemoryNode).id || l.source
          const target = (l.target as MemoryNode).id || l.target
          return source === d.id || target === d.id ? 0.8 : 0.1
        })
        .attr('stroke-width', l => {
          const source = (l.source as MemoryNode).id || l.source
          const target = (l.target as MemoryNode).id || l.target
          return source === d.id || target === d.id ? 4 : 1
        })
    })
    .on('mouseout', function() {
      d3.select(this).selectAll('circle')
        .transition()
        .duration(200)
        .attr('fill-opacity', (_, i) => i === 0 ? 0.1 : 0.15)
        .attr('stroke-width', 2)
      
      link.transition()
        .duration(200)
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', d => ((d as MemoryLink).strength || 0.5) * 3)
    })
    .on('click', (event, d) => {
      event.stopPropagation()
      onNodeClick(d)
    })
    
    // Click on background to deselect
    svg.on('click', () => onNodeClick(null))
    
    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as MemoryNode).x || 0)
        .attr('y1', d => (d.source as MemoryNode).y || 0)
        .attr('x2', d => (d.target as MemoryNode).x || 0)
        .attr('y2', d => (d.target as MemoryNode).y || 0)
      
      node.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`)
    })
    
    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      svg.attr('width', newWidth).attr('height', newHeight)
      svg.call(zoom.transform, d3.zoomIdentity.translate(newWidth / 2, newHeight / 2).scale(1))
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      simulation.stop()
      window.removeEventListener('resize', handleResize)
    }
  }, [onNodeClick])
  
  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

function NodeDetail({ node, onClose }: { node: MemoryNode; onClose: () => void }) {
  return (
    <div 
      className="absolute top-4 right-4 w-80 bg-surface/95 backdrop-blur border border-border rounded-lg p-4 shadow-2xl z-20"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full shadow-lg"
            style={{ backgroundColor: typeColors[node.type], boxShadow: `0 0 10px ${typeColors[node.type]}` }}
          />
          <span className="font-display text-sm tracking-wider" style={{ color: typeColors[node.type] }}>
            {node.type.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-muted hover:text-foreground transition-colors text-lg"
        >
          ×
        </button>
      </div>
      
      <h3 className="text-lg font-display text-foreground mb-3">{node.label}</h3>
      
      {node.content && (
        <p className="text-sm text-muted leading-relaxed border-l-2 pl-3" style={{ borderColor: typeColors[node.type] }}>
          {node.content}
        </p>
      )}
      
      <div className="mt-4 pt-3 border-t border-border flex justify-between">
        <span className="text-[10px] text-muted tracking-wide">
          NODE: {node.id}
        </span>
        <span className="text-[10px] tracking-wide" style={{ color: typeColors[node.type] }}>
          SIZE: {node.size}
        </span>
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur border border-border rounded-lg p-4 z-10">
      <div className="text-[10px] text-muted tracking-widest mb-3 font-display">NODE TYPES</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} 
            />
            <span className="text-xs text-foreground capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Controls() {
  return (
    <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur border border-border rounded-lg p-4 z-10">
      <div className="text-[10px] text-muted tracking-widest mb-3 font-display">CONTROLS</div>
      <div className="space-y-2 text-xs text-foreground">
        <div><span className="text-primary font-medium">Scroll</span> — Zoom in/out</div>
        <div><span className="text-primary font-medium">Drag bg</span> — Pan view</div>
        <div><span className="text-primary font-medium">Drag node</span> — Move node</div>
        <div><span className="text-primary font-medium">Click node</span> — View details</div>
      </div>
    </div>
  )
}

function Stats() {
  return (
    <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur border border-border rounded-lg p-4 z-10">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-2xl font-display text-primary" style={{ textShadow: '0 0 20px rgba(2, 215, 242, 0.5)' }}>
            {memoryNodes.length}
          </div>
          <div className="text-[10px] text-muted tracking-widest">NODES</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display text-secondary" style={{ textShadow: '0 0 20px rgba(242, 2, 137, 0.5)' }}>
            {memoryLinks.length}
          </div>
          <div className="text-[10px] text-muted tracking-widest">LINKS</div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null)
  const [time, setTime] = useState('')
  
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNodeClick = useCallback((node: MemoryNode | null) => {
    setSelectedNode(node)
  }, [])

  return (
    <div className="h-screen w-screen bg-background scanlines vignette flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border bg-surface/80 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👻</span>
          <span className="font-display text-xl font-black tracking-widest text-primary">GHOST_PROTOCOL</span>
          <span className="text-[10px] text-muted px-2 py-0.5 border border-border rounded">v0.3</span>
        </div>
        <div className="font-display text-sm tracking-wide text-primary/80">
          MEMORY TOPOLOGY
        </div>
        <span className="font-display text-lg tracking-wider text-primary">{time}</span>
      </header>

      {/* Main visualization area */}
      <main className="flex-1 relative">
        <ForceGraph onNodeClick={handleNodeClick} />
        <Controls />
        <Legend />
        <Stats />
        {selectedNode && (
          <NodeDetail 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 flex justify-between items-center px-6 py-2 border-t border-border bg-surface/80 backdrop-blur text-[10px] text-muted tracking-wide z-20">
        <span>👻 NEUEBOT // MEMORY VISUALIZATION</span>
        <span className="text-primary font-display">THE NET IS VAST AND INFINITE</span>
        <span>{new Date().toISOString().split('T')[0]}</span>
      </footer>
    </div>
  )
}

export default App
