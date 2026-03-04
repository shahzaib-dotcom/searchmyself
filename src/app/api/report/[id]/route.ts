import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const db = getDb();

  const submission = db
    .prepare('SELECT * FROM submissions WHERE id = ?')
    .get(id) as Record<string, unknown> | undefined;

  if (!submission) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  const report = db
    .prepare('SELECT * FROM reports WHERE submission_id = ?')
    .get(id) as Record<string, unknown> | undefined;

  if (!report) {
    return NextResponse.json({ error: 'Report not ready yet' }, { status: 202 });
  }

  const reportData = JSON.parse(report.report_data as string);

  return NextResponse.json({
    id,
    name: submission.name,
    companyName: submission.company_name,
    generatedAt: report.created_at,
    ...reportData,
  });
}
