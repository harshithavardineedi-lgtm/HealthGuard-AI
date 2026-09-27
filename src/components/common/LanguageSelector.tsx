import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1 p-1 bg-sunken rounded-xl border border-hairline ${className}`}>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'en' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('te')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'te' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        తెలుగు
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'hi' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
};
