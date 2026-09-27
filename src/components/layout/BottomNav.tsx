import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MedicineIcon,
  CaregiverIcon,
  VoiceIcon,
  SettingsIcon,
  HeartIcon,
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    {
      to: '/patient',
      label: t('dashboard'),
      icon: HeartIcon,
    },
    {
      to: '/patient/medicines',
      label: t('medicines'),
      icon: MedicineIcon,
    },
    {
      to: '/patient/assistant',
      label: t('voiceAssistant'),
      icon: VoiceIcon,
    },
    {
      to: '/patient/caregiver',
      label: t('caregiver'),
      icon: CaregiverIcon,
    },
    {
      to: '/patient/profile',
      label: t('profile'),
      icon: SettingsIcon,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-hairline px-2 py-2">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/patient'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-colors ${
                  isActive
                    ? 'text-accent-secondary bg-accent-secondary/10 font-bold'
                    : 'text-secondary hover:text-primary font-medium'
                }`
              }
            >
              <Icon size={22} />

              <span className="text-[11px] leading-none">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};