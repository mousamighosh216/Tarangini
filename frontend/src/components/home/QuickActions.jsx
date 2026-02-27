export default function QuickActions({ onNavigate }) {
  const actions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0a0c0" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      label: "AI Scanner",
      sublabel: "Upload reports for PCOS analysis",
      page: "ai-scanner",
      bg: "#faf0fa",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8a0a0" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      label: "PCOS Care",
      sublabel: "Specialized tracking and insights",
      page: "home",
      bg: "#fff5f5",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8a0a0" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      label: "Ask AI Assistant",
      sublabel: "Get health questions answered",
      page: "chat",
      bg: "#fff5f5",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ab89a" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: "Find Doctors",
      sublabel: "Book nearby gynecologists",
      page: "doctors",
      bg: "#f0faf5",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Log Symptoms CTA */}
      <button
        onClick={() => onNavigate("calendar")}
        style={{
          background: "#e8928f",
          borderRadius: "16px", border: "none", cursor: "pointer",
          padding: "20px", color: "#fff", textAlign: "center",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        <div style={{ fontSize: "22px", marginBottom: "6px" }}>+</div>
        <div style={{ fontWeight: "600", fontSize: "15px" }}>Log Today's Symptoms</div>
        <div style={{ fontSize: "12px", opacity: 0.85, marginTop: "2px" }}>Quick entry</div>
      </button>

      {/* Action Cards */}
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => onNavigate(action.page)}
          style={{
            background: "#fff", borderRadius: "14px", border: "1px solid #f5e8e8",
            padding: "16px", cursor: "pointer", textAlign: "left",
            display: "flex", alignItems: "center", gap: "14px",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,146,143,0.15)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: action.bg, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {action.icon}
          </div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>{action.label}</div>
            <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>{action.sublabel}</div>
          </div>
        </button>
      ))}

      {/* Today's Tip */}
      <div style={{
        background: "linear-gradient(135deg, #d4a0d4, #c890c0)",
        borderRadius: "14px", padding: "16px", color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
          <span>💡</span>
          <span style={{ fontWeight: "600", fontSize: "13px" }}>Today's Tip</span>
        </div>
        <p style={{ margin: 0, fontSize: "12px", lineHeight: "1.6", opacity: 0.95 }}>
          Light exercise during ovulation can help reduce bloating and boost energy levels. Try a 30-minute walk!
        </p>
      </div>
    </div>
  );
}
