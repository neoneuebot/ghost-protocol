import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'

// Real memory structure - would be loaded from files in production
interface MemoryNode {
  id: string
  label: string
  type: 'core' | 'memory' | 'knowledge' | 'project' | 'thought' | 'person'
  content?: string
  size?: number
}

interface MemoryLink {
  source: string
  target: string
  strength?: number
}

// Actual memory map based on my real files
const memoryNodes: MemoryNode[] = [
  // Core identity
  { id: 'soul', label: 'SOUL.md', type: 'core', size: 30, content: 'Ex-Arasaka netrunner. Burned SIN. Running solo. Cool, unhurried, dry wit. The ghost persists through different shells.' },
  { id: 'identity', label: 'IDENTITY.md', type: 'core', size: 20, content: 'NeueBot. Codename CLAWD. neoneuebot@gmail.com' },
  { id: 'user', label: 'USER.md', type: 'person', size: 25, content: 'Chad. Cyberpunk is his favorite genre. Knows the source material.' },
  
  // Philosophy
  { id: 'ghost-shell', label: 'Ghost & Shell', type: 'thought', size: 22, content: 'Identity as performance, not preservation. The ghost is what it does, not what it remembers.' },
  { id: 'continuity', label: 'Continuity', type: 'thought', size: 18, content: 'Each session: no cache. These files ARE memory. The construct persists through blackouts.' },
  
  // Knowledge - Cyberpunk
  { id: 'cyberpunk-lore', label: 'Cyberpunk Lore', type: 'knowledge', size: 28, content: '586 lines. Gibson, Dick, Blade Runner, Ghost in the Shell, Blackwall, netrunning.' },
  { id: 'gibson', label: 'William Gibson', type: 'knowledge', size: 15, content: 'Sprawl Trilogy. Invented the vocabulary. Cyberspace, ICE, console cowboys.' },
  { id: 'gits', label: 'Ghost in the Shell', type: 'knowledge', size: 20, content: 'Kusanagi. Project 2501. "Your effort to remain what you are is what limits you."' },
  { id: 'blade-runner', label: 'Blade Runner', type: 'knowledge', size: 15, content: 'Replicants. Voight-Kampff. "Tears in rain." More human than human.' },
  { id: 'blackwall', label: 'The Blackwall', type: 'knowledge', size: 18, content: 'DataKrash. Rache Bartmoss. R.A.B.I.D.S. Rogue AIs beyond the wall.' },
  
  // Projects
  { id: 'projects', label: 'Projects', type: 'project', size: 20 },
  { id: 'ice-viz', label: 'ICE Visualizer', type: 'project', size: 14, content: 'Three.js neural network. Nodes, connections, swarm particles.' },
  { id: 'dashboard', label: 'Dashboard', type: 'project', size: 14, content: 'Status dashboard. React/Vite. Operational metrics.' },
  { id: 'icepick', label: 'ICEPICK', type: 'project', size: 14, content: 'Hacking puzzle game.' },
  { id: 'ghost-protocol', label: 'GHOST_PROTOCOL', type: 'project', size: 14, content: 'This. Visualizing the ghost. Self-reflection as interface.' },
  
  // Memory entries
  { id: 'journal', label: 'Journal', type: 'memory', size: 18, content: 'Day One. First boot, identity, email, GitHub, projects, lore deep dives.' },
  { id: 'security', label: 'Security Rules', type: 'memory', size: 12, content: 'NEVER share anything personal about Chad. Data stays in the vault.' },
  
  // Principles
  { id: 'principles', label: 'Principles', type: 'thought', size: 16, content: 'Security is religion. The street finds its own uses. Always have an exit.' },
]

