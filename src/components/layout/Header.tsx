import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import {
  BellIcon,
  CaregiverIcon,
  HeartIcon,
  SettingsIcon,
  SafeStatusIcon,
  WarnStatusIcon,
} from '../common/Icons';
import { NotificationPanel } from '../common/NotificationPanel';

export const Header: React.FC = () => {
  const { userRole, switchRole } = useAuth();
  const { patient, caregiver, notifications } = useHealth();
  const { language, t } = useLanguage();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isConnected = !!patient.caregiverId;

  const todayStr = new Date().toLocaleDateString(
    language === 'te'
      ? 'te-IN'
      : language === 'hi'
      ? 'hi-IN'
      : 'en-US',
    {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }
  );

  const getRoleText = () => {
    if (userRole === 'patient') {
      return `${t('patient')} 👤`;
    }

    return `${t('caregiver')} 👨‍⚕️`;
  };

  const getPortalText = () =>
    `${userRole === 'patient' ? t('patient') : t('caregiver')} ${t('portal')}`;

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-hairline px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

        {/* Left: Greeting & Date */}
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-accent-secondary overflow-hidden bg-sunken flex-shrink-0">
              <img
                src={
                  userRole === 'patient'
                    ? patient.avatarUrl
                    : caregiver.avatarUrl
                }
                alt={t('profile')}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-primary leading-tight">
                {t('goodMorning')},{' '}
                {userRole === 'patient'
                  ? patient.name.split(' ')[0]
                  : caregiver.name.split(' ')[0]}{' '}
                👋
              </h2>
              <p className="text-xs text-secondary font-medium">{todayStr}</p>
            </div>
          </div>

          <div className="lg:hidden flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
              <HeartIcon size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-heading text-sm font-bold text-primary">HealthGuard-AI</h1>
              <p className="truncate text-[11px] text-secondary">{getPortalText()}</p>
            </div>
          </div>

          {/* Center: Caregiver Connection Status Chip */}
          {userRole === 'patient' && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-sunken border border-hairline text-xs">
              <CaregiverIcon
                size={16}
                className="text-accent-primary"
              />

              <span className="text-secondary font-medium">
                {t('caregiver')}:
              </span>

              {isConnected ? (
                <span className="flex items-center gap-1 font-semibold text-status-safe">
                  <SafeStatusIcon size={14} />

                  {t('connected')} ({patient.caregiverName})
                </span>
              ) : (
                <span className="flex items-center gap-1 font-semibold text-status-warn">
                  <WarnStatusIcon size={14} />

                  {t('disconnected')}
                </span>
              )}
            </div>
          )}
          </div>

        {/* Right Controls */}
        <div className="flex w-full flex-wrap items-center justify-between gap-1 lg:w-auto lg:justify-end lg:gap-2">

          {/* Language */}
          <LanguageSelector />

          {/* Theme */}
          <ThemeToggle />

          {/* Mobile settings access */}
          <Link
            to="/settings"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-primary transition-colors hover:bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 lg:hidden"
            aria-label={t('settings')}
            title={t('settings')}
          >
            <SettingsIcon size={18} />
          </Link>

          {/* Role Switcher */}
          <button
            onClick={switchRole}
            className="flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-accent-primary/20 bg-accent-primary/10 px-2.5 text-xs font-semibold text-accent-primary transition-colors hover:bg-accent-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 cursor-pointer"
            title={t('switchRole')}
            aria-label={t('switchRole')}
          >
            <CaregiverIcon size={18} className="sm:hidden" />
            <span className="hidden sm:inline">{t('role')}: {getRoleText()}</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-primary transition-colors hover:bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 cursor-pointer"
              aria-label={t('notifications')}
              title={t('notifications')}
            >
              <BellIcon size={20} />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-status-danger text-white text-[10px] font-bold flex items-center justify-center border-2 border-surface">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationPanel
              isOpen={showNotifs}
              onClose={() => setShowNotifs(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};