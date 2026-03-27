import OpenAI from "openai";
import { SHIA_SYSTEM_PROMPT } from "./systemPrompt.js";
import { getHistory, addMessage, type Message } from "./conversationHistory.js";
import { logger } from "../lib/logger.js";

// Pollinations.ai — خدمة AI مجانية بالكامل لا تحتاج أي مفتاح
const FREE_AI_BASE_URL = "https://text.pollinations.ai/openai";
const FREE_AI_MODEL = "openai-large"; // GPT-4o عبر Pollinations

const openai = new OpenAI({
  apiKey: "free",
  baseURL: FREE_AI_BASE_URL,
});

export async function getShiaResponse(chatId: number, userMessage: string): Promise<string> {
  addMessage(chatId, "user", userMessage);

  const history = getHistory(chatId);

  const messages: Message[] = [
    { role: "system", content: SHIA_SYSTEM_PROMPT },
    ...history,
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: FREE_AI_MODEL,
      messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "عذراً، لم أتمكن من الإجابة في الوقت الحالي. يرجى المحاولة مجدداً.";

    addMessage(chatId, "assistant", reply);

    return reply;
  } catch (error) {
    logger.error({ error, chatId }, "Error calling AI API");
    throw error;
  }
}
