import { motion } from "framer-motion";

export type TabId = "tasks" | "earn" | "rank" | "me";

interface Tab {
  id: TabId;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "tasks",
    label: "Tasks",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? "#FFD60A" : "#54677B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "earn",
    label: "Earn",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? "#FFD60A" : "#54677B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "rank",
    label: "Rank",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? "#FFD60A" : "#54677B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21v-6M12 21V9M16 21v-4M6 21h12" />
      </svg>
    ),
  },
  {
    id: "me",
    label: "Me",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? "#FFD60A" : "#54677B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
];

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="relative flex items-center justify-around bg-bg-secondary border-t border-border px-2 pt-1.5 pb-1 safe-bottom">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-col items-center gap-0.5 py-1 px-4 min-w-[56px]"
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-accent-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative">
              {tab.icon(isActive)}
            </div>
            <span
              className={`text-[10px] font-medium transition-colors duration-150 ${
                isActive ? "text-accent-primary" : "text-text-muted"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
