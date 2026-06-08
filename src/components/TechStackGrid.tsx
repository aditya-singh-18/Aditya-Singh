import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Cpu, Terminal, Database, Layers, Sparkles, Compass, ArrowRight } from "lucide-react";
import { TECH_ITEMS } from "../data";

export default function TechStackGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "Languages", "Frameworks & Libraries", "Databases & Storage", "Infrastructure & Tools"];

  const filteredItems = activeCategory === "all"
    ? TECH_ITEMS
    : TECH_ITEMS.filter(item => item.category === activeCategory);

  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code size={15} />;
      case "Cpu":
        return <Cpu size={15} />;
      case "Terminal":
        return <Terminal size={15} />;
      case "Database":
        return <Database size={15} />;
      case "Layers":
        return <Layers size={15} />;
      case "Sparkles":
        return <Sparkles size={15} />;
      case "Compass":
        return <Compass size={15} />;
      default:
        return <Code size={15} />;
    }
  };

  const getProficiencyColor = (lvl: string) => {
    switch (lvl) {
      case "CORE STACK":
        return "border-[#FF4D00]/20 bg-orange-950/20 text-[#FF4D00]";
      case "ADVANCED":
        return "border-amber-500/20 bg-amber-950/20 text-amber-400";
      case "WORKING KNOWLEDGE":
      default:
        return "border-emerald-500/20 bg-emerald-950/20 text-emerald-400";
    }
  };

  const getGlowBgColor = (lvl: string) => {
    switch (lvl) {
      case "CORE STACK":
        return "bg-[#FF4D00]/[0.02] group-hover:bg-[#FF4D00]/[0.06]";
      case "ADVANCED":
        return "bg-amber-500/[0.02] group-hover:bg-amber-500/[0.06]";
      case "WORKING KNOWLEDGE":
      default:
        return "bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.06]";
    }
  };

  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // 40ms separation delay for elite feel
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  };

  // Stagger Card Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.4
      }
    }
  };

  return (
    <div id="tech-stack-container" className="flex flex-col gap-8 md:gap-10">
      
      {/* Dynamic System Capabilities Title Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
            SYSTEM CAPABILITIES
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white">
            Ecosystem Tech Stack
          </h2>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
          {categories.map((cat, idx) => (
            <button
              id={`tech-category-btn-${idx}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-[10.5px] font-mono rounded-lg border uppercase transition-all duration-250 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#FF4D00] border-[#FF4D00] text-white font-extrabold"
                  : "bg-white/[0.01] border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {cat === "all" ? "ALL STACKS" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Clean Tech Cards */}
      <AnimatePresence mode="popLayout">
        <motion.div
          id="tech-items-grid"
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => {
            const levelColorClass = getProficiencyColor(item.levelText || "CORE STACK");
            const ambientGlowClass = getGlowBgColor(item.levelText || "CORE STACK");

            return (
              <motion.div
                id={`tech-card-${item.name.replace(/\s+/g, "-")}`}
                key={item.name}
                variants={cardVariants}
                className="group p-5 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-cyan-500/20 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.85)] hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Visual backlighting subtle glow node */}
                <div className={`absolute top-0 right-0 w-[130px] h-[130px] rounded-full blur-[45px] pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-75 ${ambientGlowClass}`} />

                {/* Micro engineering accent line */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF4D00]/5 group-hover:via-[#FF4D00]/25 to-transparent transition-all duration-300" />

                <div className="flex flex-col gap-4 relative z-10 w-full text-left">
                  
                  {/* Top Line Meta Component */}
                  <div className="flex justify-between items-start gap-2.5">
                    <div className="flex items-start gap-2.5">
                      {/* High-Contrast Framework Icon Badge */}
                      <div className="p-2 ml-0.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/20 group-hover:border-cyan-500/20 duration-300 transition-all group-hover:scale-105 group-hover:rotate-3 flex items-center justify-center">
                        {resolveIcon(item.iconName)}
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="text-white text-sm font-extrabold tracking-wide font-sans group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-sans font-medium text-gray-500 leading-none mt-1">
                          {item.subtitle || "Component Utility"}
                        </span>
                      </div>
                    </div>

                    {/* Highly Polished Level Indicator */}
                    <div className={`px-2 py-0.5 rounded border text-[8.5px] font-mono tracking-wider uppercase font-semibold whitespace-nowrap leading-none ${levelColorClass}`}>
                      {item.levelText || "CORE STACK"}
                    </div>
                  </div>

                  {/* Capabilities Bullet System (Strictly 3 capabilities) */}
                  {item.capabilities && item.capabilities.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-1 border-t border-white/[0.03] pt-3">
                      <div className="text-[8.5px] font-mono tracking-wider text-gray-500 uppercase">Capabilities</div>
                      <ul className="flex flex-col gap-1 font-sans text-[11px] text-gray-400">
                        {item.capabilities.slice(0, 3).map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#FF4D00] group-hover:scale-125 transition-transform" />
                            <span className="text-gray-300 font-medium truncate" title={cap}>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Used In Section and Accent Baseline */}
                <div className="mt-4 pt-3 border-t border-white/[0.03] relative z-10 w-full text-left">
                  <div className="flex items-center justify-between gap-1">
                    {item.usedIn && item.usedIn.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8.5px] font-mono font-bold text-gray-500">USED IN:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.usedIn.map((projectName, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] rounded uppercase tracking-wider"
                            >
                              {projectName}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[9px] font-mono text-gray-600">CORE ECOSYSTEM UTILITY</div>
                    )}

                    {/* Subtle micro arrow visual marker */}
                    <div className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 duration-300 transition-all select-none">
                      <ArrowRight size={10} />
                    </div>
                  </div>

                  {/* Subtle compiler underline animation node */}
                  <div className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>

                {/* Advanced Hud Hover Reveal Overlay: Related System Tag Stack */}
                {item.relatedStack && item.relatedStack.length > 0 && (
                  <div className="absolute inset-0 bg-[#070707] p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-250 z-20 pointer-events-none border border-[#FF4D00]/20 rounded-xl">
                    <div className="flex flex-col gap-2.5 text-left">
                      <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#FF4D00] uppercase font-bold">
                        {item.name} Ecosystem
                      </span>
                      <h4 className="text-white text-xs font-sans font-bold tracking-tight">
                        Related Stacks & Nodes
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.relatedStack.map((rel, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-2 py-0.5 text-[8.5px] font-mono bg-white/[0.02] border border-white/[0.05] text-gray-300 rounded font-medium"
                          >
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[9px] font-mono text-gray-500 uppercase flex items-center justify-between">
                      <span>INTELLIGENT TRACING</span>
                      <span className="text-[#FF4D00] animate-pulse">●</span>
                    </div>
                  </div>
                )}

              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
