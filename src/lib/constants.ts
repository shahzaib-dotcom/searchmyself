export const SITE_NAME = 'Digital Presence Report';
export const SITE_DESCRIPTION =
  'Get a free AI-powered analysis of your digital presence. Discover what the internet says about you, your influence level, and how to improve your online footprint.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const DAILY_PER_IP_LIMIT = parseInt(process.env.DAILY_PER_IP_LIMIT || '5', 10);
export const DAILY_GLOBAL_LIMIT = parseInt(process.env.DAILY_GLOBAL_LIMIT || '40', 10);

export const INFLUENCE_LEVELS = {
  invisible: { label: 'Invisible', color: 'text-gray-500', bg: 'bg-gray-100' },
  emerging: { label: 'Emerging', color: 'text-blue-600', bg: 'bg-blue-100' },
  established: { label: 'Established', color: 'text-green-600', bg: 'bg-green-100' },
  influencer: { label: 'Influencer', color: 'text-purple-600', bg: 'bg-purple-100' },
  thought_leader: { label: 'Thought Leader', color: 'text-amber-600', bg: 'bg-amber-100' },
} as const;

export const SCORE_COLORS = {
  poor: { min: 0, max: 30, color: 'text-red-500', stroke: 'stroke-red-500' },
  fair: { min: 31, max: 50, color: 'text-orange-500', stroke: 'stroke-orange-500' },
  good: { min: 51, max: 70, color: 'text-yellow-500', stroke: 'stroke-yellow-500' },
  great: { min: 71, max: 85, color: 'text-green-500', stroke: 'stroke-green-500' },
  excellent: { min: 86, max: 100, color: 'text-emerald-500', stroke: 'stroke-emerald-500' },
} as const;

export function getScoreColor(score: number) {
  if (score <= 30) return SCORE_COLORS.poor;
  if (score <= 50) return SCORE_COLORS.fair;
  if (score <= 70) return SCORE_COLORS.good;
  if (score <= 85) return SCORE_COLORS.great;
  return SCORE_COLORS.excellent;
}

export function getScoreLabel(score: number) {
  if (score <= 30) return 'Poor';
  if (score <= 50) return 'Fair';
  if (score <= 70) return 'Good';
  if (score <= 85) return 'Great';
  return 'Excellent';
}
