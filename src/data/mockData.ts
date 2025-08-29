import type { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Critical Zero-Day Vulnerability Discovered in WebRTC Implementation",
    summary: "A critical remote code execution vulnerability has been discovered in WebRTC implementations affecting millions of users worldwide. The flaw allows attackers to execute arbitrary code through specially crafted media streams.",
    category: "vulnerability",
    severity: "critical",
    source: "CyberSec Research",
    publishedAt: "2024-01-15T10:30:00Z",
    tags: ["zero-day", "webrtc", "rce", "browsers"],
    views: 15420,
    author: "Dr. Sarah Chen",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 2,
    title: "Major Healthcare Provider Suffers Data Breach Affecting 2.3M Patients",
    summary: "MedCorp Healthcare has disclosed a significant data breach that exposed personal health information of 2.3 million patients including medical records, SSNs, and financial data.",
    category: "breach",
    severity: "high",
    source: "HealthSec Daily",
    publishedAt: "2024-01-15T08:15:00Z",
    tags: ["healthcare", "phi", "data-breach", "ransomware"],
    views: 12890,
    author: "Michael Rodriguez",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 3,
    title: "New Botnet Targets IoT Devices with Advanced Persistence Mechanisms",
    summary: "Security researchers have identified a sophisticated botnet campaign targeting IoT devices with novel persistence techniques that survive firmware updates and factory resets.",
    category: "malware",
    severity: "high",
    source: "IoT Security Watch",
    publishedAt: "2024-01-15T06:45:00Z",
    tags: ["botnet", "iot", "malware", "persistence"],
    views: 8750,
    author: "Alex Kim",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 4,
    title: "Sophisticated Phishing Campaign Targets Fortune 500 Executives",
    summary: "A highly targeted spear-phishing campaign has been detected targeting C-level executives at Fortune 500 companies using deepfake audio and AI-generated content.",
    category: "phishing",
    severity: "medium",
    source: "Executive Threat Intel",
    publishedAt: "2024-01-15T05:20:00Z",
    tags: ["spear-phishing", "executives", "deepfake", "ai"],
    views: 6420,
    author: "Jennifer Walsh",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 5,
    title: "APT29 Evolves Tactics with Living-off-the-Land Techniques",
    summary: "The Russian APT29 group has been observed using advanced living-off-the-land techniques and legitimate administrative tools to evade detection in recent campaigns.",
    category: "intelligence",
    severity: "high",
    source: "Nation State Tracker",
    publishedAt: "2024-01-14T22:30:00Z",
    tags: ["apt29", "russia", "lotl", "nation-state"],
    views: 11200,
    author: "David Thompson",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 6,
    title: "Critical Kubernetes Vulnerability Allows Container Escape",
    summary: "A critical vulnerability in Kubernetes allows attackers to escape container boundaries and gain full control over host systems in misconfigured clusters.",
    category: "vulnerability",
    severity: "critical",
    source: "Cloud Security Today",
    publishedAt: "2024-01-14T20:15:00Z",
    tags: ["kubernetes", "container-escape", "cloud", "cve"],
    views: 9850,
    author: "Lisa Park",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 7,
    title: "Financial Services Firm Pays $4.2M Ransomware Demand",
    summary: "A major financial services company has reportedly paid $4.2 million to ransomware operators after failing to contain a network-wide encryption attack.",
    category: "breach",
    severity: "high",
    source: "Financial Cyber News",
    publishedAt: "2024-01-14T18:45:00Z",
    tags: ["ransomware", "financial", "payment", "incident"],
    views: 13670,
    author: "Robert Chen",
    content: "Lorem ipsum detailed article content here..."
  },
  {
    id: 8,
    title: "Supply Chain Attack Targets Software Build Pipelines",
    summary: "Researchers have uncovered a sophisticated supply chain attack that compromises software build pipelines to inject malicious code into popular open-source packages.",
    category: "intelligence",
    severity: "medium",
    source: "Supply Chain Security",
    publishedAt: "2024-01-14T16:20:00Z",
    tags: ["supply-chain", "build-pipeline", "open-source", "injection"],
    views: 7890,
    author: "Maria Garcia",
    content: "Lorem ipsum detailed article content here..."
  }
];

export const mockStats = {
  threatsMonitored: "24/7",
  sources: "500+",
  dailyUpdates: "10,247",
  activeCampaigns: "156"
};

export const mockTrendingTags = [
  "zero-day", "ransomware", "apt", "supply-chain", "iot", 
  "cloud-security", "ai-threats", "nation-state", "phishing", "malware"
];