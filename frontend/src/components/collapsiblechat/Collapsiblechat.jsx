import { useState, useRef, useEffect } from "react";

/* ── Styles ──────────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');

@keyframes widgetPop {
  0%   { transform: scale(0.6) translateY(20px); opacity: 0; }
  70%  { transform: scale(1.04) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes bubblePop {
  0%   { transform: scale(0.85) translateY(6px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ripple {
  0%   { box-shadow: 0 0 0 0 #6366f155; }
  70%  { box-shadow: 0 0 0 12px #6366f100; }
  100% { box-shadow: 0 0 0 0 #6366f100; }
}
@keyframes spinnerRing {
  to { transform: rotate(360deg); }
}
@keyframes notifBounce {
  0%,100% { transform: scale(1); }
  40%     { transform: scale(1.3); }
}

.cw-trigger { animation: ripple 2.2s infinite; }
.cw-trigger:hover { transform: scale(1.08) !important; }
.cw-trigger:active { transform: scale(0.95) !important; }

.cw-msg { animation: bubblePop 0.18s ease-out; }

.cw-send:hover:not(:disabled) { background: #4f46e5 !important; }
.cw-send:active:not(:disabled) { transform: scale(0.93); }

.cw-input:focus { border-color: #6366f1 !important; }
.cw-input::placeholder { color: #9ca3af; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
`;

/* ── Helpers ─────────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 8);
const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ── Claude API ──────────────────────────────────────────────────── */
async function askClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are a friendly, helpful website assistant embedded as a chat widget. 
Your job is to answer visitor questions clearly and concisely. 
Be warm but efficient — users expect quick, useful answers.
Keep responses brief (2–4 sentences usually) unless a detailed explanation is needed.
Never use markdown headers. You may use short bullet points sparingly.`,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data.content.map(b => b.text || "").join("").trim();
}

/* ── Spinner ─────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: "50%",
      border: "2px solid #e0e7ff",
      borderTopColor: "#6366f1",
      animation: "spinnerRing 0.7s linear infinite",
    }} />
  );
}

/* ── Typing dots ─────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#a5b4fc",
          animation: `notifBounce 1s ${i * 0.18}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

