import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { searchBook, isBookRequest, SHIA_BOOKS_DATABASE, type ShiaBook } from "./bookDatabase.js";
import { logger } from "../lib/logger.js";

const MAX_TELEGRAM_FILE_SIZE = 49 * 1024 * 1024; // 49MB

export async function handleBookRequest(
  bot: TelegramBot,
  chatId: number,
  messageId: number,
  text: string
): Promise<boolean> {
  const bookQuery = isBookRequest(text);
  if (!bookQuery) return false;

  logger.info({ chatId, bookQuery }, "Book request detected");

  const statusMsg = await bot.sendMessage(
    chatId,
    `📚 *جارٍ البحث عن كتاب:* "${bookQuery}"\nيرجى الانتظار...`,
    { parse_mode: "Markdown" }
  );

  const foundBooks = searchBook(bookQuery);

  if (foundBooks.length === 0) {
    await bot.deleteMessage(chatId, statusMsg.message_id);
    await bot.sendMessage(
      chatId,
      `❌ *لم يُعثر على الكتاب في قاعدة بياناتنا*\n\n` +
        `الكتاب المطلوب: "${bookQuery}"\n\n` +
        `📋 *الكتب المتاحة في قاعدة البيانات:*\n` +
        getBookListText() +
        `\n\n💡 *للطلب:* اكتب مثلاً:\n"أرسل كتاب نهج البلاغة"\n"أريد كتاب مفاتيح الجنان"`,
      { parse_mode: "Markdown", reply_to_message_id: messageId }
    );
    return true;
  }

  const book = foundBooks[0];

  await bot.editMessageText(
    `📖 *تم العثور على الكتاب*\n\n` +
      `*العنوان:* ${book.title}\n` +
      `*المؤلف:* ${book.author}\n` +
      `*الحجم:* ~${book.sizeMb} ميغابايت\n\n` +
      (book.linkOnly
        ? `📎 الكتاب كبير الحجم، جارٍ إرسال رابط التنزيل...`
        : `⬇️ جارٍ تنزيل الكتاب من المصدر الموثق...`),
    { chat_id: chatId, message_id: statusMsg.message_id, parse_mode: "Markdown" }
  );

  if (book.linkOnly) {
    await sendBookLink(bot, chatId, messageId, statusMsg.message_id, book);
    return true;
  }

  try {
    await sendBookFile(bot, chatId, messageId, statusMsg.message_id, book);
  } catch (error) {
    logger.error({ error, chatId, bookId: book.id }, "Failed to download/send book");
    await sendBookLink(bot, chatId, messageId, statusMsg.message_id, book);
  }

  return true;
}

