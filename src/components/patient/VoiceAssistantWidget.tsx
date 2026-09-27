import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VoiceIcon, MedicineIcon, SOSIcon, WaterIcon, PhoneIcon } from '../common/Icons';
import { Button } from '../common/Button';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceAssistantWidget: React.FC<{ isCompact?: boolean }> = ({ isCompact = true }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const { todayLogs, patient, triggerSOS, addWaterGlass } = useHealth();
  const { language, t } = useLanguage();

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'te') utterance.lang = 'te-IN';
      else if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const processIntent = (input: string) => {
    const lower = input.toLowerCase();
    let reply = '';

    if (lower.includes('next') || lower.includes('medicine') || lower.includes('తరువాత') || lower.includes('दवा')) {
      const nextMed = todayLogs.find((l) => l.status === 'pending');
      if (nextMed) {
        reply = `Your next medicine is ${nextMed.medicineName} ${nextMed.dosage} scheduled for ${nextMed.scheduledTime}.`;
      } else {
        reply = 'You have taken all your scheduled medicines for today! Excellent job.';
      }
    } else if (lower.includes('water') || lower.includes('నీరు') || lower.includes('पानी')) {
      addWaterGlass();
      reply = 'I logged one glass of water for you. Remember to stay hydrated throughout the day!';
    } else if (lower.includes('sos') || lower.includes('emergency') || lower.includes('అత్యవసర') || lower.includes('आपत्कालीन')) {
      triggerSOS('voice_trigger');
      reply = 'Emergency SOS has been activated. Emergency alert sent to your caregiver!';
    } else if (lower.includes('call') || lower.includes('caregiver') || lower.includes('రవి') || lower.includes('कॉल')) {
      reply = `Connecting call to your caregiver ${patient.caregiverName || 'Ravi'} at ${patient.caregiverPhone}...`;
    } else {
      reply = `I heard: "${input}". How can I help you with your medicines, water intake, or emergency contacts?`;
    }

    setResponse(reply);
    speakText(reply);
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      if (language === 'te') recognition.lang = 'te-IN';
      else if (language === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        processIntent(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
        // Fallback demo string if mic error
        const fallbackText = language === 'te' ? 'నా తరువాత మందు ఏమిటి' : 'What is my next medicine?';
        setTranscript(fallbackText);
        processIntent(fallbackText);
      };

      recognition.start();
    } else {
      // Browser fallback demo simulation
      setTimeout(() => {
        setIsListening(false);
        const sampleCmd = 'What is my next medicine?';
        setTranscript(sampleCmd);
        processIntent(sampleCmd);
      }, 1500);
    }
  };

  return (
    <div className="bg-surface border border-hairline rounded-[24px] p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Calmer mic listening pulse (Section 14 & 3.5) */}
          <motion.button
            animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={isListening ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
            onClick={startListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isListening ? 'bg-accent-secondary text-white' : 'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20'
            }`}
            title="Click to talk to Voice Assistant"
          >
            <VoiceIcon size={24} />
          </motion.button>
          <div>
            <h3 className="font-heading font-semibold text-lg text-primary">{t('voiceAssistant')}</h3>
            <p className="text-xs text-secondary">
              {isListening ? 'Listening to your voice...' : 'Tap the mic and speak (e.g., "What is my next medicine?")'}
            </p>
          </div>
        </div>

        <Button variant="secondary" size="sm" onClick={startListening}>
          {isListening ? 'Listening...' : 'Talk'}
        </Button>
      </div>

      {/* Transcript & Response Area */}
      {transcript && (
        <div className="p-3 bg-sunken rounded-2xl border border-hairline mb-3 text-sm">
          <p className="text-xs font-semibold text-accent-secondary mb-1">You said:</p>
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') processIntent(transcript);
            }}
            className="w-full bg-surface border border-hairline rounded-xl p-2 text-primary text-sm font-medium mb-2 focus:outline-none"
          />
          {response && (
            <div className="pt-2 border-t border-hairline flex items-start gap-2">
              <span className="text-base">🤖</span>
              <p className="text-primary font-medium">{response}</p>
            </div>
          )}
        </div>
      )}

      {/* Suggested Quick Intent Buttons */}
      {!isCompact && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-hairline">
          <button
            onClick={() => processIntent('What is my next medicine?')}
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <MedicineIcon size={16} /> Next Medicine
          </button>
          <button
            onClick={() => processIntent('Log one glass of water')}
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <WaterIcon size={16} /> Drink Water
          </button>
          <button
            onClick={() => processIntent('Call caregiver')}
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <PhoneIcon size={16} /> Call Caregiver
          </button>
          <button
            onClick={() => processIntent('Trigger emergency SOS')}
            className="px-3 py-1.5 rounded-xl bg-status-danger/10 hover:bg-status-danger/20 border border-status-danger/30 text-xs font-medium text-status-danger flex items-center gap-1.5 transition-colors"
          >
            <SOSIcon size={16} /> Send SOS
          </button>
        </div>
      )}
    </div>
  );
};
