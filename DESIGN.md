# AI Earn - 設計書

**"タップして稼ぐ" → "判断して稼ぐ" — Notcoinの次世代型**

## 1. プロダクト概要

### ビジョン
Telegramユーザーが「AIデータラベリング」タスク（画像分類・感情分析など）をスワイプで処理し、TONマイクロペイメントで即座に報酬を得るプラットフォーム。

Notcoin（3,500万ユーザー）が証明した「タップで稼ぐ」文化を、「判断して稼ぐ（Judge-to-Earn）」に進化させる。ユーザーのタップに実際の経済価値（AI学習データ）を持たせることで、持続可能な報酬モデルを実現。

### なぜ勝てるか

| 審査軸 | AI Earn の強み |
|--------|---------------|
| Product Quality (25%) | Notcoin的UX + 実用価値。スワイプするだけ |
| Technical Execution (25%) | TON Pay SDK + Tact スマートコントラクト + CF Workers。フルオンチェーン報酬 |
| Ecosystem Value (25%) | TON上の消費者向けAIアプリはゼロ。この空白を埋める最初のプロダクト |
| User Potential (25%) | データラベリング市場 $79億→$281億。Notcoinが証明済みのTelegram採用パターン |

### 競合との差別化

| 比較対象 | 弱点 | AI Earn の優位性 |
|----------|------|-----------------|
| Notcoin/Hamster Kombat | タップに実際の価値なし（創設者自身が「持続しない」と発言） | タップが実際のAI学習データを生産。B2Bからの収益が裏付け |
| Toloka/MTurk | Web UI、支払い遅延（週次）、最低引出額あり | Telegram Mini App、TONで即時支払い、最低額なし |
| Scale AI | B2B専用、一般ユーザーアクセス不可 | 誰でもTelegramから参加。ゲーミフィケーション |

---

## 2. ユーザーフロー

### オンボーディング（30秒）

```
1. Telegramで @AIEarnBot を開く
2. /start → ウェルカムメッセージ + Mini App ボタン
3. Mini App 起動 → TON Connect でウォレット接続
4. チュートリアル（3タスクのデモ）→ 完了で 0.01 TON ボーナス
5. タスクフィード開始
```

### コアループ（Judge-to-Earn）

```
タスク表示 → ユーザーが判断（スワイプ/タップ） → 即時報酬表示
    ↓                                                ↓
次のタスク ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← 残高更新
```

### 報酬サイクル

```
ユーザーがタスク完了
    ↓
3人コンセンサス判定（バックエンドで非同期）
    ↓
正解 → 報酬確定 → TON Pay でウォレットに即時送金
不正解 → 精度スコア更新（報酬なし）
```

---

## 3. タスク設計

### Phase 1: ローンチ時のタスクタイプ

#### Type A: 画像分類（スワイプ式）
- **UI**: Tinderスワイプ。左=A、右=B
- **例**: 「この画像に猫がいる？」→ 左(No) / 右(Yes)
- **完了時間**: 3-8秒
- **報酬**: 0.001 TON (~$0.005)
- **1時間あたり**: 720タスク = 0.72 TON (~$3.6)

#### Type B: 感情分析（3ボタン）
- **UI**: テキスト表示 + 3ボタン（Positive / Neutral / Negative）
- **例**: 「"This product is amazing!" → ポジティブ/ニュートラル/ネガティブ」
- **完了時間**: 5-15秒
- **報酬**: 0.002 TON (~$0.01)
- **1時間あたり**: 360タスク = 0.72 TON (~$3.6)

#### Type C: 比較評価（A/B選択）
- **UI**: 2つのAI生成テキスト/画像を並べて「どちらが良い？」
- **例**: 2つの翻訳結果を比較「どちらが自然？」
- **完了時間**: 10-20秒
- **報酬**: 0.003 TON (~$0.015)
- **1時間あたり**: 240タスク = 0.72 TON (~$3.6)

### 品質管理

