import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { GraduationCap, Code2, Zap, Target, Terminal, Sparkles, Award } from "lucide-react";
import { JOURNEY } from "../data";

const TIMELINE_ITEM_HEIGHT = 440; // Permanently locked height for timeline steps

export default function JourneyTimeline() {
  const [activeType, setActiveType] = useState<string>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTimeline = activeType === "all"
    ? JOURNEY
    : JOURNEY.filter(jm => jm.type === activeType);

  // Scroll observer with custom viewport activation band (40% - 60% center band)
  // and persistence zone (retains expansion until 20% - 80% out of view)
  useEffect(() => {
    const handleScrollAndObserve = () => {
      const milestoneElements = document.querySelectorAll("[data-milestone-id]");
      if (milestoneElements.length === 0) return;

      let closestId: string | null = null;
      let minDistance = Infinity;
      const viewportCenter = globalThis.innerHeight / 2;

      setExpandedIds((prev) => {
        const nextExpanded: Record<string, boolean> = {};
        let changed = false;

        milestoneElements.forEach((el) => {
          const mId = el.getAttribute("data-milestone-id");
          if (!mId) return;

          const rect = el.getBoundingClientRect();
          const cardTop = rect.top;
          const cardBottom = rect.bottom;

          // Activation trigger zone: when the card enters approximately 65%-70% of viewport height
          const activationZoneTop = globalThis.innerHeight * 0.15; // prevents header from going out of view
          const activationZoneBottom = globalThis.innerHeight * 0.70;

          // Persistence retention zone (retains expansion until 60-70% outside active zone)
          const persistenceZoneTop = globalThis.innerHeight * 0.05;
          const persistenceZoneBottom = globalThis.innerHeight * 0.90;

          const isCurrentlyExpanded = !!prev[mId];
          const entersFocusZone = cardTop >= activationZoneTop && cardTop <= activationZoneBottom;
          const insidePersistenceZone = cardBottom >= persistenceZoneTop && cardTop <= persistenceZoneBottom;

          let shouldBeExpanded = isCurrentlyExpanded;
          if (entersFocusZone) {
            shouldBeExpanded = true;
          } else if (!insidePersistenceZone) {
            shouldBeExpanded = false;
          }

          nextExpanded[mId] = shouldBeExpanded;
          if (shouldBeExpanded !== isCurrentlyExpanded) {
            changed = true;
          }
        });

        // Ensure at least one card is expanded (no empty visual state)
        const anyExpanded = Object.values(nextExpanded).some(Boolean);
        if (!anyExpanded && milestoneElements.length > 0) {
          // Find the one closest to the center
          let closestElementId: string | null = null;
          let minDistance = Infinity;
          milestoneElements.forEach((el) => {
            const mId = el.getAttribute("data-milestone-id");
            if (!mId) return;
            const rect = el.getBoundingClientRect();
            const centerDistance = Math.abs((rect.top + rect.height / 2) - viewportCenter);
            if (centerDistance < minDistance) {
              minDistance = centerDistance;
              closestElementId = mId;
            }
          });
          if (closestElementId) {
            nextExpanded[closestElementId] = true;
            if (!prev[closestElementId]) changed = true;
          }
        }

        return changed ? nextExpanded : prev;
      });

      // Track the Absolute closest item to viewport center to make its dot glow
      milestoneElements.forEach((el) => {
        const mId = el.getAttribute("data-milestone-id");
        if (!mId) return;

        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestId = mId;
        }
      });

      if (closestId) {
        setActiveId(closestId);
        const globalIdxInJourney = JOURNEY.findIndex(item => item.id === closestId);
        setActiveIdx(globalIdxInJourney);
      }
    };

    // Use passive scroll event with requestAnimationFrame for extreme FPS stability
    let tick = false;
    const onScroll = () => {
      if (!tick) {
        globalThis.requestAnimationFrame(() => {
          handleScrollAndObserve();
          tick = false;
        });
        tick = true;
      }
    };

    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    
    // Initial triggers
    handleScrollAndObserve();
    const initTimer = setTimeout(handleScrollAndObserve, 180);

    // Dynamic intersection observer to continuously feed states
    const observer = new IntersectionObserver(() => {
      handleScrollAndObserve();
    }, {
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
    });

    const milestoneElements = document.querySelectorAll("[data-milestone-id]");
    milestoneElements.forEach((el) => observer.observe(el));

    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
      clearTimeout(initTimer);
      observer.disconnect();
    };
  }, [filteredTimeline]);

  // Raw scroll progress inside the milestone container list
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Soft flowing dynamic spring progress with premium physics tracking
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001
  });

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap size={14} className="text-cyan-400" />;
      case "coding":
        return <Code2 size={14} className="text-amber-400" />;
      case "projects":
        return <Zap size={14} className="text-[#FF4D00]" />;
      case "goals":
        return <Target size={14} className="text-purple-400" />;
      default:
        return <Zap size={14} className="text-blue-400" />;
    }
  };

  const getMilestoneColor = (type: string, active: boolean) => {
    if (active) {
      switch (type) {
        case "education": return "border-cyan-500/30 bg-cyan-950/50 text-cyan-400";
        case "coding": return "border-amber-500/30 bg-amber-950/50 text-amber-400";
        case "projects": return "border-[#FF4D00]/30 bg-orange-950/40 text-[#FF4D00]";
        case "goals": return "border-purple-500/30 bg-purple-950/50 text-purple-400";
        default: return "border-blue-500/30 bg-blue-950/50 text-blue-400";
      }
    } else {
      return "border-white/[0.04] bg-neutral-900/10 text-gray-500";
    }
  };

  const filterTabs = [
    { id: "all", label: "All", count: JOURNEY.length },
    { id: "education", label: "Education", count: JOURNEY.filter(jm => jm.type === "education").length },
    { id: "coding", label: "Coding", count: JOURNEY.filter(jm => jm.type === "coding").length },
    { id: "projects", label: "Projects", count: JOURNEY.filter(jm => jm.type === "projects").length },
    { id: "goals", label: "Goals", count: JOURNEY.filter(jm => jm.type === "goals").length }
  ];

  return (
    <div id="journey-timeline-container" className="flex flex-col gap-8 md:gap-10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-black">
            CHRONOLOGICAL PROVENANCE
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white animate-fadeIn">
            Engineering Timeline
          </h2>
        </div>

        {/* Categories / Tabs Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map(tab => (
            <button
              id={`journey-tab-${tab.id}`}
              key={tab.id}
              onClick={() => {
                setActiveType(tab.id);
                setExpandedIds({});
                setActiveId(null);
                setActiveIdx(-1);
              }}
              className={`px-3 py-1.5 text-[10.5px] font-mono tracking-wider rounded-lg border uppercase transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeType === tab.id
                  ? "bg-[#FF4D00] border-[#FF4D00] text-white font-extrabold shadow-lg"
                  : "bg-white/[0.01] border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1 py-0.5 rounded text-[9px] ${
                activeType === tab.id ? "bg-black/30 text-white font-extrabold" : "bg-white/[0.04] text-gray-500"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Alternate Timeline track */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto w-full px-2 sm:px-6 py-6 font-sans">
        
        {/* Progressively illuminated timeline track */}
        {/* Dull base track line */}
        <div className="absolute left-3.5 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[1px] bg-white/[0.04] pointer-events-none" />

        {/* Dynamic smooth spring active tracking line */}
        <motion.div
          style={{ scaleY: smoothedProgress, transformOrigin: "top" }}
          className="absolute left-3.5 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[1px] bg-gradient-to-b from-[#FF4D00] via-[#FF4D00] to-[#FF4D00]/15 pointer-events-none"
        />

        <AnimatePresence mode="popLayout">
          <motion.div
            id="journey-entry-grid"
            key={activeType}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 md:gap-12 w-full"
          >
            {filteredTimeline.map((milestone) => {
              const globalIdx = JOURNEY.findIndex(j => j.id === milestone.id);
              const isPast = activeIdx !== -1 && globalIdx < activeIdx;
              const isCurrent = activeIdx !== -1 && globalIdx === activeIdx;
              
              // Multi-card expanded state driven by dynamic hysteresis scroll map
              const isCardExpanded = !!expandedIds[milestone.id];

              return (
                <div
                  id={`journey-milestone-${milestone.id}`}
                  data-milestone-id={milestone.id}
                  key={milestone.id}
                  className="relative w-full flex flex-col md:grid md:grid-cols-2 md:gap-x-16"
                  style={{ height: TIMELINE_ITEM_HEIGHT }}
                >
                  
                  {/* Timeline node connector dot (Left on mobile, Center on desktop) */}
                  <div className="absolute left-3.5 md:left-1/2 top-7 md:top-8 z-20 -translate-x-1/2">
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.25 : isPast ? 1.0 : 0.85,
                        boxShadow: isCurrent ? "0 0 20px #FF4D00, inset 0 0 10px #FF4D00" : "0 0 0px #FF4D00",
                        borderColor: isCurrent ? "#FF4D00" : isPast ? "rgba(255, 77, 0, 0.6)" : "rgba(255,255,255,0.12)"
                      }}
                      transition={{ type: "spring", stiffness: 60, damping: 15, mass: 0.8 }}
                      className={`relative w-[12px] h-[12px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#FF4D00] text-white"
                          : isPast
                          ? "bg-[#FF4D00]/80 opacity-90"
                          : "bg-neutral-950 opacity-40"
                      }`}
                    >
                      {/* Pulse active visual indicator */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-x-0 inset-y-0 rounded-full bg-[#FF4D00] opacity-80 pointer-events-none animate-ping"
                          style={{ animationDuration: "2.5s" }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Even/Odd alignment layout container */}
                  <div className={`w-full pl-8 md:pl-0 ${globalIdx % 2 === 0 ? "md:pr-8 text-left md:text-right" : "md:col-start-2 md:pl-8 text-left"}`}>
                    
                    {/* Visual Card Wrapper with toggle on direct clicks */}
                    <div 
                      className="relative w-full text-left"
                      onClick={() => {
                        setExpandedIds(prev => ({
                          ...prev,
                          [milestone.id]: !prev[milestone.id]
                        }));
                        if (activeId !== milestone.id) {
                          setActiveId(milestone.id);
                          setActiveIdx(globalIdx);
                        }
                      }}
                    >
                      {/* Subtle premium card highlight backdrop glow */}
                      <AnimatePresence>
                        {isCardExpanded && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 0.22, scale: 1.02 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.55 }}
                            className="absolute -inset-3 bg-gradient-to-r from-[#FF4D00]/40 to-amber-500/20 blur-xl rounded-2xl pointer-events-none -z-10"
                          />
                        )}
                      </AnimatePresence>

                      {/* Visual Card containing collapsed/expanded state */}
                      <div className={`w-full flex flex-col justify-center px-5 rounded-xl border transition-all duration-500 relative shadow-md cursor-pointer ${
                        isCardExpanded 
                          ? "border-[#FF4D00]/60 bg-[#121212]/95 shadow-[0_4px_30px_rgba(255,77,0,0.22)] select-none z-30" 
                          : "border-white/[0.02] bg-[#0A0A0A]/60 opacity-40 hover:opacity-100 hover:border-white/[0.06] hover:bg-neutral-900/10 z-10"
                      }`} style={{ height: "86px" }}>
                        
                        {/* Subtle card top glow boundary line */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

                        {/* Card Header (Year & Title info) */}
                        <div className={`flex items-start justify-between gap-3 ${globalIdx % 2 === 0 ? "md:flex-row-reverse" : "flex-row"}`}>
                          <div className={`flex items-center gap-3.5 ${globalIdx % 2 === 0 ? "md:flex-row-reverse" : "flex-row"}`}>
                            {/* Chronological phase badge */}
                            <div className="flex flex-col font-mono shrink-0 select-none bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-lg text-center leading-none min-w-[58px]">
                              <span className="text-[12.5px] font-black text-white tracking-tight">{milestone.year}</span>
                              <span className="text-[7.5px] text-gray-500 uppercase tracking-widest mt-1 font-black">{milestone.phase}</span>
                            </div>

                            <div className="flex flex-col">
                              <h3 className={`text-sm sm:text-[14.5px] font-extrabold font-sans transition-colors tracking-wide leading-snug ${
                                isCardExpanded ? "text-amber-400" : "text-white"
                              }`}>
                                {milestone.title}
                              </h3>
                              <p className="text-gray-400 text-[11px] font-sans font-semibold mt-0.5">
                                {milestone.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Icon Indicator Badge */}
                          <div className="shrink-0 self-start">
                            <div className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-all duration-300 ${getMilestoneColor(milestone.type, isCardExpanded)}`}>
                              {getMilestoneIcon(milestone.type)}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Body with strict Open/Close Specs from cinematic rules */}
                        <AnimatePresence initial={false}>
                          {isCardExpanded && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.97, y: 15, filter: "blur(6px)" }}
                              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, scale: 0.985, y: -6, filter: "blur(2px)" }}
                              style={{ transformOrigin: "top" }}
                              transition={{ 
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1] // signature Apple/Linear cinematic easeOut fluid curve
                              }}
                              className="absolute top-[96px] left-0 right-0 flex flex-col gap-4 border border-[#FF4D00]/50 bg-[#121212]/98 shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-xl p-5 z-40 overflow-visible cursor-default"
                              onClick={(e) => {
                                e.stopPropagation(); // Stop trigger toggles from subclicks
                              }}
                            >
                              {/* Main description paragraph */}
                              <p className="text-gray-300 text-xs sm:text-[12.5px] leading-relaxed font-sans text-left font-medium">
                                {milestone.description}
                              </p>

                              {/* Key Achievements Bullet list */}
                              {milestone.achievements && milestone.achievements.length > 0 && (
                                <div className="flex flex-col gap-2 pt-1">
                                  <div className="text-[9px] font-mono font-black tracking-widest text-amber-500/90 uppercase flex items-center gap-1.5 select-none">
                                    <Award size={10} className="text-amber-500" />
                                    <span>KEY ACCOMPLISHMENTS</span>
                                  </div>
                                  <ul className="flex flex-col gap-2 pl-1">
                                    {milestone.achievements.map((ach, aIdx) => (
                                      <li key={aIdx} className="text-[11px] text-gray-300 font-sans leading-relaxed flex items-start gap-2">
                                        <span className="text-[#FF4D00] mt-[4.5px] shrink-0 text-[7px]">■</span>
                                        <span className="text-left font-medium">{ach}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Key Metrics grid displays */}
                              {milestone.metrics && milestone.metrics.length > 0 && (
                                <div className="flex flex-col gap-2 border-t border-white/[0.03] pt-3.5">
                                  <div className="text-[9px] font-mono font-black tracking-widest text-[#FF4D00] uppercase flex items-center gap-1.5 select-none">
                                    <Sparkles size={10} className="text-[#FF4D00]" />
                                    <span>METRICS & MEASUREMENTS</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {milestone.metrics.map((met, mIdx) => (
                                      <div key={mIdx} className="p-2 sm:p-2.5 rounded-lg bg-white/[0.01] border border-white/[0.04] flex items-center gap-2">
                                        <span className="text-cyan-400 font-mono text-[10px] shrink-0">↳</span>
                                        <span className="text-[10px] text-gray-400 font-semibold font-sans text-left leading-normal">{met}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tags of the technologies */}
                              {milestone.tags && milestone.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 items-center pt-3 border-t border-white/[0.03]">
                                  <Terminal size={9.5} className="text-[#FF4D00]/70 shrink-0" />
                                  {milestone.tags.map((tag) => (
                                    <span
                                      id={`journey-tag-${milestone.id}-${tag}`}
                                      key={tag}
                                      className="px-2 py-0.5 text-[9.5px] font-mono rounded border border-white/[0.05] bg-white/[0.02] text-gray-400 select-none"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredTimeline.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 font-mono text-xs border border-white/[0.05] border-dashed rounded-2xl mt-4">
            <Sparkles className="text-gray-600 mb-2" size={18} />
            <span>NO MILESTONES FOUND FOR THIS FILTER SELECTION.</span>
          </div>
        )}
      </div>
    </div>
  );
}
