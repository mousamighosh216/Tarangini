import React from "react";
import WelcomeButtons from "./WelcomeButtons";
import logoImg from "./logo.png";

// WelcomeContent – right panel (heading, tagline, body text, buttons)
function WelcomeContent({ onContinue, onSkip }) {
  return (
    <div className="welcome-right">
      {/* Heading row: "Welcome to" + logo image */}
      <div className="welcome-heading">
        <h1>Welcome to</h1>
        <img
          src={logoImg}
          alt="Tarangini"
          className="welcome-logo-img"
        />
      </div>

      {/* Tagline */}
      <p className="welcome-subheading">
        Your trusted companion for women's health
      </p>

      {/* Body */}
      <p className="welcome-body">
        Track your cycle, manage PCOS, and access personalized health
        insights—all in one safe, private space.
      </p>

      {/* Buttons */}
      <WelcomeButtons onContinue={onContinue} onSkip={onSkip} />
    </div>
  );
}

export default WelcomeContent;
