import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DP</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">
            Digital Presence Report
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/generate"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Get Free Report
          </Link>
        </nav>
      </div>
    </header>
  );
}
