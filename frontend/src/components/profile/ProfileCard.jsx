export default function ProfileCard({ userName }) {
  const initial = userName ? userName.charAt(0).toUpperCase() : "A";

  const stats = [
    { value: "12", label: "Cycles Tracked" },
    { value: "28 days", label: "Avg. Cycle Length" },
    { value: "Jan 2026", label: "Data Since" },
    { value: "45 days", label: "Streak" },
  ];

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "28px 24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      {/* Avatar */}
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #c8b0e8, #b090d0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: "700",
        color: "#fff",
        marginBottom: "14px",
        flexShrink: 0,
      }}>
        {initial}
      </div>

      <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "700", color: "#333" }}>
        {userName || "Anjali"}
      </h2>
      <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#aaa" }}>anjali@example.com</p>
      <p style={{ margin: "0 0 20px", fontSize: "12px", color: "#ccc" }}>Member since Jan 2026</p>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1px",
        width: "100%",
        background: "#f5eeee",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff",
            padding: "14px 8px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#e8928f" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#bbb", marginTop: "3px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Data Management */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: "600", color: "#333", textAlign: "left" }}>
          Data Management
        </h3>

        <button style={{
          width: "100%", marginBottom: "8px", padding: "12px 16px",
          background: "#f0faf5", border: "1px solid #d0eedd",
          borderRadius: "10px", cursor: "pointer", textAlign: "left",
          display: "flex", alignItems: "center", gap: "10px",
          transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#333" }}>Download Your Data</div>
            <div style={{ fontSize: "11px", color: "#aaa" }}>Export all health records</div>
          </div>
        </button>

        <button style={{
          width: "100%", padding: "12px 16px",
          background: "#fff5f5", border: "1px solid #f5d0d0",
          borderRadius: "10px", cursor: "pointer", textAlign: "left",
          display: "flex", alignItems: "center", gap: "10px",
          transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e87070" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#e87070" }}>Delete All Data</div>
            <div style={{ fontSize: "11px", color: "#aaa" }}>Permanently remove account</div>
          </div>
        </button>
      </div>
    </div>
  );
}
