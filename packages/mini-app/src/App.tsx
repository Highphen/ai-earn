import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskFeed } from "./pages/TaskFeed";
import { Earnings } from "./pages/Earnings";
import { Leaderboard } from "./pages/Leaderboard";
import { Profile } from "./pages/Profile";
import { TabBar, type TabId } from "./components/TabBar";

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>("tasks");

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {activeTab === "tasks" && <TaskFeed />}
            {activeTab === "earn" && <Earnings />}
            {activeTab === "rank" && <Leaderboard />}
            {activeTab === "me" && <Profile />}
          </motion.div>
        </AnimatePresence>
      </main>
      <TabBar active={activeTab} onChange={handleTabChange} />
    </div>
  );
}
