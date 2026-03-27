import app from "./app.js";
import { logger } from "./lib/logger.js";
import { startBot } from "./bot/telegramBot.js";

const rawPort = process.env["PORT"] ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, () => {
  logger.info({ port }, "Server listening");

  try {
    startBot();
    logger.info("Shia Telegram bot started successfully");
  } catch (botError) {
    logger.error({ botError }, "Failed to start Telegram bot");
    process.exit(1);
  }
});
