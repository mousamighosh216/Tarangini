import ProfileCard from "../components/profile/ProfileCard";
import PrivacySecurityCard from "../components/profile/PrivacySecurityCard";
import SettingsCard from "../components/profile/SettingsCard";

export default function ProfilePage({ userName }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f8" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #e8928f, #d4a0a0)",
        padding: "28px 32px",
      }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "700", color: "#fff" }}>
          Your Profile
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>
          Manage your account and privacy settings
        </p>
      </div>

      {/* Body */}
      <div style={{
        padding: "28px 32px",
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: "24px",
        alignItems: "start",
      }}>
        {/* Left Column */}
        <ProfileCard userName={userName} />

        {/* Right Column */}
        <div>
          <PrivacySecurityCard />
          <SettingsCard />

          {/* Log Out */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "4px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <button style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#e8928f",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "12px",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log Out
            </button>
          </div>

          {/* Footer */}
          <p style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#ccc",
            marginTop: "20px",
          }}>
            Tarangini v1.0.0 &nbsp;·&nbsp; Made with ♥ for women's wellness
          </p>
        </div>
      </div>
    </div>
  );
}