async function sendBookFile(
  bot: TelegramBot,
  chatId: number,
  messageId: number,
  statusMsgId: number,
  book: ShiaBook
): Promise<void> {
  logger.info({ chatId, bookId: book.id, url: book.pdfUrl, sizeMb: book.sizeMb }, "Downloading book");

  const response = await axios.get(book.pdfUrl, {
    responseType: "arraybuffer",
    timeout: 120000,
    maxRedirects: 10,
    maxContentLength: MAX_TELEGRAM_FILE_SIZE + 1024 * 1024,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/pdf,*/*",
    },
  });

  const buffer = Buffer.from(response.data);

  if (buffer.length > MAX_TELEGRAM_FILE_SIZE) {
    logger.warn(
      { chatId, bookId: book.id, sizeMb: Math.round(buffer.length / 1024 / 1024) },
      "File too large for Telegram, sending link"
    );
    await sendBookLink(bot, chatId, messageId, statusMsgId, book);
    return;
  }

  await bot.deleteMessage(chatId, statusMsgId).catch(() => {});

  const caption =
    `📖 *${book.title}*\n\n` +
    `✍️ *المؤلف:* ${book.author}\n` +
    `📝 *الوصف:* ${book.description}\n\n` +
    `🌐 *المصدر:* ${book.source}\n\n` +
    `بسم الله الرحمن الرحيم — وفقكم الله لقراءته والعمل بما فيه 🌹`;

  await bot.sendDocument(
    chatId,
    buffer,
    {
      caption,
      parse_mode: "Markdown",
      reply_to_message_id: messageId,
    },
    {
      filename: `${sanitizeFilename(book.title)}.pdf`,
      contentType: "application/pdf",
    }
  );

  logger.info({ chatId, bookId: book.id }, "Book sent successfully");
}

async function sendBookLink(
  bot: TelegramBot,
  chatId: number,
  messageId: number,
  statusMsgId: number,
  book: ShiaBook
): Promise<void> {
  await bot.deleteMessage(chatId, statusMsgId).catch(() => {});

  const sizeNote =
    book.sizeMb > 49
      ? `_ملاحظة: الملف حجمه ${book.sizeMb} ميغابايت، يُنزَّل مباشرة من الرابط_`
      : `_يمكنك فتح الرابط مباشرة في المتصفح وتنزيل الملف_`;

  await bot.sendMessage(
    chatId,
    `📖 *${book.title}*\n\n` +
      `✍️ *المؤلف:* ${book.author}\n` +
      `📝 *الوصف:* ${book.description}\n` +
      `📦 *الحجم:* ~${book.sizeMb} ميغابايت\n\n` +
      `⬇️ *رابط التنزيل المباشر:*\n${book.pdfUrl}\n\n` +
      `🌐 *المصدر:* ${book.source}\n\n` +
      sizeNote +
      `\n\nوفقكم الله 🌹`,
    {
      parse_mode: "Markdown",
      reply_to_message_id: messageId,
    }
  );
}

function getBookListText(): string {
  const categories: Record<string, string[]> = {
    "📿 الأدعية والزيارات": [],
    "📜 الحديث والروايات": [],
    "🕌 التاريخ والسيرة": [],
    "⚖️ الفقه والأحكام": [],
    "💡 العقيدة والكلام": [],
    "📖 التفسير": [],
  };

  for (const book of SHIA_BOOKS_DATABASE) {
    const title = book.title.split(" — ")[0].split(" في ")[0];
    const kws = book.keywords.join(" ");

    if (kws.match(/مفاتيح|صحيفة|دعاء|زيارة|ادعية|مصباح الشريعة/)) {
      categories["📿 الأدعية والزيارات"].push(title);
    } else if (kws.match(/تفسير|مجمع البيان/)) {
      categories["📖 التفسير"].push(title);
    } else if (kws.match(/فقه|احكام|وسائل|تهذيب|استبصار|الكافي|كليني|فقيه|الصدوق|منهاج|تحرير/)) {
      categories["📜 الحديث والروايات"].push(title);
    } else if (kws.match(/عقيدة|إمامة|كلام|الهيات|نهج الحق|تصحيح الاعتقادات|فرق الشيعة|دلائل/)) {
      categories["💡 العقيدة والكلام"].push(title);
    } else if (
      kws.match(
        /الإرشاد|مقتل|كربلاء|عاشوراء|السقيفة|سيرة|تاريخ|الغارات|صفين|الجمل|غيبة|فاطمة|الزهراء|أبي طالب|مناقب|اعيان|بشارة/
      )
    ) {
      categories["🕌 التاريخ والسيرة"].push(title);
    } else {
      categories["📜 الحديث والروايات"].push(title);
    }
  }

  let text = "";
  for (const [cat, books] of Object.entries(categories)) {
    if (books.length > 0) {
      text += `\n${cat}:\n`;
      text += books.map((b) => `  • ${b}`).join("\n");
      text += "\n";
    }
  }
  return text;
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 100);
}

export function getAvailableBooksMessage(): string {
  const sendable = SHIA_BOOKS_DATABASE.filter((b) => !b.linkOnly).length;
  const linkable = SHIA_BOOKS_DATABASE.filter((b) => b.linkOnly).length;

  return (
    `📚 *الكتب الشيعية المتاحة:*\n` +
    `_(${sendable} كتاب يُرسَل كملف، ${linkable} كتاب كبير يُرسَل رابطه)_\n` +
    getBookListText() +
    `\n\n💡 *طريقة الطلب:*\n` +
    `• "أرسل كتاب نهج البلاغة"\n` +
    `• "أريد كتاب مفاتيح الجنان"\n` +
    `• "ابعث لي كتاب الإرشاد"\n` +
    `• "احتاج كتاب الكافي"\n\n` +
    `جميع الكتب من مصادر موثوقة — archive.org 🌹`
  );
}
