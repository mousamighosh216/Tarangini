import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children, currentPage, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close sidebar on nav on mobile
  const handleNavigate = (page) => {
    onNavigate(page);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#fdf8f8",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative",
    }}>
      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 99,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: isMobile ? "fixed" : "relative",
        left: isMobile ? (sidebarOpen ? 0 : "-220px") : 0,
        top: 0,
        height: "100%",
        zIndex: 100,
        transition: "left 0.28s cubic-bezier(0.4,0,0.2,1)",
        flexShrink: 0,
      }}>
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
      </div>

      {/* Main content */}
      <main style={{
        flex: 1,
        overflow: "auto",
        minWidth: 0,
        // On mobile, no left margin since sidebar is overlay
      }}>
        {/* Mobile top bar */}
        {isMobile && (
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#fff",
            borderBottom: "1px solid #f0e8e8",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ display: "block", width: "20px", height: "2px", background: "#e8928f", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#e8928f", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#e8928f", borderRadius: "2px" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="./src/assets/logo.png"
                alt="Tarangini"
                style={{ height: "36px", objectFit: "contain" }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span style={{
                display: "none",
                fontWeight: "700",
                fontSize: "18px",
                color: "#e8928f",
              }}>Tarangini</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#f0faf5",
              borderRadius: "20px",
              padding: "4px 10px",
              fontSize: "10px",
              color: "#5a9a7a",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Encrypted
            </div>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
