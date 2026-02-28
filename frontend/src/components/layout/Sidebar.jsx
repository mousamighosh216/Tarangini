export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { id: "calendar", label: "Calendar", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )},
    { id: "ai-scanner", label: "AI Scanner", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
    { id: "chat", label: "Chat", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )},
    { id: "doctors", label: "Doctors", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    )},
    { id: "profile", label: "Profile", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    )},
  ];

  return (
    <aside style={{
      width: "200px",
      minHeight: "100vh",
      background: "#fff",
      borderRight: "1px solid #f0e8e8",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #f5eded" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <svg width="40" height="40" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="none" stroke="#e8a0a0" strokeWidth="1.5"/>
            <path d="M25 8 C18 14 14 20 16 28 C18 34 22 38 25 40 C28 38 32 34 34 28 C36 20 32 14 25 8Z" fill="none" stroke="#e8a0a0" strokeWidth="1.5"/>
            <path d="M15 20 C18 22 22 23 25 22 C28 23 32 22 35 20" fill="none" stroke="#e8a0a0" strokeWidth="1"/>
          </svg>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#c47a7a", fontStyle: "italic" }}>Tarangini</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "#f0faf5", borderRadius: "20px", padding: "5px 10px",
          fontSize: "11px", color: "#5a9a7a",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Data Encrypted
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              width: "100%", padding: "10px 14px", marginBottom: "4px",
              borderRadius: "10px", border: "none", cursor: "pointer",
              background: currentPage === item.id ? "#e8928f" : "transparent",
              color: currentPage === item.id ? "#fff" : "#888",
              fontSize: "14px", fontWeight: currentPage === item.id ? "500" : "400",
              textAlign: "left", transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (currentPage !== item.id) e.currentTarget.style.background = "#fdf0f0"; }}
            onMouseLeave={e => { if (currentPage !== item.id) e.currentTarget.style.background = "transparent"; }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #f5eded", textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "#bbb", lineHeight: "1.5" }}>
          Tarangini v1.0.0<br/>
          Made with <span style={{ color: "#e8928f" }}>♥</span> for wellness
        </p>
      </div>
    </aside>
  );
}
