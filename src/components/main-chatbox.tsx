import { useEffect, useRef, useState, type FormEvent } from "react";
import "./main-chatbox.css";

//const [chatbotMessages, setChatbotMessages] = useState<string[]>([]);

function MyChatBox() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages]);

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    setUserMessages([...userMessages, trimmed]);
    setText("");
    inputRef.current?.focus();
  }

  const chatStarted = userMessages.length > 0;

  return (
    <div
      className={`chat-container ${chatStarted ? "chat-started" : ""}`}
    >
      {!chatStarted && (
        <div className="welcome">
          <h1>Welcome to AboutYou AI</h1>
          <p>Your friendly AI assistant, ready to help.</p>
        </div>
      )}

      <div className="messages">
        {userMessages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbox" onSubmit={handleSend}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask me anything..."
        />

        <button type="submit" disabled={!text.trim()}>
          Send
        </button>
      </form>
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
