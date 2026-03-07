import { useState } from "react";

const CORE_QUESTIONS = [
  { 
    id: "age", 
    label: "Age", 
    type: "number", 
    placeholder: "Enter your age", 
    min: 12, 
    max: 60, 
    unit: "years", 
    hint: "Hormonal patterns naturally evolve with age — this helps us personalize insights for you." 
  },

  { 
    id: "height", 
    label: "Height", 
    type: "number", 
    placeholder: "e.g. 165", 
    step: "0.1",
    min: 90, 
    max: 200,
    unit: "cm",
    hint: "Used along with weight to understand your overall metabolic profile." 
  },

  { 
    id: "weight", 
    label: "Weight", 
    type: "number", 
    placeholder: "e.g. 60", 
    step: "0.1",
    min: 20, 
    max: 200,
    unit: "kg",
    hint: "Helps us assess how your body may be responding to hormonal changes." 
  },

  { 
    id: "cycleRegular", 
    label: "Are your periods regular?", 
    type: "bool", 
    hint: "Cycle patterns give helpful insight into ovulation and overall reproductive health." 
  },

  { 
    id: "cycleLength", 
    label: "Average Cycle Length", 
    type: "number", 
    placeholder: "e.g. 28", 
    min: 1,
    unit: "days", 
    hint: "Cycle length can vary — this helps us understand your unique rhythm." 
  },

  { 
    id: "weightGain", 
    label: "Have you noticed recent weight changes?", 
    type: "bool", 
    hint: "Sudden changes can sometimes reflect shifts in metabolism or hormones." 
  },

  { 
    id: "hirsutism", 
    label: "Do you notice increased hair growth (face/body)?", 
    type: "bool", 
    hint: "Hair growth patterns can offer insight into androgen balance." 
  },

  { 
    id: "skinDarkening", 
    label: "Do you notice skin darkening in body folds?", 
    type: "bool", 
    hint: "Certain skin changes can be linked to how the body processes insulin." 
  },

  { 
    id: "acne", 
    label: "Do you experience persistent acne?", 
    type: "bool", 
    hint: "Skin health can sometimes reflect internal hormonal activity." 
  },
];

const EXTRA_QUESTIONS = [
  { section: "🩸 Menstrual Flow & Pain" },
  { id: "flowIntensity", label: "Flow Intensity", type: "select", options: ["Scanty", "Normal", "Very Heavy (clots)"] },
  { id: "painLevel", label: "Period Pain Level", type: "scale", hint: "Do you experience debilitating cramps? (1 = mild, 10 = severe)" },
  { id: "pmdd", label: "Do you experience severe mood swings / anxiety before periods?", type: "bool" },
  { section: "🍎 Lifestyle & Metabolic" },
  { id: "sleepHours", label: "Average hours of restful sleep", type: "number", placeholder: "e.g. 7", unit: "hrs" },
  { id: "fatigue", label: "Do you experience persistent fatigue or afternoon energy crashes?", type: "bool" },
  { id: "sugarCravings", label: "Do you have intense cravings for sugar or carbs?", type: "bool" },
  { section: "🧬 History & Family" },
  { id: "familyHistory", label: "Does a close relative (mother/sister) have PCOS or Type 2 Diabetes?", type: "bool" },
  { id: "prevDiagnosis", label: "Have you been told you have high blood pressure or borderline sugar?", type: "bool" },
];

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: "10px",
  border: "1.5px solid #f0e0e0", fontSize: "14px", color: "#444",
  outline: "none", background: "#fff", marginTop: "6px",
};

const boolStyle = (active, val) => ({
  flex: 1, padding: "10px 0", borderRadius: "10px", border: "1.5px solid",
  borderColor: active === val ? "#e8928f" : "#f0e0e0",
  background: active === val ? "#fff5f5" : "#fff",
  color: active === val ? "#e8928f" : "#888",
  fontWeight: active === val ? "600" : "400",
  cursor: "pointer", fontSize: "14px", transition: "all 0.15s",
});

