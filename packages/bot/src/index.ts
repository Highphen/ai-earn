import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

const MINI_APP_URL = "https://ai-earn.pages.dev";

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard().webApp(
    "Start Earning",
    MINI_APP_URL
  );

  await ctx.reply(
    "AI Earn - Judge to Earn\n\n" +
      "Swipe to label AI data and earn TON instantly.\n\n" +
      "Per task: 0.001-0.003 TON\n" +
      "Per hour: ~$3.60\n" +
      "TX fee: $0.007\n\n" +
      "Tap below to start:",
    { reply_markup: keyboard }
  );
});

bot.command("balance", async (ctx) => {
  // TODO: fetch from API
  await ctx.reply("Your balance: 0.000 TON\nTotal earned: 0.000 TON");
});

bot.command("stats", async (ctx) => {
  // TODO: fetch from API
  await ctx.reply(
    "Your Stats:\n" +
      "Tasks completed: 0\n" +
      "Accuracy: --\n" +
      "Streak: 0 days\n" +
      "Level: 1"
  );
});

bot.command("withdraw", async (ctx) => {
  await ctx.reply(
    "To withdraw your earnings, open the mini app and go to the Earn tab."
  );
});

bot.command("help", async (ctx) => {
  await ctx.reply(
    "AI Earn Commands:\n\n" +
      "/start - Open the mini app\n" +
      "/balance - Check your TON balance\n" +
      "/stats - View your statistics\n" +
      "/withdraw - Withdraw earnings\n" +
      "/help - Show this message"
  );
});

bot.start();