| メカニズム | 実装 |
|-----------|------|
| ハニーポット | 全タスクの10%に正解既知の問題を混入。ユーザーには区別不可 |
| 3人コンセンサス | 同一タスクを3人が独立回答。多数決で正解決定 |
| 精度スコア | ハニーポット正答率 + コンセンサス一致率から算出（0-100） |
| スピードチェック | 異常に速い回答（<1秒）はボット判定。報酬なし |
| レベルゲート | 精度80%以上で中級タスク解放。90%以上で高報酬タスク解放 |

### タスク難易度ティア

| ティア | 解放条件 | 報酬倍率 | タスク例 |
|--------|---------|---------|---------|
| Beginner | 誰でも | 1x | 猫/犬分類、感情分析 |
| Intermediate | 精度80%+ & 100タスク完了 | 2x | 商品カテゴリ分類、多クラス分類 |
| Expert | 精度90%+ & 500タスク完了 | 3x | AI出力比較、専門ドメイン |

---

## 4. ゲーミフィケーション

### Notcoin/Hamster Kombat から学んだ7つの仕組み

| 仕組み | AI Earn での実装 |
|--------|-----------------|
| **デイリーストリーク** | 連続ログイン日数で報酬倍率UP（1日目1x→7日目2x→30日目3x）。途切れるとリセット |
| **デイリーチャレンジ** | 毎日変わるミッション。「画像分類50個」「精度95%以上で10タスク」等 |
| **スクワッド制** | Telegramグループがチーム。チーム精度ランキングで週次ボーナス |
| **紹介ボーナス** | 招待者: 0.1 TON、被招待者: 0.05 TON（チュートリアル完了時） |
| **レベルシステム** | 経験値（XP）で昇格。高レベル→高報酬タスク解放 |
| **リーダーボード** | 日次/週次/全期間。個人+スクワッド。上位者にボーナス報酬 |
| **実績バッジ** | 「1000タスク」「精度95%」「7日連続」等。NFTバッジ化（将来） |

### リテンション設計

```
新規ユーザー → チュートリアル完了（0.01 TON即時受取）
    ↓
Day 1: デイリーチャレンジ提示
Day 2-3: ストリークボーナス開始通知
Day 7: スクワッド招待促進
Day 14: Intermediateティア解放通知
Day 30: 月間リーダーボード報酬
```

---

## 5. システムアーキテクチャ

```
┌─────────────────────────────────────────────────────┐
│                    Telegram                          │
│  ┌──────────────┐  ┌────────────────────────────┐   │
│  │  @AIEarnBot  │  │  AI Earn Mini App (React)  │   │
│  │  (grammY)    │  │  CF Pages                  │   │
│  └──────┬───────┘  └──────────┬─────────────────┘   │
└─────────┼──────────────────────┼────────────────────┘
          │ webhook              │ API calls
          ▼                      ▼
┌─────────────────────────────────────────────────────┐
│  Backend API (Hono on CF Workers)                    │
│                                                      │
│  /api/tasks     - タスク取得・回答送信               │
│  /api/users     - ユーザー情報・精度スコア           │
│  /api/rewards   - 報酬履歴・引出し                   │
│  /api/squads    - スクワッド管理                     │
│  /api/admin     - タスク投入（B2B API）              │
│  /bot/webhook   - Telegram Bot webhook               │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  CF D1   │  │  CF KV   │  │  TON Integration  │  │
│  │ (SQLite) │  │ (Cache)  │  │  (ton-core)       │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  TON Blockchain (testnet)                            │
│                                                      │
│  ┌────────────────────────────────┐                  │
│  │  RewardPool.tact               │                  │
│  │  - deposit (B2B → コントラクト) │                  │
│  │  - distribute (→ ユーザー)      │                  │
│  │  - getBalance                   │                  │
│  │  - getStats                     │                  │
│  └────────────────────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

### 技術スタック

| レイヤー | 技術 | 理由 |
|---------|------|------|
| Bot | grammY + Hono on CF Workers | TON公式推奨。エッジ実行 |
| Mini App | React + Vite + @tma.js/sdk | 公式テンプレート。CF Pages |
| Backend API | Hono on CF Workers | 同一Workerでbot+APIを処理 |
| Database | CF D1 (SQLite) | エッジSQL。無料枠で十分 |
| Cache | CF KV | セッション、タスクキャッシュ |
| Smart Contract | Tact + Blueprint | TypeScript風。テスト容易 |
| Wallet連携 | TON Connect (@tonconnect/ui-react) | 必須。30+ウォレット対応 |
| 支払い | TON Pay SDK | 手数料<$0.01。2026年2月リリース |
| Deploy | CF Workers + CF Pages | 無料枠。グローバルエッジ |
| Test | Vitest | 高速。TypeScript native |

---

## 6. スマートコントラクト設計

### RewardPool.tact

```tact
import "@stdlib/deploy";
import "@stdlib/ownable";

