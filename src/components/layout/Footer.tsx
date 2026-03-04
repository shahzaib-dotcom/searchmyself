import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">DP</span>
              </div>
              <span className="font-semibold text-gray-900">Digital Presence Report</span>
            </div>
            <p className="text-sm text-gray-500">
              Free AI-powered digital presence analysis. Discover what the internet says about you.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tool</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/generate" className="hover:text-gray-900 transition-colors">
                  Get Your Free Report
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/blog/what-is-digital-presence" className="hover:text-gray-900 transition-colors">
                  What is Digital Presence?
                </Link>
              </li>
              <li>
                <Link href="/blog/improve-online-presence" className="hover:text-gray-900 transition-colors">
                  How to Improve Online Presence
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Digital Presence Report. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
