import type { Metadata } from 'next';
import { ReportForm } from '@/components/form/ReportForm';

export const metadata: Metadata = {
  title: 'Generate Your Free Digital Presence Report',
  description:
    'Enter your details and get an AI-powered analysis of your digital footprint in 60 seconds. Completely free.',
};

export default function GeneratePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Discover Your Digital Presence
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Enter your details below and our AI will analyze what the internet says about you.
          Get your personalized report in under 60 seconds.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <ReportForm />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-2xl mb-1">&#128269;</div>
          <p className="text-sm font-medium text-gray-700">Google Search Analysis</p>
          <p className="text-xs text-gray-400">What shows up when people search for you</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-2xl mb-1">&#128101;</div>
          <p className="text-sm font-medium text-gray-700">Social Media Audit</p>
          <p className="text-xs text-gray-400">How strong your social profiles are</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-2xl mb-1">&#127919;</div>
          <p className="text-sm font-medium text-gray-700">Influence Score</p>
          <p className="text-xs text-gray-400">Are you an influencer or invisible?</p>
        </div>
      </div>
    </div>
  );
}
