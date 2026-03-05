'use client';

import { useState } from 'react';

export function DownloadButton({ name }: { name: string }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('report-content');
      if (!element) return;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Digital-Presence-Report-${name.replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          onclone: (clonedDoc: Document) => {
            // Fix: html2pdf.js cannot parse CSS lab()/oklch() color functions
            // used by Tailwind CSS v4. Convert all colors to RGB inline styles.
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computed = window.getComputedStyle(el);
              htmlEl.style.color = computed.color;
              htmlEl.style.backgroundColor = computed.backgroundColor;
              htmlEl.style.borderColor = computed.borderColor;
              htmlEl.style.borderTopColor = computed.borderTopColor;
              htmlEl.style.borderRightColor = computed.borderRightColor;
              htmlEl.style.borderBottomColor = computed.borderBottomColor;
              htmlEl.style.borderLeftColor = computed.borderLeftColor;
            });
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 text-sm"
    >
      {downloading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Report
        </>
      )}
    </button>
  );
}
