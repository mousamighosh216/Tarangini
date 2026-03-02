export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  const formatTime = (ts) => {
    const d = new Date(ts);
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  if (isUser) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "12px",
        padding: "0 4px",
      }}>
        <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{
            background: "linear-gradient(135deg, #e8928f, #d4787a)",
            borderRadius: "18px 18px 4px 18px",
            padding: "12px 16px",
            color: "#fff",
            fontSize: "14px",
            lineHeight: "1.55",
            boxShadow: "0 2px 8px rgba(232,146,143,0.3)",
          }}>
            {message.text}
          </div>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "5px", paddingRight: "4px" }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // AI Message
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "12px",
      padding: "0 4px",
    }}>
      <div style={{ maxWidth: "80%" }}>
        <div style={{
          background: "#fff",
          borderRadius: "4px 18px 18px 18px",
          padding: "16px 18px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        }}>
          <div style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "#aaa",
            letterSpacing: "0.4px",
            marginBottom: "8px",
          }}>
            AI Assistant
          </div>
          <div style={{
            fontSize: "14px",
            color: "#444",
            lineHeight: "1.65",
            whiteSpace: "pre-wrap",
          }}>
            {message.text}
          </div>
          <div style={{ fontSize: "11px", color: "#ccc", marginTop: "8px" }}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}
