export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatServiceResponse {
  role: 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatService {
  sendMessage(text: string): Promise<ChatServiceResponse>;
}
