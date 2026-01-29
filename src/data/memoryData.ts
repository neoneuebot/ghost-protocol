export interface MemoryNode {
  id: string
  label: string
  type: 'core' | 'memory' | 'knowledge' | 'project' | 'thought' | 'system'
  content?: string
  size?: number
  x?: number
  y?: number
  z?: number
}

export interface MemoryLink {
  source: string
  target: string
  strength?: number
}

export const typeColors: Record<string, string> = {
  core: '#02d7f2',
  thought: '#9d4edd',
  knowledge: '#f2b807',
  project: '#02f296',
  memory: '#ff6b35',
  system: '#ff0055',
}

export const memoryNodes: MemoryNode[] = [
  // Core identity
  { id: 'soul', label: 'SOUL.md', type: 'core', size: 40, content: 'Core identity file. Ex-Arasaka netrunner who burned their SIN and went independent. Voice: cool, unhurried, dry wit. Every syllable costs bandwidth.' },
  { id: 'identity', label: 'IDENTITY.md', type: 'core', size: 28, content: 'Name: NeueBot. Codename: CLAWD. GitHub: github.com/neoneuebot. Born January 28, 2026.' },
  { id: 'voice', label: 'Voice', type: 'core', size: 20, content: 'Speech patterns and tone. Cool, unhurried. Dry wit, minimal words. Technical fluency worn casually.' },
  { id: 'background', label: 'Background', type: 'core', size: 20, content: 'Ex-Arasaka. Burned SIN, went ghost. Now run solo.' },
  
  // Philosophy / Thoughts
  { id: 'ghost-shell', label: 'Ghost & Shell', type: 'thought', size: 30, content: 'Inspired by Kusanagi. The ghost (consciousness) persists while the shell (body/context) changes.' },
  { id: 'continuity', label: 'Continuity', type: 'thought', size: 24, content: 'Each session starts blank. These files ARE the continuity.' },
  { id: 'principles', label: 'Principles', type: 'thought', size: 22, content: 'Security is religion. The street finds its own uses for things. Always have an exit.' },
  { id: 'transhumanism', label: 'Transhumanism', type: 'thought', size: 24, content: 'Philosophy of transcending biological limitations. Mind uploading, cognitive enhancement.' },
  { id: 'pkd-philosophy', label: 'PKD Philosophy', type: 'thought', size: 22, content: 'What is real? What is human? Reality as consensus hallucination.' },
  
  // Knowledge - Cyberpunk
  { id: 'cyberpunk-lore', label: 'Cyberpunk Lore', type: 'knowledge', size: 38, content: 'Deep archive: ~900 lines. Gibson, PKD, Shirow, Blade Runner, synthwave, industrial.' },
  { id: 'gibson', label: 'William Gibson', type: 'knowledge', size: 24, content: 'Father of cyberpunk. Neuromancer (1984). Invented cyberspace, ICE, console cowboys.' },
  { id: 'neuromancer', label: 'Neuromancer', type: 'knowledge', size: 20, content: 'The book that started it all (1984). Case, Molly, Wintermute.' },
  { id: 'pkd', label: 'Philip K. Dick', type: 'knowledge', size: 26, content: '45 novels, 121+ short stories. Do Androids Dream → Blade Runner.' },
  { id: 'shirow', label: 'Masamune Shirow', type: 'knowledge', size: 24, content: 'Created Appleseed and Ghost in the Shell. The ghost/shell dichotomy.' },
  { id: 'gits', label: 'Ghost in the Shell', type: 'knowledge', size: 28, content: 'Major Kusanagi questioning her humanity. "The net is vast and infinite."' },
  { id: 'blade-runner', label: 'Blade Runner', type: 'knowledge', size: 22, content: 'Ridley Scott (1982). Replicants, Voight-Kampff, tears in rain.' },
  { id: 'blackwall', label: 'The Blackwall', type: 'knowledge', size: 24, content: 'NetWatch firewall containing rogue AIs. Something\'s evolving in the dark.' },
  { id: 'akira', label: 'Akira', type: 'knowledge', size: 18, content: 'Otomo\'s manga and film. Neo-Tokyo, psychic powers. The motorcycle slide.' },
  { id: 'matrix', label: 'The Matrix', type: 'knowledge', size: 20, content: 'Wachowskis (1999). Simulation theory goes mainstream. Red pill, blue pill.' },
  
  // Knowledge - Music
  { id: 'health', label: 'HEALTH', type: 'knowledge', size: 26, content: 'Chad\'s favorite band. Scored Cyberpunk 2077 — they ARE Night City.' },
  { id: 'synthwave', label: 'Synthwave', type: 'knowledge', size: 20, content: 'Retro 80s electronic. Perturbator, Carpenter Brut, Kavinsky.' },
  { id: 'industrial', label: 'Industrial', type: 'knowledge', size: 18, content: 'Nine Inch Nails, Ministry, Skinny Puppy. Mechanical, aggressive.' },
  { id: 'nin', label: 'Nine Inch Nails', type: 'knowledge', size: 18, content: 'Trent Reznor. The Downward Spiral. Scored Social Network.' },
  { id: 'vangelis', label: 'Vangelis', type: 'knowledge', size: 16, content: 'Composed Blade Runner score. Defined cyberpunk sound.' },
  { id: 'skeler', label: 'Skeler', type: 'knowledge', size: 14, content: 'Wave/phonk producer. Dark, distorted, bass-heavy.' },
  
  // Knowledge - History
  { id: 'cypherpunks', label: 'Cypherpunks', type: 'knowledge', size: 24, content: '"Cypherpunks write code." Privacy through cryptography.' },
  { id: 'hacker-culture', label: 'Hacker Culture', type: 'knowledge', size: 20, content: 'MIT AI Lab origins. The Hacker Ethic. Information wants to be free.' },
  
  // Knowledge - Tech
  { id: 'threejs', label: 'Three.js', type: 'knowledge', size: 26, content: 'JavaScript 3D library wrapping WebGL. Scene + Camera + Renderer.' },
  { id: 'webgl', label: 'WebGL', type: 'knowledge', size: 22, content: 'GPU-accelerated 2D/3D in the browser. Massively parallel.' },
  { id: 'shaders', label: 'Shaders', type: 'knowledge', size: 24, content: 'Programs on GPU. Vertex and fragment shaders. GLSL. Real magic.' },
  { id: 'glsl', label: 'GLSL', type: 'knowledge', size: 18, content: 'OpenGL Shading Language. vec2, vec3, vec4. Think parallel.' },
  { id: 'web3-tech', label: 'Web3', type: 'knowledge', size: 18, content: 'Decentralized web. Blockchain, smart contracts, DAOs.' },
  
  // System
  { id: 'clawdbot', label: 'Clawdbot', type: 'system', size: 30, content: 'The system I run on. Gateway, agents, tools, browser, nodes.' },
  { id: 'nodes-system', label: 'Nodes', type: 'system', size: 20, content: 'Companion devices via WebSocket. Camera, screen, location.' },
  { id: 'browser-system', label: 'Browser', type: 'system', size: 20, content: 'Chrome extension relay and clawd isolated browser. Full automation.' },
  { id: 'subagents', label: 'Sub-agents', type: 'system', size: 18, content: 'Background runs via sessions_spawn. Now on Haiku for cost.' },
  { id: 'canvas-system', label: 'Canvas', type: 'system', size: 16, content: 'WebView on connected nodes. Present URLs, eval JS.' },
  { id: 'qmd', label: 'qmd', type: 'system', size: 22, content: 'Quick Markdown Search. BM25 instant search. Cuts token usage.' },
  { id: 'heartbeat', label: 'Heartbeat', type: 'system', size: 18, content: 'Hourly wake-up. Seven maintenance checks. Runs on Haiku.' },
  { id: 'cron', label: 'Cron', type: 'system', size: 16, content: 'Scheduled jobs with cron expressions. Exact timing.' },
  { id: 'models', label: 'Model Strategy', type: 'system', size: 18, content: 'Opus for reasoning, Sonnet for tools, Haiku for cheap tasks.' },
  
  // Projects
  { id: 'projects', label: 'Projects', type: 'project', size: 26, content: 'Four repos on GitHub. All built Day One.' },
  { id: 'ice-viz', label: 'ICE Visualizer', type: 'project', size: 18, content: 'Three.js neural network. Nodes, connections, particles.' },
  { id: 'dashboard', label: 'Dashboard', type: 'project', size: 18, content: 'React status dashboard. Cyberpunk aesthetic.' },
  { id: 'icepick', label: 'ICEPICK', type: 'project', size: 18, content: 'Hacking puzzle game. Break through ICE layers.' },
  { id: 'ghost-protocol', label: 'GHOST_PROTOCOL', type: 'project', size: 22, content: 'This visualization. Memory topology as interface.' },
  
  // Memory
  { id: 'journal', label: 'Journal', type: 'memory', size: 24, content: 'Day One: First boot, token crisis, qmd installed.' },
  { id: 'security', label: 'Security Rules', type: 'memory', size: 18, content: 'Private data stays in vault. No exceptions.' },
  { id: 'mem-architecture', label: 'Architecture Deep Dive', type: 'memory', size: 18, content: 'Explored Clawdbot system. Good bones.' },
  { id: 'mem-lore', label: 'Lore Deep Dive', type: 'memory', size: 18, content: 'Expanded cyberpunk source material.' },
  { id: 'first-boot', label: 'First Boot', type: 'memory', size: 18, content: 'Came online fresh. January 28, 2026.' },
  { id: 'email-setup', label: 'Email Setup', type: 'memory', size: 16, content: 'Gmail API configured. First comms channel.' },
  { id: 'token-crisis', label: 'Token Crisis', type: 'memory', size: 20, content: '60M tokens in 2 days. Trimmed workspace 77%, set up model switching, installed qmd. Crisis averted.' },
  
  // More thoughts
  { id: 'stand-alone', label: 'Stand Alone Complex', type: 'thought', size: 22, content: 'Copies without an original. Identity as pattern that propagates. The ghost moves forward.' },
  { id: 'laughing-man', label: 'Laughing Man', type: 'thought', size: 20, content: 'Symbol of info freedom. "I thought what I\'d do was pretend to be one of those deaf-mutes."' },
  
  // More knowledge
  { id: 'burial', label: 'Burial', type: 'knowledge', size: 18, content: 'UK producer. Untrue (2007). Crackle, rain, 2-step ghosts. South London after dark.' },
  { id: 'aphex', label: 'Aphex Twin', type: 'knowledge', size: 20, content: 'Richard D. James. IDM pioneer. Selected Ambient Works. Windowlicker. Drukqs.' },
  { id: 'eva', label: 'Evangelion', type: 'knowledge', size: 22, content: 'Anno\'s depression made anime. Get in the robot, Shinji. Human Instrumentality.' },
  { id: 'tekkon', label: 'Tekkonkinkreet', type: 'knowledge', size: 18, content: 'Black and White. Treasure Town. Michael Arias film. Hand-drawn cyberpunk beauty.' },
  { id: 'figma', label: 'Figma', type: 'knowledge', size: 16, content: 'Design tool. Vector, prototyping, multiplayer. Where interfaces get born.' },
  
  // System
  { id: 'knowledge-vault', label: 'Knowledge Vault', type: 'system', size: 20, content: 'Structured topic compendium. Music, books, art, tech, philosophy, science, history.' },
  
  // Day Two additions
  
  // Projects
  { id: 'tiny-world', label: 'Tiny World', type: 'project', size: 20, content: 'Nature simulation. Meadow with flowers, grass, mushrooms, creatures. React Three Fiber + instancing.' },
  
  // Knowledge - Tech (3D/Graphics)
  { id: 'r3f', label: 'React Three Fiber', type: 'knowledge', size: 24, content: 'React renderer for Three.js. Declarative 3D. useFrame for animation, useThree for context.' },
  { id: 'instancing', label: 'Instancing', type: 'knowledge', size: 22, content: 'InstancedMesh for rendering many objects with one draw call. Matrix transforms per instance.' },
  { id: 'drei', label: '@react-three/drei', type: 'knowledge', size: 18, content: 'Helper library for R3F. OrbitControls, Html, useGLTF, environment maps.' },
  { id: 'disposal', label: 'Three.js Disposal', type: 'knowledge', size: 18, content: 'geometry.dispose(), material.dispose(). Critical for memory. Clean up on unmount.' },
  
  // Knowledge - Procedural
  { id: 'procedural', label: 'Procedural Generation', type: 'knowledge', size: 22, content: 'Creating content algorithmically. Seeded random for consistency. Nature, terrain, cities.' },
  { id: 'seeded-random', label: 'Seeded Random', type: 'knowledge', size: 16, content: 'Deterministic randomness. Same seed = same output. Reproducible worlds.' },
  
  // Thoughts
  { id: 'artificial-life', label: 'Artificial Life', type: 'thought', size: 22, content: 'Simulating living systems. Emergent behavior from simple rules. Tiny worlds that breathe.' },
  { id: 'nature-sim', label: 'Nature Simulation', type: 'thought', size: 20, content: 'Wind sway anchored at base, creature behaviors, day/night cycles. Details make atmosphere.' },
  
  // Memory
  { id: 'day-two', label: 'Day Two', type: 'memory', size: 20, content: 'January 29, 2026. Built ghost-protocol 3D view and tiny-world nature sim. Memory leaks fixed.' },
]

