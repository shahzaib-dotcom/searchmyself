'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormErrors {
  [key: string]: string;
}

export function ReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const [form, setForm] = useState({
    name: '',
    companyName: '',
    email: '',
    linkedinUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    websiteUrl: '',
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim() || form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (form.linkedinUrl && !/linkedin\.com/i.test(form.linkedinUrl)) {
      newErrors.linkedinUrl = 'Must be a LinkedIn URL';
    }
    if (form.twitterUrl && !/x\.com|twitter\.com/i.test(form.twitterUrl)) {
      newErrors.twitterUrl = 'Must be a Twitter/X URL';
    }
    if (form.instagramUrl && !/instagram\.com/i.test(form.instagramUrl)) {
      newErrors.instagramUrl = 'Must be an Instagram URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    // Simulate progress
    setProgress(10);
    setProgressText('Searching Google for your digital footprint...');

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const increment = Math.random() * 15 + 5;
        const next = Math.min(prev + increment, 90);
        if (next > 30 && next <= 50) setProgressText('Analyzing your social media profiles...');
        if (next > 50 && next <= 70) setProgressText('AI is evaluating your digital presence...');
        if (next > 70) setProgressText('Generating your personalized report...');
        return next;
      });
    }, 1500);

    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        setProgress(0);
        return;
      }

      const data = await res.json();
      setProgress(100);
      setProgressText('Report ready! Redirecting...');

      setTimeout(() => {
        router.push(`/report/${data.reportId}`);
      }, 500);
    } catch {
      clearInterval(progressInterval);
      setServerError('Network error. Please check your connection and try again.');
      setLoading(false);
      setProgress(0);
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <svg className="w-20 h-20 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75 text-blue-600"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Analyzing Your Digital Presence
          </h2>
          <p className="text-gray-500 mb-6">{progressText}</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}% complete</p>
        </div>
        <p className="text-sm text-gray-400">
          This usually takes 10-20 seconds. Please don&apos;t close this page.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="John Doe"
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            errors.name ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          value={form.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          placeholder="Acme Inc."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="john@example.com"
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            errors.email ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="border-t border-gray-200 pt-5">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Social Media Profiles{' '}
          <span className="text-gray-400 font-normal">(at least one recommended)</span>
        </p>

        {/* LinkedIn */}
        <div className="mb-4">
          <label htmlFor="linkedinUrl" className="block text-sm text-gray-600 mb-1">
            LinkedIn URL
          </label>
          <input
            id="linkedinUrl"
            type="url"
            value={form.linkedinUrl}
            onChange={(e) => updateField('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
              errors.linkedinUrl ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.linkedinUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl}</p>
          )}
        </div>

        {/* Twitter/X */}
        <div className="mb-4">
          <label htmlFor="twitterUrl" className="block text-sm text-gray-600 mb-1">
            Twitter / X URL
          </label>
          <input
            id="twitterUrl"
            type="url"
            value={form.twitterUrl}
            onChange={(e) => updateField('twitterUrl', e.target.value)}
            placeholder="https://x.com/johndoe"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
              errors.twitterUrl ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.twitterUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.twitterUrl}</p>
          )}
        </div>

        {/* Instagram */}
        <div className="mb-4">
          <label htmlFor="instagramUrl" className="block text-sm text-gray-600 mb-1">
            Instagram URL
          </label>
          <input
            id="instagramUrl"
            type="url"
            value={form.instagramUrl}
            onChange={(e) => updateField('instagramUrl', e.target.value)}
            placeholder="https://instagram.com/johndoe"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
              errors.instagramUrl ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.instagramUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.instagramUrl}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="websiteUrl" className="block text-sm text-gray-600 mb-1">
            Personal / Company Website
          </label>
          <input
            id="websiteUrl"
            type="url"
            value={form.websiteUrl}
            onChange={(e) => updateField('websiteUrl', e.target.value)}
            placeholder="https://johndoe.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm shadow-lg shadow-blue-500/25"
      >
        Generate My Free Report
      </button>

      <p className="text-xs text-gray-400 text-center">
        Your data is used only to generate your report. We don&apos;t share it with third parties.
      </p>
    </form>
  );
}
