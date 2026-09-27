import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Header } from '../../components/layout/Header';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { permissions, togglePermission } = useHealth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-canvas text-primary pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary">{t('privacyPageTitle')}</h1>
            <p className="text-secondary text-sm mt-1">{t('privacyPageSubtitle')}</p>
          </div>
          <Link to="/settings" className="text-xs text-accent-primary font-bold hover:underline">
            ← {t('backToSettings')}
          </Link>
        </div>

        {/* Live Device Permissions Controls (Tell 27) */}
        <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-xl text-primary border-b border-hairline pb-2">
            {t('livePermissionControls')}
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <div>
              <span className="font-semibold text-sm text-primary block">{t('gpsLocationSharing')}</span>
              <span className="text-xs text-secondary">{t('shareLocationDuringEmergency')}</span>
            </div>
            <input
              type="checkbox"
              aria-label={t('gpsLocationSharing')}
              checked={permissions.location}
              onChange={() => togglePermission('location')}
              className="w-5 h-5 accent-accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <div>
              <span className="font-semibold text-sm text-primary block">{t('microphoneVoiceRecognition')}</span>
              <span className="text-xs text-secondary">{t('allowSpeechAndVoiceNotes')}</span>
            </div>
            <input
              type="checkbox"
              aria-label={t('microphoneVoiceRecognition')}
              checked={permissions.voice}
              onChange={() => togglePermission('voice')}
              className="w-5 h-5 accent-accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-hairline">
            <div>
              <span className="font-semibold text-sm text-primary block">{t('browserPushNotifications')}</span>
              <span className="text-xs text-secondary">{t('receiveMedicineCaregiverAlerts')}</span>
            </div>
            <input
              type="checkbox"
              aria-label={t('browserPushNotifications')}
              checked={permissions.notifications}
              onChange={() => togglePermission('notifications')}
              className="w-5 h-5 accent-accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-semibold text-sm text-primary block">{t('anonymousHealthAnalytics')}</span>
              <span className="text-xs text-secondary">{t('shareAdherenceForImprovement')}</span>
            </div>
            <input
              type="checkbox"
              aria-label={t('anonymousHealthAnalytics')}
              checked={permissions.analyticsData}
              onChange={() => togglePermission('analyticsData')}
              className="w-5 h-5 accent-accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Privacy Policy Text */}
        <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-4 text-sm text-secondary leading-relaxed">
          <h3 className="font-heading font-bold text-lg text-primary">{t('dataProtectionPrivacyPolicy')}</h3>
          <p>
            {t('privacyIntro')}
          </p>
          <h4 className="font-bold text-primary">{t('howWeUseData')}</h4>
          <p>
            {t('healthDataSharingPolicy')}
          </p>
          <h4 className="font-bold text-primary">{t('emergencyLocationAccess')}</h4>
          <p>
            {t('emergencyLocationPolicy')}
          </p>
        </div>
      </main>
    </div>
  );
};
