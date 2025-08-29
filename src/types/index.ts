export interface Article {
  id: number;
  title: string;
  summary: string;
  category: 'vulnerability' | 'breach' | 'malware' | 'phishing' | 'intelligence';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source: string;
  publishedAt: string;
  tags: string[];
  views: number;
  author: string;
  content: string;
  image?: string;
}

export interface ThreatStats {
  threatsMonitored: string;
  sources: string;
  dailyUpdates: string;
  activeCampaigns: string;
}