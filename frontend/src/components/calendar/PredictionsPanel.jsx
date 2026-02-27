import { useCycle } from "../../context/CycleContext";

export default function PredictionsPanel() {
  const { nextPeriod, fertileStart, fertileEnd, today } = useCycle();

  const daysUntil = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));
  const formatDate = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const fertileNow = today >= fertileStart && today <= fertileEnd;

  return (
    <div style={{
      background: "linear-gradient(135deg, #e8928f, #d47878)",
      borderRadius: "16px", padding: "20px", color: "#fff",
    }}>
      <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "600" }}>Upcoming Predictions</h3>

      <div style={{
        background: "rgba(255,255,255,0.2)", borderRadius: "12px",
        padding: "14px", marginBottom: "10px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M12 2a10 10 0 000 20 10 10 0 000-20z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "600", fontSize: "13px" }}>Next Period</div>
          <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "2px" }}>{formatDate(nextPeriod)}</div>
        </div>
        <span style={{ fontWeight: "700", fontSize: "14px" }}>{daysUntil} days</span>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.2)", borderRadius: "12px",
        padding: "14px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "600", fontSize: "13px" }}>Fertile Window</div>
          <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "2px" }}>
            {fertileStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–{fertileEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
        <span style={{ fontWeight: "700", fontSize: "14px" }}>{fertileNow ? "now" : ""}</span>
      </div>
    </div>
  );
}
