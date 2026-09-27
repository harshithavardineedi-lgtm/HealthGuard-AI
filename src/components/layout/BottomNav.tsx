import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  MedicineIcon,
  CaregiverIcon,
  VoiceIcon,
  SettingsIcon,
  HeartIcon,
  SOSIcon,
  CalendarIcon,
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';

export const BottomNav: React.FC = () => {
  const { userRole } = useAuth();
  const { t } = useLanguage();

  const navItems = userRole === 'caregiver'
    ? [
        { to: '/caregiver', label: t('home'), icon: HeartIcon },
        { to: '/caregiver/patients', label: t('patients'), icon: CaregiverIcon },
        { to: '/caregiver/alerts', label: t('alerts'), icon: SOSIcon },
        { to: '/caregiver/messages', label: t('messages'), icon: VoiceIcon },
        { to: '/caregiver/analytics', label: t('analytics'), icon: CalendarIcon },
      ]
    : [
        { to: '/patient', label: t('home'), icon: HeartIcon },
        { to: '/patient/medicines', label: t('medicines'), icon: MedicineIcon },
        { to: '/patient/emergency-info', label: t('alerts'), icon: SOSIcon },
        { to: '/patient/chat', label: t('messages'), icon: VoiceIcon },
        { to: '/patient/profile', label: t('profile'), icon: SettingsIcon },
      ];

  return (
    <nav
      aria-label={t('mainNavigation')}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-surface/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md"
    >
      <div className="mx-auto grid max-w-xl grid-cols-5 items-stretch gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/patient' || item.to === '/caregiver'}
              className={({ isActive }) =>
                `flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                  isActive
                    ? 'text-accent-secondary bg-accent-secondary/10 font-bold'
                    : 'text-secondary hover:text-primary font-medium'
                }`
              }
            >
              <Icon size={20} />

              <span className="max-w-full text-center text-[10px] leading-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};