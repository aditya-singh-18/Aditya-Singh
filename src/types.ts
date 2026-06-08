export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  highlights: string[];
  problem?: string;
  solution?: string;
  impact?: string;
  status?: string;
  currentStage?: string;
  teamSize?: string;
  techStack?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logoText: string;
  period: string;
  description: string;
  points: string[];
  skills: string[];
}

export interface TechItem {
  name: string;
  level: number; // 0-100 indicating familiarity
  category: string; // e.g. "Languages", "Frameworks & Runtimes", "Databases & Storage", "Developer Tools"
  proficiency: "Expert" | "Advanced" | "Intermediate" | "Familiar";
  iconName: string; // matching Key of Lucide-react or helper
  subtitle?: string; // e.g., "Primary Backend Language"
  usedIn?: string[]; // e.g., ["UniPro"]
  capabilities?: string[]; // capabilities lists
  levelText?: "CORE STACK" | "ADVANCED" | "WORKING KNOWLEDGE";
  relatedStack?: string[]; // related technology tags
}

export interface JourneyMilestone {
  id: string;
  year: string;
  phase: string; // "Q1", "Summer", etc.
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "coding" | "projects" | "goals";
  tags?: string[];
  metrics?: string[];
  achievements?: string[];
}

export interface HeroStats {
  github?: {
    repos?: number;
    contributions?: number;
    contributionGrid?: {
      level?: number;
      date?: string;
    }[];
    followers?: number;
  };
  leetcode?: {
    solved?: number;
    rating?: number;
    ranking?: number | string;
    easy?: number;
    medium?: number;
    hard?: number;
  };
  codeforces?: {
    rating?: number;
  };
  hackerrank?: {
    badges?: number;
    verified?: boolean;
    stars?: number;
    solved?: number;
  };
  codolio?: {
    username?: string;
    solved?: number;
    activeDays?: number;
    contests?: number;
    submissions?: number;
  };
  source?: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  repo: string;
  message: string;
  time: string;
  source?: string;
}
