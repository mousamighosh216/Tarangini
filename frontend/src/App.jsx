import React, { useState } from "react";

import Welcome from "./components/Welcome/Welcome.jsx";
import TrackYourCycle from "./components/TrackYourCycle/TrackYourCycle.jsx";
import Privacy from "./components/Privacy/Privacy.jsx";
import Personalization from "./components/Personalization/Personalization.jsx";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import AiScanner from "./pages/AiScanner";

import { CycleProvider } from "./context/CycleContext";

function App() {

  // 🔹 onboarding state
  const [currentPage, setCurrentPage] = useState("welcome");

  // 🔹 main app page state
  const [appPage, setAppPage] = useState("home");

  const goTo = (page) => () => setCurrentPage(page);

  // =========================
  // ONBOARDING FLOW
  // =========================

  if (currentPage === "welcome") {
    return (
      <Welcome
        onContinue={goTo("trackCycle")}
        onSkip={goTo("personalization")}
      />
    );
  }

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
  // =========================
// PERSONALIZATION SCREEN
//  =========================

if (currentPage === "personalization") {
  return (
    <Personalization
      onCompleteSetup={() => setCurrentPage("mainApp")}
    />
  );
}

  // =========================
  // AFTER ONBOARDING → MAIN APP
  // =========================

  if (currentPage === "mainApp") {

    const renderPage = () => {
      switch (appPage) {
        case "home":
          return <Home onNavigate={setAppPage} />;
        case "calendar":
          return <Calendar />;
        case "ai-scanner":
          return <AiScanner />;
        default:
          return <Home onNavigate={setAppPage} />;
      }
    };

    return (
      <CycleProvider>
        <Layout currentPage={appPage} onNavigate={setAppPage}>
          {renderPage()}
        </Layout>
      </CycleProvider>
    );
  }

  <LoadCalendarApi />

  return null;
}

export default App;