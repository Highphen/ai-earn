import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { SwipeCard } from "../components/SwipeCard";
import { StatsBar } from "../components/StatsBar";
import { RewardPopup } from "../components/RewardPopup";
import { DEMO_TASKS } from "../lib/mock-data";

export function TaskFeed() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [balance, setBalance] = useState(0.42);
  const [todayTasks, setTodayTasks] = useState(47);
  const [accuracy] = useState(94);
  const [streakDays] = useState(5);
  const [multiplier] = useState(1.5);
  const [pendingReward, setPendingReward] = useState<number | null>(null);

  // Wrap around tasks for infinite loop
  const getCurrentTasks = useCallback(() => {
    const visible: typeof DEMO_TASKS = [];
    for (let i = 0; i < 3; i++) {
      const idx = (taskIndex + i) % DEMO_TASKS.length;
      visible.push(DEMO_TASKS[idx]);
    }
    return visible;
  }, [taskIndex]);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const task = DEMO_TASKS[taskIndex % DEMO_TASKS.length];

      // Simulate reward (always on right, sometimes on left)
      if (direction === "right" || Math.random() > 0.5) {
        const reward = task.reward * multiplier;
        setBalance((b) => +(b + reward).toFixed(4));
        setPendingReward(reward);
        setTodayTasks((t) => t + 1);
      } else {
        setTodayTasks((t) => t + 1);
      }

      setTaskIndex((i) => i + 1);
    },
    [taskIndex, multiplier]
  );

  const handleRewardDone = useCallback(() => {
    setPendingReward(null);
  }, []);

  const visibleTasks = getCurrentTasks();

  return (
    <div className="flex flex-col h-full">
      {/* Stats bar */}
      <StatsBar
        accuracy={accuracy}
        todayTasks={todayTasks}
        streakDays={streakDays}
        multiplier={multiplier}
        balance={balance}
      />

      {/* Card stack area */}
      <div className="flex-1 relative overflow-hidden px-0 py-4">
        {/* Task counter */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
          <span className="text-text-muted text-[10px] label-caps">
            Task #{taskIndex + 1}
          </span>
        </div>

        {/* Card stack (render bottom to top) */}
        <div className="relative h-full max-w-[400px] mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleTasks
              .slice()
              .reverse()
              .map((task, reversedIdx) => {
                const stackIndex = visibleTasks.length - 1 - reversedIdx;
                return (
                  <SwipeCard
                    key={`${task.id}-${taskIndex + stackIndex}`}
                    task={task}
                    onSwipe={handleSwipe}
                    isTop={stackIndex === 0}
                    stackIndex={stackIndex}
                  />
                );
              })}
          </AnimatePresence>
        </div>

        {/* Swipe hint (only first few tasks) */}
        {taskIndex < 3 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 animate-pulse">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#54677B" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="text-text-muted text-xs">Swipe to answer</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#54677B" strokeWidth="2" strokeLinecap="round" className="rotate-180">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Last reward indicator */}
      {pendingReward === null && taskIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 py-2 bg-positive/5 border-t border-positive/10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C805" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-positive text-xs font-semibold tabular-nums">
            +{DEMO_TASKS[(taskIndex - 1) % DEMO_TASKS.length].reward.toFixed(3)} TON
          </span>
        </div>
      )}

      {/* Reward popup */}
      <RewardPopup amount={pendingReward} onDone={handleRewardDone} />
    </div>
  );
}
