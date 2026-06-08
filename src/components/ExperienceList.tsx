import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Terminal, Building, ArrowRight } from "lucide-react";
import { EXPERIENCES } from "../data";

export default function ExperienceList() {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES.length > 0 ? EXPERIENCES[0].id : "");

  if (!EXPERIENCES.length) {
    return (
      <div id="experience-list-container" className="flex flex-col gap-8 md:gap-10">
        {/* Title */}
        <div className="flex flex-col gap-1.5 pb-6 border-b border-white/[0.05]">
          <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
            PROVEN CAPABILITIES
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white animate-fade-in">
            Professional History
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center p-12 text-center border border-white/[0.05] bg-white/[0.01]/30 backdrop-blur-md rounded-2xl my-4">
          <Building size={32} className="text-cyan-500/50 mb-3 animate-pulse" />
          <h3 className="text-white text-base font-bold">No Experience Logs Found</h3>
          <p className="text-gray-400 text-xs max-w-sm mt-1">
            Professional history logs are currently to be declared.
          </p>
        </div>
      </div>
    );
  }

  const selectedExp = EXPERIENCES.find(exp => exp.id === selectedExpId) || EXPERIENCES[0];

  return (
    <div id="experience-list-container" className="flex flex-col gap-8 md:gap-10">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 pb-6 border-b border-white/[0.05]">
        <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
          PROVEN CAPABILITIES
        </div>
        <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white animate-fade-in">
          Professional History
        </h2>
      </div>

      {/* Main workspace (Desktop: Switcher on left, dashboard metrics on right. Mobile: Stack cards) */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Professional Switcher menu */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-3">
          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-2 mb-1 select-none">
            Corporate Registries / Select Hub
          </div>

          <div className="flex flex-col gap-2.5">
            {EXPERIENCES.map(exp => {
              const isSelected = exp.id === selectedExpId;
              return (
                <button
                  id={`experience-nav-btn-${exp.id}`}
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`group w-full text-left p-5 rounded-2xl border text-white transition-all duration-300 relative overflow-hidden backdrop-blur-md cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_-10px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02] hover:border-white/[0.08]"
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Company Avatar Badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected 
                          ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/30"
                          : "bg-white/[0.05] text-gray-400 border border-white/[0.08]"
                      }`}>
                        {exp.logoText}
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-xs md:text-sm font-semibold tracking-wide transition-colors ${isSelected ? "text-cyan-400" : "text-gray-300 group-hover:text-white"}`}>
                          {exp.company}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ArrowRight 
                      size={14} 
                      className={`text-gray-600 transition-all ${
                        isSelected ? "text-cyan-400 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`} 
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed telemetry board */}
        <div className="flex-grow min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              id={`experience-detail-panel-${selectedExp.id}`}
              key={selectedExp.id}
              initial={{ opacity: 0, x: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-xl relative overflow-hidden flex flex-col gap-6"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.015] rounded-full blur-[100px] pointer-events-none" />

              {/* Upper Section role details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.05] relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gray-500 tracking-wider">ACTIVE DESIGNATION</span>
                  <h3 className="text-white text-lg md:text-xl font-bold font-sans tracking-wide">
                    {selectedExp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Building size={12} className="text-cyan-500" />
                    <span className="font-sans font-medium text-white">{selectedExp.company}</span>
                    <span className="text-gray-600">•</span>
                    <Calendar size={12} className="text-purple-400" />
                    <span className="font-mono text-[11px]">{selectedExp.period}</span>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 text-[10px] font-mono tracking-widest uppercase shrink-0 self-start sm:self-center">
                  SECURE_EMP_0{EXPERIENCES.indexOf(selectedExp) + 1}
                </div>
              </div>

              {/* Company description overview */}
              <p className="text-gray-300 text-sm leading-relaxed font-sans font-medium relative z-10 italic">
                "{selectedExp.description}"
              </p>

              {/* List bullet outcomes */}
              <div className="flex flex-col gap-3.5 relative z-10">
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest select-none">
                  Impact Reports & Achievements
                </div>

                <div className="flex flex-col gap-3">
                  {selectedExp.points.map((pt, idx) => (
                    <div id={`exp-${selectedExp.id}-pt-${idx}`} key={idx} className="flex items-start gap-3 group/pt">
                      {/* Custom list bullet */}
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-cyan-400 text-[10px] font-mono group-hover/pt:border-cyan-500/20 group-hover/pt:bg-cyan-950/20 transition-all mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans group-hover/pt:text-white transition-colors">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies deployed stack */}
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/[0.05] relative z-10">
                <div className="flex items-center gap-2">
                  <Terminal size={11} className="text-cyan-500" />
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest select-none">
                    Technologies Deployed
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedExp.skills.map((skill, idx) => (
                    <span
                      id={`exp-${selectedExp.id}-skill-${skill}`}
                      key={idx}
                      className="px-2.5 py-1 text-xs font-sans rounded-lg border border-white/[0.05] bg-white/[0.02] hover:bg-cyan-950/20 hover:border-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
