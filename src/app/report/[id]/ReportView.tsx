'use client';

import { ScoreCircle } from '@/components/report/ScoreCircle';
import { ReportSection } from '@/components/report/ReportSection';
import { DownloadButton } from '@/components/report/DownloadButton';
import { INFLUENCE_LEVELS } from '@/lib/constants';
import type { DigitalPresenceReport } from '@/types/report';

export function ReportView({ report }: { report: DigitalPresenceReport }) {
  const influenceLevel =
    INFLUENCE_LEVELS[report.influencerScore?.level || 'invisible'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 no-print">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Digital Presence Report
        </h1>
        <p className="text-gray-500 text-sm">
          Generated on {new Date(report.generatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mb-8 no-print">
        <DownloadButton name={report.name} />
      </div>

      {/* Report Content - this div gets converted to PDF */}
      <div id="report-content">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-8">
          <h2 className="text-lg font-medium opacity-90 mb-1">{report.name}</h2>
          {report.companyName && (
            <p className="opacity-70 text-sm mb-4">{report.companyName}</p>
          )}
          <div className="flex justify-center mb-4">
            <div className="bg-white/15 rounded-full p-4">
              <ScoreCircle score={report.overallScore} size="lg" />
            </div>
          </div>
          <p className="text-lg font-semibold">Overall Digital Presence Score</p>
          <p className="opacity-70 text-sm mt-1">
            Based on search visibility, social media, influence, and footprint health
          </p>
        </div>

        {/* Search Visibility */}
        {report.searchVisibility && (
          <ReportSection title="Search Visibility" score={report.searchVisibility.score}>
            <p className="text-gray-600 text-sm mb-4">{report.searchVisibility.summary}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-50 px-3 py-1.5 rounded-lg">
                <span className="text-xs text-blue-600 font-medium">
                  {report.searchVisibility.totalResults.toLocaleString()} Google results
                </span>
              </div>
              <div className={`px-3 py-1.5 rounded-lg ${
                report.searchVisibility.sentiment === 'positive' ? 'bg-green-50' :
                report.searchVisibility.sentiment === 'negative' ? 'bg-red-50' :
                'bg-gray-50'
              }`}>
                <span className={`text-xs font-medium capitalize ${
                  report.searchVisibility.sentiment === 'positive' ? 'text-green-600' :
                  report.searchVisibility.sentiment === 'negative' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {report.searchVisibility.sentiment} sentiment
                </span>
              </div>
            </div>
            {report.searchVisibility.topMentions?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Top Mentions Found</h3>
                <div className="space-y-2">
                  {report.searchVisibility.topMentions.map((mention, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <a
                        href={mention.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {mention.title}
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">{mention.snippet}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ReportSection>
        )}

        {/* Social Media Presence */}
        {report.socialPresence && (
          <ReportSection title="Social Media Presence" score={report.socialPresence.score}>
            <p className="text-gray-600 text-sm mb-4">{report.socialPresence.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {report.socialPresence.platforms?.map((platform) => (
                <div
                  key={platform.platform}
                  className={`rounded-lg p-4 border ${
                    platform.profileFound
                      ? 'border-green-200 bg-green-50/50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold capitalize">{platform.platform}</span>
                    {platform.profileFound ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Found
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Not Found
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{platform.analysis}</p>
                  {platform.indicators?.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {platform.indicators.map((ind, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">&#8226;</span> {ind}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Influencer Score */}
        {report.influencerScore && (
          <ReportSection title="Influencer / Authority Score" score={report.influencerScore.score}>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${influenceLevel.bg} ${influenceLevel.color}`}
              >
                {influenceLevel.label}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{report.influencerScore.reasoning}</p>
            {report.influencerScore.indicators?.length > 0 && (
              <ul className="space-y-1">
                {report.influencerScore.indicators.map((ind, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-purple-500">&#9733;</span> {ind}
                  </li>
                ))}
              </ul>
            )}
          </ReportSection>
        )}

        {/* Footprint Health */}
        {report.footprintHealth && (
          <ReportSection title="Digital Footprint Health" score={report.footprintHealth.score}>
            <p className="text-gray-600 text-sm mb-4">{report.footprintHealth.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-green-700 mb-2">
                  Good Footprints
                </h3>
                <ul className="space-y-1.5">
                  {report.footprintHealth.goodFootprints?.map((fp, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500">&#10003;</span> {fp}
                    </li>
                  ))}
                  {(!report.footprintHealth.goodFootprints || report.footprintHealth.goodFootprints.length === 0) && (
                    <li className="text-sm text-gray-400 italic">No positive footprints found</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-red-700 mb-2">
                  Concerning Footprints
                </h3>
                <ul className="space-y-1.5">
                  {report.footprintHealth.badFootprints?.map((fp, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-500">&#10007;</span> {fp}
                    </li>
                  ))}
                  {(!report.footprintHealth.badFootprints || report.footprintHealth.badFootprints.length === 0) && (
                    <li className="text-sm text-gray-400 italic">No concerning footprints found</li>
                  )}
                </ul>
              </div>
            </div>
          </ReportSection>
        )}

        {/* Weak Points */}
        {report.weakPoints?.gaps?.length > 0 && (
          <ReportSection title="Weak Points">
            <div className="space-y-3">
              {report.weakPoints.gaps.map((gap, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-4 border-l-4 ${
                    gap.severity === 'critical'
                      ? 'border-l-red-500 bg-red-50/50'
                      : gap.severity === 'moderate'
                      ? 'border-l-orange-400 bg-orange-50/50'
                      : 'border-l-yellow-400 bg-yellow-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{gap.area}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        gap.severity === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : gap.severity === 'moderate'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {gap.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{gap.description}</p>
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Recommendations */}
        {report.recommendations?.length > 0 && (
          <ReportSection title="Recommendations">
            <div className="space-y-3">
              {report.recommendations.map((rec, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        rec.priority === 'high'
                          ? 'bg-red-500'
                          : rec.priority === 'medium'
                          ? 'bg-orange-400'
                          : 'bg-blue-400'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{rec.title}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        rec.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : rec.priority === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{rec.description}</p>
                  <p className="text-xs text-gray-400 ml-8 mt-1">
                    Impact: {rec.impact}
                  </p>
                </div>
              ))}
            </div>
          </ReportSection>
        )}

        {/* Report Footer */}
        <div className="text-center text-xs text-gray-400 mt-8 pb-4">
          <p>Generated by Digital Presence Report | AI-Powered Analysis</p>
          <p>This report is based on publicly available information at the time of generation.</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 no-print">
        <DownloadButton name={report.name} />
        <p className="text-xs text-gray-400 mt-3">
          Share this tool with others who want to check their digital presence!
        </p>
      </div>
    </div>
  );
}
