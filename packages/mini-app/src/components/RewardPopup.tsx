import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RewardPopupProps {
  amount: number | null;
  onDone: () => void;
}

export function RewardPopup({ amount, onDone }: RewardPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (amount === null) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 1400);
    return () => clearTimeout(timer);
  }, [amount, onDone]);

  return (
    <AnimatePresence>
      {visible && amount !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,200,5,0.15) 0%, transparent 70%)",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Amount */}
            <motion.div
              className="relative bg-positive/10 border border-positive/30 rounded-2xl px-6 py-3 backdrop-blur-md"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.05,
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C805" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-positive text-2xl font-bold tight-nums">
                  +{amount.toFixed(3)}
                </span>
                <span className="text-positive/70 text-sm font-medium">
                  TON
                </span>
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-positive"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0.8,
                  scale: 1,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 120,
                  y: (Math.random() - 0.5) * 120 - 20,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
