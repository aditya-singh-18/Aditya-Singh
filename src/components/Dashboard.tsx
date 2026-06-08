import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Compass, 
  Cpu, 
  Layers, 
  Terminal, 
} from "lucide-react";
import HeroOverview from "./HeroOverview";
import { HeroStats } from "../types";

const DEFAULT_INITIAL_STATS: HeroStats = {
  github: {
    repos: 42,
    followers: 12,
    contributions: 1438,
  },
  leetcode: {
    solved: 289,
    easy: 100,
    medium: 150,
    hard: 39,
    rating: 1809,
    ranking: 29812,
  },
  codeforces: {
    rating: 0,
  },
  hackerrank: {
    solved: 128,
  },
  codolio: {
    solved: 318,
    activeDays: 162,
    contests: 15,
    submissions: 414,
  },
  source: "fallback"
};

const getInitialStats = (): HeroStats => {
  try {
    const cached = localStorage.getItem("aditya_portfolio_cached_stats");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === "object" && parsed.leetcode && parsed.github) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to load cached stats from localStorage", err);
  }
  return DEFAULT_INITIAL_STATS;
};

const fetchStatsClientSide = async (currentStats: HeroStats): Promise<HeroStats> => {
  const updated = JSON.parse(JSON.stringify(currentStats)) as HeroStats;
  
  if (!updated.github) updated.github = {};
  if (!updated.leetcode) updated.leetcode = {};
  
  // 1. Live GitHub Profile Fetch client-side style
  try {
    const ghRes = await fetch("https://api.github.com/users/aditya-singh-18");
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      if (typeof ghData.public_repos === "number" && ghData.public_repos > 0) {
        updated.github.repos = ghData.public_repos;
      }
      if (typeof ghData.followers === "number") {
        updated.github.followers = ghData.followers;
      }
    }
  } catch (err) {
    console.warn("Direct live GitHub profile fetch failed", err);
  }

  // 2. Live LeetCode solved count fetch client-side style
  try {
    const lcRes = await fetch("https://leetcode-api-faisalshohag.vercel.app/adityasingh_18");
    if (lcRes.ok) {
      const lcData = await lcRes.json();
      if (lcData.totalSolved !== undefined && lcData.totalSolved > 0) {
        updated.leetcode.solved = lcData.totalSolved;
      }
      if (lcData.easySolved !== undefined) {
        updated.leetcode.easy = lcData.easySolved;
      }
      if (lcData.mediumSolved !== undefined) {
        updated.leetcode.medium = lcData.mediumSolved;
      }
      if (lcData.hardSolved !== undefined) {
        updated.leetcode.hard = lcData.hardSolved;
      }
      if (lcData.ranking !== undefined) {
        updated.leetcode.ranking = lcData.ranking;
      }
    }
  } catch (err) {
    console.warn("Direct live LeetCode fetch failed", err);
  }

  updated.source = "live-client";
  return updated;
};

