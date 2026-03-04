import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();

  const totalReports = db.prepare('SELECT COUNT(*) as count FROM reports').get() as { count: number };
  const totalUsers = db.prepare('SELECT COUNT(DISTINCT email) as count FROM submissions').get() as { count: number };

  const today = new Date().toISOString().split('T')[0];
  const todayUsage = db.prepare('SELECT * FROM global_usage WHERE date = ?').get(today) as Record<string, unknown> | undefined;

  const recentReports = db
    .prepare(`
      SELECT s.name, s.company_name, s.email, r.overall_score, r.created_at
      FROM reports r
      JOIN submissions s ON s.id = r.submission_id
      ORDER BY r.created_at DESC
      LIMIT 20
    `)
    .all();

  const dailyStats = db
    .prepare(`
      SELECT date, total_reports, total_cse_queries, total_gemini_calls
      FROM global_usage
      ORDER BY date DESC
      LIMIT 30
    `)
    .all();

  return NextResponse.json({
    totalReports: totalReports.count,
    totalUsers: totalUsers.count,
    today: {
      reports: todayUsage?.total_reports ?? 0,
      cseQueries: todayUsage?.total_cse_queries ?? 0,
      geminiCalls: todayUsage?.total_gemini_calls ?? 0,
    },
    recentReports,
    dailyStats,
  });
}
