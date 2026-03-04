import { NextRequest, NextResponse } from 'next/server';
import { reportFormSchema } from '@/lib/validators';
import { checkRateLimit, incrementRateLimit, incrementGeminiCalls } from '@/lib/rate-limiter';
import { fetchUrlMetadata } from '@/lib/url-metadata';
import { generateReport } from '@/lib/gemini';
import { getDb } from '@/lib/database';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reportFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Check rate limits
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.reason }, { status: 429 });
    }

    // Create submission
    const id = crypto.randomUUID();
    const db = getDb();

    db.prepare(`
      INSERT INTO submissions (id, name, company_name, email, linkedin_url, twitter_url, instagram_url, website_url, ip_address, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing')
    `).run(
      id,
      data.name,
      data.companyName || '',
      data.email,
      data.linkedinUrl || '',
      data.twitterUrl || '',
      data.instagramUrl || '',
      data.websiteUrl || '',
      ip
    );

    // Fetch metadata from provided social URLs in parallel
    const [linkedinMeta, twitterMeta, instagramMeta] = await Promise.all([
      fetchUrlMetadata(data.linkedinUrl || ''),
      fetchUrlMetadata(data.twitterUrl || ''),
      fetchUrlMetadata(data.instagramUrl || ''),
    ]);

    // Generate report via Gemini
    const reportData = await generateReport({
      name: data.name,
      companyName: data.companyName || '',
      linkedinUrl: data.linkedinUrl || '',
      twitterUrl: data.twitterUrl || '',
      instagramUrl: data.instagramUrl || '',
      websiteUrl: data.websiteUrl || '',
      linkedinMeta,
      twitterMeta,
      instagramMeta,
    });

    incrementGeminiCalls();

    // Store report
    const reportJson = reportData as Record<string, unknown>;
    const overallScore = typeof reportJson.overallScore === 'number' ? reportJson.overallScore : 0;

    db.prepare(`
      INSERT INTO reports (id, submission_id, overall_score, report_data, raw_search_results)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      id,
      id,
      overallScore,
      JSON.stringify(reportData),
      JSON.stringify({ note: 'Search API not used - analysis based on profile metadata and AI' })
    );

    // Update submission status
    db.prepare(`UPDATE submissions SET status = 'completed' WHERE id = ?`).run(id);

    // Increment rate limit
    incrementRateLimit(ip);

    return NextResponse.json({ reportId: id });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report. Please try again.' },
      { status: 500 }
    );
  }
}