const JourneyTimeline = lazy(() => import("./JourneyTimeline"));
const TechStackGrid = lazy(() => import("./TechStackGrid"));
const ProjectsLab = lazy(() => import("./ProjectsLab"));
const ContactTerminal = lazy(() => import("./ContactTerminal"));

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [stats, setStats] = useState<HeroStats>(getInitialStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setStats(json.data);
            try {
              localStorage.setItem("aditya_portfolio_cached_stats", JSON.stringify(json.data));
            } catch (e) {}
            return;
          }
        }
      } catch (err) {
        console.warn("Express backend stats unavailable. Falling back to direct client-side requests...");
      }

      // Execute client-side querying if API fails or backend is absent
      try {
        const directStats = await fetchStatsClientSide(stats || DEFAULT_INITIAL_STATS);
        setStats(directStats);
        try {
          localStorage.setItem("aditya_portfolio_cached_stats", JSON.stringify(directStats));
        } catch (e) {}
      } catch (clientErr) {
        console.error("Client-side direct sync failed:", clientErr);
      }
    };
    fetchStats();
  }, []);

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "timeline", label: "Journey Timeline", icon: Compass },
    { id: "techstack", label: "Tech Stack", icon: Cpu },
    { id: "projects", label: "Projects Lab", icon: Layers },
    { id: "contact", label: "Contact Terminal", icon: Terminal }
  ];

  const renderActiveContent = () => {
    const loadingFallback = (
      <div id="tab-loading-spinner" className="flex h-64 w-full items-center justify-center flex-col gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D00]"></div>
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">Initializing Component...</span>
      </div>
    );

    switch (activeTab) {
      case "overview":
        return (
          <HeroOverview 
            onNavigateToTab={(tabId) => setActiveTab(tabId)} 
            stats={stats} 
            onRefreshStats={(updatedStats) => setStats(updatedStats)} 
          />
        );
      case "timeline":
        return (
          <Suspense fallback={loadingFallback}>
            <JourneyTimeline />
          </Suspense>
        );
      case "techstack":
        return (
          <Suspense fallback={loadingFallback}>
            <TechStackGrid />
          </Suspense>
        );
      case "projects":
        return (
          <Suspense fallback={loadingFallback}>
            <ProjectsLab />
          </Suspense>
        );
      case "contact":
        return (
          <Suspense fallback={loadingFallback}>
            <ContactTerminal />
          </Suspense>
        );
      default:
        return (
          <HeroOverview 
            onNavigateToTab={(tabId) => setActiveTab(tabId)} 
            stats={stats} 
            onRefreshStats={(updatedStats) => setStats(updatedStats)} 
          />
        );
    }
  };

  return (
    <div 
      id="dashboard-root" 
      className="min-h-screen bg-[#080808] text-white flex flex-col relative select-none font-sans border-8 border-[#1A1A1A]"
    >
      {/* Background Micro-Dots Grid */}
      <div 
        id="dashboard-bg-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      {/* Floating Laser ambient illumination blobs */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-[#FF4D00]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#1A1A1A] px-4 sm:px-6 py-3 flex flex-row items-center justify-between gap-4">
        {/* Left Side: ADITYA Branding with status dot */}
        <div id="header-left-branding" className="flex items-center gap-2 shrink-0 select-none">
          <div className="relative flex h-2 w-2 shrink-0 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4D00]" />
          </div>
          <span className="font-sans font-black tracking-[0.2em] text-white text-xs sm:text-sm">
            ADITYA
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div id="header-center-nav" className="flex items-center justify-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <nav 
            id="premium-saas-navigation-links"
            className="flex items-center gap-1 p-1 rounded-xl border border-[#1A1A1A] bg-[#0c0c0c]/85 backdrop-blur-xl shadow-md"
            style={{
              boxShadow: "inset 0 1px 0px 0px rgba(255, 255, 255, 0.05)"
            }}
          >
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`floating-nav-btn-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 relative shrink-0 cursor-pointer ${
                    isActive 
                      ? "text-white font-extrabold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Active indicator Pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#FF4D00] rounded-lg z-0"
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={13} className={isActive ? "text-white" : "text-gray-400 hover:text-white"} />
                    <span className="hidden md:inline font-sans">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Live Engineering Stats */}
        <div id="header-right-stats" className="flex items-center gap-2.5 text-[10px] font-mono tracking-wider text-gray-400 shrink-0 select-none">
          <span className="hidden sm:inline text-[#FF4D00] font-extrabold text-[9px] tracking-[0.15em] uppercase">
            LIVE ENGINEERING STATS
          </span>
          <span className="hidden sm:inline text-gray-700">//</span>
          
          <a 
            href="https://codolio.com/profile/adityasingh18"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.02] hover:bg-[#FF4D00]/10 border border-white/[0.04] hover:border-[#FF4D00]/30 hover:scale-[1.02] transition-all cursor-pointer group"
            title="Click to view full Codolio problem profile"
          >
            <span className="text-gray-500 font-bold text-[9px] group-hover:text-amber-500 transition-colors">Problems Solved:</span>
            <span className="text-white font-extrabold text-[10.5px]">
              {stats?.codolio?.solved || "318"}
            </span>
          </a>
        </div>
      </header>

      {/* Master Main viewport */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-10 flex flex-col gap-10 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            id={`tab-view-container-${activeTab}`}
            key={activeTab}
            initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {renderActiveContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Ground Footer details and quick links */}
      <footer className="w-full mt-auto h-[60px] md:h-[70px] border-t border-[#1A1A1A] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-gray-500 max-w-7xl mx-auto z-10 select-none">
        <div className="text-gray-400 font-extrabold tracking-widest uppercase">
          ADITYA © 2026
        </div>
        <div className="hidden md:block text-gray-500 text-[9.5px]">
          Built with Next.js • React • TypeScript • Tailwind
        </div>
        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="https://github.com/aditya-singh-18"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FF4D00] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adityasingh18/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FF4D00] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/api/download-resume"
            download="Aditya_Singh_Resume.pdf"
            className="hover:text-[#FF4D00] transition-colors"
          >
            Resume
          </a>
          <a
            href="mailto:2303051050043@paruluniversity.ac.in"
            className="hover:text-[#FF4D00] transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
