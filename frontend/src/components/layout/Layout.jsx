import Sidebar from "./Sidebar";

export default function Layout({ children, currentPage, onNavigate }) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#fdf8f8",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
