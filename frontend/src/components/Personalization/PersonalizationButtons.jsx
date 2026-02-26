import React from "react";

// PersonalizationButtons – Complete Setup button
function PersonalizationButtons({ onCompleteSetup }) {
  return (
    <div className="personalization-buttons">
      <button className="btn-complete-setup" onClick={onCompleteSetup}>
        Complete Setup <span className="arrow-icon">›</span>
      </button>
    </div>
  );
}

export default PersonalizationButtons;
