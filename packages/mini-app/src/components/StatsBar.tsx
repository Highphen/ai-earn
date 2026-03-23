import { StreakBadge } from "./StreakBadge";

interface StatsBarProps {
  accuracy: number;
  todayTasks: number;
  streakDays: number;
  multiplier: number;
  balance: number;
}

export function StatsBar({
  accuracy,
  todayTasks,
  streakDays,
  multiplier,
  balance,
}: StatsBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-bg-secondary/80 backdrop-blur-sm border-b border-border">
      {/* Left: accuracy + today count */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="label-caps text-text-muted">Accuracy</span>
          <span className="text-sm font-bold tabular-nums text-text-primary">
            {accuracy}%
          </span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex flex-col">
          <span className="label-caps text-text-muted">Today</span>
          <span className="text-sm font-bold tabular-nums text-text-primary">
            {todayTasks}
          </span>
        </div>
      </div>

      {/* Center: streak */}
      <StreakBadge days={streakDays} multiplier={multiplier} />

      {/* Right: balance */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#0098EA] flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 56 56" fill="none">
            <path d="M37.56 15.63H18.44c-3.52 0-5.74 3.79-3.98 6.86l11.8 20.45c.77 1.34 2.7 1.34 3.47 0l11.8-20.45c1.77-3.06-.46-6.86-3.98-6.86zM26.25 36.81l-2.57-4.97-6.2-11.09c-.41-.71.1-1.6.96-1.6h7.81v17.69zm12.26-16.07l-6.2 11.1-2.57 4.97V19.12h7.82c.86 0 1.36.91.95 1.62z" fill="white"/>
          </svg>
        </div>
        <span className="text-sm font-bold tight-nums text-text-primary">
          {balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
