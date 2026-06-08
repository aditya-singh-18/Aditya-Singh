import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Terminal, Maximize2, X, ArrowRight, Award } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

export default function ProjectsLab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["all", "PRODUCTION SYSTEMS", "INNOVATION PROJECTS", "PERSONAL PRODUCTS"];

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 50ms delay between cards for premium feedback, as requested
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

  // Upward motion & fade active state
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.45
      }
    }
  };

  return (
    <div id="projects-lab-container" className="flex flex-col gap-8 md:gap-10">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
            ENGINEERING PROJECTS
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white">
            Production Systems & Products
          </h2>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
          {categories.map((cat, idx) => (
            <button
              id={`projects-filter-btn-${idx}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-[10.5px] font-mono rounded-lg border uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#FF4D00] border-[#FF4D00] text-white font-extrabold"
                  : "bg-white/[0.01] border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {cat === "all" ? "ALL PROJECTS" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of clean, highly scannable production project cards */}
      <AnimatePresence mode="popLayout">
        <motion.div
          id="project-lab-grid"
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              id={`project-card-${project.id}`}
              key={project.id}
              variants={cardVariants}
              className="group flex flex-col rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-[#FF4D00]/20 transition-all duration-300 overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.8)] hover:shadow-[0_12px_24px_-10px_rgba(255,77,0,0.15)] hover:translate-y-[-4px] h-full"
            >
              {/* Product Screenshot / Abstract Visual Asset */}
              <div className="h-40 overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/10 to-transparent z-10-custom" />
                
                {/* Category Pill tag absolute */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded border border-[#FF4D00]/20 bg-[#FF4D00]/10 text-[8.5px] font-mono tracking-wider text-[#FF4D00] uppercase z-20 font-bold">
                  {project.category}
                </span>

                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500 brightness-[82%] saturate-[95%]"
                />

                {/* Inspect modal click button trigger overlay */}
                <button
                  onClick={() => setActiveProject(project)}
                  className="absolute bottom-3 right-3 z-20 p-2 rounded-lg bg-black/75 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] cursor-pointer"
                  title="Inspect Architecture specs"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex flex-col justify-between flex-grow gap-4 text-left">
                
                {/* Primary Metadata */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-1">
                    <h3 
                      onClick={() => setActiveProject(project)}
                      className="text-white text-base font-extrabold font-sans tracking-wide leading-tight group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    
                    {/* Status badge pill */}
                    {project.status && (
                      <span className="text-[8px] font-mono border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0">
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  {project.subtitle && (
                    <span className="text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider leading-none mt-0.5">
                      {project.subtitle}
                    </span>
                  )}

                  {/* One-Line Description */}
                  <p className="text-gray-300 text-xs leading-relaxed mt-1 font-sans font-medium line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Dedicated Problem Solved area */}
                {project.problem && (
                  <div className="border-t border-white/[0.03] pt-2.5 flex flex-col gap-1">
                    <span className="text-[8.5px] font-mono text-gray-500 uppercase font-black tracking-wider">Problem Solved:</span>
                    <p className="text-gray-400 text-xs font-sans font-medium leading-relaxed line-clamp-2">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Bottom interactive tech stacks and inspect controls */}
                <div className="border-t border-white/[0.03] pt-3 flex flex-col gap-3 justify-end mt-auto">
                  
                  {/* Tech Stack list badges */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span
                        id={`project-${project.id}-tag-${tag}`}
                        key={tagIndex}
                        className="px-2 py-0.5 text-[8.5px] font-mono rounded border border-white/[0.04] bg-white/[0.02] text-gray-400 group-hover:border-[#FF4D00]/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[8.5px] font-mono rounded border border-cyan-500/10 bg-cyan-950/20 text-cyan-400">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Clean details trigger panel to expand specs */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="w-full py-2 bg-white/[0.02] border border-white/[0.06] hover:bg-neutral-900 hover:border-[#FF4D00]/30 hover:text-[#FF4D00] text-gray-300 font-mono text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <span>VIEW SPECIFICATION SHEET</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 duration-200 transition-transform" />
                  </button>

                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Recruiter-Friendly Clean Project Details Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            id="specification-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              id="specification-modal-panel"
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
              className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-xl relative overflow-hidden flex flex-col max-h-[92vh] shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
            >
              
              {/* Product Showcase Header Frame */}
              <div className="h-44 sm:h-52 relative w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-black/10 z-10" />
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter saturate-[80%]"
                />
                
                {/* Close Trigger Button absolute */}
                <button
                  id="modal-close-btn"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 border border-white/10 text-gray-400 hover:text-white hover:bg-black/90 transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>

                <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 text-left">
                  <span className="text-[8.5px] font-mono tracking-wider text-[#FF4D00] bg-[#FF4D00]/10 px-2 py-0.5 rounded border border-[#FF4D00]/25 w-fit uppercase font-extrabold">
                    {activeProject.category}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white text-xl sm:text-2xl font-black font-sans tracking-tight">
                      {activeProject.title}
                    </h3>
                    {activeProject.status && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 font-extrabold">
                        {activeProject.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Scrollable specs layout details */}
              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 text-left border-t border-white/[0.05]">
                
                {/* 1. Overview */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono text-[#FF4D00] tracking-widest uppercase font-black">Overview</span>
                  <p className="text-gray-200 text-sm leading-relaxed font-sans font-medium">
                    {activeProject.description}
                  </p>
                </div>

                {/* Double Column layout for Problem / Solution */}
                {(activeProject.problem || activeProject.solution) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4 border-y border-white/[0.04]">
                    {activeProject.problem && (
                      <div className="flex flex-col gap-1.5 text-left">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 tracking-widest uppercase font-black">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                          <span>The Problem</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed font-sans font-medium">
                          {activeProject.problem}
                        </p>
                      </div>
                    )}
                    {activeProject.solution && (
                      <div className="flex flex-col gap-1.5 text-left">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 tracking-widest uppercase font-black">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                          <span>The Solution</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed font-sans font-medium">
                          {activeProject.solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Achievements Highlights / Solution Impact */}
                {activeProject.highlights && activeProject.highlights.length > 0 && (
                  <div className="flex flex-col gap-3 pb-4 border-b border-white/[0.04]">
                    <span className="text-[9px] font-mono text-[#FF4D00] tracking-widest uppercase font-black">Core Achievements & Impacts</span>
                    <div className="flex flex-col gap-2">
                      {activeProject.highlights.map((itemHighlight, hIdx) => (
                        <div id={`highlight-pt-${hIdx}`} key={hIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-medium">
                          <Terminal size={12} className="text-[#FF4D00] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-sans">{itemHighlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact Statement Line */}
                {activeProject.impact && (
                  <div className="p-3.5 rounded-lg border border-[#FF4D00]/10 bg-[#FF4D00]/[0.02] text-[#FF4D00] text-xs font-sans font-semibold flex items-start gap-2.5">
                    <Award size={14} className="shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono tracking-widest text-[#FF4D00]/70 uppercase font-black leading-none mb-0.5">Target Impact Outcome:</span>
                      <span className="text-white text-xs font-sans">{activeProject.impact}</span>
                    </div>
                  </div>
                )}

                {/* Dynamic Metadata Stat Cards */}
                {activeProject.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeProject.stats.map((statItem, indexStat) => (
                      <div key={indexStat} className="p-3.5 rounded-lg border border-white/[0.04] bg-white/[0.01] text-left shrink-0">
                        <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest leading-none mb-1 text-left font-black">
                          {statItem.label}
                        </div>
                        <div className="text-xs font-extrabold text-white font-mono leading-tight text-left">
                          {statItem.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formatted Tech Stack tags */}
                {activeProject.techStack && activeProject.techStack.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.04]">
                    <span className="text-[8.5px] font-mono text-gray-500 tracking-wider uppercase font-black">Primary Tech Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech, indexTech) => (
                        <span
                          key={indexTech}
                          className="px-2 py-0.5 text-[9px] font-mono rounded border border-white/[0.06] bg-white/[0.02] text-gray-300 font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer and Repositories Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.04] mt-auto">
                  <span className="flex flex-wrap gap-1 border-white/[0.03] max-w-[70%]">
                    {activeProject.tags.map((tagNode, tagIndex) => (
                      <span
                        id={`modal-tag-${activeProject.id}-${tagNode}`}
                        key={tagIndex}
                        className="px-2 py-0.5 text-[8.5px] font-mono rounded border border-white/[0.05] bg-white/[0.01] text-gray-500"
                      >
                        {tagNode}
                      </span>
                    ))}
                  </span>

                  {/* Remote access anchors */}
                  <div className="flex items-center gap-2 shrink-0 self-end">
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs font-mono flex items-center gap-1.5 focus:outline-none"
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {activeProject.link && (
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 bg-[#FF4D00] hover:bg-orange-600 text-white rounded-lg border border-[#FF4D00] transition-all text-xs font-extrabold flex items-center gap-1.5 focus:outline-none"
                      >
                        <ExternalLink size={13} />
                        <span>Launch App</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
