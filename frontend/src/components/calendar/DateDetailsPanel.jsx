import { useState } from "react";
import { useCycle } from "../../context/CycleContext";

export default function DateDetailsPanel({ date }) {
  const { saveSymptoms, loggedSymptoms } = useCycle();
  const dateKey = date ? date.toISOString().split("T")[0] : null;
  const existing = dateKey ? (loggedSymptoms[dateKey] || {}) : {};

  const [flow, setFlow] = useState(existing.flow || null);
  const [symptoms, setSymptoms] = useState(existing.symptoms || []);
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (s) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setSaved(false);
  };

  const handleSave = () => {
    if (dateKey) {
      saveSymptoms(dateKey, { flow, symptoms });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const flows = ["Light", "Medium", "Heavy"];
  const symptomsList = ["Cramps", "Bloating", "Headache", "Fatigue"];

  const formatDate = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "600", color: "#333" }}>{formatDate(date)}</h3>
        <button style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "#e8928f", border: "none", cursor: "pointer",
          color: "#fff", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
        }}>+</button>
      </div>

      {/* Flow Intensity */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#aaa" }}>Flow intensity</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {flows.map(f => (
            <button
              key={f}
              onClick={() => { setFlow(f); setSaved(false); }}
              style={{
                padding: "10px 14px", borderRadius: "25px", border: "1px solid",
                borderColor: flow === f ? "#e8928f" : "#f0e8e8",
                background: flow === f ? "#fff5f5" : "#fff",
                color: flow === f ? "#e8928f" : "#666",
                fontSize: "13px", cursor: "pointer", textAlign: "left",
                fontWeight: flow === f ? "600" : "400",
                transition: "all 0.15s",
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#aaa" }}>Symptoms</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {symptomsList.map(s => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              style={{
                padding: "10px 14px", borderRadius: "25px", border: "1px solid",
                borderColor: symptoms.includes(s) ? "#e8928f" : "#f0e8e8",
                background: symptoms.includes(s) ? "#fff5f5" : "#fff",
                color: symptoms.includes(s) ? "#e8928f" : "#666",
                fontSize: "13px", cursor: "pointer", textAlign: "left",
                fontWeight: symptoms.includes(s) ? "600" : "400",
                transition: "all 0.15s",
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          width: "100%", padding: "13px",
          background: saved ? "#7ab89a" : "#e8928f",
          color: "#fff", border: "none", borderRadius: "25px",
          fontSize: "14px", fontWeight: "600", cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        {saved ? "✓ Saved!" : "Save Entry"}
      </button>
    </div>
  );
}
