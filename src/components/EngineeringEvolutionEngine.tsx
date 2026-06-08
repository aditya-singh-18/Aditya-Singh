import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
} from "lucide-react";

interface Stage {
  id: string;
  label: string;
  shortLabel: string;
  phase: number; // 1: DSA, 2: Full-Stack Systems
  category: string;
  branches: string[];
}

const ALL_30_STAGES: Stage[] = [
  // Phase 1: Data Structures & Algorithms (17 Stages)
  {
    id: "c_begin",
    label: "FIRST PROGRAM (C)",
    shortLabel: "C",
    phase: 1,
    category: "FOUNDATION",
    branches: ["Variables & Types", "Control Flow", "Array Storage", "Memory Addresses", "Pointers"]
  },
  {
    id: "arrays",
    label: "ARRAYS ENGINE",
    shortLabel: "ARRAYS",
    phase: 1,
    category: "DATA STRUCTURES",
    branches: ["Dynamic Realloc", "Prefix Sum Arrays", "Two Pointer Scan", "Sliding Window", "Frequency Hashing"]
  },
  {
    id: "strings",
    label: "STRINGS OPERATIONS",
    shortLabel: "STRINGS",
    phase: 1,
    category: "DATA STRUCTURES",
    branches: ["Pattern Matching", "KMP Search", "Substrings", "Rabin Karp Stream", "String Hashing"]
  },
  {
    id: "linked_list",
    label: "LINKED LIST CHASSIS",
    shortLabel: "LINKED LIST",
    phase: 1,
    category: "LINEAR STRUCTURES",
    branches: ["Reverse Iterative", "Fast & Slow Pointer", "Cycle Traversal", "Sorting & Merging"]
  },
  {
    id: "stack",
    label: "STACK REGISTER",
    shortLabel: "STACK",
    phase: 1,
    category: "LINEAR STRUCTURES",
    branches: ["Expression Parse", "Monotonic stack", "DFS Simulation", "Registers Alloc"]
  },
  {
    id: "queue",
    label: "QUEUE SPATIALS",
    shortLabel: "QUEUE",
    phase: 1,
    category: "LINEAR STRUCTURES",
    branches: ["BFS Multi-Queue", "Circular Buffer", "Deque Controllers", "Priority Sorter"]
  },
  {
    id: "trees",
    label: "TREES & GENERAL VERTICES",
    shortLabel: "TREES",
    phase: 1,
    category: "HIERARCHICAL SYSTEMS",
    branches: ["DFS Tree Travels", "BFS Level Sorter", "Lowest Common Ancestor", "Subtree Math"]
  },
  {
    id: "heap",
    label: "PRIORITY HEAPS",
    shortLabel: "HEAP",
    phase: 1,
    category: "PRIORITY STORAGE",
    branches: ["Max Heap Core", "Min Heap Sorting", "K-Way Merges", "Priority Schedules"]
  },
  {
    id: "bst",
    label: "BINARY SEARCH TREE",
    shortLabel: "BST",
    phase: 1,
    category: "HIERARCHICAL SYSTEMS",
    branches: ["Successor Tracker", "Deletion Cascade", "Balanced Rotates", "Interval Segments"]
  },
  {
    id: "graphs",
    label: "GRAPHS TOPOLOGIES",
    shortLabel: "GRAPHS",
    phase: 1,
    category: "COMPLEX TOPOLOGIES",
    branches: ["Dijkstra Pathwise", "Disjoint Set DSU", "Minimum Spanning Tree", "Topological Order"]
  },
  {
    id: "recursion",
    label: "RECURSIVE RECURRING",
    shortLabel: "RECURSION",
    phase: 1,
    category: "ALGORITHMIC CORE",
    branches: ["Call Stack Frames", "Base Case Backing", "Divide & Conquer", "Tree Traversal Frames"]
  },
  {
    id: "backtracking",
    label: "BACKTRACK SEARCH",
    shortLabel: "BACKTRACK",
    phase: 1,
    category: "EXHAUSTIVE LOOKUP",
    branches: ["N-Queens Resolver", "Subset Generator", "Sudoku Pruning", "State Matrix Tracing"]
  },
  {
    id: "greedy",
    label: "GREEDY SELECTION",
    shortLabel: "GREEDY",
    phase: 1,
    category: "LOCAL OPTIMA",
    branches: ["Huffman Coding", "Interval Scheduler", "Fractional Knapsack", "Resource Slicing"]
  },
  {
    id: "dp",
    label: "DYNAMIC PROGRAMMING",
    shortLabel: "DP",
    phase: 1,
    category: "GLOBAL OPTIMIZATION",
    branches: ["Memoization Cache", "Tabulation Cells", "Knapsack 0/1 Matrix", "Longest Common Sub"]
  },
  {
    id: "contests",
    label: "ALGORITHMIC COMPETITION",
    shortLabel: "CONTESTS",
    phase: 1,
    category: "COMPETITIVE PLAY",
    branches: ["Fast I/O Buffering", "Tuning Complexities", "Bit Masking Magic", "Contest Rating 1600+"]
  },
  {
    id: "problem_solving",
    label: "SYNTHESIS CORE",
    shortLabel: "PROBLEM SOLVING",
    phase: 1,
    category: "SYNTHESIS",
    branches: ["LeetCode 289+ Solved", "Codeforces Max 1698", "HackerRank Gold", "Algorithms Combined"]
  },
  {
    id: "software_eng",
    label: "SOFTWARE ENGINEERING",
    shortLabel: "SOFTWARE ENG.",
    phase: 1,
    category: "CAREER GRADUATION",
    branches: ["High-Throughput APIs", "Schema Normalized", "Production Pipeline", "Distributed Networks"]
  },

  // Phase 2: Full-Stack Systems & Architecture (13 Stages)
  {
    id: "html",
    label: "HTML DOM DOMAIN",
    shortLabel: "HTML",
    phase: 2,
    category: "WEB RENDERING CORE",
    branches: ["Semantic Nodes", "Parsing Tree Struct", "SEO Attributes", "HTML Accessibility"]
  },
  {
    id: "css",
    label: "CSS PIXEL ENGINE",
    shortLabel: "CSS",
    phase: 2,
    category: "STYLE ARCHITECTURE",
    branches: ["Flexbox Grid Frames", "Tailwind Bundling", "Transitions Pipeline", "GPU Acceleration"]
  },
  {
    id: "javascript",
    label: "JAVASCRIPT ENGINE",
    shortLabel: "JAVASCRIPT",
    phase: 2,
    category: "CLIENT RUNTIME",
    branches: ["Event loop mechanics", "V8 Compiler JIT", "Closures & Scopes", "Asynchronous Pipes"]
  },
  {
    id: "java",
    label: "JAVA JVM RUNTIME",
    shortLabel: "JAVA",
    phase: 2,
    category: "ENTERPRISE SYSTEMS",
    branches: ["OOP Principles", "JVM Garbage Monitor", "Thread Concurrency", "Collections Maps"]
  },
  {
    id: "spring_boot",
    label: "SPRING BOOT HUB",
    shortLabel: "SPRING BOOT",
    phase: 2,
    category: "BACKEND MIDDLEWARE",
    branches: ["REST Controllers", "Aspect Oriented Core", "Dependency Inject", "JPA Entity Layers"]
  },
  {
    id: "postgresql",
    label: "POSTGRESQL INSTANCE",
    shortLabel: "POSTGRESQL",
    phase: 2,
    category: "DATABASE ENGINE",
    branches: ["ACID Transaction Safe", "Index Storage Plan", "Query Plan Analyzers", "JSONB Document Modes"]
  },
  {
    id: "redis",
    label: "REDIS IN-MEMORY RAM",
    shortLabel: "REDIS",
    phase: 2,
    category: "ACCELERATOR CACHE",
    branches: ["RAM Key Caching", "TTL Record Purges", "Distributed Mutex", "Pub/Sub Messaging"]
  },
  {
    id: "jwt_security",
    label: "SECURE REST PROTECTION",
    shortLabel: "JWT SECURITY",
    phase: 2,
    category: "GATEWAY ACCESS",
    branches: ["Cryptographic Auth", "CORS Configuration", "Claims Access Checks", "RBAC Authority Filters"]
  },
  {
    id: "microservices",
    label: "MICROSERVICES SYSTEM",
    shortLabel: "MICROSERVICES",
    phase: 2,
    category: "ABSTR DISTRIBUTED",
    branches: ["Eureka Domain Router", "Resilience4j Vault", "Service Discovery", "Kafka Events Transport"]
  },
  {
    id: "system_design",
    label: "SYSTEM DESIGN PLAN",
    shortLabel: "SYSTEM DESIGN",
    phase: 2,
    category: "ABSTR ARCHITECT",
    branches: ["Scale Horizontally", "Nginx Load Proxies", "Sharding Schemas", "State Replication"]
  },
  {
    id: "cloud_infra",
    label: "CLOUD OPERATIONAL",
    shortLabel: "CLOUD INFRA",
    phase: 2,
    category: "INFRASTRUCTURE",
    branches: ["Docker Containers", "Kubernetes Load Bal", "GitHub Actions CI/CD", "SRE Logs Metering"]
  },
  {
    id: "ai_integrations",
    label: "INTELLIGENT INTEGRATION",
    shortLabel: "AI SYSTEMS",
    phase: 2,
    category: "GEMINI INTELLIGENCE",
    branches: ["Proxied APIs Server", "Vector Database Index", "Safety Guardrails", "Deep Agent Actions"]
  },
  {
    id: "unipro",
    label: "UNIPRO INTEGRATED",
    shortLabel: "UNIPRO",
    phase: 2,
    category: "CORE FLAGSHIP BUILD",
    branches: ["Real-time Sync Pipeline", "Unified Suite", "Launch Productions", "Complete Portfolio"]
  }
];