// Messages
message Deposit {
    taskBatchId: Int as uint64;
}

message DistributeReward {
    worker: Address;
    amount: Int as coins;
    taskId: Int as uint64;
}

message WithdrawUnused {
    amount: Int as coins;
}

// Contract
contract RewardPool with Deployable, Ownable {
    owner: Address;          // Backend operator
    totalDeposited: Int as coins = 0;
    totalDistributed: Int as coins = 0;
    totalTasks: Int as uint64 = 0;

    init(owner: Address) {
        self.owner = owner;
    }

    // B2B client deposits TON for task batch
    receive(msg: Deposit) {
        let amount = context().value - ton("0.05"); // Reserve for gas
        require(amount > 0, "Insufficient deposit");
        self.totalDeposited += amount;
        emit(beginCell()
            .storeUint(1, 8)  // event: deposit
            .storeUint(msg.taskBatchId, 64)
            .storeCoins(amount)
            .endCell()
            .asSlice()
            .asString()
        );
    }

    // Owner distributes reward to worker (called by backend after consensus)
    receive(msg: DistributeReward) {
        self.requireOwner();
        require(msg.amount > 0, "Zero amount");
        require(myBalance() > msg.amount + ton("0.1"), "Insufficient balance");

        self.totalDistributed += msg.amount;
        self.totalTasks += 1;

        send(SendParameters{
            to: msg.worker,
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: beginCell()
                .storeUint(0, 32)
                .storeSlice("AI Earn reward".asSlice())
                .endCell(),
        });
    }

    // Withdraw unused funds (refund to B2B client)
    receive(msg: WithdrawUnused) {
        self.requireOwner();
        require(myBalance() > msg.amount + ton("0.1"), "Insufficient balance");
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendIgnoreErrors,
        });
    }

    // Plain TON transfer (treat as deposit)
    receive() {
        self.totalDeposited += context().value;
    }

    // Getters
    get fun balance(): Int {
        return myBalance();
    }

    get fun stats(): StatsResponse {
        return StatsResponse{
            totalDeposited: self.totalDeposited,
            totalDistributed: self.totalDistributed,
            totalTasks: self.totalTasks,
            balance: myBalance(),
        };
    }
}

struct StatsResponse {
    totalDeposited: Int as coins;
    totalDistributed: Int as coins;
    totalTasks: Int as uint64;
    balance: Int as coins;
}
```

### オンチェーンで記録する理由

1. **透明性**: 全報酬配布がオンチェーンで検証可能
2. **信頼**: ユーザーが「本当に支払われるか」を自分で確認できる
3. **エコシステム価値**: TON上のトランザクション数増加 = TON Foundationが喜ぶ
4. **ハッカソン審査**: 「深いTONインテグレーション」が審査基準

---

## 7. データベーススキーマ (CF D1)

```sql
-- Users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id INTEGER UNIQUE NOT NULL,
    wallet_address TEXT,
    username TEXT,
    accuracy_score REAL DEFAULT 0.0,
    total_tasks INTEGER DEFAULT 0,
    total_earned INTEGER DEFAULT 0,  -- in nanotons
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_active_date TEXT,
    referred_by INTEGER REFERENCES users(telegram_id),
    created_at TEXT DEFAULT (datetime('now'))
);

-- Tasks (submitted by B2B clients)
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    type TEXT NOT NULL,           -- 'image_classify', 'sentiment', 'comparison'
    difficulty TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'expert'
    content_url TEXT NOT NULL,    -- image URL or text content
    options TEXT NOT NULL,        -- JSON array of choices
    gold_answer TEXT,             -- null if not honeypot, correct answer if honeypot
    reward_nanotons INTEGER NOT NULL,
    consensus_count INTEGER DEFAULT 3,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'expired'
    created_at TEXT DEFAULT (datetime('now'))
);

