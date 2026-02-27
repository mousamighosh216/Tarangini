import { useState } from "react";

export default function AiScanner() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        risk: "Low",
        insights: [
          "Hormone levels appear within normal range",
          "No significant PCOS markers detected",
          "Regular cycle pattern indicates healthy ovulation",
        ],
        recommendation: "Continue monitoring your cycle regularly. Consider consulting a gynecologist for a comprehensive evaluation.",
      });
    }, 2500);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "700px" }}>
      <h1 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "700", color: "#333" }}>AI Scanner</h1>
      <p style={{ margin: "0 0 28px", color: "#aaa", fontSize: "14px" }}>Upload your medical reports for AI-powered PCOS analysis</p>

      {/* Upload Zone */}
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "40px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "2px dashed #f0e0e0",
        textAlign: "center", marginBottom: "20px",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
        <p style={{ margin: "0 0 16px", color: "#888", fontSize: "14px" }}>
          {file ? `Selected: ${file.name}` : "Drag & drop your report or click to browse"}
        </p>
        <label style={{
          display: "inline-block", padding: "10px 24px",
          background: "#e8928f", color: "#fff", borderRadius: "25px",
          cursor: "pointer", fontSize: "14px", fontWeight: "500",
        }}>
          Choose File
          <input type="file" onChange={handleFile} accept=".pdf,.jpg,.png" style={{ display: "none" }} />
        </label>
        <p style={{ margin: "12px 0 0", fontSize: "11px", color: "#ccc" }}>Supports PDF, JPG, PNG · Max 10MB</p>
      </div>

      {file && !result && (
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          style={{
            width: "100%", padding: "14px",
            background: analyzing ? "#f0c0c0" : "#e8928f",
            color: "#fff", border: "none", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: analyzing ? "not-allowed" : "pointer",
            marginBottom: "20px",
          }}
        >
          {analyzing ? "🔍 Analyzing..." : "Analyze Report"}
        </button>
      )}

      {result && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{
              padding: "4px 14px", borderRadius: "20px",
              background: result.risk === "Low" ? "#f0faf5" : "#fff5f5",
              color: result.risk === "Low" ? "#5a9a7a" : "#e87070",
              fontSize: "13px", fontWeight: "600",
            }}>
              {result.risk} Risk
            </div>
            <span style={{ fontSize: "13px", color: "#aaa" }}>PCOS Analysis Complete</span>
          </div>

          <div style={{ marginBottom: "16px" }}>
            {result.insights.map((insight, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                padding: "10px 0", borderBottom: i < result.insights.length - 1 ? "1px solid #f5f0f0" : "none",
              }}>
                <span style={{ color: "#5a9a7a", marginTop: "2px" }}>✓</span>
                <span style={{ fontSize: "14px", color: "#555" }}>{insight}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#f5f0ff", borderRadius: "10px", padding: "14px" }}>
            <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "13px", color: "#6650c0" }}>Recommendation</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#7a6baa" }}>{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
