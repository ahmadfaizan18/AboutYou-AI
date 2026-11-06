import type { ChatService, ChatServiceResponse } from '../types/chat';

const MOCK_DELAY_MS = 1000;

const MOCK_RESPONSES: Record<string, string> = {
  hello: "Hello! I'm your personal AI assistant. I can tell you about my education, skills, projects, experience, and achievements. What would you like to know?",
  hi: 'Hi there! How can I help you today?',
  hey: "Hey! I'm here to share information about my background. Ask me about my education, skills, projects, experience, or achievements.",
  default: "That's an interesting question. I'm here to share information about my background—education, skills, projects, experience, and achievements. Feel free to ask about any of those!",
};

let simulateError = false;

export function setSimulateError(enabled: boolean): void {
  simulateError = enabled;
}

function getMockResponse(text: string): string {
  const lower = text.toLowerCase().trim();
  return MOCK_RESPONSES[lower] ?? MOCK_RESPONSES.default;
}

export const chatService: ChatService = {
  async sendMessage(text: string): Promise<ChatServiceResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateError) {
          reject(new Error('Mock error: unable to get response from assistant.'));
          return;
        }
        resolve({
          role: 'assistant',
          content: getMockResponse(text),
          createdAt: new Date().toISOString(),
        });
      }, MOCK_DELAY_MS);
    });
  },
};
