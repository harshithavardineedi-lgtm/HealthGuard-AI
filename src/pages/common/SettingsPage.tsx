import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { SidebarNav } from '../../components/layout/SidebarNav';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const SettingsPage: React.FC = () => {
  const { logout, userRole, switchRole } = useAuth();
  const { accessibility, toggleAccessibility } = useHealth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-canvas text-primary flex">
      {userRole === 'caregiver' && <SidebarNav />}

      <div className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-12">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-6 w-full space-y-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">{t('appSettings')}</h2>
            <p className="text-secondary text-sm mt-1">{t('settingsDescription')}</p>
          </div>

          {/* Theme & Language Controls */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-lg text-primary border-b border-hairline pb-2">
              {t('appearanceLocalization')}
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-hairline">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('colorTheme')}</span>
                <span className="text-xs text-secondary">{t('themeDescription')}</span>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('appLanguage')}</span>
                <span className="text-xs text-secondary">{t('languageDescription')}</span>
              </div>
              <LanguageSelector />
            </div>
          </div>

          {/* Accessibility Mode (Section 31) */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-lg text-primary border-b border-hairline pb-2">
              {t('accessibilityModeControls')}
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-hairline">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('largeFontScale')}</span>
                <span className="text-xs text-secondary">{t('largeFontDescription')}</span>
              </div>
              <input
                type="checkbox"
                aria-label={t('largeFontScale')}
                checked={accessibility.largeText}
                onChange={() => toggleAccessibility('largeText')}
                className="w-5 h-5 accent-accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-hairline">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('highContrastMode')}</span>
                <span className="text-xs text-secondary">{t('highContrastDescription')}</span>
              </div>
              <input
                type="checkbox"
                aria-label={t('highContrastMode')}
                checked={accessibility.highContrast}
                onChange={() => toggleAccessibility('highContrast')}
                className="w-5 h-5 accent-accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('reduceDecorativeMotion')}</span>
                <span className="text-xs text-secondary">{t('reduceMotionDescription')}</span>
              </div>
              <input
                type="checkbox"
                aria-label={t('reduceDecorativeMotion')}
                checked={accessibility.reduceAnimation}
                onChange={() => toggleAccessibility('reduceAnimation')}
                className="w-5 h-5 accent-accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Legal Compliance Links (Section 0 Tells 26 & 27) */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-3">
            <h3 className="font-heading font-bold text-lg text-primary border-b border-hairline pb-2">
              {t('privacyDataPolicy')}
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-hairline">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('privacyPermissionsTitle')}</span>
                <span className="text-xs text-secondary">{t('managePermissionsDescription')}</span>
              </div>
              <Link to="/privacy" className="text-xs text-accent-primary font-bold hover:underline">
                {t('viewPolicy')} ↗
              </Link>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-semibold text-sm text-primary block">{t('termsDataUseTitle')}</span>
                <span className="text-xs text-secondary">{t('termsDataUseDescription')}</span>
              </div>
              <Link to="/terms" className="text-xs text-accent-primary font-bold hover:underline">
                {t('viewTerms')} ↗
              </Link>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-3">
            <h3 className="font-heading font-bold text-lg text-primary border-b border-hairline pb-2">
              {t('accountControls')}
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button variant="secondary" size="md" fullWidth onClick={switchRole}>
                {t('switchRoleForDemo')} ({userRole === 'patient' ? t('caregiver') : t('patient')})
              </Button>
              <Button variant="danger" size="md" fullWidth onClick={logout}>
                {t('logout')}
              </Button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
};
