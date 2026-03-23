import { motion } from "framer-motion";
import { StreakBadge } from "../components/StreakBadge";
import { DEMO_BADGES } from "../lib/mock-data";

export function Profile() {
  const user = {
    username: "demo_user",
    level: 12,
    accuracy: 94,
    totalTasks: 1247,
    totalEarned: 4.28,
    streakDays: 5,
    multiplier: 1.5,
    xp: 3420,
    xpNext: 4000,
    walletAddress: "EQD...f3k2",
  };

  const dailyChallenge = {
    description: "Complete 50 image classifications",
    progress: 38,
    target: 50,
    bonus: 0.05,
  };

  const progressPercent = (dailyChallenge.progress / dailyChallenge.target) * 100;
  const xpPercent = (user.xp / user.xpNext) * 100;

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-lg font-bold text-text-primary">Profile</h1>
      </div>

      {/* User card */}
      <div className="mx-4 mb-4">
        <motion.div
          className="bg-bg-secondary rounded-card border border-border p-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-accent-dim flex items-center justify-center ring-2 ring-accent-primary/30">
              <span className="text-xl font-bold text-accent-primary">
                {user.username[0].toUpperCase()}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-text-primary">
                  @{user.username}
                </span>
                <span className="text-xs font-bold text-accent-primary bg-accent-dim px-2 py-0.5 rounded-full">
                  Lv.{user.level}
                </span>
              </div>

              {/* XP bar */}
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] tabular-nums text-text-muted">
                  {user.xp}/{user.xpNext} XP
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <span className="text-lg font-extrabold tight-nums text-text-primary">
                {user.accuracy}%
              </span>
              <p className="label-caps text-text-muted mt-0.5">Accuracy</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-extrabold tight-nums text-text-primary">
                {user.totalTasks.toLocaleString()}
              </span>
              <p className="label-caps text-text-muted mt-0.5">Tasks</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-extrabold tight-nums text-text-primary">
                {user.totalEarned.toFixed(2)}
              </span>
              <p className="label-caps text-text-muted mt-0.5">TON Earned</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Streak */}
      <div className="mx-4 mb-4">
        <motion.div
          className="bg-bg-secondary rounded-2xl border border-border p-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-3">
            <StreakBadge days={user.streakDays} multiplier={user.multiplier} />
            <div>
              <span className="text-sm font-semibold text-text-primary">
                {user.streakDays}-day streak
              </span>
              <p className="text-xs text-text-muted">
                {user.multiplier}x reward multiplier active
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${
                  i < user.streakDays
                    ? "bg-accent-primary"
                    : "bg-bg-tertiary border border-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Daily challenge */}
      <div className="mx-4 mb-4">
        <motion.div
          className="bg-bg-secondary rounded-2xl border border-border p-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-text-primary">
              Daily Challenge
            </span>
            <span className="text-xs font-bold text-accent-primary tabular-nums">
              +{dailyChallenge.bonus} TON
            </span>
          </div>
          <p className="text-xs text-text-secondary mb-2.5">
            {dailyChallenge.description}
          </p>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-positive rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <span className="text-xs font-bold tabular-nums text-text-secondary">
              {dailyChallenge.progress}/{dailyChallenge.target}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <div className="mx-4 mb-4">
        <h2 className="text-sm font-semibold text-text-secondary mb-2.5 px-1">
          Badges
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_BADGES.map((badge, i) => (
            <motion.div
              key={badge.id}
              className={`rounded-xl border p-3 text-center ${
                badge.earned
                  ? "bg-accent-dim border-accent-primary/20"
                  : "bg-bg-secondary border-border opacity-50"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: badge.earned ? 1 : 0.5, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04 }}
            >
              <div
                className={`text-[10px] font-semibold ${
                  badge.earned ? "text-accent-primary" : "text-text-muted"
                }`}
              >
                {badge.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Invite & wallet */}
      <div className="px-4 pb-8 space-y-2.5">
        <button className="w-full py-3 bg-accent-primary hover:bg-accent-secondary active:bg-accent-primary rounded-xl text-bg-primary font-semibold text-sm transition-colors">
          Invite Friends +0.1 TON
        </button>

        <div className="flex items-center justify-between py-3 px-4 bg-bg-secondary rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0098EA]/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 56 56" fill="none">
                <path d="M37.56 15.63H18.44c-3.52 0-5.74 3.79-3.98 6.86l11.8 20.45c.77 1.34 2.7 1.34 3.47 0l11.8-20.45c1.77-3.06-.46-6.86-3.98-6.86z" fill="#0098EA"/>
              </svg>
            </div>
            <span className="text-sm text-text-secondary font-mono">
              {user.walletAddress}
            </span>
          </div>
          <button className="text-xs text-text-muted hover:text-negative transition-colors">
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
