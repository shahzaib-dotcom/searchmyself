import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/database';
import { ReportView } from './ReportView';

export const metadata: Metadata = {
  title: 'Your Digital Presence Report',
  robots: { index: false, follow: false },
};

interface ReportRow {
  report_data: string;
  created_at: string;
}

interface SubmissionRow {
  name: string;
  company_name: string;
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const submission = db
    .prepare('SELECT name, company_name FROM submissions WHERE id = ?')
    .get(id) as SubmissionRow | undefined;

  if (!submission) notFound();

  const report = db
    .prepare('SELECT report_data, created_at FROM reports WHERE submission_id = ?')
    .get(id) as ReportRow | undefined;

  if (!report) notFound();

  const reportData = JSON.parse(report.report_data);

  const fullReport = {
    id,
    name: submission.name,
    companyName: submission.company_name,
    generatedAt: report.created_at,
    ...reportData,
  };

  return <ReportView report={fullReport} />;
}
