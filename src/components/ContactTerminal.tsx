import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Mail, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Check, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code,
  Code2,
  Terminal,
  ChevronDown,
  Lock
} from "lucide-react";

const WorldMapSVG = () => (
  <svg viewBox="0 0 1000 400" className="w-full h-auto opacity-20 pointer-events-none select-none max-h-[160px] md:max-h-[220px]" fill="none" stroke="currentColor">
    {/* Parallels and Meridians */}
    <path d="M0 100 H1000 M0 200 H1000 M0 300 H1000" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3 3" />
    <path d="M200 0 V400 M400 0 V400 M600 0 V400 M800 0 V400" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3 3" />
    
    {/* Abstract Outline Continent Shapes */}
    {/* North America */}
    <path d="M100 80 Q150 90 220 120 T280 160 T250 220 T200 240 T150 180 Z" fill="#FF4D00" fillOpacity="0.01" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.12" />
    {/* South America */}
    <path d="M240 240 Q280 270 310 320 T290 380 T250 350 T220 280 Z" fill="#FF4D00" fillOpacity="0.01" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.12" />
    {/* Europe/Africa */}
    <path d="M450 100 Q510 110 530 160 T510 220 T480 280 T520 340 T460 360 T420 280 Z" fill="#FF4D00" fillOpacity="0.01" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.12" />
    {/* Asia */}
    <path d="M550 80 Q700 70 850 110 T800 240 T700 280 T600 200 Z" fill="#FF4D00" fillOpacity="0.01" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.12" />
    {/* Australia */}
    <path d="M800 300 Q860 310 880 350 T820 380 T780 340 Z" fill="#FF4D00" fillOpacity="0.01" stroke="#FF4D00" strokeWidth="0.5" strokeOpacity="0.12" />
    
    {/* Communication Arcs */}
    <path d="M 180 140 Q 330 60 480 120" fill="none" stroke="#FF4D00" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
    <path d="M 480 120 Q 590 140 700 230" fill="none" stroke="#FF4D00" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
    <path d="M 180 140 Q 440 20 700 230" fill="none" stroke="#FF4D00" strokeWidth="1.2" strokeOpacity="0.25" />
    <path d="M 700 230 Q 775 160 850 150" fill="none" stroke="#FF4D00" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
    
    {/* Glowing Nodes */}
    <circle cx="180" cy="140" r="3.5" fill="#FF4D00" />
    <circle cx="480" cy="120" r="3.5" fill="#FF4D00" />
    <circle cx="700" cy="230" r="4.5" fill="#FF4D00" />
    <circle cx="850" cy="150" r="3.5" fill="#FF4D00" />
  </svg>
);

