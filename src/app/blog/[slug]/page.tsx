import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: { heading: string; paragraphs: string[] }[];
}

const posts: Record<string, BlogPost> = {
  'what-is-digital-presence': {
    title: 'What is Digital Presence? A Complete Guide',
    description: 'Your digital presence is the sum of everything about you online. Learn what it includes, why it matters, and how to check yours.',
    date: 'March 1, 2026',
    readTime: '5 min read',
    content: [
      {
        heading: 'Understanding Your Digital Presence',
        paragraphs: [
          'Your digital presence is the collective footprint you leave across the internet. It includes your social media profiles, search engine results, mentions in articles, forum posts, images, and any other content tied to your name or identity online.',
          'In today\'s connected world, your digital presence often forms the first impression people have of you. Whether it\'s a potential employer, a client, or even a new acquaintance, people are likely to search your name online before meeting you in person.',
        ],
      },
      {
        heading: 'Key Components of Digital Presence',
        paragraphs: [
          'Search engine visibility is one of the most important aspects. When someone Googles your name, what comes up? Do they find your professional profiles, or is there nothing at all? Both extremes can be problematic.',
          'Social media profiles on platforms like LinkedIn, Twitter/X, and Instagram form another critical pillar. These platforms showcase your professional achievements, personal brand, and public interactions.',
          'Your digital footprint also includes content others create about you. News articles, blog mentions, reviews, and tagged photos all contribute to how you\'re perceived online.',
        ],
      },
      {
        heading: 'Why Digital Presence Matters',
        paragraphs: [
          'For professionals, a strong digital presence can open doors to job opportunities, speaking engagements, and collaborations. Recruiters regularly search candidates online, and a well-curated presence can set you apart.',
          'For businesses and entrepreneurs, digital presence directly impacts trust and credibility. Customers research companies before making purchasing decisions, and what they find online influences their choices.',
          'Even for personal life, being aware of your digital presence helps you protect your reputation and privacy. Understanding what information is publicly available allows you to take control of your online narrative.',
        ],
      },
      {
        heading: 'How to Check Your Digital Presence',
        paragraphs: [
          'Start by searching your full name on Google in an incognito browser window. Note what appears on the first page of results. This is what most people will see when they look you up.',
          'Review your social media profiles and check privacy settings. Look at what\'s visible to the public versus what\'s limited to connections only.',
          'You can also use our free Digital Presence Report tool to get an AI-powered analysis of your online visibility, influence score, and actionable recommendations for improvement.',
        ],
      },
    ],
  },
  'improve-online-presence': {
    title: 'How to Improve Your Online Presence in 2026',
    description: 'Practical steps to boost your online visibility, clean up your digital footprint, and build a stronger personal brand.',
    date: 'February 25, 2026',
    readTime: '7 min read',
    content: [
      {
        heading: 'Audit Your Current Online Presence',
        paragraphs: [
          'Before making improvements, you need to understand where you stand. Search your name online, review your social profiles, and identify any content that doesn\'t align with how you want to be perceived.',
          'Use our free Digital Presence Report tool to get a comprehensive analysis. It evaluates your search visibility, social media presence, influencer score, and digital footprint health, giving you a clear starting point.',
        ],
      },
      {
        heading: 'Optimize Your Social Media Profiles',
        paragraphs: [
          'Make sure your LinkedIn profile is complete with a professional photo, compelling headline, and detailed experience section. LinkedIn profiles rank highly in search results and are often the first thing people find.',
          'Keep your Twitter/X bio relevant and professional. Pin a tweet that showcases your best work or key message. Regular, thoughtful engagement helps build authority.',
          'On Instagram, maintain a consistent visual style and use your bio effectively. If you\'re building a professional brand, ensure your content aligns with your goals.',
        ],
      },
      {
        heading: 'Create Valuable Content',
        paragraphs: [
          'Publishing content is one of the fastest ways to boost your digital presence. Write articles on LinkedIn, start a blog, or share insights in your area of expertise on social media.',
          'Consistency matters more than volume. Posting one thoughtful piece per week will build your reputation faster than sporadic bursts of activity.',
          'Engage with others in your field by commenting on their posts, sharing their content with your perspective, and participating in relevant online communities.',
        ],
      },
      {
        heading: 'Manage Your Search Results',
        paragraphs: [
          'Creating profiles on high-authority platforms pushes them to the top of search results. Claim your name on LinkedIn, Twitter/X, GitHub, Medium, and any industry-specific platforms.',
          'If there\'s negative or outdated content about you, address it directly where possible. Contact website administrators for removal, or create enough positive content to push unwanted results down in search rankings.',
        ],
      },
      {
        heading: 'Protect Your Digital Footprint',
        paragraphs: [
          'Review privacy settings across all platforms regularly. Remove old accounts you no longer use, as they can become security risks.',
          'Be mindful of what you share publicly. Every post, comment, and photo becomes part of your permanent digital record. Think about how content might be perceived by different audiences.',
          'Set up Google Alerts for your name to monitor new mentions. This lets you stay on top of your online reputation and respond quickly to any issues.',
        ],
      },
      {
        heading: 'Track Your Progress',
        paragraphs: [
          'Improving your digital presence is an ongoing process. Regularly check your search results, monitor your social media growth, and use tools like our Digital Presence Report to track changes over time.',
          'Set specific goals such as reaching a certain number of LinkedIn connections, publishing a set number of articles, or improving your search visibility score. Measurable targets keep you motivated and accountable.',
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} | Digital Presence Report`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <Link href="/blog" className="text-blue-600 text-sm font-medium hover:underline mb-6 inline-block">
            &larr; Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {post.description}
          </p>

          <div className="prose prose-lg max-w-none">
            {post.content.map((section, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-gray-700 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Check Your Digital Presence Now
            </h3>
            <p className="text-gray-600 mb-4">
              Get a free, AI-powered report on your online visibility, influence score, and digital footprint health.
            </p>
            <Link
              href="/generate"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
            >
              Get Your Free Report
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
