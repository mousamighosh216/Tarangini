import React from "react";

// WelcomeButtons – Continue & Skip for now
function WelcomeButtons({ onContinue, onSkip }) {
  return (
    <div className="welcome-buttons">
      <button className="btn-continue" onClick={onContinue}>
        Continue <span className="arrow-icon">›</span>
      </button>
      <button className="btn-skip" onClick={onSkip}>
        Skip for now <span className="arrow-icon">›</span>
      </button>
    </div>
  );
}

export default WelcomeButtons;