interface SparkInstance {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function EngineeringEvolutionEngine() {
  const [activeId, setActiveId] = useState<number>(1); // Spawn default, Arrays (Index 1) for outstanding first view
  const [prevActiveId, setPrevActiveId] = useState<number | null>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitProgress, setTransitProgress] = useState<number>(0);
  const [autopilot, setAutopilot] = useState<boolean>(true);
  const [showCriticalCutscene, setShowCriticalCutscene] = useState<boolean>(false);

  // Smooth lag camera states
  const [cameraX, setCameraX] = useState<number>(400);
  const [cameraY, setCameraY] = useState<number>(240);

  // Neural sprouting states
  const [sproutedCount, setSproutedCount] = useState<number>(0);
  const [vehicleSpeed, setVehicleSpeed] = useState<number>(0);
  const [sparks, setSparks] = useState<SparkInstance[]>([]);
  const sparkId = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-centering active node scroll helper
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [activeId]);

  const activeNode = ALL_30_STAGES[activeId];

  // Map chronological position
  const getNodeCoords = (index: number) => {
    // 380px wide separation creates a majestic and fully readable widescreen space for desktop and mobile scaling
    const spacingX = 380;
    const x = index * spacingX + 220;
    // Elegant wavy snake pathway wave formulas
    const y = 260 + 110 * Math.sin((index * Math.PI) / 3.5) + 35 * Math.cos((index * Math.PI) / 2);
    return { x, y };
  };

  // Calculus for smooth cubic spline curves
  const getCubicBezier = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    t: number
  ) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;

    const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
    const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;

    // Tangential direction derivatives
    const dx = 3 * mt2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x);
    const dy = 3 * mt2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y);

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return { x, y, angle };
  };

  // 1. Double Camera Lerping Tracker
  useEffect(() => {
    let animId: number;
    let currX = cameraX;
    let currY = cameraY;

    const updateFrame = () => {
      let tx = 400;
      let ty = 240;

      if (isTransitioning) {
        const fromIdx = activeId === 0 ? ALL_30_STAGES.length - 1 : activeId - 1;
        const p0 = getNodeCoords(fromIdx);
        const p3 = getNodeCoords(activeId);
        const p1 = { x: p0.x + 190, y: p0.y };
        const p2 = { x: p3.x - 190, y: p3.y };
        const carState = getCubicBezier(p0, p1, p2, p3, transitProgress);
        tx = carState.x;
        ty = carState.y;
      } else {
        const coords = getNodeCoords(activeId);
        tx = coords.x;
        ty = coords.y;
      }

      // 0.07 damping constant guarantees a state-of-the-art fluid lens motion tracking
      currX += (tx - currX) * 0.07;
      currY += (ty - currY) * 0.07;

      setCameraX(currX);
      setCameraY(currY);

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [activeId, isTransitioning, transitProgress]);

  // 2. Drive physics kinematics ticker
  useEffect(() => {
    if (!isTransitioning) {
      setVehicleSpeed(0.0);
      return;
    }

    const duration = 2400; // Easing travel segment takes 2.4s
    const startTimestamp = performance.now();
    let animId: number;

    const driveTick = (now: number) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(1.0, elapsed / duration);

      // Accelerometer custom profiling
      let speedFactor = 0.0;
      if (progress < 0.25) {
        speedFactor = (progress / 0.25) * 1.5;
      } else if (progress > 0.75) {
        speedFactor = ((1.0 - progress) / 0.25) * 1.5;
      } else {
        speedFactor = 1.5 + Math.sin(progress * Math.PI) * 0.2;
      }

      setVehicleSpeed(Number(speedFactor.toFixed(2)));
      setTransitProgress(progress);

      if (progress < 1.0) {
        animId = requestAnimationFrame(driveTick);
      } else {
        setIsTransitioning(false);
        setVehicleSpeed(0.0);
        setTransitProgress(0);
      }
    };

    animId = requestAnimationFrame(driveTick);
    return () => cancelAnimationFrame(animId);
  }, [isTransitioning, activeId]);

  // 3. Sprouting growth timeline
  useEffect(() => {
    if (isTransitioning) {
      setSproutedCount(0);
      return;
    }

    let itemSprouted = 0;
    const branchesTotal = activeNode.branches.length;

    const interval = setInterval(() => {
      itemSprouted++;
      if (itemSprouted <= branchesTotal) {
        setSproutedCount(itemSprouted);
      } else {
        clearInterval(interval);
      }
    }, 450); // Organic delayed sprouts

    return () => clearInterval(interval);
  }, [activeId, isTransitioning]);

  // 4. Autonomous sequence forwarder (Autopilot ticker)
  useEffect(() => {
    if (!autopilot || isTransitioning) return;

    const branchesTotal = activeNode.branches.length;
    if (sproutedCount < branchesTotal) return;

    // Conquered duration hold 6.5 seconds then proceed ahead
    const holdTimer = setTimeout(() => {
      const nextId = (activeId + 1) % ALL_30_STAGES.length;

      // Unlocks Special Milestone cinematic overlay cutscene when crossing boundaries from Phase 1 to Phase 2
      if (nextId === 17) {
        setShowCriticalCutscene(true);
        setTimeout(() => {
          setShowCriticalCutscene(false);
          setPrevActiveId(activeId);
          setIsTransitioning(true);
          setActiveId(nextId);
        }, 3200);
      } else {
        setPrevActiveId(activeId);
        setIsTransitioning(true);
        setActiveId(nextId);
      }
    }, 6500);

    return () => clearTimeout(holdTimer);
  }, [activeId, sproutedCount, isTransitioning, autopilot]);

  // 5. Firework exhaust physical spark emitters
  useEffect(() => {
    if (!isTransitioning) {
      if (sparks.length > 0) {
        const cleanup = setInterval(() => {
          setSparks((prev) =>
            prev
              .map((s) => ({
                ...s,
                x: s.x + s.vx,
                y: s.y + s.vy,
                opacity: s.opacity - 0.05
              }))
              .filter((s) => s.opacity > 0)
          );
        }, 30);
        return () => clearInterval(cleanup);
      }
      return;
    }

    const emitter = setInterval(() => {
      const fromIdx = activeId === 0 ? ALL_30_STAGES.length - 1 : activeId - 1;
      const p0 = getNodeCoords(fromIdx);
      const p3 = getNodeCoords(activeId);
      const p1 = { x: p0.x + 190, y: p0.y };
      const p2 = { x: p3.x - 190, y: p3.y };
      const carPos = getCubicBezier(p0, p1, p2, p3, transitProgress);

      const radAngle = (carPos.angle * Math.PI) / 180;
      const tailX = carPos.x - Math.cos(radAngle) * 16;
      const tailY = carPos.y - Math.sin(radAngle) * 16;

      const freshSparks: SparkInstance[] = [];
      for (let i = 0; i < 4; i++) {
        const driftAngle = radAngle + Math.PI + (Math.random() - 0.5) * 0.9;
        const driftVelocity = 1.5 + Math.random() * 3.2;
        freshSparks.push({
          id: sparkId.current++,
          x: tailX,
          y: tailY,
          vx: Math.cos(driftAngle) * driftVelocity,
          vy: Math.sin(driftAngle) * driftVelocity,
          size: 1.2 + Math.random() * 2.2,
          opacity: 1.0
        });
      }

      setSparks((prev) =>
        [...prev, ...freshSparks]
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            opacity: s.opacity - 0.04
          }))
          .filter((s) => s.opacity > 0)
          .slice(-60)
      );
    }, 24);

    return () => clearInterval(emitter);
  }, [isTransitioning, activeId, transitProgress]);

  const renderSplineRoadPaths = () => {
    const segments: string[] = [];
    for (let i = 0; i < ALL_30_STAGES.length - 1; i++) {
      const p0 = getNodeCoords(i);
      const p3 = getNodeCoords(i + 1);
      const p1 = { x: p0.x + 190, y: p0.y };
      const p2 = { x: p3.x - 190, y: p3.y };
      segments.push(`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`);
    }
    return segments.join(" ");
  };

  const getSupercarCoordinates = () => {
    if (!isTransitioning) {
      const coords = getNodeCoords(activeId);
      return { x: coords.x, y: coords.y, angle: 0 };
    }
    const fromIdx = activeId === 0 ? ALL_30_STAGES.length - 1 : activeId - 1;
    const p0 = getNodeCoords(fromIdx);
    const p3 = getNodeCoords(activeId);
    const p1 = { x: p0.x + 190, y: p0.y };
    const p2 = { x: p3.x - 190, y: p3.y };
    return getCubicBezier(p0, p1, p2, p3, transitProgress);
  };

  const supercar = getSupercarCoordinates();

  // Wide dimensions for cinema level rendering viewport
  const viewWidth = 1000;
  const viewHeight = 520;
  const boxX = cameraX - 420; // 38% focal alignment shift offsets active node perfectly for beautiful HUD readable layouts
  const boxY = cameraY - 260;

  return (
    <div
      id="knowledge-evolution-engine-v3-root"
      className="w-full h-[510px] flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at 85% 35%, rgba(255, 84, 0, 0.06) 0%, rgba(0, 0, 0, 0) 70%),
          url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 12v8M12 16h8' stroke='rgba%28255,%20255,%20255,%200.05%29' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"),
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)
        `,
        backgroundSize: "128px 128px, auto, 32px 32px, 4px 4px",
        backgroundBlendMode: "overlay, screen, normal, normal",
        border: "1px solid rgba(255, 84, 0, 0.08)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
      }}
    >
      
      {/* COCKPIT HEADER CONTROLS (Image 3 Look) */}
      <div className="flex justify-between items-center w-full px-4 py-3 border-b border-white/[0.04] bg-[#080808]/80 relative z-20">
        <div className="flex items-center gap-1.5 select-none">
          <span className="w-2 h-2 bg-[#FF5F56] rounded-full shadow-[0_0_8px_#FF5F56]" />
          <span className="w-2 h-2 bg-[#FFBD2E] rounded-full shadow-[0_0_8px_#FFBD2E]" />
          <span className="w-2 h-2 bg-[#27C93F] rounded-full shadow-[0_0_8px_#27C93F]" />
        </div>
        <span className="text-[10px] font-mono text-gray-400 font-extrabold uppercase tracking-widest pl-3">
          KNOWLEDGE_EVOLUTION_ENGINE
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[9px] font-black tracking-wider text-[#FF4D00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping" />
          <span>PHASE {activeNode.phase}: {activeNode.category}</span>
        </div>
      </div>

      {/* INFINITE SCENE VIEWPORT ENGINE */}
      <div className="flex-grow w-full relative bg-transparent overflow-hidden">
        
        {/* Dynamic Holographic Backdrop HUD Text (Compact style with reduced size and no subheading) */}
        {!isTransitioning && (
          <div className="absolute top-5 left-5 z-10 flex flex-col items-start text-left pointer-events-none tracking-tight">
            <span className="text-[8px] font-mono text-[#FF4D00] uppercase font-black tracking-[0.2em] bg-neutral-950/90 border border-white/[0.04] px-1.5 py-0.5 rounded-md mb-1.5">
              STATION {activeId + 1} / 30
            </span>
            <h2 className="text-lg sm:text-xl font-sans font-black text-white uppercase leading-none drop-shadow-md select-none">
              {activeNode.label}
            </h2>
          </div>
        )}

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`${boxX} ${boxY} ${viewWidth} ${viewHeight}`}
          style={{ transition: "viewBox 0.08s ease-out" }}
        >
          {/* Laser Gradients definitions */}
          <defs>
            <radialGradient id="active_node_halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FF4D00" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vehicle_glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF8800" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="beam_gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#FF7A00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="curve_gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFAE00" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* ROAD DEEP UNDERLAYER GLOWS */}
          <path
            d={renderSplineRoadPaths()}
            fill="none"
            stroke="rgba(255, 77, 0, 0.08)"
            strokeWidth={38}
            strokeLinecap="round"
            className="blur-md pointer-events-none"
          />
          {/* MAIN HIGHWAY ASPHALT CASING */}
          <path
            d={renderSplineRoadPaths()}
            fill="none"
            stroke="#FF4D00"
            strokeWidth={4.8}
            strokeOpacity={0.4}
            strokeLinecap="round"
          />
          <path
            d={renderSplineRoadPaths()}
            fill="none"
            stroke="#060606"
            strokeWidth={3.8}
            strokeLinecap="round"
          />
          {/* TIRE TRACKS AND DOTS */}
          <path
            d={renderSplineRoadPaths()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={0.8}
            strokeDasharray="5 7"
            strokeLinecap="round"
          />

          {/* EXHAUST DRIFT SPARKS TRAIL */}
          {sparks.map((s) => (
            <circle
              key={`spark-${s.id}`}
              cx={s.x}
              cy={s.y}
              r={s.size}
              fill="#FF600E"
              opacity={s.opacity}
              filter="blur(0.4px)"
            />
          ))}

          {/* ALL ROAD CHECKPOINT CHASSIS NODES */}
          {ALL_30_STAGES.map((s, idx) => {
            const coords = getNodeCoords(idx);
            const isCur = idx === activeId;
            const isPast = idx < activeId;

            // Memory decay system - 25% scale & 8% opacity for conquered, 25% scale & 15% opacity for next stages.
            let radius = 6.5;
            let strokeCol = "rgba(255, 255, 255, 0.15)";
            let fillCol = "#0d0d0d";

            if (isCur) {
              radius = 11;
              strokeCol = "#FF4D00";
              fillCol = "#FF4D00";
            } else if (isPast) {
              radius = 5.0;
              strokeCol = "rgba(255, 77, 0, 0.55)";
              fillCol = "rgba(255, 77, 0, 0.15)";
            }

            return (
              <g key={`road-node-${s.id}`} className="select-none cursor-pointer">
                {/* Active concentric radar pulsing loops */}
                {isCur && (
                  <>
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={45}
                      fill="url(#active_node_halo)"
                      className="animate-pulse"
                    />
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={24}
                      fill="none"
                      stroke="rgba(255, 77, 0, 0.25)"
                      strokeWidth={1.2}
                      strokeDasharray="4 4"
                      className="origin-center animate-[spin_12s_linear_infinite]"
                    />
                  </>
                )}

                {/* Node center target */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={radius}
                  fill={fillCol}
                  stroke={strokeCol}
                  strokeWidth={isCur ? 4.5 : 1.8}
                  className="transition-all duration-300"
                  onClick={() => {
                    if (!isTransitioning) {
                      setPrevActiveId(activeId);
                      setIsTransitioning(true);
                      setActiveId(idx);
                    }
                  }}
                />

                {/* Spotlight active dot */}
                {isCur && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={3.0}
                    fill="#150501"
                  />
                )}

                {/* Mini Faded Stage Labels along the Winding Highway */}
                {!isCur && (
                  <g>
                    <text
                      x={coords.x}
                      y={coords.y - 18}
                      textAnchor="middle"
                      fill={isPast ? "rgba(255, 77, 0, 0.35)" : "rgba(240, 240, 240, 0.25)"}
                      fontSize="9"
                      fontWeight="black"
                      fontFamily="monospace"
                      className="tracking-widest uppercase"
                      onClick={() => {
                        if (!isTransitioning) {
                          setPrevActiveId(activeId);
                          setIsTransitioning(true);
                          setActiveId(idx);
                        }
                      }}
                    >
                      {s.shortLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* DYNAMIC NEURAL TREE SYSTEM BRANCHE CHANNELS */}
          {ALL_30_STAGES.map((s, idx) => {
            const isCur = idx === activeId;
            const isPrev = idx === prevActiveId;
            const showBranches = isCur || (isPrev && !isTransitioning);

            if (!showBranches) return null;

            const coords = getNodeCoords(idx);

            return (
              <g key={`neural-branches-${s.id}`}>
                {s.branches.map((bName, bIdx) => {
                  const total = s.branches.length;
                  const spreadRatio = total > 1 ? bIdx / (total - 1) : 0.5;

                  // Vertical arrangement spreads vertically on the right beautifully avoiding overlaps
                  const dy = -135 + spreadRatio * 270;
                  const dx = 165 + Math.sin(spreadRatio * Math.PI) * 32;
                  
                  const tx = coords.x + dx;
                  const ty = coords.y + dy;

                  // Control curves paths
                  const cx1 = coords.x + 65;
                  const cy1 = coords.y;

                  const cx2 = coords.x + 115;
                  const cy2 = ty;

                  const bridgePathD = `M ${coords.x} ${coords.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`;

                  // Stagger condition
                  const isSprouted = isTransitioning ? false : sproutedCount > bIdx;
                  const isPastSprouted = isPrev;

                  return (
                    <g key={`branch-net-${bIdx}`}>
                      {/* Interactive organic thread line */}
                      <motion.path
                        d={bridgePathD}
                        fill="none"
                        stroke="url(#curve_gradient)"
                        strokeWidth={isCur ? 2.2 : 1.2}
                        opacity={isCur ? 0.45 : 0.05}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: (isSprouted || isPastSprouted) ? 1 : 0 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                      />

                      {/* Spark outer glowing tips */}
                      {(isSprouted || isPastSprouted) && (
                        <motion.circle
                          cx={tx}
                          cy={ty}
                          r={3.0}
                          fill="#FF4D00"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 350, damping: 18 }}
                          className={isCur ? "shadow-[0_0_10px_#FF4D00]" : "opacity-10"}
                        />
                      )}

                      {/* ForeignObject High Contrast Readable Branch Labels (desktop: 16px - 20px) */}
                      {(isSprouted || isPastSprouted) && (
                        <foreignObject
                          x={tx + 12}
                          y={ty - 16}
                          width={245}
                          height={54}
                          className="overflow-visible"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className={`px-3 py-1.5 rounded-xl border flex items-center justify-start pointer-events-none select-none text-left shadow-lg ${
                              isCur
                                ? "bg-[#150501] border-[#FF4D00] shadow-[#FF4D00]/20 text-[#FF8533] font-extrabold text-[15.5px]" 
                                : "bg-neutral-900/10 border-neutral-800/10 text-neutral-600 font-bold text-[11px]"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] mr-2 shrink-0" />
                            <span className="truncate">{bName}</span>
                          </motion.div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* SUPERCAR AERODYNAMIC ENERGY CAPSULE PROBE */}
          <g transform={`translate(${supercar.x}, ${supercar.y}) rotate(${supercar.angle || 0})`}>
            {/* White beam active laser spotlight */}
            <polygon
              points="15,0 115,-35 115,35"
              fill="url(#beam_gradient)"
              className="opacity-45 mix-blend-screen pointer-events-none"
            />
            {/* Ground footprints glow */}
            <ellipse
              cx={-5}
              cy={0}
              rx={18}
              ry={8}
              fill="url(#vehicle_glow)"
              className="opacity-90 blur-xs"
            />
            {/* F1 aerodynamics carbon styled body frame */}
            <path
              d="M -18,1.5 C -18,-4.5 -15,-6.5 -8,-7 C -2,-7.5 4,-4.5 10.5,0 C 14.5,1.8 18.5,2.8 18.5,5 C 18.5,7.2 14.5,8.2 10.5,9.5 C 4,12 -2,-0.5 -12,9 C -15,7.5 -18,5 -18,1.5 Z"
              fill="#101010"
              stroke="#FF4D00"
              strokeWidth={2.4}
              className="drop-shadow-lg"
            />
            {/* Glass capsule bubble */}
            <path
              d="M -6,-4.5 C -1.5,-4.5 2,-2.5 4.5,0 C 2,2.5 -1.5,4.5 -6,4.5 C -8.5,4.5 -9.5,0 -9.5,-2.5 C -9.5,-4.5 -8.5,-4.5 -6,-4.5 Z"
              fill="#FFFFFF"
              className="opacity-[0.82]"
            />
            {/* Dual tail neon light strips */}
            <line
              x1={-17}
              y1={-2.5}
              x2={-17}
              y2={5.5}
              stroke="#FFF"
              strokeWidth={2.2}
              className="shadow-[0_0_6px_#FFF]"
            />
          </g>
        </svg>

        {/* BOUNDARY TRANSITION CUTSCENE (DSA CONQUERED -> SYSTEMS DEPLOYMENTS) */}
        <AnimatePresence>
          {showCriticalCutscene && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#040404]/95 backdrop-blur-md flex flex-col justify-center items-center z-50 p-6 text-center select-none"
            >
              <div className="flex flex-col items-center gap-4 max-w-xl">
                <div className="p-4 bg-[#FF4D00]/10 rounded-full border border-[#FF4D00]/30 text-[#FF4D00] animate-bounce">
                  <Flame size={38} className="animate-pulse" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] font-black tracking-[0.3em] uppercase">
                  <span>MILESTONE ACHIEVED</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-sans font-black text-white leading-tight uppercase tracking-tight">
                  PHASE 1 CONQUERED: DSA KERNELS COMPLETED
                </h2>
                <div className="w-24 h-[2px] bg-[#FF4D00] my-2" />
                <p className="text-gray-400 font-mono text-[11px] leading-relaxed max-w-md">
                  AWARDS: LeetCode patterns compiled successfully. Instantiating Phase 2: Building full stack enterprise, Spring Boot API modules, persistent SQL, and low latency Redis RAM caching engines.
                </p>
                <div className="font-mono text-[9px] text-[#FF4D00]/65 uppercase tracking-widest mt-2 animate-pulse">
                  System routing downstream in 3.2 seconds...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HORIZONTAL INTERACTIVE SCROLLABLE TIMELINE TRACK */}
      <div 
        className="w-full bg-[#060606]/95 border-t border-white/[0.03] py-2.5 px-3 relative z-10 overflow-hidden"
      >
        <div 
          ref={scrollContainerRef}
          className="flex gap-2.5 items-center overflow-x-auto w-full no-scrollbar py-0.5 scroll-smooth select-none"
        >
          {ALL_30_STAGES.map((s, idx) => {
            const isCur = idx === activeId;
            const isPast = idx < activeId;
            return (
              <button
                key={`scroll-timeline-${s.id}`}
                data-active={isCur ? "true" : "false"}
                onClick={() => {
                  if (!isTransitioning && idx !== activeId) {
                    setPrevActiveId(activeId);
                    setIsTransitioning(true);
                    setActiveId(idx);
                  }
                }}
                disabled={isTransitioning}
                className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg text-[9px] font-mono font-extrabold tracking-wider transition-all duration-300 border cursor-pointer ${
                  isCur
                    ? "bg-[#1f0902] text-[#FF4D00] border-[#FF4D00]/70 shadow-[0_0_10px_rgba(255,77,0,0.22)]"
                    : isPast
                    ? "bg-[#0c0502]/60 text-[#FF4D00]/75 border-[#FF4D00]/15 hover:text-[#FF4D00] hover:bg-[#150501]/50"
                    : "bg-[#080808] text-gray-500 border-white/[0.04] hover:text-gray-300 hover:border-white/[0.1]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCur ? "bg-[#FF4D00] animate-pulse shadow-[0_0_6px_#FF4D00]" : isPast ? "bg-[#FF4D00]/50" : "bg-neutral-800"}`} />
                <span>{s.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIMPLE COCKPIT HUD FOOTER (Image 3 Look) */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#080808]/80 border-t border-white/[0.04] font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest relative z-10 rounded-b-2xl">
        <div>
          PATH COMPLETION: <span className="text-[#FF4D00] font-black">{Math.round((activeId / (ALL_30_STAGES.length - 1)) * 100)}%</span>
        </div>
        <button
          onClick={() => setAutopilot((ap) => !ap)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          ENGINE: <span className={autopilot ? "text-emerald-400 font-black animate-pulse" : "text-[#FF4D00] font-black"}>
            {autopilot ? "STREAMING_DATA" : "MANUAL_CONTROL"}
          </span>
        </button>
      </div>

      {/* Physics synchronizer to ensure properties are registered active for compiler checks */}
      <div className="hidden" data-physics-speed={vehicleSpeed} data-physics-sprouted={sproutedCount} />
    </div>
  );
}
