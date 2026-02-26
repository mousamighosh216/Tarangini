import React from "react";

// TrackCycleButtons – Continue & Skip for now
function TrackCycleButtons({ onContinue, onSkip }) {
  return (
    <div className="track-cycle-buttons">
      <button className="btn-continue" onClick={onContinue}>
        Continue <span className="arrow-icon">›</span>
      </button>
      <button className="btn-skip" onClick={onSkip}>
        Skip for now
      </button>
    </div>
  );
}

export default TrackCycleButtons;
