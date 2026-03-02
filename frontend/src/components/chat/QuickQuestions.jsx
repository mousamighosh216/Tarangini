const CHIPS = [
  "What are early pregnancy signs?",
  "How to manage period cramps?",
  "Is my cycle normal?",
  "PCOS diet tips",
  "Benefits of cycle tracking",
  "When to see a gynecologist?",
];

export default function QuickQuestions({ onSelect, disabled }) {
  return (
    <div style={{
      background: "radial-gradient(circle at 20% 50%, #f5b8b0 0%, #e89898 40%, #e08888 100%)",
      padding: "0 40px 24px",
      flexShrink: 0,
    }}>
      <p style={{
        margin: "0 0 12px",
        fontSize: "13px",
        color: "rgba(255,255,255,0.85)",
        fontWeight: "500",
      }}>
        Quick questions:
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => !disabled && onSelect(chip)}
            disabled={disabled}
            style={{
              padding: "9px 18px",
              borderRadius: "25px",
              border: "none",
              background: disabled ? "rgba(255,255,255,0.6)" : "#fff",
              color: disabled ? "#bbb" : "#444",
              fontSize: "13px",
              fontWeight: "400",
              cursor: disabled ? "not-allowed" : "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              if (!disabled) {
                e.currentTarget.style.background = "#fdf0f0";
                e.currentTarget.style.color = "#e8928f";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(232,146,143,0.25)";
              }
            }}
            onMouseLeave={e => {
              if (!disabled) {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#444";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
              }
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
