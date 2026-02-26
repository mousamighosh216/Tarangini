import React, { useState } from "react";

// PersonalizationForm – age, cycle length, PCOS checkbox
function PersonalizationForm({ formData, onChange }) {
  const [pcosChecked, setPcosChecked] = useState(formData.hasPcos || false);

  const handlePcosToggle = () => {
    const updated = !pcosChecked;
    setPcosChecked(updated);
    onChange({ ...formData, hasPcos: updated });
  };

  const handleAge = (e) => {
    onChange({ ...formData, age: e.target.value });
  };

  const handleCycleLength = (e) => {
    onChange({ ...formData, cycleLength: e.target.value });
  };

  return (
    <div className="personalization-form">
      {/* ── Age ── */}
      <div className="field-group">
        <label className="field-label">Your age</label>
        <input
          type="number"
          className="personalization-input"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleAge}
          min="10"
          max="60"
        />
      </div>

      {/* ── Average cycle length ── */}
      <div className="field-group">
        <label className="field-label">Average cycle length (days)</label>
        <input
          type="number"
          className="personalization-input"
          value={formData.cycleLength}
          onChange={handleCycleLength}
          min="21"
          max="35"
        />
        <p className="field-hint">Usually between 21–35 days</p>
      </div>

      {/* ── PCOS card ── */}
      <div className="pcos-card" onClick={handlePcosToggle}>
        <div className={`pcos-checkbox ${pcosChecked ? "checked" : ""}`}>
          {pcosChecked && <span className="check-mark">✓</span>}
        </div>
        <div className="pcos-text-block">
          <span className="pcos-title">I have PCOS/PCOD or irregular periods</span>
          <span className="pcos-subtitle">We'll provide specialized tracking and insights</span>
        </div>
      </div>
    </div>
  );
}

export default PersonalizationForm;
