import TelegramBot from "node-telegram-bot-api";
import { getShiaResponse } from "./aiHandler.js";
import { clearHistory } from "./conversationHistory.js";
import { handleBookRequest, getAvailableBooksMessage } from "./bookDownloader.js";
import { logger } from "../lib/logger.js";

const WELCOME_MESSAGE = `
🕌 *بسم الله الرحمن الرحيم*

السلام عليكم ورحمة الله وبركاته

أهلاً بكم في *البوت الشيعي الإسلامي*

أنا هنا للإجابة على أسئلتكم في:
• 📖 *العقيدة الشيعية* - التوحيد، الإمامة، المعاد
• ⚖️ *الأحكام الشرعية والفقه*
• 🕌 *التاريخ وسيرة أهل البيت عليهم السلام*
• 📿 *الأدعية والزيارات المأثورة*
• 🌙 *القرآن الكريم وتفسيره*
• 📚 *تنزيل الكتب الشيعية الموثقة بصيغة PDF*

*الأوامر المتاحة:*
/start - بداية جديدة
/help - دليل الاستخدام
/books - قائمة الكتب المتاحة للتنزيل
/clear - مسح تاريخ المحادثة

وفقكم الله لما يحب ويرضى 🌹
`;

const HELP_MESSAGE = `
📖 *دليل الاستخدام الكامل*

━━━━━━━━━━━━━━━━━━━━━
*١. الأسئلة الدينية:*
اكتب سؤالك مباشرةً وسأجيب من المصادر الشيعية الموثقة

*أمثلة:*
• ما هو دليل عصمة الأئمة عليهم السلام؟
• ماذا جرى في واقعة السقيفة؟
• ما حكم الخمس في الفقه الشيعي؟
• اشرح لي زيارة عاشوراء
• ما موقف الشيعة من الإمام علي عليه السلام؟

━━━━━━━━━━━━━━━━━━━━━
*٢. تنزيل الكتب الشيعية (PDF):*
قل مثلاً:
• "أرسل كتاب نهج البلاغة"
• "أريد كتاب مفاتيح الجنان"
• "ابعث لي كتاب اللهوف"
• "احتاج كتاب الكافي"
• "أعطني كتاب الغدير"

━━━━━━━━━━━━━━━━━━━━━
*٣. الأوامر:*
/books - عرض قائمة الكتب المتاحة
/clear - مسح المحادثة
/help - هذه القائمة

━━━━━━━━━━━━━━━━━━━━━
*ملاحظة:* جميع الإجابات والكتب من مصادر شيعية موثقة فقط.
`;

export function startBot(): void {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }

  const bot = new TelegramBot(token, { polling: true });

  logger.info("Telegram Shia bot started with polling");

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    clearHistory(chatId);
    try {
      await bot.sendMessage(chatId, WELCOME_MESSAGE, { parse_mode: "Markdown" });
    } catch (error) {
      logger.error({ error, chatId }, "Error sending welcome message");
    }
  });

  bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, HELP_MESSAGE, { parse_mode: "Markdown" });
    } catch (error) {
      logger.error({ error, chatId }, "Error sending help message");
    }
  });

  bot.onText(/\/books/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, getAvailableBooksMessage(), { parse_mode: "Markdown" });
    } catch (error) {
      logger.error({ error, chatId }, "Error sending books list");
    }
  });

  bot.onText(/\/clear/, async (msg) => {
    const chatId = msg.chat.id;
    clearHistory(chatId);
    try {
      await bot.sendMessage(
        chatId,
        "✅ تم مسح تاريخ المحادثة. يمكنك البدء بأسئلة جديدة.\n\nوفقكم الله 🌹",
        { parse_mode: "Markdown" }
      );
    } catch (error) {
      logger.error({ error, chatId }, "Error sending clear confirmation");
    }
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith("/")) return;

    const userName = msg.from?.first_name || "أخي الكريم";

    logger.info({ chatId, userName, messageLength: text.length }, "Received user message");

    try {
      const isBook = await handleBookRequest(bot, chatId, msg.message_id, text);
      if (isBook) return;

      await bot.sendChatAction(chatId, "typing");

      const thinkingMsg = await bot.sendMessage(
        chatId,
        "⏳ *جارٍ البحث في المصادر الشيعية والتحقق من المسألة...*",
        { parse_mode: "Markdown" }
      );

      const response = await getShiaResponse(chatId, text);

      await bot.deleteMessage(chatId, thinkingMsg.message_id);

      const maxLength = 4000;
      if (response.length <= maxLength) {
        await bot.sendMessage(chatId, response, {
          parse_mode: "Markdown",
          reply_to_message_id: msg.message_id,
        });
      } else {
        const parts = splitMessage(response, maxLength);
        for (let i = 0; i < parts.length; i++) {
          await bot.sendMessage(chatId, parts[i], {
            parse_mode: "Markdown",
            reply_to_message_id: i === 0 ? msg.message_id : undefined,
          });
        }
      }

      logger.info({ chatId, responseLength: response.length }, "Response sent successfully");
    } catch (error) {
      logger.error({ error, chatId }, "Error processing message");
      try {
        await bot.sendMessage(
          chatId,
          "⚠️ عذراً، حدث خطأ. يرجى المحاولة مجدداً بعد لحظات.\n\nنسأل الله التوفيق.",
          { parse_mode: "Markdown" }
        );
      } catch (sendError) {
        logger.error({ sendError, chatId }, "Error sending error message");
      }
    }
  });

  bot.on("polling_error", (error) => {
    logger.error({ error }, "Telegram polling error");
  });

  bot.on("error", (error) => {
    logger.error({ error }, "Telegram bot error");
  });
}

function splitMessage(text: string, maxLength: number): string[] {
  const parts: string[] = [];
  let remaining = text;

  while (remaining.length > maxLength) {
    let splitAt = remaining.lastIndexOf("\n", maxLength);
    if (splitAt === -1 || splitAt < maxLength / 2) {
      splitAt = remaining.lastIndexOf(" ", maxLength);
    }
    if (splitAt === -1) {
      splitAt = maxLength;
    }
    parts.push(remaining.substring(0, splitAt));
    remaining = remaining.substring(splitAt).trim();
  }

  if (remaining.length > 0) {
    parts.push(remaining);
  }

  return parts;
}
