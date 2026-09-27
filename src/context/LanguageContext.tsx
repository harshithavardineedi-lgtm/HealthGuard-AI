import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi';

interface Translation {
  en: string;
  te: string;
  hi: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Translation> = {
  // =====================================================
  // NAVIGATION
  // =====================================================

  dashboard: {
    en: 'Dashboard',
    te: 'డాష్‌బోర్డ్',
    hi: 'डैशबोर्ड',
  },

  patients: {
    en: 'Patients',
    te: 'రోగులు',
    hi: 'मरीज',
  },

  alertsSos: {
    en: 'Alerts & SOS',
    te: 'హెచ్చరికలు & SOS',
    hi: 'अलर्ट और SOS',
  },

  messages: {
    en: 'Messages',
    te: 'సందేశాలు',
    hi: 'संदेश',
  },

  careAnalytics: {
    en: 'Care Analytics',
    te: 'కేర్ విశ్లేషణలు',
    hi: 'केयर विश्लेषण',
  },

  settings: {
    en: 'Settings',
    te: 'సెట్టింగ్స్',
    hi: 'सेटिंग्स',
  },

  profile: {
    en: 'Profile',
    te: 'ప్రొఫైల్',
    hi: 'प्रोफ़ाइल',
  },

  support: {
    en: 'HealthGuard Support',
    te: 'HealthGuard సహాయం',
    hi: 'HealthGuard सहायता',
  },

  monitoringAssistance: {
    en: '24/7 Monitoring assistance active for linked family members.',
    te: 'కనెక్ట్ చేసిన కుటుంబ సభ్యుల కోసం 24/7 మానిటరింగ్ సహాయం యాక్టివ్‌గా ఉంది.',
    hi: 'कनेक्ट किए गए परिवार के सदस्यों के लिए 24/7 निगरानी सहायता सक्रिय है।',
  },

  medicines: {
    en: 'Medicines',
    te: 'మందులు',
    hi: 'दवाइयाँ',
  },

  water: {
    en: 'Water',
    te: 'నీరు',
    hi: 'पानी',
  },

  sos: {
    en: 'SOS',
    te: 'SOS',
    hi: 'SOS',
  },

  caregiver: {
    en: 'Caregiver',
    te: 'సంరక్షకుడు',
    hi: 'देखभालकर्ता',
  },

  portal: {
    en: 'Portal',
    te: 'పోర్టల్',
    hi: 'पोर्टल',
  },

  analytics: {
    en: 'Analytics',
    te: 'విశ్లేషణలు',
    hi: 'विश्लेषण',
  },

  // =====================================================
  // GREETINGS
  // =====================================================

  goodMorning: {
    en: 'Good Morning',
    te: 'శుభోదయం',
    hi: 'सुप्रभात',
  },

  goodAfternoon: {
    en: 'Good Afternoon',
    te: 'శుభ మధ్యాహ్నం',
    hi: 'शुभ दोपहर',
  },

  goodEvening: {
    en: 'Good Evening',
    te: 'శుభ సాయంత్రం',
    hi: 'शुभ संध्या',
  },

  // =====================================================
  // SYSTEM
  // =====================================================

  systemStatus: {
    en: 'System Status',
    te: 'సిస్టమ్ స్థితి',
    hi: 'सिस्टम स्थिति',
  },

  remindersActive: {
    en: 'Reminders Active',
    te: 'రిమైండర్లు యాక్టివ్‌గా ఉన్నాయి',
    hi: 'रिमाइंडर सक्रिय हैं',
  },

  adherence: {
    en: 'Adherence',
    te: 'మందుల పాటింపు',
    hi: 'दवा पालन',
  },

  adherenceRate: {
    en: 'Adherence Rate',
    te: 'మందుల పాటింపు రేటు',
    hi: 'दवा पालन दर',
  },

  // =====================================================
  // MEDICINES
  // =====================================================

  medicine: {
    en: 'Medicine',
    te: 'మందు',
    hi: 'दवा',
  },

  nextMedicine: {
    en: 'Next Medicine',
    te: 'తదుపరి మందు',
    hi: 'अगली दवा',
  },

  todaysSchedule: {
    en: "Today's Schedule",
    te: 'ఈరోజు షెడ్యూల్',
    hi: 'आज का शेड्यूल',
  },

  dosesTaken: {
    en: 'Doses Taken',
    te: 'తీసుకున్న మోతాదులు',
    hi: 'ली गई खुराक',
  },

  dosesTakenLabel: {
    en: 'Doses Taken',
    te: 'తీసుకున్న మోతాదులు',
    hi: 'ली गई खुराक',
  },

  taken: {
    en: 'Taken',
    te: 'తీసుకున్నారు',
    hi: 'ली गई',
  },

  skipped: {
    en: 'Skipped',
    te: 'వదిలేశారు',
    hi: 'छोड़ी गई',
  },

  pending: {
    en: 'Pending',
    te: 'పెండింగ్',
    hi: 'लंबित',
  },

  takeNow: {
    en: 'Take Now',
    te: 'ఇప్పుడు తీసుకోండి',
    hi: 'अभी लें',
  },

  markAsTaken: {
    en: 'Mark as Taken',
    te: 'తీసుకున్నట్లు గుర్తించండి',
    hi: 'ली गई के रूप में चिन्हित करें',
  },

  skip: {
    en: 'Skip',
    te: 'వదిలేయండి',
    hi: 'छोड़ें',
  },

  afterFood: {
    en: 'After Food',
    te: 'భోజనం తర్వాత',
    hi: 'भोजन के बाद',
  },

  beforeFood: {
    en: 'Before Food',
    te: 'భోజనానికి ముందు',
    hi: 'भोजन से पहले',
  },

  withFood: {
    en: 'With Food',
    te: 'భోజనంతో',
    hi: 'भोजन के साथ',
  },

  anytime: {
    en: 'Anytime',
    te: 'ఎప్పుడైనా',
    hi: 'कभी भी',
  },

  reminder: {
    en: 'Reminder',
    te: 'రిమైండర్',
    hi: 'रिमाइंडर',
  },

  dose: {
    en: 'Dose',
    te: 'మోతాదు',
    hi: 'खुराक',
  },

  timing: {
    en: 'Timing',
    te: 'సమయం',
    hi: 'समय',
  },

  takenAt: {
    en: 'Taken At',
    te: 'తీసుకున్న సమయం',
    hi: 'लेने का समय',
  },

  scheduledTime: {
    en: 'Scheduled Time',
    te: 'షెడ్యూల్ సమయం',
    hi: 'निर्धारित समय',
  },

  scheduled: {
    en: 'Scheduled',
    te: 'షెడ్యూల్',
    hi: 'निर्धारित',
  },

  reason: {
    en: 'Reason',
    te: 'కారణం',
    hi: 'कारण',
  },

  userSkipped: {
    en: 'User skipped the dose',
    te: 'వినియోగదారు మోతాదును వదిలేశారు',
    hi: 'उपयोगकर्ता ने खुराक छोड़ दी',
  },

  greatJob: {
    en: 'Great Job!',
    te: 'చాలా బాగా చేశారు!',
    hi: 'बहुत बढ़िया!',
  },

  doseSkipped: {
    en: 'Dose skipped',
    te: 'మోతాదు వదిలేశారు',
    hi: 'खुराक छोड़ दी गई',
  },

  caregiverNotified: {
    en: 'Caregiver has been notified',
    te: 'సంరక్షకుడికి తెలియజేయబడింది',
    hi: 'देखभालकर्ता को सूचित किया गया है',
  },

  skipConfirmation: {
    en: 'Are you sure you want to skip this dose?',
    te: 'ఈ మోతాదును వదిలేయాలనుకుంటున్నారా?',
    hi: 'क्या आप इस खुराक को छोड़ना चाहते हैं?',
  },

  yesSkipDose: {
    en: 'Yes, Skip Dose',
    te: 'అవును, మోతాదును వదిలేయండి',
    hi: 'हाँ, खुराक छोड़ें',
  },

  doseMarkedAsTaken: {
    en: 'Dose marked as taken',
    te: 'మోతాదు తీసుకున్నట్లు గుర్తించబడింది',
    hi: 'खुराक को ली गई के रूप में चिन्हित किया गया',
  },

  loggingHealthAdherence: {
    en: 'Logging health adherence',
    te: 'ఆరోగ్య పాటింపును నమోదు చేస్తోంది',
    hi: 'स्वास्थ्य पालन दर्ज किया जा रहा है',
  },

  allDosesCompleted: {
    en: 'All doses completed!',
    te: 'అన్ని మోతాదులు పూర్తయ్యాయి!',
    hi: 'सभी खुराक पूरी हो गई हैं!',
  },

  allMedicinesCompleted: {
    en: 'All Medicines Completed',
    te: 'అన్ని మందులు పూర్తయ్యాయి',
    hi: 'सभी दवाइयाँ पूरी हो गई हैं',
  },

  allMedicinesCompletedMessage: {
    en: 'You have completed all your medicines for today.',
    te: 'ఈరోజు మీ అన్ని మందులను పూర్తి చేశారు.',
    hi: 'आपने आज की सभी दवाइयाँ पूरी कर ली हैं।',
  },

  // =====================================================
  // MEDICINE MANAGEMENT
  // =====================================================

  medicineManagement: {
    en: 'Medicine Management',
    te: 'మందుల నిర్వహణ',
    hi: 'दवा प्रबंधन',
  },

  medicineManagementDescription: {
    en: 'Manage daily prescriptions, dosages, and timings.',
    te: 'రోజువారీ మందులు, మోతాదులు మరియు సమయాలను నిర్వహించండి.',
    hi: 'दैनिक दवाइयों, खुराक और समय का प्रबंधन करें।',
  },

  addMedicine: {
    en: 'Add Medicine',
    te: 'మందును జోడించండి',
    hi: 'दवा जोड़ें',
  },

  noMedicinesAdded: {
    en: 'No Medicines Added Yet',
    te: 'ఇంకా మందులు జోడించలేదు',
    hi: 'अभी तक कोई दवा नहीं जोड़ी गई है',
  },

  addDailyPrescriptions: {
    en: 'Add your daily prescriptions to start receiving automated reminders.',
    te: 'ఆటోమేటిక్ రిమైండర్లు పొందడానికి మీ రోజువారీ మందులను జోడించండి.',
    hi: 'स्वचालित रिमाइंडर प्राप्त करने के लिए अपनी दैनिक दवाइयाँ जोड़ें।',
  },

  addFirstMedicine: {
    en: 'Add First Medicine',
    te: 'మొదటి మందును జోడించండి',
    hi: 'पहली दवा जोड़ें',
  },

  editPrescription: {
    en: 'Edit Prescription',
    te: 'మందు వివరాలను సవరించండి',
    hi: 'दवा की जानकारी संपादित करें',
  },

  addNewMedicine: {
    en: 'Add New Medicine',
    te: 'కొత్త మందును జోడించండి',
    hi: 'नई दवा जोड़ें',
  },

  medicineName: {
    en: 'Medicine Name',
    te: 'మందు పేరు',
    hi: 'दवा का नाम',
  },

  dosage: {
    en: 'Dosage',
    te: 'మోతాదు',
    hi: 'खुराक',
  },

  frequency: {
    en: 'Frequency',
    te: 'తరచుదనం',
    hi: 'आवृत्ति',
  },

  timingPreference: {
    en: 'Timing Preference',
    te: 'తీసుకునే సమయం',
    hi: 'लेने का समय',
  },

  doctorNotesReason: {
    en: 'Doctor Notes / Reason',
    te: 'డాక్టర్ గమనికలు / కారణం',
    hi: 'डॉक्टर की टिप्पणी / कारण',
  },

  saveMedicine: {
    en: 'Save Medicine',
    te: 'మందును సేవ్ చేయండి',
    hi: 'दवा सहेजें',
  },

  onceDaily: {
    en: 'Once Daily',
    te: 'రోజుకు ఒకసారి',
    hi: 'दिन में एक बार',
  },

  twiceDaily: {
    en: 'Twice Daily',
    te: 'రోజుకు రెండుసార్లు',
    hi: 'दिन में दो बार',
  },

  thriceDaily: {
    en: 'Thrice Daily',
    te: 'రోజుకు మూడుసార్లు',
    hi: 'दिन में तीन बार',
  },

  weekly: {
    en: 'Weekly',
    te: 'వారానికి ఒకసారి',
    hi: 'साप्ताहिक',
  },

  asNeeded: {
    en: 'As Needed',
    te: 'అవసరమైనప్పుడు',
    hi: 'आवश्यकतानुसार',
  },

  medicinePlaceholder: {
    en: 'e.g. Amlodipine',
    te: 'ఉదా. Amlodipine',
    hi: 'उदा. Amlodipine',
  },

  dosagePlaceholder: {
    en: 'e.g. 5mg',
    te: 'ఉదా. 5mg',
    hi: 'उदा. 5mg',
  },

  scheduledTimePlaceholder: {
    en: '10:00 AM',
    te: '10:00 AM',
    hi: '10:00 AM',
  },

  doctorNotesPlaceholder: {
    en: 'e.g. For blood pressure control',
    te: 'ఉదా. రక్తపోటు నియంత్రణ కోసం',
    hi: 'उदा. रक्तचाप नियंत्रण के लिए',
  },

  // =====================================================
  // WATER
  // =====================================================

  waterTracker: {
    en: 'Water Tracker',
    te: 'నీటి ట్రాకర్',
    hi: 'पानी ट्रैकर',
  },

  todaysWater: {
    en: "Today's Water",
    te: 'ఈరోజు నీరు',
    hi: 'आज का पानी',
  },

  glasses: {
    en: 'glasses',
    te: 'గ్లాసులు',
    hi: 'गिलास',
  },

  addGlass: {
    en: 'Add Glass',
    te: 'గ్లాస్ జోడించండి',
    hi: 'गिलास जोड़ें',
  },

  goal: {
    en: 'Goal',
    te: 'లక్ష్యం',
    hi: 'लक्ष्य',
  },

  daily: {
    en: 'Daily',
    te: 'రోజువారీ',
    hi: 'दैनिक',
  },

  lastLogged: {
    en: 'Last Logged',
    te: 'చివరిగా నమోదు',
    hi: 'अंतिम बार दर्ज',
  },

  earlier: {
    en: 'Earlier',
    te: 'ముందుగా',
    hi: 'पहले',
  },

  waterReminders: {
    en: 'Water Reminders',
    te: 'నీటి రిమైండర్లు',
    hi: 'पानी के रिमाइंडर',
  },

  reminderInterval: {
    en: 'Reminder Interval',
    te: 'రిమైండర్ వ్యవధి',
    hi: 'रिमाइंडर अंतराल',
  },

  every30Minutes: {
    en: 'Every 30 Minutes',
    te: 'ప్రతి 30 నిమిషాలకు',
    hi: 'हर 30 मिनट',
  },

  every1Hour: {
    en: 'Every 1 Hour',
    te: 'ప్రతి 1 గంటకు',
    hi: 'हर 1 घंटे',
  },

  every2Hours: {
    en: 'Every 2 Hours',
    te: 'ప్రతి 2 గంటలకు',
    hi: 'हर 2 घंटे',
  },

  dailyTargetGlasses: {
    en: 'Daily Target Glasses',
    te: 'రోజువారీ లక్ష్య గ్లాసులు',
    hi: 'दैनिक लक्ष्य गिलास',
  },

  percentage: {
    en: 'Percentage',
    te: 'శాతం',
    hi: 'प्रतिशत',
  },

  remaining: {
    en: 'Remaining',
    te: 'మిగిలినవి',
    hi: 'शेष',
  },

  completed: {
    en: 'Completed',
    te: 'పూర్తయింది',
    hi: 'पूरा हुआ',
  },

  waterLog: {
    en: 'Water Log',
    te: 'నీటి నమోదు',
    hi: 'पानी लॉग',
  },

  // =====================================================
  // VOICE ASSISTANT
  // =====================================================

  voiceAssistant: {
    en: 'Voice Assistant',
    te: 'వాయిస్ అసిస్టెంట్',
    hi: 'वॉइस असिस्टेंट',
  },

  listening: {
    en: 'Listening...',
    te: 'వింటోంది...',
    hi: 'सुन रहा है...',
  },

  speakNow: {
    en: 'Speak Now',
    te: 'ఇప్పుడు మాట్లాడండి',
    hi: 'अब बोलें',
  },

  tapToSpeak: {
    en: 'Tap to Speak',
    te: 'మాట్లాడటానికి నొక్కండి',
    hi: 'बोलने के लिए टैप करें',
  },

  talk: {
    en: 'Talk',
    te: 'మాట్లాడండి',
    hi: 'बोलें',
  },

  youSaid: {
    en: 'You said',
    te: 'మీరు చెప్పారు',
    hi: 'आपने कहा',
  },

  howCanIHelp: {
    en: 'How can I help you?',
    te: 'నేను మీకు ఎలా సహాయం చేయగలను?',
    hi: 'मैं आपकी कैसे मदद कर सकता हूँ?',
  },

  // =====================================================
  // CAREGIVER
  // =====================================================

  remoteMonitoring: {
    en: 'Remote Monitoring',
    te: 'రిమోట్ మానిటరింగ్',
    hi: 'रिमोट मॉनिटरिंग',
  },

  noCaregiverConnected: {
    en: 'No Caregiver Connected',
    te: 'సంరక్షకుడు కనెక్ట్ కాలేదు',
    hi: 'कोई देखभालकर्ता कनेक्ट नहीं है',
  },

  connectCaregiverMessage: {
    en: 'Connect a family member or caregiver to monitor your health.',
    te: 'మీ ఆరోగ్యాన్ని పర్యవేక్షించడానికి కుటుంబ సభ్యుడిని లేదా సంరక్షకుడిని కనెక్ట్ చేయండి.',
    hi: 'अपने स्वास्थ्य की निगरानी के लिए परिवार के सदस्य या देखभालकर्ता को कनेक्ट करें।',
  },

  connectCaregiverNow: {
    en: 'Connect Caregiver Now',
    te: 'ఇప్పుడు సంరక్షకుడిని కనెక్ట్ చేయండి',
    hi: 'अभी देखभालकर्ता को कनेक्ट करें',
  },

  connected: {
    en: 'Connected',
    te: 'కనెక్ట్ అయింది',
    hi: 'कनेक्टेड',
  },

  disconnected: {
    en: 'Disconnected',
    te: 'డిస్‌కనెక్ట్ అయింది',
    hi: 'डिस्कनेक्टेड',
  },

  caregiverName: {
    en: 'Caregiver Name',
    te: 'సంరక్షకుడి పేరు',
    hi: 'देखभालकर्ता का नाम',
  },

  caregiverPhone: {
    en: 'Caregiver Phone',
    te: 'సంరక్షకుడి ఫోన్',
    hi: 'देखभालकर्ता का फोन',
  },

  monitoring: {
    en: 'Monitoring',
    te: 'పర్యవేక్షణ',
    hi: 'निगरानी',
  },

  familyMember: {
    en: 'Family Member',
    te: 'కుటుంబ సభ్యుడు',
    hi: 'परिवार का सदस्य',
  },

  emergencyAlerts: {
    en: 'Emergency Alerts',
    te: 'అత్యవసర హెచ్చరికలు',
    hi: 'आपातकालीन अलर्ट',
  },

  adherenceLogs: {
    en: 'Adherence Logs',
    te: 'మందుల పాటింపు లాగ్‌లు',
    hi: 'दवा पालन लॉग',
  },

  // =====================================================
  // CAREGIVER DASHBOARD
  // =====================================================

  patientOverviewConsole: {
    en: 'Patient Overview Console',
    te: 'రోగి అవలోకన కన్సోల్',
    hi: 'मरीज अवलोकन कंसोल',
  },

  liveMonitoringStream: {
    en: 'Live monitoring stream',
    te: 'లైవ్ మానిటరింగ్ స్ట్రీమ్',
    hi: 'लाइव मॉनिटरिंग स्ट्रीम',
  },

  liveSyncConnected: {
    en: 'Live Sync Connected',
    te: 'లైవ్ సింక్ కనెక్ట్ అయింది',
    hi: 'लाइव सिंक कनेक्टेड',
  },

  stable: {
    en: 'Stable',
    te: 'స్థిరంగా ఉంది',
    hi: 'स्थिर',
  },

  age: {
    en: 'Age',
    te: 'వయస్సు',
    hi: 'उम्र',
  },

  bloodGroup: {
    en: 'Blood Group',
    te: 'రక్త గ్రూప్',
    hi: 'ब्लड ग्रुप',
  },

  phone: {
    en: 'Phone',
    te: 'ఫోన్',
    hi: 'फोन',
  },

  callPatient: {
    en: 'Call Patient',
    te: 'రోగికి కాల్ చేయండి',
    hi: 'मरीज को कॉल करें',
  },

  hydrationGoal: {
    en: 'Hydration Goal',
    te: 'నీటి లక్ష్యం',
    hi: 'हाइड्रेशन लक्ष्य',
  },

  lastActivity: {
    en: 'Last Activity',
    te: 'చివరి కార్యకలాపం',
    hi: 'अंतिम गतिविधि',
  },

  fiveMinutesAgo: {
    en: '5 mins ago',
    te: '5 నిమిషాల క్రితం',
    hi: '5 मिनट पहले',
  },

  missedDoses: {
    en: 'Missed Doses',
    te: 'వదిలేసిన మోతాదులు',
    hi: 'छूटी हुई खुराक',
  },

  sosAlerts: {
    en: 'SOS Alerts',
    te: 'SOS హెచ్చరికలు',
    hi: 'SOS अलर्ट',
  },

  missedSkippedDoseAlerts: {
    en: 'Missed / Skipped Dose Alerts',
    te: 'వదిలేసిన / మిస్ అయిన మోతాదు హెచ్చరికలు',
    hi: 'छूटी / छोड़ी गई खुराक के अलर्ट',
  },

  noSkippedDoses: {
    en: 'No skipped doses today.',
    te: 'ఈరోజు వదిలేసిన మోతాదులు లేవు.',
    hi: 'आज कोई खुराक नहीं छोड़ी गई है।',
  },

  noSkippedDosesToday: {
    en: 'No skipped doses reported today.',
    te: 'ఈరోజు వదిలేసిన మోతాదులు ఏవీ లేవు.',
    hi: 'आज कोई छोड़ी गई खुराक रिपोर्ट नहीं हुई है।',
  },

  sendReminder: {
    en: 'Send Reminder',
    te: 'రిమైండర్ పంపండి',
    hi: 'रिमाइंडर भेजें',
  },

  pleaseRememberMedicine: {
    en: 'Please remember to take your',
    te: 'దయచేసి మీ',
    hi: 'कृपया अपनी',
  },

  doseReminder: {
    en: 'dose',
    te: 'మోతాదు తీసుకోవడం గుర్తుంచుకోండి',
    hi: 'खुराक लेना याद रखें',
  },

  reminderSentTo: {
    en: 'Reminder notification sent to',
    te: 'రిమైండర్ నోటిఫికేషన్ పంపబడింది:',
    hi: 'रिमाइंडर सूचना भेजी गई:',
  },

  patientGeolocation: {
    en: 'Patient Geolocation',
    te: 'రోగి స్థానం',
    hi: 'मरीज का स्थान',
  },

  sharingStatus: {
    en: 'Sharing Status',
    te: 'షేరింగ్ స్థితి',
    hi: 'साझाकरण स्थिति',
  },

  activeSharing: {
    en: 'Active Sharing',
    te: 'యాక్టివ్ షేరింగ్',
    hi: 'सक्रिय साझाकरण',
  },

  locationUnavailable: {
    en: 'Location unavailable',
    te: 'స్థానం అందుబాటులో లేదు',
    hi: 'स्थान उपलब्ध नहीं है',
  },

  lastUpdated: {
    en: 'Last Updated',
    te: 'చివరిగా నవీకరించబడింది',
    hi: 'अंतिम अपडेट',
  },

  openGoogleMaps: {
    en: 'Open in Google Maps',
    te: 'Google Mapsలో తెరవండి',
    hi: 'Google Maps में खोलें',
  },

  alertsHeading: {
    en: 'Emergency & Missed Dose Alerts',
    te: 'అత్యవసర & మిస్ అయిన మోతాదు హెచ్చరికలు',
    hi: 'आपातकालीन और छूटी हुई खुराक के अलर्ट',
  },

  alertsDescription: {
    en: 'Audit trail of critical alerts, fall detections, and skipped doses.',
    te: 'తీవ్రమైన హెచ్చరికలు, పడిపోవడం గుర్తింపులు మరియు వదిలేసిన మోతాదుల రికార్డు.',
    hi: 'गंभीर अलर्ट, गिरने की पहचान और छोड़ी गई खुराकों का रिकॉर्ड।',
  },

  emergencySosLog: {
    en: 'Emergency SOS Log',
    te: 'అత్యవసర SOS లాగ్',
    hi: 'आपातकालीन SOS लॉग',
  },

  noEmergencyAlertsRecorded: {
    en: 'No active or historic emergency alerts recorded.',
    te: 'ప్రస్తుతం లేదా గతంలో అత్యవసర హెచ్చరికలు నమోదు కాలేదు.',
    hi: 'कोई सक्रिय या पुराना आपातकालीन अलर्ट दर्ज नहीं है।',
  },

  timestamp: {
    en: 'Timestamp',
    te: 'సమయ ముద్ర',
    hi: 'समय-मुद्रा',
  },

  resolveAlert: {
    en: 'Resolve Alert',
    te: 'హెచ్చరికను పరిష్కరించండి',
    hi: 'अलर्ट हल करें',
  },

  skippedDoseHistory: {
    en: 'Skipped Dose History',
    te: 'వదిలేసిన మోతాదుల చరిత్ర',
    hi: 'छोड़ी गई खुराकों का इतिहास',
  },

  noSkippedDosesReportedToday: {
    en: 'No skipped doses reported today.',
    te: 'ఈరోజు మోతాదులు వదిలేసినట్లు నివేదించబడలేదు.',
    hi: 'आज कोई खुराक छोड़ने की सूचना नहीं है।',
  },

  resolved: {
    en: 'Resolved',
    te: 'పరిష్కరించబడింది',
    hi: 'हल किया गया',
  },

  careAnalyticsTrends: {
    en: 'Care Analytics & Trends',
    te: 'సంరక్షణ విశ్లేషణలు & ధోరణులు',
    hi: 'देखभाल विश्लेषण और रुझान',
  },

  quantitativeHealthTrackingFor: {
    en: 'Quantitative health adherence & hydration tracking for',
    te: 'ఆరోగ్య నియమపాలన మరియు నీటి వినియోగ ట్రాకింగ్:',
    hi: 'स्वास्थ्य पालन और जल सेवन ट्रैकिंग:',
  },

  doseStatusDistribution: {
    en: 'Dose Status Distribution',
    te: 'మోతాదుల స్థితి పంపిణీ',
    hi: 'खुराक स्थिति वितरण',
  },

  completedVsMissedDosesToday: {
    en: 'Ratio of completed vs missed doses today.',
    te: 'ఈరోజు పూర్తయిన మరియు మిస్ అయిన మోతాదుల నిష్పత్తి.',
    hi: 'आज पूरी हुई और छूटी हुई खुराकों का अनुपात।',
  },

  takenCountLabel: {
    en: 'Taken:',
    te: 'తీసుకున్నవి:',
    hi: 'ली गई:',
  },

  skippedCountLabel: {
    en: 'Skipped:',
    te: 'వదిలేసినవి:',
    hi: 'छोड़ी गई:',
  },

  pendingCountLabel: {
    en: 'Pending:',
    te: 'పెండింగ్:',
    hi: 'लंबित:',
  },

  weeklyMedicineActivity: {
    en: 'Weekly Medicine Activity',
    te: 'వారపు మందుల కార్యకలాపం',
    hi: 'साप्ताहिक दवा गतिविधि',
  },

  dailyTakenSkippedComparison: {
    en: 'Daily comparison of taken vs skipped doses across 7 days.',
    te: '7 రోజులలో తీసుకున్న మరియు వదిలేసిన మోతాదుల రోజువారీ పోలిక.',
    hi: '7 दिनों में ली गई और छोड़ी गई खुराकों की दैनिक तुलना।',
  },

  sevenDayHydrationTrend: {
    en: '7-Day Hydration Trend',
    te: '7 రోజుల నీటి వినియోగ ధోరణి',
    hi: '7-दिवसीय जल सेवन रुझान',
  },

  dailyWaterAgainstTarget: {
    en: 'Daily water glasses logged against target goal (8 glasses).',
    te: 'రోజువారీ నీటి గ్లాసుల నమోదు, లక్ష్యం 8 గ్లాసులతో పోల్చి.',
    hi: 'दैनिक दर्ज पानी के गिलास, 8 गिलास के लक्ष्य के मुकाबले।',
  },

  glassesLogged: {
    en: 'Glasses Logged',
    te: 'నమోదైన గ్లాసులు',
    hi: 'दर्ज गिलास',
  },

  voiceTextMessages: {
    en: 'Voice & Text Messages',
    te: 'వాయిస్ & టెక్స్ట్ సందేశాలు',
    hi: 'वॉइस और टेक्स्ट संदेश',
  },

  exchangeVoiceNotesMessagesWith: {
    en: 'Exchange quick voice notes and messages with',
    te: 'వాయిస్ నోట్స్ మరియు సందేశాలను పంపండి:',
    hi: 'आवाज़ के नोट और संदेश साझा करें:',
  },

  recordVoiceNoteForPatient: {
    en: 'Record Voice Note for Patient',
    te: 'రోగి కోసం వాయిస్ నోట్ రికార్డ్ చేయండి',
    hi: 'मरीज के लिए वॉइस नोट रिकॉर्ड करें',
  },

  holdOrTapToRecord: {
    en: 'Hold or tap to record audio. Uses MediaRecorder with live waveform.',
    te: 'ఆడియో రికార్డ్ చేయడానికి నొక్కి పట్టుకోండి లేదా తాకండి. MediaRecorder ఉపయోగించి లైవ్ వేవ్‌ఫారమ్ చూపుతుంది.',
    hi: 'ऑडियो रिकॉर्ड करने के लिए दबाकर रखें या टैप करें। लाइव वेवफॉर्म के लिए MediaRecorder का उपयोग होता है।',
  },

  record: {
    en: 'Record',
    te: 'రికార్డ్ చేయండి',
    hi: 'रिकॉर्ड करें',
  },

  messageThread: {
    en: 'Message Thread',
    te: 'సందేశాల వరుస',
    hi: 'संदेश वार्तालाप',
  },

  voiceNote: {
    en: 'Voice Note',
    te: 'వాయిస్ నోట్',
    hi: 'वॉइस नोट',
  },

  readAloud: {
    en: 'Read Aloud',
    te: 'గట్టిగా చదవండి',
    hi: 'ज़ोर से पढ़ें',
  },

  typeMessageOrReminder: {
    en: 'Type a message or reminder...',
    te: 'సందేశం లేదా రిమైండర్ టైప్ చేయండి...',
    hi: 'संदेश या रिमाइंडर लिखें...',
  },

  sendReply: {
    en: 'Send Reply',
    te: 'ప్రత్యుత్తరం పంపండి',
    hi: 'जवाब भेजें',
  },

  linkedPatients: {
    en: 'Linked Patients',
    te: 'లింక్ చేసిన రోగులు',
    hi: 'जुड़े हुए मरीज',
  },

  manageProfilesAndEmergencyContacts: {
    en: 'Manage health profiles and emergency contact numbers for dependents.',
    te: 'ఆధారపడిన వారి ఆరోగ్య ప్రొఫైళ్లు మరియు అత్యవసర సంప్రదింపు నంబర్లను నిర్వహించండి.',
    hi: 'आश्रितों की स्वास्थ्य प्रोफ़ाइल और आपातकालीन संपर्क नंबर प्रबंधित करें।',
  },

  primaryDependent: {
    en: 'Primary Dependent',
    te: 'ప్రధాన ఆధారిత వ్యక్తి',
    hi: 'मुख्य आश्रित',
  },

  allergies: {
    en: 'Allergies',
    te: 'అలర్జీలు',
    hi: 'एलर्जी',
  },

  medicalHistory: {
    en: 'Medical History:',
    te: 'వైద్య చరిత్ర:',
    hi: 'चिकित्सा इतिहास:',
  },

  sosButtonTrigger: {
    en: 'SOS button',
    te: 'SOS బటన్',
    hi: 'SOS बटन',
  },

  fallDetectionTrigger: {
    en: 'fall detection',
    te: 'పడిపోవడం గుర్తింపు',
    hi: 'गिरने की पहचान',
  },

  voiceTrigger: {
    en: 'voice trigger',
    te: 'వాయిస్ ట్రిగ్గర్',
    hi: 'वॉइस ट्रिगर',
  },

  manualTrigger: {
    en: 'manual',
    te: 'మాన్యువల్',
    hi: 'मैन्युअल',
  },

  buttonTrigger: {
    en: 'button',
    te: 'బటన్',
    hi: 'बटन',
  },

  // =====================================================
  // EMERGENCY
  // =====================================================

  emergency: {
    en: 'Emergency',
    te: 'అత్యవసరం',
    hi: 'आपातकाल',
  },

  call: {
    en: 'Call',
    te: 'కాల్',
    hi: 'कॉल',
  },

  standaloneEmergencyCard: {
    en: 'Emergency Card',
    te: 'అత్యవసర కార్డు',
    hi: 'आपातकालीन कार्ड',
  },

  emergencyInfo: {
    en: 'Emergency Information',
    te: 'అత్యవసర సమాచారం',
    hi: 'आपातकालीन जानकारी',
  },

  criticalEmergencyAlert: {
    en: 'Critical Emergency Alert',
    te: 'తీవ్రమైన అత్యవసర హెచ్చరిక',
    hi: 'गंभीर आपातकालीन अलर्ट',
  },

  activatedSosAlert: {
    en: 'activated SOS alert!',
    te: 'SOS హెచ్చరికను యాక్టివేట్ చేశారు!',
    hi: 'ने SOS अलर्ट सक्रिय किया!',
  },

  trigger: {
    en: 'Trigger',
    te: 'ట్రిగ్గర్',
    hi: 'ट्रिगर',
  },

  gpsCoordinatesAcquired: {
    en: 'GPS Coordinates Acquired',
    te: 'GPS కోఆర్డినేట్లు పొందబడ్డాయి',
    hi: 'GPS निर्देशांक प्राप्त किए गए',
  },

  location: {
    en: 'Location',
    te: 'స్థానం',
    hi: 'स्थान',
  },

  openMaps: {
    en: 'Open Maps',
    te: 'మ్యాప్స్ తెరవండి',
    hi: 'मैप्स खोलें',
  },

  markResolved: {
    en: 'Mark Resolved',
    te: 'పరిష్కరించినట్లు గుర్తించండి',
    hi: 'समाधान के रूप में चिन्हित करें',
  },

  sendSOSNow: {
    en: 'Send SOS Now',
    te: 'ఇప్పుడు SOS పంపండి',
    hi: 'अभी SOS भेजें',
  },

  // =====================================================
  // QUICK ACTIONS
  // =====================================================

  nextMedicineAction: {
    en: 'Next Medicine',
    te: 'తదుపరి మందు',
    hi: 'अगली दवा',
  },

  drinkWater: {
    en: 'Drink Water',
    te: 'నీరు తాగండి',
    hi: 'पानी पिएँ',
  },

  callCaregiver: {
    en: 'Call Caregiver',
    te: 'సంరక్షకుడికి కాల్ చేయండి',
    hi: 'देखभालकर्ता को कॉल करें',
  },

  sendSOS: {
    en: 'Send SOS',
    te: 'SOS పంపండి',
    hi: 'SOS भेजें',
  },

  quickActions: {
    en: 'Quick Actions',
    te: 'త్వరిత చర్యలు',
    hi: 'त्वरित कार्य',
  },

  // =====================================================
  // HEADER / USER
  // =====================================================

  role: {
    en: 'Role',
    te: 'పాత్ర',
    hi: 'भूमिका',
  },

  patient: {
    en: 'Patient',
    te: 'రోగి',
    hi: 'मरीज',
  },

  rolePatient: {
    en: 'Patient',
    te: 'రోగి',
    hi: 'मरीज',
  },

  notifications: {
    en: 'Notifications',
    te: 'నోటిఫికేషన్లు',
    hi: 'सूचनाएँ',
  },

  // =====================================================
  // COMMON
  // =====================================================

  save: {
    en: 'Save',
    te: 'సేవ్',
    hi: 'सहेजें',
  },

  cancel: {
    en: 'Cancel',
    te: 'రద్దు చేయండి',
    hi: 'रद्द करें',
  },

  close: {
    en: 'Close',
    te: 'మూసివేయండి',
    hi: 'बंद करें',
  },

  confirm: {
    en: 'Confirm',
    te: 'నిర్ధారించండి',
    hi: 'पुष्टि करें',
  },

  yes: {
    en: 'Yes',
    te: 'అవును',
    hi: 'हाँ',
  },

  no: {
    en: 'No',
    te: 'కాదు',
    hi: 'नहीं',
  },

  loading: {
    en: 'Loading...',
    te: 'లోడ్ అవుతోంది...',
    hi: 'लोड हो रहा है...',
  },

  success: {
    en: 'Success',
    te: 'విజయం',
    hi: 'सफलता',
  },

  error: {
    en: 'Error',
    te: 'లోపం',
    hi: 'त्रुटि',
  },

  edit: {
    en: 'Edit',
    te: 'సవరించండి',
    hi: 'संपादित करें',
  },

  delete: {
    en: 'Delete',
    te: 'తొలగించండి',
    hi: 'हटाएँ',
  },

  back: {
    en: 'Back',
    te: 'వెనుకకు',
    hi: 'वापस',
  },

  next: {
    en: 'Next',
    te: 'తదుపరి',
    hi: 'अगला',
  },

  submit: {
    en: 'Submit',
    te: 'సమర్పించండి',
    hi: 'जमा करें',
  },

  search: {
    en: 'Search',
    te: 'వెతకండి',
    hi: 'खोजें',
  },

  noData: {
    en: 'No Data Available',
    te: 'డేటా అందుబాటులో లేదు',
    hi: 'डेटा उपलब्ध नहीं है',
  },

  viewDetails: {
    en: 'View Details',
    te: 'వివరాలను చూడండి',
    hi: 'विवरण देखें',
  },

  // =====================================================
  // PATIENT
  // =====================================================

  patientDashboard: {
    en: 'Patient Dashboard',
    te: 'రోగి డాష్‌బోర్డ్',
    hi: 'मरीज डैशबोर्ड',
  },

  health: {
    en: 'Health',
    te: 'ఆరోగ్యం',
    hi: 'स्वास्थ्य',
  },

  healthOverview: {
    en: 'Health Overview',
    te: 'ఆరోగ్య అవలోకనం',
    hi: 'स्वास्थ्य अवलोकन',
  },

  // =====================================================
  // STATUS
  // =====================================================

  active: {
    en: 'Active',
    te: 'యాక్టివ్',
    hi: 'सक्रिय',
  },

  offline: {
    en: 'Offline',
    te: 'ఆఫ్‌లైన్',
    hi: 'ऑफलाइन',
  },

  online: {
    en: 'Online',
    te: 'ఆన్‌లైన్',
    hi: 'ऑनलाइन',
  },

  status: {
    en: 'Status',
    te: 'స్థితి',
    hi: 'स्थिति',
  },

  notConnected: {
    en: 'Not Connected',
    te: 'కనెక్ట్ కాలేదు',
    hi: 'कनेक्ट नहीं है',
  },

  // =====================================================
  // LANGUAGE
  // =====================================================

  language: {
    en: 'Language',
    te: 'భాష',
    hi: 'भाषा',
  },

  english: {
    en: 'English',
    te: 'ఇంగ్లీష్',
    hi: 'अंग्रेज़ी',
  },

  telugu: {
    en: 'Telugu',
    te: 'తెలుగు',
    hi: 'तेलुगु',
  },

  hindi: {
    en: 'Hindi',
    te: 'హిందీ',
    hi: 'हिंदी',
  },

  // =====================================================
  // DEMO
  // =====================================================

  demo: {
    en: 'Demo',
    te: 'డెమో',
    hi: 'डेमो',
  },

  demoMode: {
    en: 'Demo Mode',
    te: 'డెమో మోడ్',
    hi: 'डेमो मोड',
  },

  demoControls: {
    en: 'Demo Controls',
    te: 'డెమో నియంత్రణలు',
    hi: 'डेमो नियंत्रण',
  },

  open: {
    en: 'Open',
    te: 'తెరవండి',
    hi: 'खोलें',
  },

  demoDescription: {
    en: 'Use these controls to simulate HealthGuard events.',
    te: 'HealthGuard ఈవెంట్లను సిమ్యులేట్ చేయడానికి ఈ నియంత్రణలను ఉపయోగించండి.',
    hi: 'HealthGuard इवेंट्स को सिम्युलेट करने के लिए इन नियंत्रणों का उपयोग करें।',
  },

  triggerReminder: {
    en: 'Trigger Reminder',
    te: 'రిమైండర్ ట్రిగ్గర్ చేయండి',
    hi: 'रिमाइंडर ट्रिगर करें',
  },

  markTaken: {
    en: 'Mark Taken',
    te: 'తీసుకున్నట్లు గుర్తించండి',
    hi: 'ली गई के रूप में चिन्हित करें',
  },

  missedDose: {
    en: 'Missed Dose',
    te: 'మిస్ అయిన మోతాదు',
    hi: 'छूटी हुई खुराक',
  },

  triggerSOS: {
    en: 'Trigger SOS',
    te: 'SOS ట్రిగ్గర్ చేయండి',
    hi: 'SOS ट्रिगर करें',
  },

  fallDetect: {
    en: 'Fall Detection',
    te: 'పడిపోవడం గుర్తింపు',
    hi: 'गिरने का पता लगाना',
  },

  caregiverMsg: {
    en: 'Caregiver Message',
    te: 'సంరక్షకుడి సందేశం',
    hi: 'देखभालकर्ता संदेश',
  },

  goOnline: {
    en: 'Go Online',
    te: 'ఆన్‌లైన్‌లోకి వెళ్లండి',
    hi: 'ऑनलाइन जाएँ',
  },

  goOffline: {
    en: 'Go Offline',
    te: 'ఆఫ్‌లైన్‌లోకి వెళ్లండి',
    hi: 'ऑफलाइन जाएँ',
  },

  switchRole: {
    en: 'Switch Role',
    te: 'పాత్ర మార్చండి',
    hi: 'भूमिका बदलें',
  },

  setPatientLocation: {
    en: 'Set Patient Location',
    te: 'రోగి స్థానాన్ని సెట్ చేయండి',
    hi: 'मरीज का स्थान सेट करें',
  },

  resetDemoData: {
    en: 'Reset Demo Data',
    te: 'డెమో డేటాను రీసెట్ చేయండి',
    hi: 'डेमो डेटा रीसेट करें',
  },

  prototypeFallSimulation: {
    en: 'Prototype Fall Simulation',
    te: 'పడిపోవడం సిమ్యులేషన్',
    hi: 'गिरने का प्रोटोटाइप सिमुलेशन',
  },

  possibleEmergencyDetected: {
    en: 'Possible Emergency Detected',
    te: 'సంభావ్య అత్యవసర పరిస్థితి గుర్తించబడింది',
    hi: 'संभावित आपातकाल का पता चला',
  },

  fallDetectionMessage: {
    en: 'A possible fall has been detected. Are you okay?',
    te: 'పడిపోయినట్లు అనిపిస్తోంది. మీరు బాగున్నారా?',
    hi: 'संभावित गिरावट का पता चला है। क्या आप ठीक हैं?',
  },

  imOkayCancelAlert: {
    en: "I'm Okay - Cancel Alert",
    te: 'నేను బాగున్నాను - హెచ్చరికను రద్దు చేయండి',
    hi: 'मैं ठीक हूँ - अलर्ट रद्द करें',
  },

  // =====================================================
  // DEMO LOCATIONS
  // =====================================================

  hyderabad: {
    en: 'Hyderabad',
    te: 'హైదరాబాద్',
    hi: 'हैदराबाद',
  },

  bengaluru: {
    en: 'Bengaluru',
    te: 'బెంగళూరు',
    hi: 'बेंगलुरु',
  },

  delhi: {
    en: 'Delhi',
    te: 'ఢిల్లీ',
    hi: 'दिल्ली',
  },

  // =====================================================
  // SETTINGS
  // =====================================================

  settingsTitle: {
    en: 'Settings',
    te: 'సెట్టింగ్స్',
    hi: 'सेटिंग्स',
  },

  account: {
    en: 'Account',
    te: 'ఖాతా',
    hi: 'खाता',
  },

  preferences: {
    en: 'Preferences',
    te: 'ప్రాధాన్యతలు',
    hi: 'प्राथमिकताएँ',
  },

  notificationsSettings: {
    en: 'Notifications',
    te: 'నోటిఫికేషన్లు',
    hi: 'सूचनाएँ',
  },

  theme: {
    en: 'Theme',
    te: 'థీమ్',
    hi: 'थीम',
  },

  light: {
    en: 'Light',
    te: 'లైట్',
    hi: 'लाइट',
  },

  dark: {
    en: 'Dark',
    te: 'డార్క్',
    hi: 'डार्क',
  },

  system: {
    en: 'System',
    te: 'సిస్టమ్',
    hi: 'सिस्टम',
  },

  logout: {
    en: 'Logout',
    te: 'లాగ్ అవుట్',
    hi: 'लॉग आउट',
  },

  // =====================================================
  // DAYS / TIME
  // =====================================================

  today: {
    en: 'Today',
    te: 'ఈరోజు',
    hi: 'आज',
  },

  yesterday: {
    en: 'Yesterday',
    te: 'నిన్న',
    hi: 'कल',
  },

  tomorrow: {
    en: 'Tomorrow',
    te: 'రేపు',
    hi: 'कल',
  },

  morning: {
    en: 'Morning',
    te: 'ఉదయం',
    hi: 'सुबह',
  },

  afternoon: {
    en: 'Afternoon',
    te: 'మధ్యాహ్నం',
    hi: 'दोपहर',
  },

  evening: {
    en: 'Evening',
    te: 'సాయంత్రం',
    hi: 'शाम',
  },

  night: {
    en: 'Night',
    te: 'రాత్రి',
    hi: 'रात',
  },

  // =====================================================
  // RELATIVE TIME
  // =====================================================

  hourAgo: {
    en: 'hour ago',
    te: 'గంట క్రితం',
    hi: 'घंटे पहले',
  },

  hoursAgo: {
    en: 'hours ago',
    te: 'గంటల క్రితం',
    hi: 'घंटे पहले',
  },

  minuteAgo: {
    en: 'minute ago',
    te: 'నిమిషం క్రితం',
    hi: 'मिनट पहले',
  },

  minutesAgo: {
    en: 'minutes ago',
    te: 'నిమిషాల క్రితం',
    hi: 'मिनट पहले',
  },

  justNow: {
    en: 'Just now',
    te: 'ఇప్పుడే',
    hi: 'अभी',
  },

  // =====================================================
  // SHORT DAYS
  // =====================================================

  sun: {
    en: 'Sun',
    te: 'ఆది',
    hi: 'रवि',
  },

  mon: {
    en: 'Mon',
    te: 'సోమ',
    hi: 'सोम',
  },

  tue: {
    en: 'Tue',
    te: 'మంగళ',
    hi: 'मंगल',
  },

  wed: {
    en: 'Wed',
    te: 'బుధ',
    hi: 'बुध',
  },

  thu: {
    en: 'Thu',
    te: 'గురు',
    hi: 'गुरु',
  },

  fri: {
    en: 'Fri',
    te: 'శుక్ర',
    hi: 'शुक्र',
  },

  sat: {
    en: 'Sat',
    te: 'శని',
    hi: 'शनि',
  },

  // =====================================================
  // ACCESSIBILITY
  // =====================================================

  menu: {
    en: 'Menu',
    te: 'మెనూ',
    hi: 'मेनू',
  },

  userAvatar: {
    en: 'User Avatar',
    te: 'వినియోగదారు అవతార్',
    hi: 'उपयोगकर्ता अवतार',
  },

  microphone: {
    en: 'Microphone',
    te: 'మైక్రోఫోన్',
    hi: 'माइक्रोफोन',
  },

  closeMenu: {
    en: 'Close Menu',
    te: 'మీనూను మూసివేయండి',
    hi: 'मेनू बंद करें',
  },
  forgotMedicine: {
  en: 'Forgot medicine',
  te: 'మందు తీసుకోవడం మర్చిపోయారు',
  hi: 'दवा लेना भूल गए',
},

notFeelingWell: {
  en: 'Not feeling well',
  te: 'ఆరోగ్యం బాగోలేదు',
  hi: 'तबीयत ठीक नहीं है',
},


};

// =====================================================
// CONTEXT
// =====================================================

const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// =====================================================
// LANGUAGE PROVIDER
// =====================================================

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(
      'healthguard-language'
    );

    if (
      savedLanguage === 'en' ||
      savedLanguage === 'te' ||
      savedLanguage === 'hi'
    ) {
      return savedLanguage;
    }

    return 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      'healthguard-language',
      newLanguage
    );
  };

  useEffect(() => {
    localStorage.setItem(
      'healthguard-language',
      language
    );
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];

    if (!translation) {
      console.warn(
        `Translation missing for key: "${key}"`
      );

      return key;
    }

    return (
      translation[language] ||
      translation.en ||
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// =====================================================
// USE LANGUAGE HOOK
// =====================================================

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
};