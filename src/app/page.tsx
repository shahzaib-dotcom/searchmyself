import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            What Does the Internet
            <br />
            Say About You?
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Get a free, AI-powered report on your digital presence.
            Discover your online visibility, influence level, and digital footprint health in 60 seconds.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-black/20"
          >
            Get Your Free Report
          </Link>
          <p className="text-sm opacity-60 mt-4">No credit card required. 100% free.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enter Your Details</h3>
            <p className="text-sm text-gray-500">
              Provide your name, company, and social media profile links.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Analyzes Your Presence</h3>
            <p className="text-sm text-gray-500">
              Our AI scans Google search results, analyzes your social profiles, and evaluates your digital footprint.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Download Your Report</h3>
            <p className="text-sm text-gray-500">
              Get a detailed PDF report with scores, insights, weak points, and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            What Your Report Includes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '&#128269;',
                title: 'Google Search Visibility',
                desc: 'What shows up when someone Googles your name? Positive, negative, or nothing at all?',
              },
              {
                icon: '&#128101;',
                title: 'Social Media Presence',
                desc: 'Platform-by-platform analysis of your LinkedIn, Twitter/X, and Instagram profiles.',
              },
              {
                icon: '&#11088;',
                title: 'Influencer Score',
                desc: 'Are you invisible, emerging, established, or a thought leader? Get your influence level.',
              },
              {
                icon: '&#128154;',
                title: 'Footprint Health',
                desc: 'Good vs bad digital footprints. What positive and concerning things exist about you online.',
              },
              {
                icon: '&#9888;',
                title: 'Weak Points',
                desc: 'Specific gaps in your digital presence ranked by severity: critical, moderate, and minor.',
              },
              {
                icon: '&#127919;',
                title: 'Actionable Recommendations',
                desc: '5-8 prioritized steps you can take today to improve your online presence.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div
                  className="text-2xl mb-3"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Is this tool really free?',
              a: 'Yes, 100% free. No credit card, no hidden fees. We generate revenue through advertising on the site.',
            },
            {
              q: 'How does the AI analyze my digital presence?',
              a: 'We search Google for your name and company, fetch metadata from your social media profiles, and use AI to analyze everything together into a comprehensive report.',
            },
            {
              q: 'Is my data safe?',
              a: 'We only use publicly available information to generate your report. Your email is stored securely and never shared with third parties.',
            },
            {
              q: 'How accurate is the report?',
              a: 'The report is based on real search data and social media metadata. The AI analysis provides insights and recommendations based on this data. It is a snapshot of your current digital presence.',
            },
            {
              q: 'Can I download my report?',
              a: 'Yes! Every report can be downloaded as a branded PDF document for free.',
            },
            {
              q: 'How many reports can I generate?',
              a: 'You can generate up to 5 reports per day. This limit helps us keep the service free for everyone.',
            },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Your Digital Presence?
          </h2>
          <p className="opacity-90 mb-8">
            Join thousands of professionals who have used our free tool to understand and improve their online footprint.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Get Your Free Report Now
          </Link>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Digital Presence Report',
            description:
              'Free AI-powered digital presence analysis tool. Get your digital footprint report in 60 seconds.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is this tool really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 100% free. No credit card, no hidden fees.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the AI analyze my digital presence?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We search Google for your name and company, fetch metadata from your social media profiles, and use AI to analyze everything together.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I download my report?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Every report can be downloaded as a branded PDF document for free.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
