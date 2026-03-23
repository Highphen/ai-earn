import { useState } from "react";
import { motion } from "framer-motion";
import { DEMO_LEADERBOARD } from "../lib/mock-data";

type Period = "daily" | "weekly" | "all";

const periodLabels: Record<Period, string> = {
  daily: "Today",
  weekly: "Week",
  all: "All Time",
};

export function Leaderboard() {
  const [period, setPeriod] = useState<Period>("weekly");

  const myRank = 42;
  const myData = { username: "you", earned: 0.42, accuracy: 94 };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-text-primary">Leaderboard</h1>

        {/* Period toggle */}
        <div className="flex bg-bg-secondary rounded-lg p-0.5 border border-border">
          {(Object.keys(periodLabels) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`relative px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                period === p
                  ? "text-accent-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {period === p && (
                <motion.div
                  layoutId="period-bg"
                  className="absolute inset-0 bg-accent-dim rounded-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{periodLabels[p]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="flex justify-center items-end gap-3 px-6 py-4">
        {/* 2nd place */}
        <PodiumCard
          rank={2}
          username={DEMO_LEADERBOARD[1].username}
          earned={DEMO_LEADERBOARD[1].earned}
          height="h-20"
        />
        {/* 1st place */}
        <PodiumCard
          rank={1}
          username={DEMO_LEADERBOARD[0].username}
          earned={DEMO_LEADERBOARD[0].earned}
          height="h-28"
          highlight
        />
        {/* 3rd place */}
        <PodiumCard
          rank={3}
          username={DEMO_LEADERBOARD[2].username}
          earned={DEMO_LEADERBOARD[2].earned}
          height="h-16"
        />
      </div>

      {/* Ranking list */}
      <div className="px-4 pb-2">
        {DEMO_LEADERBOARD.slice(3).map((entry, i) => (
          <motion.div
            key={entry.rank}
            className="flex items-center gap-3 py-3 border-b border-border/50"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
          >
            <span className="w-7 text-center text-sm font-bold tabular-nums text-text-muted">
              {entry.rank}
            </span>
            <div className="w-7 h-7 rounded-full bg-bg-tertiary flex items-center justify-center">
              <span className="text-xs font-bold text-text-secondary">
                {entry.username[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-text-primary">
                @{entry.username}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold tabular-nums text-text-primary">
                {entry.earned.toFixed(2)}
              </span>
              <span className="text-xs text-text-muted ml-1">TON</span>
            </div>
            <span className="text-xs tabular-nums text-text-muted w-10 text-right">
              {entry.accuracy}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Your rank (sticky bottom-ish) */}
      <div className="mx-4 my-4">
        <div className="flex items-center gap-3 py-3 px-3 bg-accent-dim border border-accent-primary/20 rounded-xl">
          <span className="w-7 text-center text-sm font-bold tabular-nums text-accent-primary">
            {myRank}
          </span>
          <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent-primary">Y</span>
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-accent-primary">
              You
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold tabular-nums text-text-primary">
              {myData.earned.toFixed(2)}
            </span>
            <span className="text-xs text-text-muted ml-1">TON</span>
          </div>
          <span className="text-xs tabular-nums text-text-muted w-10 text-right">
            {myData.accuracy}%
          </span>
        </div>
      </div>

      {/* Weekly bonus info */}
      <div className="px-4 pb-8">
        <div className="bg-bg-secondary rounded-2xl border border-border p-4">
          <h3 className="text-xs font-semibold text-text-secondary mb-2">
            Weekly Top 10 Bonus
          </h3>
          <div className="space-y-1.5">
            {[
              { place: "1st", bonus: "1.0 TON" },
              { place: "2-3rd", bonus: "0.5 TON" },
              { place: "4-10th", bonus: "0.1 TON" },
            ].map((b) => (
              <div key={b.place} className="flex justify-between text-xs">
                <span className="text-text-muted">{b.place}</span>
                <span className="font-semibold text-accent-primary tabular-nums">
                  {b.bonus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({
  rank,
  username,
  earned,
  height,
  highlight,
}: {
  rank: number;
  username: string;
  earned: number;
  height: string;
  highlight?: boolean;
}) {
  const medals = ["", "#FFD700", "#C0C0C0", "#CD7F32"];
  const medalColor = medals[rank] || "#54677B";

  return (
    <motion.div
      className="flex flex-col items-center flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + (rank === 1 ? 0 : rank * 0.08) }}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
          highlight
            ? "bg-accent-primary/20 ring-2 ring-accent-primary"
            : "bg-bg-tertiary"
        }`}
      >
        <span
          className={`text-sm font-bold ${
            highlight ? "text-accent-primary" : "text-text-secondary"
          }`}
        >
          {username[0].toUpperCase()}
        </span>
      </div>

      {/* Name */}
      <span className="text-[11px] font-medium text-text-primary mb-0.5 truncate max-w-full">
        @{username}
      </span>

      {/* Earned */}
      <span className="text-[10px] font-bold tabular-nums text-text-secondary mb-1.5">
        {earned.toFixed(2)} TON
      </span>

      {/* Podium bar */}
      <div
        className={`w-full ${height} rounded-t-xl flex items-start justify-center pt-2 ${
          highlight
            ? "bg-gradient-to-b from-accent-primary/20 to-accent-primary/5 border border-accent-primary/30"
            : "bg-bg-secondary border border-border"
        }`}
      >
        <span
          className="text-lg font-extrabold"
          style={{ color: medalColor }}
        >
          {rank}
        </span>
      </div>
    </motion.div>
  );
}
