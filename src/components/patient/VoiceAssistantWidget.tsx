import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  VoiceIcon,
  MedicineIcon,
  SOSIcon,
  WaterIcon,
  PhoneIcon,
} from '../common/Icons';
import { Button } from '../common/Button';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceAssistantWidget: React.FC<{ isCompact?: boolean }> = ({
  isCompact = true,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const {
    todayLogs,
    patient,
    triggerSOS,
    addWaterGlass,
  } = useHealth();

  const { language, t } = useLanguage();

  /*
   * Medicine names are stored internally in English.
   * These translations only change what is displayed or spoken.
   */
  const medicineTranslations: Record<
    string,
    Record<'en' | 'te' | 'hi', string>
  > = {
    amlodipine: {
      en: 'Amlodipine',
      te: 'అమ్లోడిపైన్',
      hi: 'एम्लोडिपिन',
    },

    metformin: {
      en: 'Metformin',
      te: 'మెట్‌ఫార్మిన్',
      hi: 'मेटफॉर्मिन',
    },

    'vitamin d3': {
      en: 'Vitamin D3',
      te: 'విటమిన్ D3',
      hi: 'विटामिन D3',
    },

    paracetamol: {
      en: 'Paracetamol',
      te: 'పారాసెటామాల్',
      hi: 'पैरासिटामोल',
    },

    acetaminophen: {
      en: 'Acetaminophen',
      te: 'అసిటామినోఫెన్',
      hi: 'एसिटामिनोफेन',
    },

    aspirin: {
      en: 'Aspirin',
      te: 'ఆస్పిరిన్',
      hi: 'एस्पिरिन',
    },

    atorvastatin: {
      en: 'Atorvastatin',
      te: 'అటోర్వాస్టాటిన్',
      hi: 'एटोरवास्टेटिन',
    },

    losartan: {
      en: 'Losartan',
      te: 'లోసార్టాన్',
      hi: 'लोसार्टान',
    },

    telmisartan: {
      en: 'Telmisartan',
      te: 'టెల్మిసార్టాన్',
      hi: 'टेल्मिसार्टन',
    },

    omeprazole: {
      en: 'Omeprazole',
      te: 'ఒమెప్రజోల్',
      hi: 'ओमेप्राज़ोल',
    },

    pantoprazole: {
      en: 'Pantoprazole',
      te: 'పాంటోప్రజోల్',
      hi: 'पैंटोप्राज़ोल',
    },

    levothyroxine: {
      en: 'Levothyroxine',
      te: 'లెవోథైరాక్సిన్',
      hi: 'लेवोथायरोक्सिन',
    },

    insulin: {
      en: 'Insulin',
      te: 'ఇన్సులిన్',
      hi: 'इंसुलिन',
    },
  };

  const translateMedicineName = (medicineName: string): string => {
    const key = medicineName.trim().toLowerCase();

    const translated = medicineTranslations[key];

    if (!translated) {
      return medicineName;
    }

    return translated[language] || translated.en;
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (language === 'te') {
        utterance.lang = 'te-IN';
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const getNextMedicineResponse = () => {
    const nextMed = todayLogs.find((l) => l.status === 'pending');

    if (nextMed) {
      const medicineName = translateMedicineName(nextMed.medicineName);

      if (language === 'te') {
        return `మీ తదుపరి మందు ${medicineName}, మోతాదు ${nextMed.dosage}. ఇది ${nextMed.scheduledTime} కి తీసుకోవాలి.`;
      }

      if (language === 'hi') {
        return `आपकी अगली दवा ${medicineName} है, जिसकी खुराक ${nextMed.dosage} है। इसे ${nextMed.scheduledTime} बजे लेना है।`;
      }

      return `Your next medicine is ${medicineName}, ${nextMed.dosage}, scheduled for ${nextMed.scheduledTime}.`;
    }

    if (language === 'te') {
      return 'ఈ రోజు మీ షెడ్యూల్ చేసిన అన్ని మందులను తీసుకున్నారు! అద్భుతమైన పని.';
    }

    if (language === 'hi') {
      return 'आज आपने अपनी सभी निर्धारित दवाएँ ले ली हैं! बहुत अच्छा काम।';
    }

    return 'You have taken all your scheduled medicines for today! Excellent job.';
  };

  const getWaterResponse = () => {
    if (language === 'te') {
      return 'మీ కోసం ఒక గ్లాసు నీటిని నమోదు చేశాను. రోజంతా తగినంత నీరు తాగాలని గుర్తుంచుకోండి!';
    }

    if (language === 'hi') {
      return 'मैंने आपके लिए एक गिलास पानी दर्ज कर दिया है। पूरे दिन पर्याप्त पानी पीना याद रखें!';
    }

    return 'I logged one glass of water for you. Remember to stay hydrated throughout the day!';
  };

  const getSOSResponse = () => {
    if (language === 'te') {
      return 'అత్యవసర SOS సక్రియం చేయబడింది. మీ సంరక్షకుడికి అత్యవసర హెచ్చరిక పంపబడింది!';
    }

    if (language === 'hi') {
      return 'आपातकालीन SOS सक्रिय कर दिया गया है। आपके देखभालकर्ता को आपातकालीन अलर्ट भेज दिया गया है!';
    }

    return 'Emergency SOS has been activated. Emergency alert sent to your caregiver!';
  };

  const getCaregiverResponse = () => {
    const caregiverName = patient.caregiverName || 'Ravi';

    if (language === 'te') {
      return `మీ సంరక్షకుడు ${caregiverName} కి ${patient.caregiverPhone} నంబర్‌కు కాల్‌ను కనెక్ట్ చేస్తున్నాను...`;
    }

    if (language === 'hi') {
      return `आपके देखभालकर्ता ${caregiverName} को ${patient.caregiverPhone} पर कॉल कनेक्ट कर रहा हूँ...`;
    }

    return `Connecting call to your caregiver ${caregiverName} at ${patient.caregiverPhone}...`;
  };

  const getUnknownResponse = (input: string) => {
    if (language === 'te') {
      return `నేను విన్నది: "${input}". మీ మందులు, నీటి సేవనం లేదా అత్యవసర పరిచయాల విషయంలో నేను ఎలా సహాయం చేయగలను?`;
    }

    if (language === 'hi') {
      return `मैंने सुना: "${input}"। मैं आपकी दवाओं, पानी पीने या आपातकालीन संपर्कों में कैसे मदद कर सकता हूँ?`;
    }

    return `I heard: "${input}". How can I help you with your medicines, water intake, or emergency contacts?`;
  };

  const processIntent = (input: string) => {
    const lower = input.toLowerCase();
    let reply = '';

    const medicineKeywords = [
      'next',
      'medicine',
      'medication',
      'दवा',
      'अगली',
      'अगली दवा',
      'తరువాత',
      'మందు',
      'తదుపరి',
    ];

    const waterKeywords = [
      'water',
      'drink',
      'నీరు',
      'తాగు',
      'पानी',
      'पीना',
    ];

    const sosKeywords = [
      'sos',
      'emergency',
      'help',
      'అత్యవసర',
      'సహాయం',
      'आपातकालीन',
      'मदद',
    ];

    const caregiverKeywords = [
      'call',
      'caregiver',
      'phone',
      'రవి',
      'కేర్‌గివర్',
      'కేర్ గివర్',
      'కాల్',
      'कॉल',
      'देखभालकर्ता',
    ];

    if (
      medicineKeywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      reply = getNextMedicineResponse();
    } else if (
      waterKeywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      addWaterGlass();
      reply = getWaterResponse();
    } else if (
      sosKeywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      triggerSOS('voice_trigger');
      reply = getSOSResponse();
    } else if (
      caregiverKeywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      reply = getCaregiverResponse();
    } else {
      reply = getUnknownResponse(input);
    }

    setResponse(reply);
    speakText(reply);
  };

  const getFallbackText = () => {
    if (language === 'te') {
      return 'నా తదుపరి మందు ఏమిటి?';
    }

    if (language === 'hi') {
      return 'मेरी अगली दवा क्या है?';
    }

    return 'What is my next medicine?';
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      if (language === 'te') {
        recognition.lang = 'te-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;

        setTranscript(text);
        setIsListening(false);

        processIntent(text);
      };

      recognition.onerror = () => {
        setIsListening(false);

        const fallbackText = getFallbackText();

        setTranscript(fallbackText);
        processIntent(fallbackText);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setTimeout(() => {
        setIsListening(false);

        const sampleCommand = getFallbackText();

        setTranscript(sampleCommand);
        processIntent(sampleCommand);
      }, 1500);
    }
  };

  const listeningText = () => {
    if (language === 'te') {
      return 'మీ మాట వింటున్నాను...';
    }

    if (language === 'hi') {
      return 'आपकी आवाज़ सुन रहा हूँ...';
    }

    return 'Listening to your voice...';
  };

  const tapToSpeakText = () => {
    if (language === 'te') {
      return 'మైక్‌ను నొక్కి మాట్లాడండి';
    }

    if (language === 'hi') {
      return 'माइक दबाकर बोलें';
    }

    return 'Tap the mic and speak';
  };

  const exampleText = () => {
    if (language === 'te') {
      return 'ఉదా: "నా తదుపరి మందు ఏమిటి?"';
    }

    if (language === 'hi') {
      return 'उदाहरण: "मेरी अगली दवा क्या है?"';
    }

    return 'e.g., "What is my next medicine?"';
  };

  const youSaidText = () => {
    if (language === 'te') {
      return 'మీరు చెప్పారు:';
    }

    if (language === 'hi') {
      return 'आपने कहा:';
    }

    return 'You said:';
  };

  return (
    <div className="bg-surface border border-hairline rounded-[24px] p-5 shadow-xs">

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <motion.button
            animate={
              isListening
                ? { scale: [1, 1.1, 1] }
                : { scale: 1 }
            }
            transition={
              isListening
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {}
            }
            onClick={startListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isListening
                ? 'bg-accent-secondary text-white'
                : 'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20'
            }`}
            title={t('voiceAssistant')}
            aria-label={t('voiceAssistant')}
          >
            <VoiceIcon size={24} />
          </motion.button>

          <div>

            <h3 className="font-heading font-semibold text-lg text-primary">
              {t('voiceAssistant')}
            </h3>

            <p className="text-xs text-secondary">
              {isListening
                ? listeningText()
                : `${tapToSpeakText()} (${exampleText()})`}
            </p>

          </div>

        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={startListening}
        >
          {isListening ? t('listening') : t('talk')}
        </Button>

      </div>

      {/* Transcript & Response Area */}
      {transcript && (
        <div className="p-3 bg-sunken rounded-2xl border border-hairline mb-3 text-sm">

          <p className="text-xs font-semibold text-accent-secondary mb-1">
            {youSaidText()}
          </p>

          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                processIntent(transcript);
              }
            }}
            className="w-full bg-surface border border-hairline rounded-xl p-2 text-primary text-sm font-medium mb-2 focus:outline-none"
          />

          {response && (
            <div className="pt-2 border-t border-hairline flex items-start gap-2">

              <span className="text-base">🤖</span>

              <p className="text-primary font-medium">
                {response}
              </p>

            </div>
          )}

        </div>
      )}

      {/* Suggested Quick Intent Buttons */}
      {!isCompact && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-hairline">

          {/* Next Medicine */}
          <button
            onClick={() =>
              processIntent(
                language === 'te'
                  ? 'నా తదుపరి మందు ఏమిటి?'
                  : language === 'hi'
                  ? 'मेरी अगली दवा क्या है?'
                  : 'What is my next medicine?'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <MedicineIcon size={16} />
            {t('nextMedicineAction')}
          </button>

          {/* Water */}
          <button
            onClick={() =>
              processIntent(
                language === 'te'
                  ? 'ఒక గ్లాసు నీరు నమోదు చేయండి'
                  : language === 'hi'
                  ? 'एक गिलास पानी दर्ज करें'
                  : 'Log one glass of water'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <WaterIcon size={16} />
            {t('drinkWater')}
          </button>

          {/* Caregiver */}
          <button
            onClick={() =>
              processIntent(
                language === 'te'
                  ? 'కేర్ గివర్‌కు కాల్ చేయండి'
                  : language === 'hi'
                  ? 'देखभालकर्ता को कॉल करें'
                  : 'Call caregiver'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-sunken hover:bg-surface border border-hairline text-xs font-medium text-primary flex items-center gap-1.5 transition-colors"
          >
            <PhoneIcon size={16} />
            {t('callCaregiver')}
          </button>

          {/* SOS */}
          <button
            onClick={() =>
              processIntent(
                language === 'te'
                  ? 'అత్యవసర SOS ప్రారంభించండి'
                  : language === 'hi'
                  ? 'आपातकालीन SOS शुरू करें'
                  : 'Trigger emergency SOS'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-status-danger/10 hover:bg-status-danger/20 border border-status-danger/30 text-xs font-medium text-status-danger flex items-center gap-1.5 transition-colors"
          >
            <SOSIcon size={16} />
            {t('sendSOS')}
          </button>

        </div>
      )}

    </div>
  );
};