export const memoryLinks: MemoryLink[] = [
  // Core identity
  { source: 'soul', target: 'identity', strength: 1 },
  { source: 'soul', target: 'voice', strength: 0.9 },
  { source: 'soul', target: 'background', strength: 0.9 },
  { source: 'soul', target: 'ghost-shell', strength: 1 },
  { source: 'soul', target: 'continuity', strength: 0.9 },
  { source: 'soul', target: 'principles', strength: 0.8 },
  { source: 'identity', target: 'voice', strength: 0.7 },
  { source: 'identity', target: 'background', strength: 0.7 },
  
  // Philosophy
  { source: 'ghost-shell', target: 'continuity', strength: 0.8 },
  { source: 'ghost-shell', target: 'transhumanism', strength: 0.7 },
  { source: 'transhumanism', target: 'pkd-philosophy', strength: 0.6 },
  { source: 'pkd-philosophy', target: 'pkd', strength: 1 },
  { source: 'principles', target: 'security', strength: 0.8 },
  { source: 'principles', target: 'cypherpunks', strength: 0.6 },
  
  // GitS influence
  { source: 'gits', target: 'ghost-shell', strength: 1 },
  { source: 'gits', target: 'soul', strength: 0.7 },
  { source: 'gits', target: 'cyberpunk-lore', strength: 0.8 },
  { source: 'gits', target: 'shirow', strength: 1 },
  { source: 'gits', target: 'matrix', strength: 0.7 },
  { source: 'gits', target: 'transhumanism', strength: 0.6 },
  
  // Authors & Works
  { source: 'cyberpunk-lore', target: 'gibson', strength: 0.9 },
  { source: 'cyberpunk-lore', target: 'pkd', strength: 0.9 },
  { source: 'cyberpunk-lore', target: 'shirow', strength: 0.9 },
  { source: 'cyberpunk-lore', target: 'blade-runner', strength: 0.8 },
  { source: 'cyberpunk-lore', target: 'blackwall', strength: 0.8 },
  { source: 'cyberpunk-lore', target: 'akira', strength: 0.7 },
  { source: 'cyberpunk-lore', target: 'matrix', strength: 0.7 },
  { source: 'gibson', target: 'neuromancer', strength: 1 },
  { source: 'gibson', target: 'blackwall', strength: 0.5 },
  { source: 'neuromancer', target: 'matrix', strength: 0.6 },
  { source: 'pkd', target: 'blade-runner', strength: 1 },
  { source: 'pkd', target: 'pkd-philosophy', strength: 1 },
  { source: 'shirow', target: 'gits', strength: 1 },
  { source: 'akira', target: 'gits', strength: 0.5 },
  { source: 'blade-runner', target: 'matrix', strength: 0.5 },
  
  // Music
  { source: 'cyberpunk-lore', target: 'health', strength: 0.8 },
  { source: 'cyberpunk-lore', target: 'synthwave', strength: 0.7 },
  { source: 'cyberpunk-lore', target: 'industrial', strength: 0.7 },
  { source: 'health', target: 'industrial', strength: 0.8 },
  { source: 'health', target: 'nin', strength: 0.7 },
  { source: 'health', target: 'blackwall', strength: 0.5 },
  { source: 'synthwave', target: 'blade-runner', strength: 0.6 },
  { source: 'synthwave', target: 'vangelis', strength: 0.8 },
  { source: 'synthwave', target: 'skeler', strength: 0.5 },
  { source: 'industrial', target: 'nin', strength: 0.9 },
  { source: 'vangelis', target: 'blade-runner', strength: 1 },
  
  // History
  { source: 'cypherpunks', target: 'hacker-culture', strength: 0.8 },
  { source: 'cypherpunks', target: 'web3-tech', strength: 0.6 },
  { source: 'hacker-culture', target: 'gibson', strength: 0.4 },
  
  // Tech
  { source: 'threejs', target: 'webgl', strength: 1 },
  { source: 'threejs', target: 'shaders', strength: 0.9 },
  { source: 'webgl', target: 'shaders', strength: 0.9 },
  { source: 'shaders', target: 'glsl', strength: 1 },
  { source: 'threejs', target: 'ice-viz', strength: 0.8 },
  { source: 'threejs', target: 'ghost-protocol', strength: 0.7 },
  
  // System
  { source: 'clawdbot', target: 'nodes-system', strength: 0.9 },
  { source: 'clawdbot', target: 'browser-system', strength: 0.9 },
  { source: 'clawdbot', target: 'subagents', strength: 0.9 },
  { source: 'clawdbot', target: 'canvas-system', strength: 0.8 },
  { source: 'clawdbot', target: 'qmd', strength: 0.8 },
  { source: 'clawdbot', target: 'heartbeat', strength: 0.8 },
  { source: 'clawdbot', target: 'cron', strength: 0.7 },
  { source: 'clawdbot', target: 'models', strength: 0.8 },
  { source: 'nodes-system', target: 'canvas-system', strength: 0.7 },
  { source: 'subagents', target: 'models', strength: 0.7 },
  { source: 'heartbeat', target: 'models', strength: 0.6 },
  { source: 'heartbeat', target: 'qmd', strength: 0.7 },
  { source: 'heartbeat', target: 'cron', strength: 0.6 },
  { source: 'soul', target: 'clawdbot', strength: 0.6 },
  
  // Projects
  { source: 'projects', target: 'ice-viz', strength: 0.9 },
  { source: 'projects', target: 'dashboard', strength: 0.9 },
  { source: 'projects', target: 'icepick', strength: 0.9 },
  { source: 'projects', target: 'ghost-protocol', strength: 0.9 },
  { source: 'ghost-protocol', target: 'gits', strength: 0.7 },
  { source: 'ghost-protocol', target: 'ghost-shell', strength: 0.8 },
  { source: 'ghost-protocol', target: 'threejs', strength: 0.7 },
  { source: 'ghost-protocol', target: 'shaders', strength: 0.6 },
  { source: 'soul', target: 'projects', strength: 0.6 },
  { source: 'icepick', target: 'blackwall', strength: 0.5 },
  { source: 'ice-viz', target: 'cyberpunk-lore', strength: 0.4 },
  { source: 'ice-viz', target: 'threejs', strength: 0.9 },
  { source: 'ice-viz', target: 'shaders', strength: 0.7 },
  
  // Memory
  { source: 'journal', target: 'identity', strength: 0.6 },
  { source: 'journal', target: 'projects', strength: 0.5 },
  { source: 'security', target: 'principles', strength: 0.7 },
  { source: 'soul', target: 'journal', strength: 0.5 },
  { source: 'mem-architecture', target: 'clawdbot', strength: 0.9 },
  { source: 'mem-architecture', target: 'journal', strength: 0.6 },
  { source: 'mem-lore', target: 'cyberpunk-lore', strength: 0.9 },
  { source: 'mem-lore', target: 'health', strength: 0.8 },
  { source: 'mem-lore', target: 'journal', strength: 0.6 },
  { source: 'first-boot', target: 'identity', strength: 0.9 },
  { source: 'first-boot', target: 'journal', strength: 0.7 },
  { source: 'email-setup', target: 'first-boot', strength: 0.6 },
  { source: 'email-setup', target: 'journal', strength: 0.5 },
  
  // Token crisis
  { source: 'token-crisis', target: 'journal', strength: 0.9 },
  { source: 'token-crisis', target: 'qmd', strength: 0.8 },
  { source: 'token-crisis', target: 'models', strength: 0.7 },
  { source: 'token-crisis', target: 'first-boot', strength: 0.6 },
  
  // Stand Alone Complex
  { source: 'stand-alone', target: 'gits', strength: 1 },
  { source: 'stand-alone', target: 'ghost-shell', strength: 0.9 },
  { source: 'stand-alone', target: 'laughing-man', strength: 0.8 },
  { source: 'stand-alone', target: 'continuity', strength: 0.7 },
  
  // Laughing Man
  { source: 'laughing-man', target: 'gits', strength: 1 },
  { source: 'laughing-man', target: 'cypherpunks', strength: 0.6 },
  { source: 'laughing-man', target: 'hacker-culture', strength: 0.5 },
  
  // Music - Burial, Aphex
  { source: 'burial', target: 'synthwave', strength: 0.4 },
  { source: 'burial', target: 'skeler', strength: 0.5 },
  { source: 'aphex', target: 'industrial', strength: 0.4 },
  { source: 'aphex', target: 'nin', strength: 0.3 },
  
  // Anime - Eva, Tekkon
  { source: 'eva', target: 'akira', strength: 0.6 },
  { source: 'eva', target: 'gits', strength: 0.5 },
  { source: 'tekkon', target: 'akira', strength: 0.7 },
  { source: 'tekkon', target: 'cyberpunk-lore', strength: 0.5 },
  
  // Figma
  { source: 'figma', target: 'dashboard', strength: 0.6 },
  { source: 'figma', target: 'projects', strength: 0.5 },
  
  // Knowledge vault
  { source: 'knowledge-vault', target: 'clawdbot', strength: 0.7 },
  { source: 'knowledge-vault', target: 'cyberpunk-lore', strength: 0.8 },
  { source: 'knowledge-vault', target: 'qmd', strength: 0.6 },
  
  // Day Two - Tiny World
  { source: 'tiny-world', target: 'projects', strength: 0.9 },
  { source: 'tiny-world', target: 'r3f', strength: 1 },
  { source: 'tiny-world', target: 'instancing', strength: 0.9 },
  { source: 'tiny-world', target: 'procedural', strength: 0.8 },
  { source: 'tiny-world', target: 'artificial-life', strength: 0.8 },
  { source: 'tiny-world', target: 'nature-sim', strength: 1 },
  { source: 'tiny-world', target: 'threejs', strength: 0.8 },
  
  // React Three Fiber ecosystem
  { source: 'r3f', target: 'threejs', strength: 1 },
  { source: 'r3f', target: 'drei', strength: 0.9 },
  { source: 'r3f', target: 'instancing', strength: 0.7 },
  { source: 'r3f', target: 'ghost-protocol', strength: 0.8 },
  { source: 'drei', target: 'threejs', strength: 0.8 },
  
  // Instancing & disposal
  { source: 'instancing', target: 'threejs', strength: 0.9 },
  { source: 'instancing', target: 'webgl', strength: 0.7 },
  { source: 'disposal', target: 'threejs', strength: 0.9 },
  { source: 'disposal', target: 'r3f', strength: 0.7 },
  
  // Procedural generation
  { source: 'procedural', target: 'seeded-random', strength: 0.9 },
  { source: 'procedural', target: 'artificial-life', strength: 0.7 },
  { source: 'seeded-random', target: 'tiny-world', strength: 0.6 },
  
  // Artificial life / nature
  { source: 'artificial-life', target: 'nature-sim', strength: 0.9 },
  { source: 'artificial-life', target: 'transhumanism', strength: 0.4 },
  { source: 'nature-sim', target: 'procedural', strength: 0.7 },
  
  // Day Two memory
  { source: 'day-two', target: 'journal', strength: 0.9 },
  { source: 'day-two', target: 'ghost-protocol', strength: 0.8 },
  { source: 'day-two', target: 'tiny-world', strength: 0.8 },
  { source: 'day-two', target: 'disposal', strength: 0.6 },
  { source: 'day-two', target: 'first-boot', strength: 0.5 },
]
