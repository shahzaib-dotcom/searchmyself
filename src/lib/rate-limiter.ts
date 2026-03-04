import { getDb } from './database';
import { DAILY_PER_IP_LIMIT, DAILY_GLOBAL_LIMIT } from './constants';

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  remainingToday?: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function checkRateLimit(ipAddress: string): RateLimitResult {
  const db = getDb();
  const today = getToday();

  const ipRow = db
    .prepare('SELECT request_count FROM rate_limits WHERE ip_address = ? AND date = ?')
    .get(ipAddress, today) as { request_count: number } | undefined;

  const ipCount = ipRow?.request_count ?? 0;
  if (ipCount >= DAILY_PER_IP_LIMIT) {
    return { allowed: false, reason: 'You have reached your daily limit. Please try again tomorrow.' };
  }

  const globalRow = db
    .prepare('SELECT total_reports FROM global_usage WHERE date = ?')
    .get(today) as { total_reports: number } | undefined;

  const globalCount = globalRow?.total_reports ?? 0;
  if (globalCount >= DAILY_GLOBAL_LIMIT) {
    return { allowed: false, reason: 'Our service is at capacity today. Please try again tomorrow.' };
  }

  return { allowed: true, remainingToday: DAILY_PER_IP_LIMIT - ipCount };
}

export function incrementRateLimit(ipAddress: string): void {
  const db = getDb();
  const today = getToday();

  db.prepare(`
    INSERT INTO rate_limits (ip_address, date, request_count)
    VALUES (?, ?, 1)
    ON CONFLICT(ip_address, date)
    DO UPDATE SET request_count = request_count + 1
  `).run(ipAddress, today);

  db.prepare(`
    INSERT INTO global_usage (date, total_reports, total_cse_queries, total_gemini_calls)
    VALUES (?, 1, 0, 0)
    ON CONFLICT(date)
    DO UPDATE SET total_reports = total_reports + 1
  `).run(today);
}

export function incrementCseQueries(count: number): void {
  const db = getDb();
  const today = getToday();

  db.prepare(`
    INSERT INTO global_usage (date, total_reports, total_cse_queries, total_gemini_calls)
    VALUES (?, 0, ?, 0)
    ON CONFLICT(date)
    DO UPDATE SET total_cse_queries = total_cse_queries + ?
  `).run(today, count, count);
}

export function incrementGeminiCalls(): void {
  const db = getDb();
  const today = getToday();

  db.prepare(`
    INSERT INTO global_usage (date, total_reports, total_cse_queries, total_gemini_calls)
    VALUES (?, 0, 0, 1)
    ON CONFLICT(date)
    DO UPDATE SET total_gemini_calls = total_gemini_calls + 1
  `).run(today);
}
