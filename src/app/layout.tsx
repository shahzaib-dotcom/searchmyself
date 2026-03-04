import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Free Digital Presence Report | Discover Your Online Footprint',
    template: '%s | Digital Presence Report',
  },
  description:
    'Get a free AI-powered analysis of your digital presence. Discover what the internet says about you, your influence level, and how to improve your online footprint.',
  keywords: [
    'digital presence report',
    'online presence checker',
    'digital footprint audit',
    'personal brand audit',
    'social media audit',
    'influencer score',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Digital Presence Report',
    title: 'Free Digital Presence Report - Discover Your Online Footprint',
    description:
      'AI-powered analysis of your digital presence. Get your free report in 60 seconds.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Presence Report',
    description: 'AI-powered digital presence audit tool',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
