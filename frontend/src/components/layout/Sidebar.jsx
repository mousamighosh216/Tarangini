export default function Sidebar({ currentPage, onNavigate }) {
const navItems = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },

  {
    id: "calendar",
    label: "Calendar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },

  {
    id: "pcos",
    label: "PCOS Care",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z"/>
        <circle cx="12" cy="11" r="3"/>
      </svg>
    )
  },

  {
    id: "lounge",
    label: "Lounge",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )
  },

  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  }
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
    
    {/* Your logo image */}
    <img
      src="./src/assets/logo.png"
      alt="Tarangini Logo"
      style={{
        width: "150px",
        height: "70px",

      }}
    />

   

  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      background: "#f0faf5",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "11px",
      color: "#5a9a7a",
    }}
  >
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
