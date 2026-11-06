interface TypingIndicatorProps {
  visible: boolean;
}

export default function TypingIndicator({ visible }: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <div className="typing-indicator" role="status" aria-label="Assistant is typing">
      <span className="typing-text">Assistant is typing</span>
      <span className="typing-dots" aria-hidden="true">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </span>
    </div>
  );
}
