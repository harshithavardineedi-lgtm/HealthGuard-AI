import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te' | 'hi';

type Translations = Record<string, Record<Language, string>>;

export const translations: Translations = {
  dashboard: {
    en: 'Dashboard',
    te: 'డ్యాష్‌బోర్డ్',
    hi: 'डैशबोर्ड',
  },
  medicines: {
    en: 'Medicines',
    te: 'మందులు',
    hi: 'दवाइयाँ',
  },
  water: {
    en: 'Today\'s Water',
    te: 'ఈ రోజు నీరు',
    hi: 'आज का पानी',
  },
  sos: {
    en: 'EMERGENCY SOS',
    te: 'అత్యవసర SOS',
    hi: 'आपातकालीन एसओएस',
  },
  caregiver: {
    en: 'Caregiver',
    te: 'సంరక్షకుడు',
    hi: 'देखभालकर्ता',
  },
  settings: {
    en: 'Settings',
    te: 'సెట్టింగ్‌లు',
    hi: 'सेटिंग्स',
  },
  taken: {
    en: 'Taken',
    te: 'తీసుకున్నారు',
    hi: 'ले ली',
  },
  skipped: {
    en: 'Skipped',
    te: 'వదిలేసారు',
    hi: 'छोड़ दी',
  },
  reminder: {
    en: 'Reminder',
    te: 'జ్ఞాపిక',
    hi: 'रिमाइंडर',
  },
  emergency: {
    en: 'Emergency Help',
    te: 'అత్యవసర సహాయం',
    hi: 'आपातकालीन सहायता',
  },
  call: {
    en: 'Call',
    te: 'కాల్ చేయండి',
    hi: 'कॉल करें',
  },
  location: {
    en: 'Your Location',
    te: 'మీ స్థానం',
    hi: 'आपकी लोकेशन',
  },
  voiceAssistant: {
    en: 'Voice Assistant',
    te: 'వాయిస్ అసిస్టెంట్',
    hi: 'वॉयस असिस्टेंट',
  },
  goodMorning: {
    en: 'Good Morning',
    te: 'శుభోదయం',
    hi: 'सुप्रभात',
  },
  nextMedicine: {
    en: 'Next Medicine',
    te: 'తరువాత తీసుకోల్సిన మందు',
    hi: 'अगली दवा',
  },
  markAsTaken: {
    en: 'Mark as Taken',
    te: 'తీసుకున్నట్లు మార్క్ చేయండి',
    hi: 'ली गई के रूप में मार्क करें',
  },
  skip: {
    en: 'Skip Dose',
    te: 'డోస్ స్కిప్ చేయండి',
    hi: 'खुराक छोड़ें',
  },
  addGlass: {
    en: 'Add Glass',
    te: 'గ్లాసు జోడించండి',
    hi: 'ग्लास जोड़ें',
  },
  profile: {
    en: 'Profile',
    te: 'ప్రొఫైల్',
    hi: 'प्रोफ़ाइल',
  },
  analytics: {
    en: 'Analytics',
    te: 'విశ్లేషణలు',
    hi: 'एनालिटिक्स',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('hg_language');
    if (saved === 'en' || saved === 'te' || saved === 'hi') return saved;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('hg_language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
