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

  home: {
    en: 'Home',
    te: 'హోమ్',
    hi: 'होम',
  },

  alerts: {
    en: 'Alerts',
    te: 'హెచ్చరికలు',
    hi: 'अलर्ट',
  },

  mainNavigation: {
    en: 'Main navigation',
    te: 'ప్రధాన నావిగేషన్',
    hi: 'मुख्य नेविगेशन',
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

  appSettings: {
    en: 'App Settings',
    te: 'యాప్ సెట్టింగ్స్',
    hi: 'ऐप सेटिंग्स',
  },

  settingsDescription: {
    en: 'Preferences, accessibility, theme & legal compliance.',
    te: 'ప్రాధాన్యతలు, అందుబాటు, థీమ్ మరియు చట్టపరమైన అనుసరణ.',
    hi: 'प्राथमिकताएँ, सुगम्यता, थीम और कानूनी अनुपालन।',
  },

  appearanceLocalization: {
    en: 'Appearance & Localization',
    te: 'రూపం & భాషా సెట్టింగులు',
    hi: 'रूप और भाषा सेटिंग',
  },

  colorTheme: {
    en: 'Color Theme',
    te: 'రంగు థీమ్',
    hi: 'रंग थीम',
  },

  themeDescription: {
    en: 'Switch between Light Ivory and Dark Forest Teal palette.',
    te: 'లైట్ ఐవరీ మరియు డార్క్ ఫారెస్ట్ టీల్ రంగుల మధ్య మారండి.',
    hi: 'लाइट आइवरी और डार्क फॉरेस्ट टील रंगों के बीच बदलें।',
  },

  appLanguage: {
    en: 'App Language',
    te: 'యాప్ భాష',
    hi: 'ऐप भाषा',
  },

  languageDescription: {
    en: 'Supports English, Telugu, and Hindi surfaces.',
    te: 'ఇంగ్లీష్, తెలుగు మరియు హిందీ భాషలకు మద్దతు ఉంది.',
    hi: 'अंग्रेज़ी, तेलुगु और हिंदी भाषाओं का समर्थन करता है।',
  },

  accessibilityModeControls: {
    en: 'Accessibility Mode Controls',
    te: 'అందుబాటు నియంత్రణలు',
    hi: 'सुगम्यता मोड नियंत्रण',
  },

  largeFontScale: {
    en: 'Large Font Scale',
    te: 'పెద్ద అక్షరాల పరిమాణం',
    hi: 'बड़ा फ़ॉन्ट आकार',
  },

  largeFontDescription: {
    en: 'Enlarge text size & touch targets for easier reading.',
    te: 'సులభంగా చదవడానికి అక్షరాలు మరియు టచ్ లక్ష్యాలను పెద్దవిగా చేయండి.',
    hi: 'आसानी से पढ़ने के लिए टेक्स्ट और टच लक्ष्य बड़े करें।',
  },

  highContrastMode: {
    en: 'High Contrast Mode',
    te: 'అధిక వ్యత్యాస మోడ్',
    hi: 'उच्च कंट्रास्ट मोड',
  },

  highContrastDescription: {
    en: 'Strengthen border definitions and status contrast.',
    te: 'బోర్డర్‌లు మరియు స్థితి రంగుల వ్యత్యాసాన్ని పెంచండి.',
    hi: 'बॉर्डर और स्थिति रंगों का कंट्रास्ट बढ़ाएँ।',
  },

  reduceDecorativeMotion: {
    en: 'Reduce Decorative Motion',
    te: 'అలంకార కదలికలను తగ్గించండి',
    hi: 'सजावटी गति कम करें',
  },

  reduceMotionDescription: {
    en: 'Disable ambient pulse loops; retain functional state animations.',
    te: 'అలంకార పల్స్ కదలికలను ఆపి, అవసరమైన స్థితి యానిమేషన్‌లను కొనసాగించండి.',
    hi: 'सजावटी पल्स गति बंद करें; आवश्यक स्थिति एनिमेशन जारी रखें।',
  },

  privacyDataPolicy: {
    en: 'Privacy & Data Policy',
    te: 'గోప్యత & డేటా విధానం',
    hi: 'गोपनीयता और डेटा नीति',
  },

  privacyPermissionsTitle: {
    en: 'Privacy Policy & Live Permissions',
    te: 'గోప్యతా విధానం & ప్రత్యక్ష అనుమతులు',
    hi: 'गोपनीयता नीति और लाइव अनुमतियाँ',
  },

  managePermissionsDescription: {
    en: 'Manage location, microphone, and analytics permissions.',
    te: 'స్థానం, మైక్రోఫోన్ మరియు విశ్లేషణల అనుమతులను నిర్వహించండి.',
    hi: 'स्थान, माइक्रोफ़ोन और विश्लेषण अनुमतियाँ प्रबंधित करें।',
  },

  termsDataUseTitle: {
    en: 'Terms of Service & Data Use',
    te: 'సేవా నిబంధనలు & డేటా వినియోగం',
    hi: 'सेवा की शर्तें और डेटा उपयोग',
  },

  termsDataUseDescription: {
    en: 'Healthcare support disclaimer and user agreement.',
    te: 'ఆరోగ్య సహాయ నిరాకరణ మరియు వినియోగదారు ఒప్పందం.',
    hi: 'स्वास्थ्य सहायता अस्वीकरण और उपयोगकर्ता समझौता।',
  },

  viewPolicy: {
    en: 'View Policy',
    te: 'విధానాన్ని చూడండి',
    hi: 'नीति देखें',
  },

  viewTerms: {
    en: 'View Terms',
    te: 'నిబంధనలు చూడండి',
    hi: 'शर्तें देखें',
  },

  accountControls: {
    en: 'Account Controls',
    te: 'ఖాతా నియంత్రణలు',
    hi: 'खाता नियंत्रण',
  },

  switchRoleForDemo: {
    en: 'Switch Role for Demo',
    te: 'డెమో కోసం పాత్ర మార్చండి',
    hi: 'डेमो के लिए भूमिका बदलें',
  },

  toggleTheme: {
    en: 'Toggle Theme',
    te: 'థీమ్ మార్చండి',
    hi: 'थीम बदलें',
  },

  switchToLightTheme: {
    en: 'Switch to Light Theme',
    te: 'లైట్ థీమ్‌కు మారండి',
    hi: 'लाइट थीम पर जाएँ',
  },

  switchToDarkTheme: {
    en: 'Switch to Dark Theme',
    te: 'డార్క్ థీమ్‌కు మారండి',
    hi: 'डार्क थीम पर जाएँ',
  },

  notificationsTitle: {
    en: 'Notifications',
    te: 'నోటిఫికేషన్లు',
    hi: 'सूचनाएँ',
  },

  markRead: {
    en: 'Mark read',
    te: 'చదివినట్లు గుర్తించండి',
    hi: 'पढ़ा हुआ चिह्नित करें',
  },

  clear: {
    en: 'Clear',
    te: 'తొలగించండి',
    hi: 'साफ़ करें',
  },

  noNotificationsYet: {
    en: 'No notifications yet',
    te: 'ఇంకా నోటిఫికేషన్లు లేవు',
    hi: 'अभी तक कोई सूचना नहीं',
  },

  patientProfileTitle: {
    en: 'Patient Profile',
    te: 'రోగి ప్రొఫైల్',
    hi: 'मरीज प्रोफ़ाइल',
  },

  manageProfileDescription: {
    en: 'Manage personal & medical profile details.',
    te: 'వ్యక్తిగత మరియు వైద్య ప్రొఫైల్ వివరాలను నిర్వహించండి.',
    hi: 'व्यक्तिगत और चिकित्सा प्रोफ़ाइल विवरण प्रबंधित करें।',
  },

  emergencyCard: {
    en: 'Emergency Card',
    te: 'అత్యవసర కార్డు',
    hi: 'आपातकालीन कार्ड',
  },

  profileDetailsUpdated: {
    en: 'Profile details updated successfully!',
    te: 'ప్రొఫైల్ వివరాలు విజయవంతంగా నవీకరించబడ్డాయి!',
    hi: 'प्रोफ़ाइल विवरण सफलतापूर्वक अपडेट किए गए!',
  },

  fullName: {
    en: 'Full Name',
    te: 'పూర్తి పేరు',
    hi: 'पूरा नाम',
  },

  mobilePhone: {
    en: 'Mobile Phone',
    te: 'మొబైల్ ఫోన్',
    hi: 'मोबाइल फ़ोन',
  },

  emergencyPhoneContact: {
    en: 'Emergency Phone Contact',
    te: 'అత్యవసర ఫోన్ సంప్రదింపు',
    hi: 'आपातकालीन फ़ोन संपर्क',
  },

  knownAllergiesCommaSeparated: {
    en: 'Known Allergies (comma separated)',
    te: 'తెలిసిన అలర్జీలు (కామాలతో వేరు చేయండి)',
    hi: 'ज्ञात एलर्जी (कॉमा से अलग करें)',
  },

  medicalConditionsNotes: {
    en: 'Medical Conditions & Notes',
    te: 'వైద్య పరిస్థితులు & గమనికలు',
    hi: 'चिकित्सा स्थितियाँ और टिप्पणियाँ',
  },

  saveProfileChanges: {
    en: 'Save Profile Changes',
    te: 'ప్రొఫైల్ మార్పులను సేవ్ చేయండి',
    hi: 'प्रोफ़ाइल बदलाव सहेजें',
  },

  emergencyInformationCard: {
    en: 'Emergency Information Card',
    te: 'అత్యవసర సమాచార కార్డు',
    hi: 'आपातकालीन जानकारी कार्ड',
  },

  firstResponderMedicalDetails: {
    en: 'Medical details for first responders and emergency personnel',
    te: 'మొదటి స్పందనదారులు మరియు అత్యవసర సిబ్బందికి వైద్య వివరాలు',
    hi: 'प्रथम प्रतिक्रियाकर्ताओं और आपातकालीन कर्मियों के लिए चिकित्सा विवरण',
  },

  patientNameLabel: {
    en: 'Patient Name',
    te: 'రోగి పేరు',
    hi: 'मरीज का नाम',
  },

  mobile: {
    en: 'Mobile',
    te: 'మొబైల్',
    hi: 'मोबाइल',
  },

  mobileNumber: {
    en: 'Mobile Number',
    te: 'మొబైల్ నంబర్',
    hi: 'मोबाइल नंबर',
  },

  primaryEmergencyContact: {
    en: 'Primary Emergency Contact',
    te: 'ప్రధాన అత్యవసర సంప్రదింపు',
    hi: 'प्राथमिक आपातकालीन संपर्क',
  },

  linkedCaregiver: {
    en: 'Linked Caregiver',
    te: 'లింక్ చేసిన సంరక్షకుడు',
    hi: 'जुड़ा हुआ देखभालकर्ता',
  },

  medicalAllergies: {
    en: 'Medical Allergies',
    te: 'వైద్య అలర్జీలు',
    hi: 'चिकित्सा एलर्जी',
  },

  noKnownAllergies: {
    en: 'No known allergies',
    te: 'తెలిసిన అలర్జీలు లేవు',
    hi: 'कोई ज्ञात एलर्जी नहीं',
  },

  medicalHistoryConditions: {
    en: 'Medical History & Conditions',
    te: 'వైద్య చరిత్ర & పరిస్థితులు',
    hi: 'चिकित्सा इतिहास और स्थितियाँ',
  },

  emergencyCardCopied: {
    en: 'Emergency Card Copied to Clipboard!',
    te: 'అత్యవసర కార్డు క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
    hi: 'आपातकालीन कार्ड क्लिपबोर्ड पर कॉपी किया गया!',
  },

  shareEmergencyInformationCard: {
    en: 'Share Emergency Information Card',
    te: 'అత్యవసర సమాచార కార్డును పంచుకోండి',
    hi: 'आपातकालीन जानकारी कार्ड साझा करें',
  },

  myCaregiver: {
    en: 'My Caregiver',
    te: 'నా సంరక్షకుడు',
    hi: 'मेरे देखभालकर्ता',
  },

  connectCaregiverDescription: {
    en: 'Connect your family member or doctor for remote health monitoring.',
    te: 'రిమోట్ ఆరోగ్య పర్యవేక్షణ కోసం మీ కుటుంబ సభ్యుడు లేదా వైద్యుడిని కనెక్ట్ చేయండి.',
    hi: 'दूरस्थ स्वास्थ्य निगरानी के लिए अपने परिवार के सदस्य या डॉक्टर को जोड़ें।',
  },

  connectedCaregiver: {
    en: 'Connected Caregiver',
    te: 'కనెక్ట్ అయిన సంరక్షకుడు',
    hi: 'जुड़ा हुआ देखभालकर्ता',
  },

  relationshipLabel: {
    en: 'Relationship',
    te: 'సంబంధం',
    hi: 'रिश्ता',
  },

  monitoringPermissionsActive: {
    en: 'Monitoring Permissions Active:',
    te: 'పర్యవేక్షణ అనుమతులు యాక్టివ్‌గా ఉన్నాయి:',
    hi: 'निगरानी अनुमतियाँ सक्रिय हैं:',
  },

  dailyMedicineAlerts: {
    en: 'Daily medicine adherence & skipped dose alerts',
    te: 'రోజువారీ మందుల పాటింపు మరియు వదిలేసిన మోతాదు హెచ్చరికలు',
    hi: 'दैनिक दवा पालन और छोड़ी गई खुराक के अलर्ट',
  },

  liveLocationDuringSos: {
    en: 'Live location during emergency SOS alerts',
    te: 'అత్యవసర SOS హెచ్చరికల సమయంలో ప్రత్యక్ష స్థానం',
    hi: 'आपातकालीन SOS अलर्ट के दौरान लाइव स्थान',
  },

  hydrationProgressUpdates: {
    en: 'Hydration progress updates',
    te: 'నీటి వినియోగ పురోగతి నవీకరణలు',
    hi: 'जल सेवन प्रगति अपडेट',
  },

  sendConnectionRequestDescription: {
    en: 'Send a connection request to link your caregiver.',
    te: 'మీ సంరక్షకుడిని లింక్ చేయడానికి కనెక్షన్ అభ్యర్థన పంపండి.',
    hi: 'अपने देखभालकर्ता को जोड़ने के लिए कनेक्शन अनुरोध भेजें।',
  },

  connectionRequestSent: {
    en: 'Connection request sent to {name} ({phone})! They can accept it from their Caregiver Dashboard.',
    te: '{name} ({phone})కు కనెక్షన్ అభ్యర్థన పంపబడింది! వారు తమ సంరక్షకుడి డాష్‌బోర్డ్‌లో అంగీకరించవచ్చు.',
    hi: '{name} ({phone}) को कनेक्शन अनुरोध भेजा गया! वे इसे अपने देखभालकर्ता डैशबोर्ड से स्वीकार कर सकते हैं।',
  },

  caregiverFullName: {
    en: 'Caregiver Full Name',
    te: 'సంరక్షకుడి పూర్తి పేరు',
    hi: 'देखभालकर्ता का पूरा नाम',
  },

  relationshipExamples: {
    en: 'e.g. Son, Daughter, Doctor',
    te: 'ఉదా: కుమారుడు, కుమార్తె, వైద్యుడు',
    hi: 'उदा. बेटा, बेटी, डॉक्टर',
  },

  sendCaregiverRequest: {
    en: 'Send Caregiver Request',
    te: 'సంరక్షకుడి అభ్యర్థన పంపండి',
    hi: 'देखभालकर्ता अनुरोध भेजें',
  },

  recentRequests: {
    en: 'Recent Requests',
    te: 'ఇటీవలి అభ్యర్థనలు',
    hi: 'हाल के अनुरोध',
  },

  requestTo: {
    en: 'request to',
    te: 'కు అభ్యర్థన',
    hi: 'को अनुरोध',
  },

  accepted: {
    en: 'Accepted',
    te: 'ఆమోదించబడింది',
    hi: 'स्वीकार किया गया',
  },

  rejected: {
    en: 'Rejected',
    te: 'తిరస్కరించబడింది',
    hi: 'अस्वीकार किया गया',
  },

  authSubtitle: {
    en: 'Healthcare Support & Caregiver System',
    te: 'ఆరోగ్య సహాయం & సంరక్షకుల వ్యవస్థ',
    hi: 'स्वास्थ्य सहायता और देखभालकर्ता प्रणाली',
  },

  enterMobileNumber: {
    en: 'Enter Mobile Number',
    te: 'మొబైల్ నంబర్ నమోదు చేయండి',
    hi: 'मोबाइल नंबर दर्ज करें',
  },

  demoAuthenticationNote: {
    en: 'Demo authentication active. Use code {code} on the next step.',
    te: 'డెమో ధృవీకరణ యాక్టివ్‌లో ఉంది. తదుపరి దశలో {code} కోడ్ ఉపయోగించండి.',
    hi: 'डेमो प्रमाणीकरण सक्रिय है। अगले चरण में {code} कोड का उपयोग करें।',
  },

  sendVerificationOtp: {
    en: 'Send Verification OTP',
    te: 'ధృవీకరణ OTP పంపండి',
    hi: 'सत्यापन OTP भेजें',
  },

  enterSixDigitOtp: {
    en: 'Enter 6-Digit OTP',
    te: '6 అంకెల OTP నమోదు చేయండి',
    hi: '6 अंकों का OTP दर्ज करें',
  },

  changeNumber: {
    en: 'Change number ({phone})',
    te: 'నంబర్ మార్చండి ({phone})',
    hi: 'नंबर बदलें ({phone})',
  },

  invalidOtp: {
    en: 'Invalid OTP code. Please enter 123456 for demo.',
    te: 'చెల్లని OTP కోడ్. డెమో కోసం 123456 నమోదు చేయండి.',
    hi: 'गलत OTP कोड। डेमो के लिए 123456 दर्ज करें।',
  },

  verifyContinue: {
    en: 'Verify & Continue',
    te: 'ధృవీకరించి కొనసాగించండి',
    hi: 'सत्यापित करें और जारी रखें',
  },

  howUseHealthGuard: {
    en: 'How will you use HealthGuard?',
    te: 'మీరు HealthGuard‌ను ఎలా ఉపయోగిస్తారు?',
    hi: 'आप HealthGuard का उपयोग कैसे करेंगे?',
  },

  selectPrimaryRole: {
    en: 'Select your primary role for this session',
    te: 'ఈ సెషన్ కోసం మీ ప్రధాన పాత్రను ఎంచుకోండి',
    hi: 'इस सत्र के लिए अपनी मुख्य भूमिका चुनें',
  },

  patientSeniorRole: {
    en: 'I am a Patient / Senior',
    te: 'నేను రోగిని / సీనియర్‌ను',
    hi: 'मैं मरीज / वरिष्ठ नागरिक हूँ',
  },

  patientRoleDescription: {
    en: 'Large buttons, easy voice reminders, water tracking, and 1-tap SOS emergency alert.',
    te: 'పెద్ద బటన్లు, సులభమైన వాయిస్ రిమైండర్లు, నీటి ట్రాకింగ్ మరియు ఒక్క ట్యాప్ SOS అత్యవసర హెచ్చరిక.',
    hi: 'बड़े बटन, आसान वॉइस रिमाइंडर, पानी ट्रैकिंग और एक-टैप SOS आपातकालीन अलर्ट।',
  },

  caregiverFamilyRole: {
    en: 'I am a Caregiver / Family',
    te: 'నేను సంరక్షకుడిని / కుటుంబ సభ్యుడిని',
    hi: 'मैं देखभालकर्ता / परिवार का सदस्य हूँ',
  },

  caregiverRoleDescription: {
    en: 'Remote monitoring console, missed dose alerts, live location tracking, and care analytics.',
    te: 'రిమోట్ పర్యవేక్షణ కన్సోల్, మిస్ అయిన మోతాదు హెచ్చరికలు, ప్రత్యక్ష స్థానం ట్రాకింగ్ మరియు సంరక్షణ విశ్లేషణలు.',
    hi: 'रिमोट मॉनिटरिंग कंसोल, छूटी खुराक के अलर्ट, लाइव लोकेशन ट्रैकिंग और देखभाल विश्लेषण।',
  },

  voiceHealthAssistant: {
    en: 'Voice Health Assistant',
    te: 'వాయిస్ ఆరోగ్య సహాయకుడు',
    hi: 'वॉइस स्वास्थ्य सहायक',
  },

  voiceAssistantDescription: {
    en: 'Speak naturally in Telugu, Hindi, or English to get medicine info, log water, or call help.',
    te: 'మందుల సమాచారం, నీటి నమోదు లేదా సహాయం కోసం తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో సహజంగా మాట్లాడండి.',
    hi: 'दवा की जानकारी, पानी दर्ज करने या सहायता के लिए तेलुगु, हिंदी या अंग्रेज़ी में सहजता से बोलें।',
  },

  medicalDisclaimerLabel: {
    en: 'Medical Disclaimer:',
    te: 'వైద్య నిరాకరణ:',
    hi: 'चिकित्सा अस्वीकरण:',
  },

  aiChatDisclaimer: {
    en: 'HealthGuard AI is a healthcare support and reminder system. It does not diagnose medical conditions or replace professional medical advice. For emergencies, contact local emergency services immediately.',
    te: 'HealthGuard AI ఆరోగ్య సహాయం మరియు రిమైండర్ వ్యవస్థ. ఇది వైద్య పరిస్థితులను నిర్ధారించదు లేదా నిపుణుల వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. అత్యవసర పరిస్థితుల్లో వెంటనే స్థానిక అత్యవసర సేవలను సంప్రదించండి.',
    hi: 'HealthGuard AI स्वास्थ्य सहायता और रिमाइंडर प्रणाली है। यह चिकित्सा स्थितियों का निदान नहीं करती और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। आपातकाल में तुरंत स्थानीय आपातकालीन सेवाओं से संपर्क करें।',
  },

  chatWelcome: {
    en: 'Hello {name}! I am your HealthGuard AI support assistant. I can answer questions about your scheduled medicines, daily hydration goals, caregiver connection status, or emergency controls. How can I help you today?',
    te: 'నమస్కారం {name}! నేను మీ HealthGuard AI సహాయకుడిని. మీ మందుల షెడ్యూల్, రోజువారీ నీటి లక్ష్యాలు, సంరక్షకుడి కనెక్షన్ లేదా అత్యవసర నియంత్రణల గురించి సమాధానాలు ఇవ్వగలను. ఈరోజు మీకు ఎలా సహాయం చేయాలి?',
    hi: 'नमस्ते {name}! मैं आपका HealthGuard AI सहायता सहायक हूँ। मैं आपकी दवा समय-सारणी, दैनिक पानी के लक्ष्य, देखभालकर्ता कनेक्शन या आपातकालीन नियंत्रणों के बारे में मदद कर सकता हूँ। आज मैं आपकी कैसे सहायता करूँ?',
  },

  chatSuggestMedicines: {
    en: 'What medicines do I take today?',
    te: 'आज मुझे कौन सी दवाएँ लेनी हैं?',
    hi: 'आज मुझे कौन सी दवाएँ लेनी हैं?',
  },

  chatSuggestWater: {
    en: 'How much water have I drunk?',
    te: 'నేను ఎంత నీరు తాగాను?',
    hi: 'मैंने कितना पानी पिया है?',
  },

  chatSuggestCaregiver: {
    en: 'Who is my caregiver?',
    te: 'నా సంరక్షకుడు ఎవరు?',
    hi: 'मेरे देखभालकर्ता कौन हैं?',
  },

  chatSuggestEmergency: {
    en: 'How do I trigger an emergency alert?',
    te: 'అత్యవసర హెచ్చరికను ఎలా ప్రారంభించాలి?',
    hi: 'मैं आपातकालीन अलर्ट कैसे शुरू करूँ?',
  },

  chatMedicineSchedule: {
    en: 'Here is your current daily medicine schedule:\n• {medList}\n\nYour current adherence rate is {rate}%.',
    te: 'మీ ప్రస్తుత రోజువారీ మందుల షెడ్యూల్:\n• {medList}\n\nమీ ప్రస్తుత పాటింపు రేటు {rate}%.',
    hi: 'आपकी वर्तमान दैनिक दवा समय-सारणी:\n• {medList}\n\nआपकी वर्तमान पालन दर {rate}% है।',
  },

  chatWaterSummary: {
    en: 'You have logged {consumed} out of your {target} target glasses of water today.',
    te: 'ఈరోజు మీ {target} గ్లాసుల లక్ష్యంలో {consumed} గ్లాసుల నీటిని నమోదు చేశారు.',
    hi: 'आज आपने {target} गिलास के लक्ष्य में से {consumed} गिलास पानी दर्ज किया है।',
  },

  chatCaregiverConnected: {
    en: 'Your connected caregiver is {name} ({phone}). They are receiving your remote health adherence logs.',
    te: 'మీతో కనెక్ట్ అయిన సంరక్షకుడు {name} ({phone}). వారు మీ ఆరోగ్య పాటింపు లాగ్‌లను స్వీకరిస్తున్నారు.',
    hi: 'आपके जुड़े हुए देखभालकर्ता {name} ({phone}) हैं। उन्हें आपकी स्वास्थ्य पालन लॉग मिल रही हैं।',
  },

  chatNoCaregiver: {
    en: 'You do not have a connected caregiver currently. You can connect one from the Caregiver screen.',
    te: 'ప్రస్తుతం మీకు సంరక్షకుడు కనెక్ట్ కాలేదు. సంరక్షకుడి పేజీ నుండి కనెక్ట్ చేయవచ్చు.',
    hi: 'अभी आपका कोई देखभालकर्ता जुड़ा नहीं है। आप देखभालकर्ता स्क्रीन से किसी को जोड़ सकते हैं।',
  },

  chatEmergencyHelp: {
    en: 'To send an emergency SOS alert immediately, tap the red SOS button at the bottom right of any screen, or say "Send SOS" to the Voice Assistant.',
    te: 'వెంటనే అత్యవసర SOS హెచ్చరిక పంపడానికి, ఏ స్క్రీన్‌లోనైనా కుడి దిగువన ఉన్న ఎరుపు SOS బటన్‌ను తాకండి లేదా వాయిస్ అసిస్టెంట్‌కు "SOS పంపండి" అని చెప్పండి.',
    hi: 'तुरंत आपातकालीन SOS अलर्ट भेजने के लिए किसी भी स्क्रीन के नीचे दाईं ओर लाल SOS बटन टैप करें या वॉइस असिस्टेंट से "SOS भेजें" कहें।',
  },

  chatFallbackResponse: {
    en: 'I am here to assist with your medicines, water tracking, caregiver communication, and emergency controls. Please note I am a support reminder tool and do not provide medical diagnosis or advice.',
    te: 'నేను మందులు, నీటి ట్రాకింగ్, సంరక్షకుడితో సంభాషణ మరియు అత్యవసర నియంత్రణల్లో సహాయం చేస్తాను. నేను సహాయక రిమైండర్ సాధనాన్ని మాత్రమే; వైద్య నిర్ధారణ లేదా సలహా ఇవ్వను.',
    hi: 'मैं दवाओं, पानी ट्रैकिंग, देखभालकर्ता से संपर्क और आपातकालीन नियंत्रणों में सहायता करता हूँ। ध्यान दें कि मैं केवल सहायता रिमाइंडर टूल हूँ और चिकित्सा निदान या सलाह नहीं देता।',
  },

  askAboutHealth: {
    en: 'Ask about medicines, water, or caregiver...',
    te: 'మందులు, నీరు లేదా సంరక్షకుడి గురించి అడగండి...',
    hi: 'दवाओं, पानी या देखभालकर्ता के बारे में पूछें...',
  },

  sendChatMessage: {
    en: 'Send',
    te: 'పంపండి',
    hi: 'भेजें',
  },

  privacyPageTitle: {
    en: 'Privacy Policy & Permissions',
    te: 'గోప్యతా విధానం & అనుమతులు',
    hi: 'गोपनीयता नीति और अनुमतियाँ',
  },

  privacyPageSubtitle: {
    en: 'HealthGuard AI Privacy Commitments & Device Controls',
    te: 'HealthGuard AI గోప్యతా హామీలు & పరికర నియంత్రణలు',
    hi: 'HealthGuard AI की गोपनीयता प्रतिबद्धताएँ और डिवाइस नियंत्रण',
  },

  backToSettings: {
    en: 'Back to Settings',
    te: 'సెట్టింగ్స్‌కు తిరిగి వెళ్లండి',
    hi: 'सेटिंग्स पर वापस जाएँ',
  },

  livePermissionControls: {
    en: 'Live Permission Controls',
    te: 'ప్రత్యక్ష అనుమతి నియంత్రణలు',
    hi: 'लाइव अनुमति नियंत्रण',
  },

  gpsLocationSharing: {
    en: 'GPS Location Sharing',
    te: 'GPS స్థానం పంచుకోవడం',
    hi: 'GPS स्थान साझा करना',
  },

  shareLocationDuringEmergency: {
    en: 'Share live location with linked caregiver during Emergency SOS.',
    te: 'అత్యవసర SOS సమయంలో లింక్ చేసిన సంరక్షకుడితో ప్రత్యక్ష స్థానాన్ని పంచుకోండి.',
    hi: 'आपातकालीन SOS के दौरान जुड़े देखभालकर्ता के साथ लाइव स्थान साझा करें।',
  },

  microphoneVoiceRecognition: {
    en: 'Microphone / Voice Recognition',
    te: 'మైక్రోఫోన్ / వాయిస్ గుర్తింపు',
    hi: 'माइक्रोफ़ोन / वॉइस पहचान',
  },

  allowSpeechAndVoiceNotes: {
    en: 'Allow Web Speech API & voice note recording.',
    te: 'Web Speech API మరియు వాయిస్ నోట్ రికార్డింగ్‌ను అనుమతించండి.',
    hi: 'Web Speech API और वॉइस नोट रिकॉर्डिंग की अनुमति दें।',
  },

  browserPushNotifications: {
    en: 'Browser Push Notifications',
    te: 'బ్రౌజర్ పుష్ నోటిఫికేషన్లు',
    hi: 'ब्राउज़र पुश सूचनाएँ',
  },

  receiveMedicineCaregiverAlerts: {
    en: 'Receive medicine reminders and caregiver alert popups.',
    te: 'మందుల రిమైండర్లు మరియు సంరక్షకుడి హెచ్చరికలను స్వీకరించండి.',
    hi: 'दवा रिमाइंडर और देखभालकर्ता अलर्ट पॉपअप प्राप्त करें।',
  },

  anonymousHealthAnalytics: {
    en: 'Anonymous Health Analytics',
    te: 'అనామక ఆరోగ్య విశ్లేషణలు',
    hi: 'गुमनाम स्वास्थ्य विश्लेषण',
  },

  shareAdherenceForImprovement: {
    en: 'Share adherence stats for care improvement.',
    te: 'సంరక్షణ మెరుగుదల కోసం పాటింపు గణాంకాలను పంచుకోండి.',
    hi: 'देखभाल में सुधार के लिए पालन आँकड़े साझा करें।',
  },

  dataProtectionPrivacyPolicy: {
    en: 'Data Protection & Privacy Policy',
    te: 'డేటా రక్షణ & గోప్యతా విధానం',
    hi: 'डेटा सुरक्षा और गोपनीयता नीति',
  },

  privacyIntro: {
    en: 'HealthGuard AI values your privacy and the confidentiality of personal health information. All medicine schedules, logs, and emergency contacts are encrypted locally on your device.',
    te: 'HealthGuard AI మీ గోప్యతను మరియు వ్యక్తిగత ఆరోగ్య సమాచార గోప్యతను గౌరవిస్తుంది. మందుల షెడ్యూల్‌లు, లాగ్‌లు మరియు అత్యవసర సంప్రదింపులు మీ పరికరంలో స్థానికంగా ఎన్‌క్రిప్ట్ చేయబడతాయి.',
    hi: 'HealthGuard AI आपकी गोपनीयता और व्यक्तिगत स्वास्थ्य जानकारी की गोपनीयता का सम्मान करता है। दवा समय-सारणी, लॉग और आपातकालीन संपर्क आपके डिवाइस पर स्थानीय रूप से एन्क्रिप्ट किए जाते हैं।',
  },

  howWeUseData: {
    en: '1. How We Use Data',
    te: '1. మేము డేటాను ఎలా ఉపయోగిస్తాము',
    hi: '1. हम डेटा का उपयोग कैसे करते हैं',
  },

  healthDataSharingPolicy: {
    en: 'Your health adherence data is shared solely with your explicitly linked caregiver (e.g. family members or designated doctors). We never sell or share patient data with third-party advertisers.',
    te: 'మీ ఆరోగ్య పాటింపు డేటా మీరు స్పష్టంగా లింక్ చేసిన సంరక్షకుడితో మాత్రమే పంచుకోబడుతుంది (ఉదా. కుటుంబ సభ్యులు లేదా నియమిత వైద్యులు). రోగి డేటాను మూడవ పక్ష ప్రకటనదారులకు ఎప్పుడూ విక్రయించము లేదా పంచుకోము.',
    hi: 'आपका स्वास्थ्य पालन डेटा केवल आपके स्पष्ट रूप से जुड़े देखभालकर्ता (जैसे परिवार के सदस्य या नियुक्त डॉक्टर) के साथ साझा किया जाता है। हम मरीज का डेटा तीसरे पक्ष के विज्ञापनदाताओं को कभी नहीं बेचते या साझा नहीं करते।',
  },

  emergencyLocationAccess: {
    en: '2. Emergency Location Access',
    te: '2. అత్యవసర స్థానం యాక్సెస్',
    hi: '2. आपातकालीन स्थान पहुँच',
  },

  emergencyLocationPolicy: {
    en: 'Location data is accessed strictly when an Emergency SOS or Fall Simulation is activated to assist first responders and family members in locating you.',
    te: 'మీ స్థానాన్ని మొదటి స్పందనదారులు మరియు కుటుంబ సభ్యులు గుర్తించడంలో సహాయపడటానికి అత్యవసర SOS లేదా పడిపోవడం సిమ్యులేషన్ ప్రారంభించినప్పుడు మాత్రమే స్థాన డేటాను యాక్సెస్ చేస్తాము.',
    hi: 'प्रथम प्रतिक्रियाकर्ताओं और परिवार को आपका स्थान ढूँढने में मदद करने के लिए, स्थान डेटा केवल आपातकालीन SOS या गिरने का सिम्युलेशन सक्रिय होने पर ही लिया जाता है।',
  },

  termsPageTitle: {
    en: 'Terms of Service & Data Use',
    te: 'సేవా నిబంధనలు & డేటా వినియోగం',
    hi: 'सेवा की शर्तें और डेटा उपयोग',
  },

  termsPageSubtitle: {
    en: 'Legal Agreement & Medical Support Disclaimer',
    te: 'చట్టపరమైన ఒప్పందం & వైద్య సహాయ నిరాకరణ',
    hi: 'कानूनी समझौता और चिकित्सा सहायता अस्वीकरण',
  },

  medicalDisclaimer: {
    en: 'HealthGuard AI is a healthcare support and reminder system. It does not diagnose medical conditions or replace professional medical advice. For medical emergencies, contact emergency services immediately.',
    te: 'HealthGuard AI ఆరోగ్య సహాయం మరియు రిమైండర్ వ్యవస్థ. ఇది వైద్య పరిస్థితులను నిర్ధారించదు లేదా నిపుణుల వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. వైద్య అత్యవసర పరిస్థితుల్లో వెంటనే అత్యవసర సేవలను సంప్రదించండి.',
    hi: 'HealthGuard AI स्वास्थ्य सहायता और रिमाइंडर प्रणाली है। यह चिकित्सा स्थितियों का निदान नहीं करती और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। चिकित्सा आपातकाल में तुरंत आपातकालीन सेवाओं से संपर्क करें।',
  },

  acceptableUse: {
    en: '1. Acceptable Use',
    te: '1. ఆమోదయోగ్యమైన వినియోగం',
    hi: '1. स्वीकार्य उपयोग',
  },

  acceptableUseDescription: {
    en: 'HealthGuard AI is designed to help patients and caregivers track daily prescriptions, hydration, emergency contacts, and remote health updates.',
    te: 'రోగులు మరియు సంరక్షకులు రోజువారీ మందులు, నీటి వినియోగం, అత్యవసర సంప్రదింపులు మరియు రిమోట్ ఆరోగ్య నవీకరణలను ట్రాక్ చేయడంలో HealthGuard AI సహాయపడుతుంది.',
    hi: 'HealthGuard AI मरीजों और देखभालकर्ताओं को दैनिक दवाएँ, पानी का सेवन, आपातकालीन संपर्क और दूरस्थ स्वास्थ्य अपडेट ट्रैक करने में मदद करता है।',
  },

  userResponsibilities: {
    en: '2. User Responsibilities',
    te: '2. వినియోగదారు బాధ్యతలు',
    hi: '2. उपयोगकर्ता की जिम्मेदारियाँ',
  },

  userResponsibilitiesDescription: {
    en: 'Users are responsible for maintaining accurate medicine schedules and updating caregiver phone numbers. Automated reminders are delivered via local web APIs.',
    te: 'ఖచ్చితమైన మందుల షెడ్యూల్‌లను నిర్వహించడం మరియు సంరక్షకుడి ఫోన్ నంబర్‌లను నవీకరించడం వినియోగదారుల బాధ్యత. ఆటోమేటిక్ రిమైండర్లు స్థానిక వెబ్ APIల ద్వారా అందించబడతాయి.',
    hi: 'सही दवा समय-सारणी बनाए रखना और देखभालकर्ता के फ़ोन नंबर अपडेट करना उपयोगकर्ताओं की जिम्मेदारी है। स्वचालित रिमाइंडर स्थानीय वेब API के माध्यम से दिए जाते हैं।',
  },

  emergencySosService: {
    en: '3. Emergency SOS Service',
    te: '3. అత్యవసర SOS సేవ',
    hi: '3. आपातकालीन SOS सेवा',
  },

  emergencySosServiceDescription: {
    en: 'The SOS panic button triggers notifications to your connected caregiver and resolves your device GPS coordinates. Users must ensure device location permissions remain enabled for emergency features.',
    te: 'SOS బటన్ మీ కనెక్ట్ అయిన సంరక్షకుడికి నోటిఫికేషన్లు పంపి, మీ పరికరం GPS స్థానాన్ని గుర్తిస్తుంది. అత్యవసర ఫీచర్ల కోసం పరికర స్థాన అనుమతులు ఆన్‌లో ఉండేలా చూసుకోండి.',
    hi: 'SOS बटन आपके जुड़े देखभालकर्ता को सूचना भेजता है और आपके डिवाइस के GPS निर्देशांक प्राप्त करता है। आपातकालीन सुविधाओं के लिए डिवाइस स्थान अनुमतियाँ चालू रखें।',
  },

  sosNotificationTitle: {
    en: '🚨 EMERGENCY SOS ACTIVATED',
    te: '🚨 అత్యవసర SOS సక్రియం చేయబడింది',
    hi: '🚨 आपातकालीन SOS सक्रिय किया गया',
  },

  sosNotificationMessage: {
    en: 'Emergency alert triggered by {name} ({trigger}). Location shared.',
    te: '{name} ({trigger}) ద్వారా అత్యవసర హెచ్చరిక ప్రారంభించబడింది. స్థానం పంచుకోబడింది.',
    hi: '{name} ({trigger}) द्वारा आपातकालीन अलर्ट शुरू किया गया। स्थान साझा किया गया।',
  },

  sosActivatedVoiceResponse: {
    en: 'Emergency SOS has been activated. Emergency alert sent to your caregiver!',
    te: 'అత్యవసర SOS సక్రియం చేయబడింది. మీ సంరక్షకుడికి అత్యవసర హెచ్చరిక పంపబడింది!',
    hi: 'आपातकालीन SOS सक्रिय कर दिया गया है। आपके देखभालकर्ता को आपातकालीन अलर्ट भेज दिया गया है!',
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
    te: 'అత్యవసర సహాయం',
    hi: 'आपातकालीन सहायता',
  },

  triggerEmergencySOS: {
    en: 'Trigger Emergency SOS',
    te: 'అత్యవసర సహాయాన్ని ప్రారంభించండి',
    hi: 'आपातकालीन सहायता शुरू करें',
  },

  emergencyConfirmation: {
    en: 'Emergency Confirmation',
    te: 'అత్యవసర నిర్ధారణ',
    hi: 'आपातकालीन पुष्टि',
  },

  confirmEmergencyAssistance: {
    en: 'Are you sure you need emergency assistance? Your location and emergency alert will be sent immediately to your caregiver and local services.',
    te: 'మీకు అత్యవసర సహాయం అవసరమని ఖచ్చితంగా అనుకుంటున్నారా? మీ స్థానం మరియు అత్యవసర హెచ్చరిక వెంటనే మీ సంరక్షకుడికి మరియు స్థానిక సేవలకు పంపబడతాయి.',
    hi: 'क्या आपको आपातकालीन सहायता चाहिए? आपका स्थान और आपातकालीन अलर्ट तुरंत आपके देखभालकर्ता और स्थानीय सेवाओं को भेजा जाएगा।',
  },

  activatingEmergency: {
    en: 'Activating Emergency...',
    te: 'అత్యవసర సహాయాన్ని ప్రారంభిస్తోంది...',
    hi: 'आपातकालीन सहायता शुरू हो रही है...',
  },

  yesSendSosAlert: {
    en: 'Yes, Send SOS Alert',
    te: 'అవును, అత్యవసర హెచ్చరిక పంపండి',
    hi: 'हाँ, आपातकालीन अलर्ट भेजें',
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