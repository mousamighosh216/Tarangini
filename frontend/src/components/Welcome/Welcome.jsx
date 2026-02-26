import React from "react";
import "./welcome.css";
import WelcomeContent from "./WelcomeContent";
import heartImg from "./heart.png";

// Welcome – root page component
// onContinue and onSkip are passed in from App.jsx
function Welcome({ onContinue, onSkip }) {
  return (
    <div className="welcome-page">
      {/* ── LEFT PANEL ── */}
      <div className="welcome-left">
        <img
          src={heartImg}
          alt="Heart illustration"
          className="welcome-heart-img"
        />

        {/* Pagination indicator dots */}
        <div className="welcome-dots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <WelcomeContent onContinue={onContinue} onSkip={onSkip} />
    </div>
  );
}

export default Welcome;
