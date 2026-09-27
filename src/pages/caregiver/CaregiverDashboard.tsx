import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';
import { SidebarNav } from '../../components/layout/SidebarNav';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import {
  SafeStatusIcon,
  WarnStatusIcon,
  MedicineIcon,
  WaterIcon,
  LocationIcon,
  PhoneIcon,
  SOSIcon,
} from '../../components/common/Icons';

// =====================================================
// MEDICINE TRANSLATIONS
// =====================================================

const medicineTranslations: Record<
  string,
  { en: string; te: string; hi: string }
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

// =====================================================
// EMERGENCY TRIGGER TRANSLATIONS
// =====================================================

const triggerTranslationKeys: Record<string, string> = {
  voice_trigger: 'voiceTrigger',
  sos_button: 'sosButtonTrigger',
  fall_detection: 'fallDetectionTrigger',
  manual: 'manualTrigger',
  button: 'buttonTrigger',
};

// =====================================================
// CAREGIVER DASHBOARD
// =====================================================

export const CaregiverDashboard: React.FC = () => {
  const {
    patient,
    emergencyAlerts,
    todayLogs,
    waterLog,
    resolveEmergency,
    sendCaregiverTextReply,
  } = useHealth();

  const { t, language } = useLanguage();

  // =====================================================
  // FILTER DATA
  // =====================================================

  const activeEmergencies = emergencyAlerts.filter(
    (alert) => alert.status === 'active'
  );

  const missedLogs = todayLogs.filter(
    (log) => log.status === 'skipped'
  );

  const takenCount = todayLogs.filter(
    (log) => log.status === 'taken'
  ).length;

  // =====================================================
  // TRANSLATE MEDICINE NAME
  // =====================================================

  const translateMedicineName = (name: string): string => {
    const key = name.toLowerCase().trim();

    return medicineTranslations[key]?.[language] || name;
  };

  // =====================================================
  // TRANSLATE EMERGENCY TRIGGER
  // =====================================================

  const translateTrigger = (trigger: string): string => {
    const key = trigger.toLowerCase().trim();

    const translationKey = triggerTranslationKeys[key];

    return translationKey ? t(translationKey) : trigger.replace(/_/g, ' ');
  };

  // =====================================================
  // TRANSLATE SKIPPED DOSE REASON
  // =====================================================

  const translateSkippedReason = (notes?: string): string => {
    if (!notes) {
      return t('userSkipped');
    }

    const normalized = notes.toLowerCase().trim();

    if (
      normalized === 'user skipped' ||
      normalized === 'skipped' ||
      normalized === 'user skipped the dose'
    ) {
      return t('userSkipped');
    }

    if (
      normalized === 'forgot' ||
      normalized === 'forgot medicine' ||
      normalized === 'forgot medication'
    ) {
      return t('forgotMedicine');
    }

    if (
      normalized === 'not feeling well' ||
      normalized === 'feeling unwell'
    ) {
      return t('notFeelingWell');
    }

    return notes;
  };

  // =====================================================
  // SEND MEDICINE REMINDER
  // =====================================================

  const handleSendReminder = (medName: string) => {
    const localizedMedicineName =
      translateMedicineName(medName);

    const reminderMessage =
      `${t('pleaseRememberMedicine')} ${localizedMedicineName} ${t(
        'doseReminder'
      )}.`;

    sendCaregiverTextReply(reminderMessage);

    alert(
      `${t('reminderSentTo')} ${patient.name}`
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-canvas text-primary flex">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">

        {/* =================================================
            HEADER
        ================================================= */}

        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6 w-full space-y-6">

          {/* =================================================
              ACTIVE EMERGENCY ALERT
          ================================================= */}

          {activeEmergencies.length > 0 && (
            <div className="p-5 rounded-[24px] bg-status-danger/10 border-2 border-status-danger emergency-flash text-primary">

              <div className="flex items-start justify-between gap-4">

                {/* Emergency Information */}

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-status-danger text-white flex items-center justify-center font-bold">
                    <SOSIcon size={28} />
                  </div>

                  <div>

                    <span className="px-2.5 py-0.5 rounded-full bg-status-danger text-white text-[10px] font-bold uppercase tracking-wider">
                      {t('criticalEmergencyAlert')}
                    </span>

                    <h3 className="text-xl font-heading font-bold text-primary mt-1">
                      {patient.name}{' '}
                      {t('activatedSosAlert')}
                    </h3>

                    <p className="text-xs text-secondary">

                      {t('trigger')}:{' '}

                      {translateTrigger(
                        activeEmergencies[0].triggerType
                      )}

                      {' • '}

                      {t('location')}:{' '}

                      {patient.location?.address ||
                        t('gpsCoordinatesAcquired')}

                    </p>

                  </div>
                </div>

                {/* Emergency Actions */}

                <div className="flex items-center gap-2">

                  <a
                    href={`https://maps.google.com/?q=${patient.location?.latitude},${patient.location?.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-status-danger text-white font-bold text-xs hover:opacity-90 flex items-center gap-1"
                  >
                    <LocationIcon size={16} />
                    {t('openMaps')}
                  </a>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      resolveEmergency(
                        activeEmergencies[0].id
                      )
                    }
                  >
                    {t('markResolved')}
                  </Button>

                </div>

              </div>
            </div>
          )}

          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-heading font-bold text-primary">
                {t('patientOverviewConsole')}
              </h2>

              <p className="text-xs text-secondary">
                {t('liveMonitoringStream')}
              </p>

            </div>

            <span className="px-3 py-1 rounded-full bg-sunken border border-hairline text-xs font-semibold text-primary">
              🟢 {t('liveSyncConnected')}
            </span>

          </div>

          {/* =================================================
              PATIENT OVERVIEW
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* =================================================
                PATIENT CARD
            ================================================= */}

            <div className="lg:col-span-2 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">

              <div className="flex items-start justify-between mb-4">

                <div className="flex items-center gap-4">

                  <img
                    src={patient.avatarUrl}
                    alt={patient.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-hairline"
                  />

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="text-2xl font-heading font-bold text-primary">
                        {patient.name}
                      </h3>

                      <span className="px-2.5 py-0.5 rounded-full bg-status-safe/10 text-status-safe font-semibold text-xs border border-status-safe/30 flex items-center gap-1">

                        <SafeStatusIcon size={12} />

                        {t('stable')}

                      </span>

                    </div>

                    <p className="text-xs text-secondary mt-0.5">

                      {t('age')}: {patient.age}

                      {' • '}

                      {t('bloodGroup')}: {patient.bloodGroup}

                      {' • '}

                      {t('phone')}: {patient.phone}

                    </p>

                  </div>

                </div>

                {/* Call Patient */}

                <a
                  href={`tel:${patient.phone}`}
                  className="px-4 py-2 rounded-2xl bg-accent-secondary text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-95"
                >
                  <PhoneIcon size={16} />
                  {t('callPatient')}
                </a>

              </div>

              {/* =================================================
                  QUICK METRICS
              ================================================= */}

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-sunken border border-hairline text-center text-xs">

                {/* Adherence */}

                <div>

                  <span className="text-muted block mb-0.5">
                    {t('adherenceRate')}
                  </span>

                  <span className="text-xl font-bold font-heading text-accent-primary">
                    {patient.adherencePercentage}%
                  </span>

                </div>

                {/* Hydration */}

                <div>

                  <span className="text-muted block mb-0.5">
                    {t('hydrationGoal')}
                  </span>

                  <span className="text-xl font-bold font-heading text-primary">
                    {waterLog.consumedGlasses}/
                    {waterLog.targetGlasses}
                  </span>

                </div>

                {/* Last Activity */}

                <div>

                  <span className="text-muted block mb-0.5">
                    {t('lastActivity')}
                  </span>

                  <span className="text-sm font-semibold text-primary">
                    {t('fiveMinutesAgo')}
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                STAT GRID
            ================================================= */}

            <div className="lg:col-span-1 grid grid-cols-2 gap-3">

              {/* Doses Taken */}

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">

                <MedicineIcon
                  size={22}
                  className="text-accent-secondary mb-2"
                />

                <div>

                  <span className="text-[11px] text-secondary block font-medium">
                    {t('dosesTakenLabel')}
                  </span>

                  <span className="text-2xl font-heading font-bold text-primary">
                    {takenCount}/{todayLogs.length}
                  </span>

                </div>

              </div>

              {/* Water Log */}

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">

                <WaterIcon
                  size={22}
                  className="text-accent-primary mb-2"
                />

                <div>

                  <span className="text-[11px] text-secondary block font-medium">
                    {t('waterLog')}
                  </span>

                  <span className="text-2xl font-heading font-bold text-primary">
                    {waterLog.consumedGlasses}{' '}
                    {t('glasses')}
                  </span>

                </div>

              </div>

              {/* Missed Doses */}

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">

                <WarnStatusIcon
                  size={22}
                  className="text-status-warn mb-2"
                />

                <div>

                  <span className="text-[11px] text-secondary block font-medium">
                    {t('missedDoses')}
                  </span>

                  <span className="text-2xl font-heading font-bold text-status-warn">
                    {missedLogs.length}
                  </span>

                </div>

              </div>

              {/* SOS Alerts */}

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">

                <SOSIcon
                  size={22}
                  className="text-status-danger mb-2"
                />

                <div>

                  <span className="text-[11px] text-secondary block font-medium">
                    {t('sosAlerts')}
                  </span>

                  <span className="text-2xl font-heading font-bold text-primary">
                    {activeEmergencies.length}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              MISSED DOSES + GEOLOCATION
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* =================================================
                MISSED DOSES
            ================================================= */}

            <div className="bg-surface border border-hairline rounded-[24px] p-5">

              <h3 className="font-heading font-bold text-lg text-primary mb-3 flex items-center gap-2">

                <WarnStatusIcon size={20} />

                {t('missedSkippedDoseAlerts')}

              </h3>

              {missedLogs.length === 0 ? (

                <div className="p-6 text-center text-xs text-secondary bg-sunken rounded-2xl border border-hairline">
                  ✓ {t('noSkippedDosesToday')}
                </div>

              ) : (

                missedLogs.map((log) => (

                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-status-warn/10 border border-status-warn/30 mb-2 flex items-center justify-between text-xs"
                  >

                    <div>

                      <h4 className="font-bold text-primary text-sm">

                        {translateMedicineName(
                          log.medicineName
                        )}

                        {' ('}
                        {log.dosage}
                        {')'}

                      </h4>

                      <p className="text-secondary">

                        {t('scheduled')}:{' '}
                        {log.scheduledTime}

                        {' • '}

                        {t('reason')}:{' '}

                        {translateSkippedReason(
                          log.notes
                        )}

                      </p>

                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        handleSendReminder(
                          log.medicineName
                        )
                      }
                    >
                      {t('sendReminder')}
                    </Button>

                  </div>

                ))
              )}

            </div>

            {/* =================================================
                PATIENT GEOLOCATION
            ================================================= */}

            <div className="bg-surface border border-hairline rounded-[24px] p-5">

              <h3 className="font-heading font-bold text-lg text-primary mb-3 flex items-center gap-2">

                <LocationIcon
                  size={20}
                  className="text-accent-secondary"
                />

                {t('patientGeolocation')}

              </h3>

              <div className="p-4 rounded-2xl bg-sunken border border-hairline space-y-3">

                {/* Sharing Status */}

                <div className="flex items-center justify-between text-xs">

                  <span className="text-secondary">
                    {t('sharingStatus')}:
                  </span>

                  <span className="font-bold text-status-safe">
                    🟢 {t('activeSharing')}
                  </span>

                </div>

                {/* Address */}

                <p className="text-sm font-semibold text-primary">

                  {patient.location?.address ||
                    t('locationUnavailable')}

                </p>

                {/* Last Updated */}

                <p className="text-[11px] text-muted">

                  {t('lastUpdated')}:{' '}

                  {patient.location?.lastUpdated ||
                    t('justNow')}

                </p>

                {/* Google Maps */}

                <a
                  href={`https://maps.google.com/?q=${patient.location?.latitude},${patient.location?.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-xl bg-accent-primary text-white font-semibold text-xs hover:opacity-90"
                >
                  {t('openGoogleMaps')}
                </a>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};