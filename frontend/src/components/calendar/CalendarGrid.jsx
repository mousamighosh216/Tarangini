import { useState } from "react";
import { useCycle } from "../../context/CycleContext";

export default function CalendarGrid({ onDateSelect, selectedDate }) {
  const { isPeriodDay, isOvulationDay, isToday } = useCycle();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

  const isSameDay = (a, b) => a && b && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {/* Month Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "24px" }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "18px" }}>‹</button>
        <span style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>{monthName}</span>
        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "18px" }}>›</button>
      </div>

      {/* Weekday Headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: "12px", color: "#bbb", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {days.map((date, i) => {
          if (!date) return <div key={i} />;

          const today = isToday(date);
          const period = isPeriodDay(date);
          const ovulation = isOvulationDay(date);
          const selected = isSameDay(date, selectedDate);

          let bg = "transparent";
          let color = "#444";
          let border = "1px solid #f0eeee";

          if (today) { bg = "#e8928f"; color = "#fff"; border = "none"; }
          else if (selected) { bg = "#fff0f0"; border = "1.5px solid #e8928f"; }
          else if (period) { bg = "#fde8e8"; color = "#e8928f"; border = "none"; }
          else if (ovulation) { bg = "#ede8ff"; color = "#9d8fd6"; border = "none"; }

          return (
            <button
              key={i}
              onClick={() => onDateSelect(date)}
              style={{
                aspectRatio: "1", borderRadius: "10px", border,
                background: bg, color, cursor: "pointer",
                fontSize: "14px", fontWeight: today ? "700" : "400",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "2px", transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!today) e.currentTarget.style.background = today ? bg : "#fdf0f0"; }}
              onMouseLeave={e => { e.currentTarget.style.background = bg; }}
            >
              {date.getDate()}
              {(period || ovulation) && !today && (
                <span style={{ fontSize: "7px", opacity: 0.6 }}>◇</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
