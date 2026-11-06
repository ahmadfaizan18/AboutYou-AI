import type { ChatMessage } from '../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`message ${isUser ? 'message--user' : 'message--assistant'}`}>
      {message.content}
    </div>
  );
}
