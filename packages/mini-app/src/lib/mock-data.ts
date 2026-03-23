import type { TaskData } from "../components/SwipeCard";

// CIFAR-10 style demo tasks with picsum placeholder images
export const DEMO_TASKS: TaskData[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/seed/cat1/600/450",
    question: "Is there a cat in this image?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/dog2/600/450",
    question: "Is this image showing a dog?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/seed/car3/600/450",
    question: "Does this image contain a vehicle?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/seed/bird4/600/450",
    question: "Is there a bird in this photo?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/seed/plane5/600/450",
    question: "Does this image show an aircraft?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/seed/ship6/600/450",
    question: "Is there a ship or boat in this image?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/seed/horse7/600/450",
    question: "Does this image contain a horse?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.002,
  },
  {
    id: 8,
    imageUrl: "https://picsum.photos/seed/truck8/600/450",
    question: "Is this a truck?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 9,
    imageUrl: "https://picsum.photos/seed/frog9/600/450",
    question: "Can you see an amphibian here?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.002,
  },
  {
    id: 10,
    imageUrl: "https://picsum.photos/seed/deer10/600/450",
    question: "Does this image show a deer?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 11,
    imageUrl: "https://picsum.photos/seed/food11/600/450",
    question: "Is this a picture of food?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.001,
  },
  {
    id: 12,
    imageUrl: "https://picsum.photos/seed/nature12/600/450",
    question: "Is this a natural landscape?",
    optionLeft: "NO",
    optionRight: "YES",
    reward: 0.002,
  },
];

export interface LeaderboardEntry {
  rank: number;
  username: string;
  earned: number;
  accuracy: number;
  isYou?: boolean;
}

export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "alice_ml", earned: 2.42, accuracy: 98 },
  { rank: 2, username: "bob_data", earned: 2.15, accuracy: 96 },
  { rank: 3, username: "carol_ai", earned: 1.87, accuracy: 95 },
  { rank: 4, username: "dave_ton", earned: 1.54, accuracy: 93 },
  { rank: 5, username: "eve_label", earned: 1.23, accuracy: 92 },
  { rank: 6, username: "frank_dev", earned: 1.01, accuracy: 91 },
  { rank: 7, username: "grace_nn", earned: 0.89, accuracy: 90 },
  { rank: 8, username: "hank_tg", earned: 0.72, accuracy: 89 },
  { rank: 9, username: "iris_web3", earned: 0.65, accuracy: 88 },
  { rank: 10, username: "jack_earn", earned: 0.51, accuracy: 87 },
];

export interface RewardHistory {
  amount: number;
  type: string;
  timeAgo: string;
}

export const DEMO_REWARDS: RewardHistory[] = [
  { amount: 0.003, type: "Comparison", timeAgo: "2m ago" },
  { amount: 0.001, type: "Image classify", timeAgo: "5m ago" },
  { amount: 0.002, type: "Sentiment", timeAgo: "8m ago" },
  { amount: 0.001, type: "Image classify", timeAgo: "12m ago" },
  { amount: 0.001, type: "Image classify", timeAgo: "15m ago" },
  { amount: 0.002, type: "Sentiment", timeAgo: "22m ago" },
  { amount: 0.003, type: "Comparison", timeAgo: "31m ago" },
  { amount: 0.001, type: "Image classify", timeAgo: "38m ago" },
];

export interface Badge {
  id: string;
  label: string;
  earned: boolean;
}

export const DEMO_BADGES: Badge[] = [
  { id: "tasks-100", label: "100 Tasks", earned: true },
  { id: "tasks-1k", label: "1K Tasks", earned: true },
  { id: "streak-7", label: "7-Day Streak", earned: true },
  { id: "accuracy-95", label: "95% Club", earned: false },
  { id: "top-100", label: "Top 100", earned: false },
  { id: "referral-5", label: "5 Referrals", earned: false },
];
