import React from "react";
import PrivacyButtons from "./PrivacyButtons";

// PrivacyContent – right panel (heading, tagline, body text, buttons)
function PrivacyContent({ onGetStarted, onSkip }) {
  return (
    <div className="privacy-right">
      {/* Main heading – two lines as per design */}
      <h1 className="privacy-heading">
        Your Privacy,<br />Our Priority
      </h1>

      {/* Tagline */}
      <p className="privacy-subheading">Safe, secure, and encrypted</p>

      {/* Body */}
      <p className="privacy-body">
        Your health data is encrypted and never shared. Biometric lock keeps
        your information private.
      </p>

      {/* Buttons */}
      <PrivacyButtons onGetStarted={onGetStarted} onSkip={onSkip} />
    </div>
  );
}

export default PrivacyContent;
