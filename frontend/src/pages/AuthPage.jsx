import { useState } from "react";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#222">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.27.07 2.14.74 2.9.77.93-.19 1.82-.88 3.22-.82C17.12 7.46 18.7 8.48 19.45 10c-3.26 1.9-2.53 6.08.68 7.26-.48 1.12-1.06 2.23-3.08 3.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

export default function AuthPage({ userName, onComplete }) {
  const [mode, setMode] = useState("register"); // "register" | "login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim() || !email.includes("@")) e.email = "Enter a valid email address";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (mode === "register" && password !== confirmPassword) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    // TODO: call your real auth API here
    setTimeout(() => {
      setLoading(false);
      onComplete({ email });
    }, 1000);
  };

  const handleOAuth = (provider) => {
    // TODO: trigger your OAuth flow (Google / Apple)
    console.log(`OAuth: ${provider}`);
    onComplete({ email: `oauth@${provider}.com` });
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "16px 20px",
    borderRadius: "14px",
    border: `1.5px solid ${hasError ? "#e8928f" : "#f0e8e8"}`,
    background: "#fdf8f8",
    fontSize: "15px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fdf4f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "52px 52px 48px",
        width: "100%",
        maxWidth: "560px",
        boxShadow: "0 8px 40px rgba(232,146,143,0.12)",
      }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <span style={{ fontSize: "28px" }}>✦</span>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#222", letterSpacing: "-0.3px" }}>
            {mode === "register" ? `Welcome, ${userName}` : "Welcome back"}
          </h1>
        </div>
        <p style={{ margin: "0 0 32px", fontSize: "15px", color: "#888" }}>
          {mode === "register" ? "Create your account to get started" : "Sign in to continue your journey"}
        </p>

        {/* OAuth Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button
            onClick={() => handleOAuth("google")}
            style={{
              flex: 1, padding: "13px", borderRadius: "12px",
              border: "1.5px solid #f0e8e8", background: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px", fontSize: "14px",
              color: "#444", fontWeight: "500", fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#e8928f"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#f0e8e8"}
          >
            <GoogleIcon /> Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("apple")}
            style={{
              flex: 1, padding: "13px", borderRadius: "12px",
              border: "1.5px solid #f0e8e8", background: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px", fontSize: "14px",
              color: "#444", fontWeight: "500", fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#f0e8e8"}
          >
            <AppleIcon /> Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "1px", background: "#f0e8e8" }} />
          <span style={{ fontSize: "12px", color: "#ccc" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#f0e8e8" }} />
        </div>

        {/* Email */}
        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "8px" }}>
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={inputStyle(errors.email)}
          onFocus={e => { if (!errors.email) e.target.style.borderColor = "#e8928f"; }}
          onBlur={e => { if (!errors.email) e.target.style.borderColor = "#f0e8e8"; }}
        />
        {errors.email && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#e8928f" }}>{errors.email}</p>}

        {/* Password */}
        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#333", margin: "18px 0 8px" }}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ ...inputStyle(errors.password), paddingRight: "50px" }}
            onFocus={e => { if (!errors.password) e.target.style.borderColor = "#e8928f"; }}
            onBlur={e => { if (!errors.password) e.target.style.borderColor = "#f0e8e8"; }}
          />
          <button
            onClick={() => setShowPass(p => !p)}
            style={{
              position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: "0",
            }}
          >
            {showPass ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#e8928f" }}>{errors.password}</p>}

        {/* Confirm Password (register only) */}
        {mode === "register" && (
          <>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#333", margin: "18px 0 8px" }}>
              Confirm password
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirm: "" })); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={inputStyle(errors.confirm)}
              onFocus={e => { if (!errors.confirm) e.target.style.borderColor = "#e8928f"; }}
              onBlur={e => { if (!errors.confirm) e.target.style.borderColor = "#f0e8e8"; }}
            />
            {errors.confirm && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#e8928f" }}>{errors.confirm}</p>}
          </>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "28px",
            padding: "18px",
            borderRadius: "14px",
            border: "none",
            background: loading ? "#f0c8c8" : "#e8928f",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#d4787a"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#e8928f"; }}
        >
          {loading ? "Setting up your account…" : mode === "register" ? "Create Account" : "Sign In"}
          {!loading && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          )}
        </button>

        {/* Toggle mode */}
        <p style={{ textAlign: "center", margin: "20px 0 0", fontSize: "13px", color: "#aaa" }}>
          {mode === "register" ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => { setMode(m => m === "register" ? "login" : "register"); setErrors({}); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#e8928f", fontWeight: "600", fontSize: "13px",
              padding: 0, fontFamily: "inherit",
            }}
          >
            {mode === "register" ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}
