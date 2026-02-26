import React from "react";
import TrackCycleButtons from "./TrackCycleButtons";

// TrackCycleContent – right panel (heading, tagline, body text, buttons)
function TrackCycleContent({ onContinue, onSkip }) {
  return (
    <div className="track-cycle-right">
      {/* Main heading */}
      <h1 className="track-cycle-heading">Track Your Cycle</h1>

      {/* Tagline */}
      <p className="track-cycle-subheading">Understand your body better</p>

      {/* Body */}
      <p className="track-cycle-body">
        Get accurate period predictions and ovulation tracking to help you
        plan your days with confidence.
      </p>

      {/* Buttons */}
      <TrackCycleButtons onContinue={onContinue} onSkip={onSkip} />
    </div>
  );
}

export default TrackCycleContent;
