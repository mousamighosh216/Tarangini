const SETTINGS = [
  {
    id: "account",
    label: "Account Settings",
    iconBg: "#f0faf5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
      </svg>
    ),
  },
  {
    id: "export",
    label: "Export My Data",
    iconBg: "#f0faf5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    id: "language",
    label: "Language & Region",
    iconBg: "#f0f8ff",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#70a8e8" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
  },
  {
    id: "darkmode",
    label: "Dark Mode",
    iconBg: "#f5f0ff",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9d8fd6" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
  },
  {
    id: "help",
    label: "Help & Support",
    iconBg: "#fff5f5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8928f" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

export default function SettingsCard() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      marginBottom: "16px",
    }}>
      <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "700", color: "#333" }}>
        Settings
      </h3>

      <div>
        {SETTINGS.map((s, i) => (
          <button
            key={s.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              width: "100%",
              padding: "15px 0",
              background: "none",
              border: "none",
              borderBottom: i < SETTINGS.length - 1 ? "1px solid #fdf5f5" : "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: s.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <span style={{ flex: 1, fontSize: "14px", color: "#333", fontWeight: "400" }}>
              {s.label}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
