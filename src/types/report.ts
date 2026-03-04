export interface SearchMention {
  title: string;
  url: string;
  snippet: string;
}

export interface PlatformAnalysis {
  platform: 'linkedin' | 'twitter' | 'instagram';
  url: string;
  profileFound: boolean;
  indicators: string[];
  analysis: string;
}

export interface WeakPoint {
  area: string;
  severity: 'critical' | 'moderate' | 'minor';
  description: string;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
}

export interface DigitalPresenceReport {
  id: string;
  name: string;
  companyName: string;
  overallScore: number;
  generatedAt: string;

  searchVisibility: {
    score: number;
    totalResults: number;
    sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
    topMentions: SearchMention[];
    summary: string;
  };

  socialPresence: {
    score: number;
    platforms: PlatformAnalysis[];
    summary: string;
  };

  influencerScore: {
    score: number;
    level: 'invisible' | 'emerging' | 'established' | 'influencer' | 'thought_leader';
    reasoning: string;
    indicators: string[];
  };

  footprintHealth: {
    score: number;
    goodFootprints: string[];
    badFootprints: string[];
    summary: string;
  };

  weakPoints: {
    gaps: WeakPoint[];
  };

  recommendations: Recommendation[];
}

export interface ReportFormData {
  name: string;
  companyName: string;
  email: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  websiteUrl: string;
}
