'use client';

import { getScoreColor, getScoreLabel } from '@/lib/constants';

export function ScoreCircle({ score, size = 'lg' }: { score: number; size?: 'sm' | 'lg' }) {
  const { color, stroke } = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const dimensions = size === 'lg' ? 'w-40 h-40' : 'w-20 h-20';
  const textSize = size === 'lg' ? 'text-4xl' : 'text-lg';
  const labelSize = size === 'lg' ? 'text-sm' : 'text-[10px]';

  return (
    <div className={`relative ${dimensions} inline-flex items-center justify-center`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={`${stroke} animate-score-fill`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold ${textSize} ${color}`}>{score}</span>
        <span className={`${labelSize} text-gray-500 font-medium`}>{label}</span>
      </div>
    </div>
  );
}