export default function PCOSOnboardingPopup({ onComplete, onSkip }) {
  const [step, setStep] = useState(0); // 0 = core, 1 = extra
  const [coreData, setCoreData] = useState({});
  const [extraData, setExtraData] = useState({});
  const [coreIdx, setCoreIdx] = useState(0);

  const currentQ = CORE_QUESTIONS[coreIdx];
  const coreVal = coreData[currentQ?.id];

  const setCoreVal = (val) => setCoreData(p => ({ ...p, [currentQ.id]: val }));
  const setExtraVal = (id, val) => setExtraData(p => ({ ...p, [id]: val }));

  const canNextCore = coreVal !== undefined && coreVal !== "";

  const handleCoreNext = () => {
    if (coreIdx < CORE_QUESTIONS.length - 1) setCoreIdx(i => i + 1);
    else setStep(1);
  };

  const handleCoreBack = () => {
    if (coreIdx > 0) setCoreIdx(i => i - 1);
  };

  const handleSubmit = () => {
    onComplete({ ...coreData, ...extraData });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999,
    }}>
      <div style={{
        background: "#ffffff", borderRadius: "20px", width: "100%", maxWidth: "520px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(232,146,143,0.25)",
        padding: "0",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #e8928f, #d4787a)",
          borderRadius: "20px 20px 0 0", padding: "24px 28px",
          color: "#fff",
        }}>
          <div style={{ fontSize: "12px", opacity: 0.85, marginBottom: "6px", letterSpacing: "0.5px" }}>
            TARANGINI • PCOS HEALTH PROFILE
          </div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
            {step === 0 ? "Let's understand your health" : "A few more details (optional)"}
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: "13px", opacity: 0.9 }}>
            {step === 0
              ? `Question ${coreIdx + 1} of ${CORE_QUESTIONS.length} — Core Assessment`
              : "Help us personalise your insights"}
          </p>
          {/* Progress */}
          <div style={{ height: "4px", background: "rgba(255,255,255,0.3)", borderRadius: "2px", marginTop: "14px" }}>
            <div style={{
              height: "100%", borderRadius: "2px", background: "#fff",
              width: step === 0 ? `${((coreIdx + 1) / CORE_QUESTIONS.length) * 100}%` : "100%",
              transition: "width 0.3s",
            }} />
          </div>
        </div>

        <div style={{ padding: "28px" }}>
          {step === 0 && (
            <CoreQuestion
              question={currentQ}
              value={coreVal}
              onChange={setCoreVal}
            />
          )}

          {step === 1 && (
            <ExtraQuestions data={extraData} onChange={setExtraVal} />
          )}

          {/* Footer Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "28px" }}>
            {step === 0 && coreIdx > 0 && (
              <button onClick={handleCoreBack} style={{
                padding: "12px 20px", borderRadius: "12px",
                border: "1.5px solid #f0e0e0", background: "#fff",
                color: "#888", cursor: "pointer", fontSize: "14px",
              }}>← Back</button>
            )}

            {step === 0 && (
              <button
                onClick={handleCoreNext}
                disabled={!canNextCore}
                style={{
                  flex: 1, padding: "13px", borderRadius: "12px", border: "none",
                  background: canNextCore ? "#e8928f" : "#f5d8d7",
                  color: "#fff", fontWeight: "600", fontSize: "14px",
                  cursor: canNextCore ? "pointer" : "not-allowed",
                }}
              >
                {coreIdx < CORE_QUESTIONS.length - 1 ? "Next →" : "Continue to Health Details →"}
              </button>
            )}

            {step === 1 && (
              <>
                <button onClick={onSkip} style={{
                  flex: 1, padding: "13px", borderRadius: "12px",
                  border: "1.5px solid #f0e0e0", background: "#fff",
                  color: "#aaa", cursor: "pointer", fontSize: "14px",
                }}>Fill Later</button>
                <button onClick={handleSubmit} style={{
                  flex: 2, padding: "13px", borderRadius: "12px", border: "none",
                  background: "#e8928f", color: "#fff", fontWeight: "600",
                  fontSize: "14px", cursor: "pointer",
                }}>Save My Profile →</button>
              </>
            )}
          </div>

          {/* {step === 0 && (
            <button onClick={onSkip} style={{
              width: "100%", marginTop: "12px", padding: "10px",
              background: "none", border: "none", color: "#bbb",
              fontSize: "13px", cursor: "pointer", textDecoration: "underline",
            }}>
              Fill this later from PCOS Management page
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}

function CoreQuestion({ question, value, onChange }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: "600", fontSize: "16px", color: "#333", marginBottom: "6px" }}>
        {question.label}
      </label>
      <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "16px", lineHeight: "1.5" }}>
        {question.hint}
      </p>

      {question.type === "number" && (
        <div style={{ position: "relative" }}>
          <input
            type="number"
            step={question.step || 1}
            min={question.min}
            max={question.max}
            placeholder={question.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ 
              ...inputStyle, 
              paddingRight: question.unit ? "48px" : "14px" 
            }}
          />
          {question.unit && (
            <span style={{
              position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
              fontSize: "13px", color: "#ccc",
            }}>{question.unit}</span>
          )}
        </div>
      )}

      {question.type === "bool" && (
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={boolStyle(value, "yes")} onClick={() => onChange("yes")}>Yes</button>
          <button style={boolStyle(value, "no")} onClick={() => onChange("no")}>No</button>
          {/* <button style={boolStyle(value, "unsure")} onClick={() => onChange("unsure")}>Not Sure</button> */}
        </div>
      )}
    </div>
  );
}

function ExtraQuestions({ data, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {EXTRA_QUESTIONS.map((q, i) => {
        if (q.section) return (
          <div key={i} style={{
            fontSize: "13px", fontWeight: "700", color: "#e8928f",
            borderBottom: "1px solid #fde8e8", paddingBottom: "6px",
          }}>{q.section}</div>
        );

        return (
          <div key={q.id}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#444", marginBottom: "8px" }}>
              {q.label}
            </label>

            {q.type === "bool" && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={boolStyle(data[q.id], "yes")} onClick={() => onChange(q.id, "yes")}>Yes</button>
                <button style={boolStyle(data[q.id], "no")} onClick={() => onChange(q.id, "no")}>No</button>
              </div>
            )}

            {q.type === "select" && (
              <select
                value={data[q.id] || ""}
                onChange={e => onChange(q.id, e.target.value)}
                style={inputStyle}
              >
                <option value="">Select...</option>
                {q.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            )}

            {q.type === "number" && (
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  placeholder={q.placeholder}
                  value={data[q.id] || ""}
                  onChange={e => onChange(q.id, e.target.value)}
                  style={{ ...inputStyle, paddingRight: q.unit ? "48px" : "14px" }}
                />
                {q.unit && (
                  <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#ccc" }}>{q.unit}</span>
                )}
              </div>
            )}

            {q.type === "scale" && (
              <div>
                <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "10px" }}>{q.hint}</p>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button
                      key={n}
                      onClick={() => onChange(q.id, n)}
                      style={{
                        flex: 1, padding: "8px 0", borderRadius: "8px", border: "1.5px solid",
                        borderColor: data[q.id] === n ? "#e8928f" : "#f0e0e0",
                        background: data[q.id] === n ? "#fff5f5" : "#fff",
                        color: data[q.id] === n ? "#e8928f" : "#888",
                        fontWeight: data[q.id] === n ? "700" : "400",
                        cursor: "pointer", fontSize: "13px",
                      }}
                    >{n}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
