import { useState } from "react";

import Welcome from "./components/Welcome/Welcome.jsx";
import TrackYourCycle from "./components/TrackYourCycle/TrackYourCycle.jsx";
import Privacy from "./components/Privacy/Privacy.jsx";

import PersonalizationPage from "./pages/PersonalizationPage";
import AuthPage from "./pages/AuthPage";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import PCOSManagement from "./pages/PCOSManagement";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";

import PCOSOnboardingPopup from "./components/pcos/PCOSOnboardingPopup";
import { CycleProvider } from "./context/CycleContext";

/*
────────────────────────────────────────────
FINAL APP FLOW

ONBOARDING:
welcome → trackCycle → privacy → personalize → auth → pcos popup

MAIN APP:
home / calendar / pcos / chat / profile
────────────────────────────────────────────
*/

export default function App() {

  // 🔹 Onboarding step controller
  const [appStep, setAppStep] = useState("welcome");

  // 🔹 User data
  const [userName, setUserName] = useState("");
  const [pcosProfile, setPcosProfile] = useState(null);

  // 🔹 Main app navigation
  const [currentPage, setCurrentPage] = useState("home");

  // =================================================
  // ONBOARDING SCREENS
  // =================================================

  if (appStep === "welcome") {
    return (
      <Welcome
        onContinue={() => setAppStep("trackCycle")}
        onSkip={() => setAppStep("personalize")}
      />
    );
  }

  if (appStep === "trackCycle") {
    return (
      <TrackYourCycle
        onContinue={() => setAppStep("privacy")}
        onSkip={() => setAppStep("personalize")}
      />
    );
  }

  if (appStep === "privacy") {
    return (
      <Privacy
        onGetStarted={() => setAppStep("personalize")}
        onSkip={() => setAppStep("personalize")}
      />
    );
  }

  // =================================================
  // PERSONALIZATION (Name)
  // =================================================

  if (appStep === "personalize") {
    return (
      <PersonalizationPage
        onComplete={(name) => {
          setUserName(name);
          setAppStep("auth");
        }}
      />
    );
  }

  // =================================================
  // AUTHENTICATION PAGE
  // =================================================

  if (appStep === "auth") {
    return (
      <AuthPage
        userName={userName}
        onComplete={() => setAppStep("onboarding")}
      />
    );
  }

  // =================================================
  // MAIN APP PAGES
  // =================================================

  const renderPage = () => {
    switch (currentPage) {

      case "home":
  return (
    <Home
      onNavigate={setCurrentPage}
      userName={userName}
    />
  );

      case "calendar":
        return <Calendar />;

      case "pcos":
        return (
          <PCOSManagement
            profile={pcosProfile}
            onBack={() => setCurrentPage("home")}
          />
        );

      case "chat":
        return <ChatPage />;

      case "profile":
        return <ProfilePage userName={userName} />;

      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <CycleProvider>

      {/* PCOS Onboarding Popup */}
      {appStep === "onboarding" && (
        <PCOSOnboardingPopup
          onComplete={(data) => {
            setPcosProfile(data);
            setAppStep("app");
          }}
          onSkip={() => setAppStep("app")}
        />
      )}

      {/* Main App Layout */}
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>

    </CycleProvider>
  );
}