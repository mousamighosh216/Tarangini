import { useState } from "react";
import PCOSAIScanner from "./PCOSAIScanner";

const DEFAULT_GOALS = [
  "Log breakfast and lunch",
  "30-minute walk",
  "8 glasses of water",
  "Track evening meal",
];

export default function PCOSRightPanel() {
  const [goals, setGoals] = useState(DEFAULT_GOALS.map(g => ({ label: g, done: false })));

  const toggleGoal = (i) => setGoals(prev => prev.map((g, idx) => idx === i ? { ...g, done: !g.done } : g));

  const weekly = [
    { day: "Mon", pct: 85 },
    { day: "Tue", pct: 90 },
    { day: "Wed", pct: 78 },
    { day: "Thu", pct: 82 },
    { day: "Fri", pct: 70 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Today's Goals */}
      <div style={{
        background: "linear-gradient(135deg, #d4a0d4, #c890c0)",
        borderRadius: "16px", padding: "20px",
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#fff" }}>Today's Goals</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {goals.map((g, i) => (
            <button
              key={i}
              onClick={() => toggleGoal(i)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "rgba(255,255,255,0.22)", border: "none",
                borderRadius: "10px", padding: "10px 14px", cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.8)",
                background: g.done ? "rgba(255,255,255,0.9)" : "transparent",
                flexShrink: 0, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {g.done && <span style={{ fontSize: "10px", color: "#c890c0" }}>✓</span>}
              </div>
              <span style={{
                fontSize: "13px", color: "rgba(255,255,255,0.95)",
                textDecoration: g.done ? "line-through" : "none",
                opacity: g.done ? 0.7 : 1,
              }}>{g.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Scanner */}
      <PCOSAIScanner />

      {/* Weekly Progress */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "600", color: "#333" }}>Weekly Progress</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {weekly.map(w => (
            <div key={w.day} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#aaa", width: "28px" }}>{w.day}</span>
              <div style={{ flex: 1, height: "6px", background: "#f5eeee", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "3px",
                  width: `${w.pct}%`, background: "#7ab89a",
                  transition: "width 0.8s ease",
                }} />
              </div>
              <span style={{ fontSize: "12px", color: "#888", width: "32px", textAlign: "right" }}>{w.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
