export default function PCOSHealthScore({ profile }) {
  // Simple score calculation from profile data
  const cycleScore = profile?.cycleRegular === "yes" ? 85 : profile?.cycleRegular === "no" ? 55 : 72;
  const symptomScore = (() => {
    let s = 100;
    if (profile?.acne === "yes") s -= 12;
    if (profile?.hirsutism === "yes") s -= 15;
    if (profile?.skinDarkening === "yes") s -= 12;
    if (profile?.weightGain === "yes") s -= 10;
    return Math.max(s, 40);
  })();
  const lifestyleScore = (() => {
    let s = 80;
    if (profile?.fatigue === "yes") s -= 10;
    if (profile?.sugarCravings === "yes") s -= 10;
    if (Number(profile?.sleepHours) < 6) s -= 15;
    return Math.max(s, 40);
  })();

  const bars = [
    { label: "Cycle Regularity", score: cycleScore, color: "#e8928f" },
    { label: "Symptom Control", score: symptomScore, color: "#d4a0d4" },
    { label: "Lifestyle Score", score: lifestyleScore, color: "#7ab89a" },
  ];

  const avg = Math.round((cycleScore + symptomScore + lifestyleScore) / 3);

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span style={{ color: "#7ab89a", fontSize: "18px" }}>↗</span>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "600", color: "#333" }}>Your PCOS Health Score</h3>
        <div style={{
          marginLeft: "auto", width: "44px", height: "44px", borderRadius: "50%",
          background: avg >= 70 ? "#f0faf5" : "#fff5f5",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "700", fontSize: "14px",
          color: avg >= 70 ? "#5a9a7a" : "#e8928f",
        }}>{avg}</div>
      </div>

      {bars.map(bar => (
        <div key={bar.label} style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "13px", color: "#666" }}>{bar.label}</span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>{bar.score}%</span>
          </div>
          <div style={{ height: "8px", background: "#f5eeee", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "4px",
              width: `${bar.score}%`, background: bar.color,
              transition: "width 0.8s ease",
            }} />
          </div>
        </div>
      ))}

      <div style={{
        background: "#f5fff8", borderRadius: "10px", padding: "12px 16px",
        fontSize: "13px", color: "#5a9a7a",
      }}>
        ✨ {avg >= 70
          ? "Great progress! Keep maintaining your lifestyle habits."
          : "Your scores suggest some areas to focus on — check your recommendations below."}
      </div>
    </div>
  );
}
