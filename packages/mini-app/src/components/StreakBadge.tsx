import { motion } from "framer-motion";

interface StreakBadgeProps {
  days: number;
  multiplier: number;
}

export function StreakBadge({ days, multiplier }: StreakBadgeProps) {
  if (days === 0) return null;

  return (
    <motion.div
      className="flex items-center gap-1.5 bg-accent-dim rounded-full px-2.5 py-1"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Flame icon - orange, not red */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C9.5 7 5 9.5 5 14a7 7 0 0 0 14 0c0-4.5-4.5-7-7-12z"
          fill="#FF9500"
        />
        <path
          d="M12 10c-1 2-2.5 3-2.5 5a2.5 2.5 0 0 0 5 0c0-2-1.5-3-2.5-5z"
          fill="#FFD60A"
        />
      </svg>
      <span className="text-xs font-bold text-accent-primary tabular-nums">
        {days}d
      </span>
      {multiplier > 1 && (
        <span className="text-[10px] font-semibold text-accent-secondary tabular-nums">
          {multiplier}x
        </span>
      )}
    </motion.div>
  );
}
