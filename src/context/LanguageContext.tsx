import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Language = 'en' | 'te' | 'hi';

interface Translation {
  en: string;
  te: string;
  hi: string;
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
  analytics: {
    en: 'Analytics',
    te: 'విశ్లేషణ',
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
    te: 'పాటింపు',
    hi: 'अनुपालन',
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
    en: 'doses taken',
    te: 'మోతాదులు తీసుకున్నారు',
    hi: 'खुराक ली गई',
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
    te: 'ఇప్పుడే తీసుకోండి',
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
  greatJob: {
    en: 'Great Job!',
    te: 'చాలా బాగా చేశారు!',
    hi: 'बहुत अच्छा!',
  },
  doseSkipped: {
    en: 'Dose Skipped',
    te: 'మోతాదు వదిలేశారు',
    hi: 'खुराक छोड़ी गई',
  },
  caregiverNotified: {
    en: 'Caregiver has been notified.',
    te: 'సంరక్షకుడికి సమాచారం పంపబడింది.',
    hi: 'देखभालकर्ता को सूचित कर दिया गया है।',
  },
  skipConfirmation: {
    en: 'Are you sure you want to skip this dose?',
    te: 'మీరు ఈ మోతాదును వదిలేయాలని ఖచ్చితంగా అనుకుంటున్నారా?',
    hi: 'क्या आप वाकई इस खुराक को छोड़ना चाहते हैं?',
  },
  yesSkipDose: {
    en: 'Yes, Skip Dose',
    te: 'అవును, మోతాదు వదిలేయండి',
    hi: 'हाँ, खुराक छोड़ें',
  },
  doseMarkedAsTaken: {
    en: 'Dose marked as taken',
    te: 'మోతాదు తీసుకున్నట్లు గుర్తించబడింది',
    hi: 'खुराक ली गई के रूप में चिन्हित की गई',
  },
  loggingHealthAdherence: {
    en: 'Logging your health adherence',
    te: 'మీ ఆరోగ్య పాటింపును నమోదు చేస్తోంది',
    hi: 'आपका स्वास्थ्य अनुपालन दर्ज किया जा रहा है',
  },
  allDosesCompleted: {
    en: 'All doses completed!',
    te: 'అన్ని మోతాదులు పూర్తయ్యాయి!',
    hi: 'सभी खुराक पूरी हो गई हैं!',
  },
  allMedicinesCompletedMessage: {
    en: 'You have completed all your medicines for today.',
    te: 'ఈరోజు మీ అన్ని మందులు పూర్తయ్యాయి.',
    hi: 'आज की आपकी सभी दवाइयाँ पूरी हो गई हैं।',
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
    en: 'Last logged',
    te: 'చివరిగా నమోదు',
    hi: 'अंतिम बार दर्ज',
  },
  earlier: {
    en: 'earlier',
    te: 'క్రితం',
    hi: 'पहले',
  },
  waterReminders: {
    en: 'Water Reminders',
    te: 'నీటి రిమైండర్లు',
    hi: 'पानी रिमाइंडर',
  },
  reminderInterval: {
    en: 'Reminder Interval',
    te: 'రిమైండర్ వ్యవధి',
    hi: 'रिमाइंडर अंतराल',
  },
  every30Minutes: {
    en: 'Every 30 minutes',
    te: 'ప్రతి 30 నిమిషాలకు',
    hi: 'हर 30 मिनट',
  },
  every1Hour: {
    en: 'Every 1 hour',
    te: 'ప్రతి 1 గంటకు',
    hi: 'हर 1 घंटे',
  },
  every2Hours: {
    en: 'Every 2 hours',
    te: 'ప్రతి 2 గంటలకు',
    hi: 'हर 2 घंटे',
  },
  dailyTargetGlasses: {
    en: 'Daily Target',
    te: 'రోజువారీ లక్ష్యం',
    hi: 'दैनिक लक्ष्य',
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
    en: 'Speak now',
    te: 'ఇప్పుడు మాట్లాడండి',
    hi: 'अभी बोलें',
  },
  tapToSpeak: {
    en: 'Tap the mic and speak',
    te: 'మైక్‌ను నొక్కి మాట్లాడండి',
    hi: 'माइक दबाकर बोलें',
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
    en: 'How can I help?',
    te: 'నేను ఎలా సహాయం చేయగలను?',
    hi: 'मैं आपकी कैसे मदद कर सकता हूँ?',
  },

  // =====================================================
  // CAREGIVER
  // =====================================================
  remoteMonitoring: {
    en: 'Remote monitoring active',
    te: 'రిమోట్ మానిటరింగ్ యాక్టివ్‌గా ఉంది',
    hi: 'रिमोट मॉनिटरिंग सक्रिय है',
  },
  noCaregiverConnected: {
    en: 'No caregiver connected',
    te: 'సంరక్షకుడు కనెక్ట్ కాలేదు',
    hi: 'कोई देखभालकर्ता कनेक्ट नहीं है',
  },
  connectCaregiverMessage: {
    en: 'Connect a family member or caregiver for remote monitoring and emergency alerts.',
    te: 'రిమోట్ మానిటరింగ్ మరియు అత్యవసర హెచ్చరికల కోసం కుటుంబ సభ్యుడిని లేదా సంరక్షకుడిని కనెక్ట్ చేయండి.',
    hi: 'रिमोट मॉनिटरिंग और आपातकालीन अलर्ट के लिए परिवार के सदस्य या देखभालकर्ता को कनेक्ट करें।',
  },
  connectCaregiverNow: {
    en: 'Connect Caregiver',
    te: 'సంరక్షకుడిని కనెక్ట్ చేయండి',
    hi: 'देखभालकर्ता कनेक्ट करें',
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
    hi: 'देखभालकर्ता फोन',
  },
  monitoring: {
    en: 'Monitoring',
    te: 'మానిటరింగ్',
    hi: 'मॉनिटरिंग',
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
    te: 'పాటింపు లాగ్స్',
    hi: 'अनुपालन लॉग्स',
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
    en: 'View Emergency Information',
    te: 'అత్యవసర సమాచారాన్ని చూడండి',
    hi: 'आपातकालीन जानकारी देखें',
  },
  emergencyInfo: {
    en: 'Emergency Information',
    te: 'అత్యవసర సమాచారం',
    hi: 'आपातकालीन जानकारी',
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
    hi: 'मरीज़',
  },
  notifications: {
    en: 'Notifications',
    te: 'నోటిఫికేషన్లు',
    hi: 'सूचनाएँ',
  },
  rolePatient: {
    en: 'Patient',
    te: 'రోగి',
    hi: 'मरीज़',
  },

  // =====================================================
  // COMMON
  // =====================================================
  save: {
    en: 'Save',
    te: 'సేవ్ చేయండి',
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
    te: 'ఎడిట్',
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
    hi: 'सबमिट करें',
  },
  search: {
    en: 'Search',
    te: 'వెతకండి',
    hi: 'खोजें',
  },
  noData: {
    en: 'No data available',
    te: 'డేటా అందుబాటులో లేదు',
    hi: 'कोई डेटा उपलब्ध नहीं है',
  },
  viewDetails: {
    en: 'View Details',
    te: 'వివరాలు చూడండి',
    hi: 'विवरण देखें',
  },

  // =====================================================
  // PATIENT
  // =====================================================
  patientDashboard: {
    en: 'Patient Dashboard',
    te: 'రోగి డాష్‌బోర్డ్',
    hi: 'मरीज़ डैशबोर्ड',
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
    hi: 'ऑफ़लाइन',
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

  // =====================================================
  // DEMO PANEL
  // =====================================================
  demoDescription: {
    en: 'Mutate real app state to test both Patient and Caregiver workflows in real time.',
    te: 'పేషెంట్ మరియు సంరక్షకుడి వర్క్‌ఫ్లోలను రియల్ టైమ్‌లో పరీక్షించడానికి యాప్ స్థితిని మార్చండి.',
    hi: 'पेशेंट और देखभालकर्ता वर्कफ़्लो को रीयल टाइम में टेस्ट करने के लिए ऐप की स्थिति बदलें।',
  },
  triggerReminder: {
    en: 'Trigger Reminder',
    te: 'రిమైండర్ ప్రారంభించండి',
    hi: 'रिमाइंडर शुरू करें',
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
    te: 'SOS ప్రారంభించండి',
    hi: 'SOS शुरू करें',
  },
  fallDetect: {
    en: 'Fall Detect',
    te: 'పడిపోవడం గుర్తింపు',
    hi: 'गिरने का पता लगाएँ',
  },
  caregiverMsg: {
    en: 'Caregiver Msg',
    te: 'సంరక్షకుడి సందేశం',
    hi: 'देखभालकर्ता संदेश',
  },
  goOnline: {
    en: 'Go Online',
    te: 'ఆన్‌లైన్‌కి వెళ్లండి',
    hi: 'ऑनलाइन जाएँ',
  },
  goOffline: {
    en: 'Go Offline',
    te: 'ఆఫ్‌లైన్‌కి వెళ్లండి',
    hi: 'ऑफ़लाइन जाएँ',
  },
  switchRole: {
    en: 'Switch Role',
    te: 'పాత్ర మార్చండి',
    hi: 'भूमिका बदलें',
  },
  setPatientLocation: {
    en: 'Set Patient Location:',
    te: 'రోగి స్థానాన్ని సెట్ చేయండి:',
    hi: 'मरीज़ का स्थान सेट करें:',
  },
  resetDemoData: {
    en: 'Reset All Demo Data',
    te: 'అన్ని డెమో డేటాను రీసెట్ చేయండి',
    hi: 'सभी डेमो डेटा रीसेट करें',
  },
  prototypeFallSimulation: {
    en: 'Prototype Fall Simulation',
    te: 'ప్రోటోటైప్ పడిపోవడం సిమ్యులేషన్',
    hi: 'प्रोटोटाइप गिरने का सिमुलेशन',
  },
  possibleEmergencyDetected: {
    en: 'Possible Emergency Detected',
    te: 'సంభావ్య అత్యవసర పరిస్థితి గుర్తించబడింది',
    hi: 'संभावित आपातकाल का पता चला',
  },
  fallDetectionMessage: {
    en: 'Movement sensors detected a sudden fall impact. Are you okay?',
    te: 'మూవ్‌మెంట్ సెన్సర్లు అకస్మాత్తుగా పడిపోయినట్లు గుర్తించాయి. మీరు బాగున్నారా?',
    hi: 'मूवमेंट सेंसर ने अचानक गिरने का पता लगाया है। क्या आप ठीक हैं?',
  },
  imOkayCancelAlert: {
    en: "I'm Okay! Cancel Alert",
    te: 'నేను బాగున్నాను! హెచ్చరికను రద్దు చేయండి',
    hi: 'मैं ठीक हूँ! अलर्ट रद्द करें',
  },
  sendSOSNow: {
    en: 'Send SOS Now',
    te: 'ఇప్పుడే SOS పంపండి',
    hi: 'अभी SOS भेजें',
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
  // DAYS
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
  // WATER EXTRA
  // =====================================================
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

  // =====================================================
  // RELATIVE TIME
  // =====================================================
  hourAgo: {
    en: '1 hour ago',
    te: '1 గంట క్రితం',
    hi: '1 घंटे पहले',
  },
  hoursAgo: {
    en: 'hours ago',
    te: 'గంటల క్రితం',
    hi: 'घंटे पहले',
  },
  minuteAgo: {
    en: '1 minute ago',
    te: '1 నిమిషం క్రితం',
    hi: '1 मिनट पहले',
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
  // DAYS SHORT
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
    te: 'మెను',
    hi: 'मेनू',
  },
  userAvatar: {
    en: 'User avatar',
    te: 'వినియోగదారు అవతార్',
    hi: 'उपयोगकर्ता अवतार',
  },
  microphone: {
    en: 'Microphone',
    te: 'మైక్రోఫోన్',
    hi: 'माइक्रोफ़ोन',
  },
  closeMenu: {
    en: 'Close menu',
    te: 'మెను మూసివేయండి',
    hi: 'मेनू बंद करें',
  },
};

// =====================================================
// CONTEXT TYPE
// =====================================================

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// =====================================================
// CONTEXT
// =====================================================

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

// =====================================================
// PROVIDER
// =====================================================

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(
      'healthguard-language'
    ) as Language | null;

    if (
      savedLanguage === 'en' ||
      savedLanguage === 'te' ||
      savedLanguage === 'hi'
    ) {
      return savedLanguage;
    }

    return 'en';
  });

  useEffect(() => {
    localStorage.setItem(
      'healthguard-language',
      language
    );
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];

    if (!translation) {
      console.warn(
        `Missing translation key: "${key}"`
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
// HOOK
// =====================================================

export const useLanguage =
  (): LanguageContextType => {
    const context =
      useContext(LanguageContext);

    if (context === undefined) {
      throw new Error(
        'useLanguage must be used within a LanguageProvider'
      );
    }

    return context;
  };