import { useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import QuickQuestions from "../components/chat/QuickQuestions";
import ChatInput from "../components/chat/ChatInput";

// ─── Mock AI response — replace with real API call ───────────────
const MOCK_RESPONSES = {
  "What are early pregnancy signs?":
    "Early pregnancy signs include a missed period, mild cramping or spotting (implantation bleeding), breast tenderness, nausea (morning sickness), fatigue, and frequent urination.\n\nThese typically appear 1–2 weeks after conception. A home pregnancy test is reliable from the first day of a missed period. 🤍",
  "How to manage period cramps?":
    "Here are evidence-based ways to relieve period cramps:\n\n• Heat therapy — a heating pad on your lower abdomen helps relax uterine muscles\n• NSAIDs (ibuprofen) — most effective when taken 1–2 days before your period\n• Light exercise — walking or yoga improves blood flow\n• Magnesium-rich foods — dark chocolate, nuts, and leafy greens\n• Stay hydrated — reduces bloating that worsens cramps\n\nIf pain is debilitating, please consult a gynecologist to rule out endometriosis.",
  "Is my cycle normal?":
    "A typical menstrual cycle is 21–35 days, with bleeding lasting 2–7 days. Slight variation each month is completely normal.\n\nYou should see a doctor if:\n• Cycles are consistently shorter than 21 days or longer than 35\n• Bleeding is very heavy (soaking a pad every hour)\n• You experience severe pain\n• Your cycle suddenly changes significantly\n\nTracking your cycle for 3+ months gives the clearest picture of what's normal for you. 💕",
  "PCOS diet tips":
    "A PCOS-friendly diet focuses on balancing blood sugar and reducing inflammation:\n\n• Low-GI foods — oats, legumes, quinoa, sweet potatoes\n• Lean protein with every meal — stabilises insulin levels\n• Anti-inflammatory foods — berries, turmeric, fatty fish\n• Limit sugar & refined carbs — they spike insulin, worsening PCOS\n• Eat every 3–4 hours — prevents blood sugar crashes\n\nSmall consistent changes matter more than strict dieting. 🌿",
  "Benefits of cycle tracking":
    "Tracking your menstrual cycle offers several important benefits:\n\n• Predicts your next period & fertile window\n• Helps identify patterns in mood, energy, and symptoms\n• Detects early signs of hormonal imbalances or PCOS\n• Supports fertility awareness (whether trying to conceive or not)\n• Empowers you to have more informed conversations with your doctor\n\nJust 3 months of consistent tracking reveals meaningful health insights.",
  "When to see a gynecologist?":
    "You should schedule a visit if you experience:\n\n• Missed periods (not pregnancy-related)\n• Very heavy or prolonged bleeding\n• Severe cramps that interfere with daily life\n• Unusual discharge or persistent odour\n• Pain during intercourse\n• Symptoms of PCOS (irregular cycles, hair growth, acne)\n\nAs a general rule, annual well-woman check-ups are recommended from age 21 onwards, regardless of symptoms. 💙",
};

async function getAIResponse(question) {
  // Replace this with: const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: question }) });
  await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));
  return (
    MOCK_RESPONSES[question] ||
    "That's a great question! For personalised advice about your health, I'd recommend logging your symptoms regularly in the Symptom Tracker and consulting with a specialist if you have concerns.\n\nIs there something specific about your cycle or PCOS symptoms I can help clarify? 💕"
  );
}

const WELCOME = {
  id: "welcome",
  role: "ai",
  text: "Hello! I'm here to answer your health questions. How can I help you today? 💕",
  timestamp: Date.now(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    const userMsg = { id: Date.now(), role: "user", text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const reply = await getAIResponse(text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        text: reply,
        timestamp: Date.now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Show quick questions only while conversation is at the welcome-only state
  const showChips = messages.length <= 1 && !isTyping;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
    }}>
      <ChatHeader />

      {/* Outer salmon/pink container that wraps MessageList + QuickQuestions */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "radial-gradient(circle at 20% 50%, #f5b8b0 0%, #e89898 40%, #e08888 100%)",
        margin: "0 40px",
        borderRadius: "16px 16px 0 0",
        position: "relative",
        top: "-10px",
      }}>
        <MessageList
          messages={messages}
          isTyping={isTyping}
          quickQuestionsVisible={showChips}
        />

        <QuickQuestions onSelect={sendMessage} disabled={isTyping} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
