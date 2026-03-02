import { useState } from "react";

const ALL_SYMPTOMS = [
  { id: "irregularPeriods", label: "Irregular periods" },
  { id: "acne", label: "Acne" },
  { id: "weightChanges", label: "Weight changes" },
  { id: "hairGrowth", label: "Hair growth (hirsutism)" },
  { id: "moodSwings", label: "Mood swings" },
  { id: "fatigue", label: "Fatigue" },
  { id: "skinDarkening", label: "Skin darkening" },
  { id: "hairLoss", label: "Hair loss / thinning" },
  { id: "pelvicPain", label: "Pelvic pain" },
  { id: "bloating", label: "Bloating" },
  { id: "sleepIssues", label: "Sleep issues" },
  { id: "sugarCravings", label: "Sugar cravings" },
];

function CheckIcon({ checked }) {
  return (
    <div style={{
      width: "24px", height: "24px", borderRadius: "50%",
      border: `2px solid ${checked ? "#7ab89a" : "#ddd"}`,
      background: checked ? "#f0faf5" : "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, transition: "all 0.2s",
    }}>
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#7ab89a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

export default function SymptomTracker({ profile }) {
  const initialChecked = {};
  if (profile) {
    if (profile.acne === "yes") initialChecked.acne = true;
    if (profile.hirsutism === "yes") initialChecked.hairGrowth = true;
    if (profile.skinDarkening === "yes") initialChecked.skinDarkening = true;
    if (profile.weightGain === "yes") initialChecked.weightChanges = true;
    if (profile.fatigue === "yes") initialChecked.fatigue = true;
    if (profile.cycleRegular === "no") initialChecked.irregularPeriods = true;
    if (profile.pmdd === "yes") initialChecked.moodSwings = true;
    if (profile.sugarCravings === "yes") initialChecked.sugarCravings = true;
  }

  const [checked, setChecked] = useState(initialChecked);
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setChecked(p => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Split into 2 columns
  const left = ALL_SYMPTOMS.filter((_, i) => i % 2 === 0);
  const right = ALL_SYMPTOMS.filter((_, i) => i % 2 !== 0);

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "600", color: "#333" }}>Symptom Tracker</h3>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8928f" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
        <div>
          {left.map(s => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                width: "100%", padding: "12px 8px",
                borderBottom: "1px solid #fdf5f5", border: "none",
                background: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <CheckIcon checked={!!checked[s.id]} />
              <span style={{ fontSize: "13px", color: "#555" }}>{s.label}</span>
            </button>
          ))}
        </div>
        <div>
          {right.map(s => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                width: "100%", padding: "12px 8px",
                borderBottom: "1px solid #fdf5f5", border: "none",
                background: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <CheckIcon checked={!!checked[s.id]} />
              <span style={{ fontSize: "13px", color: "#555" }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        style={{
          width: "100%", marginTop: "20px", padding: "13px",
          background: saved ? "#7ab89a" : "#e8928f",
          color: "#fff", border: "none", borderRadius: "25px",
          fontSize: "14px", fontWeight: "600", cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        {saved ? "✓ Symptoms Saved!" : "Update Symptoms"}
      </button>
    </div>
  );
}
