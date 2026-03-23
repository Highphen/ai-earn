import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";

const SWIPE_THRESHOLD_PX = 120;
const SWIPE_VELOCITY = 500;
const ROTATION_RANGE = 12;

export interface TaskData {
  id: number;
  imageUrl: string;
  question: string;
  optionLeft: string;
  optionRight: string;
  reward: number;
}

interface SwipeCardProps {
  task: TaskData;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  stackIndex: number;
}

export function SwipeCard({ task, onSwipe, isTop, stackIndex }: SwipeCardProps) {
  const x = useMotionValue(0);

  // Card rotation follows drag
  const rotate = useTransform(x, [-300, 0, 300], [-ROTATION_RANGE, 0, ROTATION_RANGE]);

  // Overlays
  const acceptOpacity = useTransform(x, [0, 80, 160], [0, 0.6, 1]);
  const rejectOpacity = useTransform(x, [-160, -80, 0], [1, 0.6, 0]);

  // Background color tint
  const bgAccept = useTransform(
    x,
    [0, 100],
    ["rgba(0,200,5,0)", "rgba(0,200,5,0.06)"]
  );
  const bgReject = useTransform(
    x,
    [-100, 0],
    ["rgba(255,107,53,0.06)", "rgba(255,107,53,0)"]
  );

  // Card background color
  const cardBg = useTransform(
    x,
    [-100, 0, 100],
    [
      "rgba(255,107,53,0.04)",
      "transparent",
      "rgba(0,200,5,0.04)",
    ]
  );

  // Stack depth offset
  const stackScale = 1 - stackIndex * 0.04;
  const stackY = stackIndex * 6;
  const stackOpacity = stackIndex > 2 ? 0 : 1 - stackIndex * 0.15;

  function handleDragEnd(_: never, info: PanInfo) {
    const absX = Math.abs(info.offset.x);
    const absVelocity = Math.abs(info.velocity.x);

    // Dual threshold: distance OR velocity
    if (absX > SWIPE_THRESHOLD_PX || absVelocity > SWIPE_VELOCITY) {
      const direction = info.offset.x > 0 ? "right" : "left";
      onSwipe(direction);
    }
  }

  if (!isTop) {
    // Stack background cards
    return (
      <motion.div
        className="absolute inset-x-4 top-0 rounded-card bg-bg-secondary border border-border overflow-hidden"
        style={{
          scale: stackScale,
          y: stackY,
          opacity: stackOpacity,
          zIndex: 10 - stackIndex,
        }}
        initial={false}
        animate={{
          scale: stackScale,
          y: stackY,
          opacity: stackOpacity,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="aspect-[4/3] bg-bg-tertiary" />
        <div className="p-4 h-[72px]" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-x-4 top-0 z-20 touch-none cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <motion.div
        className="rounded-card bg-bg-secondary border border-border overflow-hidden card-shadow"
        style={{ background: cardBg }}
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] bg-bg-tertiary overflow-hidden">
          <img
            src={task.imageUrl}
            alt=""
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />

          {/* Accept overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: acceptOpacity, background: bgAccept }}
          >
            <div className="border-[3px] border-positive rounded-xl px-6 py-2 rotate-[-12deg]">
              <span className="text-positive text-2xl font-extrabold tracking-wider">
                {task.optionRight}
              </span>
            </div>
          </motion.div>

          {/* Reject overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: rejectOpacity, background: bgReject }}
          >
            <div className="border-[3px] border-negative rounded-xl px-6 py-2 rotate-[12deg]">
              <span className="text-negative text-2xl font-extrabold tracking-wider">
                {task.optionLeft}
              </span>
            </div>
          </motion.div>

          {/* Reward badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-accent-primary" />
            <span className="text-xs font-semibold tabular-nums text-white">
              +{task.reward.toFixed(3)}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="px-5 py-4">
          <p className="text-[15px] font-medium text-text-primary leading-snug">
            {task.question}
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              <span className="text-xs text-text-muted font-medium">{task.optionLeft}</span>
            </div>
            <span className="text-text-muted text-[10px] label-caps">Swipe</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted font-medium">{task.optionRight}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C805" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
