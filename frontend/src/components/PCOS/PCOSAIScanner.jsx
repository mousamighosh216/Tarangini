import { useState, useRef } from "react";

// 🔹 Mock predictive model (replace with real API later)
function simulatePredictiveModel(filename) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pcos_probability: 0.72,
        risk_tier: "Moderate-High",
        rotterdam_flags: {
          oligo_anovulation: true,
          hyperandrogenism: true,
          polycystic_ovaries: false,
        },
        biomarker_flags: [
          { marker: "LH/FSH Ratio", value: "2.8", status: "elevated", normal_range: "< 2.0" },
          { marker: "Free Testosterone", value: "4.1 pg/mL", status: "elevated", normal_range: "< 2.5 pg/mL" },
          { marker: "Fasting Insulin", value: "18 μU/mL", status: "borderline", normal_range: "< 15 μU/mL" },
          { marker: "AMH", value: "6.2 ng/mL", status: "elevated", normal_range: "1.0–3.5 ng/mL" },
        ],
        priority_warnings: [
          "Elevated androgens detected — consistent with PCOS",
          "Borderline insulin resistance — consider dietary intervention",
        ],
        recommendations: [
          "Consult a reproductive endocrinologist",
          "Low-GI diet + resistance training recommended",
          "Re-test fasting insulin after 3 months",
        ],
        confidence_note: "Prediction is based on clinical datasets. Not a diagnosis.",
      });
    }, 2800);
  });
}

export default function PCOSAIScanner() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const inputRef = useRef();

  // ================= FILE HANDLING =================

  const handleFile = (f) => {
    if (!f) return;

    if (f.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(f);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const f = e.dataTransfer?.files?.[0];
    handleFile(f);
  };

  // ================= ANALYZE =================

  const handleAnalyze = async () => {

    // ⭐ CRITICAL SAFETY CHECK
    if (!file?.name) {
      alert("Please upload a report first.");
      return;
    }

    setLoading(true);

    try {
      const res = await simulatePredictiveModel(file.name);
      setResult(res);
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const riskColor =
    result?.risk_tier?.includes("High") ? "#e8928f" : "#e8c070";

  // ================= UI =================

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    }}>

      {/* Header */}
      <h3 style={{ margin: "0 0 10px", fontSize: "15px" }}>
        AI Scanner
      </h3>

      <p style={{ fontSize: "12px", color: "#bbb" }}>
        Upload a PDF lab report for predictive PCOS analysis.
      </p>

      {/* ===== Drop Zone ===== */}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#e8928f" : "#f0e0e0"}`,
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "#fff5f5" : "#fdf8f8",
          marginBottom: "14px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {file ? (
          <>
            <div style={{ fontSize: "24px" }}>📄</div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#e8928f" }}>
              {file.name}
            </div>
            <div style={{ fontSize: "11px", color: "#bbb" }}>
              Click to change file
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "28px" }}>📂</div>
            <div style={{ fontSize: "13px", color: "#bbb" }}>
              Drop PDF or click to upload
            </div>
          </>
        )}
      </div>

      {/* ===== Analyze Button ===== */}

      {file && (
        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          style={{
            width: "100%",
            padding: "11px",
            background: loading ? "#f5d8d7" : "#e8928f",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "🔍 Analysing..." : "Run Predictive Scan →"}
        </button>
      )}

      {/* ===== View Previous Results ===== */}

      {result && !dialogOpen && (
        <button
          onClick={() => setDialogOpen(true)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            background: "none",
            border: "1.5px solid #f0e0e0",
            borderRadius: "25px",
            color: "#e8928f",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          View Last Results
        </button>
      )}

      {/* ===== RESULT MODAL ===== */}

      {dialogOpen && result && (
        <ResultDialog
          result={result}
          riskColor={riskColor}
          onClose={() => setDialogOpen(false)}
        />
      )}

    </div>
  );
}

// ================= RESULT DIALOG =================

function ResultDialog({ result, riskColor, onClose }) {

  const pct = Math.round(result.pcos_probability * 100);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9998,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        maxWidth: "520px",
        width: "100%"
      }}>

        <h3 style={{ marginTop: 0 }}>Analysis Summary</h3>

        <p style={{ fontWeight: "700", color: riskColor }}>
          PCOS Probability: {pct}% ({result.risk_tier})
        </p>

        <h4>Recommendations</h4>
        {result.recommendations.map((r, i) => (
          <p key={i}>→ {r}</p>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: "16px",
            width: "100%",
            padading: "12px",
            background: "#e8928f",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer"
          }}
        >
          Close Report
        </button>
      </div>
    </div>
  );
}