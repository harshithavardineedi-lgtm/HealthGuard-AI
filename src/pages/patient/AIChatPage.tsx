import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { Button } from '../../components/common/Button';
import type { ChatMessage } from '../../types';

export const AIChatPage: React.FC = () => {
  const { waterLog, patient, medicines } = useHealth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello ${patient.name}! I am your HealthGuard AI support assistant. I can answer questions about your scheduled medicines, daily hydration goals, caregiver connection status, or emergency controls. How can I help you today?`,
      timestamp: 'Just now',
      suggestedActions: [
        'What medicines do I take today?',
        'How much water have I drunk?',
        'Who is my caregiver?',
        'How do I trigger an emergency alert?',
      ],
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Answer from local data only (No medical diagnosis)
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';

      if (lower.includes('medicine') || lower.includes('dose') || lower.includes('tablet')) {
        const medList = medicines.map((m) => `${m.name} (${m.dosage}) at ${m.time}`).join('\n• ');
        replyText = `Here is your current daily medicine schedule:\n• ${medList}\n\nYour current adherence rate is ${patient.adherencePercentage}%.`;
      } else if (lower.includes('water') || lower.includes('hydration')) {
        replyText = `You have logged ${waterLog.consumedGlasses} out of your ${waterLog.targetGlasses} target glasses of water today.`;
      } else if (lower.includes('caregiver') || lower.includes('family')) {
        replyText = patient.caregiverName
          ? `Your connected caregiver is ${patient.caregiverName} (${patient.caregiverPhone}). They are receiving your remote health adherence logs.`
          : 'You do not have a connected caregiver currently. You can connect one from the Caregiver screen.';
      } else if (lower.includes('sos') || lower.includes('emergency') || lower.includes('help')) {
        replyText = 'To send an emergency SOS alert immediately, tap the red SOS button at the bottom right of any screen, or say "Send SOS" to the Voice Assistant.';
      } else {
        replyText = 'I am here to assist with your medicines, water tracking, caregiver communication, and emergency controls. Please note I am a support reminder tool and do not provide medical diagnosis or advice.';
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 md:pb-12 flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-6 w-full flex-1 flex flex-col">
        {/* Persistent Non-Alarming Medical Disclaimer (Section 41) */}
        <div className="p-3 mb-4 rounded-2xl bg-sunken border border-hairline text-xs text-secondary leading-snug">
          ℹ️ <strong>Medical Disclaimer:</strong> HealthGuard AI is a healthcare support and reminder system. It does not diagnose medical conditions or replace professional medical advice. For emergencies, contact local emergency services immediately.
        </div>

        {/* Chat History Box */}
        <div className="flex-1 bg-surface border border-hairline rounded-[24px] p-5 shadow-xs overflow-y-auto max-h-[500px] space-y-4 mb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-accent-secondary text-white rounded-br-none font-medium'
                    : 'bg-sunken border border-hairline text-primary rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
              </div>

              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(action)}
                      className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-semibold text-primary transition-colors cursor-pointer"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about medicines, water, or caregiver..."
            className="flex-1 p-3.5 rounded-2xl bg-surface border border-hairline text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/40"
          />
          <Button variant="primary" size="md" type="submit" className="bg-accent-primary">
            Send
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};
