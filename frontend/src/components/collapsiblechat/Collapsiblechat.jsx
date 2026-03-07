import { useState, useRef, useEffect } from "react";

/* ── Styles ── */
const STYLES = `
@keyframes widgetPop {
  0% { transform: scale(0.6) translateY(20px); opacity: 0; }
  70% { transform: scale(1.04) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes bubblePop {
  0% { transform: scale(0.85) translateY(6px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ripple {
  0% { box-shadow: 0 0 0 0 rgba(232,146,143,0.4); }
  70% { box-shadow: 0 0 0 12px rgba(232,146,143,0); }
  100% { box-shadow: 0 0 0 0 rgba(232,146,143,0); }
}
@keyframes spinnerRing {
  to { transform: rotate(360deg); }
}
@keyframes notifBounce {
  0%,100% { transform: scale(1); }
  40% { transform: scale(1.3); }
}
.tw-trigger { animation: ripple 2.2s infinite; }
.tw-trigger:hover { transform: scale(1.08) !important; }
.tw-trigger:active { transform: scale(0.95) !important; }
.tw-msg { animation: bubblePop 0.18s ease-out; }
.tw-send:hover:not(:disabled) { background: #d4787a !important; }
.tw-send:active:not(:disabled) { transform: scale(0.93); }
.tw-input:focus { border-color: #e8928f !important; }
.tw-input::placeholder { color: #c0a0a0; }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-thumb { background: #f0d0d0; border-radius: 2px; }
`;

const uid = () => Math.random().toString(36).slice(2, 8);
const fmtTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

async function askClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are Taara, a warm and knowledgeable women's health assistant for the Tarangini app.
You help users with questions about menstrual health, PCOS, cycle tracking, hormonal wellness, and general women's health.
Be warm, empathetic, and supportive. Keep responses concise (2-4 sentences) unless detailed explanation is needed.
Never use markdown headers. You may use short bullet points sparingly.
Always recommend consulting a doctor for serious medical concerns.`,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  return data.content.map(b => b.text || "").join("").trim();
}

function Spinner() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: "50%",
      border: "2px solid #fde8e8",
      borderTopColor: "#e8928f",
      animation: "spinnerRing 0.7s linear infinite",
    }} />
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#f0a8a0",
          animation: `notifBounce 1s ${i * 0.18}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

function Msg({ m }) {
  const isBot = m.role === "assistant";
  return (
    <div className="tw-msg" style={{
      display: "flex",
      flexDirection: isBot ? "row" : "row-reverse",
      gap: 8,
      alignItems: "flex-end",
      marginBottom: 12,
    }}>
      {isBot && (
        <div style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #e8928f, #d4787a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, marginBottom: 2,
        }}>🌸</div>
      )}
      <div style={{
        maxWidth: "78%",
        background: isBot ? "#fff5f5" : "linear-gradient(135deg, #e8928f, #d4787a)",
        color: isBot ? "#2c1a1a" : "#fff",
        borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
        padding: "9px 13px",
        fontSize: 13.5,
        lineHeight: 1.6,
        fontFamily: "inherit",
        fontWeight: 400,
        boxShadow: isBot ? "0 1px 4px rgba(0,0,0,0.06)" : "0 2px 10px rgba(232,146,143,0.3)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {m.content}
        <div style={{
          fontSize: 10, marginTop: 4, opacity: 0.5,
          textAlign: isBot ? "left" : "right",
        }}>
          {fmtTime(m.ts)}
        </div>
      </div>
    </div>
  );
}

const QUICK = [
  "What can you help me with?",
  "How do I track my cycle?",
  "Tell me about PCOS symptoms",
  "Tips for period pain relief",
];

