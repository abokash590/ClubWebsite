// @ts-ignore
import { DatabaseSync } from 'node:sqlite';
import path from 'path';

// Use /tmp in production (Vercel) since process.cwd() is read-only
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/club.db' 
  : path.join(process.cwd(), 'club.db');

declare global {
  var _sqliteDb: DatabaseSync | undefined;
  var _dbInitialized: boolean | undefined;
}

// Polyfill the transaction method to match better-sqlite3 API
function addTransactionSupport(db: DatabaseSync) {
  if (!('transaction' in db)) {
    (db as any).transaction = function <T>(fn: (...args: any[]) => T) {
      return function (...args: any[]): T {
        db.exec('BEGIN IMMEDIATE');
        try {
          const result = fn(...args);
          db.exec('COMMIT');
          return result;
        } catch (err) {
          db.exec('ROLLBACK');
          throw err;
        }
      };
    };
  }
  return db;
}

function _getDbInstance(): any {
  if (process.env.NODE_ENV === 'production') {
    if (!global._sqliteDb) {
      global._sqliteDb = new DatabaseSync(dbPath);
      global._sqliteDb.exec('PRAGMA foreign_keys = ON;');
      addTransactionSupport(global._sqliteDb);
    }
    return global._sqliteDb;
  } else {
    if (!global._sqliteDb) {
      global._sqliteDb = new DatabaseSync(dbPath);
      global._sqliteDb.exec('PRAGMA foreign_keys = ON;');
      addTransactionSupport(global._sqliteDb);
    }
    return global._sqliteDb;
  }
}

export function getDb(): any {
  const db = _getDbInstance();
  
  if (!global._dbInitialized) {
    initDbTables(db);
    global._dbInitialized = true;
  }
  
  return db;
}

export function initDb() {
  const db = _getDbInstance();
  initDbTables(db);
  global._dbInitialized = true;
}

function initDbTables(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      reason TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invite_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      used BOOLEAN DEFAULT 0,
      FOREIGN KEY(request_id) REFERENCES requests(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'member' CHECK(role IN ('member', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      event_date DATETIME NOT NULL,
      location TEXT,
      registration_deadline DATETIME,
      created_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS event_fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      label TEXT NOT NULL,
      field_type TEXT NOT NULL CHECK(field_type IN ('short_text', 'paragraph', 'number', 'single_choice', 'multiple_choice', 'dropdown')),
      options TEXT, -- JSON string array
      is_required BOOLEAN DEFAULT 1,
      field_order INTEGER NOT NULL,
      FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS event_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id),
      UNIQUE(event_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS event_field_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id INTEGER NOT NULL,
      field_id INTEGER NOT NULL,
      answer_value TEXT,
      FOREIGN KEY(registration_id) REFERENCES event_registrations(id) ON DELETE CASCADE,
      FOREIGN KEY(field_id) REFERENCES event_fields(id)
    );
  `);
}
