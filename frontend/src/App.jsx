import React, { useState } from "react";
import Welcome from "./components/Welcome/Welcome.jsx";
import TrackYourCycle from "./components/TrackYourCycle/TrackYourCycle.jsx";
import Privacy from "./components/Privacy/Privacy.jsx";
import Personalization from "./components/Personalization/Personalization.jsx";

// App – controls which onboarding screen is currently visible.
//
// Navigation flow:
//   Welcome     → Continue → TrackYourCycle
//   Welcome     → Skip     → Personalization
//   TrackYourCycle → Continue → Privacy
//   TrackYourCycle → Skip     → Personalization
//   Privacy     → Get Started → Personalization
//   Privacy     → Skip        → Personalization

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  const goTo = (page) => () => setCurrentPage(page);

  if (currentPage === "trackCycle") {
    return (
      <TrackYourCycle
        onContinue={goTo("privacy")}
        onSkip={goTo("personalization")}
      />
    );
  }

  if (currentPage === "privacy") {
    return (
      <Privacy
        onGetStarted={goTo("personalization")}
        onSkip={goTo("personalization")}
      />
    );
  }

  if (currentPage === "personalization") {
    return (
      <Personalization
        onCompleteSetup={() => console.log("Onboarding complete – navigate to main app")}
      />
    );
  }

  // Default: Welcome page
  return (
    <Welcome
      onContinue={goTo("trackCycle")}
      onSkip={goTo("personalization")}
    />
  );
}

export default App;
