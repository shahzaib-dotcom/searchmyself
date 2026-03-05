import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Learn how to improve your digital presence, build your online reputation, and understand what the internet says about you.',
};

const posts = [
  {
    slug: 'what-is-digital-presence',
    title: 'What is Digital Presence? A Complete Guide',
    excerpt: 'Your digital presence is the sum of everything about you online. Learn what it includes, why it matters, and how to check yours.',
    date: 'March 1, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'improve-online-presence',
    title: 'How to Improve Your Online Presence in 2026',
    excerpt: 'Practical steps to boost your online visibility, clean up your digital footprint, and build a stronger personal brand.',
    date: 'February 25, 2026',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600 mb-12">
            Tips, guides, and insights on managing your digital presence.
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-blue-600 font-medium text-sm">
                    Read more &rarr;
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
