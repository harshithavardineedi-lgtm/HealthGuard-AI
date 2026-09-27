import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex min-h-10 items-center gap-0.5 p-1 bg-sunken rounded-xl border border-hairline ${className}`}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`min-h-8 min-w-8 px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'en' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('te')}
        aria-pressed={language === 'te'}
        className={`min-h-8 px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'te' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        తెలుగు
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`min-h-8 px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
          language === 'hi' ? 'bg-surface text-accent-secondary shadow-xs' : 'text-secondary hover:text-primary'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
};
