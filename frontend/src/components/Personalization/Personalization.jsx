import React, { useState } from "react";
import "./personalization.css";
import PersonalizationForm from "./PersonalizationForm";
import PersonalizationButtons from "./PersonalizationButtons";

// Personalization – final onboarding step
// Reached from: Privacy → Get Started, OR any page → Skip for now
function Personalization({ onCompleteSetup }) {
  const [formData, setFormData] = useState({
    age: "",
    cycleLength: "28",
    hasPcos: false,
  });

  const handleCompleteSetup = () => {
    console.log("Setup complete with data:", formData);
    if (onCompleteSetup) onCompleteSetup(formData);
  };

  return (
    <div className="personalization-page">
      <div className="personalization-card">
        {/* ── Header ── */}
        <div className="personalization-header">
          <span className="sparkle-icon">✦</span>
          <h1>Let's personalize</h1>
        </div>
        <p className="personalization-subheading">
          Help us understand you better for accurate predictions
        </p>

        {/* ── Form ── */}
        <PersonalizationForm formData={formData} onChange={setFormData} />

        {/* ── Button ── */}
        <PersonalizationButtons onCompleteSetup={handleCompleteSetup} />
      </div>
    </div>
  );
}

export default Personalization;
