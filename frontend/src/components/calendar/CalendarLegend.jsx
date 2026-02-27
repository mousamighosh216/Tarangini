export default function CalendarLegend() {
  const items = [
    { color: "#fde8e8", border: "#f0c0c0", label: "Period" },
    { color: "#ede8ff", border: "#c8b8f8", label: "Ovulation" },
    { color: "#e8928f", border: "#e8928f", label: "Today", text: "#fff" },
  ];

  return (
    <div style={{
      background: "#fff", borderRadius: "12px", padding: "14px 20px",
      display: "flex", alignItems: "center", gap: "20px",
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    }}>
      {items.map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "20px", height: "20px", borderRadius: "6px",
            background: item.color, border: `1.5px solid ${item.border}`,
          }} />
          <span style={{ fontSize: "13px", color: "#666" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
