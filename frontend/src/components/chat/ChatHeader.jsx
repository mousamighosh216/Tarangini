export default function ChatHeader() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #e8928f 0%, #d4a0d4 60%, #c8b0e8 100%)",
      padding: "28px 32px 32px",
      flexShrink: 0,
    }}>
      <h1 style={{
        margin: "0 0 6px",
        fontSize: "26px",
        fontWeight: "700",
        color: "#fff",
      }}>
        Health Assistant
      </h1>
      <p style={{
        margin: "0 0 18px",
        fontSize: "14px",
        color: "rgba(255,255,255,0.88)",
      }}>
        Ask me anything about women's health
      </p>

      {/* Private & Confidential badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        background: "rgba(255,255,255,0.25)",
        borderRadius: "25px",
        padding: "7px 16px",
        backdropFilter: "blur(4px)",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.95)", fontWeight: "500" }}>
          Private &amp; Confidential
        </span>
      </div>
    </div>
  );
}
