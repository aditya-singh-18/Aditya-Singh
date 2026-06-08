import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  isPulsing: boolean;
  color?: string;
  height?: number;
  waveCount?: number;
}

export default function AudioVisualizer({
  isPulsing,
  color = "rgba(255, 77, 0, 1)", // brand orange-red
  height = 100,
  waveCount = 4
}: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    // Generate initial flat paths
    if (containerRef.current) {
      const width = containerRef.current.clientWidth || 600;
      const initialPaths = Array.from({ length: waveCount }).map(() => 
        `M 0 ${height / 2} Q ${width / 2} ${height / 2} ${width} ${height / 2}`
      );
      setPaths(initialPaths);
    }
  }, [waveCount, height]);

  useEffect(() => {
    if (!isPulsing) {
      // Return to horizontal line slowly if not pulsing
      const animateFlat = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth || 600;
        const midY = height / 2;
        
        setPaths(prev => prev.map(() => {
          // Gradually pull points toward the middle Y
          return `M 0 ${midY} L ${width} ${midY}`;
        }));
      };
      
      const interval = setInterval(animateFlat, 30);
      return () => clearInterval(interval);
    }

    const animateWaves = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth || 600;
      const midY = height / 2;
      phaseRef.current += 0.08; // wave motion speed
      
      const newPaths = Array.from({ length: waveCount }).map((_, waveIdx) => {
        // Individual parameters for rich overlaid voice spectrum
        const ampModifier = Math.sin(phaseRef.current * 0.5 + waveIdx) * 12 + 18;
        const speedModifier = (waveIdx + 1) * 0.8;
        
        // Build wave coordinate points
        const points: { x: number; y: number }[] = [];
        const segments = 12; // quality density
        
        for (let i = 0; i <= segments; i++) {
          const ratio = i / segments;
          const x = ratio * width;
          
          // Modulation so that amplitudes taper off elegantly at both start and end
          const envelope = Math.sin(ratio * Math.PI); 
          
          const angle = ratio * Math.PI * (2 + waveIdx * 0.5) + phaseRef.current * speedModifier;
          const offset = Math.sin(angle) * ampModifier * envelope;
          const y = midY + offset;
          points.push({ x, y });
        }
        
        // Convert to smooth cubic bezier SVG path
        let pathStr = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          pathStr += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
        }
        pathStr += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
        
        return pathStr;
      });

      setPaths(newPaths);
      animationFrameRef.current = requestAnimationFrame(animateWaves);
    };

    animationFrameRef.current = requestAnimationFrame(animateWaves);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPulsing, waveCount, height]);

  // Make wave colors varied and translucent for premium glassmorphic/cinematic depth
  const getWaveStyle = (idx: number) => {
    const opacities = [0.85, 0.45, 0.25, 0.12];
    const strokes = [
      "rgba(255, 255, 255, 0.9)", // solid center voice
      color,                      // brand color passed as prop
      "rgba(59, 130, 246, 0.45)", // blue helper highlight
      "rgba(20, 184, 166, 0.25)"  // teal harmonic accent
    ];
    return {
      stroke: strokes[idx % strokes.length],
      strokeWidth: idx === 0 ? 2 : 1.2,
      opacity: opacities[idx % opacities.length],
      fill: "none",
      transition: "stroke-width 0.3s ease"
    };
  };

  return (
    <div id="audio-visualizer-container" ref={containerRef} className="w-full select-none" style={{ height }}>
      <svg className="w-full h-full overflow-visible">
        {paths.map((path, idx) => (
          <path
            id={`voice-wave-path-${idx}`}
            key={idx}
            d={path}
            style={getWaveStyle(idx)}
          />
        ))}
      </svg>
    </div>
  );
}
