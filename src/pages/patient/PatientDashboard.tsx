import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { NextMedicineCard } from '../../components/patient/NextMedicineCard';
import { WaterTrackerCard } from '../../components/patient/WaterTrackerCard';
import { VoiceAssistantWidget } from '../../components/patient/VoiceAssistantWidget';
import { SOSButton } from '../../components/patient/SOSButton';
import { ReminderModal } from '../../components/patient/ReminderModal';
import { Card } from '../../components/common/Card';
import {
  MedicineIcon,
  SafeStatusIcon,
  WarnStatusIcon,
  CaregiverIcon,
} from '../../components/common/Icons';
import { Link } from 'react-router-dom';

export const PatientDashboard: React.FC = () => {
  const {
    todayLogs,
    patient,
    activeReminder,
    setActiveReminder,
  } = useHealth();

  const { t, language } = useLanguage();

  /*
   * Medicine names are stored internally in English.
   * These translations only change what the user sees.
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

  const nextMedLog =
    todayLogs.find((log) => log.status === 'pending') ||
    todayLogs[0];

  const completedCount = todayLogs.filter(
    (log) => log.status === 'taken'
  ).length;

  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 lg:pb-12">

      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* System Status */}
        <div className="mb-4 text-xs font-semibold px-4 py-2 rounded-2xl bg-status-warn/10 border border-status-warn/30 text-status-warn flex items-center justify-between gap-3">
          <span>
            🟢 {t('systemStatus')}: {t('remindersActive')}
          </span>

          <span className="text-[10px] opacity-80 whitespace-nowrap">
            {t('adherence')}: {patient.adherencePercentage}%
          </span>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Next Medicine */}
          <div className="lg:col-span-2">
            {nextMedLog ? (
              <NextMedicineCard log={nextMedLog} />
            ) : (
              <Card className="p-8 text-center">
                <SafeStatusIcon
                  size={48}
                  className="mx-auto mb-3 text-status-safe"
                />

                <h3 className="text-2xl font-heading font-bold">
                  {t('allDosesCompleted')}
                </h3>

                <p className="text-secondary text-sm mt-1">
                  {t('allMedicinesCompletedMessage')}
                </p>
              </Card>
            )}
          </div>

          {/* Water Tracker */}
          <div className="lg:col-span-1">
            <WaterTrackerCard />
          </div>
        </div>

        {/* Voice Assistant */}
        <div className="mt-5">
          <VoiceAssistantWidget isCompact={false} />
        </div>

        {/* Schedule + Caregiver */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">

          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-surface border border-hairline rounded-[24px] p-5 shadow-xs">

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2">
                <MedicineIcon
                  size={24}
                  className="text-accent-secondary"
                />

                <h3 className="font-heading font-bold text-xl text-primary">
                  {t('todaysSchedule')}
                </h3>
              </div>

              <span className="text-xs font-semibold text-secondary">
                {completedCount}/{todayLogs.length} {t('dosesTaken')}
              </span>
            </div>

            {/* Schedule List */}
            <div className="space-y-3">

              {todayLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-sunken border border-hairline flex items-center justify-between gap-4"
                >

                  {/* Medicine Information */}
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-surface border border-hairline flex items-center justify-center font-bold text-sm text-primary">
                      {log.scheduledTime.split(' ')[0]}
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-base text-primary">
                        {translateMedicineName(log.medicineName)}
                      </h4>

                      <p className="text-xs text-secondary">
                        {log.dosage} • {t('afterFood')}
                      </p>
                    </div>

                  </div>

                  {/* Medicine Status */}
                  <div>

                    {log.status === 'taken' ? (

                      <span className="px-3 py-1 rounded-full bg-status-safe/10 text-status-safe font-semibold text-xs border border-status-safe/30 flex items-center gap-1">

                        <SafeStatusIcon size={14} />

                        {t('taken')}

                      </span>

                    ) : log.status === 'skipped' ? (

                      <span className="px-3 py-1 rounded-full bg-status-warn/10 text-status-warn font-semibold text-xs border border-status-warn/30">
                        {t('skipped')}
                      </span>

                    ) : (

                      <button
                        onClick={() => setActiveReminder(log)}
                        className="px-3 py-1.5 rounded-xl bg-accent-secondary text-white font-semibold text-xs hover:opacity-90"
                      >
                        {t('takeNow')}
                      </button>

                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Caregiver Connection */}
          <div className="lg:col-span-1 bg-surface border border-hairline rounded-[24px] p-5 flex flex-col justify-between">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <CaregiverIcon
                  size={24}
                  className="text-accent-primary"
                />

                <h3 className="font-heading font-semibold text-lg text-primary">
                  {t('caregiver')}
                </h3>

              </div>

              {patient.caregiverId ? (

                <div className="p-4 rounded-2xl bg-sunken border border-hairline space-y-2">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold">
                      {patient.caregiverName?.charAt(0)}
                    </div>

                    <div>

                      <h4 className="font-bold text-sm text-primary">
                        {patient.caregiverName}
                      </h4>

                      <p className="text-xs text-secondary">
                        {patient.caregiverPhone}
                      </p>

                    </div>

                  </div>

                  <div className="pt-2 border-t border-hairline flex items-center gap-2 text-xs text-status-safe font-medium">

                    <SafeStatusIcon size={14} />

                    {t('remoteMonitoring')}

                  </div>

                </div>

              ) : (

                <div className="p-4 rounded-2xl bg-status-warn/10 border border-status-warn/30 text-xs text-primary space-y-2">

                  <p className="font-medium text-status-warn flex items-center gap-1">

                    <WarnStatusIcon size={16} />

                    {t('noCaregiverConnected')}

                  </p>

                  <p className="text-secondary">
                    {t('connectCaregiverMessage')}
                  </p>

                  <Link
                    to="/patient/caregiver"
                    className="inline-block px-3 py-1.5 rounded-xl bg-accent-primary text-white font-semibold text-xs mt-1"
                  >
                    {t('connectCaregiverNow')}
                  </Link>

                </div>

              )}

            </div>

            {/* Emergency Information */}
            <div className="mt-4 pt-3 border-t border-hairline text-center">

              <Link
                to="/patient/emergency-info"
                className="text-xs text-status-danger font-semibold hover:underline"
              >
                📄 {t('standaloneEmergencyCard')}
              </Link>

            </div>

          </div>

        </div>

      </main>

      {/* Floating SOS */}
      <SOSButton isFloating={true} />

      {/* Reminder Modal */}
      <ReminderModal
        log={activeReminder}
        onClose={() => setActiveReminder(null)}
      />

      {/* Mobile Navigation */}
      <BottomNav />

    </div>
  );
};