import { ScoreCircle } from './ScoreCircle';

export function ReportSection({
  title,
  score,
  children,
}: {
  title: string;
  score?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {score !== undefined && <ScoreCircle score={score} size="sm" />}
      </div>
      {children}
    </div>
  );
}