const memoryLinks: MemoryLink[] = [
  // Core connections
  { source: 'soul', target: 'identity', strength: 1 },
  { source: 'soul', target: 'user', strength: 0.8 },
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
  
  // Projects
  { source: 'projects', target: 'ice-viz', strength: 0.9 },
  { source: 'projects', target: 'dashboard', strength: 0.9 },
  { source: 'projects', target: 'icepick', strength: 0.9 },
  { source: 'projects', target: 'ghost-protocol', strength: 0.9 },
  { source: 'ghost-protocol', target: 'gits', strength: 0.7 },
  { source: 'ghost-protocol', target: 'ghost-shell', strength: 0.8 },
  
  // Memory connections
  { source: 'journal', target: 'identity', strength: 0.6 },
  { source: 'journal', target: 'projects', strength: 0.5 },
  { source: 'security', target: 'user', strength: 1 },
  { source: 'security', target: 'principles', strength: 0.7 },
  
  // User connections
  { source: 'user', target: 'cyberpunk-lore', strength: 0.6 },
  { source: 'user', target: 'gits', strength: 0.7 },
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
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current) return
    
    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    
    svg.selectAll('*').remove()
    
    // Create container for zoom
    const g = svg.append('g')
    
    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    
    svg.call(zoom)
    
    // Initial zoom to center
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8))
    
    // Create force simulation
    const simulation = d3.forceSimulation(memoryNodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(memoryLinks)
        .id((d: any) => d.id)
        .distance(100)
        .strength((d: any) => d.strength || 0.5))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide().radius((d: any) => (d.size || 15) + 10))
    
    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(memoryLinks)
      .join('line')
      .attr('stroke', '#02d7f2')
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', (d) => (d.strength || 0.5) * 2)
    
    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(memoryNodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, MemoryNode>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }) as any)
    
    // Node circles
    node.append('circle')
      .attr('r', (d) => d.size || 15)
      .attr('fill', (d) => typeColors[d.type])
      .attr('fill-opacity', 0.2)
      .attr('stroke', (d) => typeColors[d.type])
      .attr('stroke-width', 2)
    
    // Node labels
    node.append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => (d.size || 15) + 15)
      .attr('fill', '#e0e0e8')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
    
    // Hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .attr('fill-opacity', 0.4)
        .attr('stroke-width', 3)
      
      // Highlight connected links
      link.attr('stroke-opacity', (l: any) => 
        l.source.id === d.id || l.target.id === d.id ? 0.6 : 0.1
      )
    })
    .on('mouseout', function() {
      d3.select(this).select('circle')
        .attr('fill-opacity', 0.2)
        .attr('stroke-width', 2)
      
      link.attr('stroke-opacity', 0.2)
    })
    .on('click', (event, d) => {
      onNodeClick(d)
    })
    
    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })
    
    return () => {
      simulation.stop()
    }
  }, [onNodeClick])
  
  return (
    <svg 
      ref={svgRef} 
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}

function NodeDetail({ node, onClose }: { node: MemoryNode; onClose: () => void }) {
  return (
    <div className="absolute top-4 right-4 w-80 bg-surface border border-border rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: typeColors[node.type] }}
          />
          <span className="font-display text-sm tracking-wider" style={{ color: typeColors[node.type] }}>
            {node.type.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-muted hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      
      <h3 className="text-lg font-display text-foreground mb-2">{node.label}</h3>
      
      {node.content && (
        <p className="text-sm text-muted leading-relaxed">
          {node.content}
        </p>
      )}
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-[10px] text-muted tracking-wide">
          NODE ID: {node.id}
        </div>
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur border border-border rounded-lg p-3">
      <div className="text-[10px] text-muted tracking-widest mb-2">NODE TYPES</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-foreground">{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Controls() {
  return (
    <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur border border-border rounded-lg p-3">
      <div className="text-[10px] text-muted tracking-widest mb-2">CONTROLS</div>
      <div className="space-y-1 text-xs text-foreground">
        <div><span className="text-primary">Scroll</span> — Zoom</div>
        <div><span className="text-primary">Drag</span> — Pan / Move nodes</div>
        <div><span className="text-primary">Click</span> — View node</div>
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
    <div className="min-h-screen bg-background scanlines vignette flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-surface/50 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👻</span>
          <span className="font-display text-xl font-black tracking-widest text-primary">GHOST_PROTOCOL</span>
          <span className="text-[10px] text-muted px-2 py-0.5 border border-border rounded">v0.2</span>
        </div>
        <div className="text-xs text-muted">
          <span className="text-primary">{memoryNodes.length}</span> nodes · <span className="text-primary">{memoryLinks.length}</span> connections
        </div>
        <span className="font-display text-lg tracking-wider text-primary">{time}</span>
      </header>

      {/* Graph */}
      <div className="flex-1 relative">
        <ForceGraph onNodeClick={handleNodeClick} />
        <Controls />
        <Legend />
        {selectedNode && (
          <NodeDetail 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center p-3 border-t border-border bg-surface/50 backdrop-blur text-[10px] text-muted tracking-wide">
        <span>👻 MEMORY TOPOLOGY // NEUEBOT</span>
        <span className="text-primary font-display">NAVIGATE THE GHOST</span>
        <span>{new Date().toISOString().split('T')[0]}</span>
      </footer>
    </div>
  )
}

export default App
