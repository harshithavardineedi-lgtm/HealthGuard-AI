import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CaregiverIcon,
  SOSIcon,
  VoiceIcon,
  SettingsIcon,
  CalendarIcon,
  HeartIcon,
  MedicineIcon,
} from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
export const SidebarNav: React.FC = () => {
  const { t } = useLanguage();
  const { userRole } = useAuth();

  const navItems = userRole === 'patient'
    ? [
        { to: '/patient', label: t('dashboard'), icon: HeartIcon },
        { to: '/patient/medicines', label: t('medicines'), icon: MedicineIcon },
        { to: '/patient/emergency-info', label: t('alerts'), icon: SOSIcon },
        { to: '/patient/chat', label: t('messages'), icon: VoiceIcon },
        { to: '/patient/profile', label: t('profile'), icon: CaregiverIcon },
        { to: '/settings', label: t('settings'), icon: SettingsIcon },
      ]
    : [
        { to: '/caregiver', label: t('dashboard'), icon: HeartIcon },
        { to: '/caregiver/patients', label: t('patients'), icon: CaregiverIcon },
        { to: '/caregiver/alerts', label: t('alertsSos'), icon: SOSIcon },
        { to: '/caregiver/messages', label: t('messages'), icon: VoiceIcon },
        { to: '/caregiver/analytics', label: t('careAnalytics'), icon: CalendarIcon },
        { to: '/settings', label: t('settings'), icon: SettingsIcon },
      ];

  return (
    <aside className="w-64 bg-surface border-r border-hairline flex flex-col justify-between min-h-screen p-5 hidden lg:flex flex-shrink-0">
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-bold text-xl">
            🛡️
          </div>

          <div>
            <h1 className="font-heading font-bold text-xl text-primary leading-tight">
              HealthGuard
            </h1>

            <span className="text-[10px] uppercase font-bold tracking-wider text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded-full">
              {userRole === 'patient' ? t('patient') : t('caregiver')} {t('portal')}
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/caregiver'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-colors ${
                    isActive
                      ? 'bg-accent-primary text-white font-semibold shadow-xs'
                      : 'text-secondary hover:bg-sunken hover:text-primary'
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* SUPPORT */}
      <div className="p-4 rounded-2xl bg-sunken border border-hairline text-xs text-secondary">
        <p className="font-semibold text-primary mb-1">
          {t('support')}
        </p>

        <p>
          {t('monitoringAssistance')}
        </p>
      </div>
    </aside>
  );
};