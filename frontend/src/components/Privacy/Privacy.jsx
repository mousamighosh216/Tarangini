import React from "react";
import "./privacy.css";
import PrivacyContent from "./PrivacyContent";
import shieldImg from "./shield.png";

// Privacy – third onboarding page
// Left panel: shield illustration + pagination dots (dot 3 active)
// Right panel: heading, tagline, body, Get Started button
function Privacy({ onGetStarted, onSkip }) {
  return (
    <div className="privacy-page">
      {/* ── LEFT PANEL ── */}
      <div className="privacy-left">
        <img
          src={shieldImg}
          alt="Shield illustration"
          className="privacy-shield-img"
        />

        {/* Pagination dots – third dot is active */}
        <div className="privacy-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot active" />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <PrivacyContent onGetStarted={onGetStarted} onSkip={onSkip} />
    </div>
  );
}

export default Privacy;
