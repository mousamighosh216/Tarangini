import { useState } from "react";

export default function PersonalizationPage({ onComplete }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to continue.");
      return;
    }
    setError("");
    onComplete(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fdf4f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "52px 52px 48px",
        width: "100%",
        maxWidth: "560px",
        boxShadow: "0 8px 40px rgba(232,146,143,0.12)",
      }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <span style={{ fontSize: "28px" }}>✦</span>
          <h1 style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "700",
            color: "#222",
            letterSpacing: "-0.3px",
          }}>
            Let's personalize
          </h1>
        </div>
        <p style={{
          margin: "0 0 36px",
          fontSize: "15px",
          color: "#888",
          lineHeight: "1.5",
        }}>
          Help us understand you better for accurate predictions
        </p>

        {/* Name Field */}
        <label style={{
          display: "block",
          fontSize: "15px",
          fontWeight: "500",
          color: "#333",
          marginBottom: "10px",
        }}>
          Your name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
          onKeyDown={handleKey}
          autoFocus
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: "14px",
            border: error ? "1.5px solid #e8928f" : "1.5px solid #f0e8e8",
            background: "#fdf8f8",
            fontSize: "15px",
            color: "#333",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
            fontFamily: "inherit",
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = "#e8928f"; }}
          onBlur={e => { if (!error) e.target.style.borderColor = "#f0e8e8"; }}
        />
        {error && (
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#e8928f" }}>{error}</p>
        )}

        {/* Complete Setup Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            marginTop: "32px",
            padding: "18px",
            borderRadius: "14px",
            border: "none",
            background: name.trim() ? "#e8928f" : "#f0c8c8",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: name.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s, transform 0.1s",
          }}
          onMouseEnter={e => { if (name.trim()) e.currentTarget.style.background = "#d4787a"; }}
          onMouseLeave={e => { if (name.trim()) e.currentTarget.style.background = "#e8928f"; }}
          onMouseDown={e => { if (name.trim()) e.currentTarget.style.transform = "scale(0.99)"; }}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Complete Setup
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
