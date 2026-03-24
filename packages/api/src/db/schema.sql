-- AI Earn D1 Database Schema

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id INTEGER UNIQUE NOT NULL,
  username TEXT,
  wallet_address TEXT,
  accuracy INTEGER DEFAULT 100,
  total_tasks INTEGER DEFAULT 0,
  total_earned REAL DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  multiplier REAL DEFAULT 1.0,
  last_active_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK(type IN ('image_classification', 'sentiment', 'comparison', 'text_moderation')),
  image_url TEXT,
  question TEXT NOT NULL,
  option_left TEXT NOT NULL,
  option_right TEXT NOT NULL,
  correct_answer TEXT,          -- NULL for consensus-based, 'left'/'right' for honeypots
  reward REAL NOT NULL DEFAULT 0.001,
  is_honeypot INTEGER DEFAULT 0,
  consensus_required INTEGER DEFAULT 3,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'expired')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES tasks(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  answer TEXT NOT NULL CHECK(answer IN ('left', 'right')),
  is_correct INTEGER,          -- NULL until consensus, 0/1 after
  reward_paid REAL DEFAULT 0,
  submitted_at TEXT DEFAULT (datetime('now')),
  UNIQUE(task_id, user_id)     -- one submission per user per task
);

CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  submission_id INTEGER REFERENCES submissions(id),
  amount REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('task', 'streak_bonus', 'daily_challenge', 'referral')),
  tx_hash TEXT,                -- TON transaction hash
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'sent', 'confirmed', 'failed')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  badge_type TEXT NOT NULL,
  earned_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, badge_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_submissions_task ON submissions(task_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_rewards_user ON rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
