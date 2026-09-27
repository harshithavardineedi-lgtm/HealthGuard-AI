import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { SunMoonIcon } from './Icons';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-full border border-hairline bg-surface text-primary hover:bg-sunken transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary/40 flex items-center justify-center ${className}`}
      title={isDark ? t('switchToLightTheme') : t('switchToDarkTheme')}
      aria-label={t('toggleTheme')}
    >
      <SunMoonIcon isDark={isDark} size={20} />
    </button>
  );
};