/* ── Message ─────────────────────────────────────────────────────── */
function Msg({ m }) {
  const isBot = m.role === "assistant";
  return (
    <div className="cw-msg" style={{
      display: "flex",
      flexDirection: isBot ? "row" : "row-reverse",
      gap: 8,
      alignItems: "flex-end",
      marginBottom: 12,
    }}>
      {/* avatar */}
      {isBot && (
        <div style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, marginBottom: 2,
        }}>✦</div>
      )}

      {/* bubble */}
      <div style={{
        maxWidth: "78%",
        background: isBot ? "#f5f3ff" : "linear-gradient(135deg, #6366f1, #7c3aed)",
        color: isBot ? "#1f2937" : "#fff",
        borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
        padding: "9px 13px",
        fontSize: 13.5,
        lineHeight: 1.6,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 400,
        boxShadow: isBot ? "0 1px 4px #0000000d" : "0 2px 10px #6366f133",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {m.content}
        <div style={{
          fontSize: 10, marginTop: 4, opacity: 0.5,
          textAlign: isBot ? "left" : "right",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {fmtTime(m.ts)}
        </div>
      </div>
    </div>
  );
}

/* ── Quick replies ───────────────────────────────────────────────── */
const QUICK = [
  "What can you help with?",
  "How does this work?",
  "Tell me more about this site",
  "I found a bug 🐛",
];

/* ── Widget ──────────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(0);
  const [greeted, setGreeted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  /* focus input on open */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 120);
      if (!greeted) {
        setGreeted(true);
        const greet = {
          id: uid(), role: "assistant", ts: Date.now(),
          content: "Hi there 👋 I'm your AI assistant. Ask me anything — I'm here to help!",
        };
        setMsgs([greet]);
      }
    }
  }, [open]);

  async function send(text) {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg = { id: uid(), role: "user", content: q, ts: Date.now() };
    setMsgs(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = [...msgs, userMsg];
      const reply = await askClaude(history);
      const botMsg = { id: uid(), role: "assistant", content: reply, ts: Date.now() };
      setMsgs(prev => [...prev, botMsg]);
      if (!open) setUnread(n => n + 1);
    } catch (e) {
      setMsgs(prev => [...prev, {
        id: uid(), role: "assistant", ts: Date.now(),
        content: "Sorry, something went wrong. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  /* ── Demo page backdrop ─────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f8fafc 0%, #f0f4ff 100%)",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
    }}>
      <style>{STYLES}</style>

      {/* ── Mock landing page ─────────────────────────────────────── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{
          display: "inline-block", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#6366f1", background: "#eef2ff", padding: "4px 12px",
          borderRadius: 20, marginBottom: 20,
        }}>Live demo</div>
        <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: "#111827", marginBottom: 18, letterSpacing: "-0.8px" }}>
          Your AI assistant,<br />always within reach
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, maxWidth: 480 }}>
          The chat bubble in the bottom-right corner is a fully functional AI widget. Click it to open and start asking questions.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          {["Instant answers", "24/7 availability", "No sign-up needed"].map(tag => (
            <div key={tag} style={{
              fontSize: 13, color: "#4b5563", background: "#fff",
              border: "1px solid #e5e7eb", borderRadius: 8,
              padding: "8px 16px", fontWeight: 500,
            }}>
              ✓ {tag}
            </div>
          ))}
        </div>

        {/* placeholder content blocks */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            marginTop: 40, height: 80, borderRadius: 12,
            background: `rgba(99,102,241,${0.04 + i * 0.02})`,
            border: "1px solid #e5e7eb",
          }} />
        ))}
      </div>

      {/* ── Floating widget ───────────────────────────────────────── */}

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24,
          width: 360, height: 520,
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 24px 60px #0000001a, 0 4px 16px #6366f118",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
          animation: "widgetPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          border: "1px solid #ede9fe",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
            padding: "16px 18px",
            display: "flex", alignItems: "center", gap: 12,
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, border: "1.5px solid rgba(255,255,255,0.3)",
            }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#fff", letterSpacing: "0.01em" }}>
                AI Assistant
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                Online · usually replies instantly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
                width: 28, height: 28, borderRadius: "50%",
                color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            >×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "16px 14px 6px",
          }}>
            {msgs.map(m => <Msg key={m.id} m={m} />)}

            {loading && (
              <div className="cw-msg" style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12,
                }}>✦</div>
                <div style={{
                  background: "#f5f3ff", borderRadius: "4px 16px 16px 16px",
                  padding: "10px 14px",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Quick replies — show only if ≤1 message */}
            {msgs.length <= 1 && !loading && (
              <div style={{ animation: "fadeUp 0.3s 0.2s ease-out both" }}>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8, paddingLeft: 2 }}>
                  Suggested
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {QUICK.map(q => (
                    <button key={q} onClick={() => send(q)} style={{
                      textAlign: "left", background: "#fafafa",
                      border: "1px solid #e5e7eb", borderRadius: 10,
                      padding: "8px 12px", fontSize: 12.5, color: "#4b5563",
                      cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                      transition: "all 0.12s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#eef2ff"; e.currentTarget.style.borderColor = "#c7d2fe"; e.currentTarget.style.color = "#4338ca"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#4b5563"; }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px 14px", borderTop: "1px solid #f3f4f6", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                className="cw-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask me anything..."
                disabled={loading}
                rows={1}
                onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px"; }}
                style={{
                  flex: 1, fontFamily: "'Outfit', sans-serif", fontSize: 13.5,
                  border: "1.5px solid #e5e7eb", borderRadius: 12,
                  padding: "9px 12px", resize: "none", outline: "none",
                  background: "#fafafa", color: "#111827", lineHeight: 1.5,
                  maxHeight: 90, overflowY: "auto",
                  transition: "border-color 0.15s",
                }}
              />
              <button
                className="cw-send"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: 12, border: "none",
                  background: (!input.trim() || loading) ? "#e5e7eb" : "linear-gradient(135deg,#6366f1,#7c3aed)",
                  color: (!input.trim() || loading) ? "#9ca3af" : "#fff",
                  cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
                  boxShadow: (!input.trim() || loading) ? "none" : "0 4px 12px #6366f140",
                }}
              >
                {loading ? <Spinner /> : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#d1d5db" }}>
              Powered by Claude · Press Enter to send
            </div>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        className="cw-trigger"
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: "50%",
          background: open ? "#fff" : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
          border: open ? "1.5px solid #ede9fe" : "none",
          cursor: "pointer", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: open ? "0 4px 20px #0000001a" : "0 8px 24px #6366f144",
          transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {/* Unread badge */}
        {unread > 0 && !open && (
          <div style={{
            position: "absolute", top: -2, right: -2,
            width: 18, height: 18, borderRadius: "50%",
            background: "#ef4444", color: "#fff",
            fontSize: 10, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #fff",
          }}>
            {unread}
          </div>
        )}
      </button>
    </div>
  );
}
