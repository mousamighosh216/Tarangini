import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function TypingIndicator() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "12px",
      padding: "0 4px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "4px 18px 18px 18px",
        padding: "14px 18px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#e8928f",
                animation: "bounce 1.2s infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}>
          Assistant is typing…
        </span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function MessageList({ messages, isTyping, quickQuestionsVisible }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div style={{
      flex: 1,
      overflowY: "auto",
      background: "#f0a0a0",
      backgroundImage: "radial-gradient(circle at 20% 50%, #f5b8b0 0%, #e89898 40%, #e08888 100%)",
      padding: "20px 40px",
      display: "flex",
      flexDirection: "column",
    }}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isTyping && <TypingIndicator />}

      {/* Quick Questions section shown inside message area when no messages beyond welcome */}
      {quickQuestionsVisible && (
        <div style={{ marginTop: "auto", paddingTop: "20px" }} id="quick-questions-anchor" />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