export default function CollapsibleChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [greeted, setGreeted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 120);
      if (!greeted) {
        setGreeted(true);
        setMsgs([{
          id: uid(), role: "assistant", ts: Date.now(),
          content: "Hi there! I'm Taara, your Tarangini health assistant 🌸 Ask me anything about your cycle, PCOS, or women's wellness!",
        }]);
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

  return (
    <>
      <style>{STYLES}</style>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24,
          width: "min(360px, calc(100vw - 48px))",
          height: "min(520px, calc(100vh - 120px))",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(232,146,143,0.12)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
          animation: "widgetPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          border: "1px solid #fde8e8",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #e8928f 0%, #d4787a 100%)",
            padding: "16px 18px",
            display: "flex", alignItems: "center", gap: 12,
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, border: "1.5px solid rgba(255,255,255,0.3)",
            }}>🌸</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#fff", letterSpacing: "0.01em" }}>
                Taara — AI Health Assistant
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                Online · always here for you
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
                width: 28, height: 28, borderRadius: "50%",
                color: "#fff", fontSize: 14, display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            >×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px 6px" }}>
            {msgs.map(m => <Msg key={m.id} m={m} />)}
            {loading && (
              <div className="tw-msg" style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg, #e8928f, #d4787a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12,
                }}>🌸</div>
                <div style={{
                  background: "#fff5f5", borderRadius: "4px 16px 16px 16px",
                  padding: "10px 14px",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Quick replies */}
            {msgs.length <= 1 && !loading && (
              <div style={{ animation: "fadeUp 0.3s 0.2s ease-out both" }}>
                <div style={{ fontSize: 11, color: "#c0a0a0", marginBottom: 8, paddingLeft: 2 }}>
                  Suggested
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {QUICK.map(q => (
                    <button key={q} onClick={() => send(q)} style={{
                      textAlign: "left", background: "#fdf8f8",
                      border: "1px solid #f0e0e0", borderRadius: 10,
                      padding: "8px 12px", fontSize: 12.5, color: "#888",
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.12s",
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "#fff0f0";
                        e.currentTarget.style.borderColor = "#f0b0a8";
                        e.currentTarget.style.color = "#d4787a";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "#fdf8f8";
                        e.currentTarget.style.borderColor = "#f0e0e0";
                        e.currentTarget.style.color = "#888";
                      }}
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
          <div style={{ padding: "10px 12px 14px", borderTop: "1px solid #fde8e8", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                className="tw-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask me anything about your health..."
                disabled={loading}
                rows={1}
                onInput={e => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
                }}
                style={{
                  flex: 1, fontFamily: "inherit", fontSize: 13.5,
                  border: "1.5px solid #f0e0e0", borderRadius: 12,
                  padding: "9px 12px", resize: "none", outline: "none",
                  background: "#fdf8f8", color: "#333",
                  lineHeight: 1.5, maxHeight: 90, overflowY: "auto",
                  transition: "border-color 0.15s",
                }}
              />
              <button
                className="tw-send"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: 12, border: "none",
                  background: (!input.trim() || loading) ? "#f0e0e0" : "linear-gradient(135deg, #e8928f, #d4787a)",
                  color: (!input.trim() || loading) ? "#c0a0a0" : "#fff",
                  cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
                  boxShadow: (!input.trim() || loading) ? "none" : "0 4px 12px rgba(232,146,143,0.4)",
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
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#d0b0b0" }}>
              Powered by Claude · Press Enter to send
            </div>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        className="tw-trigger"
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: "50%",
          background: open ? "#fff" : "linear-gradient(135deg, #e8928f 0%, #d4787a 100%)",
          border: open ? "1.5px solid #fde8e8" : "none",
          cursor: "pointer", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.1)" : "0 8px 24px rgba(232,146,143,0.4)",
          transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8928f" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {unread > 0 && !open && (
          <div style={{
            position: "absolute", top: -2, right: -2,
            width: 18, height: 18, borderRadius: "50%",
            background: "#ef4444", color: "#fff",
            fontSize: 10, fontWeight: 700, fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #fff",
          }}>
            {unread}
          </div>
        )}
      </button>
    </>
  );
}
