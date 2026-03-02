import { useState } from "react";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarLegend from "../components/calendar/CalendarLegend";
import DateDetailsPanel from "../components/calendar/DateDetailsPanel";
import PredictionsPanel from "../components/calendar/PredictionsPanel";
import GoogleCalendarConnect from "../components/google/GoogleCalendarConnect";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ padding: "32px" }}>

      {/* ===== Header ===== */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "26px",
          fontWeight: "700",
          color: "#333"
        }}>
          Cycle Calendar
        </h1>

        {/* ⭐ Google Connect Button */}

        <div style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "10px 16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <GoogleCalendarConnect />
        </div>
      </div>

      {/* ===== Main Layout ===== */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: "24px"
      }}>

        {/* ---------- LEFT: Calendar ---------- */}

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <CalendarLegend />
          <CalendarGrid
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>

        {/* ---------- RIGHT: Details Panel ---------- */}

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {selectedDate ? (
            <DateDetailsPanel date={selectedDate} />
          ) : (
            <div style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              textAlign: "center",
              color: "#bbb",
              fontSize: "14px"
            }}>
              Select a date to log symptoms
            </div>
          )}

          <PredictionsPanel />
        </div>
      </div>
    </div>
  );
}