import { useState } from "react";

function Toggle({ on, onChange }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        background: on ? "#e8928f" : "#ddd",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.25s",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: "3px",
        left: on ? "23px" : "3px",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        transition: "left 0.25s",
      }} />
    </div>
  );
}

function SettingRow({ icon, iconBg, title, subtitle, right }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "16px 0",
      borderBottom: "1px solid #fdf5f5",
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: iconBg || "#fdf0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>{subtitle}</div>
      </div>
      {right}
    </div>
  );
}

export default function PrivacySecurityCard() {
  const [appLock, setAppLock] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      marginBottom: "16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8928f" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#333" }}>
          Privacy &amp; Security
        </h3>
      </div>

      <SettingRow
        iconBg="#fff0f0"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8928f" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        }
        title="App Lock"
        subtitle="Require authentication to open app"
        right={<Toggle on={appLock} onChange={setAppLock} />}
      />

      <SettingRow
        iconBg="#f5f0ff"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9d8fd6" strokeWidth="2">
            <circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0114 0v2"/>
          </svg>
        }
        title="Biometric Login"
        subtitle="Use fingerprint or face ID"
        right={<Toggle on={biometric} onChange={setBiometric} />}
      />

      <SettingRow
        iconBg="#fff8f0"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8b870" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        }
        title="Notifications"
        subtitle="Period reminders and health tips"
        right={<Toggle on={notifications} onChange={setNotifications} />}
      />

      {/* Encryption notice */}
      <div style={{
        background: "#f0faf8",
        border: "1px solid #c8e8e0",
        borderRadius: "12px",
        padding: "14px 16px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        marginTop: "6px",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#3a8a6a", marginBottom: "3px" }}>
            Your data is encrypted
          </div>
          <div style={{ fontSize: "12px", color: "#5a9a7a", lineHeight: "1.6" }}>
            All your health information is stored securely with end-to-end encryption. We never share your data with third parties.
          </div>
        </div>
      </div>
    </div>
  );
}
