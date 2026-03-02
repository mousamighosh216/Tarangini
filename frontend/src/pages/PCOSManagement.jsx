import PCOSHealthScore from "../components/pcos/PCOSHealthScore";
import SymptomTracker from "../components/pcos/SymptomTracker";
import LifestyleRecommendations from "../components/pcos/LifestyleRecommendations";
import PCOSRightPanel from "../components/pcos/PCOSRightPanel";

export default function PCOSManagement({ profile, onBack }) {
  return (
    <div>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #d4a0d4 0%, #c890c0 50%, #e8928f 100%)",
        padding: "24px 32px",
        display: "flex", alignItems: "center", gap: "16px",
      }}>
        <button
          onClick={onBack}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(255,255,255,0.25)", border: "none",
            cursor: "pointer", color: "#fff", fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >←</button>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#fff" }}>PCOS Management</h1>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>
            Track symptoms and get personalised insights for better health
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: "28px 32px",
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: "24px",
        alignItems: "start",
      }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <PCOSHealthScore profile={profile} />
          <SymptomTracker profile={profile} />
          <LifestyleRecommendations profile={profile} />
        </div>

        {/* Right Column */}
        <PCOSRightPanel />
      </div>
    </div>
  );
}
