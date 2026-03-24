import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
  SESSIONS: KVNamespace;
  TON_MNEMONIC: string;
  BOT_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "ai-earn-api" }));

// Auth: validate Telegram WebApp initData
app.post("/auth/telegram", async (c) => {
  const { initData } = await c.req.json();
  // TODO: HMAC-SHA256 validation with bot token
  return c.json({ token: "session_token", user: { id: 1 } });
});

// Tasks: get next batch for labeling
app.get("/tasks", async (c) => {
  // TODO: fetch from D1, exclude already-submitted by user
  return c.json({
    tasks: [
      {
        id: 1,
        type: "image_classification",
        imageUrl: "https://picsum.photos/400/300?random=1",
        question: "Is there a cat in this image?",
        optionLeft: "NO",
        optionRight: "YES",
        reward: 0.001,
      },
    ],
  });
});

// Submissions: record user's answer
app.post("/tasks/:id/submit", async (c) => {
  const taskId = c.req.param("id");
  const { answer, userId } = await c.req.json();
  // TODO: record submission, check consensus (3-worker agreement)
  // TODO: if consensus reached, trigger reward via RewardPool contract
  return c.json({ accepted: true, reward: 0.001, consensus: null });
});

// Earnings: user's earning history
app.get("/earnings/:userId", async (c) => {
  const userId = c.req.param("userId");
  // TODO: query D1 for user earnings
  return c.json({
    total: 4.28,
    today: 0.42,
    history: [],
  });
});

// Leaderboard
app.get("/leaderboard", async (c) => {
  // TODO: query D1 for top earners
  return c.json({ period: "weekly", rankings: [] });
});

// Withdraw: initiate TON withdrawal
app.post("/withdraw", async (c) => {
  const { userId, amount, walletAddress } = await c.req.json();
  // TODO: verify balance, call RewardPool.claimReward
  return c.json({ txHash: null, status: "pending" });
});

export default app;
