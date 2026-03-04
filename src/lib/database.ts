import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'data.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    const schemaPath = path.join(__dirname, 'schema.sql');
    // In Next.js bundled environment, __dirname may not point to source.
    // Use process.cwd() based path as fallback.
    const schemaFile = fs.existsSync(schemaPath)
      ? schemaPath
      : path.join(process.cwd(), 'src', 'lib', 'schema.sql');

    if (fs.existsSync(schemaFile)) {
      const schema = fs.readFileSync(schemaFile, 'utf-8');
      db.exec(schema);
    }
  }
  return db;
}
