import { useEffect, useRef, useState } from 'react';
import type { ChatMessage, MessageRole } from '../types/chat';
import { chatService } from '../services/chatService';
import './main-chatbox.css';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';

let nextId = 0;

function createMessage(content: string, role: MessageRole): ChatMessage {
  nextId += 1;
  return {
    id: `msg-${nextId}`,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

function MyChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatStarted = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    setError(null);
    setLastFailedMessage(null);

    const userMessage = createMessage(text, 'user');
    setMessages((prev) => [...prev, userMessage]);
    setIsAssistantTyping(true);

    chatService
      .sendMessage(text)
      .then((response) => {
        setMessages((prev) => [...prev, createMessage(response.content, 'assistant')]);
        setIsAssistantTyping(false);
      })
      .catch(() => {
        setIsAssistantTyping(false);
        setError('Sorry, I could not get a response. Please try again.');
        setLastFailedMessage(text);
      });
  };

  const handleRetry = () => {
    if (!lastFailedMessage) return;
    setError(null);
    setIsAssistantTyping(true);

    chatService
      .sendMessage(lastFailedMessage)
      .then((response) => {
        setMessages((prev) => [...prev, createMessage(response.content, 'assistant')]);
        setIsAssistantTyping(false);
        setLastFailedMessage(null);
      })
      .catch(() => {
        setIsAssistantTyping(false);
        setError('Sorry, the assistant is still unavailable. Please try again later.');
      });
  };

  const handleDismiss = () => {
    setError(null);
    setLastFailedMessage(null);
  };

  return (
    <div className={`chat-container ${chatStarted ? "chat-started" : ""}`}>
      {!chatStarted && (
        <div className="welcome">
          <h1>Welcome to AboutYou AI</h1>
          <p>Your friendly AI assistant, ready to help.</p>
        </div>
      )}

      <div className="messages" aria-live="polite" aria-label="Conversation messages">
        <MessageList messages={messages} />
        {isAssistantTyping && <TypingIndicator visible />}
        <div ref={messagesEndRef} />
      </div>

      {error && lastFailedMessage && (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
          onDismiss={handleDismiss}
        />
      )}

      <ChatInput
        disabled={isAssistantTyping}
        onSend={handleSend}
        placeholder="Ask me anything..."
      />
    </div>
  );
}

export default function MainChatBox() {
  return (
    <>
      <div className="page-background" aria-hidden="true">
        <div className="blob blob-light-blue" />
        <div className="blob blob-blue" />
        <div className="blob blob-blue-side" />
        <div className="blob blob-purple" />
        <div className="blob blob-pink-left" />
        <div className="blob blob-pink-right" />
      </div>
      <MyChatBox />
    </>
  );
}
