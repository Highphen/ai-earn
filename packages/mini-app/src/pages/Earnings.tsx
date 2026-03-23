import { motion } from "framer-motion";
import { DEMO_REWARDS } from "../lib/mock-data";

export function Earnings() {
  const totalEarned = 4.28;
  const todayEarned = 0.42;
  const weekEarned = 2.18;
  const monthEarned = 4.28;

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-lg font-bold text-text-primary">Earnings</h1>
      </div>

      {/* Total earned card */}
      <div className="mx-4 mb-4">
        <motion.div
          className="bg-bg-secondary rounded-card border border-border p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <span className="label-caps text-text-muted">Total Earned</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-4xl font-extrabold tight-nums text-text-primary">
              {totalEarned.toFixed(2)}
            </span>
            <span className="text-lg font-semibold text-text-secondary">TON</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-text-muted">~${(totalEarned * 5).toFixed(2)}</span>
          </div>
        </motion.div>
      </div>

      {/* Period breakdown */}
      <div className="grid grid-cols-3 gap-2.5 px-4 mb-5">
        {[
          { label: "Today", value: todayEarned },
          { label: "This Week", value: weekEarned },
          { label: "This Month", value: monthEarned },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-bg-secondary rounded-2xl border border-border p-3 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <span className="label-caps text-text-muted">{item.label}</span>
            <div className="mt-1">
              <span className="text-sm font-bold tight-nums text-positive">
                +{item.value.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Withdraw button */}
      <div className="px-4 mb-5">
        <button className="w-full py-3 bg-[#0098EA] hover:bg-[#0088D4] active:bg-[#0078BD] rounded-xl text-white font-semibold text-sm transition-colors">
          Withdraw to Wallet
        </button>
      </div>

      {/* Recent rewards */}
      <div className="px-4 pb-6">
        <h2 className="text-sm font-semibold text-text-secondary mb-3">
          Recent Rewards
        </h2>
        <div className="space-y-0">
          {DEMO_REWARDS.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.03 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-positive/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C805" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {r.type}
                  </span>
                  <p className="text-[11px] text-text-muted">{r.timeAgo}</p>
                </div>
              </div>
              <span className="text-sm font-bold tabular-nums text-positive">
                +{r.amount.toFixed(3)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
