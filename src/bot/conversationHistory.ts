export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const conversationMap = new Map<number, Message[]>();
const MAX_HISTORY = 20;

export function getHistory(chatId: number): Message[] {
  return conversationMap.get(chatId) ?? [];
}

export function addMessage(chatId: number, role: "user" | "assistant", content: string): void {
  if (!conversationMap.has(chatId)) {
    conversationMap.set(chatId, []);
  }
  const history = conversationMap.get(chatId)!;
  history.push({ role, content });
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }
}

export function clearHistory(chatId: number): void {
  conversationMap.delete(chatId);
}
