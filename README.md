# AI Earn

**Judge-to-Earn: Swipe to label AI data, earn TON instantly**

AI Earn is a Telegram Mini App where users perform AI data labeling tasks (image classification, sentiment analysis, comparisons) through Tinder-like swipe gestures and receive TON micropayments in real-time.

## The Problem

- **For AI companies**: Data labeling is a $7.9B market growing to $28.1B. Current platforms (Scale AI, Toloka, MTurk) are slow, expensive, and inaccessible to casual workers.
- **For users**: Tap-to-earn games (Notcoin, Hamster Kombat) proved massive demand for mobile earning, but taps have zero economic value. Users want to earn, but current models are unsustainable.

## The Solution

AI Earn bridges both sides:

1. **Users** swipe to classify images, judge sentiment, compare outputs — earning 0.001-0.003 TON per task (~$3.6/hour at full speed)
2. **AI companies** get labeled data at 60-80% lower cost than traditional platforms
3. **TON blockchain** enables instant micropayments with sub-cent fees ($0.007/tx)

## Architecture

```
Telegram Bot (@AIEarnBot)
    |
    v
Mini App (React + Framer Motion)
    |
    v
API (Hono on Cloudflare Workers)
    |
    +---> D1 (tasks, submissions, users)
    +---> KV (sessions, hot data)
    +---> TON Blockchain (RewardPool smart contract)
```

### Key Technical Decisions

- **Tact smart contract** (`RewardPool.tact`) handles reward distribution on-chain
- **3-worker consensus** + honeypot questions for quality control
- **Cloudflare Workers** for globally distributed, low-latency API
- **Framer Motion** for native-feeling swipe physics (dual threshold: distance OR velocity)
- **TON Connect** for seamless wallet integration within Telegram

## Demo

**Live Demo**: [ai-earn.pages.dev](https://ai-earn.pages.dev)

The demo showcases the Mini App UI with:
- Swipe card interface for image classification tasks
- Animated reward popups with particle effects
- Earnings dashboard with period breakdown
- Leaderboard with podium and rankings
- Profile with streaks, badges, and daily challenges

## Project Structure

```
packages/
  mini-app/     # React + Vite + Tailwind (Telegram Mini App)
  api/          # Hono on CF Workers (REST API)
  bot/          # grammy (Telegram Bot)
  contracts/    # Tact (TON smart contracts)
```

## Getting Started

```bash
cd packages/mini-app
npm install
npm run dev
```

## UI Design Principles

- **Telegram-native dark theme** (#17212b background)
- **Warm gold accent** (#FFD60A) inspired by Notcoin's visual language
- **Tabular numbers** everywhere for professional data display
- **Spring physics** with slight overshoot for organic feel
- **No spinners** — skeleton loading states only
- **Safe area padding** for notched devices

## Gamification

| Feature | Description |
|---------|-------------|
| Streaks | Daily login rewards with multiplier (up to 2x) |
| Levels | XP-based progression unlocking higher-tier tasks |
| Badges | Achievement system (100 tasks, 7-day streak, 95% accuracy) |
| Leaderboard | Weekly rankings with TON bonus prizes |
| Daily Challenge | Bonus tasks with extra rewards |
| Referrals | Invite friends for 0.1 TON bonus |

## Market Opportunity

- Data labeling market: $7.9B (2024) -> $28.1B (2028)
- Telegram users: 1B+
- TON ecosystem: Growing consumer app layer with zero data-labeling competitors
- Notcoin proved 35M users will tap for rewards — AI Earn gives those taps real value

## License

MIT