const AstronautSVG = () => (
  <svg viewBox="0 0 160 140" className="w-24 h-24 md:w-28 md:h-28 text-[#FF4D00] shrink-0 opacity-40 hover:opacity-75 transition-opacity" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Astronaut Helmet */}
    <rect x="50" y="25" width="46" height="42" rx="18" stroke="#FF4D00" strokeWidth="1.5" />
    {/* Visor */}
    <rect x="57" y="32" width="32" height="22" rx="8" fill="rgba(255, 77, 0, 0.08)" stroke="#FF4D00" strokeWidth="1" />
    {/* Antenna */}
    <line x1="73" y1="25" x2="73" y2="14" stroke="#FF4D00" />
    <circle cx="73" cy="12" r="1.5" fill="#FF4D00" />
    
    {/* Laptop */}
    <path d="M 35 100 L 85 100 L 95 115 L 25 115 Z" stroke="#FF4D00" />
    <rect x="40" y="78" width="36" height="22" rx="2" fill="rgba(255, 77, 0, 0.03)" stroke="#FF4D00" />
    
    {/* Arms/Hands */}
    <path d="M 46 72 C 38 78, 38 92, 42 102" stroke="#FF4D00" />
    <path d="M 88 72 C 94 78, 90 92, 78 102" stroke="#FF4D00" />
    
    {/* Stars/Dust */}
    <circle cx="120" cy="35" r="1" fill="#FF4D00" className="animate-pulse" />
    <circle cx="20" cy="45" r="0.75" fill="#FF4D00" />
    <circle cx="130" cy="85" r="1" fill="#FF4D00" />
  </svg>
);

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "Internship Opportunity",
    message: ""
  });
  
  const [transmissionState, setTransmissionState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage("All fields are required and cannot be empty.");
      setTransmissionState("error");
      return;
    }

    setTransmissionState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          purpose: formData.purpose,
          message: trimmedMessage
        }),
      });

      const responseData = await response.json().catch(() => ({}));

      if (response.ok && responseData.success) {
        setTransmissionState("success");
      } else {
        setErrorMessage(responseData.error || "Transmission failed. Please try again.");
        setTransmissionState("error");
      }
    } catch (error) {
      console.error("API transmission failed:", error);
      setErrorMessage("Transmission failed. Please try again.");
      setTransmissionState("error");
    }
  };

  const purposes = [
    "Internship Opportunity",
    "Job Opportunity",
    "Project Collaboration",
    "Freelance Work",
    "Startup Discussion",
    "General Inquiry"
  ];

  const availableItems = [
    "Software Engineering Internships",
    "Startup Collaborations",
    "Backend Engineering Roles",
    "Open Source Contributions",
    "Full Stack Projects",
    "Freelance Development"
  ];

  // Particle seed array for subtle visual feedback behind the panels
  const subtleParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80, 
    delay: Math.random() * 3,
    size: Math.random() * 2 + i % 2 + 1,
    duration: 18 + Math.random() * 10
  }));

  return (
    <div id="contact-protocol-container" className="flex flex-col gap-6 md:gap-8 relative text-left">
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {subtleParticles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#FF4D00]"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              bottom: "-10px",
              opacity: 0.03
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: ["0px", `${(p.id % 2 === 0 ? 10 : -10)}px`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
        
        {/* LEFT COLUMN: Page Header, World Map and Send Form (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* HEADER SECTION WITH WORLD MAP Overlay */}
          <div className="p-5 md:p-6 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:border-orange-500/10 transition-colors relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FF4D00]/[0.01] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex-1 flex flex-col gap-2.5 text-left z-10">
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#FF4D00] uppercase font-bold">
                ESTABLISH CONNECTION
              </div>
              <h2 className="text-xl md:text-2xl font-sans font-black tracking-tight text-white leading-tight">
                Let's Build Something <span className="text-[#FF4D00]">Extraordinary.</span>
              </h2>
              <p className="text-gray-400 text-[11px] leading-relaxed font-sans max-w-sm">
                I'm always open to discussing new opportunities, innovative projects, or just having a tech conversation.
              </p>
            </div>

            {/* World Map Vector representation */}
            <div className="w-full md:w-[45%] relative flex items-center justify-center z-10 self-stretch min-h-[140px] md:min-h-0">
              <WorldMapSVG />
              
              {/* Status Indicator Overlapping */}
              <div className="absolute bottom-1 right-1 flex items-center gap-2 p-2 rounded-lg border border-emerald-500/10 bg-[#080808]/90 backdrop-blur-md shadow-lg text-left select-none max-w-[170px]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide">STATUS: AVAILABLE</span>
                  <span className="text-[8px] text-gray-500 font-sans mt-0.5 whitespace-nowrap">Open to collaborations</span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CONTAINER WITH REDESIGNED ELEMENT LABELS AND INLINE ICONS */}
          <div className="p-5 md:p-6 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:border-orange-500/10 transition-colors flex flex-col gap-4 relative text-left">
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-[#FF4D00]/[0.005] rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col gap-0.5 border-b border-white/[0.03] pb-3">
              <span className="text-[10px] font-mono text-[#FF4D00] font-bold uppercase tracking-widest">SEND A MESSAGE</span>
              <span className="text-[10px] text-gray-500 font-sans">I'll get back to you as soon as possible</span>
            </div>

            <AnimatePresence mode="wait">
              {transmissionState === "idle" || transmissionState === "sending" ? (
                <motion.form
                  id="contact-form"
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 w-full text-left"
                >
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-1 font-bold">
                        YOUR NAME
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-500 pointer-events-none">
                          <User size={12} className="text-gray-500" />
                        </div>
                        <input
                          id="form-name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={transmissionState === "sending"}
                          placeholder="Identify yourself or your company"
                          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] focus:bg-[#060606] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/15 text-xs font-sans transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-1 font-bold">
                        EMAIL ADDRESS
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-500 pointer-events-none">
                          <Mail size={12} className="text-gray-500" />
                        </div>
                        <input
                          id="form-email-input"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={transmissionState === "sending"}
                          placeholder="Where can I reach you back?"
                          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] focus:bg-[#060606] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/15 text-xs font-sans transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-1 font-bold">
                      PURPOSE
                    </label>
                    <div className="relative">
                      <select
                        id="form-purpose-select"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        disabled={transmissionState === "sending"}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] text-white focus:outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/15 text-xs font-sans transition-all duration-200 cursor-pointer appearance-none"
                      >
                        {purposes.map((pOpt) => (
                          <option key={pOpt} value={pOpt} className="bg-black text-white">
                            {pOpt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3.5 inset-y-0 flex items-center text-gray-500">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-1 font-bold">
                      MESSAGE
                    </label>
                    <textarea
                      id="form-message-area"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={transmissionState === "sending"}
                      placeholder="Describe your goals, requirements, or proposed milestones..."
                      className="w-full px-4 py-2.5 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] focus:bg-[#060606] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/15 text-xs font-sans resize-none transition-all duration-200 leading-relaxed"
                    />
                  </div>

                  {/* Redesigned flat glowing CTA */}
                  <button
                    id="submit-form-btn"
                    type="submit"
                    disabled={transmissionState === "sending" || !formData.name || !formData.email || !formData.message}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-mono font-extrabold text-[11px] uppercase tracking-wider cursor-pointer border border-[#FF4D00] bg-[#FF4D00] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:scale-[1.002] active:scale-[0.998] transition-all duration-250 select-none mt-1"
                  >
                    {transmissionState === "sending" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>SENDING MESSAGE...</span>
                      </span>
                    ) : (
                      <>
                        <Send size={12} className="text-white" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-1 text-[9px] text-gray-500 font-sans">
                    <Lock size={10} className="text-gray-500" />
                    <span>Your information is safe and secure. I respect your <span className="text-gray-300">privacy.</span></span>
                  </div>

                </motion.form>
              ) : transmissionState === "success" ? (
                <motion.div
                  id="success-state-container"
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 gap-4 w-full"
                >
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-emerald-400"
                  >
                    <CheckCircle2 size={36} className="animate-pulse" />
                  </motion.div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-white text-md font-bold font-sans tracking-wide">
                      Message transmitted successfully.
                    </h3>
                    <p className="text-gray-400 text-[11px] max-w-sm leading-relaxed font-sans">
                      Thank you for reaching out. I will review your message and respond as soon as possible.
                    </p>
                  </div>

                  <div className="px-3 py-1 rounded-lg border border-emerald-500/10 bg-emerald-900/10 text-emerald-400 font-mono text-[9px] tracking-wider uppercase">
                    Response time: Usually within 24 hours
                  </div>

                  <button
                    id="reset-form-btn"
                    onClick={() => {
                      setTransmissionState("idle");
                      setFormData({ name: "", email: "", purpose: "Internship Opportunity", message: "" });
                    }}
                    className="text-gray-400 hover:text-white text-[9px] font-mono tracking-widest uppercase border border-white/5 bg-white/[0.01] px-4 py-2 rounded-lg hover:border-white/10 transition-all cursor-pointer mt-2"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  id="error-state-container"
                  key="error"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 gap-4 w-full"
                >
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-full bg-rose-950/20 border border-rose-500/20 text-rose-400 animate-pulse"
                  >
                    <svg className="h-10 w-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </motion.div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white text-md font-bold font-sans tracking-wide">
                      Transmission failed. Please try again.
                    </h3>
                    <p className="text-rose-400/80 text-[11px] max-w-sm leading-relaxed font-sans">
                      {errorMessage || "Check your input parameters and retry."}
                    </p>
                  </div>

                  <button
                    id="reset-form-from-error-btn"
                    onClick={() => {
                      setTransmissionState("idle");
                    }}
                    className="text-gray-400 hover:text-white text-[9px] font-mono tracking-widest uppercase border border-white/5 bg-white/[0.01] px-4 py-2.5 rounded-lg hover:border-white/10 transition-all cursor-pointer mt-2"
                  >
                    Back to Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CARD 3: QUICK ACCESS (with requested items, LinkedIn on top, and dynamic explanation) */}
          <div className="group p-5 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-[#FF4D00]/15 transition-all duration-300 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/[0.008] rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
              <Mail size={12} className="text-[#FF4D00]" />
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#FF4D00] uppercase">QUICK ACCESS PROTOCOLS</span>
            </div>

            <p className="text-[11px] text-gray-500 font-sans mb-4 leading-relaxed">
              Explore professional repositories, workspace profiles, and competitive programming credentials. You can trigger direct compilation and downloads of my official PDF resume below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Row 1 - Left: LinkedIn */}
              <a
                id="contact-linkedin-link"
                href="https://www.linkedin.com/in/adityasingh1805/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Linkedin size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">LinkedIn</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 1 - Right: CodeChef */}
              <a
                id="contact-codechef-link"
                href="https://www.codechef.com/users/aadi_rajput_18?utm=codolio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Code2 size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">CodeChef</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 2 - Left: GitHub */}
              <a
                id="contact-github-link"
                href="https://github.com/aditya-singh-18/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Github size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">GitHub</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 2 - Right: HackerRank */}
              <a
                id="contact-hackerrank-link"
                href="https://www.hackerrank.com/profile/AdityaSingh18?utm=codolio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Award size={12} className="text-[#FF4D00]" strokeWidth={2.5} />
                  <span className="font-mono text-[10px]">HackerRank</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 3 - Left: LeetCode */}
              <a
                id="contact-leetcode-link"
                href="https://leetcode.com/u/adityasingh_18/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Award size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">LeetCode</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 3 - Right: GeeksforGeeks */}
              <a
                id="contact-geeksforgeeks-link"
                href="https://www.geeksforgeeks.org/profile/adityaasingh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">GeeksforGeeks</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 4 - Left: Codeforces */}
              <a
                id="contact-codeforces-link"
                href="https://codeforces.com/profile/aadi_rajput_18?utm=codolio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-orange-500/10 hover:translate-x-1 transition-all duration-200 text-gray-200 text-left"
              >
                <div className="flex items-center gap-2">
                  <Code size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px]">Codeforces</span>
                </div>
                <ExternalLink size={10} className="text-gray-500" />
              </a>

              {/* Row 4 - Right: Resume (PDF Direct Download) */}
              <a
                id="contact-resume-link"
                href="/api/download-resume"
                download="Aditya_Singh_Resume.pdf"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#FF4D00]/10 hover:bg-[#FF4D00]/20 border border-[#FF4D00]/35 hover:border-[#FF4D00]/60 hover:translate-x-1 transition-all duration-200 text-white font-bold text-left shadow-[0_0_12px_rgba(255,77,0,0.15)]"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={12} className="text-[#FF4D00]" />
                  <span className="font-mono text-[10px] text-white font-extrabold tracking-wide">Resume </span>
                </div>
                <ExternalLink size={10} className="text-white shrink-0" />
              </a>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Stack of 3 Information Cards (Span 5) */}
        <div id="contact-info-cards" className="lg:col-span-5 flex flex-col gap-4">
          
          {/* CARD 1: AVAILABLE FOR with Checklist and Emerald Glow Indicator Circles */}
          <div className="group p-5 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-orange-500/15 transition-all duration-300 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.01] rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
              <Briefcase size={12} className="text-[#FF4D00]" />
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#FF4D00] uppercase">AVAILABLE FOR</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5 text-xs text-gray-300">
              {availableItems.map((item, idx) => (
                <div 
                  id={`avail-item-${idx}`} 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.02] bg-white/[0.01] hover:border-emerald-500/10 transition-all text-[11px] font-sans font-medium"
                >
                  <span className="leading-tight pr-2">{item}</span>
                  {/* Emerald Styled checkcircle */}
                  <div className="p-0.5 rounded-full bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Check size={8} strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 2: ENGINEER PROFILE (Expanded for maximum visual & professional impact) */}
          <div className="group p-5 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-[#FF4D00]/15 transition-all duration-300 relative overflow-hidden text-left flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4D00]/[0.008] rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-[#FF4D00]" />
                  <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#FF4D00] uppercase">ENGINEER PROFILE</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-950/20">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-400">SYNC_STATUS_OK</span>
                </div>
              </div>

              {/* Professional Headshot Box */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 text-center sm:text-left">
                <div className="relative shrink-0">
                  {/* High Resolution Dynamic Profile Frame */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#FF4D00] p-0.5 bg-black shadow-[0_0_15px_rgba(255,77,0,0.25)]">
                    <img 
                      src="https://github.com/aditya-singh-18.png" 
                      alt="Aditya Singh" 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Glowing online status indicator */}
                  <span className="absolute bottom-1 right-1 block h-3.5 w-3.5 rounded-full ring-2 ring-[#0c0c0c] bg-emerald-400" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-white text-lg font-black font-sans tracking-wide">Aditya Singh</span>
                  <span className="text-[10.5px] font-mono font-bold text-[#FF4D00] uppercase tracking-wider mt-0.5">Backend & Infrastructure Engineer</span>
                  <span className="text-[10px] text-gray-400 font-sans mt-1">Vadodara, Gujarat, India</span>
                </div>
              </div>

              {/* High Impact Career Objective/Statement */}
              <p className="text-[11px] text-gray-300 font-sans leading-relaxed border-t border-b border-white/[0.03] py-2.5 mb-4 italic">
                "Experienced backend software engineer specializing in building high-throughput REST/GraphQL APIs, real-time distributed pipelines using Spring Boot, Node.js, PostgreSQL, and Redis. Engineered custom frameworks load-tested to 2,000+ concurrent traffic streams."
              </p>

              {/* Stack items with custom dashes separator */}
              <div className="flex flex-col gap-3.5 text-xs">
                
                {/* Academic */}
                <div className="flex items-start gap-2.5 text-gray-300">
                  <GraduationCap size={15} className="text-[#FF4D00] shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-gray-200">Parul University</span>
                    <span className="text-[10px] text-gray-400 font-sans leading-tight">
                      B.Tech — Computer Science & Engineering
                    </span>
                    <span className="text-[9px] font-mono text-[#FF4D00] font-extrabold mt-0.5">
                      Session: Aug 2023 – Aug 2027
                    </span>
                  </div>
                </div>

                {/* CP Details */}
                <div className="flex items-start gap-2.5 text-gray-300">
                  <Award size={15} className="text-[#FF4D00] shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-gray-200">Competitive Programming & Achievements</span>
                    <span className="text-[10px] text-gray-400 font-sans leading-tight">
                      Active competitor resolving core algorithms & complex patterns.
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[9px] font-mono">
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-gray-200">
                        LeetCode: 300+ solved
                      </span>
                      <span className="bg-[#FF4D00]/15 px-2 py-0.5 rounded border border-[#FF4D00]/30 text-white font-extrabold">
                        Contest Rating: 1850
                      </span>
                      <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                        Gold Medalist (Rank 1 - GDP)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Focus */}
                <div className="flex items-start gap-2.5 text-gray-300">
                  <Code size={15} className="text-[#FF4D00] shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-[#FF4D00]">Architecture & Core Stack</span>
                    <p className="text-[10px] text-gray-400 font-sans mt-0.5 leading-normal">
                      Java, TypeScript, Spring Boot, Node.js, Express, PostgreSQL, Redis, Socket.IO, BullMQ, Prometheus systems.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* CARD 4: LET'S CONNECT & CREATE IMPACT TOGETHER */}
          <div className="group p-5 rounded-xl border border-white/[0.04] bg-[#0c0c0c]/90 hover:bg-[#121212]/30 hover:border-orange-500/15 transition-all duration-300 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.008] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 mb-0.5 pb-2 border-b border-white/[0.04]">
                  <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#FF4D00] uppercase">LET'S CONNECT & CREATE IMPACT TOGETHER</span>
                </div>
                
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                  Whether it's a full-time role, internship, open source collaboration, or just a conversation about technology, I'd love to hear from you!
                </p>
              </div>
              
              <AstronautSVG />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
