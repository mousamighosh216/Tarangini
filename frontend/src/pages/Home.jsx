import { useState, useEffect } from "react";
import CycleSummary from "../components/home/CycleSummary";
import QuickActions from "../components/home/QuickActions";
import { useCycle } from "../context/CycleContext";
import CollapsibleChat from "../components/collapsiblechat/Collapsiblechat";

const moods = [
  { label: "Energetic", icon: "☀️", bg: "#fffbea" },
  { label: "Happy", icon: "🤍", bg: "#fff5f5" },
  { label: "Calm", icon: "🌥️", bg: "#f0fff8" },
  { label: "Low", icon: "🌙", bg: "#f5f0ff" },
];

export default function Home({ onNavigate, userName }) {
  const { today, cycleDay, cycleLength } = useCycle();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div
        style={{
          background: "linear-gradient(135deg, #e8928f 0%, #d4787a 100%)",
          padding: isMobile ? "20px 16px" : "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: isMobile ? "22px" : "28px",
              fontWeight: "700",
            }}
          >
            Hello, {userName || "Beautiful"}
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              color: "rgba(255,255,255,0.85)",
              fontSize: isMobile ? "12px" : "14px",
            }}
          >
            {dayName}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: isMobile ? "16px" : "20px",
            }}
          >
            Cycle Day {cycleDay}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: isMobile ? "11px" : "13px",
            }}
          >
            of {cycleLength} days
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: isMobile ? "16px" : "28px 32px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
          gap: isMobile ? "16px" : "24px",
        }}
      >
        {/* ---------- LEFT COLUMN ---------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "14px" : "20px" }}>
          {/* Cycle Summary */}
          <CycleSummary />

          {/* ===== Mood Tracker ===== */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: isMobile ? "16px" : "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: isMobile ? "14px" : "20px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                How are you feeling?
              </h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8c0c0"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: isMobile ? "8px" : "12px",
            }}>
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  style={{
                    padding: isMobile ? "12px 4px" : "16px 8px",
                    borderRadius: "14px",
                    border:
                      selectedMood === mood.label
                        ? "2px solid #e8928f"
                        : "2px solid transparent",
                    background: mood.bg,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: isMobile ? "20px" : "24px" }}>{mood.icon}</span>
                  <span style={{ fontSize: isMobile ? "10px" : "12px", color: "#888" }}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ===== Health Insights ===== */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: isMobile ? "16px" : "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "600",
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#7ab89a" }}>↗</span>
              Health Insights
            </h3>
            <div
              style={{
                background: "#f5fff8",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <p style={{ margin: "0 0 4px", fontWeight: "500", color: "#333", fontSize: "14px" }}>
                💧 Stay hydrated during ovulation
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                Drinking 8 glasses of water helps with hormonal balance
              </p>
            </div>
            <div
              style={{
                background: "#fff8f5",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <p style={{ margin: "0 0 4px", fontWeight: "500", color: "#333", fontSize: "14px" }}>
                🧘 Your cycle is regular
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                You've been consistent for 3 months. Great job!
              </p>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT COLUMN ---------- */}
        <QuickActions onNavigate={onNavigate} isMobile={isMobile} />
      </div>

      {/* ===== Collapsible AI Chat (floating bubble) ===== */}
      <CollapsibleChat />
    </div>
  );
}