-- Submissions (user answers)
CREATE TABLE submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL REFERENCES tasks(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    answer TEXT NOT NULL,
    is_correct INTEGER,          -- null until consensus, 1/0 after
    time_spent_ms INTEGER,
    reward_paid INTEGER DEFAULT 0, -- in nanotons
    tx_hash TEXT,                -- on-chain transaction hash
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(task_id, user_id)
);

-- Squads
CREATE TABLE squads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_group_id INTEGER UNIQUE,
    name TEXT NOT NULL,
    total_tasks INTEGER DEFAULT 0,
    avg_accuracy REAL DEFAULT 0.0,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Squad members
CREATE TABLE squad_members (
    squad_id INTEGER REFERENCES squads(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (squad_id, user_id)
);

-- Daily challenges
CREATE TABLE daily_challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    target_type TEXT NOT NULL,    -- 'task_count', 'accuracy', 'streak'
    target_value INTEGER NOT NULL,
    bonus_nanotons INTEGER NOT NULL
);

-- User challenge progress
CREATE TABLE user_challenges (
    user_id INTEGER REFERENCES users(id),
    challenge_id INTEGER REFERENCES daily_challenges(id),
    progress INTEGER DEFAULT 0,
    completed INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, challenge_id)
);

-- Indexes
CREATE INDEX idx_tasks_status ON tasks(status, difficulty);
CREATE INDEX idx_submissions_task ON submissions(task_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_users_telegram ON users(telegram_id);
CREATE INDEX idx_users_level ON users(level, accuracy_score);
```

---

## 8. Mini App 画面設計

### 画面一覧

```
[1] タスクフィード（メイン画面）
[2] 収益ダッシュボード
[3] リーダーボード
[4] プロフィール・設定
[5] スクワッド
```

### [1] タスクフィード（メイン画面）

```
┌────────────────────────────┐
│  AI Earn          0.42 TON │  ← 残高表示
├────────────────────────────┤
│                            │
│  ┌──────────────────────┐  │
│  │                      │  │
│  │    [画像表示エリア]    │  │
│  │                      │  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
│  この画像に猫がいますか？    │
│                            │
│  ← NO          YES →      │  ← スワイプ or ボタン
│                            │
├────────────────────────────┤
│  精度: 94%   今日: 47件     │
│  ストリーク: 5日 (1.5x)    │
│  +0.001 TON ✓              │  ← 直前タスクの報酬表示
├────────────────────────────┤
│  [Tasks] [Earn] [Rank] [Me]│
└────────────────────────────┘
```

### [2] 収益ダッシュボード

```
┌────────────────────────────┐
│  Earnings                   │
├────────────────────────────┤
│                            │
│  Total Earned              │
│  ┌────────────────────┐    │
│  │    4.28 TON        │    │
│  │    ~$21.40         │    │
│  └────────────────────┘    │
│                            │
│  Today        +0.42 TON   │
│  This Week    +2.18 TON   │
│  This Month   +4.28 TON   │
│                            │
│  ──────────────────────    │
│  Recent Rewards            │
│  0.003 TON  比較評価  2m前  │
│  0.001 TON  画像分類  5m前  │
│  0.002 TON  感情分析  8m前  │
│                            │
│  [Withdraw to Wallet]      │  ← TON Connect で即送金
├────────────────────────────┤
│  [Tasks] [Earn] [Rank] [Me]│
└────────────────────────────┘
```

### [3] リーダーボード

```
┌────────────────────────────┐
│  Leaderboard    [日][週][全]│
├────────────────────────────┤
│  [Individual] [Squads]     │
│                            │
│  1. @alice    2.4 TON  98% │
│  2. @bob      2.1 TON  96% │
│  3. @carol    1.8 TON  95% │
│  4. @dave     1.5 TON  93% │
│  5. @eve      1.2 TON  92% │
│  ...                       │
│  42. You      0.4 TON  94% │  ← 自分の順位ハイライト
│                            │
│  Weekly Top 10 Bonus:      │
│  1st: 1.0 TON              │
│  2-3: 0.5 TON              │
│  4-10: 0.1 TON             │
├────────────────────────────┤
│  [Tasks] [Earn] [Rank] [Me]│
└────────────────────────────┘
```

### [4] プロフィール

```
┌────────────────────────────┐
│  Profile                    │
├────────────────────────────┤
│  @username          Lv.12  │
│  Accuracy: 94%             │
│  Total Tasks: 1,247        │
│                            │
│  Badges:                   │
│  [1K Tasks] [7-Day Streak] │
│  [95% Club] [Top 100]     │
│                            │
│  Daily Challenge:          │
│  ┌──────────────────────┐  │
│  │ 画像分類50個完了      │  │
│  │ [████████░░] 38/50   │  │
│  │ Bonus: 0.05 TON      │  │
│  └──────────────────────┘  │
│                            │
│  Streak: 5 days (1.5x)    │
│  [Invite Friends +0.1 TON]│
│                            │
│  Wallet: EQD...xyz        │
│  [Disconnect Wallet]      │
├────────────────────────────┤
│  [Tasks] [Earn] [Rank] [Me]│
└────────────────────────────┘
```

---

## 9. Bot コマンド設計

```
/start          - ウェルカム + Mini App ボタン
/earn           - Mini App を直接開く（タスクフィード）
/balance        - 残高表示
/stats          - 統計（タスク数、精度、ストリーク）
/withdraw       - 報酬引出し（ウォレットに送金）
/referral       - 紹介リンク生成
/squad          - スクワッド情報
/help           - ヘルプ
```

### Bot 通知

```
- タスク報酬確定時: "✅ +0.001 TON earned! Balance: 0.42 TON"
- デイリーチャレンジ達成: "🎯 Daily challenge complete! +0.05 TON bonus"
- ストリークリマインダー(20:00): "Don't break your 5-day streak! Complete 1 task to keep it"
- 新しいティア解放: "🔓 Level Up! Intermediate tasks now available (2x rewards)"
- リーダーボード入賞: "🏆 You're #8 this week! Top 10 bonus incoming"
```

---

## 10. API 設計

### Public API (Mini App → Backend)

```
GET  /api/tasks/next?type=image_classify&count=10
     → { tasks: [{ id, type, contentUrl, options, reward }] }

POST /api/tasks/:id/submit
     body: { answer, timeSpentMs }
     → { correct: true|null, reward: 1000000, balance: 420000000 }

GET  /api/user/me
     → { telegramId, walletAddress, accuracy, level, xp, streak, totalEarned }

GET  /api/user/earnings?period=daily|weekly|monthly
     → { total, breakdown: [{ date, amount, tasks }] }

GET  /api/leaderboard?scope=daily|weekly|all&type=individual|squad&limit=50
     → { entries: [{ rank, username, earned, accuracy }], myRank }

POST /api/user/withdraw
     → { txHash, amount }

GET  /api/challenges/today
     → { challenges: [{ id, description, target, progress, bonus }] }

POST /api/squads/join
     body: { telegramGroupId }
     → { squad: { id, name, members, rank } }

GET  /api/referral/link
     → { link: "https://t.me/AIEarnBot?start=ref_12345" }
```

### Admin API (B2B → Backend)

```
POST /api/admin/tasks/batch
     header: X-API-Key: <b2b_api_key>
     body: {
         type: "image_classify",
         items: [{ contentUrl, options }],
         rewardPerTask: 1000000, // nanotons
         consensusCount: 3,
         honeypotRatio: 0.1,
         honeypots: [{ contentUrl, options, correctAnswer }]
     }
     → { batchId, taskCount, totalCost, depositAddress }
```

---

## 11. ユニットエコノミクス

### タスク単価

| タスクタイプ | B2B支払い | ユーザー報酬 | プラットフォーム取り分 |
|-------------|----------|------------|-------------------|
| 画像分類 | $0.03/タスク | $0.005 (0.001 TON) | $0.025 (83%) |
| 感情分析 | $0.05/タスク | $0.01 (0.002 TON) | $0.04 (80%) |
| 比較評価 | $0.08/タスク | $0.015 (0.003 TON) | $0.065 (81%) |

※ 3人コンセンサスのため、1タスクの実コスト = ユーザー報酬 x 3

### ユーザー視点の時給

| ペース | タスク数/時 | 時給 (TON) | 時給 (USD) |
|-------|-----------|-----------|-----------|
| カジュアル (画像分類のみ) | 360 | 0.36 | $1.80 |
| アクティブ (ミックス) | 300 | 0.50 | $2.50 |
| パワーユーザー (高ティア) | 240 | 0.72 | $3.60 |

※ 新興国（東南アジア、アフリカ）では十分な動機付け。先進国ではゲーム的楽しさが主動機。

### ハッカソンデモ用

デモでは実際のB2Bクライアントは不要。プラットフォームが自前でタスクを投入する:
- **CIFAR-10**: 60,000枚の画像（飛行機、車、猫、犬等）→ 無料データセット
- **IMDb Reviews**: 50,000件の映画レビュー → 感情分析タスク
- **デモ報酬**: テストネットTON（無料取得可能）

---

## 12. プロジェクト構造

```
ai-earn/
├── packages/
│   ├── bot/                    # Telegram Bot (grammY)
│   │   ├── src/
│   │   │   ├── index.ts        # Worker entry + bot setup
│   │   │   ├── commands/       # /start, /earn, /balance, etc.
│   │   │   └── notifications.ts
│   │   ├── wrangler.toml
│   │   └── package.json
│   │
│   ├── api/                    # Backend API (Hono)
│   │   ├── src/
│   │   │   ├── index.ts        # Hono app entry
│   │   │   ├── routes/
│   │   │   │   ├── tasks.ts    # Task CRUD + submission
│   │   │   │   ├── users.ts    # User profile + stats
│   │   │   │   ├── rewards.ts  # Earnings + withdrawal
│   │   │   │   ├── squads.ts   # Squad management
│   │   │   │   └── admin.ts    # B2B task submission
│   │   │   ├── services/
│   │   │   │   ├── consensus.ts    # 3-worker consensus logic
│   │   │   │   ├── quality.ts      # Accuracy scoring
│   │   │   │   ├── ton-pay.ts      # TON payment integration
│   │   │   │   └── gamification.ts # XP, levels, streaks
│   │   │   ├── db/
│   │   │   │   ├── schema.sql
│   │   │   │   └── queries.ts
│   │   │   └── middleware/
│   │   │       └── auth.ts     # TMA initData validation
│   │   ├── wrangler.toml
│   │   └── package.json
│   │
│   ├── mini-app/               # React Mini App
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── pages/
│   │   │   │   ├── TaskFeed.tsx    # Main swipe UI
│   │   │   │   ├── Earnings.tsx    # Revenue dashboard
│   │   │   │   ├── Leaderboard.tsx
│   │   │   │   └── Profile.tsx
│   │   │   ├── components/
│   │   │   │   ├── SwipeCard.tsx   # Tinder-style task card
│   │   │   │   ├── TaskButton.tsx  # Multi-choice buttons
│   │   │   │   ├── RewardPopup.tsx # "+0.001 TON" animation
│   │   │   │   └── StreakBadge.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useTasks.ts
│   │   │   │   ├── useUser.ts
│   │   │   │   └── useTonConnect.ts
│   │   │   └── lib/
│   │   │       ├── api.ts          # Backend API client
│   │   │       └── tma.ts          # TMA SDK init
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── contracts/              # Tact Smart Contracts
│       ├── contracts/
│       │   └── RewardPool.tact
│       ├── tests/
│       │   └── RewardPool.spec.ts
│       ├── scripts/
│       │   └── deploy.ts
│       └── package.json
│
├── assets/                     # Hackathon submission assets
│   ├── banner.svg
│   ├── thumbnail.png
│   └── architecture.svg
│
├── demo-data/                  # Demo dataset for hackathon
│   ├── seed-tasks.ts           # CIFAR-10 + IMDb seeder
│   └── README.md
│
├── turbo.json
├── package.json
└── README.md
```

---

## 13. 開発計画

### ハッカソン提出に必要な最小成果物

| 優先度 | コンポーネント | 内容 | 工数目安 |
|--------|--------------|------|---------|
| P0 | Smart Contract | RewardPool.tact + テスト + テストネットデプロイ | 2h |
| P0 | Backend API | タスク取得・回答送信・コンセンサス・報酬 | 3h |
| P0 | Mini App | タスクフィード（スワイプUI）+ 残高表示 | 3h |
| P0 | Bot | /start + Mini Appボタン + 報酬通知 | 1h |
| P0 | Demo Data | CIFAR-10シーダー + テストネットTON | 1h |
| P1 | ゲーミフィケーション | ストリーク + デイリーチャレンジ + レベル | 2h |
| P1 | リーダーボード | 日次/週次ランキング | 1h |
| P1 | 提出物 | README + Banner + Architecture図 + Demo動画 | 2h |
| P2 | スクワッド | チーム機能 | 2h |
| P2 | B2B Admin API | 外部からのタスク投入 | 1h |

**P0合計: ~10時間** — ハッカソン提出の最低ライン
**P0+P1合計: ~15時間** — 競争力のある提出

### 実装順序

```
1. Smart Contract (Tact)
   └→ RewardPool.tact → テスト → testnet deploy

2. Backend API (Hono + D1)
   └→ DB schema → tasks API → submissions → consensus → rewards

3. Mini App (React + Vite)
   └→ TMA init → TON Connect → SwipeCard → TaskFeed → Earnings

4. Bot (grammY)
   └→ /start → webhook → notifications

5. Integration
   └→ Mini App ↔ API ↔ Contract ↔ TON Connect

6. Demo Data + Polish
   └→ CIFAR-10 seed → demo flow → submission materials
```

---

## 14. デモシナリオ（審査員向け）

### 30秒デモ

```
1. Telegramで @AIEarnBot を開く（3秒）
2. "Start Earning" ボタンをタップ → Mini App起動（2秒）
3. TON Connect でウォレット接続（5秒）
4. チュートリアルタスク3問をスワイプで完了（10秒）
5. "+0.01 TON" のアニメーション表示（2秒）
6. 収益ダッシュボードで残高確認（3秒）
7. TON Explorer でオンチェーンの報酬トランザクションを表示（5秒）
```

### 審査員へのキーメッセージ

> "Notcoinは3,500万人に『タップして稼ぐ』を教えました。
> AI Earnは同じ体験を『判断して稼ぐ』に進化させます。
>
> ユーザーが画像をスワイプするたびに、AIが賢くなり、
> TONが即座にウォレットに届きます。
>
> データラベリング市場は$79億。2030年には$281億になります。
> そしてTON上にはまだ、消費者向けAIアプリが1つもありません。
>
> AI Earnがその最初の1つです。"

---

## 15. 提出情報

### Track 2: User-Facing AI Agents ($10,000)

- **プロジェクト名**: AI Earn
- **タグライン**: Judge-to-Earn: Swipe to train AI, earn TON instantly
- **GitHub**: https://github.com/Arusasaki/ai-earn (予定)
- **Live Demo**: Telegram @AIEarnBot (テストネット)
- **サムネイル**: 1280x640 (or 2560x1280)

### Description (提出用)

AI Earn transforms every Telegram user into an AI trainer. Users complete simple data labeling tasks — swipe right if the image contains a cat, tap "positive" for sentiment analysis — and earn TON micropayments instantly.

Built on the cultural foundation of Notcoin (35M users), AI Earn evolves "tap-to-earn" into "judge-to-earn" where every swipe has real economic value: training data for AI companies willing to pay.

**Why TON?** The $7.9B data labeling market needs micropayments. TON's sub-cent fees and Telegram's 1B+ users make instant per-task payments possible for the first time. No other chain can deliver $0.005 payments within a chat app used by billions.

**What we built:**
- Tinder-style swipe UI for data labeling tasks in Telegram Mini App
- Tact smart contract (RewardPool) for transparent on-chain reward distribution
- 3-worker consensus + honeypot quality control for data accuracy
- Gamification: streaks, levels, daily challenges, squads, leaderboards
- Instant TON payments via TON Pay SDK (zero commission)
- Demo with real CIFAR-10 image dataset on testnet
