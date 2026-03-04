CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company_name TEXT DEFAULT '',
  email TEXT NOT NULL,
  linkedin_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  ip_address TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES submissions(id),
  overall_score INTEGER DEFAULT 0,
  report_data TEXT DEFAULT '{}',
  raw_search_results TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rate_limits (
  ip_address TEXT NOT NULL,
  date TEXT NOT NULL,
  request_count INTEGER DEFAULT 0,
  PRIMARY KEY (ip_address, date)
);

CREATE TABLE IF NOT EXISTS global_usage (
  date TEXT PRIMARY KEY,
  total_reports INTEGER DEFAULT 0,
  total_cse_queries INTEGER DEFAULT 0,
  total_gemini_calls INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_date ON rate_limits(date);
