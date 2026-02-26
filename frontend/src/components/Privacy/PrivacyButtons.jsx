import React from "react";

// PrivacyButtons – Get Started & Skip for now
function PrivacyButtons({ onGetStarted, onSkip }) {
  return (
    <div className="privacy-buttons">
      <button className="btn-get-started" onClick={onGetStarted}>
        Get Started <span className="arrow-icon">›</span>
      </button>
      <button className="btn-skip" onClick={onSkip}>
        Skip for now
      </button>
    </div>
  );
}

export default PrivacyButtons;
