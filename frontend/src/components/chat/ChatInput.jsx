import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div style={{
      background: "#fff",
      borderTop: "1px solid #f5eaea",
      padding: "14px 24px",
      flexShrink: 0,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "#fdf8f8",
        border: "1.5px solid #f0e0e0",
        borderRadius: "14px",
        padding: "6px 6px 6px 18px",
        transition: "border-color 0.2s",
      }}
        onFocusCapture={e => e.currentTarget.style.borderColor = "#e8928f"}
        onBlurCapture={e => e.currentTarget.style.borderColor = "#f0e0e0"}
      >
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask about your health..."
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontSize: "14px",
            color: "#444",
            outline: "none",
            padding: "6px 0",
            fontFamily: "inherit",
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            background: canSend
              ? "linear-gradient(135deg, #e8928f, #d4787a)"
              : "#f0e8e8",
            cursor: canSend ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={canSend ? "#fff" : "#ddd"} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      {/* Disclaimer */}
      <p style={{
        textAlign: "center",
        fontSize: "11px",
        color: "#ccc",
        margin: "10px 0 0",
      }}>
        AI responses are for informational purposes only. Consult a doctor for medical advice.
      </p>
    </div>
  );
}
