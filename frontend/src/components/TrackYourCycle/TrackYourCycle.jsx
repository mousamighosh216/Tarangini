import React from "react";
import "./trackYourCycle.css";
import TrackCycleContent from "./TrackCycleContent";
import calendarImg from "./calendar.png";

// TrackYourCycle – second onboarding page
// onContinue and onSkip are passed in from App.jsx
function TrackYourCycle({ onContinue, onSkip }) {
  return (
    <div className="track-cycle-page">
      {/* ── LEFT PANEL ── */}
      <div className="track-cycle-left">
        <img
          src={calendarImg}
          alt="Calendar illustration"
          className="track-cycle-calendar-img"
        />

        {/* Pagination dots – second dot is active */}
        <div className="track-cycle-dots">
          <span className="dot" />
          <span className="dot active" />
          <span className="dot" />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <TrackCycleContent onContinue={onContinue} onSkip={onSkip} />
    </div>
  );
}

export default TrackYourCycle;
