import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Command, 
  Download, 
  RefreshCw, 
  Play, 
  Server, 
  GitBranch, 
  Code2, 
  ChevronRight,
  Clock,
  Monitor,
  ShieldAlert,
  Layers,
  Globe,
  Code,
  Activity,
  Workflow,
  Compass
} from "lucide-react";
import EngineeringEvolutionEngine from "./EngineeringEvolutionEngine";
import { HeroStats, ActivityItem } from "../types";

interface HeroOverviewProps {
  onNavigateToTab: (tabId: string) => void;
  stats: HeroStats | null;
  onRefreshStats?: (stats: HeroStats) => void;
}

export default function HeroOverview({ onNavigateToTab, stats, onRefreshStats }: HeroOverviewProps) {
  // Sync state & live GitHub logs
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTimer, setSyncTimer] = useState("05:59:58");
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Architecture Simulation Ticker State
  const [archStep, setArchStep] = useState(0);
  const [archPlaying, setArchPlaying] = useState(true);
  const [isCacheHit, setIsCacheHit] = useState(false);
  const [archLatency, setArchLatency] = useState("3.8ms");
  const [archLogs, setArchLogs] = useState<string[]>([
    "System waiting. Trigger trace check to test routing middleware."
  ]);

  // Fetch live activity feed from /api/activity
  const fetchActivityFeed = async () => {
    try {
      const res = await fetch("/api/activity");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.activities) {
          setActivities(json.activities);
          return;
        }
      }
    } catch (err) {
      console.warn("Express backend activity endpoint unavailable. Falling back to direct client-side requests...");
    }

    // Direct browser-based fetch to GitHub events for static platform hosting (e.g., Vercel)
    try {
      const liveRes = await fetch("https://api.github.com/users/aditya-singh-18/events");
      if (liveRes.ok) {
        const data = await liveRes.json();
        const allowedTypes = ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent", "RepositoryEvent"];
        const mapped = data
          .filter((evt: any) => allowedTypes.includes(evt.type))
          .slice(0, 8)
          .map((evt: any) => {
            let action = "";
            let repoName = evt.repo?.name || "";
            // Clean up username prefix from repo name if present
            if (repoName.startsWith("aditya-singh-18/")) {
              repoName = repoName.replace("aditya-singh-18/", "");
            }
            
            if (evt.type === "PushEvent") {
              const commitCount = evt.payload?.commits?.length || 1;
              const maybeMsg = evt.payload?.commits?.[0]?.message || "update";
              action = `Pushed ${commitCount} commit(s) ("${maybeMsg}") to ${repoName}`;
            } else if (evt.type === "CreateEvent") {
              const refType = evt.payload?.ref_type || "branch";
              const refLabel = evt.payload?.ref || "main";
              action = `Created ${refType} "${refLabel}" inside ${repoName}`;
            } else if (evt.type === "PullRequestEvent") {
              const prAction = evt.payload?.action || "opened";
              const prTitle = evt.payload?.pull_request?.title || "";
              action = `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} PR: "${prTitle}" in ${repoName}`;
            } else if (evt.type === "IssuesEvent") {
              const issueAction = evt.payload?.action || "opened";
              const issueTitle = evt.payload?.issue?.title || "";
              action = `${issueAction.charAt(0).toUpperCase() + issueAction.slice(1)} Issue: "${issueTitle}" in ${repoName}`;
            } else if (evt.type === "RepositoryEvent") {
              const repoAction = evt.payload?.action || "created";
              action = `${repoAction.charAt(0).toUpperCase() + repoAction.slice(1)} repository: ${repoName}`;
            }
            
            let timeStr = "Recent";
            try {
              timeStr = new Date(evt.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            } catch (e) {}
            
            return {
              id: evt.id,
              type: evt.type,
              repo: repoName,
              message: action,
              time: timeStr,
              source: "live-client"
            };
          });
        setActivities(mapped);
      }
    } catch (e) {
      console.warn("Client-side direct GitHub events fetch failed too", e);
    }
  };

  useEffect(() => {
    fetchActivityFeed();
  }, []);

  // Time Sync Ticker (Count down for next automatic pooling interval)
  useEffect(() => {
    let secs = 21598;
    const tInterval = setInterval(() => {
      secs--;
      if (secs <= 0) secs = 21600;
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      setSyncTimer(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(tInterval);
  }, []);

  // Interactive Architecture Loop Simulation
  useEffect(() => {
    if (!archPlaying) return;

    const interval = setInterval(() => {
      setArchStep(prev => {
        const next = (prev + 1) % 11;
        if (next === 0) {
          const hit = Math.random() > 0.45;
          setIsCacheHit(hit);
          setArchLatency(hit ? "1.1ms" : "3.8ms");
        }
        updateArchLog(next);
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [archPlaying, isCacheHit]);

  const updateArchLog = (step: number) => {
    const timestamp = new Date().toLocaleTimeString();
    let message = "";
    switch (step) {
      case 0:
        message = `[${timestamp}] ── [IDLE] Awaiting incoming routing trace hook request.`;
        break;
      case 1:
        message = `[${timestamp}] ── [CLIENT] Dispatched request: GET /api/v1/projects`;
        break;
      case 2:
        message = `[${timestamp}] ── [GATEWAY] Received request. Verifying cryptographic security filters...`;
        break;
      case 3:
        message = `[${timestamp}] ── [GATEWAY] Relaying authentication checks downstream to security servers.`;
        break;
      case 4:
        message = `[${timestamp}] ── [AUTH] JWT authentication evaluated successfully [ROLE_ADMIN].`;
        break;
      case 5:
        message = `[${timestamp}] ── [GATEWAY] RBAC guidelines verified. Splicing downstream data thread channel.`;
        break;
      case 6:
        message = `[${timestamp}] ── [PROJECT_SVC] Scanning ultra-low-latency Redis RAM memory caching store...`;
        break;
      case 7:
        if (isCacheHit) {
          message = `[${timestamp}] ── [REDIS] [CACHE_HIT] Record matched inside key namespaces. Bypassing main database.`;
        } else {
          message = `[${timestamp}] ── [REDIS] [CACHE_MISS] Expired entry. Launching relational database synchronizer.`;
        }
        break;
      case 8:
        if (isCacheHit) {
          message = `[${timestamp}] ── [PROJECT_SVC] Marshalling cache data structures payload index model.`;
        } else {
          message = `[${timestamp}] ── [POSTGRES] Executed transaction safe query inside database (1.4ms).`;
        }
        break;
      case 9:
        if (isCacheHit) {
          message = `[${timestamp}] ── [GATEWAY] Packing frame packets. Returning OK.`;
        } else {
          message = `[${timestamp}] ── [PROJECT_SVC] Repopulated caches with fresh ResultSet indexes (TTL: 21600s).`;
        }
        break;
      case 10:
        message = `[${timestamp}] ── [CLIENT] Render complete. Network response Code 200 STATUS_OK (Latency: ${archLatency}).`;
        break;
    }
    setArchLogs(prev => [message, ...prev.slice(0, 5)]);
  };

  const handleManualTrigger = () => {
    setArchStep(1);
    const hit = Math.random() > 0.5;
    setIsCacheHit(hit);
    setArchLatency(hit ? "1.2ms" : "3.9ms");
    updateArchLog(1);
  };

  // Profile synchronize action
  const triggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncLogs([
      "Mapping platform API connection endpoints...",
      "Connecting git.api.live.github.com/aditya-singh-18...",
      "Analyzing solved counts on HackerRank (AdityaSingh18)...",
      "Parsing LeetCode live specifications (adityasingh_18)...",
      "Consolidating secure response metrics...",
      "Synchronized profiles caching successfully."
    ]);

    try {
      const res = await fetch("/api/sync", { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && onRefreshStats) {
          onRefreshStats(json.data);
        }
      } else {
        throw new Error("Express backend sync endpoint not supported on static platform.");
      }
    } catch (err) {
      console.warn("Express backend sync unavailable. Querying direct client-side live metrics APIs...", err);
      try {
        const updated = JSON.parse(JSON.stringify(stats || {
          github: { repos: 42, followers: 12, contributions: 1438 },
          leetcode: { solved: 289, easy: 100, medium: 150, hard: 39, rating: 1809, ranking: 29812 },
          codolio: { solved: 318, activeDays: 162, contests: 15, submissions: 414 }
        })) as HeroStats;

        if (!updated.github) updated.github = {};
        if (!updated.leetcode) updated.leetcode = {};

        // 1. GitHub User API Profile Fetch
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
        } catch (e) {}

        // 2. LeetCode Shohag API Profile Fetch
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
        } catch (e) {}

        updated.source = "live-client";
        if (onRefreshStats) {
          onRefreshStats(updated);
        }
        try {
          localStorage.setItem("aditya_portfolio_cached_stats", JSON.stringify(updated));
        } catch (e) {}
      } catch (clientErr) {
        console.error("Direct browser-based sync failed", clientErr);
      }
    }

    setTimeout(() => {
      setIsSyncing(false);
      fetchActivityFeed();
    }, 2000);
  };

  // Download markdown resume format
  const handleDownloadResume = () => {
    globalThis.location.href = "/api/download-resume";
  };

  // Real GitHub Contribution Grid alignment generator
  const generateContributionGrid = () => {
    const grid = stats?.github?.contributionGrid;
    if (!grid) return null;
    
    const cells: { date: string; level: number }[] = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 370);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);
    
    const currentDate = new Date(startDate);
    for (let i = 0; i < 371; i++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const level = grid[dateStr] !== undefined ? grid[dateStr] : 0;
      cells.push({ date: dateStr, level });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return cells;
  };

  return (
    <div id="hero-overview-container" className="flex flex-col gap-12 text-white text-left">
      
      {/* SECTION 1: HERO */}
      <div id="section-hero" className="relative p-8 md:p-12 rounded-3xl border border-[#1A1A1A] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF4D00]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="flex flex-col gap-4 max-w-2xl relative z-10 text-left">
          
          {/* Impressive high-contrast bold typography for Aditya's scale statement */}
          <h1 className="text-xl md:text-3.5xl font-black text-white tracking-tight leading-none uppercase max-w-xl">
            From Algorithms to Architectures,<br />
            <span className="text-[#FF4D00] shadow-[#FF4D00]/10 drop-shadow-[0_2px_10px_rgba(255,77,0,0.15)]">Building Systems That Scale.</span>
          </h1>

          <div className="flex flex-col gap-3.5 max-w-xl mt-1.5 text-left">
            <p className="text-xs md:text-[13px] text-gray-200 leading-relaxed font-bold">
              I'm <span className="text-white font-extrabold text-[#FF4D00] underline decoration-[#FF4D00]/30 underline-offset-4">Aditya Singh</span>, a Backend Software Engineer focused on transforming complex problems into scalable software solutions. My work revolves around backend architecture, API engineering, database optimization, and distributed systems, backed by a strong problem-solving mindset developed through competitive programming and system design.
            </p>
            <p className="text-xs md:text-[13px] text-gray-400 leading-relaxed font-semibold">
              I enjoy building software that is secure, observable, performant, and engineered to grow—from efficient algorithms and microservices to production-ready platforms serving real users.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 mt-1">
            <button
              onClick={() => onNavigateToTab("projects")}
              className="flex items-center gap-2 text-xs font-semibold px-5.5 py-3 rounded-xl bg-[#FF4D00] text-white hover:bg-[#ff5d1a] border border-[#FF4D00] shadow-[0_4px_20px_rgba(255,77,0,0.15)] font-sans tracking-wide transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Projects Lab</span>
              <Command size={13} />
            </button>
            <button
              onClick={handleDownloadResume}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5.5 py-3 rounded-xl bg-white text-black hover:bg-[#FF4D00] hover:text-white border border-white hover:border-[#FF4D00] transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md"
            >
              <span>Download Resume</span>
              <Download size={13} className="text-[#FF4D00] group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Right side: High-performance Visualizer panel */}
        <div className="w-full lg:w-[520px] xl:w-[620px] shrink-0 relative z-10">
          <EngineeringEvolutionEngine />
        </div>
      </div>

      {/* SECTION 2: METRICS VIEWPORT */}
      {(() => {
        const metricsList = [
          { value: `${stats?.codolio?.solved || "318"}`, label: "Problems Solved", sub: "codolio.com (All Platforms)", marker: "CODOLIO" },
          stats?.leetcode?.rating ? { value: `${stats.leetcode.rating}`, label: "LeetCode Rating", sub: "Weekly Contest #504", marker: "LC_RATING" } : null,
          stats?.codolio?.activeDays ? { value: `${stats.codolio.activeDays}`, label: "Active Coding Days", sub: "Platform Aggregated", marker: "COD_ACTIVE" } : null,
          stats?.github?.repos ? { value: `${stats.github.repos}`, label: "GitHub Repositories", sub: "aditya-singh-18", marker: "GH_REPOS" } : null,
          stats?.github?.contributions ? { value: `${stats.github.contributions}`, label: "GitHub Contributions", sub: "aditya-singh-18", marker: "GH_COMMITS" } : null
        ].filter(Boolean) as { value: string; label: string; sub: string; marker: string }[];

        if (metricsList.length === 0) return null;

        const isFallback = stats?.source === "fallback";

        return (
          <div className="flex flex-col gap-4">
            {isFallback && (
              <div id="fallback-data-banner" className="flex items-center gap-2.5 p-3.5 px-4 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] text-yellow-500 text-xs font-mono">
                <span className="flex h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse shrink-0" />
                <span>Using fallback data (Live APIs timed out or rate-limited)</span>
              </div>
            )}
            <div id="section-metrics" className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {metricsList.map((metric, idx) => (
                <div
                  id={`dynamic-live-metric-card-${idx}`}
                  key={idx}
                  className="group relative p-5 rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A]/70 hover:bg-[#0F0F0F] hover:border-[#FF4D00]/30 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr from-transparent to-[#FF4D00]/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-orange-400 tracking-tight font-mono mb-1">
                      {metric.value}
                    </div>
                    <div className="text-white text-xs font-semibold tracking-wide font-sans">
                      {metric.label}
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/[0.04] text-[9px] font-mono text-gray-500 uppercase tracking-widest flex justify-between">
                    <span>{metric.sub}</span>
                    <span className="text-[#FF4D00] font-bold">{metric.marker}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* SECTION 3: PROFESSIONAL SNAPSHOT */}
      <div id="section-snapshot" className="flex flex-col gap-4 text-left">
        <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-gray-500">
          PROFESSIONAL SNAPSHOT — SYSTEMATIC FOUNDATION
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Backend Engineering",
              desc: "Engineering highly resilient REST APIs, JWT filters, authentication logic and transactional locks.",
              icon: Server,
              badge: "ENGINEERING_SVC",
              glow: "group-hover:border-blue-500/30"
            },
            {
              title: "System Design",
              desc: "Architecting clean abstractions, optimized PostgreSQL schemas, high performance indexes, and low latency caching layers.",
              icon: GitBranch,
              badge: "SYSTEM_ABSTRACTIONS",
              glow: "group-hover:border-[#FF4D00]/30"
            },
            {
              title: "Competitive Programming",
              desc: "Advanced problem solving under algorithmic contest guidelines on LeetCode and Codeforces platforms.",
              icon: Code2,
              badge: " contest_SOLVING",
              glow: "group-hover:border-purple-500/30"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                id={`professional-snapshot-${idx}`}
                key={idx}
                className="group relative p-6 rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A]/40 hover:bg-white/[0.015] transition-all duration-300"
              >
                <div className={`absolute inset-0 border border-transparent rounded-2xl transition-all duration-500 pointer-events-none ${item.glow}`} />
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="p-2.5 rounded-xl bg-black/80 border border-white/[0.05] text-[#FF4D00] group-hover:scale-105 transition-transform duration-300">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">{item.badge}</span>
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold tracking-wide font-sans mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: CODING DASHBOARD */}
      <div id="section-coding-dashboard" className="flex flex-col gap-6 text-left">
        <div className="flex justify-between items-center select-none">
          <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-gray-500">
            COMPETITIVE PROGRAMMING DASHBOARD & LIVE GRAPHS
          </h2>
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-lg border border-white/5 bg-[#121212] hover:border-[#FF4D00]/30 text-gray-400 hover:text-white transition cursor-pointer ${isSyncing ? "animate-pulse" : ""}`}
          >
            <RefreshCw size={10} className={isSyncing ? "animate-spin text-[#FF4D00]" : ""} />
            <span>{isSyncing ? "SYNCING LIVE..." : "SYNC PERFORMANCE"}</span>
          </button>
        </div>

        {/* Live Grid Row: LeetCode & Codolio profile info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats?.leetcode?.solved && (
            <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A]/50 p-6 flex flex-col justify-between h-[180px] hover:border-[#FF4D00]/20 transition-all text-left">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Code className="text-[#FF4D00] size-4" />
                  <span className="text-sm font-bold text-white font-sans">LeetCode Dashboard</span>
                </div>
                <span className="text-[9px] font-mono text-gray-500">@adityasingh_18</span>
              </div>
              <div className="grid grid-cols-2 gap-y-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Problems Solved</div>
                  <div className="text-base font-bold text-white tracking-tight">{stats.leetcode.solved}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Contest Rating</div>
                  <div className="text-base font-bold text-orange-400 tracking-tight">{stats.leetcode.rating || "N/A"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Global Ranking</div>
                  <div className="text-sm text-gray-300 tracking-tight font-bold">
                    {stats.leetcode.ranking ? `#${(() => {
                      const num = Number(stats.leetcode.ranking);
                      return isNaN(num) ? stats.leetcode.ranking : num.toLocaleString();
                    })()}` : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Distribution</div>
                  <div className="text-[9px] text-green-400 flex items-center gap-1.5 font-bold">
                    <span>E:{stats.leetcode.easy || 0} M:{stats.leetcode.medium || 0} H:{stats.leetcode.hard || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Codolio Aggregator Card */}
          <a
            href="https://codolio.com/profile/adityasingh18"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A]/50 p-6 flex flex-col justify-between h-[180px] hover:border-[#FF4D00]/25 hover:bg-[#FF4D00]/5 transition-all text-left group cursor-pointer"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.03]">
              <div className="flex items-center gap-2">
                <Compass className="text-[#FF4D00] size-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-bold text-white font-sans group-hover:text-[#FF4D00] transition-colors">Codolio Dashboard</span>
              </div>
              <span className="text-[9px] font-mono text-gray-500">@adityasingh18</span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Aggregated Solved</div>
                <div className="text-base font-bold text-white tracking-tight">{stats?.codolio?.solved || "318"}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Active Coding Days</div>
                <div className="text-base font-bold text-amber-500 tracking-tight">{stats?.codolio?.activeDays || "162"}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Total Contests</div>
                <div className="text-sm text-gray-300 tracking-tight font-bold">15 Contests</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Connected Platforms</div>
                <div className="text-[9.5px] text-green-400 font-bold leading-none mt-0.5">
                  LC, GFG, CodeChef, CF
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Card C: GitHub Contribution Heatmap */}
        {(() => {
          const cells = generateContributionGrid();
          if (!cells) return null;

          return (
            <div className="p-6 rounded-2xl border border-[#1A1A1A] bg-black/45 flex flex-col gap-4 text-left">
              <div className="flex justify-between items-center select-none pb-2 border-b border-white/[0.03]">
                <div>
                  <span className="text-[9.5px] font-mono text-green-400 uppercase tracking-widest font-bold">CONTRIBUTION GRID TELEMETRY</span>
                  <h3 className="text-white text-sm font-bold font-sans mt-0.5">GitHub Contribution Heatmap</h3>
                </div>
                <span className="text-[9px] font-mono text-gray-500 uppercase">Yearly commit distribution matrix</span>
              </div>

              {/* Genuine 53 Columns x 7 Rows Grid using fetched data */}
              <div className="w-full overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <div className="flex gap-1 py-1 min-w-[620px]">
                  {Array.from({ length: 53 }).map((_, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, rowIdx) => {
                        const idx = colIdx * 7 + rowIdx;
                        const cell = cells[idx];
                        if (!cell) return null;
                        
                        let color = "bg-[#111] border border-transparent";
                        if (cell.level === 1) color = "bg-[#0e4429] border border-[#0e4429]/10";
                        else if (cell.level === 2) color = "bg-[#006d32] border border-[#006d32]/10";
                        else if (cell.level === 3) color = "bg-[#26a641] border border-[#26a641]/10";
                        else if (cell.level === 4) color = "bg-[#39d353] border border-[#39d353]/10";

                        return (
                          <div
                            key={rowIdx}
                            className={`w-2.5 h-2.5 rounded-[1.5px] transition-colors cursor-pointer ${color}`}
                            title={`${cell.date}: Level ${cell.level}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[8.5px] font-mono text-gray-500 mt-1 select-none">
                <span>53 Weeks Grid (Sunday - Saturday)</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2 h-2 rounded-[1.5px] bg-[#111]" />
                  <span className="w-2 h-2 rounded-[1.5px] bg-[#0e4429]" />
                  <span className="w-2 h-2 rounded-[1.5px] bg-[#006d32]" />
                  <span className="w-2 h-2 rounded-[1.5px] bg-[#26a641]" />
                  <span className="w-2 h-2 rounded-[1.5px] bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 5: SYSTEM ARCHITECTURE SHOWCASE */}
      <div id="section-showcase" className="p-6 md:p-8 rounded-2xl border border-[#262626] bg-[#0B0B0B] text-left relative overflow-hidden flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[#1A1A1A] pb-5 select-none font-sans">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#FF4D00] uppercase mb-1">
              <Workflow size={12} className="text-[#FF4D00] animate-pulse" />
              <span>INTERACTIVE SYSTEM FLOW SIMULATOR</span>
            </div>
            <h3 className="text-lg font-extrabold tracking-tight text-white font-sans">
              System Architecture Showcase — Dynamic Tracing
            </h3>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 font-mono">
            <button
              onClick={() => setArchPlaying(p => !p)}
              className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 active:bg-white/5 cursor-pointer text-gray-400 hover:text-white transition"
            >
              <Clock size={11} className={archPlaying ? "text-[#FF4D00]" : "text-gray-500"} />
              <span>{archPlaying ? "PAUSE SIM" : "PLAY SIM"}</span>
            </button>
            <button
              onClick={handleManualTrigger}
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wide px-3.5 py-1.5 rounded-lg bg-[#FF4D00] text-white hover:bg-orange-600 transition cursor-pointer"
            >
              <Play size={10} fill="currentColor" />
              <span>Trigger Trace Hook</span>
            </button>
          </div>
        </div>

        {/* Visual Request Flow Canvas with Technology Specific Icons & High Contrast */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5 relative py-4">
          {[
            { id: 1, label: "Client DB/SPA", desc: "GET /api/v1/projects", type: "router", icon: Monitor, color: "text-orange-400" },
            { id: 2, label: "API Gateway", desc: "Spring Cloud proxy", type: "proxy", icon: Globe, color: "text-sky-400" },
            { id: 3, label: "Auth Server", desc: "JWT role RBAC decoder", type: "verify", icon: ShieldAlert, color: "text-amber-500" },
            { id: 4, label: "Project Service", desc: "Spring Boot controller", type: "service", icon: Server, color: "text-purple-400" },
            { id: 5, label: "Redis Cache", desc: "Low-latency key cache", type: "cache", icon: Database, color: "text-red-500" },
            { id: 6, label: "PostgreSQL", desc: "ACID transactions", type: "database", icon: Layers, color: "text-indigo-400" }
          ].map((node) => {
            const NodeIcon = node.icon;
            // Highlight checking
            let isActive = false;
            const glowColor = "border-[#FF4D00]/60 bg-[#FF4D00]/10 shadow-[0_0_20px_rgba(255,77,0,0.2)] scale-[1.03]";
            if (node.id === 1 && (archStep === 1 || archStep === 10)) isActive = true;
            if (node.id === 2 && (archStep === 2 || archStep === 3 || archStep === 5 || (isCacheHit ? archStep === 8 : archStep === 9))) isActive = true;
            if (node.id === 3 && archStep === 4) isActive = true;
            if (node.id === 4 && (archStep === 6 || (isCacheHit ? archStep === 7 : archStep === 8 || archStep === 9))) isActive = true;
            if (node.id === 5 && archStep === 7) isActive = true;
            if (node.id === 6 && !isCacheHit && archStep === 8) isActive = true;

            return (
              <div
                id={`arch-node-group-${node.id}`}
                key={node.id}
                className={`relative px-4 py-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-[115px] ${
                  isActive 
                    ? glowColor 
                    : "border-[#202020] bg-black/90 hover:border-gray-700"
                }`}
              >
                {/* Active indicator Sparkle element */}
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D00]" />
                  </span>
                )}

                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center justify-between pointer-events-none">
                  <span>0{node.id}</span>
                  <span className={`font-bold uppercase text-[8px] ${isActive ? "text-[#FF4D00]" : "text-gray-600"}`}>{node.type}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <NodeIcon size={14} className={`${isActive ? "text-[#FF4D00] animate-pulse scale-110" : node.color} opacity-90 transition-transform`} />
                    <div className={`text-xs font-extrabold tracking-wide font-sans ${isActive ? "text-white" : "text-gray-200"}`}>
                      {node.label}
                    </div>
                  </div>
                  <div className={`text-[9.5px] font-mono mt-0.5 truncate ${isActive ? "text-orange-200 font-bold" : "text-gray-400"}`}>
                    {node.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Logger terminal container with higher visibility/contrast */}
        <div className="rounded-xl border border-[#262626] bg-black p-4 font-mono text-[10.5px] leading-relaxed text-gray-300 flex flex-col gap-1.5 min-h-[140px] max-h-[160px] overflow-y-auto">
          <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold tracking-widest border-b border-white/[0.04] pb-1.5 mb-1 select-none">
            <span>LIVE LOGGER RUNTIME TELEMETRY</span>
            <span className="text-[#FF4D00] font-bold">TARGET: {isCacheHit ? "REDIS_RAM_HIT_CACHE" : "PSQL_RELATIONAL_TRANSACTION"}</span>
          </div>
          {archLogs.map((log, idx) => (
            <div key={idx} className={idx === 0 ? "text-orange-400 font-semibold" : ""}>
              {idx === 0 ? <span className="text-[#FF4D00] mr-2 font-black">&gt;</span> : " "}
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: CONTACT CTA */}
      <div id="section-contact" className="relative p-8 md:p-10 rounded-2xl border border-dashed border-[#222] bg-[#090909]/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col gap-1.5 text-left max-w-xl">
          <span className="text-[9.5px] font-mono text-[#FF4D00] uppercase tracking-[0.2em] font-bold">INITIATE CONNECTION CHANNEL</span>
          <h3 className="text-white text-lg md:text-xl font-bold tracking-tight font-sans">
            Have a project, system challenge, or position in mind?
          </h3>
          <p className="text-gray-400 text-xs font-sans leading-relaxed font-medium">
            Deploy an interactive terminal message query or reach out directly to coordinate schedule calendars. Response pipeline latency average is sub 6 hours.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab("contact")}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl bg-white text-black hover:bg-[#FF4D00] hover:text-white transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-md select-none"
        >
          <span>Open Contact Terminal</span>
          <ChevronRight size={14} className="text-[#FF4D00] group-hover:text-white group-hover:translate-x-0.5 transition" />
        </button>
      </div>

      {/* Sync loading Overlay */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#060606]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-50 rounded-2xl border border-[#FF4D00]/25 text-left select-none"
          >
            <div className="w-full max-w-sm flex flex-col gap-2 font-mono text-[10px] text-gray-400 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.05] mb-2 font-bold uppercase tracking-wider text-white">
                <span>Ecosystem Profiles Synchronizer</span>
                <span className="text-[#FF4D00] animate-spin">⟳</span>
              </div>
              {syncLogs.map((log, idx) => (
                <div key={idx} className={idx === syncLogs.length - 1 ? "text-orange-400 font-bold animate-pulse" : ""}>
                  [SYSTEM_SYNC] &gt; {log}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
