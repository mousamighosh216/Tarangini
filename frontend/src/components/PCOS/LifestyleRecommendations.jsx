const RECOMMENDATIONS = [
  {
    emoji: "🍎",
    title: "Balanced Diet",
    desc: "Focus on low-GI foods and lean proteins for hormone balance",
    color: "#f0faf5",
    iconColor: "#7ab89a",
  },
  {
    emoji: "🏃",
    title: "Regular Exercise",
    desc: "30 minutes of activity, 5 days a week to manage symptoms",
    color: "#fff5f5",
    iconColor: "#e8928f",
  },
  {
    emoji: "🌙",
    title: "Quality Sleep",
    desc: "Aim for 7–8 hours of restful sleep for hormonal recovery",
    color: "#f5f0ff",
    iconColor: "#9d8fd6",
  },
  {
    emoji: "🧘",
    title: "Stress Management",
    desc: "Cortisol spikes worsen insulin resistance — try mindful breathing",
    color: "#fff8f0",
    iconColor: "#e8b870",
  },
  {
    emoji: "💧",
    title: "Stay Hydrated",
    desc: "8 glasses of water daily supports detox and hormonal flush",
    color: "#f0f8ff",
    iconColor: "#70a8e8",
  },
];

export default function LifestyleRecommendations({ profile }) {
  // Add personalized tip based on profile
  const extras = [];
  if (profile?.sugarCravings === "yes") {
    extras.push({
      emoji: "🍬",
      title: "Blood Sugar Tip",
      desc: "Stabilise blood glucose with protein-first meals to curb sugar spikes",
      color: "#fff5f5", iconColor: "#e87070",
    });
  }
  if (profile?.fatigue === "yes") {
    extras.push({
      emoji: "⚡",
      title: "Manage PCOS Fatigue",
      desc: "Short movement breaks and consistent sleep-wake times can reduce crashes",
      color: "#fffbea", iconColor: "#e8c040",
    });
  }

  const all = [...RECOMMENDATIONS, ...extras];

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: "17px", fontWeight: "600", color: "#333" }}>
        Lifestyle Recommendations
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {all.map((rec, i) => (
          <div
            key={i}
            style={{
              display: "flex", gap: "16px", alignItems: "flex-start",
              padding: "14px", borderRadius: "12px", background: rec.color,
            }}
          >
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: "#fff", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "22px", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              {rec.emoji}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>{rec.title}</div>
              <div style={{ fontSize: "12px", color: "#888", marginTop: "3px", lineHeight: "1.5" }}>{rec.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
