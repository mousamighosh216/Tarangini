import { useCycle } from "../../context/CycleContext";

export default function CycleSummary() {
  const { cycleDay, cycleLength, nextPeriod, today } = useCycle();
  const progress = (cycleDay / cycleLength) * 100;

  const daysUntilPeriod = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#333" }}>Current Cycle Phase</h2>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#999" }}>Day {cycleDay} of {cycleLength}</p>
        </div>
        <button style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: "#f0eeff", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9d8fd6" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: "8px", background: "#f0e8e8", borderRadius: "4px",
        marginBottom: "20px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(90deg, #e8928f, #f0a0a0)",
          borderRadius: "4px", transition: "width 0.3s ease",
        }} />
      </div>

      {/* Ovulation Window */}
      <div style={{
        background: "#f0eeff", borderRadius: "12px", padding: "16px",
        marginBottom: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "18px" }}>💧</span>
          <span style={{ fontWeight: "600", color: "#6650c0", fontSize: "15px" }}>Ovulation Window</span>
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: "#7a6baa" }}>
          You're in your fertile window. Track symptoms for better insights.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{
          flex: 1, background: "#fff5f5", borderRadius: "12px", padding: "16px",
          border: "1px solid #fde8e8",
        }}>
          <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#aaa" }}>Next period in</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "28px", fontWeight: "700", color: "#e8928f" }}>{daysUntilPeriod}</span>
              <span style={{ fontSize: "13px", color: "#ccc", display: "block" }}>days</span>
            </div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8c0c0" strokeWidth="1.5">
              <path d="M12 2a10 10 0 000 20 10 10 0 000-20z"/><path d="M12 8v4l2 2"/>
            </svg>
          </div>
        </div>

        <div style={{
          flex: 1, background: "#f5f0ff", borderRadius: "12px", padding: "16px",
          border: "1px solid #ede8ff",
        }}>
          <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#aaa" }}>Cycle regularity</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "28px", fontWeight: "700", color: "#9d8fd6" }}>94%</span>
              <span style={{ fontSize: "13px", color: "#ccc", display: "block" }}>score</span>
            </div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c0b0e8" strokeWidth="1.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
